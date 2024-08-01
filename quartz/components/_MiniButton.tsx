// @ts-ignore
// loosely based off of the darkmode component 
// honestly more like a template for other components
import styles from "./styles/_miniButton.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { GlobalConfiguration } from "../cfg"

interface Options {
    href: string,
    title: string,
  }
  
  const defaultOptions = (cfg: GlobalConfiguration): Options => ({
    href: "/",
    title: "n/a"
  })
  
export default ((userOpts?:Partial<Options>) => {
    const MiniButton: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
        const opts = { ...defaultOptions(cfg), ...userOpts }

        return (
          <div class={classNames(displayClass, "minibutton")}>
            <a href={opts.href} tabIndex={-1}>
            {/* <label for="darkmode-toggle" tabIndex={-1}> */}
            <label tabIndex={-1}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="nightIcon"
                x="0px"
                y="0px"
                viewBox="0 0 24 24"
                style="enable-background:new 0 0 100 100"
                xmlSpace="preserve"
              >
                <title>{opts.title}</title>
                <path d="M9 20L3 17V4L9 7M9 20L15 17M9 20V7M15 17L21 20V7L15 4M15 17V4M9 7L15 4" stroke="var(--darkgray)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </label>
            </a>
          </div>
        )
      }
      
      MiniButton.css = styles
      return MiniButton
    
}) satisfies QuartzComponentConstructor
