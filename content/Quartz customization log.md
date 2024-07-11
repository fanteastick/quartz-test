---
date created: 2024-06-06T22:54
date modified: 2024-07-11T00:15
---

These are all the things that I changed in my Quartz setup, and approximately where in the code they were changed.

Github repo: [GitHub - fanteastick/quartz-test: Personal website built with Quartz](https://github.com/fanteastick/quartz-test)

All changes made by me: [Commits · fanteastick/quartz-test · GitHub](https://github.com/fanteastick/quartz-test/commits?author=fanteastick) 

Misc things to remember:

- attachment folders won't show up if there's no `.md` files in them. 

## Return to home button on folder and tag pages

```tsx title="FolderContent.tsx"
+// If baseUrl contains a pathname after the domain, use this as the home link
+const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
+const baseDir = url.pathname

return (
  <div class={classes}>
	<article>{content}</article>
	<div class="page-listing">
	  {options.showFolderCount && (
		<p>
		  {i18n(cfg.locale).pages.folderContent.itemsUnderFolder({
			count: allPagesInFolder.length,
		  })}
		</p>
	  )}
	  <div>
		<PageList {...listProps} />
	  </div>
	</div>
+	<a href={baseDir}>{i18n(cfg.locale).pages.error.home}</a>
+	<hr />
  </div>
```

And in `en-US.ts` I changed the `pages:error:home` to `home: "🏡 Return to Homepage",`

## OnlyFor component and in layout

Code copied from: [File not found · GitHub](https://github.com/t-schreibs/sound-accumulator/blob/main/quartz%2Fcomponents%2FOnlyFor.tsx) 

```tsx title="OnlyFor.tsx"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

interface OnlyForOptions {
  /**
   * The title to look for
   */
  title: string
}

export default ((opts?: Partial<OnlyForOptions>, component?: QuartzComponent) => {
  if (component) {
    const Component = component
    function OnlyFor(props: QuartzComponentProps) {
      return props.fileData.frontmatter?.title === opts?.title ? 
        <Component {...props} /> :
        <></>;
    }

    OnlyFor.displayName = component.displayName
    OnlyFor.afterDOMLoaded = component.afterDOMLoaded
    OnlyFor.beforeDOMLoaded = component.beforeDOMLoaded
    OnlyFor.css = component.css
    return OnlyFor
  } else {
    return () => <></>
  }
}) satisfies QuartzComponentConstructor
```

And then in the layout file the syntax is: 

```ts title="quartz.layout.ts"
afterBody: [
  Component.OnlyFor(
    { title: "Eilleen's (online!) Everything Notebook" },
    Component.RecentNotes({ showTags: false, title: "Recently edited notes:", showDate: true })
  ), 
  // Component.OnlyFor(
  //   {title: "Eilleen's (online!) Everything Notebook" }, 
  //   Component.MobileOnly(Component.Backlinks())
  // ) this part is to show example of a second component working w backlinks too
],
```

## Changing `RecentNotes` component

- used `OnlyFor` to only put it on `afterBody` on the index homepage (see above)
- rounded corners and a dotted border
```scss title="recentNotes.scss"
  border: 2px dotted rgba(191,201,176, 0.50); /* 2px width, dotted style, color same as highlight */
  border-radius: 10px; /* Rounded corners, adjust value as needed */
  padding: 20px; /* Optional padding to demonstrate the effect */
```

- conditional date display, date reduced opacity + on the same row, decreasing size of the links
```tsx title="RecentNotes.tsx"
<div class="desc">
{/* Changed heading size of each link 3->4 on 7/10/24 */}
<h4>
  ✿ <a href={resolveRelative(fileData.slug!, page.slug!)} class="internal">
	{title}
  </a>
  {/* Changed showdate to optional + same row + faded a bit 7/10/24 */}
  {opts.showDate && page.dates && (
	<span style="opacity: 0.4"> ₊⊹⊹₊ <Date date={getDate(cfg, page)!} locale={cfg.locale} /></span>
  )}
</h4>
</div>
{opts.showTags && (
<ul class="tags">
  {tags.map((tag) => (
	<li>
	  <a
		class="internal tag-link"
		href={resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)}
>
		{tag}
	  </a>
	</li>
  ))}
</ul>
)}
```

## Putting a conditional hr based on slug

Add this to the correct part of the component:

```tsx
{fileData.slug === "index" && <hr />}
```
## Customizing the 404 page

Added an ASCII art snake with a text bubble. Annoying to do because the code in `404.tsx` is wrapped around `<article>` tags, which then makes whitespaces not really work. Did it by putting my code block into my index, looking at the generated html for the snake code block, and copying it into the `components/404.tsx` file. Then I used `<br>` and made everything one line to preserve the leading whitespaces.

## Making a second table of contents component

Probably bad code practice but I wanted to fix the issue where table of contents wouldn't fold down in mobileonly mode. 

Add to transformers: 

```ts title="plugins/transformers/index.ts"
 export { TableOfContents } from "./toc" // original
+export { TableOfContents2 } from "./toc2" // new
```

Add to components:

```ts title="plugins/components/index.ts"
 import TableOfContents from "./TableOfContents"
+import TableOfContents2 from "./TableOfContents2"

 export {
...
   TableOfContents,
+  TableOfContents2,
```

Add to layout: 

```ts title="quartz.layout.ts"
left: [
...
-    Component.DesktopOnly(Component.TableOfContents()),
+    Component.DesktopOnly(Component.TableOfContents2()),
```

Create the new component file, and remove button and svg in the component: (this is what the code looks like after removing all the things)

```tsx title="TableOfContents2.tsx"
  return (
    <div class={classNames(displayClass, "toc")}>
        <h3>{i18n(cfg.locale).components.tableOfContents.title}</h3>
      <div id="toc-content">
```

## Underline external links in page bodies

Added a class to the `a` section in `base.scss`

```scss title="base.scss"
a {
...
  &.external { // this whole section was added
    text-decoration: underline wavy;
  }
}
```

How it works: this file below adds the class `external` to any links that are external

```ts title="transformers/links.ts"
const classes = (node.properties.className ?? []) as string[]
                const isExternal = isAbsoluteUrl(dest)
                classes.push(isExternal ? "external" : "internal")

```

## Change the colors of the interface
```ts title="quartz.config.ts"
colors: {
        // lightMode: {
        //   light: "#faf8f8",
        //   lightgray: "#e5e5e5",
        //   gray: "#b8b8b8",
        //   darkgray: "#4e4e4e",
        //   dark: "#2b2b2b",
        //   secondary: "#284b63",
        //   tertiary: "#84a59d",
        //   highlight: "rgba(143, 159, 169, 0.15)",
        // },
      //   'desert-storm': {
      //     '50': '#fafbf9',
      //     '100': '#eff2ec',
      //     '200': '#dde2d5',
      //     '300': '#bfc9b0',
      //     '400': '#9bab85',
      //     '500': '#809166',
      //     '600': '#677851',
      //     '700': '#546242',
      //     '800': '#475339',
      //     '900': '#3e4733',
      //     '950': '#292f22',
      // },
        lightMode: {
          light: "#eff2ec",
          lightgray: "#dde2d5",
          gray: "#9bab85",
          darkgray: "#475339",
          dark: "#292f22",
          secondary: "#3e4733",
          tertiary: "#84a59d",
          highlight: "rgba(191,201,176, 0.25)",
        },
```

Commented out `lightMode` is the original. Commented out `desert-storm` is the color scheme taken from [uicolors.app/create](https://uicolors.app/). In the actual thing, secondary should be darker than tertiary. 

I love green 🟢

## Change the font
```ts title="quartz.config.ts"
      typography: {
        header: "Schibsted Grotesk",
        // body: "Source Sans Pro", << original
        body: "Atkinson Hyperlegible",
        code: "IBM Plex Mono",
      },
```
## Consistent opacity in the table of contents, not in-view opacity
```scss title="toc.scss"
  & ul {
... ...
    & > li > a {
      color: var(--dark);
      // opacity: 0.35; dislike the grayed out stuff
      opacity: 0.75;
      transition:
        0.5s ease opacity,
        0.3s ease color;
      &.in-view {
        opacity: 0.75; // set normal to same as in-view
      }
    }
  }
```

## Add a divider right after page content
```tsx title="Content.tsx"
const Content: QuartzComponent = ({ fileData, tree }: QuartzComponentProps) => {
... ...
  return <article class={classString}>
    {content} 
    <p style={{ textAlign: 'center', opacity: 0.7 }}>───✱*.｡:｡✱*.:｡✧*.｡✰*.:｡✧*.｡:｡*.｡✱ ───</p>
  </article>
}
```

Can find some cute dividers here: [Sparkle Emoji for Bio](https://www.aestheticbio.net/p/sparkle.html) 

## Update the footer links
```ts title="quartz.layout.ts"
// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/fanteastick/quartz-test",
      // "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}
```

## Layout changes
- Graph on desktop only
- GithubSource and backlinks and table of contents on the left if desktop
- GithubSource and backlinks on the right if mobile
- remove ContentMeta from the beforeBody on list pages
```ts title="quartz.layout.ts"
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.DesktopOnly(Component.GithubSource()),
    Component.DesktopOnly(Component.Backlinks()),
    // Component.Darkmode(),
  ],
  right: [
    Component.Explorer(),
    Component.DesktopOnly(Component.Graph()),
    Component.MobileOnly(Component.GithubSource()),
    Component.MobileOnly(Component.Backlinks()),
  ],

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  // beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    // Component.Darkmode(),
  ],
  right: [],
```

## Removing strikethrough on checked-off boxes
```scss title="base.scss"
    & li:has(> input[type="checkbox"]:checked) {
      // text-decoration: line-through; 
      // previously the above line is NOT commented out
```

## Github source component

Credits to this guy - [add github source component · abhiaagarwal/notes@0649b06 · GitHub](https://github.com/abhiaagarwal/notes/commit/0649b0645f505990908ca060af75cff6af006c3f) 

I also added a link to the git blame because I like the blame view better than the history view.

Had to change it to this: `${fileData.filePath!}`

Using external service [Git History](https://githistory.xyz/) for history because it's a very nice view. So I turned that part into an external link by adding the class, manually adding the svg, manually adding the svg class to the githubsource scss.

- [quartz-test/quartz/components/GithubSource.tsx at v4 · fanteastick/quartz-test · GitHub](https://github.com/fanteastick/quartz-test/blob/v4/quartz/components/GithubSource.tsx) 
- [quartz-test/quartz/components/styles/githubSource.scss at v4 · fanteastick/quartz-test · GitHub](https://github.com/fanteastick/quartz-test/blob/v4/quartz/components/styles/githubSource.scss) 

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

## Changed favicon by the image path, also the banner

```tsx title="Head.tsx"
    const iconPath = joinSegments(baseDir, "static/icon2.png")
	const ogImagePath = `https://${cfg.baseUrl}/static/hello-there-banner.png`
```

## Changed the site title

```ts title=quartz.config.ts
const config: QuartzConfig = {
  configuration: {
    pageTitle: "(°·._.·°)", // or whatever else you want
```

## Change baseUrl
```ts title="quartz.config.ts"
    baseUrl: "quartz.eilleeenz.com",
```
