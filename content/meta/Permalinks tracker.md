---
date created: 2024-08-26T00:45
date modified: 2025-08-27T17:11
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
WHERE typeof(permalink) = "string" 
AND draft != "true"
AND !contains(file.frontmatter, "passphrase") 
AND !contains(file.frontmatter, "password")
SORT file.name ASC
```

<!-- QueryToSerialize: TABLE permalink as "Permalink", file.folder as "Folder" WHERE typeof(permalink) = "string"  AND draft != "true" AND !contains(file.frontmatter, "passphrase")  AND !contains(file.frontmatter, "password") SORT file.name ASC -->
<!-- SerializedQuery: TABLE permalink as "Permalink", file.folder as "Folder" WHERE typeof(permalink) = "string"  AND draft != "true" AND !contains(file.frontmatter, "passphrase")  AND !contains(file.frontmatter, "password") SORT file.name ASC -->

| File                                                                                                                           | Permalink         | Folder   |
| ------------------------------------------------------------------------------------------------------------------------------ | ----------------- | -------- |
| [[meta/abc js plugin(ish).md\|abc js plugin(ish)]]                                                                             | perma/4469213     | meta     |
| [[tbd/ACTUAL guide to a now playing widget.md\|ACTUAL guide to a now playing widget]]                                          | perma/7447693     | tbd      |
| [[thoughts/Avoiding getting doxxed.md\|Avoiding getting doxxed]]                                                               | perma/9266641     | thoughts |
| [[meta/Code tester.md\|Code tester]]                                                                                           | perma/code-tester | meta     |
| [[thoughts/Disclaimers, License, Legalese.md\|Disclaimers, License, Legalese]]                                                 | perma/2328577     | thoughts |
| [[meta/Hiding tags from various components.md\|Hiding tags from various components]]                                           | perma/7794692     | meta     |
| [[meta/Password on Quartz via client encryption with Staticrypt.md\|Password on Quartz via client encryption with Staticrypt]] | perma/5910204     | meta     |
| [[meta/Permalinks tracker.md\|Permalinks tracker]]                                                                             | perma             | meta     |
| [[hobbies/To plan a fish tank.md\|To plan a fish tank]]                                                                        | perma/2948303     | hobbies  |
<!-- SerializedQuery END -->
