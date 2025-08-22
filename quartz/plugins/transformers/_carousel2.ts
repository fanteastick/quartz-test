// from https://gist.github.com/pinei/14545e81e8629eed72b55fce1cbd7822
// 07/03/2025
import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"
import { Plugin } from "unified"

// @ts-ignore
import carouselScript from "../../components/scripts/_carousel.inline"
import carouselStyle from "../../components/styles/_carousel.scss"

interface CarouselOptions {
  showDots: boolean
}

export const Carousel2: QuartzTransformerPlugin<Partial<CarouselOptions>> = (opts) => {
  const showDots = opts?.showDots ?? true

  function carouselCombinedTransformer() {
    return (tree: any) => {
      visit(tree, ["paragraph", "html"], (node: any, index: number, parent: any) => {
        let content: string

        if (node.type === "paragraph") {
          content = node.children.map((c: any) => c.value).join("")
        } else if (node.type === "html") {
          content = node.value as string
        } else {
          return
        }

        if (
          content.startsWith("CAROUSELSTART🗣️") &&
          content.endsWith("CAROUSELEND🗣️")
        ) {
          // Extract lines inside the carousel
          const innerLines = content
            .slice("CAROUSELSTART🗣️".length, - "CAROUSELEND🗣️".length)
            .trim()
            .split(/\r?\n/)

          // Map each ![[...]] line to an img tag inside div.carousel-slide
          const processedContent = innerLines
            .map(line => {
              const match = line.match(/!\[\[(.+?)\]\]/)
              if (match) {
                const imgSrc = match[1]
                return `<div class="quartz-carousel-slide"><img src="${imgSrc}" alt="" /></div>`
              }
              return ""
            })
            .filter(Boolean)
            .join("")

          // Replace the node with a div that has a carousel class
          const newNode = {
            type: "html",
            value: `<div class="quartz-carousel" data-needs-init="true">
                <div class="quartz-carousel-slides">
                    ${processedContent}
                </div>
                ${showDots ? '<div class="quartz-carousel-dots"></div>' : ""}
                <button class="quartz-carousel-prev" aria-label="Previous slide">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
                    </svg>
                </button>
                <button class="quartz-carousel-next" aria-label="Next slide">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                    </svg>
                </button>
                </div>`
          }

          if (parent && index !== undefined) {
            parent.children[index] = newNode
          } else {
            node.type = newNode.type
            node.value = newNode.value
          }
        }
      })
    }
  }

  return {
    name: "Carousel2",
    markdownPlugins() {
      return [carouselCombinedTransformer]
    },
    externalResources() {
      return {
        css: [
          {
            content: carouselStyle,
            inline: true,
          },
        ],
        js: [
          {
            script: carouselScript,
            loadTime: "afterDOMReady",
            contentType: "inline",
          },
        ],
      }
    },
  }
}
