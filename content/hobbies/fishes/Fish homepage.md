---
date created: 2025-04-04T00:11
date modified: 2025-04-09T16:51
cssclasses:
  - cards
  - list-cards
---

To see the raw markdown, click the "Source" link. 

> [!seealso]- See also
> ![[list cards proof of concept#The code]] 

## Dataview query

Which I can see when I use Obsidian

```dataview
TABLE "Life expectancy: " + life-expectancy AS "Life Expectancy", embed(link(photo, "100")) as Photo, scientific-name
FROM "hobbies/fishes"
WHERE file.name != "Fish homepage"
```

## Dataview Serializer'd table

<!-- QueryToSerialize: TABLE "Life expectancy: " + life-expectancy AS "Life Expectancy", embed(link(photo, "100")) as Photo, scientific-name FROM "hobbies/fishes" WHERE file.name != "Fish homepage" -->
<!-- SerializedQuery: TABLE "Life expectancy: " + life-expectancy AS "Life Expectancy", embed(link(photo, "100")) as Photo, scientific-name FROM "hobbies/fishes" WHERE file.name != "Fish homepage" -->

| File                                                     | Life Expectancy           | Photo                                                             | scientific-name     |
| -------------------------------------------------------- | ------------------------- | ----------------------------------------------------------------- | ------------------- |
| [[hobbies/fishes/guppies.md\|guppies]]                   | Life expectancy: 3 years  | ![[hobbies/fishes/attachments/guppies_image_1.png\|100]]          | Poecilia reticulata |
| [[hobbies/fishes/dwarf pufferfish.md\|dwarf pufferfish]] | Life expectancy: 10 years | ![[hobbies/fishes/attachments/dwarf pufferfish_image_1.png\|100]] | Tetraodontidae      |
<!-- SerializedQuery END -->

## Or literally just a list

- dwarf pufferfish
	- Life expectancy: 10yrs
	- scientific name: Tetraodontidae
	- ![[dwarf pufferfish_image_1.png]]
- guppies
	- life expectancy: 3yrs
	- scientific name: buh
	- ![[guppies_image_1.png]]



## Carousel time


CAROUSELSTART🗣️
![[guppies_image_1.png]]
![[guppies_image_1.png]]
CAROUSELEND🗣️