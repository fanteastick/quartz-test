import { pathToRoot, slugTag } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { GlobalConfiguration } from "../cfg"

interface Options {
  excludeTags: string[]
}
const defaultOptions = (cfg: GlobalConfiguration): Options => ({
  excludeTags: []
})

export default ((userOpts?: Partial<Options>) => {
  const TagList: QuartzComponent = ({ fileData, displayClass, cfg }: QuartzComponentProps) => {
    const opts = { ...defaultOptions(cfg), ...userOpts }
    const _excludeTags = opts.excludeTags
    const tags = fileData.frontmatter?.tags
    const baseDir = pathToRoot(fileData.slug!)
    if (tags && tags.length > 0) {
      return (
        <ul class={classNames(displayClass, "tags")}>
          {tags.filter(tag => {
            return !_excludeTags.some(excludeTag => tag.includes(excludeTag));
          }).map((tag) => {
            const linkDest = baseDir + `/tags/${slugTag(tag)}`
            return (
              <li>
                <a href={linkDest} class="internal tag-link">
                  {tag}
                </a>
              </li>
            )
          })}
        </ul>
      )
    } else {
      return null
    }
  }
  TagList.css = `
.tags {
  list-style: none;
  display: flex;
  padding-left: 0;
  gap: 0.4rem;
  margin: 1rem 0;
  flex-wrap: wrap;
}

.section-li > .section > .tags {
  justify-content: flex-end;
}
  
.tags > li {
  display: inline-block;
  white-space: nowrap;
  margin: 0;
  overflow-wrap: normal;
}

a.internal.tag-link {
  border-radius: 8px;
  background-color: var(--highlight);
  padding: 0.2rem 0.4rem;
  margin: 0 0.1rem;
}
`
  return TagList
}) satisfies QuartzComponentConstructor

// export default (() => TagList) satisfies QuartzComponentConstructor
