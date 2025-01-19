import { Date, getDate, _getDateCustom } from "./Date"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import readingTime from "reading-time"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import { JSX } from "preact"
import style from "./styles/contentMeta.scss"
// @ts-ignore
import permalinkScript from "./scripts/_permalinkCopy.inline"

interface ContentMetaOptions {
  /**
   * Whether to display reading time
   */
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

export default ((opts?: Partial<ContentMetaOptions>) => {
  // Merge options with defaults
  const options: ContentMetaOptions = { ...defaultOptions, ...opts }

  function ContentMetadata({ cfg, fileData, displayClass }: QuartzComponentProps) {
    const text = fileData.text
    
    if (text) {
      const segments: (string | JSX.Element)[] = []
      const permalinks: (string | JSX.Element)[] = []
      const subtitles: (string | JSX.Element)[] = []

      // if (fileData.dates && fileData.slug !== "index") {
      //   // segments.push(formatDate(getDate(cfg, fileData)!, cfg.locale))
      //   segments.push("Created " + formatDate(fileData.dates.created))
      //   segments.push("modified " + formatDate(fileData.dates.modified))
      // }

      if (fileData.dates && fileData.slug !== "index") {
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

      // Display reading time if enabled
      if (options.showReadingTime && fileData.slug !== "index") {
        const { minutes, words: _words } = readingTime(text)
        const displayedTime = i18n(cfg.locale).components.contentMeta.readingTime({
          minutes: Math.ceil(minutes),
        })
        segments.push(<span>{displayedTime}</span>)
      }

      if (fileData.frontmatter?.permalink) {
        permalinks.push(
            <a key="permalink" class="internal permalink" id="permalink" >
              {cfg.baseUrl}/{fileData.frontmatter.permalink}
            </a>
        )
      }
    
      if (fileData.frontmatter?.subtitle) {
        // const uppercaseSubtitle = fileData.frontmatter.subtitle.toUpperCase();
        subtitles.push(
          // `${uppercaseSubtitle}`
          `${fileData.frontmatter.subtitle}`
        )
      }
      const segmentsElements = segments.map((segment) => <span>{segment}</span>)

      // return (
      //   <div class={classNames(displayClass, "content-meta")}>
      //   <p style={{ margin: '0', padding: '0'}}>
      //     <a href={`${options?.repoLink}/blob/${options?.branch}/${fileData.filePath!}`}>
      //     ᨒ Source ᨒ 
      //       </a>  
      //     <a href={`${options?.repoLink}/blame/${options?.branch}/${fileData.filePath!}`}>
      //     ↟ Blame ᨒ 
      //     </a>
      //     <a href={`${options?.repoLink.replace('github.com', 'github.githistory.xyz')}/commits/${options?.branch}/${fileData.filePath!}`}>
      //     ↟ GitHistory ↟
      //     </a>
      //   </p>
        
      //   {subtitles.length > 0 && (
      //     <p style={{ margin: '0', padding: '0', fontStyle:'italic' }}  class={classNames(displayClass, "content-meta")}>
      //       Alternatively: {subtitles}
      //     </p>
      //   )}
      //   {permalinks.length > 0 && (
      //     <p style={{ margin: '0', padding: '0' }}  class={classNames(displayClass, "content-meta")}>
      //       Semi-permalink: {permalinks}
      //     </p>
      //   )}
      //   <p style={{ margin: '0', padding: '0' }} show-comma={options.showComma} class={classNames(displayClass, "content-meta")}>
      //     {segmentsElements}
      //   </p>
      //   </div>
      return (
        <div>
        <p show-comma={options.showComma} style={{ margin: '0', padding: '0'}} class={classNames(displayClass, "content-meta")}>
          {segments}
        </p>
        {subtitles.length > 0 && (
          <p style={{ margin: '0', padding: '0' }}  class={classNames(displayClass, "content-meta")}>
            Alternatively: <span style={{fontStyle: 'italic'}}>{subtitles}</span>
          </p>
        )}
        {permalinks.length > 0 && (
          <p style={{ margin: '0', padding: '0' }}  class={classNames(displayClass, "content-meta")}>
            Semi-permalink: {permalinks}
          </p>
        )}
        </div>
      )
    } else {
      return null
    }
  }

  ContentMetadata.css = style
  ContentMetadata.afterDOMLoaded = permalinkScript;
  return ContentMetadata
}) satisfies QuartzComponentConstructor
