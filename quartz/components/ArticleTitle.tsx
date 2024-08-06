import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import path from "path"
import { SimpleSlug } from "../util/path"

const ArticleTitle: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const slug = fileData.slug
  const folderNameRaw = path.dirname(slug ?? "") as SimpleSlug
  const folderName = folderNameRaw.replace(/-/g, ' '); // hacky - 8-5-24 ez

  // @ts-ignore
  const segments = slug.split('/').filter(Boolean); // also hacky - don't know how to cast the split
  const lastSegment = segments.length > 0 ? segments[segments.length - 1] : '';


  const title = (slug && folderName !== "." && folderName !== "tags" && lastSegment === "index" ) 
  ? `📂 ${folderName}` 
  : fileData.frontmatter?.title;

  // const title = fileData.frontmatter?.title original text lol 8-5-24 ez
  if (title) {
    return <h1 class={classNames(displayClass, "article-title")}>{title}</h1>
  } else {
    return null
  }
}

ArticleTitle.css = `
.article-title {
  margin: 2rem 0 0 0;
}
`

export default (() => ArticleTitle) satisfies QuartzComponentConstructor
