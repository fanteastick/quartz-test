import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/backlinks.scss"
import { resolveRelative, simplifySlug } from "../util/path"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"
import { GlobalConfiguration } from "../cfg"

interface Options {
  excludeTags: string[]
}

const defaultOptions = (cfg: GlobalConfiguration): Options => ({
  excludeTags: []
})
export default ((userOpts?: Partial<Options>) => {
  const Backlinks: QuartzComponent = ({
    fileData,
    allFiles,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    const slug = simplifySlug(fileData.slug!)
    // Parse config
    const opts = { ...defaultOptions(cfg), ...userOpts }
    const _excludeTags = opts.excludeTags
    // check if the file has the link, and then remove the file if it has the tags
    const unfilteredBacklinkFiles = allFiles.filter((file) => file.links?.includes(slug))
    const backlinkFiles = unfilteredBacklinkFiles.filter((file) => {
      const hasExcludeTag = _excludeTags.some((tag: string) => // todo: check if the SOME filter works
        file.frontmatter?.tags?.includes(tag)
      );
      return !hasExcludeTag;
    });
    return (
      <div class={classNames(displayClass, "backlinks")}>
        <h3>{i18n(cfg.locale).components.backlinks.title}</h3>
        <ul class="overflow">
          {backlinkFiles.length > 0 ? (
            backlinkFiles.map((f) => (
              <li>
                <a href={resolveRelative(fileData.slug!, f.slug!)} class="internal">
                  {f.frontmatter?.title}
                </a>
              </li>
            ))
          ) : (
            <li>{i18n(cfg.locale).components.backlinks.noBacklinksFound}</li>
          )}
        </ul>
      </div>
    )
  }
    
  Backlinks.css = style
  return Backlinks
}) satisfies QuartzComponentConstructor


// export default (() => Backlinks) satisfies QuartzComponentConstructor
