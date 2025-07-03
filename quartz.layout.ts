import 'dotenv/config';

import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { SimpleSlug } from "./quartz/util/path";
import { QuartzPluginData } from "./quartz/plugins/vfile"
import { FileTrieNode } from './quartz/util/fileTrie';
import { FileNode } from "./quartz/components/_ExplorerNodeOld";

// Secrets
const myRepoID = process.env.GISCUS_REPO_ID;
const myCategoryID = process.env.GISCUS_CATEGORY_ID;

// Constants for config that are reused a lot
const homepageTitle = "Eilleen's (online!) Everything Notebook"
const modifiedListTitle = "All-files-chronologically-modified"
const mapTitle = "Map"
const tagsToRemove = ["graph-exclude", "explorer-exclude", "backlinks-exclude", "recents-exclude", "search-exclude", "listing-exclude"]
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
const tagListConfig = { 
  excludeTags: tagsToRemove
}
const explorerConfig = {
  filterFn: (node: FileTrieNode) => {
    const omit = new Set(["tags"]);
    const hasExcludedTag = node.data?.tags?.includes("explorer-exclude") === true;
    const isOmitted = omit.has(node.displayName?.toLowerCase());
    return !hasExcludedTag && !isOmitted;
  },
  mapFn: (node: FileTrieNode) => {
    // dont change name of root node
    if (!node.isFolder) {
      // set emoji for file/folder      
        node.displayName = "⊹ " + node.displayName
    }
  },
}
const recentNotesConfig = { 
  showTags: false, 
  title: "Recently edited notes:", 
  showDate: true,
  linkToMore: "meta/" + modifiedListTitle as SimpleSlug,
  excludeTags: ["recents-exclude", "slurp", "external"],
  filter: (f: QuartzPluginData) => !f.slug!.startsWith("tags/") && !f.slug!.endsWith("/index")
}
const backlinksConfig = {
  excludeTags: ["backlinks-exclude"],
  hideWhenEmpty: false
}

const breadcrumbsConfig = {
  rootName: "🏡"
}

const oldexplorerConfig = {
  filterFn: (node: FileNode) => node.name !== "tags" &&
  !(node.file?.frontmatter?.tags?.includes("explorer-exclude") === true),
  mapFn: (node: FileNode) => {
    // dont change name of root node
    if (node.depth > 0) {
      // set emoji for file/folder
      if (node.file) {
        node.displayName = "✾ " + node.displayName
      } else {
        // node.displayName = "📁 " + node.displayName
      }
  }
}}
const giscusConfig = {
  provider: 'giscus',
  options: {
    // from data-repo
    repo: 'fanteastick/quartz-test',
    // from data-repo-id
    repoId: myRepoID,
    // from data-category
    category: 'Announcements',
    // from data-category-id
    categoryId: myCategoryID,
    mapping: "specific",
    strict: false,
    reactionsEnabled: false,
    inputPosition: "top",
    term: "Guestbook"
}}
const githubSourceConfig = { 
  repoLink: "https://github.com/fanteastick/quartz-test"
}
///////////////////////////////////////////////////
// components shared across all pages  
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
  Component.OnlyFor(
    { titles: [homepageTitle] },
    Component.RecentNotes(recentNotesConfig)
  ), 
  Component.OnlyFor(
    { titles: [mapTitle]},
    Component.RecentNotes({...recentNotesConfig, limit: 8})
  ),
  Component.Comments({
    provider: 'giscus',
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
      inputPosition: "top",
      term: "Guestbook"
  }})
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
    Component.Breadcrumbs(breadcrumbsConfig),
    // Component.ConditionalRender({
    //   component: Component.Breadcrumbs(),
    //   condition: (page) => page.fileData.slug !== "index",
    // }),
    Component.ArticleTitle(),
    Component.ContentMeta(githubSourceConfig),
    Component.ConditionalRender({
      component: Component.Properties(),
      condition: (page) => page.fileData.frontmatter?.slurped !== undefined,
    }),
    Component.TagList(tagListConfig),
    Component.MobileOnly(Component.TableOfContents()),
    // Component.MobileOnly(Component.OnlyFor({titles: [mapTitle]}, Component.ExplorerOld(explorerConfig)))
  ],
  left: [
    Component.MobileOnly(Component.OverlayExplorer(oldexplorerConfig)),
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Row([
      Component.Map(),
      Component.Darkmode(),
      Component.Search(),
    ]),
    // Component.DesktopOnly(Component.OnlyFor({titles: [homepageTitle, mapTitle]}, Component.ExplorerOld(explorerConfig))),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.DesktopOnly(Component.OnlyFor({titles: [homepageTitle, mapTitle]}, Component.Explorer(explorerConfig))),
    Component.FloatingButtons({position: 'right'}),
    // Component.DesktopOnly(Component.PageTitle()),
    // Component.DesktopOnly(
    //   Component.Row([
    //     Component.Map(),
    //     Component.Darkmode(),
    //     Component.Search(),
    //   ])),
    // Component.DesktopOnly(Component.TableOfContents()),
    // Component.OnlyFor({titles: [homepageTitle, mapTitle]}, Component.Explorer(explorerConfig)),
    // Component.FloatingButtons({position: 'right'}),
    
    // Component.MobileOnly(
    //   Component.Flex({
    //     components: [
    //       {Component: Component.PageTitle(),
    //         justify: "around",
    //       },
    //       // {Component: Component.Spacer()},
    //       {Component: Component.Row([
    //         Component.Map(),
    //         Component.Darkmode(),
    //         Component.Search(),
    //         ]),
    //         justify: "around",
    //       },
    //     ]}
    //   )
    // ),
  ],
  right: [
    Component.Graph(graphConfig),
    Component.Backlinks(backlinksConfig),
  ],
}
// components for pages that display lists of pages  (e.g. tags or folders) 
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(breadcrumbsConfig), Component.ArticleTitle()],
  left: [
    Component.MobileOnly(Component.OverlayExplorer()),
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Row([
      Component.Map(),
      Component.Darkmode(),
      Component.Search(),
    ]),
    Component.FloatingButtons({position: 'right'}),
  ],
  right: [
    Component.HiddenGlobalGraph(graphConfig),
  ],
}