import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

interface OnlyForOptions {
  /**
   * The title to look for
   */
  title: string
}

export default ((opts?: Partial<OnlyForOptions>, component?: QuartzComponent) => {
  if (component) {
    const Component = component
    function OnlyFor(props: QuartzComponentProps) {
      return props.fileData.frontmatter?.title === opts?.title ? 
        <Component {...props} /> :
        <></>;
    }

    OnlyFor.displayName = component.displayName
    OnlyFor.afterDOMLoaded = component.afterDOMLoaded
    OnlyFor.beforeDOMLoaded = component.beforeDOMLoaded
    OnlyFor.css = component.css
    return OnlyFor
  } else {
    return () => <></>
  }
}) satisfies QuartzComponentConstructor
