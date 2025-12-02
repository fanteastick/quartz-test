---
link: https://zed.dev/blog/nerd-sniped-project-search
site: "@zeddotdev"
date created: 2025-11-26T00:00
slurped: 2025-11-26T21:38
title: "Nerd-sniped: Project Search - Zed Blog"
date modified: 2025-11-26T21:38
tags:
  - slurp
---

I live, breathe and squeeze performance. Each microsecond shaved is bliss. Donald Knuth? Never heard of him. I'm too busy optimizing Zed for the better part of my workday (say about 97% of the time) to care about computer science folklore.

That's not quite what you'd hear if you worked on Zed. Despite performance being a core differentiator, we're performance-driven, not performance-obsessed. We use profilers a fair bit, but you rarely see us digging through compiler-generated machine code or hand-writing SIMD just to squeeze the last drop from your CPU at the cost of long-term maintenance. We're in a privileged position: we can get a lot of performance out of Zed without resorting to heroics.

A great example is Zed's project search. We heard you loud and clear: it's not fast enough. So we gave it a lift while keeping its spirit and design intact. Faster, smarter project search is available in the 214.4 release today.

How did we pull that off? Let's take a deeper look at what changed, and what didn't.

## [How does one search in a project?](https://zed.dev/blog/nerd-sniped-project-search#how-does-one-search-in-a-project)

Project search has a few important properties:

- It scans all files in a project while respecting settings and .gitignore. We prefer in-memory buffer contents when available and fall back to the filesystem for everything else.
    
- Most scans hit the filesystem. We can't assume files are loaded in memory because projects can be huge.
    
- Most files will not match the query.

And then the obvious: search has to be FAST. It needs to use every available resource efficiently.

Given the above, the obvious approach is to scan files on disk one by one and check for at least one match. If a file matches, we report it and move on. This is essentially what Zed does.

Yes, really. We also mix in multiple threads, which makes the implementation more ~~complex~~ enjoyable to read. But at the root of it, project search looks like this:

```
// First, given a list of filesystem paths,
// we need to figure out which files contain at least one match.
// We do that using plain file contents from FS.
files_with_matches = vec![];
for file in project_files {
    if file.contains_at_least_one_match(query) {
        files_with_matches.push(file.path());
    }
}
 
// The boring part: loading of buffers.
// Files that contain at least one match will be loaded as buffers in Zed.
// If we already have a buffer for a file,
// we'll scan it for all matches without confirming that it has any match.
buffer_handles = vec![];
for file_path in files_with_matches {
    buffer_handles.push(project.load(file_path))
}
 
// Finally, we scan each buffer for all matches
matches = vec![];
for buffer in buffer_handles {
    matches.push((buffer, buffer.find_all_matches()));
}
```

The pseudo-code above is serial. In practice, the loop bodies run in parallel and communicate using channels.

## [Project search is not always fast](https://zed.dev/blog/nerd-sniped-project-search#project-search-is-not-always-fast)

Parallelism is not enough. We've seen and experienced slowness in project search that couldn't be tied to any single commit.

I mean, see for yourself how slow it can get on large repositories. Or rather, how slow it _used_ to be.

Old search experience in the Linux repository.

