---
date created: 2024-08-26T23:23
date modified: 2025-08-27T17:11
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
AND !contains(file.frontmatter, "passphrase") 
AND !contains(file.frontmatter, "password")
SORT file.name ASC
```

Also, make sure the subtitle property type is a string, not a list. 

<!-- QueryToSerialize: TABLE subtitle as "Subtitle", file.folder as "Folder" WHERE subtitle != null AND draft != "true" AND !contains(file.frontmatter, "passphrase") AND !contains(file.frontmatter, "password") SORT file.name ASC -->
<!-- SerializedQuery: TABLE subtitle as "Subtitle", file.folder as "Folder" WHERE subtitle != null AND draft != "true" AND !contains(file.frontmatter, "passphrase") AND !contains(file.frontmatter, "password") SORT file.name ASC -->

| File                                                                                                    | Subtitle                                                     | Folder            |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ----------------- |
| [[tbd/A bunch of kaomoji.md\|A bunch of kaomoji]]                                                       | and their mom                                                | tbd               |
| [[tbd/ACTUAL guide to a now playing widget.md\|ACTUAL guide to a now playing widget]]                   | songs as a status message                                    | tbd               |
| [[thoughts/Avoiding getting doxxed.md\|Avoiding getting doxxed]]                                        | i'm the most paranoid person i know                          | thoughts          |
| [[tbd/Bases.md\|Bases]]                                                                                 | based on what?                                               | tbd               |
| [[tbd/Bookbinder usage.md\|Bookbinder usage]]                                                           | I hate to impose, but...                                     | tbd               |
| [[meta/Code tester.md\|Code tester]]                                                                    | Trying out some markdown and code changes                    | meta              |
| [[chips/Every type of flip flop.md\|Every type of flip flop]]                                           | 👟 but shoes? shoes, i know                                  | chips             |
| [[thoughts/How to cram for the GRE (2023).md\|How to cram for the GRE (2023)]]                          | the pros n cons of standardized testing                      | thoughts          |
| [[linux/Ideas for what one can do with a home server.md\|Ideas for what one can do with a home server]] | and now, they can collect dust in my home instead            | linux             |
| [[tbd/Immich setup.md\|Immich setup]]                                                                   | we have google photos at home                                | tbd               |
| [[index.md\|index]]                                                                                     | info dump website                                            |                   |
| [[tbd/Making a zine.md\|Making a zine]]                                                                 | everyone and their mom has made one                          | tbd               |
| [[tbd/Minecraft server resources.md\|Minecraft server resources]]                                       | i don't even like gaming, anyway                             | tbd               |
| [[tbd/New server! Wahoo!.md\|New server! Wahoo!]]                                                       | the server room is very warm and loud                        | tbd               |
| [[hobbies/book club/Okay, I'll read HPMOR.md\|Okay, I'll read HPMOR]]                                   | mostly an excuse to try out the new quartz citations feature | hobbies/book club |
| [[thoughts/Online presence and identity.md\|Online presence and identity]]                              | what it would take for me to become an influencer            | thoughts          |
| [[hobbies/OSINT.md\|OSINT]]                                                                             | stayin' anonymous online                                     | hobbies           |
| [[hobbies/Rawtherapee.md\|Rawtherapee]]                                                                 | hehe 💦                                                      | hobbies           |
| [[thoughts/Shopping Accounts.md\|Shopping Accounts]]                                                    | thinly veiled effort to harvest your data                    | thoughts          |
| [[hobbies/To plan a fish tank.md\|To plan a fish tank]]                                                 | Fish for beginners!                                          | hobbies           |
| [[chips/Various areas or fields or categories or.md\|Various areas or fields or categories or]]         | a whole new world                                            | chips             |
| [[hobbies/Zelda BOTW.md\|Zelda BOTW]]                                                                   | breath of the wild                                           | hobbies           |
<!-- SerializedQuery END -->
