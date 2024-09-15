---
date created: 2024-07-09T02:02
date modified: 2024-09-15T16:22
---

Misc ideas: to be loosely kept up-to-date with my quartz to-do list %% [[Todo]] %%

- [x] emitter: a page with all the exploring-related things? take inspo from custom landing page. --> prob want new file to define layouts
	- Ended up making a [[Map]]
- [x] transformer: add some subtitle stuff based on lastmod transformer and adding to createdmodifieddate
- [x] feature: copy current URL to clipboard
	- ended up being a "copy permalink to clipboard"
- [ ] auto unsubscribe from giscus discussion
	- temporary solution: a note in the first comment with some info about how to unsubscribe
- [ ] Folder page - consistency for subfolder pages, also show an icon if something is a subfolder?
	- no index.md in a subfolder --> subfolder name doesn't show in parent folder listing
	- no title on the subfolder's index.md --> subfolder shows up as "index" in the main folder's page
	- my weird fix: had to put in some code that makes it only title the folders after the last "/"
	- There's no way to indicate in the main folder listing that the link is to a subfolder
- [ ] Footnotes are still super jank
	- if you have a footnote, and you transclude the last heading of a file, the transclude will include the footnotes. 
	- If you have a transclude that has a footnote, like to another header or something, it only has the `#headername` so it'll just try to go to current page's `#headername` which is incorrect.

Also: [[Cool other websites]]

> I'm a collector of everything. 💬 Alessandro Michele

## Quartz snippets that could be used 

Pulled from discord mostly, but maybe also GitHub crawling. 

### Ways to browse plugins

Kirby — 02/22/2024 8:36 AM

> There are some in this channel (use Discord search for has: file in: 🤝-community-plugins)
> 
> is:pr is:closed plugin in the GitHub pull requests page
> 
> if my PR gets merged, search for .quartz on any source hosting service (that's the optional naming guideline, name your repo plugin.quartz)

Giscus is the same as utterances but better bc newer and discussions. 

## Plugin to change an image's color theme based on the site color theme

[feat: add darkmode toggle for image · flyingcakes85/quartz-image-theme@e2d741f · GitHub](https://github.com/flyingcakes85/quartz-image-theme/commit/e2d741fe3428e62d368b5cae58b4595d3409bfe9) 

@flyingcakes85

## Plugin to filter recentnotes based on tag

Skalixur — 09/02/2024

```tsx
import { QuartzFilterPlugin } from "../types"

export interface Options {
  tag: string[]
}

export const TagFilter: QuartzFilterPlugin<Options> = (userOpts) => ({
  name: "TagFilter",
  shouldPublish(_ctx, [_tree, vfile]) {
    return vfile.data?.frontmatter?.tags?.some((tag) => userOpts?.tag.includes(tag)) ?? false
  },
})
```

## Add native components to custom components

savval _—_ Yesterday

> Did it:
> 
> The LandingComponent passes` { ...componentData }` from the `renderPage` function which need to be supplied to the native components in your custom components like so:

```tsx
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import landingStyle from './styles/landing.scss'
import Search from "./Search"


export default (() => {
  const SearchComponent = Search()
  function Landing(componentData: QuartzComponentProps) {
    return (
      <div>
        <SearchComponent {... componentData}/>
        <div class="content-container">
          <p class="landing-header">Landing Page</p>
        </div>
      </div>
    )
  }

  Landing.css = landingStyle
  return Landing
}) satisfies QuartzComponentConstructor
```

## Twitter embed plugin

aaron — 08/04/2024

> an example for this:

```tsx
import { QuartzTransformerPlugin } from "../types"
import { Element } from "hast"
import { Root } from "mdast"
import { visit } from "unist-util-visit"
import { i18n } from "../../i18n"

export const twitterUrlRegex = /^.*(twitter\.com|x\.com)\/[a-zA-Z0-9_]+\/(status)\/(\d{19}).*/

export const Twitter: QuartzTransformerPlugin = () => ({
  name: "Twitter",
  markdownPlugins(ctx) {
    const locale = ctx.cfg.configuration.locale.split("-")[0] ?? "en"
    return [
      () => async (tree: Root, _file) => {
        const promises: Promise<void>[] = []

        visit(tree, "paragraph", (node, index, parent) => {
          if (node.children.length === 0) return

          // find first line and callout content
          const [firstChild] = node.children
          if (firstChild.type !== "link" || !twitterUrlRegex.test(firstChild.url)) return

          promises.push(
            fetch(
              `https://publish.twitter.com/oembed?url=${firstChild.url}&dnt=false&omit_script=true&lang=${locale}`,
            )
              .then((res) => res.json())
              .then((data) => {
                parent!.children.splice(index!, 1, {
                  type: "html",
                  value: data.html,
                })
              }),
          )
        })

        await Promise.all(promises)
      },
    ]
  },
})
```

> Probably could generalize this for youtube, and others URL that oembed.json supports 
## Filter an RSS feed

https://katb.in/velisabalih.diff

```tsx
From d119c1ef91dba9171aa911d8a1f263ece060e7da Mon Sep 17 00:00:00 2001
From: Yash-Garg <redacted>
Date: Sun, 25 Aug 2024 12:59:25 +0530
Subject: [PATCH] feat: add `filterFn` for rss feed

