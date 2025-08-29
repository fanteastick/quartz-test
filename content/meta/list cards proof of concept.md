---
cssclasses:
  - list-cards
  - cards
date created: 2025-03-23T01:36
date modified: 2025-04-04T00:46
tags:
  - backlinks-exclude
  - explorer-exclude
  - graph-exclude
  - listing-exclude
  - recents-exclude
---

Another proof of concept is here: [[Fish homepage]]

## The code

Add the frontmatter property `cards` and `list-cards`. If you have the [Minimal theme](https://minimal.guide/cards) by kepano, you can see it in Obsidian preview. 

Get these two bits of code into your `custom.scss` however you like: 

```scss title="Code for the lists"
article.list-cards ul {
    display: grid;
    gap: 0.75rem;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    padding: 0;
    line-height: 1.3;
    list-style-type: '\200B'; // this hides the bullet dots
    margin-block-start: .5em;
    margin-block-end: .5em;
    padding-inline-start: 0;
}

article.list-cards ul li {
    background-color: var(--lightgray);
    padding: .6em;
    border-radius: 4px;
    border: 1px solid var(--gray);
    overflow: hidden;
    // margin-inline-start: 1ch;
    text-align: start;
}

article.list-cards ul ul li {
    margin-inline-end: .5ch;
    border: 0;
    font-size: .9em;
    padding: 0;
}
```

```scss title="Code for the tables"
// this is for making dataview results look like tables

article.cards tr {
    background-color: var(--lightgray);
    border: 1px solid var(--gray);
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0 0 .4em;
    border-radius: 6px;
    overflow: hidden;
    transition: box-shadow .15s linear;
    max-width: 1fr;
    height: auto;
}

article.cards tbody, article.cards div.table-container {
    clear: both;
    padding: 0.5rem 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    grid-column-gap: 0.75rem;
    grid-row-gap: 0.75rem;
}

article.cards thead {
    display:none;
}

article.cards img {
	width: 100%;
}
```

Fiddle with the numbers yourself if you want changes.

For the Dataview table --> cards I would recommend doing Dataview Serializer to make the table, and put a Dataview query in an obsidian comment so it doesn't show up in quartz. See the GitHub source file of this page for an example of what I mean. 

## The examples

sample list wee woo

- one list
- three list
	- sub description
	- ![[Ollama_image_1.png]]
- third thing

# other list

- wow
- wow
- wow
- underwater
- quartz
- static site generator
- lorem ipsum

[Obsidian CSS Inspector Workflow - Custom CSS & Theme Design - Obsidian Forum](https://forum.obsidian.md/t/obsidian-css-inspector-workflow/58178) 

[Cards - Minimal Documentation](https://minimal.guide/cards) 

%% 

```dataview
TABLE embed(link(Cover-img, "100")) as Cover, "**Date Modified: **" + dateformat(date-modified,"MMM d, yyyy") as "Modified" WHERE Cover-img
``` 

%%

<!-- QueryToSerialize: TABLE embed(link(Cover-img)) as Cover, "Date Modified: " + dateformat(date-modified,"MMM d, yyyy") as "Modified" WHERE Cover-img -->
<!-- SerializedQuery: TABLE embed(link(Cover-img)) as Cover, "Date Modified: " + dateformat(date-modified,"MMM d, yyyy") as "Modified" WHERE Cover-img -->

| File                                                                     | Cover                                                                                 | Modified                    |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- | --------------------------- |
| [[meta/card with an image as a thing.md\|card with an image as a thing]] | ![[rgb/attachments/Ollama_image_1.png\|Ollama_image_1.png]]                           | Date Modified: Apr 10, 2025 |
| [[meta/Code tester.md\|Code tester]]                                     | ![[linux/attachments/Cloudflare tunnels_image_3.png\|Cloudflare tunnels_image_3.png]] | Date Modified: Mar 26, 2025 |
<!-- SerializedQuery END -->