Our search code has been relatively stable, with [only a few](https://github.com/zed-industries/zed/pull/2857) [rewrites over the years](https://github.com/zed-industries/zed/pull/16923).

## [Ripgrep? Not on our watch!](https://zed.dev/blog/nerd-sniped-project-search#ripgrep-not-on-our-watch)

Users frequently ask us to replace our search with [ripgrep](https://github.com/BurntSushi/ripgrep). It's what VS Code uses, and it's blazingly fast.

Search in the Linux repository: Old implementation vs. ripgrep

There were cases where ripgrep was taking its time though. In such cases we were breathing down its neck, only lagging behind by a measly 10 seconds.

Search in the Rust compiler repository: Old implementation vs. ripgrep

For a mix of reasons (including hubris), we never truly loved the idea of blindly going with ripgrep.

We didn't expect to be faster than ripgrep. But it uses the same [regex engine](https://docs.rs/regex/latest/regex/) we do. So where does the performance discrepancy come from? And how could we be sure that adopting ripgrep would fix our problem?

We had no answers. That alone made us uncomfortable with switching wholesale. We needed to better understand where the difference came from first.

## [Enough dilly-dallying: let's get to work](https://zed.dev/blog/nerd-sniped-project-search#enough-dilly-dallying-lets-get-to-work)

We assumed that when it came to search performance, we should be roughly equal to ripgrep in both throughput (time to find all matches) and latency (time to find the first match). Where we differ is that we need to render matches in multi-buffer. This is actually a huge deal, not just because rendering is expensive.

Some parts of project search run on the main thread because they have to interface with a GPUI heap. GPUI's entities can only be accessed from the main thread, the same thread that runs the render loop. Could accessing those entities be the bottleneck?

To check, we added `project_benchmarks`, a CLI tool that runs a given search query against a worktree. Crucially, since it's a CLI app, _it doesn't have to run an expensive render loop_. That would let us compare more fairly against ripgrep.

We benchmarked throughput and latency with [the following loop](https://github.com/zed-industries/zed/blob/388fda2292ccbe381c18473030461420f06c36cd/crates/project_benchmarks/src/main.rs#L104-L125):

```
let matches = project
    .update(cx, |this, cx| this.search(query, cx))
    .unwrap();
let mut matched_files = 0;
let mut matched_chunks = 0;
while let Ok(match_result) = matches.recv().await {
    if first_match.is_none() {
        let time = timer.elapsed();
        first_match = Some(time);
        println!("First match found after {time:?}");
    }
    if let SearchResult::Buffer { ranges, .. } = match_result {
        matched_files += 1;
        matched_chunks += ranges.len();
    } else {
        // Match limit reached.
        break;
    }
}
let elapsed = timer.elapsed();
println!(
    "Finished project search after {elapsed:?}. Matched {matched_files} files and {matched_chunks} excerpts"
);
```

As we've added a benchmark _before_ starting any optimization work, we could examine our current situation fairly, before a single microsecond was shaved.

```
Running `target/release-fast/project_benchmarks -q vmx_l1d_should_flush --case-sensitive ../linux`
Loading worktrees
Worktrees loaded
Starting a project search
First match found after 3.7978525s
Finished project search after 3.797866083s. Matched 1 files and 4 excerpts
```

versus ripgrep's:

```
➜  linux git:(master) ✗ time rg vmx_l1d_should_flush
...
rg vmx_l1d_should_flush  0.65s user 31.43s system 1030% cpu 3.112 total
```

What we found: the first match arrived _very_ late, but overall our throughput matched ripgrep (that 15% performance difference must be noise). This _did not_ match up with our expectation - even without a render loop, Zed's project search was roughly in the same ballpark as ripgrep when it came to throughput, but way behind when it came to latency.

What about that other slow search query?

```
Running `target/release-fast/project_benchmarks -q upstream_monomorphization --case-sensitive ../rust`
Loading worktrees
Worktrees loaded
Starting a project search
First match found after 16.805069166s
Finished project search after 16.805672625s. Matched 11 files and 26 excerpts
```

versus ripgrep's:

```
➜  rust git:(upstream-monomorphizations-lean-and-mean) time rg upstream_monomorphization
...
rg upstream_monomorphization  1.97s user 38.89s system 388% cpu 10.509 total
```

On the bright side, at least we had numbers to debunk our ~~agenda~~ thesis.

Except those numbers don't pay Zed's bills, and they don't stop you from thumping your thumbs while project search blasts your cores.

So it is not the UI. It's the UX. The user sees the first match after all queries are done. Throughput differences are magnified by the perceived (and real) latency of our search.

Then it dawned on me.

Most project search queries _do not have a result_. Yet we need to scan _potentially every file_ in your project. Now throw concurrency into the mix.

Project search was structured as a fire-and-forget pipeline. We checked each file on disk to see if it had at least one match. For files that did, we queued a full scan in a separate background task. These stages communicated through channels.

**We have no control over which tasks get executed first**. That means that it's possible that all CPU cores get flooded with tasks that check for at least one match, while the tasks that confirm matches in files that already have at least one match get starved.

The ratio between these stages is extremely skewed, and the larger the repository, the worse it gets. Imagine a project with 100,000 text files where _only one file_ matches your query.

We start looking for match candidates. We eventually stumble upon our golden file. Great. We queue it up for a full scan.

What is the likelihood that this single full-scan task gets scheduled immediately by your CPU? With 100,000 candidate scans and just one job to run a full scan, that likelihood is very, very, **very**, very, very low (let's not even get into how our task scheduler works here because it barely matters). We treated the tasks that confirm a match with the same priority as the overwhelming flood of tasks that almost certainly won't.

## [Work smart, not hard](https://zed.dev/blog/nerd-sniped-project-search#work-smart-not-hard)

The fix was pretty straightforward in nature; we made it so that instead of having a bag of tasks that executed at our scheduler's discretion, we explicitly expressed a hierarchy of tasks in our code. The [core of a loop](https://github.com/zed-industries/zed/blob/f58de2106885b121aaae6473d8e3511dcb65eabc/crates/project/src/project_search.rs#L642-L670) (hopefully) fits on a single screen:

```
select_biased! {
    find_all_matches = find_all_matches.next() => {
        let Some(matches) = find_all_matches else {
            continue;
        };
        handler.handle_find_all_matches(matches).await;
    },
    find_first_match = find_first_match.next() => {
        if let Some(buffer_with_at_least_one_match) = find_first_match {
            handler.handle_find_first_match(buffer_with_at_least_one_match).await;
        }
        ...
    },
    scan_path = scan_path.next() => {
        if let Some(path_to_scan) = scan_path {
            handler.handle_scan_path(path_to_scan).await;
        }
        ...
     }
     complete => {
         break
    },
}
```

The key part is the [`select_biased!`](https://docs.rs/futures/latest/futures/macro.select_biased.html) macro. It lets us express priorities between tasks. An executor will try to poll multiple work items concurrently, but it will give higher priority to jobs defined earlier. Here, we prioritize confirming matches in files that are already known to have at least one match over scanning new files for potential matches. That code runs concurrently on each thread we spawn to handle searching.

We've [worked](https://github.com/zed-industries/zed/pull/39956) on this on and off for a few weeks, and we finally got ourselves a project search that's pretty responsive. The result?

```
Running `target/release-fast/project_benchmarks -q vmx_l1d_should_flush --case-sensitive ../linux`
Loading worktrees
Worktrees loaded
Starting a project search
First match found after 1.097015167s
Finished project search after 3.658625917s. Matched 1 files and 4 excerpts
```

Search in the Linux repository: New implementation vs. ripgrep

```
Loading worktrees
Worktrees loaded
Starting a project search
First match found after 32.050709ms
Finished project search after 13.963562459s. Matched 11 files and 26 excerpts
```

Search in the Rust compiler repository: New implementation vs. ripgrep

Not too shabby. The matches arrive faster now, and the throughput is a bit better.

## [Case closed?](https://zed.dev/blog/nerd-sniped-project-search#case-closed)

Ha! Far from it.

For one, recall that algorithm we're using: a big part of it is finding matches in files on disk. In the case of a remote project, we ask your project host for paths to all buffers with at least one match. We wait for that single RPC call to resolve before we proceed to finding matches in files.

Horrible! This means that project search in _remote projects_ is still suffering from latency because it has to wait for all files to be scanned by your remote hosts (to determine which of them contain at least one match) before proceeding to finding the exact match ranges. That's very, very bad. We should stream in the matching paths periodically so a client can start looking for matches sooner.

Another issue is that our UI code might fail to keep up when lots of matches are found quickly. Imagine searching for `the` in a large project (chromium? anybody?). We might end up flooding the main thread with match rendering tasks, which could lead to unresponsiveness. That's a fundamental papercut that we still need to address.

To top it all off, we should probably dig into closing the throughput gap even further. While we're close to ripgrep, we're not quite there yet.

Project search is a complex beast. Fixing one part doesn't magically fix everything else, and it would be ~~a lie~~ **bold** to pretend otherwise. Performance is a core feature for Zed, and it is our responsibility to keep delivering on it (even if we slip up sometimes).

But maybe - just maybe - I've successfully [nerd-sniped](https://xkcd.com/356/) you into giving it a crack. We didn't do any hardcore engineering. But by taking a step back, breaking down and quantifying the issue, we were able to improve our utilization of concurrency and solve a huge UX issue. It was fun, educational and impactful. Here's to many more such adventures, and we'd love you to tag along by [contributing to Zed](https://github.com/zed-industries/zed/blob/main/CONTRIBUTING.md).

---

### Looking for a better editor?

You can try Zed today on macOS, Windows, or Linux. [Download now](https://zed.dev/download)!

---

### We are hiring!

If you're passionate about the topics we cover on our blog, please consider [joining our team](https://zed.dev/jobs) to help us ship the future of software development.