---
date created: 2024-07-09T02:02
date modified: 2024-07-31T16:56
---

Misc ideas: 

- emitter: a page with all the exploring-related things? take inspo from custom landing page. --> prob want new file to define layouts
- transformer: add some subtitle stuff based on lastmod transformer and adding to createdmodifieddate
- feature: copy current URL to clipboard

Also: [[Cool other websites]]

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

Although apparently it's better to just do a custom styling of the scroll bar, for accessibility. Don't know if hiding overflow-x would then prevent horizontal scroll... hmm... 

### Hide the popover-hint on certain pages

Classic "slug manipulation in the render page emitter". Thinking: in theory could do this tag-based by doing like frontmatter.tags.includes?

```html title="renderPage.tsx"
<div class="popover-hint">
  { slug.includes("writings") && beforeBody.map((BodyComponent) =>
    (<BodyComponent {...componentData} />))
  }
</div>
```
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

