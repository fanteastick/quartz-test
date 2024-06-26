---
date created: 2024-06-06T22:54
date modified: 2024-06-25T19:17
---

These are all the things that I changed in my Quartz setup, and approximately where in the code they were changed.

## Github source component

Credits to this guy - [add github source component · abhiaagarwal/notes@0649b06 · GitHub](https://github.com/abhiaagarwal/notes/commit/0649b0645f505990908ca060af75cff6af006c3f) 

I also added a link to the git blame because I like the blame view better than the history view.

Had to change it to this: `${fileData.filePath!}`

- Took forever to find that! Thankful that a repo-wide search bar exists.

## Clicking on the folder name opens the folder page
```tsx title="Explorer.tsx"
const defaultOptions = {
  folderClickBehavior: "link", // changed on 5/9/24 from "collapse"
  folderDefaultState: "collapsed",
```

Need to create index.md in the folder to edit the contents there.

The frontmatter title of the index.md will also set the name of the folder in the explorer

## Created modified date priority
```js title="quartz.config.ts"
Plugin.CreatedModifiedDate({
	priority: ["frontmatter", "git", "filesystem"],
}),
```

## Putting date created & modified on content pages
```ts title="lastmod.ts"
created ||= file.data.frontmatter["date created"] as MaybeDate
// original: created ||= file.data.frontmatter.date as MaybeDate
...
modified ||= file.data.frontmatter["date modified"] as MaybeDate
// original: modified ||= file.data.frontmatter["date-modified"] as MaybeDate
```

```tsx title="ContentMeta.tsx"
if (fileData.dates) {
// segments.push(formatDate(getDate(cfg, fileData)!, cfg.locale))
segments.push("Created: " + formatDate(fileData.dates.created))
segments.push("Modified: " + formatDate(fileData.dates.modified))
}
```

## Increase width of the date column on list pages

```scss title="listPage.scss"
grid-template-columns: 7em 3fr 1fr;
// original: 6em
```

## Changed favicon by the image path

```tsx title="Head.tsx"
    const iconPath = joinSegments(baseDir, "static/icon2.png")
```

## Changed footer and the site title

`footer.tsx` --> just changed some text

```ts title=quartz.config.ts
const config: QuartzConfig = {
  configuration: {
    pageTitle: "(°·._.·°)", // or whatever else you want
```
