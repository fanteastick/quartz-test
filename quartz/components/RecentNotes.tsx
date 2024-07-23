import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, SimpleSlug, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { byDateAndAlphabetical } from "./PageList"
import style from "./styles/recentNotes.scss"
import { Date, getDate, formatDate } from "./Date"
import { GlobalConfiguration } from "../cfg"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"

interface Options {
  title?: string
  limit: number
  linkToMore: SimpleSlug | false
  showTags: boolean
  showDate: boolean
  filter: (f: QuartzPluginData) => boolean
  sort: (f1: QuartzPluginData, f2: QuartzPluginData) => number
  excludeTags: string[]
}

const defaultOptions = (cfg: GlobalConfiguration): Options => ({
  limit: 3,
  linkToMore: false,
  showTags: true,
  showDate: true,
  filter: () => true,
  sort: byDateAndAlphabetical(cfg),
  excludeTags: []
})

export default ((userOpts?: Partial<Options>) => {
  const RecentNotes: QuartzComponent = ({
    allFiles,
    fileData,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    const opts = { ...defaultOptions(cfg), ...userOpts }
    const pages = allFiles.filter(opts.filter).sort(opts.sort)
    const remaining = Math.max(0, pages.length - opts.limit)
    const _excludeTags = opts.excludeTags
    return (
      <div class={classNames(displayClass, "recent-notes")}>
        <h3>{opts.title ?? i18n(cfg.locale).components.recentNotes.title} 
          <span class="see-more">
            <span class="see-more">  </span>
            <a href="https://github.com/fanteastick/quartz-test/commits/v4/content?author=fanteastick" class="external">see history</a>
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
        
        <ul class="recent-ul">
          {pages.filter(page => { // added this code to first filter by tag and then slice
            return !_excludeTags.some(tag => page.frontmatter?.tags?.includes(tag));
          }).slice(0, opts.limit).map(page => {
            const title = page.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title
            const tags = page.frontmatter?.tags ?? []

            return (
              <li class="recent-li">
                <div class="section">
                  <div class="desc">
                    {/* Changed heading size of each link 3->4 on 7/10/24 */}
                    <h4>
                      ✿ <a href={resolveRelative(fileData.slug!, page.slug!)} class="internal">
                        {title}
                      </a>
                      {/* Changed showdate to optional + same row + faded a bit 7/10/24 */}
                      {opts.showDate && page.dates && (
                        <span class="see-more"> ₊⊹⊹₊ <Date date={getDate(cfg, page)!} locale={cfg.locale} /></span>
                        // <span style="opacity: 0.4">{" ₊⊹⊹₊ " + formatDate(page.dates.modified)}</span>
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
                </div>
              </li>
            )
          })}
        </ul>
        {opts.linkToMore && remaining > 0 && (
          <p>
            <a href={resolveRelative(fileData.slug!, opts.linkToMore)}>
              {i18n(cfg.locale).components.recentNotes.seeRemainingMore({ remaining })}
            </a>
          </p>
        )}
      </div>
    )
  }

  RecentNotes.css = style
  return RecentNotes
}) satisfies QuartzComponentConstructor
