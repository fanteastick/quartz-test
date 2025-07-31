---
date created: 2024-06-06T22:54
date modified: 2025-07-30T00:06
---
## Git commands to update content

```
git add content*; git status
git commit -m "Content update"; git push
```

## Syntax quirks to remember

Footnotes: put a `#` at the bottom of the page if you use one, to avoid footnotes being included in a transclude of the last heading. Also instead of doing something numerical, use some uniquified text, like "oceans are beautiful"

Titles: in files, folders, etc. Don't use hyphens because I have a lot of simple text replacement logic in folder pages/deslugging. 

## Sync changes to git

The tutorial-provided way is to do `npx quartz sync`. Since I have made a bunch of changes to misc components, and I like having better control of what's being changed, I update my changes via VS Code GitHub extension. Very convenient because I just need to pull upstream changes every once in a while, and I can see the merge conflicts better.

```
git pull
npx quartz sync
```

 %%

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

 %%

## Merge changes from upstream

TLDR:

```
git fetch upstream
git checkout v4
git merge upstream/v4

# after you're done making all the changes:
git push

## if having issues with packages etc
npm ci
```

h/t [git - How can I merge changes from an upstream branch to my fork's branch - Stack Overflow](https://stackoverflow.com/questions/52981111/how-can-i-merge-changes-from-an-upstream-branch-to-my-forks-branch)

A good practice is to have this structure, which looks like you do, but is good to explain for clarification purposes:

```
$ git remote -v

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

And I recently realized that it's not working on my system at all! The working theory is that WSL makes file-watching events confused.

## CSSClasses

In Obsidian, go to the CSS classes settings and symlink the folder (`content\.obsidian\snippets`) to the `quartz/static/styles` (should have the `custom.scss` in this folder). And make sure `custom.scss` is `@use yourstylesheet.scss`. 

Then you write classes in the stylesheet. In **obsidian**, add cssclasses kind of like tags, except you add properties to those like 

```css title="Obsidian CSS snippet"
.red-text {
	color:red;
}
```

In that case your `cssclasses` is "red-text". 

### In Quartz

Basically what `cssclasses` frontmatter property does (in obsidian and quartz) is add those as a class to the entire page. So in your css file, you need to target the class (`.class`) in every selector. And for **quartz**, make sure to pull it in with the `custom.scss`, but this time, it's applied to the article. 

```scss title="Example scss that I imported into custom.scss"
// This is for making bullet lists look like cards

article.list-cards ul {
    display: grid;
    gap: 0.75rem;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    padding: 0;
    line-height: 1.3;
    list-style-type: '\200B';
    margin-block-start: .5em;
    margin-block-end: .5em;
    padding-inline-start: 0;
}
```

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

## Callouts

Easy flow: 

- Creation: type out your text -> highlight the lines -> command palette -> insert callout
- Removal: remove the callout title line --> highlight the remaining lines -> command palette -> toggle blockquote

[Supported callout types - Obsidian Help](https://help.obsidian.md/Editing+and+formatting/Callouts#Supported+types) 

> [!INFO] Regular callout
> - Note
> - abstract, summary, tldr
> - info
> - todo
> - tip, hint, important
> - success, check, done
> - question, help, faq
> - warning, caution, attention
> - danger, error
> - bug
> - example
> - quote, cite
> ```
> Code works too
> ```

```
> [!INFO] Regular callout
> - Note
> ```
> Code works too
> ```
```

> [!danger]- Default folded callout
> BOO! 👻🎃

```
> [!danger]- Default folded callout
> BOO! 👻🎃
```

> [!example]+ Default unfolded callout
> I am an open book 📔

```
> [!example]+ Default unfolded callout
> I am an open book 📔
```

![[About rsync#Example rsync for quartz]]

#

