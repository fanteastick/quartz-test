import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import script from "./scripts/_randomPage.inline"
import style from "./styles/_randomPage.scss"
import { classNames } from "../util/lang"

const RandomPageButton: QuartzComponent = ({ displayClass, fileData }: QuartzComponentProps) => {
    return (
        <div id="random-page-button" class={classNames(displayClass,  "random-page")}>
            {/* <ul>
                <li> */}
                <svg y="0px" x="0px" viewBox="0 0 316 316">
                    <title>Random page</title>
                    <g>
                        <rect class="random-page-square" stroke-width="15" rx="30" height="300" width="300" y="8" x="8" fill="none" />
                        <ellipse class="random-page-ellipse" ry="20" rx="20" cy="83" cx="108" />
                        <ellipse class="random-page-ellipse" ry="20" rx="20" cy="83" cx="208" />
                        <ellipse class="random-page-ellipse" ry="20" rx="20" cy="233" cx="208" />
                        <ellipse class="random-page-ellipse" ry="20" rx="20" cy="233" cx="108" />
                        <ellipse class="random-page-ellipse" ry="20" rx="20" cy="158" cx="208" />
                        <ellipse class="random-page-ellipse" ry="20" rx="20" cy="158" cx="108" />
                    </g>
                </svg>
                {/* </li>
            </ul> */}
            
            {/* <h3>Go to a random page 🎲</h3> */}
        </div>
    )
}
RandomPageButton.css = style
RandomPageButton.afterDOMLoaded = script
export default (() => RandomPageButton) satisfies QuartzComponentConstructor
