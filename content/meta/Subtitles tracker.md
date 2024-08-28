---
date created: 2024-08-26T23:23
date modified: 2024-08-27T00:55
tags:
  - graph-exclude
  - recents-exclude
  - backlinks-exclude
  - tracker
---

The query

```
TABLE subtitle as "Subtitle", file.folder as "Folder"
WHERE typeof(subtitle) = "string" AND draft != "true"
SORT file.name ASC
```

<!-- QueryToSerialize: TABLE subtitle as "Subtitle", file.folder as "Folder" WHERE typeof(subtitle) = "string" AND draft != "true" SORT file.name ASC -->
<!-- SerializedQuery: TABLE subtitle as "Subtitle", file.folder as "Folder" WHERE typeof(subtitle) = "string" AND draft != "true" SORT file.name ASC -->

| File                                 | Subtitle                                  | Folder |
| ------------------------------------ | ----------------------------------------- | ------ |
| [[Code tester]] | Trying out some markdown and code changes | meta   |
| [[index.md\|index]]                  | info dump website                         |        |
<!-- SerializedQuery END -->
