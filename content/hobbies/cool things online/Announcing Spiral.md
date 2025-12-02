---
link: https://spiraldb.com/post/announcing-spiral
site: SpiralDB
slurped: 2025-09-11T10:30
title: Announcing Spiral
date created: 2025-09-11T10:30
date modified: 2025-09-11T10:30
tags:
  - slurp
---

I've been building data systems for long enough to be skeptical of “revolutionary” claims, and I'm uncomfortable with grandiose statements like “Built for the AI Era”. Nevertheless, AI workloads have tipped us into what I'll call the Third Age of data systems, and legacy platforms can't meet the moment.

## Three Eras of Data Systems

In the beginning, databases had human-scale inputs and human-scale outputs. Postgres—the king of databases, first released in [1989](https://en.wikipedia.org/wiki/1989_\(album\))[1] —is the archetypal application database. A trivial example of a core Postgres workflow is letting a user create a profile, view it, and then update the email address. Postgres needs to support many users doing so at the same time, but it was built for a world in which the rate of database writes was implicitly limited by humans taking discrete actions.

Then came the age of "Big Data", when we automated data collection at "web scale", with much more granular events. Early internet giants scraped every link on the entire internet and captured every click on their websites. For data systems, this was the dawn of machine-scale _inputs_. However, the only way for a human to engage with this machine-collected data was to distill it down—into a dashboard, a chart, or even a single number. The inputs to a data system might have been in petabytes, but the end products were still measurable in kilobytes.

This unprecedented scale of data collection also led to a technological schism: on one side, we saw the rise of data lakes, massive shared filesystems where we would dump files and run MapReduce jobs. On the other side were (cloud) data warehouses, which provided both scalability and ergonomics for simple data types like dates, numbers, and short text. This branching then eventually converged into "the Lakehouse", wherein the descendants of Hadoop discovered that [](https://db.cs.cmu.edu/papers/2024/whatgoesaround-sigmodrec2024.pdf)[tables were useful all along](https://db.cs.cmu.edu/papers/2024/whatgoesaround-sigmodrec2024.pdf).[2]

Now, we are witnessing another epochal shift: the rise of the "Machine Consumer". In addition to machine-scale _inputs_, future data systems must be able to produce machine-scale _outputs_. Editing a few rows or aggregating a few simple columns is no longer enough. Machines don't want dashboards & summaries—they want _everything_.

## What Machines Want

When I say machines want "everything," let me be specific. An NVIDIA H100 has enough memory bandwidth to consume 4 _million_ 100KiB images per second. A Monte Carlo tree search might need to perform billions of random reads across your entire dataset. Machines want to perform fast scans, fast point lookups, and fast searches over petabyte–or exabyte!–scale data.

This is fundamentally different from the Second Age, when we optimized for human-friendly aggregations and reports. And here's where our current infrastructure completely breaks down: there's an uncanny valley between 1KB and 25MB where Parquet files and object storage are both wildly inefficient. Stored individually and assuming 50ms of S3 latency, reading 4 million individual 100KiB images—enough to saturate the H100 for one _second_—would accrue 55 _hours_ of aggregate network overhead. Vector embeddings, small images, large documents—these are exactly what AI systems need, and exactly what current systems handle poorly.

## Symptoms of the Same Disease

This architectural mismatch between Third Age needs and Second Age tools manifests in two ways that are destroying teams' ability to ship:

First, price-performance. Your AI engineers are stuck in a Sisyphean loop: Read Parquet → Explode to Arrow (10x memory) → Convert to tensors → Cache intermediate results → (Finally) train -> Repeat. Five steps to do what should be simple: feed data to a GPU. Meanwhile, that H100 capable of consuming 4 million images per second sits idle ~70% of the time. Your even-more-expensive AI Engineer is manually shepherding each iteration (and possibly hoping for Zuck to show up with $1B).

Second, security. Raw performance is only half the problem. The other half should terrify your security team. Simon Willison recently noted that [](https://simonwillison.net/2025/Jul/6/supabase-mcp-lethal-trifecta/)[Supabase's MCP connector can leak your entire database](https://simonwillison.net/2025/Jul/6/supabase-mcp-lethal-trifecta/) to anyone who can manipulate prompts.

Teams need to move fast. They need to experiment, iterate, and ship. But when their foundational needs aren't met, they duct-tape solutions together. Database credentials get passed to AI agents. S3 bucket permissions get opened too wide. Audit logs are a fiction.

Here's the kicker: security isn't just a compliance checkbox. It's a performance multiplier. Every hack you ship today is technical debt you'll pay 10x to fix later. Every permissions model you bypass is a multitenant feature you can't build. The same missing primitives that force performance workarounds make security nearly impossible to bolt on later.

Both problems stem from the same root cause: cobbling together Second Age tools to solve Third Age problems. The tragedy isn't that teams are choosing between speed and security—it's that our infrastructure forces this false choice.

## We're Not the First to Notice

Of course, we're not the first to recognize these problems. Smart people have been trying to bridge this gap.

The “Lakehouse” is the right high-level idea—object storage native is indeed the future.[3] But it's still duct-taping together a data lake and a data warehouse, duck-typing files as tables without fundamentally solving the unified storage problem. You end up managing multiple components with different permission models, different APIs, and different performance characteristics. As Ali Ghodsi likes to call it, you're managing a "data estate"—and like many estates, it's expensive, messy, and full of relics & the occasional skeleton.

WebDataset solved an immediate need for AI teams, but it's essentially equivalent to CSV files for the deep learning era: convenient for simple cases but lacking the performance, expressivity, & governance features that production systems demand.

These are all good Second Age solutions trying to solve Third Age problems. But Third Age problems need Third Age infrastructure—built from the ground up with machines as the primary consumer.

When OpenAI processes billions of images or Anthropic trains on massive document collections, they're not using traditional data warehouses. They've built custom infrastructure because they had to.

We realized these weren't just technical problems to work around—they required rethinking the entire architecture.

Data systems must evolve.

## Building for What Comes Next

We started Spiral to take that next evolutionary step. Adapting legacy systems wasn't going to cut it; we needed to design for machine consumption from day one.

First, we created [](https://vortex.dev/)[Vortex](https://vortex.dev/)—a state-of-the-art columnar file format—and donated it to the Linux Foundation. The technical validation has been overwhelmingly positive: Microsoft, Snowflake, Palantir, and other leading data companies are backing it. TUM's fabled database group just released their latest paper [](https://gienieczko.com/anyblox-paper)["Anyblox"](https://gienieczko.com/anyblox-paper), independently calling Vortex the "cutting edge" in file formats.

Vortex achieves Parquet's compression ratios with 10-20x faster scans, 5-10x faster writes, and [100-200x faster random access reads (](https://bench.vortex.dev/#Random_Access)[1.5 milliseconds vs Parquet's 200 milliseconds](https://bench.vortex.dev/#Random_Access)). Depending on the query and the engine, it is no slower, and often dramatically faster. But the real, long-term breakthrough? Vortex is designed to support decoding data directly from S3 to GPU, skipping the CPU bottleneck entirely.

Spiral is our database built on Vortex: object store native from day one; unified governance across all data types; machine-scale throughput that actually saturates your GPUs; and one API that handles everything from tiny embeddings to massive video files. All with what we call "fearless permissioning"—move as fast as you want without compromising security, because the right primitives are built in from the ground up.[4]

Remember that uncanny valley between 1KB and 25MB? The problem isn't the sizes—it's that Second Age systems force you to choose between two bad options: inline the data (killing performance) or store pointers (breaking governance). Spiral eliminates this false choice. We store 10KB embeddings directly in Vortex for microsecond access, intelligently batch 10MB blocks of images for optimal S3 throughput, and externalize 4GB videos without copying a single byte. One system, no compromises.

When you stop pretending machines are just very fast humans, the entire architecture inverts. Throughput becomes the critical constraint, not latency. Object storage becomes the foundation, not an afterthought. Security becomes unified, not bolted on.

With $22 million in Seed & Series A funding from Amplify Partners & General Catalyst, we're well on our way to building the infrastructure that the Third Age of Data demands.

## What Spiral Delivers

Here's what this means in practice:

- That H100 capable of consuming 4 million images per second? With Spiral, it actually can.
    
- Sharing data without the security nightmare? Solved with time-bounded, audited, granular permissions.
    
- The five-step data loading dance? A single query.
    
- Your AI engineers? _Actually working on AI_.

This is what happens when you build for the world ahead, not the world we used to know.

## The Future is Machine Scale

We're tackling how to work with _complex_ data at _machine scale_. A modern GPU can consume _terabits_ per second, and in ways that existing systems aren't built for. Whether you're loading data from object storage into a GPU for pre-training, doing millions of concurrent point reads for Monte Carlo tree search, or trying to wrangle data that other systems can't, we're building for you.

The gap between AI leaders and laggards is widening. While some teams cobble together solutions with duct tape and custom scripts, their competitors are already training next-generation models. The enterprises that get their data AI-ready today will have an insurmountable advantage tomorrow.

We're working with design partners across computer vision, robotics, and multimodal AI. If you're spending more than 10% of your time on data infrastructure instead of model development, we should talk.

I started by saying I'm skeptical of revolutionary claims. But when the revolution is already here—when your GPUs are starving and you're drowning in data—skepticism becomes denial. The question isn't whether your infrastructure will need to evolve—it's whether you'll lead that evolution or be left behind.

The future doesn't care if you're ready. But we do.

[Join us](https://spiraldb.com/careers) or reach out (hello at spiraldb dot com).

—

P.S. If you're sttill managing data in spreadsheets, this post isn't for you. Yet.

1. Taylor Swift, Postgres, and I are all roughly the same age. Coincidentally, I don't believe in dates before ~1989.
    
2. Tables are apparently like low rise jeans: cool in 2005 and back with a vengeance.
    
3. See e.g., [Warpstream](https://www.warpstream.com/), [Turbopuffer](https://turbopuffer.com/), and [SlateDB](https://slatedb.io/) for great examples of how powerful object storage native architectures can be.
    
4. I tried not to mention “written in Rust”, but yes, this term is inspired by [fearless concurrency](https://doc.rust-lang.org/book/ch16-00-concurrency.html).