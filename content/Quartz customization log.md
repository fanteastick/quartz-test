---
date created: 2024-06-06T22:54
date modified: 2024-08-27T23:52
tags:
  - recents-exclude
---

These are all the things that I changed in my Quartz setup, and approximately where in the code they were changed.

Github repo: [GitHub - fanteastick/quartz-test: Personal website built with Quartz](https://github.com/fanteastick/quartz-test)

All changes made by me: [Commits · fanteastick/quartz-test · GitHub](https://github.com/fanteastick/quartz-test/commits?author=fanteastick) 

Misc things to remember:

- attachment folders won't show up if there's no `.md` files in them. 

> [!success] Some changes that took some effort, or I really like how it turned out ☺
> Hiding things from various components
> 
> Forcing icons in a row
> 
> Tag and folder pages
> 
> Random page
> 
> Not mine but super useful: OnlyFor, NotFor, ComponentGroup
> 
> External link styling

## Adding robots.txt

![[About robots.txt and crawlers#Template used]]

## Adding permalink and subtitle to the frontmatter

Add the two fields to frontmatter processing

```ts title="frontmatter.ts"
declare module "vfile" {
  interface DataMap {
    frontmatter: { [key: string]: unknown } & {
      title: string
    } & Partial<{
        tags: string[]
        aliases: string[]
        description: string
        publish: boolean
        draft: boolean
        lang: string
        enableToc: string
        cssclasses: string[]
+        permalink: string
+        subtitle: string
      }>
  }
```

Add it in the ContentMeta: first add to an array, turn the return into a div, return it if the length > 0

```tsx title="ContentMeta.tsx"
      if (fileData.frontmatter?.permalink) {
        permalinks.push(
          <a href="#" key="permalink" class="internal" id="permalink" style="pointer-events: none">
          {cfg.baseUrl}/{fileData.frontmatter.permalink}
          </a>
        )
      }
    
      if (fileData.frontmatter?.subtitle) {
        const uppercaseSubtitle = fileData.frontmatter.subtitle.toUpperCase();
        subtitles.push(
          `${uppercaseSubtitle}`
        )
      }

      const segmentsElements = segments.map((segment) => <span>{segment}</span>)

      return (
        <div class={classNames(displayClass, "content-meta")}>
        <p style={{ margin: '0', padding: '0' }} show-comma={options.showComma} class={classNames(displayClass, "content-meta")}>
          {segmentsElements}
        </p>
        {permalinks.length > 0 && (
          <p style={{ margin: '0', padding: '0' }}  class={classNames(displayClass, "content-meta")}>
            Semi-permalink: {permalinks}
          </p>
        )}
        {subtitles.length > 0 && (
          <p style={{ margin: '0', padding: '0' }}  class={classNames(displayClass, "content-meta")}>
            Alternatively: {subtitles}
          </p>
        )}
        </div>
      )
    } else {
      return null
    }
  }
```

`style="pointer-events: none"` prevents an `a href` from being clickable. Coolio!

Tried for a long time to get a "click to copy link" type button but it's not working rip. 

## Add a little secret comment in the heads

It's weird being perceived... A little comment so I can find out who's snooping around :P

```tsx title="Head.tsx"
<meta name="custom-comment-fanteastick-ez" content="My 'i was here' moment! check out eilleeenz.com" />
```

## Disabling popover on footnotes and subtitles

Problem statement: 

On longer documents, the footnote popover gets recognized as the heading for "footnotes" instead of the proper one at the bottom of the document, so upon clicking a footnote link, it just jumps down a little bit instead of to the bottom.

Hacky solution: disable popovers on links that are to footnotes. 

```tsx title="popover.inline.ts"
async function mouseEnterHandler(
  this: HTMLAnchorElement,
  { clientX, clientY }: { clientX: number; clientY: number },
) {
  const link = this
  // console.log('Mouse entered link:', link)
  // console.log('Link id:', link.id)
+  if (link.dataset.noPopover === "true" || 
    link.id.includes("user-content-fnref-") ||
    link.id.includes("permalink")
  ) {
    return
  }
```

## Copying fancy text and sticky notes from Nara's ascone

My commit is here: [fanteastick/quartz-test@6c4a8af · GitHub](https://github.com/fanteastick/quartz-test/commit/6c4a8afb76672af7909a7b675651420138c01fbd) which is mostly copied from [GitHub - Naraenda/quartz-ascone](https://github.com/Naraenda/quartz-ascone)

And at some point I added some extra animations to `custom.scss` but haven't put them in yet. 

Also the two transformers import a script which then is added to every page sadly... todo: figure out if it reduces performance. 

2024-08-24 - actually I disabled sticky notes because it was causing weird effects on the search in desktop mode. 

## Forcing icons into a row in the top corner

"In this essay, we will..." lol [fanteastick/quartz-test@a24b5b5 · GitHub](https://github.com/fanteastick/quartz-test/commit/a24b5b57a24b2ce78dcf53867e597a9c14fff8bd) this commit has all the info, minus removing the word "search". 

```ts title="quartz.layout.ts" 
Component.Row([
  Component.Search(),
  Component.Map(),
  Component.Darkmode(),
]),
```

Removing the word "Search" in the search component and also the spacing div: 

```tsx title="Search.tsx"
<div class={classNames(displayClass, "search")}>
<div id="search-icon">
  {/* <p>{i18n(cfg.locale).components.search.title}</p> */}
  {/* <div></div> */}
  {/* <div></div> */}
```

Forced row css:

```css title="custom.scss"
.forced-row {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    // gap: 2rem;
    top: 0;
    // width: initial;
    // margin-top: 2rem;
    box-sizing: border-box;
    padding: 0;
    position: initial;
    & .map, .darkmode, .minibutton {
        margin: 0.4rem;
    }
    @media all and (max-width: $fullPageWidth) {
        justify-content: flex-end;
    }
}
```

## Changing tag pages and folder pages

The problem - the default title for a tag page is `Tag: name`, and breadcrumb is just tags. But when you make a tag page in the tags folder, it names the page the same as the tag name. So instead of "Tag: git" it becomes "git". 

Similarly, for folder pages, if you create an index page in the folder, the title becomes "index" instead of the folder name. 

Removing the "Tag: " part: 

```tsx title="TagContent.tsx"
const tagDescriptions: Record<string, ProcessedContent> = Object.fromEntries(
[...tags].map((tag) => {
  const title =
	tag === "index"
	  ? i18n(cfg.locale).pages.tagContent.tagIndex
	  : `${tag}`
	  // : `${i18n(cfg.locale).pages.tagContent.tag}: ${tag}` original commented out 8/5/24

```

Changing the breadcrumb: If the crumb in the breadcrumb is "tags", change it to add the little tags icon. 

```tsx title="Breadcrumbs.tsx"
return (
  <nav class={classNames(displayClass, "breadcrumb-container")} aria-label="breadcrumbs">
	{crumbs.map((crumb, index) => (
	  <div class="breadcrumb-element">
		{/* <a href={crumb.path}>{crumb.displayName}</a> removed 8-5-24 ez*/}
		<a href={crumb.path}>{crumb.displayName === "tags" ? "🔖 tags" : crumb.displayName}</a>
```

Removing the "Folder: " part: 

```tsx title="folderPage.tsx"
const folderDescriptions: Record<string, ProcessedContent> = Object.fromEntries(
[...folders].map((folder) => [
  folder,
  defaultProcessedContent({
	slug: joinSegments(folder, "index") as FullSlug,
	frontmatter: {
	  // title: `${i18n(cfg.locale).pages.folderContent.folder}: ${folder}`, 8-5-24 removed by ez
	  title: `${folder}`, 
```

Big and hacky change to ArticleTitle:

```tsx title="ArticleTitle.tsx"
const ArticleTitle: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const slug = fileData.slug
  const folderNameRaw = path.dirname(slug ?? "") as SimpleSlug
  const folderName = folderNameRaw.replace(/-/g, ' '); // hacky - 8-5-24 ez
  // @ts-ignore
  const segments = slug.split('/').filter(Boolean); // also hacky - don't know how to cast the split
  const lastSegment = segments.length > 0 ? segments[segments.length - 1] : '';

  const title = (slug && folderName !== "." && folderName !== "tags" && lastSegment === "index" ) 
  ? `📂 ${folderName}` 
  : fileData.frontmatter?.title;
  // const title = fileData.frontmatter?.title original text lol 8-5-24 ez
```
## Add page title suffix config option

Thanks to this pull request, discovered from discord

[Add a page title suffix config option · ripdrive/ripdrive.github.io@db514fd · GitHub](https://github.com/ripdrive/ripdrive.github.io/commit/db514fd4ae441f203069ae9e8e9b2ee5591d63c5) 

```ts title="quartz.config.ts"
const config: QuartzConfig = {
  configuration: {
    pageTitle: "The Rip Drive Project",
+    titleSuffix: " | The Rip Drive Project",
```

```ts title="quartz/cfg.ts"
export interface GlobalConfiguration {
+  titleSuffix: string
```

```tsx title="Head.tsx"
export default (() => {
  const Head: QuartzComponent = ({ cfg, fileData, externalResources }: QuartzComponentProps) => {
+   const title = (fileData.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title) + cfg.titleSuffix
```
## Removed mermaid graphs

Commented out something in the config. 

```ts title="ofm.ts"
const defaultOptions: Options = {
...
  mermaid: false, // disabled mermaid diagrams 7-18-24
```

## Hide tags from graph and explorer and backlinks and more

![[Hiding tags from various components#Summary]]

## Disable popovers on a certain slug (not used)

todo later - change to disable on filedata.frontmatter.tag.includes(x)

```tsx title="renderPage.tsx"
<div class="popover-hint">
  {!slug.includes("All files chronologically modified") && beforeBody.map((BodyComponent) => (
	<BodyComponent {...componentData} />
  ))}
</div>
```

## Overflow lists styling
```scss title="base.scss"
ul.overflow,
ol.overflow {
  max-height: 400;
  overflow-y: auto;

  // clearfix
  content: "";
  clear: both;

  & > li:last-of-type {
+   margin-bottom: 10px; // changed this from 30px 7-19-24 bc it was too thick
  }

  &:after {
    pointer-events: none;
    content: "";
    width: 100%;
    height: 50px;
    position: absolute;
    left: 0;
    bottom: 0;
    opacity: 1;
    transition: opacity 0.3s ease;
-   // background: linear-gradient(transparent 0px, var(--light));
  }
}
```

### Related: reducing backlinks and toc margin
```scss title="backlinks.scss"
  & > ul {
    list-style: none;
    padding: 0;
    // margin: 0.5rem 0; removed this
```

```scss title="toc.scss"
  & ul {
    list-style: none;
    // margin: 0.5rem 0;
```
## Scroll to Top + random page

Scroll to top is very simple, just an `<a href="#">` put into a component + styling. 

Weird hacky check that I ended up not using: 

```tsx title="ScrollToTop.tsx"
      {/* check displayclass exist, check value, render */}
      {displayClass && !displayClass.includes('mobile-only') && (
      <li>
        <a id="random-page-button-mobile">
        Random Page 🎲
        </a>
      </li>
      )}
      {displayClass && !displayClass.includes('desktop-only') && (
      <li>
        <a id="random-page-button-desktop">
        Random Page 🎲
        </a>
      </li>
      )}
```

Ended up shoving everything in the `Footer.tsx` component. Turns out the spacing gets weird so you need to add a blank `<p>` to put the second `<ul>` in a new row. 

### Random page

Code is from these links: thanks t-schreibs

- [RandomPageButton.tsx](https://github.com/t-schreibs/sound-accumulator/blob/497adf732f8260e0f936a6a4cb9d619febf6bef1/quartz/components/RandomPageButton.tsx)
- [randomPage.scss](https://github.com/t-schreibs/sound-accumulator/blob/497adf732f8260e0f936a6a4cb9d619febf6bef1/quartz/components/styles/randomPage.scss)
- [randomPage.inline.ts](https://github.com/t-schreibs/sound-accumulator/blob/497adf732f8260e0f936a6a4cb9d619febf6bef1/quartz/components/scripts/randomPage.inline.ts)

I didn't like the button so I just made it an h3 with the same styling as my GithubSource component. Also added a `cursor: pointer;` on hover.

Also added a part where it avoids giving you the same page as the current. 

2024-07-21 update - ended up adding this to the footer component. 

## ComponentGroup

Works great with simple components but does NOT work well with TOC, explorer...

```tsx title="ComponentGroup.tsx"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default ((components?: QuartzComponent[]) => {
    if (components) {

        const Components: QuartzComponent = (props: QuartzComponentProps) => {
            return <div class="component-group">
                {components.map((c, i) => {
                    const Component = c;
                    return <Component {...props} />
                })}
            </div>
        }
        Components.css             = components.map((c, _) => c.css).join("\n");
        Components.afterDOMLoaded  = components.map((c, _) => c.afterDOMLoaded).join("\n");
        Components.beforeDOMLoaded = components.map((c, _) => c.beforeDOMLoaded).join("\n");

        return Components
    } else {
        return () => <></>
    }
}) satisfies QuartzComponentConstructor

// Copied from https://github.com/Naraenda/quartz-ascone/commit/fc70036371523ddb78b6eee895e374ab73d28519#diff-03e64821c7ee39078af3ee5bdd6f2a0765a9bae0b96160e662f275ef7ac7d0cc
```

## Giscus Comments

Slightly based on code from [morrowind-modding/morrowind-modding.github.io@1bad00e · GitHub](https://github.com/morrowind-modding/morrowind-modding.github.io/commit/1bad00e1e8b27ee2dc85ab08dd2da5b75642f5b3). There's a script that I tried adding too but it wasn't fully working for me, but it should prevent case where the comments don't show up when clicking the homepage. Also consider - put the ID names in some sort of git secret stuff so other people copy-pasting code won't accidentally crosspost to my discussions. 

```tsx title="GiscusComments.tsx"
// @ts-ignore: this is safe, we don't want to actually make darkmode.inline.ts a module as
// modules are automatically deferred and we don't want that to happen for critical beforeDOMLoads
// see: https://v8.dev/features/modules#defer
import giscuscommentsscript from "./scripts/_giscuscomments.inline"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const GiscusComments: QuartzComponent = ({
  fileData,
  allFiles,
  displayClass,
  cfg,
}: QuartzComponentProps) => {
  return (
    <div class={classNames(displayClass)} id="giscus-container">
      <h3>Guestbook 📗</h3>
      <script src="https://giscus.app/client.js"
        data-repo="fanteastick/quartz-test"
        data-repo-id="[your id here]"
        data-category="Announcements"
        data-category-id="[your id here]"
        data-mapping="specific"
        data-term="Guestbook"
        data-strict="0"
        data-reactions-enabled="0"
        data-emit-metadata="0"
        data-input-position="top"
        data-theme="light_protanopia"
        data-lang="en"
        data-loading="lazy"
        crossorigin="anonymous"
        async>
      </script>
    </div>
  )
}

// GiscusComments.beforeDOMLoaded = giscuscommentsscript not really working
export default (() => GiscusComments) satisfies QuartzComponentConstructor
```

### July 2024 update - modifying the built-in comments component

My setup - only one discussion for the entire quartz. So I need the data-term attribute, and things got refactored a bit. 

In `Comments.tsx`: 

- add `data-term={opts.options.term}`

In `comments.inline.ts`:

- add `term: string` to the GiscusElement dataset, and 
- `giscusScript.setAttribute("data-term", giscusContainer.dataset.term)`

## GetDate gives the modified date rather than created

```ts title="quartz.layout.ts"
    defaultDateType: "modified", // options are modified, created, published
```
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

Code copied from: [File not found · GitHub](https://github.com/t-schreibs/sound-accumulator/blob/main/quartz%2Fcomponents%2FOnlyFor.tsx) + changing it into a list version

```tsx title="OnlyFor.tsx"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

interface OnlyForOptions {
  /**
   * The titles to look for
   */
  titles: string[];
}

export default ((opts?: Partial<OnlyForOptions>, component?: QuartzComponent) => {
  if (component) {
    const Component = component
    function OnlyFor(props: QuartzComponentProps) {
      return opts?.titles?.some(title => props.fileData.frontmatter?.title === title) ? 
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
    { titles: ["Eilleen's (online!) Everything Notebook"] },
    Component.RecentNotes({ showTags: false, title: "Recently edited notes:", showDate: true })
  ), 
  // Component.OnlyFor(
  //   {titles: ["Eilleen's (online!) Everything Notebook"] }, 
  //   Component.MobileOnly(Component.Backlinks())
  // ) this part is to show example of a second component working w backlinks too
],
```

Remember to add it to `components/index.ts`!!

### Very similar - `NotFor` component

Same code as above but reversing the checker.

## Changing `RecentNotes` - OnlyFor, rounded border, conditional date

- used `OnlyFor` to only put it on `afterBody` on the index homepage (see above)
- rounded corners and a dotted border, external icon, see-more
```scss title="recentNotes.scss"
  border: 2px dotted rgba(191,201,176, 0.50); /* 2px width, dotted style, color same as highlight */
  border-radius: 10px; /* Rounded corners, adjust value as needed */
  padding: 20px; /* Optional padding to demonstrate the effect */

.see-more{
  font-size: 0.85rem;
  opacity: 0.5;
  white-space: pre;
}

.external-icon {
  height: 1ex;
  margin: 0 0.15em;

  > path {
    fill: var(--dark);
  }
}

```
-  at the top, add svg icon, add a "see more" link
```tsx title="RecentNotes.tsx"
<h3>{opts.title ?? i18n(cfg.locale).components.recentNotes.title} 
  <span class="see-more">
	<span class="see-more">  </span>
	<a href="https://github.com/fanteastick/quartz-test/commits/v4/content?author=fanteastick" class="external">see more</a>
	<svg 
	  class="external-icon"
	  viewBox= "0 0 512 512"
	  xmlns="http://www.w3.org/2000/svg"
	  xmlnsXlink="http://www.w3.org/1999/xlink"
	  x="0px"
	  y="0px"
	  fill="currentColor"
	  xmlSpace="preserve"
>
	  <path 
		d= "M320 0H288V64h32 82.7L201.4 265.4 178.7 288 224 333.3l22.6-22.6L448 109.3V192v32h64V192 32 0H480 320zM32 32H0V64 480v32H32 456h32V480 352 320H424v32 96H64V96h96 32V32H160 32z"
	  />
	</svg>
  </span>
</h3>
```
- conditional date display, date reduced opacity + on the same row, decreasing size (`h3` to `h4`) of the links
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

2024-07-10 update: I think I just removed it entirely lol.

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

Create the new component file, and rename the button class to toc2:

```tsx title="TableOfContents2.tsx"
  return (
    <div class={classNames(displayClass, "toc")}>
      <button type="button" id="toc2" class={fileData.collapseToc ? "collapsed" : ""}>
```

In the stylesheet, add toc2 to the toc styling:

```scss title="toc.scss"
button#toc, button#toc2 {
```

In the inline script, add a toc2 section: which is just the toc script copy pasted

```ts title="
function setupToc2() {
  const toc = document.getElementById("toc2")
  if (toc) {
    const collapsed = toc.classList.contains("collapsed")
    const content = toc.nextElementSibling as HTMLElement | undefined
    if (!content) return
    content.style.maxHeight = collapsed ? "0px" : content.scrollHeight + "px"
    toc.addEventListener("click", toggleToc)
    window.addCleanup(() => toc.removeEventListener("click", toggleToc))
  }
}

window.addEventListener("resize", setupToc2)
document.addEventListener("nav", () => {
  setupToc2()

  // update toc entry highlighting
  observer.disconnect()
  const headers = document.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]")
  headers.forEach((header) => observer.observe(header))
})
```
## Underline external links in page bodies, and lighter

Added a class to the `a` section in `base.scss`

```scss title="base.scss"
a {
...
  &.external { // this whole section was added
    text-decoration: underline wavy;
	opacity: 0.9;
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

## Layout changes (old)
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

## Putting date created & modified on content pages, but not index
```ts title="lastmod.ts"
created ||= file.data.frontmatter["date created"] as MaybeDate
// original: created ||= file.data.frontmatter.date as MaybeDate
...
modified ||= file.data.frontmatter["date modified"] as MaybeDate
// original: modified ||= file.data.frontmatter["date-modified"] as MaybeDate
```

```tsx title="ContentMeta.tsx"
if (fileData.dates && fileData.slug !== "index") {
// segments.push(formatDate(getDate(cfg, fileData)!, cfg.locale))
segments.push("Created: " + formatDate(fileData.dates.created))
segments.push("Modified: " + formatDate(fileData.dates.modified))
}
```

## Increase width of the date column on list pages

```scss title="listPage.scss"
grid-template-columns: 8em 3fr 1fr;
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
