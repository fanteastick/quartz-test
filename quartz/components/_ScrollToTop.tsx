import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/_scrollToTop.scss"

// @ts-ignore
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const ScrollToTop: QuartzComponent = ({ displayClass, fileData }: QuartzComponentProps) => {
return (
  <div class={classNames(displayClass, "scroll-to-top")}>
    {/* <h3>Source code</h3> */}
        <a href="#">
          Scroll to top ↑
        </a>
  </div>
)
}

ScrollToTop.css = style
export default (() => ScrollToTop) satisfies QuartzComponentConstructor