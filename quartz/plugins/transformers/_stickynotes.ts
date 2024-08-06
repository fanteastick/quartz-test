import { visit } from "unist-util-visit"
import { QuartzTransformerPlugin } from "../types"
import { Blockquote } from "mdast-util-to-hast/lib/handlers/blockquote"

let windrag_js = `
    import { windrag } from 'https://cdn.jsdelivr.net/npm/windrag';

    document.addEventListener("nav", () => {
      var n = 0;
      [...document.getElementsByClassName("sticky-note")].forEach(function(el) {
          var selector = ".sticky-note-" + n;
          windrag.create(selector, selector);
          ++n;

          window.addCleanup(() => {
            const new_node = el.cloneNode(true);
            el.parentNode.replaceChild(new_node, el);
          });
      });
    });
`;

export const StickyNotes: QuartzTransformerPlugin = () => {
    let match = /^\s*note:/i
    let colors = [
        "red",
        "green",
        "blue",
        "purple",
    ]

    return {
        name: "FloatNotes",
        markdownPlugins() {
            return [() => {
                return (tree, file) => {
                    let color_offset = Math.floor(Math.random() * colors.length);
                    let note_id = 0;
                    visit(tree, "blockquote", (node: Blockquote, index, parent) => {
                        if (index === undefined)
                            return;
                        if (node.children[0].type != "paragraph")
                            return;
                        if (node.children[0].children[0].type != "text")
                            return;
                        if (!match.test(node.children[0].children[0].value))
                            return;

                        // remove the note indicator
                        node.children[0].children[0].value = node.children[0].children[0].value.replace(match, "");

                        let color = colors[(color_offset + note_id) % colors.length]
                        let side = (note_id % 2) * -2 + 1;
                        // let pos = Math.round(side * (300.0 + Math.random() * 100.0))
                        let pos = Math.round(  300)

                        parent.children[index] = {
                            type: 'parent',
                            children: [
                                {
                                    type: 'html',
                                    value: `<div class="sticky-note-wrapper"><div class="sticky-note sticky-note-${note_id} ${color}" style="left:${pos}px;">`
                                },
                                {
                                    type: 'parent',
                                    children: node.children
                                },
                                {
                                    type: 'html',
                                    value: `</div></div>`
                                }
                            ]
                        }
                        note_id += 1;
                        return;
                    })
                }
            }]
        },
        externalResources() {
            return {
                js: [
                    {
                        loadTime: "afterDOMReady",
                        moduleType: "module",
                        contentType: "inline",
                        script: windrag_js,
                    }
                ]
            }
        }
    }
}