---
date created: 2024-11-16T10:47
date modified: 2024-11-16T13:29
---

Was worried about the many layout changes etc. 

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

## 