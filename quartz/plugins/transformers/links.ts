// This was copied and lightly modified from aarnphm:
// https://github.com/aarnphm/aarnphm.github.io/blob/41a2f0d23e7d7432d24ecf603e2ffe5a1fccaa12/quartz/plugins/transformers/links.ts
// On 2025-01-30

import { QuartzTransformerPlugin } from "../types"
import {
  FullSlug,
  RelativeURL,
  SimpleSlug,
  TransformOptions,
  stripSlashes,
  simplifySlug,
  splitAnchor,
  transformLink,
} from "../../util/path"
import path from "path"
import { visit } from "unist-util-visit"
import isAbsoluteUrl from "is-absolute-url"
import { Element } from "hast"
// import { filterEmbedTwitter, twitterUrlRegex } from "./twitter"
import { h, s } from "hastscript"
import {
  anthropicSvg,
  ycSvg,
  bskySvg,
  doiSvg,
  pplxSvg,
  githubSvg,
  substackSvg,
  svgOptions,
  // twitterSvg,
  openaiSvg,
  hfSvg,
  obsidianSvg,
  youtubeSvg,
  gwernSvg,
  defaultExternalSvg,
  fandomSvg,
  redditSvg,
} from "../../components/_svg"



interface Options {
  enableArxivEmbed: boolean
  enableRawEmbed: boolean
  enableIndicatorHook: boolean
  /** How to resolve Markdown paths */
  markdownLinkResolution: TransformOptions["strategy"]
  /** Strips folders from a link so that it looks nice */
  prettyLinks: boolean
  openLinksInNewTab: boolean
  lazyLoad: boolean
  externalLinkIcon: boolean
}

const defaultOptions: Options = {
  enableArxivEmbed: false,
  enableRawEmbed: false,
  enableIndicatorHook: true,
  markdownLinkResolution: "absolute",
  prettyLinks: true,
  openLinksInNewTab: false,
  lazyLoad: false,
  externalLinkIcon: true,
}

const ALLOWED_EXTENSIONS = [
  ".py",
  ".go",
  ".java",
  ".c",
  ".cpp",
  ".cxx",
  ".cu",
  ".cuh",
  ".h",
  ".hpp",
  ".ts",
  ".js",
  ".yaml",
  ".yml",
  ".rs",
  ".m",
  ".sql",
  ".sh",
  ".txt",
]

export function extractArxivId(url: string): string | null {
  try {
    const urlObj = new URL(url)
    if (!urlObj.hostname.includes("arxiv.org")) return null

    // Match different arXiv URL patterns
    const patterns = [
      /arxiv.org\/abs\/(\d+\.\d+)/,
      /arxiv.org\/html\/(\d+\.\d+)/,
      /arxiv.org\/pdf\/(\d+\.\d+)(\.pdf)?/,
      /arxiv.org\/\w+\/(\d+\.\d+)/,
    ]

    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) return match[1]
    }

    return null
  } catch (e) {
    return null
  }
}

interface LinkContext {
  classes: string[]
  dest: RelativeURL
  ext: string
  isExternal: boolean
  node: Element
}

