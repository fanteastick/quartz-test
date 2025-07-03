---
date created: 2024-06-06T22:54
date modified: 2025-07-03T00:35
tags:
  - recents-exclude
---

These are all the things that I changed in my Quartz setup, and approximately where in the code they were changed. This is organized in reverse chronological order (newest first) of when I first added the modification. If I change it later, I'll try to go back and edit the code, but I won't move it in the order. These are some cool quartz modifications that I see across the internet, but I don't feel like adding just yet: [[Quartz Snippets]]

Github repo: [GitHub - fanteastick/quartz-test: Personal website built with Quartz](https://github.com/fanteastick/quartz-test)

All changes made by me: [Commits · fanteastick/quartz-test · GitHub](https://github.com/fanteastick/quartz-test/commits?author=fanteastick) 

Misc things to remember:

- attachment folders won't show up if there's no `.md` files in them. 
- old changes should be added to [[Quartz customization graveyard]]

> [!success] Some changes that took some effort, or I really like how it turned out ☺
> Hiding things from various components
> 
> Forcing icons in a row and making a map
> 
> Tag and folder pages having an emoji 📂🔖
> 
> Random page link (logic not mine originally, it's from t-schreibs)
> 
> Not mine but super useful: OnlyFor, NotFor, ComponentGroup
> 
> External link styling
>
> Click permalink to copy to clipboard, with a little notification box

> [!example]- Mentions across the web! 🕸
> Yippee! I'm grateful to people who use or take inspiration from my changes and give a little shoutout. I'm glad this was useful to you 😄 I'm a mega lurker fr
> 
> - [Quartz Changelog](https://www.stevensmith.me/Notes/Quartz-Changelog) by Steven Smith
> - [Quartz customization log \| Lesley's Digital Garden](https://notes.lesleylai.info/Concepts/Quartz-customization-log) 
> - [Quartz Build and Changelog](https://aneurokumar.github.io/website/Second-Brain/quartz-website-project-notes#changelog) by Anu Kumar (aneurokumar)
> - [Customize your Quartz instance](https://zoylendt.github.io/Posts/quartz-customize) by zoylendt
> - [👋 Welcome \| sidbin](https://sidb.in/)
> - [Credits and Readmes](https://morrowind-modding.github.io/credits-and-readmes/#eilleens-online-everything-notebook) on the Morrowind Modding Wiki
> - [Quartz Cheatsheet](https://abi-is-here.github.io/niwa/software/quartz/quartz-cheatsheet) by abi-is-here
> - [Ben's Garden](https://garden.bencuan.me/about/Inspiration) 

## Clickable images

[GitHub - vazome/quartz-clickable-images-zoom-plugin: Enabled Lightbox zoom for Quartz built websites](https://github.com/vazome/quartz-clickable-images-zoom-plugin)

Lightbox effect. Works completely fine with the image carousel. pretty good! I could write up/merge some other plugins to also follow this format; I only skimmed, but it should be a great reference.

## Image carousel

[feat: Add Carousel plugin for interactive image galleries by pinei · Pull Request #2011 · jackyzha0/quartz · GitHub](https://github.com/jackyzha0/quartz/pull/2011) -- alternatively explained here: [A Carousel component for Quartz v4.5 · GitHub](https://gist.github.com/pinei/14545e81e8629eed72b55fce1cbd7822) 

Photos from unsplash

<Carousel>
<img src="attachments/Quartz customization log_image_3.png" alt="Description of image 1"/>
<img src="attachments/Quartz customization log_image_2.png" alt="Description of image 2"/>
<img src="attachments/Quartz customization log_image_1.png" alt="Description of image 3"/>
</Carousel>

You need to ensure that the Carousel plugin is at the very bottom... I guess... Not sure why, also makes it not super compatible with other plugins. Maybe I'll get in there and figure out something. 

## Cards and such

[[list cards proof of concept]] with [[Quartz Cheatsheet#CSSClasses]]

[[Fish homepage]] is another demo

## Upgrading to quartz 4.5

[[Upgrading to quartz 4.5]]

## Superscript styling

Sometimes a footnote will make the line spacing weird. [^1]

```scss title="custom.scss"
//superscripts aka footnotes being small and middled
sup {
  font-size: 0.65em;
  vertical-align: top;
}
```
## Many callouts borrowed from MMW

[Custom Formatting Features](https://morrowind-modding.github.io/contributing/custom-formatting-features) from MassiveJuice's Morrowind Modding Wiki, accessed on 2025-03-07 with [Attribution-ShareAlike 4.0 International License](https://github.com/morrowind-modding/morrowind-modding.github.io/blob/main/LICENSE)

- [callout-adjustments.scss](https://github.com/morrowind-modding/morrowind-modding.github.io/blob/main/quartz/styles/custom/callout-adjustments.scss) 
- [caption-callout.scss](https://github.com/morrowind-modding/morrowind-modding.github.io/blob/main/quartz/styles/custom/caption-callout.scss) 
- [column-callout.scss](https://github.com/morrowind-modding/morrowind-modding.github.io/blob/main/quartz/styles/custom/column-callout.scss) 
- [infobox-callout.scss](https://github.com/morrowind-modding/morrowind-modding.github.io/blob/main/quartz/styles/custom/infobox-callout.scss) 
- kbd from [custom.scss](https://github.com/morrowind-modding/morrowind-modding.github.io/blob/3bfa2d43f5d1ef7c065a3a6f4ee884b264cc8c1f/quartz/styles/custom.scss#L67)

> [!caption|center] 
> 
>  ![[Ollama_image_1.png]]
>   Image caption.

Columns: 

> [!column] ggg
>
> > [!note] title
> >
> > content
>
> > [!column] title
> >
> > content

> [!infobox]
> 
> 
> ## Article Title
> 
> ![[Every type of flip flop_image_5.png]]
> 
> ### Table Heading
> 
> | Type | Name |
> | --- | --- |
> | Row | Row |
> | Row | Row |

## Custom Callouts and admonition

Just following the documentation for Quartz. Also Admonition has a built-in "convert to callout" button. 

> [!tree]- hehehe
> treehehe

> [!tree]+ hehehe
> treehehe
>
>  
> `.callout[data-callout="tree"] { --callout-color: #7d7d7d; --callout-icon: "<svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"tree\" class=\"svg-inline--fa fa-tree fa-w-12\" role=\"img\" x`

Original when I did "download callouts":

`.callout[data-callout="tree"] { --callout-color: #7d7d7d; --callout-icon: "<svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"tree\" class=\"svg-inline--fa fa-tree fa-w-12\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 384 512\"><path fill=\"currentColor\" d=\"M378.31 378.49L298.42 288h30.63c9.01 0 16.98-5 20.78-13.06 3.8-8.04 2.55-17.26-3.28-24.05L268.42 160h28.89c9.1 0 17.3-5.35 20.86-13.61 3.52-8.13 1.86-17.59-4.24-24.08L203.66 4.83c-6.03-6.45-17.28-6.45-23.32 0L70.06 122.31c-6.1 6.49-7.75 15.95-4.24 24.08C69.38 154.65 77.59 160 86.69 160h28.89l-78.14 90.91c-5.81 6.78-7.06 15.99-3.27 24.04C37.97 283 45.93 288 54.95 288h30.63L5.69 378.49c-6 6.79-7.36 16.09-3.56 24.26 3.75 8.05 12 13.25 21.01 13.25H160v24.45l-30.29 48.4c-5.32 10.64 2.42 23.16 14.31 23.16h95.96c11.89 0 19.63-12.52 14.31-23.16L224 440.45V416h136.86c9.01 0 17.26-5.2 21.01-13.25 3.8-8.17 2.44-17.47-3.56-24.26z\"></path></svg>"; } {:css}`

Remove the `"\` and wrap it all in single quotes with `data:image/svg+xml; utf8, ` at the beginning. `--bg` is background color and `--color` is text color of the title.

```css title="callouts.scss"
.callout {
  &[data-callout="tree"] {
    --bg: #7d7d7d;  
    --callout-icon: url('data:image/svg+xml; utf8, <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="tree" class="svg-inline--fa fa-tree fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M378.31 378.49L298.42 288h30.63c9.01 0 16.98-5 20.78-13.06 3.8-8.04 2.55-17.26-3.28-24.05L268.42 160h28.89c9.1 0 17.3-5.35 20.86-13.61 3.52-8.13 1.86-17.59-4.24-24.08L203.66 4.83c-6.03-6.45-17.28-6.45-23.32 0L70.06 122.31c-6.1 6.49-7.75 15.95-4.24 24.08C69.38 154.65 77.59 160 86.69 160h28.89l-78.14 90.91c-5.81 6.78-7.06 15.99-3.27 24.04C37.97 283 45.93 288 54.95 288h30.63L5.69 378.49c-6 6.79-7.36 16.09-3.56 24.26 3.75 8.05 12 13.25 21.01 13.25H160v24.45l-30.29 48.4c-5.32 10.64 2.42 23.16 14.31 23.16h95.96c11.89 0 19.63-12.52 14.31-23.16L224 440.45V416h136.86c9.01 0 17.26-5.2 21.01-13.25 3.8-8.17 2.44-17.47-3.56-24.26z"></path></svg>');
  }
}
```

### New callout styling

Taking code from [Kepano's minimal theme](https://github.com/kepano/obsidian-minimal/blob/de81e71afb7a60ec5e82b6dd88a989f74785a28d/src/scss/content/callouts.scss#L3) to make callouts a bit cuter. This breaks the "closing" animation because the title becomes `overflow:visible`, and then the content is forced 0 when collapsed to make sure that doesn't overflow, which then doesn't play well with the transition from `max-height` to `max-height`. 

> [!CODE]- callout.scss edits
> ```scss title="callout.scss"
> .callout {
>   border: 4px double var(--border);
>   background-color: var(--bg);
>   border-radius: 5px;
>   padding: 0 1rem;
>   transition: max-height 0.3s ease, padding 0.3s ease;
>   box-sizing: border-box;
>   overflow: visible;
>   background-color: transparent;
>   margin-bottom: 1.5em;
> 
>   & > .callout-content {
>       overflow: hidden;
>       // transition: max-height 0.3s ease, padding 0.3s ease;
>   }
> 
>   & > .callout-content > :first-child {
>     margin-top: 0;
>   }
>   
>   &.is-collapsed {
>     min-height: 36px;
>     max-height: 36px;
>     transition: max-height 0.3s ease, padding 0.3s ease;
>     padding: 0 1rem;
> }
> 
>   &.is-collapsed > .callout-content {
>     max-height: 0;
>     padding: 0 1rem;
>     overflow: hidden;
>   }
> 
>   &.is-collapsed > .callout-title > .fold-callout-icon {
>     transform: rotateZ(-90deg);
>   }
> 
> ...
> 
> .callout-title {
>   display: flex;
>   align-items: flex-start;
>   gap: 5px;
>   color: var(--darkgray);
>   // some custom changes to match kepano minimal outline, ez 03/06/2025
>   padding: 0 0.5em;
>   margin-top: -24px;
>   width: fit-content;
>   margin-left: -0.75em;
>   background-color: var(--light);
>   letter-spacing: 0.05em;
>   font-variant-caps: all-small-caps;
>   padding-top: 12px;
> ```

## ABC js plugin

[[abc js plugin(ish)]] - I mostly did this because it was (supposed to be) easy and I wanted to better understand how to make transformers.

```music-abc
X:1
T:The Legacy Jig
M:6/8
L:1/8
R:jig
K:G
GFG BAB | gfg gab | GFG BAB | d2A AFD |
GFG BAB | gfg gab | age edB |1 dBA AFD :|2 dBA ABd |:
efe edB | dBA ABd | efe edB | gdB ABd |
efe edB | d2d def | gfe edB |1 dBA ABd :|2 dBA AFD |]
```

## Text replacer simple transformer

This needs to go before any of the markdown parsers, because regex markdown is easier than trying to regex html. 

Perplexity 

[quartz-test/quartz/plugins/transformers/\_myTextReplacer.ts](https://github.com/fanteastick/quartz-test/blob/139863e971ad17b4d59c3332851d4c1a5fba4410/quartz/plugins/transformers/_myTextReplacer.ts#L4) 

## Checkbox height

```scss title="base.scss"
input[type="checkbox"] {
  transform: translateY(2px);
  transform: translateY(5px);
```
## Password-locked pages

Full guide: [[Password on Quartz via client encryption with Staticrypt]] 

Demo: [Protected Page](https://blog.eilleeenz.com/password-tester) with password "underwater"

Alternatively [[password locked page]] with password "gg"

![[Password on Quartz via client encryption with Staticrypt_image_1.png|360]]

Another method: [[passphrase encrypted page]] with [Pull Request #1481 · feat: allow to set password-protected notes by dynamotn](https://github.com/jackyzha0/quartz/pull/1481) 

## Graph fixes on radial and list pages

### Radial graph shifting and titles

With radial mode on the global graph, there's this weird sliding effect that makes the nodes start to the right and drift to the center, and then when you grab a node, they all shift to the right again while the node you picked stays in the center. So weird.

This is the commit I made: [graph fix: stop the sliding around on radia, thanks to lukas-rku · fanteastick/quartz-test@8cc7d7f · GitHub](https://github.com/fanteastick/quartz-test/commit/8cc7d7f9969261b9ed15f864adff79eb2650b6af) 

Shoutout to lukas-rku on Github! (Ruku on discord) [Overview - tud](https://tud.pages.dev/) 

Then I made a second edit, where I hated that the titles were all visible when you zoom in, which makes it basically illegible because the nodes are so close together. So I made it such that only the current page and the tag titles are visible. The commit: [graph edit: only show the labels for the current page and tags when zoom · fanteastick/quartz-test@92d86ae · GitHub](https://github.com/fanteastick/quartz-test/commit/92d86ae40c2f4f98a9cf56babb8d2d9074baac2e) 

It's a little weird on dragging where it'll flicker between the dragged node and the tags/current, but I'll live. 

### List pages and the floating buttons

I added some floating buttons (see other section on "FloatingButtons by catcodeme"). One of the buttons pops up the global graph. The component does this by simulating clicking on the global graph button when you click the floating button. That means if the current page doesn't have the graph component, it doesn't have anything in the document to hook to. 

To fix that, I made a hidden global graph that copied the `graph.tsx` and only has the button and the global graph div. For the button, I hide it by adding `display:none`. 

[Add a hidden global graph+button to list pages for the graph floating button](https://github.com/fanteastick/quartz-test/commit/3f75a6e4aa0d6468e43e361bbab024891d8c0696) 

## Add slugs on tag pages

Added an optional option 😂 on `PageList` called `isTagPage` and pass it on the calls to `PageList` in the `TagContent` page. 

The commit:

Example: [[tags/]]

![[Quartz customization log_image_1.png|400]]

```tsx title="TagContent.tsx"
<PageList limit={options.numPages} {...listProps} sort={options?.sort} isTagPage={"true"} />
// You need to put this twice: once for the "/" which is the main tags page, and once for the "else" section of the code
```

```tsx title="PageList.tsx" {4}
type Props = {
  limit?: number
  sort?: SortFn
  isTagPage?: string
} & QuartzComponentProps
...
const slugParts = page.slug?.split("/");
const trimmedSlug = slugParts?.slice(0, -1).join("/");  
...
{/* Show the trimmed slug only if it's a tag page, and desktoponly is applied by the class */}
{isTagPage && (
<span class="slug-pagelist desktop-only" title="Slug">
  ⟡ {trimmedSlug ? `/${trimmedSlug}/` : '/'}
</span>
)}
```

```scss title="custom.scss"
// Slugs on PageLists
.slug-pagelist {
  color: var(--gray);
  font-style: italic;
  font-size: 70%;
}
```

## Spoilers aka blurred text

I made my first transformer! well... thank you perplexity 😭 and it's loosely based off the `fancytext` transformer from naraenda (described elsewhere in this page). 

1. Read the documentation 😆 - [Making your own plugins](https://quartz.jzhao.xyz/advanced/making-plugins#transformers) - there's some really nice examples!
2. Identify text
3. Wrap it around a `<span>` with a class `.spoiler-text`
4. Target that class in the `custom.scss` and a script that loads after `DOMContentLoaded`
5. Profit 🤑 (kidding)
6. Make sure to add to `index.ts` and the `quartz.config.ts`!

```ts title="BlurSpoiler.ts"
import { QuartzTransformerPlugin } from "../types"
// @ts-ignore
import script from "../../components/scripts/_spoiler.inline.ts";

export const BlurText: QuartzTransformerPlugin = () => {
    const sym = "🤫"
    return {
      name: "BlurText",
      textTransform(_ctx, src) {
        src = String(src)
        const regex = new RegExp(`${sym}${sym}([^${sym}]+)${sym}${sym}`, "g")
        src = src.replace(regex, (value, ...[capture]) => {
            return `<span class="spoiler-text">${capture}</span>`
        })
        return src
    },
      externalResources() {
        return {
            js: [
                {
                    loadTime: "afterDOMReady",
                    moduleType: "module",
                    contentType: "inline",
                    script: script,
                },
            ]
        }
      },
    }
  }
```

```ts title="spoilers.inline.ts"
// This was made by perplexity
function handleSpoilerClick() {
    const spoilers = document.querySelectorAll(".spoiler-text") as NodeListOf<HTMLElement>
  
    spoilers.forEach((spoiler) => {
      function onClick() {
        spoiler.classList.toggle("revealed")
      }
  
      spoiler.addEventListener("click", onClick)
      window.addCleanup(() => spoiler.removeEventListener("click", onClick))
    })
  }
  
document.addEventListener("DOMContentLoaded", handleSpoilerClick)
```

To make links inside unclickable when spoiler'd:

```scss title="custom.scss"
.spoiler-text:not(.revealed) > a {
  pointer-events: none;
}
```
## Consistent code size

To stop the weird scrollbar on 1-line code that doesn't have a language defined. When there IS a language, it gets wrapped around a `<figure>` that has a line height of 1.6em, and the `<pre>` has a height of 1.3em. But it's not added to the basic `<pre>` by default. 

![[Quartz customization log_image_1.png|400]]

```scss title="base.scss"
pre {
  line-height: 1.3em;
```

After: 

![[Quartz customization log_image_1.png|400]]

## Telescoping text

Telescoping text example: 

```telescopic
* lately I am 
* reading
  * reading not a lot of [[book club/|books]],
  * going to functions,
    * go on short runs,
    * building [[semiconductors and chips/]],
    * thinking about the type of person I want to become. 
```

Copied from [Aaron's notes](https://aarnphm.xyz/)! 

Make these three files: [components/styles/telescopic.inline.scss](https://github.com/aarnphm/aarnphm.github.io/blob/52710beda12f4ae45d79d0da6a70f0e6f92af58b/quartz/components/styles/telescopic.inline.scss#L8) [components/scripts/telescopic.inline.ts](https://github.com/aarnphm/aarnphm.github.io/blob/52710beda12f4ae45d79d0da6a70f0e6f92af58b/quartz/components/scripts/telescopic.inline.ts) [plugins/transformers/telescopic.ts](https://github.com/aarnphm/aarnphm.github.io/blob/52710beda12f4ae45d79d0da6a70f0e6f92af58b/quartz/plugins/transformers/telescopic.ts#L61)

`npm i hast-util-find-and-replace`

And add it to the plugins section of `quartz.config.ts` and the `index.ts` of the transformers folder. Need to add the color `--gold: rgba(234, 157, 52, 1);`. 

## Content License

Basically, if you copy any of the content (aka, words written by me for this website), please attribute to me 😄 Added on 2025-02-05. 

<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://quartz.eilleeenz.com/">Eilleen's (online) Everything Notebook</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://www.eilleeenz.com/">eilleeenz (Eilleen)</a> is licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Creative Commons Attribution-ShareAlike 4.0 International<img style="height: 1em;!;margin-left:3px;vertical-align:text-bottom;margin: 0 0 0 3px;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt=""><img style="height: 1em;!;margin-left:3px;vertical-align:text-bottom;margin: 0 0 0 3px;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt=""><img style="height: 1em;!;margin-left:3px;vertical-align:text-bottom;margin: 0 0 0 3px;" src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1" alt=""></a></p>

And I added a `CONTENT_LICENSE.txt` to the root directory, and also added this to the README:

> [!NOTE] Licensing changes
> 
> - **Content:** The text content in the `content/` folder is licensed under [Creative Commons Attribution-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/).
> 
> - **Everything else:** uses the MIT License for its components, since it was originally MIT license from https://quartz.jzhao.xyz/.

## Putting my giscus and goatcounter info into a github secret

[[GitHub secrets#Secrets specifically for Quartz|Guide]] for giscus

[[GoatCounter analytics]]: has the info about GoatCounter secret

It's already committed into the world because it took me a while to understand how it works, but at least now I'm not worried that someone blindly copying my layout etc are going to be using my config codes...

## FloatingButtons by catcodeme

I took out the keyboard shortcuts and translated some stuff to English. I also went into the scss and made the hover text the same as `var(--bodyFont)`. Also I changed the "bottom" document query-er into `.footer` and had to add a `footer` class to the footer to make that work. 

[catcodeme.github.io/quartz/components/styles/floatingButtons.scss](https://github.com/CatCodeMe/catcodeme.github.io/blob/770f3f8d1f6849ef40bc06b4300a52b3aecfb551/quartz/components/styles/floatingButtons.scss), and also the `.tsx` and the `.inline.ts` file.

## Differentiate broken internal links

In the script, we had `import {load} from 'cheerio'`

So then had to put     `"cheerio": "^1.0.0",`

 in devDependencies in package.json

Which then had to do `npm i` to reload the package lock

and THEN we can update

Everything copied from here: [feat: 内部坏链检测 · CatCodeMe/catcodeme.github.io@39c0c76 · GitHub](https://github.com/CatCodeMe/catcodeme.github.io/commit/39c0c7601e6aeb0e9bf7b9097136b54ce03be901#diff-28802fbf11c83a2eee09623fb192785e7ca92a3f40602a517c011b947a1822d3), and then I made some modifications. 

This is a GitHub action added to the deploy and build flow that checks for broken links and modifies the css there. Slightly dislike that I can't see the changes in my local build? but in vercel, just go into settings and change build command to `npx quartz build && node check-broken-links` or something like that.

To make it unclickable:

```ts title="floatingButtons.inline.ts"
// Adding in the "prevent default" behavior here but this is actually for broken links
document.querySelectorAll('.broken-link').forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault(); // Prevents the link from navigating
  });
});
```

To make it work with transcludes, I also added this to strip text after the `#`:

```js title="check-broken-links.js"
$('a.internal:not(.tag-link)').each((_, element) => {
	const href = $(element).attr('href')
	if (!href || href.startsWith('#')) return

	// Check if href contains a '#'
	if (href.includes('#')) {
		// Remove everything after the '#'
		const cleanHref = href.split('#')[0];
		
		// Update href to the clean version
		href = cleanHref;
	}
```

## Add favicons to certain external links

This is the commit: [(feat) adding favicons on external links manual · fanteastick/quartz-test@8a55075](https://github.com/fanteastick/quartz-test/commit/8a550751240921707b8478b59df4e69020f658cf) 

The code was mostly shamelessly copied and then slightly modified from [Aaron's notes](https://aarnphm.xyz/): [aarnphm.github.io/quartz/plugins/transformers/links.ts](https://github.com/aarnphm/aarnphm.github.io/blob/41a2f0d23e7d7432d24ecf603e2ffe5a1fccaa12/quartz/plugins/transformers/links.ts) 

Basically it's just a big if/else, and you have to put in the img files into `/static/favicons`, or the svg path into `components/_svg.tsx`. 

- [ ] future improvement: Try out the turntrout implementation instead:  [TurnTrout.com/quartz/plugins/transformers/linkfavicons.ts](https://github.com/alexander-turner/TurnTrout.com/blob/56b56698937765b35f7156535bf664b905bda526/quartz/plugins/transformers/linkfavicons.ts#L171)
- [x] Alternatively the [catcodeme version](https://github.com/CatCodeMe/catcodeme.github.io/blob/770f3f8d1f6849ef40bc06b4300a52b3aecfb551/quartz/styles/external-links.scss):

> [!NOTE]- catcodeme scss
> 
> ```scss
> :root{
>   --external-link-icon-width: 16px;
>   --external-link-icon-height: 16px;
> }
> 
> // 定义图标的基础样式
> %icon-base {
>   content: '';
>   width: var(--external-link-icon-width);
>   height: var(--external-link-icon-width);
>   display: inline-block;
>   vertical-align: text-top;
>   margin-left: 4px;
>   background-size: contain;
>   background-repeat: no-repeat;
> }
> 
> a.external {
>     // 默认所有外部链接显示箭头
>     &::after {
>       content: '↗';
>       margin-left: 4px;
>     }
> 
>     // 特定域名的链接使用自定义图标(会覆盖默认箭头)
>     &[href*="github.com"]::after {
>       @extend %icon-base;
>       background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3Cpath fill='%23214257' d='M14 2A10 10 0 0 0 2 14c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 14A10 10 0 0 0 14 2'/%3E%3C/svg%3E");
>     }
> ```
> 

I'll try to write down [[Image sources and attributions]], which also has the workflow. 

## Add a folder emoji before subfolders in a folder listing

Basically completely replaced the allPagesInSubfolders part. Thank you perplexity ai!

Witness: [hobbies \| Eilleen's e-Notebook](https://quartz.eilleeenz.com/hobbies/) 

```tsx title="FolderContent.tsx"
    allPagesInSubfolders.forEach((files, subfolderSlug) => {
      const existingPage = allPagesInFolder.find(
        (file) => subfolderSlug === stripSlashes(simplifySlug(file.slug!)),
      );
      if (existingPage) {
        // Update existing page's title
        const subfolderTitleTemp = subfolderSlug.split(path.posix.sep).at(-1)!;
        const subfolderTitle = `📂 ${subfolderTitleTemp.replace(/-/g, ' ')}`;
        // @ts-ignore
        existingPage.frontmatter.title = subfolderTitle;
      } else {
        // Add new page
        const subfolderDates = files.sort(byDateAndAlphabetical(cfg))[0].dates;
        const subfolderTitleTemp = subfolderSlug.split(path.posix.sep).at(-1)!;
        const subfolderTitle = `📂 ${subfolderTitleTemp.replace(/-/g, ' ')}`;
        allPagesInFolder.push({
          slug: subfolderSlug,
          dates: subfolderDates,
          frontmatter: { title: subfolderTitle, tags: ["folder"] },
        });
      }
    });
```

Also added the emoji in the preview tab titles:

```tsx title="folderPage.tsx"
      const folderDescriptions: Record<string, ProcessedContent> = Object.fromEntries(
        [...folders].map((folder) => {
          const existingContent = content.find(([_, vfile]) => vfile.data.slug === joinSegments(folder, "index"));
          
          if (existingContent) {
            // Update existing folder page title if necessary
            const updatedContent = existingContent[1].data;
            // @ts-ignore
            if (!updatedContent.frontmatter.title.startsWith("📂")) {
              // @ts-ignore
              updatedContent.frontmatter.title = `📂 ${folder.replace(/-/g, " ")}`;
            } else {
              // If title already starts with 📂, replace hyphens in the rest of the title
            // @ts-ignore
              updatedContent.frontmatter.title = `📂 ${updatedContent.frontmatter.title.slice(2).replace(/-/g, " ")}`;
            }
            return [folder, updatedContent];
          } else {
            // Create new folder page with the desired title
            return [
              folder,
              defaultProcessedContent({
                slug: joinSegments(folder, "index") as FullSlug,
                frontmatter: {
                  title: `📂 ${folder.replace(/-/g, " ")}`,
                  tags: [],
                },
```

## Small padding in the layout

Just to make it look a bit better.

```scss title="base.scss"
& > #quartz-body {
	@media all and not ($desktop) {
      padding: 0 1rem;
+      margin-right: 10px;
    }

    & .sidebar {
+      @media all and not ($desktop) {
+        margin-right: 10px;
+      }
    }
```
## Remove the tags in tag pages

Because it looks messy, idk. 

```scss title="custom.scss"
.page-listing .tag-link {
  display: none;
}
```

Also, to remove the blank column in the list pages:

```scss title="listPage.scss"
// grid-template-columns: fit-content(8em) 3fr 1fr; original
grid-template-columns: 8em 3fr;
```
## Merging in the 4.3.1 ➡ 4.4 layout upgrades etc

[[Upgrading to quartz 4.4]]

Also I put the explorer on the left sidebar on the homepage, and moved the github source stuff into the frontmatter because the flex was messing with my footer spacing wrt Graph, source, backlinks.

## Adding native components to custom components

savval

> Did it:
> 
> The LandingComponent passes { ...componentData } from the renderPage function which need to be supplied to the native components in your custom components like so:

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

## iframes in html and interactivity

Daniel Hintz

> Fix:
> 
> adding display: block;" onload="iframeLoaded()" fixed the problem, though I don't fully understand why it fixed the problem 😂. I found the solution from searching iframe and found visrut's post where he specified his website, and from inspecting the iframe I found the fix   (credit: @visrut).
> 
> hence, below works

```HTML
 <iframe src="https://dhintz137.github.io/Embedding_Presentation/" width="100%" height="600px" style="border: none; display: block;" onload="iframeLoaded()"></iframe>
```

## Skipping footnotes in a transclude except this isn't working yet

I think this is unintended behavior. The transclude code in `renderPage` checks for the next heading of the same level or higher. But footnotes are in a `<section>` so it just added the footnote to the transclude if it was the last header. 

### Adding the full slug to a footnote link

If it's a transclude, the footnote will just link to `#headingname` which is kind of annoying, since it doesn't exist on the current page. Need to add the slug to this. 

- [ ] todo
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

~~Tried for a long time to get a "click to copy link" type button but it's not working rip.~~ I got it to work~!

### Click permalink to copy to clipboard, with a notification box

[[Permalinks tracker]] if you want to find a link to test it out on

```tsx title="ContentMetadata.tsx"
// @ts-ignore
import permalinkScript from "./scripts/_permalinkCopy.inline"
...
if (fileData.frontmatter?.permalink) {
	permalinks.push(
		<a key="permalink" class="internal permalink" id="permalink" >
		  {cfg.baseUrl}/{fileData.frontmatter.permalink}
		</a>
	)
}
ContentMetadata.afterDOMLoaded = permalinkScript;
```

The script: 

```ts title="./scripts/_permalinkCopy.inline.ts"
document.addEventListener("nav", () => {
    const element = document.getElementById('permalink')
    if (element) {
        const txt = element.innerText as string
        function onclick  () {
            navigator.clipboard.writeText(txt);
            
            // Create and show custom notification
            const notification = document.createElement('div');
            notification.textContent = 'Permalink copied to clipboard!';
            notification.className = 'custom-notification';
            // Calculate position to place the notification above the clicked element
            //@ts-ignore
            const rect = element.getBoundingClientRect();
            notification.style.position = 'fixed';
            notification.style.top = `${rect.bottom + 10}px`; // 10px below
            notification.style.left = `${rect.left}px`; // Align with the left of the element

            document.body.appendChild(notification);
            setTimeout(() => {
            // Add class to trigger fade-out
            notification.classList.add('fade-out');
            
            // Remove notification after the fade-out animation is complete
            setTimeout(() => {
            document.body.removeChild(notification);
            }, 750); // Duration of the fade-out animation
        }, 1500)
        }
        element.addEventListener("click", onclick)
        window.addCleanup(() => element.removeEventListener("click", onclick))
    }
})
```

Some extra styling: and a fade-out

```scss title="contentMeta.scss"
a.permalink:hover{
  cursor: pointer;
}

.custom-notification{
  position: fixed;
  top: 3%; /* Position it at the top right */
  left: 35%;  /* Position it at the right */
  background-color: var(--darkgray);
  color: var(--lightgray);
  padding: 0.25em;
  border-radius: 0.25em;
  z-index: 1000; /* Ensure it appears above other content */
  transition: opacity 1s ease-in-out; /* Transition for fade effect */
}

.custom-notification.fade-out {
  opacity: 0; /* Fade out */
}
```

## Add a little secret comment in the heads

It's weird being perceived... A little comment so I can find out who's snooping around :P

```tsx title="Head.tsx"
<meta name="custom-comment-fanteastick-ez" content="My 'i was here' moment! check out eilleeenz.com" />
```

## Fixing popover on footnotes and subtitles

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

### Real solution

I made a new solution for footnotes, inspired by aarnphm's site (e.g. [Attribution parameter decomposition](https://aarnphm.xyz/thoughts/Attribution-parameter-decomposition#user-content-fnref-alias)) The idea is to take just the content of the footnote, instead of showing the entire popover hint, so there's no duplicate `#user-content-fn` id on the page to jump to.

In `popovers.inline.ts`, add this to the top:

```ts
function isFootnoteLink(link: HTMLAnchorElement): boolean {
  return link.id.startsWith("user-content-fnref-");
}
```

and then in the `switch (contentTypeCategory)` put this as the`default` case:

```ts
default:
  const contents = await response.text()
  const html = p.parseFromString(contents, "text/html")
  normalizeRelativeURLs(html, targetUrl)

  if (isFootnoteLink(link)) {
	const footnoteId = link.id.replace("user-content-fnref-", "user-content-fn-")
	const footnoteElement = html.getElementById(footnoteId)
	if (footnoteElement) {
	  const pElement = footnoteElement.querySelector('p')
	  if (pElement) {
		popoverInner.appendChild(pElement.cloneNode(true))
	  }
	}
  } else {
	const elts = [...html.getElementsByClassName("popover-hint")]
	if (elts.length === 0) return
	elts.forEach((elt) => popoverInner.appendChild(elt))
  }
```

## Copying fancy text and sticky notes from Nara's ascone

My commit is here: [fanteastick/quartz-test@6c4a8af · GitHub](https://github.com/fanteastick/quartz-test/commit/6c4a8afb76672af7909a7b675651420138c01fbd) which is mostly copied from [GitHub - Naraenda/quartz-ascone](https://github.com/Naraenda/quartz-ascone)

And at some point I added some extra animations to `custom.scss` but haven't put them in yet. 

Also the two transformers import a script which then is added to every page sadly... todo: figure out if it reduces performance. 

2024-08-24 - actually I disabled sticky notes because it was causing weird effects on the search in desktop mode. 

## Changing tag pages and folder pages

The problem - the default title for a tag page is `Tag: name`, and breadcrumb is just tags. But when you make a tag page in the tags folder, it names the page the same as the tag name. So instead of "Tag: git" it becomes "git". 

Similarly, for folder pages, if you create an index page in the folder, the title becomes "index" instead of the folder name. 

Removing the "Tag: " part: 

```tsx title="TagContent.tsx"
const tagDescriptions: Record<string, ProcessedContent> = Object.fromEntries(
[...tags].map((tag) => {
  const title =
	tag === "index"
	  ? `🔖 i18n(cfg.locale).pages.tagContent.tagIndex`
	  : `🔖 ${tag}`
	  // : `${i18n(cfg.locale).pages.tagContent.tag}: ${tag}` original commented out 8/5/24

  ...

  if (tags.has(tag)) {
	tagDescriptions[tag] = [tree, file]
	// this adds the little emoji to tag pages that have index pages
	if (file.data.frontmatter?.title === tag) {
	  // file.data.frontmatter.title = `${i18n(cfg.locale).pages.tagContent.tag}: ${tag}`
	  file.data.frontmatter.title = `🔖 ${tag}`
	}
  }
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
	  title: `📂 ${folder}`, 
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

## Removed mermaid graphs

Commented out something in the config. 

```ts title="ofm.ts"
const defaultOptions: Options = {
...
  mermaid: false, // disabled mermaid diagrams 7-18-24
```

## Hide tags from graph and explorer and backlinks and more

![[Hiding tags from various components#Summary]]

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

%% ## ComponentGroup

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

 %%

## Giscus Comments

Originally this was based on code from [morrowind-modding/morrowind-modding.github.io@1bad00e · GitHub](https://github.com/morrowind-modding/morrowind-modding.github.io/commit/1bad00e1e8b27ee2dc85ab08dd2da5b75642f5b3). Later it got added as part of the base quartz code so I had to slightly modify it, because I have it set up to only create one discussion for the whole quartz. This adds an extra property or two. 

- [x] Consider - put the ID or some sort of git secret stuff so other people copy-pasting code won't accidentally crosspost to my discussions. ⏩ I made it work with [[GitHub secrets#Secrets specifically for Quartz|GitHub secrets]]
### July 2024 update - modifying the built-in comments component

My setup - only one discussion for the entire quartz. So I need the data-term attribute, and things got refactored a bit. 

In `Comments.tsx`: 

- add `data-term={opts.options.term}`

In `comments.inline.ts`:

- add `term: string` to the GiscusElement dataset, and 
- `giscusScript.setAttribute("data-term", giscusContainer.dataset.term)`

### Feb 2025 update: positive check frontmatter 

Instead of default comments on, this defaults comments off unless frontmatter `comments: true`.

```tsx title="Comments.tsx"
export default ((opts: Options) => {
  const Comments: QuartzComponent = ({ displayClass, fileData, cfg }: QuartzComponentProps) => {
    // 2025-02-04: actually, I only want comments if I choose to enable them in frontmatter
    const enableComment: boolean = 
      fileData.frontmatter?.comments === "true"
    if (!enableComment) {
      return <></>
    }
```

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
+	<a href={baseDir} class="internal">{i18n(cfg.locale).pages.error.home}</a>
+	<hr />
  </div>
```

And in `en-US.ts` I changed the `pages:error:home` to `home: "🏡 Return to Homepage",`

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
  display: inline-block;
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

## Customizing the 404 page

Added an ASCII art snake with a text bubble. Annoying to do because the code in `404.tsx` is wrapped around `<article>` tags, which then makes whitespaces not really work. Did it by putting my code block into my index, looking at the generated html for the snake code block, and copying it into the `components/404.tsx` file. Then I used `<br>` and made everything one line to preserve the leading whitespaces.

### 404 page layout hack

Thank you Perplexity! Added on 2025-02-06

With the introduction of the tablet layout and left sidebar being empty, I thought it looked bad so I wanted to skip the tablet layout only on the 404 page. 

Change the ID on the 404 page `<body>` by replacing html after the `renderPage`: 

```tsx title="plugins/emitters/404.tsx"
  const prepageContent = renderPage(cfg, slug, componentData, opts, externalResources);
  const pageContent = prepageContent.replace('<div id="quartz-body">', '<div id="quartz-404-body">');
  return [
	await write({
	  ctx,
	  content: pageContent,
	  slug,
	  ext: ".html",
	}),
```

In the scss, make a new section for `.page#quartz-404-body` and remove all the mobile styling for somethings, set the sidebar height to 0, merge some stuff for `@media all and ($tablet), @media all and ($mobile)`:

> [!TIP]- The scss
> ```scss title="base.scss"
> .page {
>   // This will give special grid styling to the 404 page, which is just skipping the tablet layout
>   // because it looked weird when there was nothing in the left sidebar
>   & > #quartz-404-body {
>     display: grid;
>     grid-template-columns: #{map.get($desktopGrid, templateColumns)};
>     grid-template-rows: #{map.get($desktopGrid, templateRows)};
>     column-gap: #{map.get($desktopGrid, columnGap)};
>     row-gap: #{map.get($desktopGrid, rowGap)};
>     grid-template-areas: #{map.get($desktopGrid, templateAreas)};
> 
>     @media all and ($tablet), all and ($mobile) {
>       grid-template-columns: #{map.get($mobileGrid, templateColumns)};
>       grid-template-rows: #{map.get($mobileGrid, templateRows)};
>       column-gap: #{map.get($mobileGrid, columnGap)};
>       row-gap: #{map.get($mobileGrid, rowGap)};
>       grid-template-areas: #{map.get($mobileGrid, templateAreas)};
>     }
> 
>     // Remove or adjust other styles as needed
>     padding: 0 1rem;
>     margin-right: 10px;
>   
>     & .sidebar {
>       gap: 2rem;
>       top: 0;
>       box-sizing: border-box;
>       padding: $topSpacing 2rem 2rem 2rem;
>       display: flex;
>       height: 0vh;
>       position: sticky;
>     }
>   
>     & .sidebar.left {
>       z-index: 1;
>       grid-area: grid-sidebar-left;
>       flex-direction: column;
>       @media all and ($tablet), all and ($mobile) {
>         gap: 0;
>         align-items: center;
>         position: initial;
>         display: flex;
>         // height: unset;
>         flex-direction: row;
>         padding: 0;
>         padding-top: 2rem;
>       }
>     }
>   
>     & .sidebar.right {
>       grid-area: grid-sidebar-right;
>       margin-right: 0;
>       flex-direction: column;
>     }
>   
>     & .page-header,
>     & .page-footer {
>       margin-top: 1rem;
>       @media all and ($tablet), all and ($mobile) {
>         display: none;
>       }
>     }
>   
>     & .page-header {
>       grid-area: grid-header;
>       margin: $topSpacing 0 0 0;
>     }
>   
>     & .center > article {
>       grid-area: grid-center;
>     }
>   
>     & footer {
>       grid-area: grid-footer;
>     }
>   
>     & .center,
>     & footer {
>       max-width: 100%;
>       min-width: 100%;
>       margin-left: auto;
>       margin-right: auto;
>     }
>     & footer {
>       margin-left: 0;
>     }  
>   }
> }
> ```

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

> [!TIP]- Color hexes in `quartz.config.ts`
> ```ts title="quartz.config.ts"
> colors: {
> 	// lightMode: {
> 	//   light: "#faf8f8",
> 	//   lightgray: "#e5e5e5",
> 	//   gray: "#b8b8b8",
> 	//   darkgray: "#4e4e4e",
> 	//   dark: "#2b2b2b",
> 	//   secondary: "#284b63",
> 	//   tertiary: "#84a59d",
> 	//   highlight: "rgba(143, 159, 169, 0.15)",
> 	// },
>   //   'desert-storm': {
>   //     '50': '#fafbf9',
>   //     '100': '#eff2ec',
>   //     '200': '#dde2d5',
>   //     '300': '#bfc9b0',
>   //     '400': '#9bab85',
>   //     '500': '#809166',
>   //     '600': '#677851',
>   //     '700': '#546242',
>   //     '800': '#475339',
>   //     '900': '#3e4733',
>   //     '950': '#292f22',
>   // },
> 	lightMode: {
> 	  light: "#eff2ec",
> 	  lightgray: "#dde2d5",
> 	  gray: "#9bab85",
> 	  darkgray: "#475339",
> 	  dark: "#292f22",
> 	  secondary: "#3e4733",
> 	  tertiary: "#84a59d",
> 	  highlight: "rgba(191,201,176, 0.25)",
> 	},
> ```

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

Can find some cute dividers here: [Sparkle Emoji for Bio](https://www.aestheticbio.net/p/sparkle.html) [[A bunch of kaomoji]]

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

## Github source component into contentmeta

Credits to this guy - [add github source component · abhiaagarwal/notes@0649b06 · GitHub](https://github.com/abhiaagarwal/notes/commit/0649b0645f505990908ca060af75cff6af006c3f) 

I also added a link to the git blame because I like the blame view better than the history view.

Had to change it to this: `${fileData.filePath!}`

Using external service [Git History](https://githistory.xyz/) for history because it's a very nice view. So I turned that part into an external link by adding the class, manually adding the svg, manually adding the svg class to the githubsource scss.

2024-08-29 Made some extra changes to clean up githubSource, namely adding the config options and built-in defaults. 

For the githistory link, it needs to do a replacement. ``${options?.repoLink.replace('github.com', 'github.githistory.xyz')}/commits/${options?.branch}/${fileData.filePath!}``

```tsx title="ContentMeta.tsx" 

  showReadingTime: boolean
  showComma: boolean
  // Githubsource stuff ported over
  repoLink: string
  branch: string
}

const defaultOptions: ContentMetaOptions = {
  showReadingTime: true,
  showComma: true,
  // githubsource stuff
  repoLink: "github.com",
  branch: "v4"
}
...
      return (
        <div class={classNames(displayClass, "content-meta")}>
        <p style={{ margin: '0', padding: '0'}}>
          <a href={`${options?.repoLink}/blob/${options?.branch}/${fileData.filePath!}`}>
          ᨒ Source ᨒ 
            </a>  
          <a href={`${options?.repoLink}/blame/${options?.branch}/${fileData.filePath!}`}>
          ↟ Blame ᨒ 
          </a>
          <a href={`${options?.repoLink.replace('github.com', 'github.githistory.xyz')}/commits/${options?.branch}/${fileData.filePath!}`}>
          ↟ GitHistory ↟
          </a>
        </p>
```
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

Add the name for my date created field (since I use obsidian linter)

```ts title="frontmatter.ts"
const created = coalesceAliases(data, ["created", "date", "date created"])
if (created) data.created = created
const modified = coalesceAliases(data, [
  "modified",
  "lastmod",
  "updated",
  "last-modified",
  "date modified",
```

Custom get date function so I can choose whether to get created or modified.

```ts title="Date.tsx"
export function _getDateCustom(cfg: GlobalConfiguration, data: QuartzPluginData, dateType: 'modified' | 'created'): Date | undefined {
  // Check if the dateType provided is valid
  if (dateType !== 'modified' && dateType !== 'created') {
    throw new Error(`Invalid date type '${dateType}'. Valid options are 'modified' or 'created'.`)
  }
  
  // Return the respective date based on the given dateType
  return data.dates?.[dateType]
}
```

```tsx title="ContentMeta.tsx"
if (fileData.dates && fileData.slug !== "index") {
	 segments.push(<>
     Created: <Date date={_getDateCustom(cfg, fileData, 'created')!} locale={cfg.locale} />
	</>)
	// Only show the modified date if it's NOT equal to the created date
	// Extract the actual date values for comparison
	const datecreatedValue = _getDateCustom(cfg, fileData, 'created');
	const datemodifiedValue = _getDateCustom(cfg, fileData,'modified');
	// Compare the actual date values (ignoring the JSX components)
	const areDatesNotEqual = datecreatedValue?.getTime() !== datemodifiedValue?.getTime();
	if (areDatesNotEqual) {
	  segments.push(<>
		Modified: <Date date={_getDateCustom(cfg, fileData,'modified')!} locale={cfg.locale} />
		</>
		)
	}
}
```

## List page column changes

This removes the space that was held for the tags, and makes the space for the date wider so it doesn't hop to the next line. 

```scss title="listPage.scss"
grid-template-columns: 8em 3fr;
// original: 6em 3fr 1fr?
// 
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

### Randomize page title

- [ ] to do: make it change on pageload instead of every time it gets pushed. 

```ts title="quartz.config.ts"
const possiblePageTitles = [
  "(｡•ㅅ•｡)~✧",
  "૭( ᵕ•̀ᵕ•́૭)",
  "(૭ •́ ᵕ•̀ )૭",
  "(๑>؂·̀๑)",
  "৻(•̀ᗜ•́৻)",
  "٩(•̤̀ᵕ•̤́๑)",
  "(｡•́︿•̀｡)",
  "ᕙ( •̀ ᗜ •́ )ᕗ"
  etc etc etc
];
function getRandomPageTitle(): string {
  return possiblePageTitles[Math.floor(Math.random() * possiblePageTitles.length)];
}

const config: QuartzConfig = {
  configuration: {
    pageTitle: getRandomPageTitle(),
```

## Change baseUrl
```ts title="quartz.config.ts"
    baseUrl: "quartz.eilleeenz.com",
```

[^1]: footnote example.