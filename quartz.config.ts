import 'dotenv/config';
import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"


// const myGoatcounterCode = process.env.GOATCOUNTER_CODE as string;

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */

const possiblePageTitles = [
  "(｡•ㅅ•｡)~✧",
  "૭( ᵕ•̀ᵕ•́૭)",
  "(૭ •́ ᵕ•̀ )૭",
  "(๑>؂·̀๑)",
  "৻(•̀ᗜ•́৻)",
  "٩(•̤̀ᵕ•̤́๑)",
  "(｡•́︿•̀｡)",
  "ᕙ( •̀ ᗜ •́ )ᕗ",
  "(๑•́ ₃ •̀๑)",
  "(づ ̄ ³ ̄)づ",
  "( ˵ •̀ ᴗ •́˵)",
  "(๑•́o•̀๑)",
  "٩(๑❛ᴗ❛๑)6",
  "(╥﹏╥)",
  "( ˘ ³˘(◡‿◡˶)",
  "٩(๑˘•ω•˘๑)٩",
  "૮ ˶ᵔ ᵕ ᵔ˶ ა",
  "(˶˃ ᵕ ˂˶).ᐟ",
  "ദ്ദി •⩊• )",
  "꒰ᐢ. .ᐢ꒱₊˚⊹",
  "Ꮺ ָ࣪ ۰ ͙⊹",
  "˚ʚ♡ɞ˚",
  "𓂃 ࣪⋆💿˚ ༘",
  "⸜(｡˃ ᵕ ˂ )⸝♡",
  "`⎚⩊⎚´ -✧",
  "(˶˃ ᵕ ˂˶)~✧",
  "(๑>⋆<๑)~✧",
  "(˵•̀ ᴗ •́˵)~✧",
  "(૮ ᵕ•̀ )૮~✧",
];
function getRandomPageTitle(): string {
  return possiblePageTitles[Math.floor(Math.random() * possiblePageTitles.length)];
}

const config: QuartzConfig = {
  configuration: {
    pageTitle: getRandomPageTitle(),
    pageTitleSuffix: " | Eilleen's e-Notebook",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "goatcounter",
      websiteId: "GOATCOUNTER_CODE_PLACEHOLDER",
    },
    locale: "en-US",
    baseUrl: "quartz.eilleeenz.com",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    passProtected: {
      enabled: true,
      iteration: 2e6,
    },
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        // body: "Source Sans Pro", << original
        body: "Atkinson Hyperlegible",
        code: "IBM Plex Mono",
      },
      colors: {
        // lightMode: {
        //   light: "#faf8f8",
        //   lightgray: "#e5e5e5",
        //   gray: "#b8b8b8",
        //   darkgray: "#4e4e4e",
        //   dark: "#2b2b2b",
        //   secondary: "#284b63",
        //   tertiary: "#84a59d",
        //   highlight: "rgba(143, 159, 169, 0.15)",
        // },
      //   'desert-storm': {
      //     '50': '#fafbf9',
      //     '100': '#eff2ec',
      //     '200': '#dde2d5',
      //     '300': '#bfc9b0',
      //     '400': '#9bab85',
      //     '500': '#809166',
      //     '600': '#677851',
      //     '700': '#546242',
      //     '800': '#475339',
      //     '900': '#3e4733',
      //     '950': '#292f22',
      // },
        lightMode: {
          light: "#eff2ec",
          lightgray: "#dde2d5",
          gray: "#9bab85",
          darkgray: "#475339",
          dark: "#292f22",
          secondary: "#3e4733",
          tertiary: "#84a59d",
          highlight: "rgba(191,201,176, 0.25)",
          textHighlight: "#fff23688",
        },
        // darkMode: {
        //   light: "#161618",
        //   lightgray: "#393639",
        //   gray: "#646464",
        //   darkgray: "#d4d4d4",
        //   dark: "#ebebec",
        //   secondary: "#7b97aa",
        //   tertiary: "#84a59d",
        //   highlight: "rgba(143, 159, 169, 0.15)",
        //   textHighlight: "#b3aa0288",
        // },
        darkMode: {
          light: "#161618",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#9bab85",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },   
  plugins: {
    transformers: [
      Plugin.Staticrypt(),
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.FancyText(),
      // Plugin.StickyNotes(),
      Plugin.TelescopicText(),
      Plugin.MusicABCPlugin(),
      Plugin.ezTextReplacer(),
      Plugin.BlurText(), // this NEEDS to be in the later half, like right before syntax highlighting
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.Citations({ bibliographyFile: "./content/bibliography.bib", linkCitations: true }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.TableOfContents2(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }), // this is links.tsx
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.ClickableImages(),
      Plugin.Carousel({showDots: true}),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      // Plugin.CustomOgImages(),
    ],
  },
}

// Wishful thinking/TODO: make it so that it refreshes on each DOMContentLoaded
// document.addEventListener('DOMContentLoaded', () => {
//   const title = getRandomPageTitle();
//   // document.title = title + config.configuration.pageTitleSuffix;
//   config.configuration.pageTitle = title; // Update the config object
// });
export default config
