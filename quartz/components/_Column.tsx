import { getFlexContainer } from "../util/_componentGrid";
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types";

export default ((children?: QuartzComponent[]) => {
  if (children) {
    return getFlexContainer(children!, 'forced-column');
  }
  else {
    return () => <></>
  }
}) satisfies QuartzComponentConstructor