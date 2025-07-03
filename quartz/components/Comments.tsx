import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
// @ts-ignore
import script from "./scripts/comments.inline"
import { StringDecoder } from "node:string_decoder"

type Options = {
  provider: "giscus"
  options: {
    repo: `${string}/${string}`
    repoId: string
    category: string
    categoryId: string
    themeUrl?: StringDecoder
    lightTheme?: string
    darkTheme?: string
    mapping?: "url" | "title" | "og:title" | "specific" | "number" | "pathname"
    strict?: boolean
    reactionsEnabled?: boolean
    inputPosition?: "top" | "bottom"
    term?: string
    lang?: string
  }
}

function boolToStringBool(b: boolean): string {
  return b ? "1" : "0"
}

export default ((opts: Options) => {
  const Comments: QuartzComponent = ({ displayClass, fileData, cfg }: QuartzComponentProps) => {
    // check if comments should be displayed according to frontmatter
    // const disableComment: boolean =
      // fileData.frontmatter?.comments === "false" ### this is what i had originally btw
      // typeof fileData.frontmatter?.comments !== "undefined" &&
      // (!fileData.frontmatter?.comments || fileData.frontmatter?.comments === "false")
    // if (disableComment) {
    // 2025-02-04: actually, I only want comments if I choose to enable them in frontmatter
    const enableComment: boolean = 
      fileData.frontmatter?.comments === "true"
    if (!enableComment) {
      return <></>
    }

    return (
      <div>
        <h2>📗 Guestbook</h2>
      <div
        class={classNames(displayClass, "giscus")}
        data-repo={opts.options.repo}
        data-repo-id={opts.options.repoId}
        data-category={opts.options.category}
        data-category-id={opts.options.categoryId}
        data-mapping={opts.options.mapping ?? "url"}
        data-strict={boolToStringBool(opts.options.strict ?? true)}
        data-reactions-enabled={boolToStringBool(opts.options.reactionsEnabled ?? true)}
        data-input-position={opts.options.inputPosition ?? "bottom"}
        data-light-theme={opts.options.lightTheme ?? "light"}
        data-dark-theme={opts.options.darkTheme ?? "dark"}
        data-theme-url={
          opts.options.themeUrl ?? `https://${cfg.baseUrl ?? "example.com"}/static/giscus`
        }
        data-lang={opts.options.lang ?? "en"}
        data-term={opts.options.term}
      >
      </div>
      </div>
    )
  }

  Comments.afterDOMLoaded = script

  return Comments
}) satisfies QuartzComponentConstructor<Options>