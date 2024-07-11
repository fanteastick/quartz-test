
// @ts-ignore: this is safe, we don't want to actually make darkmode.inline.ts a module as
// modules are automatically deferred and we don't want that to happen for critical beforeDOMLoads
// see: https://v8.dev/features/modules#defer
import giscuscommentsscript from "./scripts/_giscuscomments.inline"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const GiscusComments: QuartzComponent = ({
  fileData,
  allFiles,
  displayClass,
  cfg,
}: QuartzComponentProps) => {
  return (
    <div class={classNames(displayClass)} id="giscus-container">
      <h3>Guestbook 📗</h3>
      <script src="https://giscus.app/client.js"
        data-repo="fanteastick/quartz-test"
        data-repo-id="R_kgDOMVIwGw"
        data-category="Announcements"
        data-category-id="DIC_kwDOMVIwG84Cguqi"
        data-mapping="specific"
        data-term="Guestbook"
        data-strict="0"
        data-reactions-enabled="0"
        data-emit-metadata="0"
        data-input-position="top"
        data-theme="light_protanopia"
        data-lang="en"
        data-loading="lazy"
        crossorigin="anonymous"
        async>
      </script>
    </div>
  )
}

// GiscusComments.beforeDOMLoaded = giscuscommentsscript not really working
export default (() => GiscusComments) satisfies QuartzComponentConstructor

