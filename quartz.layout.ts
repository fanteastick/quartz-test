import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  footer: Component.Footer({
    links: {
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
    Component.TagList(),
    Component.MobileOnly(Component.TableOfContents())
  ],
  // left: [
  //   Component.PageTitle(),
  //   Component.MobileOnly(Component.Spacer()),
  //   Component.Search(),
  //   // Component.Darkmode(),
  //   Component.DesktopOnly(Component.Explorer()),
  // ],
  // right: [
  //   // Component.Graph(), 
  //   Component.DesktopOnly(Component.TableOfContents()),
  //   Component.Backlinks(),
  //   Component.MobileOnly(Component.Explorer()),
  // ], 
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.DesktopOnly(Component.TableOfContents2()),
    Component.DesktopOnly(Component.GithubSource()),
    Component.DesktopOnly(Component.Backlinks()),
    // Component.Darkmode(),
  ],
  right: [
    Component.DesktopOnly(Component.Graph()),
    Component.Explorer(),
    Component.MobileOnly(Component.Backlinks()),
    Component.MobileOnly(Component.GithubSource()),
  ],

}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    // Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [],
}
