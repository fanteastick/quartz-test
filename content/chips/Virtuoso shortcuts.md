---
date created: 2025-11-19T13:51
date modified: 2025-12-09T05:34
tags:
  - vlsi
---
For usage with Cadence Virtuoso: [Virtuoso Layout Suite \| Cadence](https://www.cadence.com/en_US/home/tools/custom-ic-analog-rf-design/layout-design/virtuoso-layout-suite.html) 

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
## Layout

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

## Calculators

[Boolean Algebra Calculator - eMathHelp](https://www.emathhelp.net/calculators/discrete-mathematics/boolean-algebra-calculator)

[Hex Calculator](https://www.rapidtables.com/calc/math/hex-calculator.html) 

[Lookahead carry unit - Wikipedia](https://en.wikipedia.org/wiki/Lookahead_carry_unit) 