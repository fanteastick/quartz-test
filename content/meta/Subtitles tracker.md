---
date created: 2024-08-26T23:23
date modified: 2025-10-19T22:57
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

| File                                                                                                                   | Subtitle                                                     | Folder                     |
| ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | -------------------------- |
| [[web/A bunch of kaomoji.md\|A bunch of kaomoji]]                                                                      | and their mom                                                | web                        |
| [[tbd/ACTUAL guide to a now playing widget.md\|ACTUAL guide to a now playing widget]]                                  | songs as a status message                                    | tbd                        |
| [[thoughts/Avoiding getting doxxed.md\|Avoiding getting doxxed]]                                                       | i'm the most paranoid person i know                          | thoughts                   |
| [[tbd/Bases.md\|Bases]]                                                                                                | based on what?                                               | tbd                        |
| [[tbd/Bookbinder usage.md\|Bookbinder usage]]                                                                          | I hate to impose, but...                                     | tbd                        |
| [[meta/Code tester.md\|Code tester]]                                                                                   | Trying out some markdown and code changes                    | meta                       |
| [[hobbies/cool things online/Defeating Nondeterminism in LLM Inference.md\|Defeating Nondeterminism in LLM Inference]] | This blog post was literally all over my twitter feed        | hobbies/cool things online |
| [[tbd/Dockerize anything.md\|Dockerize anything]]                                                                      | takes forever...                                             | tbd                        |
| [[chips/Electronics wizards.md\|Electronics wizards]]                                                                  | there's a whole other world out there                        | chips                      |
| [[chips/Every type of flip flop.md\|Every type of flip flop]]                                                          | 👟 but shoes? shoes, i know                                  | chips                      |
| [[chips/FPGA magic.md\|FPGA magic]]                                                                                    | field programmable gate arrays                               | chips                      |
| [[linux/Fumbling around a new server.md\|Fumbling around a new server]]                                                | the server room is very warm and loud                        | linux                      |
| [[thoughts/How to cram for the GRE (2023).md\|How to cram for the GRE (2023)]]                                         | the pros n cons of standardized testing                      | thoughts                   |
| [[linux/Ideas for what one can do with a home server.md\|Ideas for what one can do with a home server]]                | and now, they can collect dust in my home instead            | linux                      |
| [[tbd/Immich setup.md\|Immich setup]]                                                                                  | we have google photos at home                                | tbd                        |
| [[index.md\|index]]                                                                                                    | info dump website                                            |                            |
| [[tbd/Making a zine.md\|Making a zine]]                                                                                | everyone and their mom has made one                          | tbd                        |
| [[tbd/Mind workouts.md\|Mind workouts]]                                                                                | puzzling, I know                                             | tbd                        |
| [[linux/Minecraft server resources.md\|Minecraft server resources]]                                                    | i don't even like gaming, anyway                             | linux                      |
| [[Misc Tutorials.md\|Misc Tutorials]]                                                                                  | for FREE?!                                                   |                            |
| [[linux/New server setup.md\|New server setup]]                                                                        | cold, calculated, precise.                                   | linux                      |
| [[hobbies/book club/Okay, I'll read HPMOR.md\|Okay, I'll read HPMOR]]                                                  | mostly an excuse to try out the new quartz citations feature | hobbies/book club          |
| [[thoughts/Online presence and identity.md\|Online presence and identity]]                                             | what it would take for me to become an influencer            | thoughts                   |
| [[hobbies/OSINT.md\|OSINT]]                                                                                            | stayin' anonymous online                                     | hobbies                    |
| [[thoughts/Party-worthy occasions.md\|Party-worthy occasions]]                                                         | time for a rager!                                            | thoughts                   |
| [[hobbies/Rawtherapee.md\|Rawtherapee]]                                                                                | hehe 💦                                                      | hobbies                    |
| [[chips/Robotics Resources.md\|Robotics Resources]]                                                                    | How far down will you go?                                    | chips                      |
| [[thoughts/Shopping Accounts.md\|Shopping Accounts]]                                                                   | thinly veiled effort to harvest your data                    | thoughts                   |
| [[hobbies/Stall bars.md\|Stall bars]]                                                                                  | aka swedish bars                                             | hobbies                    |
| [[hobbies/Tailoring and Sewing.md\|Tailoring and Sewing]]                                                              | I wish this was a hobby                                      | hobbies                    |
| [[hobbies/To plan a fish tank.md\|To plan a fish tank]]                                                                | Fish for beginners!                                          | hobbies                    |
| [[chips/Various areas or fields or categories or.md\|Various areas or fields or categories or]]                        | a whole new world                                            | chips                      |
| [[hobbies/Zelda BOTW.md\|Zelda BOTW]]                                                                                  | breath of the wild                                           | hobbies                    |
<!-- SerializedQuery END -->