---
 quartz.config.ts                        |  6 ++++++
 quartz/plugins/emitters/contentIndex.ts | 18 ++++++++++++++----
 2 files changed, 20 insertions(+), 4 deletions(-)

diff --git a/quartz.config.ts b/quartz.config.ts
index fcf67a0a..01538e54 100644
--- a/quartz.config.ts
+++ b/quartz.config.ts
@@ -84,6 +84,12 @@ const config: QuartzConfig = {
       Plugin.ContentIndex({
         enableSiteMap: true,
         enableRSS: true,
+        filterFn(slug, content) {
+          if (!content.date) return false;
+          if (!slug.includes("posts/")) return false;
+          return true;
+        },
       }),
       Plugin.Assets(),
       Plugin.Static(),
diff --git a/quartz/plugins/emitters/contentIndex.ts b/quartz/plugins/emitters/contentIndex.ts
index c0fef86d..258e5ec5 100644
--- a/quartz/plugins/emitters/contentIndex.ts
+++ b/quartz/plugins/emitters/contentIndex.ts
@@ -23,6 +23,7 @@ export type ContentDetails = {
 interface Options {
   enableSiteMap: boolean
   enableRSS: boolean
+  filterFn?: (slug: SimpleSlug, content: ContentDetails) => boolean
   rssLimit?: number
   rssFullHtml: boolean
   includeEmptyFiles: boolean
@@ -31,6 +32,7 @@ interface Options {
 const defaultOptions: Options = {
   enableSiteMap: true,
   enableRSS: true,
+  filterFn: undefined,
   rssLimit: 10,
   rssFullHtml: false,
   includeEmptyFiles: true,
@@ -48,7 +50,12 @@ function generateSiteMap(cfg: GlobalConfiguration, idx: ContentIndex): string {
   return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`
 }
 
-function generateRSSFeed(cfg: GlobalConfiguration, idx: ContentIndex, limit?: number): string {
+function generateRSSFeed(
+  cfg: GlobalConfiguration,
+  idx: ContentIndex,
+  limit?: number,
+  filterFn?: (slug: SimpleSlug, content: ContentDetails) => boolean
+): string {
   const base = cfg.baseUrl ?? ""
 
   const createURLEntry = (slug: SimpleSlug, content: ContentDetails): string => `<item>
@@ -60,6 +67,7 @@ function generateRSSFeed(cfg: GlobalConfiguration, idx: ContentIndex, limit?: nu
   </item>`

   const items = Array.from(idx)
+    .filter(([slug, content]) => !filterFn || filterFn(simplifySlug(slug), content))
     .sort(([_, f1], [__, f2]) => {
       if (f1.date && f2.date) {
         return f2.date.getTime() - f1.date.getTime()
@@ -71,6 +79,8 @@ function generateRSSFeed(cfg: GlobalConfiguration, idx: ContentIndex, limit?: nu
 
       return f1.title.localeCompare(f2.title)
     })
+
+  const posts = items
     .map(([slug, content]) => createURLEntry(simplifySlug(slug), content))
     .slice(0, limit ?? idx.size)
     .join("")
@@ -80,11 +90,11 @@ function generateRSSFeed(cfg: GlobalConfiguration, idx: ContentIndex, limit?: nu
     <channel>
       <title>${escapeHTML(cfg.pageTitle)}</title>
       <link>https://${base}</link>
-      <description>${!!limit ? i18n(cfg.locale).pages.rss.lastFewNotes({ count: limit }) : i18n(cfg.locale).pages.rss.recentNotes} on ${escapeHTML(
+      <description>${!!limit ? i18n(cfg.locale).pages.rss.lastFewNotes({ count: items.length }) : i18n(cfg.locale).pages.rss.recentNotes} on ${escapeHTML(
         cfg.pageTitle,
       )}</description>
       <generator>Quartz -- quartz.jzhao.xyz</generator>
-      ${items}
+      ${posts}
     </channel>
   </rss>`
 }
@@ -150,7 +160,7 @@ export const ContentIndex: QuartzEmitterPlugin<Partial<Options>> = (opts) => {
         emitted.push(
           await write({
             ctx,
-            content: generateRSSFeed(cfg, linkIndex, opts.rssLimit),
+            content: generateRSSFeed(cfg, linkIndex, opts.rssLimit, opts.filterFn),
             slug: "index" as FullSlug,
             ext: ".xml",
           }),
```

## Css pattern matching

> Turns out there is a way to do basic pattern matching as follows:
> 
> `[data-slug^="tracker-index/"][data-slug$="list"] {}`
> 
> This will apply to all data-slug that starts with index/ and ends in list

You can add css to specific page using `[data-slug=""]`

For example, if I want to customize the list items of the homepage:

```
[data-slug="index"] li {
margin-bottom: 0.2rem;
}
```

## Explorer filter multiple folders

Definitely got this from the discord but I forgot who said it

```ts title="quartz.layout.ts"
const explorerFilterFn = (node: FileNode) => {
return !["tags", "university"].some((path) => node.name.includes(path))
}
export const defaultListPageLayout: PageLayout = {
beforeBody: [Component.ArticleTitle()],
left: [
Component.Meta({ enableSearch: false, enableDarkMode: false }),
Component.MobileOnly(Component.Spacer()),
Component.Search(),
Component.Darkmode(),
Component.DesktopOnly(Component.Explorer({ filterFn: explorerFilterFn })),
],
right: [],
}
```

## Applying custom styling through writing markdown

1. write out some classes in `custom.scss`
2. In the markdown document you can just do something like this below, and it'll successfully apply the changes. 

```html
<div class="me">
<img src="src link"/>
</div>
```

Then in custom.css if this is an image:

```scss
@media (max-width: 480px) {
  .me {
    display: none;
  }
}
@media (min-width: 480px) {
  .me {
    width: 70%;
    padding: 10px;
  }

  .welcome {
    display: flex;
    align-items: center;
  }
}
```

Thanks [notes/quartz/styles/custom.scss at 9cb77ded4cd304f0046014c393605d72cc87a40d · ellie/notes · GitHub](https://github.com/ellie/notes/blob/9cb77ded4cd304f0046014c393605d72cc87a40d/quartz/styles/custom.scss) 

## Another way to change the search layout and spacing stuff, & changing the dividers

[jackyzha0.github.io/quartz/styles/custom.scss at b2f8a6e12c38e9d0989591a0564e0d7a3a812c99 · jackyzha0/jackyzha0.github.io · GitHub](https://github.com/jackyzha0/jackyzha0.github.io/blob/b2f8a6e12c38e9d0989591a0564e0d7a3a812c99/quartz/styles/custom.scss)

```scss title="custom.scss"
.left {
  display: grid !important;
  gap: 1.5rem !important;
  grid-template-columns: 1fr;
  grid-template-rows: min-content min-content min-content min-content;
  align-items: center;

  .page-title {
    grid-area: 1 / 1 / 2 / 3;
  }

  .search {
    grid-area: 2 / 1 / 3 / 2;
  }

  .darkmode {
    grid-area: 2 / 2 / 3 / 3;
  }

  .toc {
    grid-row: 3;
    grid-column: 1 / 3;
  }

  .recent-notes:nth-last-child(2) {
    grid-area: 3 / 1 / 3 / 3;
  }

  .recent-notes:nth-last-child(1) {
    grid-area: 4 / 1 / 4 / 3;
  }

  @media all and (max-width: $fullPageWidth) {
    display: flex !important;
  }
}

//// dividers ////

hr {
  overflow: visible;
  padding: 0;
  height: 0;
  margin: 4em auto;
  border: none;
  text-align: center;
  width: 100%;

  &:after {
    content: "* * *";
    display: inline-block;
    margin: -1em 0 0.5em;
    font-size: 1.5em;
    padding: 0.5em 1em;
    color: var(--gray);
  }
}
```

## Hide the horizontal scroll bars on code blocks

```scss title="base.scss"
pre {
...
  &:has(>code.mermaid) {...}
  & > code {
    ...
+    overflow-x: hidden;
etc etc
```

Although apparently it's better to just do a custom styling of the scroll bar, for accessibility. Don't know if hiding overflow-x would then prevent horizontal scroll... hmm... [[Scrollbars and styling]]

### (not really) Hide the popover-hint on certain pages

Classic "slug manipulation in the render page emitter". Thinking: in theory could do this tag-based by doing like frontmatter.tags.includes?

```html title="renderPage.tsx"
<div class="popover-hint">
  { slug.includes("writings") && beforeBody.map((BodyComponent) =>
    (<BodyComponent {...componentData} />))
  }
</div>
```

2024-08-05 - actually I tried this a while back and I don't think it worked. 

### Possible improvement to GiscusComments - the weird refreshing thing

[Giscus comments are not loaded except when you refresh the page multiple times · Issue #1418 · giscus/giscus · GitHub](https://github.com/giscus/giscus/issues/1418)

```html
    <script>
        let giscusTheme = localStorage.theme;
        let giscusAttributes = {
            "src": "https://giscus.app/client.js",
            "data-repo": "[ENTER REPO HERE]",
            "data-repo-id": "[ENTER REPO ID HERE]",
            "data-category": "[ENTER CATEGORY NAME HERE]",
            "data-category-id": "[ENTER CATEGORY ID HERE]",
            "data-mapping": "pathname",
            "data-strict": "1",
            "data-reactions-enabled": "1",
            "data-emit-metadata": "0",
            "data-input-position": "bottom",
            "data-theme": giscusTheme,
            "data-lang": "en",
            "data-loading": "lazy",
            "crossorigin": "anonymous",
            "async": ""};
        let giscusScript = document.createElement("script");
        Object.entries(giscusAttributes).forEach(([key, value]) => giscusScript.setAttribute(key, value));
        document.getElementById("comments").appendChild(giscusScript);
    </script>
```
### Removing the fade!! omg

[quartz/quartz/styles/base.scss at b37c408985878b04f6474c473e2b98c0fec728ab · jackyzha0/quartz · GitHub](https://github.com/jackyzha0/quartz/blob/b37c408985878b04f6474c473e2b98c0fec728ab/quartz/styles/base.scss#L530)

this specific line of code linked above ^^

### Tag-based explorer (!!!)

charnia_md _—_ 02/20/2024 9:48 AM

> I made a component based on Explorer which builds its content by the hierarchy of tags (and subtags) instead of the filetree. Every tag will be listed as a folder in the Explorer component, with its contents the pages which contain these tags and any subtags (also folders). Those interested can find the fork here: [https://github.com/CVanmarcke/quartz](https://github.com/CVanmarcke/quartz "https://github.com/CVanmarcke/quartz") If you just want the .tsx files: they are called TagExplorer.tsx and TagExplorerNode.tsx, both located in quartz/components.

[Added support to build explorer from tag instead of files. · jackyzha0/quartz@ea5189e · GitHub](https://github.com/jackyzha0/quartz/commit/ea5189e0b4db9cfb29fd42dec80f2e105e42d46c) 

Above commit says in description:

> To apply, add the "content" option with value "tags" to Component.Explorer: eg Component.Explorer({content: "tags",})

[Added TagExplorer component · jackyzha0/quartz@fbeda1d · GitHub](https://github.com/jackyzha0/quartz/commit/fbeda1dcc0117263af9514bd7aad0fa3b954a97e) 

SanAlphaTau — 07/09/2024 1:18 PM

> I just subbed in Componet.Explorer() calls to Component.TagExplorer() calls and it seems to work.  I also added a MobileOnly call to tag explorer in the before section so on mobile you can see it. I think the only thing left is to sort out this listing thing and then I have pretty much everything I want for the site. I'm trying to make a directory for ppl in my org to see what everyone else is doing/skills they have. hence the need to focus on tags and lsiting ppl with certain tags

### Custom landing page

[add landing page · Socratica-Org/toolbox@3d6130b · GitHub](https://github.com/Socratica-Org/toolbox/commit/3d6130bcb67734cba902216dfa7ca653576fa328#diff-a4f40b84fbcf1a7939d596dca4939bbae6e56c05ad06a62b719b42693a9baf07)

Basically the index.md in the main content folder is blank except for title, and then other stuff is in the Landing.tsx page. Then they use a slug === index to put in the landing page and then any other index.md content after that. 

[Discord](https://discordapp.com/channels/927628110009098281/1211952698673602580) --> the forum thread

### Conditional footer elements - 

sjgknight — 05/19/2024 5:31 PM

> I've resolved this, in quartzlayout.ts add fields, e.g.

```
footer: Component.Footer({

    links: {

      GitHub: "https://github.com/",

    },

    acknowledgement: "hello acknowledgement",

    funding: "hello funding"

  }),

}
```

> In Footer.tsx inside the `const Footer: QuartzComponent`... stuff add:

```
// To determine the appropriate footer component based on the slug

 slug = fileData.slug

// Custom fields to retrieve and add on key slug page

const acknowl = opts?.acknowledgement ?? []

const fund = opts?.funding ?? []
```

> And also add fileData to make the slug available
> 
>   `const Footer: QuartzComponent = ({fileData, displayClass, cfg }: QuartzComponentProps) => {`
> 
> Then in the return you can add conditional elements

```
<p>
  {slug.includes("yourproject") && (
  <>
  {acknowl}
  <br />
  {fund}
   </>
)}
</p>
```

### Simpler option for conditional elements - for not rendering on certain slugs

Simen _—_ 03/16/2024 4:34 AM

> Hi there! Sorry for the late reply. Actually I didn't, and then I kinda gave up, but I tried it again now, and got it to work! I just put this code snippet:
> 
> `// if the page slug is "index", don't render anything   if (fileData.slug === "index") {     return <></>   }`
> 
> in `backlinks.tsx`, on line 14: as you can see the image here (edited)

![[Quartz Snippets_image_1.png]]

### Adding an ID to components? to allow conditional filtering

[Staging by ransurf · Pull Request #9 · ransurf/lyt-quartz · GitHub](https://github.com/ransurf/lyt-quartz/pull/9/commits/1f2b4f6bfe97f7c7fab0c2314141087761532539) 

### Pseudocode

Lasym — 04/04/2024 7:57 AM

> Hey there !
> 
> I just implemented quartz-pseudocode, a plugin for Quartz that allows you to render pseudocode and algorithms written in LaTex using pseudocode.js. It integrates with obsidian-pseudocode transparently.
> 
> It is similar to what @aaron did in the message I'm responding to, however there are two key differences :
> 
> It runs at build time, meaning the client does not need to render the pseudocode by itself, and only a CSS sheet is added
> 
> It is installable through NPM. Just follow the instructions of the README in the repo below (npm install quartz-pseudocode plus add it to quartz.config.ts manually)
> 
> The repo : https://github.com/MaelImhof/quartz-pseudocode
> 
> Let me know if you use and like it, or if on the contrary it does not work lmao. Should be relatively stable, I'm using it myself.
> 
> Cheers !

### Fancy text

From nara on discord.

[feat(fancytext): added fancytext transformer that adds custom effect … · Naraenda/quartz-ascone@6c094df · GitHub](https://github.com/Naraenda/quartz-ascone/commit/6c094df3ac0863d0f13690ca2136ad894943e76e)

- also a good example of a transformer plugin

### Sticky notes 

[feat: add transformer to add dragable sticky notes (no css) · jackyzha0/quartz@d993faf · GitHub](https://github.com/jackyzha0/quartz/commit/d993fafcbd0062458f3ae6158d607e4f513303d5)

### Disable explorer toggle

[feat: disable explorer toggle and folder toggle · jackyzha0/quartz@d95aa0e · GitHub](https://github.com/jackyzha0/quartz/commit/d95aa0e24c082fd599f21ec7b78cd6c0e1f13ad3)

### Include a custom font

[How to include a font .ttf using CSS ? - GeeksforGeeks](https://www.geeksforgeeks.org/how-to-include-a-font-ttf-using-css/)

### Navbar

Não é o Merrei _—_ 07/06/2024 1:39 PM

> - Following [https://quartz.jzhao.xyz/advanced/creating-components#using-a-component](https://quartz.jzhao.xyz/advanced/creating-components#using-a-component "https://quartz.jzhao.xyz/advanced/creating-components#using-a-component"), I added the newly-created "LinksHeader" component (i.e. the `LinksHeader.tsx` file) inside the `quartz/components/index.ts` file to the import **and** the export
> - Called the LinksHeader component in `quartz.layout.ts` (in Quartz's root folder) as camargomau's [https://github.com/camargomau/notkesto-site/blob/v4/quartz.layout.ts](https://github.com/camargomau/notkesto-site/blob/v4/quartz.layout.ts "https://github.com/camargomau/notkesto-site/blob/v4/quartz.layout.ts")
Add in some CSS from the Morrowmind wiki (creds MassiveJuice)
```css
@media screen and (max-width: $mobileBreakpoint) {
  #links-header {
    flex-wrap: nowrap;
    justify-content: space-between;
    overflow: scroll;
    white-space: nowrap;
  }
}
```

### Push a custom frontmatter property

MCMBen _—_ 03/26/2024 4:13 AM

> OK, figured it out already. No frontmatter.ts edit. Added the following to ContentMeta.tsx:

```tsx title='ContentMeta.tsx'
      // Display revision time if enabled
      if (options.showRevision) {
        const revision = fileData.frontmatter?.revision
        if (revision != null) {
          const displayedRev = "revision: " + revision
          segments.push(displayedRev)
        }
      }
```

