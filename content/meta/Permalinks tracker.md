---
date created: 2024-08-26T00:45
date modified: 2024-08-27T01:19
tags:
  - backlinks-exclude
  - recents-exclude
  - tracker
  - graph-exclude
permalink: perma
---

The query

```
TABLE permalink as "Permalink", file.folder as "Folder"
WHERE typeof(permalink) = "string" AND draft != "true"
SORT file.name ASC
```

<!-- QueryToSerialize: TABLE permalink as "Permalink", file.folder as "Folder" WHERE typeof(permalink) = "string" AND draft != "true" SORT file.name ASC -->
<!-- SerializedQuery: TABLE permalink as "Permalink", file.folder as "Folder" WHERE typeof(permalink) = "string" AND draft != "true" SORT file.name ASC -->

| File                                                             | Permalink         | Folder   |
| ---------------------------------------------------------------- | ----------------- | -------- |
| [[Avoiding getting doxxed]] | perma/9266641     | thoughts |
| [[Code tester]]                             | perma/code-tester | meta     |
| [[Permalinks tracker]]               | perma             | meta     |
<!-- SerializedQuery END -->
