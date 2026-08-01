---
date created: 2025-11-19T13:51
date modified: 2026-04-15T17:45
tags:
  - vlsi
---

For usage with Cadence Virtuoso: [Virtuoso Layout Suite \| Cadence](https://www.cadence.com/en_US/home/tools/custom-ic-analog-rf-design/layout-design/virtuoso-layout-suite.html) 

Columbia BIOE/EE saved the vector file guide: [bioee.ee.columbia.edu/courses/cad/html/vector\_file.pdf](https://www.bioee.ee.columbia.edu/courses/cad/html/vector_file.pdf) 

## Schematic

| Key           | What it does                                                                                                                                                                  |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `i`           | insert instance, e.g. a gate from the library                                                                                                                                 |
| `p`           | insert pin, e.g. inputs or outputs                                                                                                                                            |
| `r`           | rotate. If you are in the "rotating" mode, you can rotate existing items. If you're already in the hover mode to place an instance, you can rotate whatever your cursor is on |
| `c`           | copy mode. enter the mode, and then click what you want to copy, and then click the new location where you want it to be                                                      |
| `l`           | labeling wires                                                                                                                                                                |
| `L`           | creating text labels                                                                                                                                                          |
| `shift+click` | select multiple items in the schematic                                                                                                                                        |

How to place multiple pins:

1) `p`
2) input
3) Names: A0 A1 A2 A3
4) Check the "place multiple pins"
5) Place one
6) Drag mouse down, and the others will hover open, click to place in desired spot
## Layout XL 

| Key                              | What it does                                                                                                                                                                                                        |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a`                              | Enters the aligning mode. After you do this, you can click the center of the perimeter lines for certain blocks and then click the center of another perimeter line, and it'll snap the block to that next location |
| `f`                              | zooming out to the whole design                                                                                                                                                                                     |
| `F`                              | changing view into the more complex etc thing                                                                                                                                                                       |
| `ctrl+f`                         | going back to the more simple view                                                                                                                                                                                  |
| `M`                              | merging selected routes                                                                                                                                                                                             |
| `p`                              | create trace                                                                                                                                                                                                        |
| `ctrl+shift` while in trace mode | use scroll wheel to change width of your trace                                                                                                                                                                      |
| right click while in trace mode  | Can choose a via and a layer to via into.                                                                                                                                                                           |

Updating the layout after schematic update: Connectivity -> Update components and nets -> ok

Remember that DRC is like a physical check, LVS is like checking that schematic <> layout match up. 

## Maestro simulation for test benches

Setup --> Stimuli --> Authoring mode ON vs OFF. Then you can assign globals and whatnot.

Left sidebar --> Analyses --> can set up something like "trans" (transient) and 8ns. 

## Adding a library to Library manager

Sometimes even though the dir is in the same path, it's not going to show up until you manually add it. 

Library Manager -> Edit -> Library path -> find the bottom one --> name your library  --> paste in the path --> done