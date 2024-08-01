import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { FileNode } from "./quartz/components/ExplorerNode";
import { SimpleSlug } from "./quartz/util/path";
// Constants for config that are reused a lot
const homepageTitle = "Eilleen's (online!) Everything Notebook"
const modifiedListTitle = "All-files-chronologically-modified"
const mapTitle = "Map"
const tagsToRemove = ["graph-exclude", "explorer-exclude", "backlinks-exclude", "recents-exclude"]
const graphConfig = {
  localGraph: {
    removeTags: tagsToRemove,
    excludeTags: ["graph-exclude"]
  },
  globalGraph: {
    removeTags: tagsToRemove,
    excludeTags: ["graph-exclude"]
  }
};
const hideGraphOnRightConfig = [homepageTitle, modifiedListTitle, mapTitle]
const tagListConfig = { 
  excludeTags: tagsToRemove
}
const explorerConfig = {
  filterFn: (node: FileNode) => node.name !== "tags" &&
  !(node.file?.frontmatter?.tags?.includes("explorer-exclude") === true)
}
const recentNotesConfig = { 
  showTags: false, 
  title: "Recently edited notes:", 
  showDate: true,
  linkToMore: "meta/" + modifiedListTitle as SimpleSlug,
  excludeTags: ["recents-exclude"],
}
const backlinksConfig = {
  excludeTags: ["backlinks-exclude"]
}
const giscusConfig = {
  provider: "giscus",
    options: {
      // from data-repo
      repo: 'fanteastick/quartz-test',
      // from data-repo-id
      repoId: 'R_kgDOMVIwGw',
      // from data-category
      category: 'Announcements',
      // from data-category-id
      categoryId: 'DIC_kwDOMVIwG84Cguqi',
      mapping: "specific",
      strict: false,
      reactionsEnabled: false,
      inputPosition: "top"
  }
}
///////////////////////////////////////////////////
// components shared across all pages  
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
  Component.OnlyFor(
    { titles: [homepageTitle, mapTitle] },
    Component.RecentNotes(recentNotesConfig)
  ), 
  Component.OnlyFor(
    { titles: [homepageTitle, mapTitle] }, 
    Component.Graph(graphConfig)
  ),
  Component.OnlyFor(
    { titles: [homepageTitle] }, 
    Component.GiscusComments()
  )
],
  footer: Component.Footer({
    links: {
      Main: "https://www.eilleeenz.com/",
      GitHub: "https://github.com/fanteastick/quartz-test",
    },
  }),
}

// components for pages that display a single page (e.g. a single note) 
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(tagListConfig),
    Component.MobileOnly(Component.TableOfContents())
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Row([
      Component.Search(),
      Component.Map(),
      Component.Darkmode(),
    ]),
    Component.DesktopOnly(Component.TableOfContents2()),
    Component.DesktopOnly(Component.Backlinks(backlinksConfig)),
    Component.DesktopOnly(Component.GithubSource()),
  ],
  right: [
    Component.NotFor( 
      {titles: hideGraphOnRightConfig}, 
      Component.DesktopOnly(Component.Graph(graphConfig))
    ),
    Component.Explorer(explorerConfig), 
    Component.MobileOnly(Component.ComponentGroup([
      Component.Backlinks(backlinksConfig),
      Component.GithubSource(),
    ])),
  ],
}
// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Row([
      Component.Search(),
      Component.Map(),
      Component.Darkmode(),
    ]),
  ],
  right: [
    Component.DesktopOnly(Component.Explorer(explorerConfig)),
  ],
}
