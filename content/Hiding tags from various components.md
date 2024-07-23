---
date created: 2024-07-23T01:53
date modified: 2024-07-23T02:14
---
## Summary

In the `quartz.layout.ts` I made some config `const`s that helped clean it up a lot.

- Explorer
	- built-in, made a `filterFn`
- Graph
	- built-in, added to `removeTags` in local and global graph 
- Backlinks
	- changed the component to take an option `removeTags` (optional)
	- removes a file from the backlinks if it has one of the tags to exclude
	- passed the tags to exclude in config in `quartz.layout.ts`
- Recent notes
	- changed the component to take an option `removeTags` (optional)
	- removes a file from the backlinks if it has one of the tags to exclude
- TagList --> which confusingly refers to the tags listed under a title of a page
	- changed the component to take an option `removeTags` (optional)
	- removes a tag from the tags to turn into links if the value is present in the remove tags input
- ⚠ PageList, TagContent, FolderContent
	- PageList: hardcoded a filter with `const _excludeStrings = ["exclude"]`
	- FolderContent: doesn't need a change but is affected by the above change - desired tags don't show up in the right side of the file listing because it calls the `PageList` component with all the files in the folder. 
	- TagContent: same edit as PageList, but so that it'd apply to the "all tags" page. 

## Getting into the code

### Layout file changes

```ts title="quartz.layout.ts"
const tagsToRemove = ["graph-exclude", "explorer-exclude", "backlinks-exclude", "recents-exclude"]
const graphConfig = {
  localGraph: {
    removeTags: tagsToRemove
  },
  globalGraph: {
    removeTags: tagsToRemove
  }
};
const explorerConfig = {
  filterFn: (node: FileNode) => node.name !== "tags" &&
  !(node.file?.frontmatter?.tags?.includes("explorer-exclude") === true)
}
const recentNotesConfig = { 
...
  removeTags: ["recents-exclude"]
}
const tagListConfig = {
  removeTags: tagsToRemove
}
const backlinksConfig = {
  removeTags: tagsToRemove
}
```

### Backlinks

All changes are in `Backlinks.tsx`. 

Added options & default options, and reformatted the component into an `export default` type instead of `export const`:

```tsx
import { GlobalConfiguration } from "../cfg"

interface Options {
  removeTags: string[]
}

const defaultOptions = (cfg: GlobalConfiguration): Options => ({
  removeTags: []
})
export default ((userOpts?: Partial<Options>) => {
...
```

Filter out the files w the offending tags: 

```tsx
// Parse config
const opts = { ...defaultOptions(cfg), ...userOpts }
const _excludeTags = opts.removeTags
// check if the file has the link, and then remove the file if it has the tags
const unfilteredBacklinkFiles = allFiles.filter((file) => file.links?.includes(slug))
const backlinkFiles = unfilteredBacklinkFiles.filter((file) => {
  const hasExcludeTag = _excludeTags.some((tag: string) => // todo: check if the SOME filter works
	file.frontmatter?.tags?.includes(tag)
  );
  return !hasExcludeTag;
});
```
### Recent notes

Adding options is basically the same as above.

To filter out the files with offending tags, change how pages are chosen in the `recent-ul` part: 

```tsx title="RecentNotes.tsx"
{pages.filter(page => { // added this code to first filter by tag and then slice
	return !_excludeTags.some(tag => page.frontmatter?.tags?.includes(tag));
  }).slice(0, opts.limit).map(page => {
```

### TagList 

(Tags listed under a title of a page)

Very similar to the backlinks edits, so I'll just paste the relevant code: 

```tsx title="TagList.tsx"
import { GlobalConfiguration } from "../cfg"

interface Options {
  removeTags: string[]
}
const defaultOptions = (cfg: GlobalConfiguration): Options => ({
  removeTags: []
})

export default ((userOpts?: Partial<Options>) => {
  const TagList: QuartzComponent = ({ fileData, displayClass, cfg }: QuartzComponentProps) => {
    const opts = { ...defaultOptions(cfg), ...userOpts }
    const _excludeTags = opts.removeTags
    const tags = fileData.frontmatter?.tags
    const baseDir = pathToRoot(fileData.slug!)
    if (tags && tags.length > 0) {
      return (
        <ul class={classNames(displayClass, "tags")}>
          {tags.filter(tag => {
            return !_excludeTags.some(excludeTag => tag.includes(excludeTag));
          }).map((tag) => {

```

### ⚠ PageList, TagContent, FolderContent

Basically some manual edits, because there isn't really a way to pass options to these. 

Filter out tags from the column that lists the tags:

```tsx title="PageList.tsx"
{list.map((page) => {
	const title = page.frontmatter?.title
	const unfilteredTags = page.frontmatter?.tags ?? []
	const _excludeStrings = ["exclude"]
	const tags = unfilteredTags.filter(tag => !_excludeStrings.some(excludeString => tag.includes(excludeString)));
```

Remove tags from being added as a section in the full view of the [[tags/]] page:

```tsx title="TagContent.tsx"
if (tag === "/") {
  const unfilteredtags = [
	...new Set(
	  allFiles.flatMap((data) => data.frontmatter?.tags ?? []).flatMap(getAllSegmentPrefixes),
	),
  ].sort((a, b) => a.localeCompare(b))
  const _excludeStrings = ["exclude"]
  const tags = unfilteredtags.filter(tag => !_excludeStrings.some(excludeString => tag.includes(excludeString)));
```

`FolderContent.tsx` doesn't need any code changes because the change is included in the `PageList.tsx` edits. 