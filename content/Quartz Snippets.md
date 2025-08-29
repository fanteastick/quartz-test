---
date created: 2024-07-09T02:02
date modified: 2025-08-28T21:54
---

Misc ideas, code, and plugins for quartz that I've collected across the web. %% [[Todo]] %%

- [x] emitter: a page with all the exploring-related things? take inspo from custom landing page. --> prob want new file to define layouts
	- Ended up making a [[Map]]
- [x] transformer: add some subtitle stuff based on lastmod transformer and adding to createdmodifieddate
- [x] feature: copy current URL to clipboard
	- ended up being a "copy permalink to clipboard"
- [-] auto unsubscribe from giscus discussion
	- temporary solution: a note in the first comment with some info about how to unsubscribe
- [x] Folder page - consistency for subfolder pages, also show an icon if something is a subfolder?
	- **This got addressed as part of quartz 4.4** [feat(folder): add intermediate folders pages by tha00 · Pull Request #1295 · jackyzha0/quartz](https://github.com/jackyzha0/quartz/pull/1295) 
	- And then this is my fix: [add emoji before folder titles on tab previews and remove index pgs f… · fanteastick/quartz-test@ba1aedc](https://github.com/fanteastick/quartz-test/commit/ba1aedc438113fd4bb323edf5d68ae3b76873a22) 

- [ ] Footnotes are still super jank
	- if you have a footnote, and you transclude the last heading of a file, the transclude will include the footnotes. 
	- If you have a transclude that has a footnote, like to another header or something, it only has the `#headername` so it'll just try to go to current page's `#headername` which is incorrect.
- [-] make the click to copy permalink thing stop being sticky
- [ ] make strikethrough's [-] look like how they're intended
- [x] copy/pull in the telescoping text just because it looks fun af
- [x] figure out how cssclasses work. like with RTL text? 

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

Giscus is the same as utterances but better bc newer and discussions rather than github issues. 

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

## Changing the dividers

[jackyzha0.github.io/quartz/styles/custom.scss at b2f8a6e12c38e9d0989591a0564e0d7a3a812c99 · jackyzha0/jackyzha0.github.io · GitHub](https://github.com/jackyzha0/jackyzha0.github.io/blob/b2f8a6e12c38e9d0989591a0564e0d7a3a812c99/quartz/styles/custom.scss)

```scss title="custom.scss"
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

## Removing the fade!! omg

[quartz/quartz/styles/base.scss at b37c408985878b04f6474c473e2b98c0fec728ab · jackyzha0/quartz · GitHub](https://github.com/jackyzha0/quartz/blob/b37c408985878b04f6474c473e2b98c0fec728ab/quartz/styles/base.scss#L530)

this specific line of code linked above ^^

## Tag-based explorer (!!!)

charnia_md _—_ 02/20/2024 9:48 AM

> I made a component based on Explorer which builds its content by the hierarchy of tags (and subtags) instead of the filetree. Every tag will be listed as a folder in the Explorer component, with its contents the pages which contain these tags and any subtags (also folders). Those interested can find the fork here: [https://github.com/CVanmarcke/quartz](https://github.com/CVanmarcke/quartz "https://github.com/CVanmarcke/quartz") If you just want the .tsx files: they are called TagExplorer.tsx and TagExplorerNode.tsx, both located in quartz/components.

[Added support to build explorer from tag instead of files. · jackyzha0/quartz@ea5189e · GitHub](https://github.com/jackyzha0/quartz/commit/ea5189e0b4db9cfb29fd42dec80f2e105e42d46c) 

Above commit says in description:

> To apply, add the "content" option with value "tags" to Component.Explorer: eg Component.Explorer({content: "tags",})

[Added TagExplorer component · jackyzha0/quartz@fbeda1d · GitHub](https://github.com/jackyzha0/quartz/commit/fbeda1dcc0117263af9514bd7aad0fa3b954a97e) 

SanAlphaTau — 07/09/2024 1:18 PM

> I just subbed in Componet.Explorer() calls to Component.TagExplorer() calls and it seems to work.  I also added a MobileOnly call to tag explorer in the before section so on mobile you can see it. I think the only thing left is to sort out this listing thing and then I have pretty much everything I want for the site. I'm trying to make a directory for ppl in my org to see what everyone else is doing/skills they have. hence the need to focus on tags and lsiting ppl with certain tags

## Custom landing page

[add landing page · Socratica-Org/toolbox@3d6130b · GitHub](https://github.com/Socratica-Org/toolbox/commit/3d6130bcb67734cba902216dfa7ca653576fa328#diff-a4f40b84fbcf1a7939d596dca4939bbae6e56c05ad06a62b719b42693a9baf07)

Basically the index.md in the main content folder is blank except for title, and then other stuff is in the Landing.tsx page. Then they use a slug === index to put in the landing page and then any other index.md content after that. 

[Discord](https://discordapp.com/channels/927628110009098281/1211952698673602580) --> the forum thread

## Conditional footer elements

sjgknight — 05/19/2024 5:31 PM

> I've resolved this, in quartzlayout.ts add fields, e.g.

```ts title="quartz.layout.ts"
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

```tsx title="Footer.tsx"
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

```tsx title-"Footer.tsx"
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

## Pseudocode

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

## Fancy text

From nara on discord.

[feat(fancytext): added fancytext transformer that adds custom effect … · Naraenda/quartz-ascone@6c094df · GitHub](https://github.com/Naraenda/quartz-ascone/commit/6c094df3ac0863d0f13690ca2136ad894943e76e)

- also a good example of a transformer plugin

## Sticky notes 

[feat: add transformer to add dragable sticky notes (no css) · jackyzha0/quartz@d993faf · GitHub](https://github.com/jackyzha0/quartz/commit/d993fafcbd0062458f3ae6158d607e4f513303d5)

## Disable explorer toggle

[feat: disable explorer toggle and folder toggle · jackyzha0/quartz@d95aa0e · GitHub](https://github.com/jackyzha0/quartz/commit/d95aa0e24c082fd599f21ec7b78cd6c0e1f13ad3)

## Include a custom font

[How to include a font .ttf using CSS ? - GeeksforGeeks](https://www.geeksforgeeks.org/how-to-include-a-font-ttf-using-css/)

## Push a custom frontmatter property

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

## Get rid of other tags on tag pages

![[Quartz Snippets_image_1.png]]

## Plugin to check for broken internal links

Uses a github action js thing

[feat: 内部坏链检测 · CatCodeMe/catcodeme.github.io@39c0c76 · GitHub](https://github.com/CatCodeMe/catcodeme.github.io/commit/39c0c7601e6aeb0e9bf7b9097136b54ce03be901#diff-423163b8d1e151b7ace8c88fc02201131fb663a5d05480aa95d793903dcf349c) 

Alternatively: [Lighter color for broken internal link · LesleyLai/digital-garden@37e787f · GitHub](https://github.com/LesleyLai/digital-garden/commit/37e787f18f831667adc9058f5a058f1494677108) 

## Visible properties

[Visible properties · LesleyLai/digital-garden@fc2e513 · GitHub](https://github.com/LesleyLai/digital-garden/commit/fc2e513565c46b6b0d67a4eaa921a144c6a23f00)

## Copy raw markdown 

[Quartz copy raw markdown component · GitHub](https://gist.github.com/MaxWolf-01/354de940ad7ed80a9f2fe9884f5c99bc) 

## Chess

[GitHub - MihailKovachev/shaahmaat-quartz](https://github.com/MihailKovachev/shaahmaat-quartz) 

## Show any frontmatter properties

[GitHub - michelepapucci/quartz-visible-obsidian-property: A Quartz fork, with a new component to show any kind of Frontmatter Obsidian Property on the pages.](https://github.com/michelepapucci/quartz-visible-obsidian-property) 

## ySomic - timelines and transcludes

ySomic — 2/17/2025 2:22 AM

If you want a type of timeline that looks like this

Here are the plugins

- [util](https://github.com/MathieuDR/obsidian-garden/blob/v4/quartz/util/timeline.ts)
- [emitter](https://github.com/MathieuDR/obsidian-garden/blob/v4/quartz/plugins/emitters/timelinePages.ts) (recent & timeline page)
- [component](https://github.com/MathieuDR/obsidian-garden/blob/v4/quartz/components/timeline.tsx)
- [simple tag list](https://github.com/MathieuDR/obsidian-garden/blob/v4/quartz/components/simpleTagList.tsx) (extracted from [TagList](https://github.com/MathieuDR/obsidian-garden/blob/v4/quartz/components/TagList.tsx)
- [logger util](https://github.com/MathieuDR/obsidian-garden/blob/v4/quartz/util/log.ts)
- [Folder emitter](https://github.com/MathieuDR/obsidian-garden/blob/v4/quartz/plugins/emitters/folderPage.tsx) if you want to change it into this style
- [Tag Emitter](https://github.com/MathieuDR/obsidian-garden/blob/v4/quartz/plugins/emitters/tagPage.tsx) if you want to change that

Transcluding to unpublished notes:

[obsidian-garden/quartz/plugins/transformers/transclude.ts](https://github.com/MathieuDR/obsidian-garden/blob/v4/quartz/plugins/transformers/transclude.ts) 

and a logger

[obsidian-garden/quartz/util/log.ts](https://github.com/MathieuDR/obsidian-garden/blob/v4/quartz/util/log.ts) 

## Publishers

[GitHub - konstfish/quartz-build-action: 💎 A simple GitHub Action for producing Quartz build artifacts](https://github.com/konstfish/quartz-build-action) 

[GitHub - Enveloppe/obsidian-enveloppe: Enveloppe helps you to publish your notes on a GitHub repository from your Obsidian Vault, for free!](https://github.com/Enveloppe/obsidian-enveloppe) 

[GitHub - CatCodeMe/ccm-publisher: a plugin for obsidian to publish your notes to github](https://github.com/CatCodeMe/ccm-publisher) 

[GitHub - saberzero1/quartz-syncer: Manage your Quartz site content from inside Obsidian. Full support for Dataview and Excalidraw.](https://github.com/saberzero1/quartz-syncer) 

[GitHub - saberzero1/quartz-themes: Obsidian 🤝 Quartz. Quartz compatible Obsidian Themes.](https://github.com/saberzero1/quartz-themes) 

## Another mobile explorer

SpikeSpiegel — 9/14/2024 2:26 PM

> Hey y'all, I wrote a new layout component for a pop-out explorer menu - suitable for providing an explorer on smaller viewports!! Video shows it in action on my phone. You can look at the code at [https://github.com/MikeKneeB/quartz-site/tree/main/extra/components](https://github.com/MikeKneeB/quartz-site/tree/main/extra/components "https://github.com/MikeKneeB/quartz-site/tree/main/extra/components") (although it probably won't be a simple c&p drop in because of my docker/compose setup - but it shouldn't be too hard to modify it to fit in your projects as well if you want it). It's based extensively off the existing `Explorer` & `Search` components (and makes use of some of the existing `Explorer` code where possible). TS/JS isn't my most comfortable language, so possibly some mistakes in there - but it seems to all be working as expected!

[https://gentlyrotting.online/](https://gentlyrotting.online/ "https://gentlyrotting.online/") !

## Multi column callouts from just scss

tiagoprudente — 2/25/2025 5:56 PM

```scss
@use "./base.scss";
@use "./themes";

/* === Multi Column Callout para Quartz === */

/* Variáveis básicas */
:root {
  --callout-min-width: 200px;
  --callout-gap: 1em;
}

/* Estilo para o callout multi-column */
.callout[data-callout="multi-column"] {
  display: flex;
  flex-wrap: wrap;
  gap: var(--callout-gap);
  background: transparent;
  border: none;
  padding: 0;
}

/* Remover título do callout principal */
.callout[data-callout="multi-column"] > .callout-title {
  display: none;
}

/* Fazer o conteúdo do callout principal ocupar todo o espaço */
.callout[data-callout="multi-column"] > .callout-content {
  display: flex;
  flex-wrap: wrap;
  gap: var(--callout-gap);
  width: 100%;
}

/* Estilo para os callouts internos */
.callout[data-callout="multi-column"] > .callout-content > .callout {
  flex: 1 1 var(--callout-min-width);
  margin: 0;
}

/* Variação para 2 colunas fixas */
.callout[data-callout="multi-column"][data-callout-metadata*="col2"] > .callout-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

/* Variação para 3 colunas fixas */
.callout[data-callout="multi-column"][data-callout-metadata*="col3"] > .callout-content {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

/* Opções de largura para sub-callouts */
div[data-callout="multi-column"].callout > .callout-content > div[data-callout-metadata*="wide-2"] { 
  flex-grow: 2; 
}

div[data-callout="multi-column"].callout > .callout-content > div[data-callout-metadata*="wide-3"] { 
  flex-grow: 3; 
}

```

## Carousel??

[quartz/quartz\_edit\_log.md at 96625516a5be9cecf4a623afcba3f5808213b58d · hintzd/quartz · GitHub](https://github.com/hintzd/quartz/blob/96625516a5be9cecf4a623afcba3f5808213b58d/quartz_edit_log.md)

Alternatively Pinei on discord 2025-06-06

It doesn't really work

## Link cards

[feat(linkcard): add rich Link Card transformer & component by Tsuuuuuuun · Pull Request #2015 · jackyzha0/quartz · GitHub](https://github.com/jackyzha0/quartz/pull/2015/files) 

## Code runner

[GitHub - Gassandrid/Quartz\_CodeRunner\_Plugin: a python code runner for Quartz static site generator](https://github.com/Gassandrid/Quartz_CodeRunner_Plugin?tab=readme-ov-file)

## Jupyter notebook embed

[GitHub - vazome/quartz-jupyter-embed-plugin: A minimal Quartz plugin for embedding and displaying Jupyter notebooks, with setup instructions and required dependencies.](https://github.com/vazome/quartz-jupyter-embed-plugin)

## Clickable images/zoom (lightbox)

[GitHub - vazome/quartz-clickable-images-zoom-plugin: Enabled Lightbox zoom for Quartz built websites](https://github.com/vazome/quartz-clickable-images-zoom-plugin) 

## Sidenotes (2 implementations)

aarnphm: [chore: update latest · jackyzha0/quartz@ea6424f · GitHub](https://github.com/jackyzha0/quartz/commit/ea6424fed021f3daa6f25e89fe2e86b93d61dec1) 

Hsterts: [Respirology, Fundamentals, Sidenotes · NoNotNotes/Mneme@f2915bd · GitHub](https://github.com/NoNotNotes/Mneme/commit/f2915bdab6af92af86d02cb696e7bfd363d221eb#diff-93aab2f7a8ada0a9294ac8b5546963b65f4b9d7686449731e6158752ea670ba8) 

## Similar articles listing

[Comparing jackyzha0:v4...ketsapiwiq:similar-articles-plugin · jackyzha0/quartz · GitHub](https://github.com/jackyzha0/quartz/compare/v4...ketsapiwiq:quartz:similar-articles-plugin) 

## Self-hosting isso comments

[Self-hosting isso-comments](https://garden.bencuan.me/homelabbing/Self-hosting-isso-comments) by bencuan

Relevant commit: [add subpage comments · 64bitpandas/garden@8225f95 · GitHub](https://github.com/64bitpandas/garden/commit/8225f9571e635981638c7b2539599608f0d50639) 

## Another view image transformer

[Comments](https://xlenco-v4.quartz-1h4.pages.dev/features/comments)

[Comparing jackyzha0:v4...xlenco:v4 · jackyzha0/quartz · GitHub](https://github.com/jackyzha0/quartz/compare/v4...xlenco:quartz-1:v4) 

```
import { QuartzTransformerPlugin } from "../types"

// ViewImage.js灯箱插件
// 简化版实现
export const ViewImage: QuartzTransformerPlugin = () => {
  return {
    name: "ViewImage",
    externalResources() {
      return {
        js: [
          {
            src: "https://cdn.jsdelivr.net/gh/Tokinx/ViewImage/view-image.min.js",
            loadTime: "afterDOMReady",
            contentType: "external",
          },
          {
            script: `
              // 简单的初始化代码
              document.addEventListener('DOMContentLoaded', function() {
                if (window.ViewImage) {
                  // 使用更通用的选择器
                  ViewImage.init('article img, .content img');
                  // 添加视觉反馈
                  const style = document.createElement('style');
                  style.textContent = 'article img, .content img { cursor: zoom-in; border: 2px dashed #284b63; }';
                  document.head.appendChild(style);
                  console.log('ViewImage灯箱插件已初始化');
                } else {
                  console.error('ViewImage库未加载成功');
                }
              });
            `,
            loadTime: "afterDOMReady",
            contentType: "inline",
          },
        ],
      }
    },
  }
}

// 告诉TypeScript我们添加的内容
declare module "vfile" {
  interface DataMap {
    viewImage?: boolean
  }
}
```