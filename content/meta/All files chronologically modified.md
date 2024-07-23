---
date created: 2024-07-20T22:16
date modified: 2024-07-21T00:04
tags:
  - explorer-exclude
  - graph-exclude
  - backlinks-exclude
  - recents-exclude
title: All files chronologically modified
---

Table below made with the help of [Dataview](https://blacksmithgu.github.io/obsidian-dataview/) and [Obsidian Dataview Serializer](https://github.com/dsebastien/obsidian-dataview-serializer). The query:

```
TABLE 
file.folder as "Folder", dateformat(date-modified,"MMM d, yyyy") as "Modified" 
FROM "" AND -#draft 
SORT date-modified DESC 
WHERE file.name != this.file.name AND draft != true
```

Fun fact - if I set it up correctly, this page won't show up in Explorer, Graph, RecentNotes, TagList, or Backlinks! Also the folders view and the tags view. But it *will* show up in search, and also linked to the RecentNotes in the homepage. 

Some hidden tags: anything with "exclude" basically

 #graph-exclude #backlinks-exclude #recents-exclude #explorer-exclude

[[index|🏡 Return to Homepage]]

<!-- QueryToSerialize: TABLE file.folder as "Folder", dateformat(date-modified,"MMM d, yyyy") as "Modified" FROM "" AND -#draft SORT date-modified DESC WHERE file.name != this.file.name  AND draft != "true" -->
<!-- SerializedQuery: TABLE file.folder as "Folder", dateformat(date-modified,"MMM d, yyyy") as "Modified" FROM "" AND -#draft SORT date-modified DESC WHERE file.name != this.file.name  AND draft != "true" -->

| File                                                                                                                                           | Folder                   | Modified     |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ------------ |
| [[Quartz customization log.md\|Quartz customization log]]                                                                                      |                          | Jul 23, 2024 |
| [[Hiding tags from various components.md\|Hiding tags from various components]]                                                                |                          | Jul 23, 2024 |
| [[Quartz Cheatsheet.md\|Quartz Cheatsheet]]                                                                                                    |                          | Jul 23, 2024 |
| [[Cool other websites.md\|Cool other websites]]                                                                                                |                          | Jul 23, 2024 |
| [[Quartz Snippets.md\|Quartz Snippets]]                                                                                                        |                          | Jul 23, 2024 |
| [[tbd/Dataview reference.md\|Dataview reference]]                                                                                              | tbd                      | Jul 23, 2024 |
| [[tbd/GitHub secrets.md\|GitHub secrets]]                                                                                                      | tbd                      | Jul 21, 2024 |
| [[tbd/Cloning a repo at a specific commit.md\|Cloning a repo at a specific commit]]                                                            | tbd                      | Jul 19, 2024 |
| [[meta/How to test and run each site.md\|How to test and run each site]]                                                                       | meta                     | Jul 18, 2024 |
| [[rgb tech/Installing yarn.md\|Installing yarn]]                                                                                               | rgb tech                 | Jul 11, 2024 |
| [[tbd/Old sites.md\|Old sites]]                                                                                                                | tbd                      | Jul 11, 2024 |
| [[index.md\|index]]                                                                                                                            |                          | Jul 11, 2024 |
| [[rgb tech/index.md\|index]]                                                                                                                   | rgb tech                 | Jul 9, 2024  |
| [[Infinite boredom.md\|Infinite boredom]]                                                                                                      |                          | Jul 9, 2024  |
| [[tbd/blog ideas.md\|blog ideas]]                                                                                                              | tbd                      | Jul 9, 2024  |
| [[book club/index.md\|index]]                                                                                                                  | book club                | Jul 9, 2024  |
| [[rgb tech/How do virtual environments compare to conda environments.md\|How do virtual environments compare to conda environments]]           | rgb tech                 | Jul 9, 2024  |
| [[rgb tech/Setting up conda anaconda.md\|Setting up conda anaconda]]                                                                           | rgb tech                 | Jul 5, 2024  |
| [[rgb tech/Things to reinstall after a hard reset of the laptop.md\|Things to reinstall after a hard reset of the laptop]]                     | rgb tech                 | Jul 4, 2024  |
| [[rgb tech/Setting up Github.md\|Setting up Github]]                                                                                           | rgb tech                 | Jun 25, 2024 |
| [[rgb tech/Setting up WSL.md\|Setting up WSL]]                                                                                                 | rgb tech                 | Jun 25, 2024 |
| [[semiconductors and chips/SMBus, the Smart battery system, and more.md\|SMBus, the Smart battery system, and more]]                           | semiconductors and chips | Jun 25, 2024 |
| [[book club/House of Leaves 🍂.md\|House of Leaves 🍂]]                                                                                        | book club                | Jun 25, 2024 |
| [[tbd/Obsidian Plugin Wishlist.md\|Obsidian Plugin Wishlist]]                                                                                  | tbd                      | Jun 25, 2024 |
| [[semiconductors and chips/index.md\|index]]                                                                                                   | semiconductors and chips | Jun 25, 2024 |
| [[mac tech/Mac setup notes.md\|Mac setup notes]]                                                                                               | mac tech                 | Jun 8, 2024  |
| [[tbd/Misc trip planning tips.md\|Misc trip planning tips]]                                                                                    | tbd                      | Jun 8, 2024  |
| [[semiconductors and chips/BIST - built-in self test.md\|BIST - built-in self test]]                                                           | semiconductors and chips | Jun 8, 2024  |
| [[mac tech/adguard home.md\|adguard home]]                                                                                                     | mac tech                 | Jun 8, 2024  |
| [[mac tech/colima.md\|colima]]                                                                                                                 | mac tech                 | Jun 7, 2024  |
| [[mac tech/change origin of your git repo.md\|change origin of your git repo]]                                                                 | mac tech                 | Jun 7, 2024  |
| [[mac tech/index.md\|index]]                                                                                                                   | mac tech                 | Jun 7, 2024  |
| [[rgb tech/Setting up a second computer to contribute to the quartz thing.md\|Setting up a second computer to contribute to the quartz thing]] | rgb tech                 | May 9, 2024  |
| [[rgb tech/Command for the type of shell.md\|Command for the type of shell]]                                                                   | rgb tech                 | May 9, 2024  |
| [[mac tech/create cname for subdomain.md\|create cname for subdomain]]                                                                         | mac tech                 | May 9, 2024  |
<!-- SerializedQuery END -->
