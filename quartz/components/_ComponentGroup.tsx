import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default ((components?: QuartzComponent[]) => {
    if (components) {

        const Components: QuartzComponent = (props: QuartzComponentProps) => {
            return <div class="component-group">
                {components.map((c, i) => {
                    const Component = c;
                    return <Component {...props} />
                })}
            </div>
        }
        Components.css             = components.map((c, _) => c.css).join("\n");
        Components.afterDOMLoaded  = components.map((c, _) => c.afterDOMLoaded).join("\n");
        Components.beforeDOMLoaded = components.map((c, _) => c.beforeDOMLoaded).join("\n");

        return Components
    } else {
        return () => <></>
    }
}) satisfies QuartzComponentConstructor

// Copied from https://github.com/Naraenda/quartz-ascone/commit/fc70036371523ddb78b6eee895e374ab73d28519#diff-03e64821c7ee39078af3ee5bdd6f2a0765a9bae0b96160e662f275ef7ac7d0cc