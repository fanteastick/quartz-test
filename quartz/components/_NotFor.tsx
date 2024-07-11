import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

interface NotForOptions {
  /**
   * The titles to look for
   */
  titles: string[];
}

export default ((opts?: Partial<NotForOptions>, component?: QuartzComponent) => {
  if (component) {
    const Component = component
    function NotFor(props: QuartzComponentProps) {
        // Check if titles array is provided in opts and if the title matches any of them
        const titleNotInTitles  = !(opts?.titles?.some(title => props.fileData.frontmatter?.title === title));
        return titleNotInTitles  ? // so it'll be true if it is not in title 
        <Component {...props} /> :
        <></>;
    }

    NotFor.displayName = component.displayName
    NotFor.afterDOMLoaded = component.afterDOMLoaded
    NotFor.beforeDOMLoaded = component.beforeDOMLoaded
    NotFor.css = component.css
    return NotFor
  } else {
    return () => <></>
  }
}) satisfies QuartzComponentConstructor
