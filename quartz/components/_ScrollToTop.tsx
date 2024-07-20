import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/_scrollToTop.scss"

// @ts-ignore
import script from "./scripts/_randomPage.inline"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const ScrollToTop: QuartzComponent = ({ displayClass, fileData }: QuartzComponentProps) => {
return (
  <div class={classNames(displayClass, "scroll-to-top")}>
    {/* <h3>Source code</h3> */}
        {/* <h3><a href="#">
          Scroll to top ↑
        </a></h3>
        <h3><a id="random-page-button">Navigate to Random Page</a></h3> */}
    <h3>Utilities</h3>
    <ul>
      <li>
        <a href="#">
        Scroll to top ↑
        </a> 
      </li>
      <li>
        {/* <a href={`https://github.com/fanteastick/quartz-test/blame/v4/content/${fileData.slug}.md`}> */}
        <a id="random-page-button">
        Random Page 🎲
        </a>
      </li>
    </ul>

  </div>
)}

ScrollToTop.css = style
ScrollToTop.afterDOMLoaded = script
export default (() => ScrollToTop) satisfies QuartzComponentConstructor