export const CrawlLinks: QuartzTransformerPlugin<Partial<Options>> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "LinkProcessing",
    htmlPlugins(ctx) {
      const { cfg } = ctx
      return [
        () => {
          return (tree, file) => {
            const curSlug = simplifySlug(file.data.slug!)
            const outgoing: Set<SimpleSlug> = new Set()

            const transformOptions: TransformOptions = {
              strategy: opts.markdownLinkResolution,
              allSlugs: ctx.allSlugs,
            }

            const shouldRewriteLinks = ({ tagName, properties }: Element) =>
              tagName === "a" && Boolean(properties.href) && typeof properties.href === "string"

            // rewrite all links
            //@ts-ignore
            visit(
              tree,
              (node: Element) => shouldRewriteLinks(node as Element),
              (node: Element) => {
                const classes = (node.properties.className ?? []) as string[]
                // insert a span element into node.children
                let dest = node.properties.href as RelativeURL
                const ext: string = path.extname(dest).toLowerCase()
                const isExternal = isAbsoluteUrl(dest)
                classes.push(isExternal ? "external" : "internal")


                // Initialize context object
                const ctx: LinkContext = {
                  classes,
                  dest,
                  ext,
                  isExternal:
                    opts.enableRawEmbed && ALLOWED_EXTENSIONS.includes(ext)
                      ? true
                      : isAbsoluteUrl(dest),
                  node,
                }

                // Link type checks
                const linkTypes = {
                  isApexDomain: dest.includes("eilleeenz"),
                  isCslNode: classes.includes("csl-external-link"),
                  // isEmbedTwitter: filterEmbedTwitter(node),
                  isArxiv: dest.includes("arxiv.org"),
                  isWikipedia: dest.includes("wikipedia.org"),
                  isLessWrong: dest.includes("lesswrong.com"),
                  isYoutube: dest.includes("youtube.com") || dest.includes("youtu.be"),
                  isGwern: dest.includes("gwern.net"),
                  isNeovim: dest.includes("neovim.io"),
                  isQuartz: dest.includes("quartz.jzhao.xyz"),
                  isObsidian: dest.includes("obsidian.md"),
                  isGithub: dest.includes("github.com"),
                  isPerplexity: dest.includes("pplx.ai") || dest.includes("perplexity.ai"),
                  isSubstack: dest.includes("substack.com"),
                  // isTwitter: twitterUrlRegex.test(dest),
                  isBsky: dest.includes("bsky.app"),
                  isDoi: dest.includes("doi.org"),
                  isOpenai: dest.includes("openai.com"),
                  isHf: dest.includes("huggingface.co"),
                  isYC: dest.includes("ycombinator.com"),
                  isAnthropic: dest.includes("anthropic.com"),
                  isFandom: dest.includes("fandom.com"),
                  isSteam: dest.includes("steamcommunity.com") || dest.includes("steampowered.com"),
                  isReddit: dest.includes("reddit.com"),
                }

                // Handle special link types
                const handleArxiv = (ctx: LinkContext) => {
                  if (opts.enableArxivEmbed && linkTypes.isArxiv) {
                    // ctx.classes.push("internal")
                    ctx.node.properties.dataArxivId = extractArxivId(ctx.dest)
                    return true
                  }
                  return false
                }

                // const handleCdnLinks = (ctx: LinkContext) => {
                //   if (ctx.isExternal && opts.enableRawEmbed) {
                //     if (ALLOWED_EXTENSIONS.includes(ctx.ext) && !isAbsoluteUrl(ctx.dest)) {
                //       ctx.classes.push("cdn-links")
                //       ctx.dest = ctx.node.properties.href =
                //         `https://cdn.aarnphm.xyz/assets/${ctx.dest}` as RelativeURL
                //     }
                //   }
                // }

                const createIconElement = (src: string, alt: string) =>
                  h(
                    "span",
                    { style: "white-space: nowrap;" },
                    h("img.inline-icons", {
                      src,
                      alt,
                      style:
                        "height: 1em; width: 1em; margin-left: 3px; position: relative;",
                    }),
                  )

                // Add appropriate icons based on link type
                // if (!handleArxiv(ctx) && !linkTypes.isEmbedTwitter) {
                // if (!handleArxiv(ctx)) {
                //   ctx.classes.push(ctx.isExternal ? "external" : "internal")
                // }

                // handleCdnLinks(ctx)

                // Add appropriate icons
                if (linkTypes.isWikipedia) {
                  ctx.node.children.push(
                    createIconElement("/static/favicons/wikipedia.avif", "Wikipedia"),
                  )
                // } else if (linkTypes.isApexDomain && file.data.slug! !== "index") {
                } else if (linkTypes.isApexDomain) {
                  ctx.node.children.push(createIconElement("/static/profile_pic_2025.png", "apex"))
                } else if (linkTypes.isArxiv) {
                  ctx.node.children.push(createIconElement("/static/favicons/arxiv.avif", "arXiv"))
                } else if (linkTypes.isLessWrong) {
                  ctx.node.children.push(
                    createIconElement("/static/favicons/lesswrong.avif", "LessWrong"),
                  )
                } else if (linkTypes.isSteam) {
                    ctx.node.children.push(
                      createIconElement("/static/favicons/Steam_Logo.png", "Steam"),
                    )
                } else if (linkTypes.isQuartz) {
                  ctx.node.children.push(createIconElement("/static/favicons/quartz.png", "Quartz"))
                } else if (linkTypes.isYoutube) {
                  ctx.node.children.push(youtubeSvg)
                } else if (linkTypes.isGwern) {
                  ctx.node.children.push(gwernSvg)
                } else if (linkTypes.isObsidian) {
                  ctx.node.children.push(obsidianSvg)
                } else if (linkTypes.isYC) {
                  ctx.node.children.push(ycSvg)
                } else if (linkTypes.isDoi) {
                  ctx.node.children.push(doiSvg)
                } else if (linkTypes.isHf) {
                  ctx.node.children.push(hfSvg)
                } else if (linkTypes.isAnthropic) {
                  ctx.node.children.push(anthropicSvg)
                } else if (linkTypes.isOpenai) {
                  ctx.node.children.push(openaiSvg)
                } else if (linkTypes.isGithub) {
                  ctx.node.children.push(githubSvg)
                } else if (linkTypes.isFandom) {
                  ctx.node.children.push(fandomSvg)
                } else if (linkTypes.isPerplexity) {
                  ctx.node.children.push(pplxSvg)
                } else if (linkTypes.isSubstack) {
                  ctx.node.children.push(substackSvg)
                // } else if (linkTypes.isTwitter) {
                //   ctx.node.children.push(twitterSvg)
                } else if (linkTypes.isReddit) {
                  ctx.node.children.push(redditSvg)
                } else if (linkTypes.isBsky) {
                  ctx.node.children.push(bskySvg)
                } else if (
                  // !linkTypes.isEmbedTwitter &&
                  !linkTypes.isCslNode &&
                  !linkTypes.isArxiv &&
                  ctx.isExternal &&
                  opts.externalLinkIcon
                ) {
                  ctx.node.children.push(defaultExternalSvg)
                }

                // Check if the link has alias text
                if (
                  node.children.length === 1 &&
                  node.children[0].type === "text" &&
                  node.children[0].value !== dest
                ) {
                  // Add the 'alias' class if the text content is not the same as the href
                  classes.push("alias")
                }
                node.properties.className = classes

                if ((ctx.isExternal && opts.openLinksInNewTab) || [".ipynb"].includes(ext)) {
                  node.properties.target = "_blank"
                }

                // don't process external links or intra-document anchors
                const isInternal = !(isAbsoluteUrl(dest) || dest.startsWith("#") || dest.startsWith("javascript:window.location.reload();"))
                if (isInternal) {
                  if (ext.includes("pdf")) {
                    // we use CF middleware for fetch from Git LFS, for now
                    dest = node.properties.href = `/${dest}` as RelativeURL
                  } else {
                    dest = node.properties.href = transformLink(
                      file.data.slug!,
                      dest,
                      transformOptions,
                    )
                  }

                  // url.resolve is considered legacy
                  // WHATWG equivalent https://nodejs.dev/en/api/v18/url/#urlresolvefrom-to
                  const url = new URL(dest, "https://base.com/" + stripSlashes(curSlug, true))
                  const canonicalDest = url.pathname
                  let [destCanonical, _destAnchor] = splitAnchor(canonicalDest)
                  if (destCanonical.endsWith("/")) {
                    destCanonical += "index"
                  }

                  // need to decodeURIComponent here as WHATWG URL percent-encodes everything
                  const full = decodeURIComponent(stripSlashes(destCanonical, true)) as FullSlug
                  const simple = simplifySlug(full)
                  outgoing.add(simple)
                  node.properties["data-slug"] = full
                }

                // rewrite link internals if prettylinks is on
                if (
                  opts.prettyLinks &&
                  isInternal &&
                  node.children.length === 1 &&
                  node.children[0].type === "text" &&
                  !node.children[0].value.startsWith("#")
                ) {
                  node.children[0].value = path.basename(node.children[0].value)
                }

                // add indicator hook after handling all prettyLinks, inspired by gwern
                if (opts.enableIndicatorHook) {
                  node.children = [h("span.indicator-hook"), ...node.children]
                }
              },
            )

            const shouldTransformResources = ({ tagName, properties }: Element) =>
              ["img", "video", "audio", "iframe"].includes(tagName) &&
              Boolean(properties.src) &&
              typeof properties.src === "string"

            // transform all other resources that may use links
            visit(
              tree,
              (node) => shouldTransformResources(node as Element),
              (node) => {
                if (opts.lazyLoad) node.properties.loading = "lazy"

                if (!isAbsoluteUrl(node.properties.src)) {
                  let dest = node.properties.src as RelativeURL
                  dest = node.properties.src = transformLink(
                    file.data.slug!,
                    dest,
                    transformOptions,
                  )
                  node.properties.src = dest
                }
              },
            )

            file.data.links = [...outgoing]
          }
        },
      ]
    },
  }
}

declare module "vfile" {
  interface DataMap {
    links: SimpleSlug[]
  }
}