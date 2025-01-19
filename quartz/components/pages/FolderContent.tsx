import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import path from "path"

import style from "../styles/listPage.scss"
import { byDateAndAlphabetical, PageList, SortFn } from "../PageList"
import { stripSlashes, simplifySlug, joinSegments, FullSlug } from "../../util/path"
import { Root } from "hast"
import { htmlToJsx } from "../../util/jsx"
import { i18n } from "../../i18n"
import { QuartzPluginData } from "../../plugins/vfile"

interface FolderContentOptions {
  /**
   * Whether to display number of folders
   */
  showFolderCount: boolean
  showSubfolders: boolean
  sort?: SortFn
}

const defaultOptions: FolderContentOptions = {
  showFolderCount: true,
  showSubfolders: true,
}

export default ((opts?: Partial<FolderContentOptions>) => {
  const options: FolderContentOptions = { ...defaultOptions, ...opts }

  const FolderContent: QuartzComponent = (props: QuartzComponentProps) => {
    const { tree, fileData, allFiles, cfg } = props
    const folderSlug = stripSlashes(simplifySlug(fileData.slug!))
    const folderParts = folderSlug.split(path.posix.sep)

    const allPagesInFolder: QuartzPluginData[] = []
    const allPagesInSubfolders: Map<FullSlug, QuartzPluginData[]> = new Map()

    allFiles.forEach((file) => {
      const fileSlug = stripSlashes(simplifySlug(file.slug!))
      const prefixed = fileSlug.startsWith(folderSlug) && fileSlug !== folderSlug
      const fileParts = fileSlug.split(path.posix.sep)
      const isDirectChild = fileParts.length === folderParts.length + 1

      if (!prefixed) {
        return
      }

      if (isDirectChild) {
        allPagesInFolder.push(file)
      } else if (options.showSubfolders) {
        const subfolderSlug = joinSegments(
          ...fileParts.slice(0, folderParts.length + 1),
        ) as FullSlug
        const pagesInFolder = allPagesInSubfolders.get(subfolderSlug) || []
        allPagesInSubfolders.set(subfolderSlug, [...pagesInFolder, file])
      }
    })

    allPagesInSubfolders.forEach((files, subfolderSlug) => {
      const hasIndex = allPagesInFolder.some(
        (file) => subfolderSlug === stripSlashes(simplifySlug(file.slug!)),
      )
      if (!hasIndex) {
        const subfolderDates = files.sort(byDateAndAlphabetical(cfg))[0].dates
        // const subfolderTitle = subfolderSlug.split(path.posix.sep).at(-1)!
        // Adding the 📂 emoji to the subfolder title (thanks gpt! 12/27/24)
        const subfolderTitle = `📂 ${subfolderSlug.split(path.posix.sep).at(-1)!}`
        allPagesInFolder.push({
          slug: subfolderSlug,
          dates: subfolderDates,
          frontmatter: { title: subfolderTitle, tags: ["folder"] },
        })
      }
    })

    const cssClasses: string[] = fileData.frontmatter?.cssclasses ?? []
    const classes = cssClasses.join(" ")
    const listProps = {
      ...props,
      sort: options.sort,
      allFiles: allPagesInFolder,
    }

    const content =
      (tree as Root).children.length === 0
        ? fileData.description
        : htmlToJsx(fileData.filePath!, tree)

    // If baseUrl contains a pathname after the domain, use this as the home link
    const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
    const baseDir = url.pathname

    return (
      <div class="popover-hint">
        <article class={classes}>{content}</article>
        <div class="page-listing">
          {options.showFolderCount && (
            <p>
              {i18n(cfg.locale).pages.folderContent.itemsUnderFolder({
                count: allPagesInFolder.length,
              })}
            </p>
          )}
          <p style={{ textAlign: 'center', opacity: 0.7 }}>───✱*.｡:｡✱*.:｡✧*.｡✰*.:｡✧*.｡:｡*.｡✱ ───</p>
          <div>
            <PageList {...listProps} />
          </div>
        </div>
        <a href={baseDir}>{i18n(cfg.locale).pages.error.home}</a>
        <hr />
      </div>
    )
  }

  FolderContent.css = style + PageList.css
  return FolderContent
}) satisfies QuartzComponentConstructor
