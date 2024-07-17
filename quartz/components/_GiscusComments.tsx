
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
      <small style="opacity:0.6">(You might need to refresh the page)</small>
      <script src="https://giscus.app/client.js"
        data-repo="fanteastick/quartz-test"
        data-repo-id="R_kgDOMVIwGw" // TO ANYONE WHO MIGHT BE COPYING THIS CODE
        data-category="Announcements" // Please don't copy it, these are keys for my own repo :)
        data-category-id="DIC_kwDOMVIwG84Cguqi" // the comments will go to MY discussion
        data-mapping="specific" // you can setup giscus for yourself! https://giscus.app
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

