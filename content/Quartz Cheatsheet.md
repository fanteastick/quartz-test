---
date created: 2024-06-06T22:54
date modified: 2024-09-13T00:23
---
## For copy-pasting
```
git add content*; git status
git commit -m "Content update"; git push
```

## Sync content changes

### TLDR

Been doing this via VS Code GitHub extension. Very convenient but I just need to pull upstream changes every once in a while. 

### Recommended way

```
git pull
npx quartz sync
```

### Alternative: with git reset

To add anything non-`content`: 

```
git add .
git reset -- content
```

To add only `content`:

```
git add content
```

If added too many and want to remove from the commit but still preserve local changes:

```
git reset --mixed HEAD content* (or some other regex)
```

## Merge changes from upstream

TLDR:

```
git fetch upstream
git checkout v4
git merge upstream/v4
```

h/t [git - How can I merge changes from an upstream branch to my fork's branch - Stack Overflow](https://stackoverflow.com/questions/52981111/how-can-i-merge-changes-from-an-upstream-branch-to-my-forks-branch)

A good practice is to have this structure, which looks like you do, but is good to explain for clarification purposes:

```
origin  https://github.com/your-username/forked-repository.git (fetch)
origin  https://github.com/your-username/forked-repository.git (push)
upstream    https://github.com/original-owner-username/original-repository.git (fetch)
upstream    https://github.com/original-owner-username/original-repository.git (push)
```

So `origin` is your fork and `upstream` the original repository. Then use

```
git fetch upstream
```

And you will get this output

```
From https://github.com/original-owner-username/original-repository
 * [new branch]      master     -> upstream/master
```

where you have now a branch called `upstream/master` which tracks the original repo.

Then checkout to your local fork branch and merge

```
git checkout master
git merge upstream/master
```

> [!warning] To change
> Instead of using `master` as the branch it should be `v4` for Quartz. 

## Preview locally

`npx quartz build --serve`

Only does a hard reload when certain files change, like `quartz.layout.ts`. 

## The reason why 2x components w a script doesn't work

First off, putting it in mobile-only and desktop-only is still instantiating it twice, it just has size 0 when in the corresponding layout. 

Doesn't work because the functions like this:

```ts title='explorer.inline.ts'
function setupExplorer() {
  const explorer = document.getElementById("explorer")
```

So there are two elements with the same ID "explorer" which is NOT ok. 

Similar issue for graphs, except the problem is more with the button to see the full graph view. Oh well. 

## Hiding tags from various components

![[Hiding tags from various components#Summary]]

## For some nice SVGs

[SVG Repo](https://www.svgrepo.com/) 

## Ascii art

[Emoji Combos](https://emojicombos.com/) 

## tsconfig.json

This file can't be deleted lol or else the stylesheet linking starts breaking. I think it's a ts thing.

## Footnote syntax

Like this [^1]

ALSO if you use a footnote then the note has to end with a blank line `#` in order to avoid the footnote being included in transcludes... argh... might just add it as a linter rule

[^1]: Nothing big to say here. 

## Dataview Serializer syntax

```
<!-- QueryToSerialize: TABLE file.folder as "Folder", dateformat(date-modified,"MMM d, yyyy") as "Modified" FROM -"tags" SORT date-modified DESC WHERE file.name != this.file.name  AND draft != "true" --> 
```

Also it's finicky with spaces, and needs a blank line underneath to inject the markdown table. 

#