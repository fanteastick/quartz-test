---
date created: 2024-11-16T10:47
date modified: 2025-01-18T18:53
---

Was worried about the many layout changes etc. 

- [x] eh??? where did my comments go???? (solved) (it was something with the frontmatter filters that the maintainers fixed)

## Merge from upstream

```
git fetch upstream
git checkout v4
git merge upstream/v4
```

Then go through in the vscode merge editor and merge in the edits one by one. Some stuff I could accept my edit + their edit, other stuff I could accept all incoming. 

## Download packages again

A simple `npm i`

To prevent error messages like "could not determine executable to run"

## Continued to remove mermaid

Just commented some more stuff. 

## Removed any $fullPageWidth stuff

This was originally in my custom.scss for a forced column and a forced row. So now the css is a bit wonky there, which I need to fix. 

```
    @media all and ($mobile) {
        justify-content: flex-end;
    }
```

used to be max-width: $fullPageWidth

## Made my forced-row component no longer flex

This was making it weirdly tall so I just took it off flex. 

## Increased the desktoponly height of the table of contents

in toc.scss I changed it from 40% to 55%

## Added a little divider on folder pages and tag pages

```
<p style={{ textAlign: 'center', opacity: 0.7 }}>───✱*.｡:｡✱*.:｡✧*.｡✰*.:｡✧*.｡:｡*.｡✱ ───</p>
```

## COMMENTS (welcome home!)

I think I put in an optional config when setting my initial giscus. 

In layout: `term: "Guestbook"` to the Component.Comments()

In Comments.tx: 

```
type Options = {
...
    term?: string
}

<div 
...
data-term={opts.options.term}
></div>
```

Also I had to comment out this kind of stupid boolean check for comments in the frontmatter to simplify to "only remove the comments if "comments: false" in the frontmatter"

```
const disableComment: boolean =
      fileData.frontmatter?.comments === "false"
    if (disableComment) {
      return <></>
    }
```

In comments.inline.ts:

```
    term: string
...
  giscusScript.setAttribute("data-term", giscusContainer.dataset.term)
```

## Added a margin-right on the non desktop views because it was too close to the edge

Base.scss

```
    @media all and not ($desktop) {
      padding: 0 1rem;
      margin-right: 10px;
    }
```

