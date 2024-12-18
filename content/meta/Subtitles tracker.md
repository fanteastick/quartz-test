---
date created: 2024-08-26T23:23
date modified: 2024-11-29T00:51
tags:
  - graph-exclude
  - recents-exclude
  - backlinks-exclude
  - tracker
---

The query

```
TABLE subtitle as "Subtitle", file.folder as "Folder"
WHERE subtitle != null AND draft != "true"
SORT file.name ASC
```

Also, make sure the subtitle property type is a string, not a list. 

<!-- QueryToSerialize: TABLE subtitle as "Subtitle", file.folder as "Folder" WHERE subtitle != null AND draft != "true" SORT file.name ASC -->
<!-- SerializedQuery: TABLE subtitle as "Subtitle", file.folder as "Folder" WHERE subtitle != null AND draft != "true" SORT file.name ASC -->

| File                                                                                                               | Subtitle                                  | Folder                   |
| ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- | ------------------------ |
| [[Code tester]]                                                                               | Trying out some markdown and code changes | meta                     |
| [[Every type of flip flop]]                                   | 👟 but shoes? shoes, i know               | semiconductors and chips |
| [[index.md\|index]]                                                                                                | info dump website                         |                          |
| [[OSINT]]                                                                                        | stayin' anonymous online                  | hobbies                  |
| [[Reading list]]                                                                        | i'm "planning" to "read" some "books"     | book club                |
| [[To plan a fish tank]]                                                            | Fish for beginners!                       | hobbies                  |
| [[Various areas or fields or categories or]] | a whole new world                         | semiconductors and chips |
<!-- SerializedQuery END -->

