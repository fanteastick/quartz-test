---
tags:
  - explorer-exclude
  - graph-exclude
  - backlinks-exclude
  - recents-exclude
  - "#tracker"
title: All files chronologically modified
date created: 2024-07-20T22:16
date modified: 2025-08-27T22:06
---

Table below made with the help of [Dataview](https://blacksmithgu.github.io/obsidian-dataview/) and [Obsidian Dataview Serializer](https://github.com/dsebastien/obsidian-dataview-serializer). The query:

```
TABLE 
file.folder as "Folder", dateformat(date-modified,"MMM d, yyyy") as "Modified" 
FROM -"tags" AND -#slurp
SORT date-modified DESC 
WHERE file.name != this.file.name AND file.name != "index" AND draft != "true"
```

Fun fact - if I set it up correctly, this page won't show up in Explorer, Graph, RecentNotes, TagList, or Backlinks! Also the folders view and the tags view. The changes are explained [[Hiding tags from various components|here]]. But it *will* show up in search, and also linked to "view more" on the RecentNotes component. If on mobile, the table looks cramped - sorry! To force an update, Command Palette --> Dataview serializer scan and serialize all dataview queries; also I added a Commander button.

Some hidden tags: anything with "exclude" basically

 #graph-exclude #backlinks-exclude #recents-exclude #explorer-exclude

[[index|🏡 Return to Homepage]]

### The table

%% note to self it's finicky with spaces so i was having some trouble but turns out it's bc i had an extra space at the end %%

<!-- QueryToSerialize: TABLE file.folder as "Folder", dateformat(date-modified,"MMM d, yyyy") as "Modified" FROM -"tags" AND -#slurp SORT date-modified DESC WHERE file.name != this.file.name AND file.name != "index" AND draft != "true" -->
<!-- SerializedQuery: TABLE file.folder as "Folder", dateformat(date-modified,"MMM d, yyyy") as "Modified" FROM -"tags" AND -#slurp SORT date-modified DESC WHERE file.name != this.file.name AND file.name != "index" AND draft != "true" -->

| File                                                                                                                                      | Folder                     | Modified     |
| ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ------------ |
| [[meta/Code tester.md\|Code tester]]                                                                                                      | meta                       | Aug 28, 2025 |
| [[Tutorials.md\|Tutorials]]                                                                                                               |                            | Aug 28, 2025 |
| [[tbd/Git mirrors.md\|Git mirrors]]                                                                                                       | tbd                        | Aug 28, 2025 |
| [[Cool other websites.md\|Cool other websites]]                                                                                           |                            | Aug 28, 2025 |
| [[Quartz Snippets.md\|Quartz Snippets]]                                                                                                   |                            | Aug 28, 2025 |
| [[hobbies/Crochet guides.md\|Crochet guides]]                                                                                             | hobbies                    | Aug 28, 2025 |
| [[rgb/Password encrypted file.md\|Password encrypted file]]                                                                               | rgb                        | Aug 28, 2025 |
| [[hobbies/cool things online/PySkyWiFi - Robert Heaton.md\|PySkyWiFi - Robert Heaton]]                                                    | hobbies/cool things online | Aug 28, 2025 |
| [[tbd/Kanban board dump.md\|Kanban board dump]]                                                                                           | tbd                        | Aug 27, 2025 |
| [[hobbies/Crocheting.md\|Crocheting]]                                                                                                     | hobbies                    | Aug 27, 2025 |
| [[meta/Subtitles tracker.md\|Subtitles tracker]]                                                                                          | meta                       | Aug 27, 2025 |
| [[meta/Permalinks tracker.md\|Permalinks tracker]]                                                                                        | meta                       | Aug 27, 2025 |
| [[linux/Wake on Lan.md\|Wake on Lan]]                                                                                                     | linux                      | Aug 27, 2025 |
| [[linux/Home networking concepts learned through Pi.md\|Home networking concepts learned through Pi]]                                     | linux                      | Aug 27, 2025 |
| [[tbd/Bases.md\|Bases]]                                                                                                                   | tbd                        | Aug 27, 2025 |
| [[rgb/Parsec.md\|Parsec]]                                                                                                                 | rgb                        | Aug 27, 2025 |
| [[tbd/Tailscale serve.md\|Tailscale serve]]                                                                                               | tbd                        | Aug 26, 2025 |
| [[rgb/Enable hibernate in Windows 11.md\|Enable hibernate in Windows 11]]                                                                 | rgb                        | Aug 25, 2025 |
| [[thoughts/Disclaimers, License, Legalese.md\|Disclaimers, License, Legalese]]                                                            | thoughts                   | Aug 14, 2025 |
| [[thoughts/Not Financial Advice.md\|Not Financial Advice]]                                                                                | thoughts                   | Aug 13, 2025 |
| [[tbd/Useful punctuation.md\|Useful punctuation]]                                                                                         | tbd                        | Aug 11, 2025 |
| [[thoughts/Shopping Accounts.md\|Shopping Accounts]]                                                                                      | thoughts                   | Aug 11, 2025 |
| [[tbd/mkcert.md\|mkcert]]                                                                                                                 | tbd                        | Aug 5, 2025  |
| [[Goals and progress in 2025.md\|Goals and progress in 2025]]                                                                             |                            | Jul 31, 2025 |
| [[hobbies/Battle of Koeshin.md\|Battle of Koeshin]]                                                                                       | hobbies                    | Jul 30, 2025 |
| [[hobbies/Zelda BOTW.md\|Zelda BOTW]]                                                                                                     | hobbies                    | Jul 30, 2025 |
| [[hobbies/book club/My Year of Rest and Relaxation.md\|My Year of Rest and Relaxation]]                                                   | hobbies/book club          | Jul 30, 2025 |
| [[hobbies/book club/The Bandit Queens.md\|The Bandit Queens]]                                                                             | hobbies/book club          | Jul 30, 2025 |
| [[tbd/Email through a custom domain.md\|Email through a custom domain]]                                                                   | tbd                        | Jul 30, 2025 |
| [[chips/GPUs/Comparing GPUs.md\|Comparing GPUs]]                                                                                          | chips/GPUs                 | Jul 30, 2025 |
| [[thoughts/Real or AI.md\|Real or AI]]                                                                                                    | thoughts                   | Jul 30, 2025 |
| [[Quartz Cheatsheet.md\|Quartz Cheatsheet]]                                                                                               |                            | Jul 30, 2025 |
| [[linux/About rsync.md\|About rsync]]                                                                                                     | linux                      | Jul 30, 2025 |
| [[hobbies/Pokemon Scarlet.md\|Pokemon Scarlet]]                                                                                           | hobbies                    | Jul 29, 2025 |
| [[hobbies/Super Mario Bros Wonder.md\|Super Mario Bros Wonder]]                                                                           | hobbies                    | Jul 29, 2025 |
| [[tbd/Webrings.md\|Webrings]]                                                                                                             | tbd                        | Jul 29, 2025 |
| [[tbd/Twitter engagement farming.md\|Twitter engagement farming]]                                                                         | tbd                        | Jul 29, 2025 |
| [[rgb/AutoHotkey widget.md\|AutoHotkey widget]]                                                                                           | rgb                        | Jul 18, 2025 |
| [[rgb/Uninstalling OneDrive.md\|Uninstalling OneDrive]]                                                                                   | rgb                        | Jul 18, 2025 |
| [[linux/Samba and Tailscale.md\|Samba and Tailscale]]                                                                                     | linux                      | Jul 15, 2025 |
| [[rgb/Setting up Github.md\|Setting up Github]]                                                                                           | rgb                        | Jul 14, 2025 |
| [[hobbies/darktable.md\|darktable]]                                                                                                       | hobbies                    | Jul 11, 2025 |
| [[hobbies/Canon 5D mk iii.md\|Canon 5D mk iii]]                                                                                           | hobbies                    | Jul 11, 2025 |
| [[linux/Ideas for what one can do with a home server.md\|Ideas for what one can do with a home server]]                                   | linux                      | Jul 7, 2025  |
| [[thoughts/Good habits around electronics.md\|Good habits around electronics]]                                                            | thoughts                   | Jul 7, 2025  |
| [[tbd/Bookbinder usage.md\|Bookbinder usage]]                                                                                             | tbd                        | Jul 7, 2025  |
| [[Quartz customization log.md\|Quartz customization log]]                                                                                 |                            | Jul 3, 2025  |
| [[linux/Docker and Portainer FAQs.md\|Docker and Portainer FAQs]]                                                                         | linux                      | Jul 2, 2025  |
| [[thoughts/Online presence and identity.md\|Online presence and identity]]                                                                | thoughts                   | Jun 25, 2025 |
| [[hobbies/OSINT.md\|OSINT]]                                                                                                               | hobbies                    | Jun 16, 2025 |
| [[thoughts/What it would take for me to be an influencer.md\|What it would take for me to be an influencer]]                              | thoughts                   | Jun 5, 2025  |
| [[hobbies/Squad Busters by Supercell.md\|Squad Busters by Supercell]]                                                                     | hobbies                    | Jun 4, 2025  |
| [[tbd/Important skills in an ai-era of the internet.md\|Important skills in an ai-era of the internet]]                                   | tbd                        | Jun 3, 2025  |
| [[linux/Pi add swap space.md\|Pi add swap space]]                                                                                         | linux                      | May 8, 2025  |
| [[tbd/Minecraft mega docker image.md\|Minecraft mega docker image]]                                                                       | tbd                        | May 3, 2025  |
| [[tbd/Immich setup.md\|Immich setup]]                                                                                                     | tbd                        | May 2, 2025  |
| [[meta/Quartz customization graveyard.md\|Quartz customization graveyard]]                                                                | meta                       | May 1, 2025  |
| [[hobbies/book club/Okay, I'll read HPMOR.md\|Okay, I'll read HPMOR]]                                                                     | hobbies/book club          | May 1, 2025  |
| [[linux/VPS ufw config.md\|VPS ufw config]]                                                                                               | linux                      | May 1, 2025  |
| [[tbd/New server! Wahoo!.md\|New server! Wahoo!]]                                                                                         | tbd                        | May 1, 2025  |
| [[tbd/Isso link dump.md\|Isso link dump]]                                                                                                 | tbd                        | May 1, 2025  |
| [[linux/Ssh keygen stuff.md\|Ssh keygen stuff]]                                                                                           | linux                      | Apr 30, 2025 |
| [[linux/IPtables and such for exposed docker ports.md\|IPtables and such for exposed docker ports]]                                       | linux                      | Apr 30, 2025 |
| [[Uses.md\|Uses]]                                                                                                                         |                            | Apr 28, 2025 |
| [[tbd/nginx workflow.md\|nginx workflow]]                                                                                                 | tbd                        | Apr 24, 2025 |
| [[linux/bore pub as a service server.md\|bore pub as a service server]]                                                                   | linux                      | Apr 23, 2025 |
| [[thoughts/how I use GPTs.md\|how I use GPTs]]                                                                                            | thoughts                   | Apr 23, 2025 |
| [[linux/bore.pub + letsencrypt + cloudflare.md\|bore.pub + letsencrypt + cloudflare]]                                                     | linux                      | Apr 22, 2025 |
| [[tbd/Making a zine.md\|Making a zine]]                                                                                                   | tbd                        | Apr 22, 2025 |
| [[hobbies/Civilization 6.md\|Civilization 6]]                                                                                             | hobbies                    | Apr 21, 2025 |
| [[linux/How racknerd recommends installing docker and compose.md\|How racknerd recommends installing docker and compose]]                 | linux                      | Apr 21, 2025 |
| [[hobbies/cool things online/Terms of Service - RackNerd.md\|Terms of Service - RackNerd]]                                                | hobbies/cool things online | Apr 20, 2025 |
| [[tbd/Minecraft server resources.md\|Minecraft server resources]]                                                                         | tbd                        | Apr 19, 2025 |
| [[thoughts/The philosophy for writing things down.md\|The philosophy for writing things down]]                                            | thoughts                   | Apr 19, 2025 |
| [[linux/Self-hosting on a Pi.md\|Self-hosting on a Pi]]                                                                                   | linux                      | Apr 16, 2025 |
| [[linux/If you have two dockers on your server.md\|If you have two dockers on your server]]                                               | linux                      | Apr 16, 2025 |
| [[chips/GPUs/Ideas for what one could do with a nice GPU.md\|Ideas for what one could do with a nice GPU]]                                | chips/GPUs                 | Apr 12, 2025 |
| [[hobbies/fishes/Fish homepage.md\|Fish homepage]]                                                                                        | hobbies/fishes             | Apr 9, 2025  |
| [[linux/Cloudflare tunnels with Docker.md\|Cloudflare tunnels with Docker]]                                                               | linux                      | Apr 8, 2025  |
| [[hobbies/They put that poker game in League of Legends!.md\|They put that poker game in League of Legends!]]                             | hobbies                    | Apr 8, 2025  |
| [[meta/list cards proof of concept.md\|list cards proof of concept]]                                                                      | meta                       | Apr 4, 2025  |
| [[hobbies/fishes/guppies.md\|guppies]]                                                                                                    | hobbies/fishes             | Apr 4, 2025  |
| [[hobbies/fishes/dwarf pufferfish.md\|dwarf pufferfish]]                                                                                  | hobbies/fishes             | Apr 4, 2025  |
| [[tbd/Filters to put on your images so that AI can't gen-ai them.md\|Filters to put on your images so that AI can't gen-ai them]]         | tbd                        | Apr 4, 2025  |
| [[hobbies/Rawtherapee.md\|Rawtherapee]]                                                                                                   | hobbies                    | Apr 2, 2025  |
| [[linux/Cloudflare.md\|Cloudflare]]                                                                                                       | linux                      | Mar 26, 2025 |
| [[linux/Setting up SSH the way I wanted.md\|Setting up SSH the way I wanted]]                                                             | linux                      | Mar 23, 2025 |
| [[hobbies/Civilization 7.md\|Civilization 7]]                                                                                             | hobbies                    | Mar 20, 2025 |
| [[hobbies/Civ notepad mod brainstorm.md\|Civ notepad mod brainstorm]]                                                                     | hobbies                    | Mar 20, 2025 |
| [[meta/Hiding tags from various components.md\|Hiding tags from various components]]                                                      | meta                       | Mar 20, 2025 |
| [[hobbies/Genshin Impact by miHoYo.md\|Genshin Impact by miHoYo]]                                                                         | hobbies                    | Mar 19, 2025 |
| [[meta/Upgrading to quartz 4.5.md\|Upgrading to quartz 4.5]]                                                                              | meta                       | Mar 18, 2025 |
| [[meta/passphrase encrypted page.md\|passphrase encrypted page]]                                                                          | meta                       | Mar 18, 2025 |
| [[tbd/ACTUAL guide to a now playing widget.md\|ACTUAL guide to a now playing widget]]                                                     | tbd                        | Mar 18, 2025 |
| [[linux/My first ever raspberry pi!!!.md\|My first ever raspberry pi!!!]]                                                                 | linux                      | Mar 18, 2025 |
| [[meta/Dataview reference.md\|Dataview reference]]                                                                                        | meta                       | Mar 13, 2025 |
| [[meta/password locked page.md\|password locked page]]                                                                                    | meta                       | Mar 6, 2025  |
| [[hobbies/cool things online/Other digital garden platforms.md\|Other digital garden platforms]]                                          | hobbies/cool things online | Mar 6, 2025  |
| [[thoughts/blog ideas.md\|blog ideas]]                                                                                                    | thoughts                   | Feb 28, 2025 |
| [[meta/Image sources and attributions.md\|Image sources and attributions]]                                                                | meta                       | Feb 28, 2025 |
| [[meta/How to work on each site.md\|How to work on each site]]                                                                            | meta                       | Feb 27, 2025 |
| [[thoughts/Misc trip planning tips.md\|Misc trip planning tips]]                                                                          | thoughts                   | Feb 27, 2025 |
| [[thoughts/How to get over a social media addiction.md\|How to get over a social media addiction]]                                        | thoughts                   | Feb 26, 2025 |
| [[meta/abc js plugin(ish).md\|abc js plugin(ish)]]                                                                                        | meta                       | Feb 26, 2025 |
| [[tbd/Jupyter Repl.md\|Jupyter Repl]]                                                                                                     | tbd                        | Feb 26, 2025 |
| [[rgb/How to squash a bunch of commits in git.md\|How to squash a bunch of commits in git]]                                               | rgb                        | Feb 21, 2025 |
| [[meta/Password on Quartz via client encryption with Staticrypt.md\|Password on Quartz via client encryption with Staticrypt]]            | meta                       | Feb 21, 2025 |
| [[chips/Every type of flip flop.md\|Every type of flip flop]]                                                                             | chips                      | Feb 7, 2025  |
| [[rgb/Pile the journaling app.md\|Pile the journaling app]]                                                                               | rgb                        | Feb 6, 2025  |
| [[meta/Obsidian plugin list.md\|Obsidian plugin list]]                                                                                    | meta                       | Feb 6, 2025  |
| [[tbd/A bunch of kaomoji.md\|A bunch of kaomoji]]                                                                                         | tbd                        | Feb 6, 2025  |
| [[meta/GoatCounter analytics.md\|GoatCounter analytics]]                                                                                  | meta                       | Feb 5, 2025  |
| [[tbd/GitHub secrets.md\|GitHub secrets]]                                                                                                 | tbd                        | Feb 5, 2025  |
| [[meta/About robots.txt and crawlers.md\|About robots.txt and crawlers]]                                                                  | meta                       | Feb 4, 2025  |
| [[meta/Map.md\|Map]]                                                                                                                      | meta                       | Feb 4, 2025  |
| [[meta/Making a separate private quartz blog.md\|Making a separate private quartz blog]]                                                  | meta                       | Feb 2, 2025  |
| [[mac/change origin of your git repo.md\|change origin of your git repo]]                                                                 | mac                        | Feb 2, 2025  |
| [[tbd/Untrack something that used to be tracked in git.md\|Untrack something that used to be tracked in git]]                             | tbd                        | Feb 2, 2025  |
| [[chips/Various areas or fields or categories or.md\|Various areas or fields or categories or]]                                           | chips                      | Jan 18, 2025 |
| [[meta/Upgrading to quartz 4.4.md\|Upgrading to quartz 4.4]]                                                                              | meta                       | Jan 18, 2025 |
| [[thoughts/How to cram for the GRE (2023).md\|How to cram for the GRE (2023)]]                                                            | thoughts                   | Jan 16, 2025 |
| [[rgb/Installing yarn.md\|Installing yarn]]                                                                                               | rgb                        | Jan 5, 2025  |
| [[thoughts/Avoiding getting doxxed.md\|Avoiding getting doxxed]]                                                                          | thoughts                   | Jan 3, 2025  |
| [[rgb/Custom domains.md\|Custom domains]]                                                                                                 | rgb                        | Jan 3, 2025  |
| [[mac/Mac setup notes.md\|Mac setup notes]]                                                                                               | mac                        | Jan 2, 2025  |
| [[mac/create cname for subdomain.md\|create cname for subdomain]]                                                                         | mac                        | Jan 2, 2025  |
| [[mac/colima.md\|colima]]                                                                                                                 | mac                        | Jan 2, 2025  |
| [[thoughts/Reasons why I do not like OneNote (2020-2021).md\|Reasons why I do not like OneNote (2020-2021)]]                              | thoughts                   | Dec 17, 2024 |
| [[thoughts/Log - how 2024 went.md\|Log - how 2024 went]]                                                                                  | thoughts                   | Dec 17, 2024 |
| [[chips/TinyTapeout.md\|TinyTapeout]]                                                                                                     | chips                      | Nov 29, 2024 |
| [[rgb/Command for the type of shell.md\|Command for the type of shell]]                                                                   | rgb                        | Sep 12, 2024 |
| [[hobbies/To plan a fish tank.md\|To plan a fish tank]]                                                                                   | hobbies                    | Sep 4, 2024  |
| [[rgb/Setting up a second computer to contribute to the quartz thing.md\|Setting up a second computer to contribute to the quartz thing]] | rgb                        | Aug 6, 2024  |
| [[rgb/Kicad setup.md\|Kicad setup]]                                                                                                       | rgb                        | Aug 6, 2024  |
| [[chips/SMBus, the Smart battery system, and more.md\|SMBus, the Smart battery system, and more]]                                         | chips                      | Aug 5, 2024  |
| [[rgb/Keepass setup.md\|Keepass setup]]                                                                                                   | rgb                        | Aug 2, 2024  |
| [[tbd/Cloning a repo at a specific commit.md\|Cloning a repo at a specific commit]]                                                       | tbd                        | Aug 1, 2024  |
| [[tbd/Setting up bratify aka Svelte apps.md\|Setting up bratify aka Svelte apps]]                                                         | tbd                        | Jul 23, 2024 |
| [[rgb/How do virtual environments compare to conda environments.md\|How do virtual environments compare to conda environments]]           | rgb                        | Jul 23, 2024 |
| [[rgb/Setting up conda anaconda.md\|Setting up conda anaconda]]                                                                           | rgb                        | Jul 5, 2024  |
| [[rgb/Things to reinstall after a hard reset of the laptop.md\|Things to reinstall after a hard reset of the laptop]]                     | rgb                        | Jul 4, 2024  |
| [[rgb/Setting up WSL.md\|Setting up WSL]]                                                                                                 | rgb                        | Jun 25, 2024 |
| [[hobbies/book club/House of Leaves 🍂.md\|House of Leaves 🍂]]                                                                           | hobbies/book club          | Jun 25, 2024 |
| [[thoughts/Obsidian Plugin Wishlist.md\|Obsidian Plugin Wishlist]]                                                                        | thoughts                   | Jun 25, 2024 |
| [[chips/BIST - built-in self test.md\|BIST - built-in self test]]                                                                         | chips                      | Jun 8, 2024  |
| [[mac/adguard home.md\|adguard home]]                                                                                                     | mac                        | Jun 8, 2024  |
<!-- SerializedQuery END -->

%%
```dataviewjs
// Get all markdown notes, excluding those in "cool things online"
let pages = dv.pages('')
  .where(p => 
    p.file && 
    p.file.ext === "md" && 
    !p.file.path.toLowerCase().includes("cool things online/") && // Exclude folder &&
    !p.file.path.toLowerCase().includes("meta/") && 
    !p.file.path.toLowerCase().includes("quartz")
  );

let notes = [];
for (let page of pages) {
  let content = await app.vault.read(app.vault.getAbstractFileByPath(page.file.path));
  let wordCount = content.split(/\s+/).filter(w => w.length > 0).length;
  notes.push({
    file: page.file,
    wordCount: wordCount
  });
}

notes.sort((a, b) => b.wordCount - a.wordCount);
let top = notes.slice(0, 5);

dv.table(["Note", "Word Count"], top.map(n => [n.file.link, n.wordCount]));
```
%%