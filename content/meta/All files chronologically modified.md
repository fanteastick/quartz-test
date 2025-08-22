---
tags:
  - explorer-exclude
  - graph-exclude
  - backlinks-exclude
  - recents-exclude
title: All files chronologically modified
date created: 2024-07-20T22:16
date modified: 2025-06-05T09:28
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

| File                                                                                                                                           | Folder                     | Modified     |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ------------ |
| [[tbd/Disclaimers, License, Legalese.md\|Disclaimers, License, Legalese]]                                                                      | tbd                        | Aug 14, 2025 |
| [[tbd/Not Financial Advice.md\|Not Financial Advice]]                                                                                          | tbd                        | Aug 13, 2025 |
| [[tbd/Useful punctuation.md\|Useful punctuation]]                                                                                              | tbd                        | Aug 11, 2025 |
| [[thoughts/Shopping Accounts.md\|Shopping Accounts]]                                                                                           | thoughts                   | Aug 11, 2025 |
| [[tbd/mkcert.md\|mkcert]]                                                                                                                      | tbd                        | Aug 5, 2025  |
| [[tbd/Kanban board dump.md\|Kanban board dump]]                                                                                                | tbd                        | Jul 31, 2025 |
| [[Goals and progress in 2025.md\|Goals and progress in 2025]]                                                                                  |                            | Jul 31, 2025 |
| [[hobbies/Battle of Koeshin.md\|Battle of Koeshin]]                                                                                            | hobbies                    | Jul 30, 2025 |
| [[tbd/Zelda BOTW.md\|Zelda BOTW]]                                                                                                              | tbd                        | Jul 30, 2025 |
| [[hobbies/book club/My Year of Rest and Relaxation.md\|My Year of Rest and Relaxation]]                                                        | hobbies/book club          | Jul 30, 2025 |
| [[hobbies/book club/The Bandit Queens.md\|The Bandit Queens]]                                                                                  | hobbies/book club          | Jul 30, 2025 |
| [[tbd/Email through a custom domain.md\|Email through a custom domain]]                                                                        | tbd                        | Jul 30, 2025 |
| [[chips/GPUs/Comparing GPUs.md\|Comparing GPUs]]                                                                                               | chips/GPUs                 | Jul 30, 2025 |
| [[tbd/Real or AI.md\|Real or AI]]                                                                                                              | tbd                        | Jul 30, 2025 |
| [[Quartz Snippets.md\|Quartz Snippets]]                                                                                                        |                            | Jul 30, 2025 |
| [[Quartz Cheatsheet.md\|Quartz Cheatsheet]]                                                                                                    |                            | Jul 30, 2025 |
| [[tbd/About rsync.md\|About rsync]]                                                                                                            | tbd                        | Jul 30, 2025 |
| [[hobbies/Pokemon Scarlet.md\|Pokemon Scarlet]]                                                                                                | hobbies                    | Jul 29, 2025 |
| [[hobbies/Super Mario Bros Wonder.md\|Super Mario Bros Wonder]]                                                                                | hobbies                    | Jul 29, 2025 |
| [[tbd/Webrings.md\|Webrings]]                                                                                                                  | tbd                        | Jul 29, 2025 |
| [[tbd/Twitter engagement farming.md\|Twitter engagement farming]]                                                                              | tbd                        | Jul 29, 2025 |
| [[tbd/AutoHotkey widget.md\|AutoHotkey widget]]                                                                                                | tbd                        | Jul 18, 2025 |
| [[rgb tech/Uninstalling OneDrive.md\|Uninstalling OneDrive]]                                                                                   | rgb tech                   | Jul 18, 2025 |
| [[linux tech/Samba and Tailscale.md\|Samba and Tailscale]]                                                                                     | linux tech                 | Jul 15, 2025 |
| [[tbd/Archive dot org and the wayback machine.md\|Archive dot org and the wayback machine]]                                                    | tbd                        | Jul 15, 2025 |
| [[rgb tech/Setting up Github.md\|Setting up Github]]                                                                                           | rgb tech                   | Jul 14, 2025 |
| [[hobbies/darktable.md\|darktable]]                                                                                                            | hobbies                    | Jul 11, 2025 |
| [[hobbies/Canon 5D mk iii.md\|Canon 5D mk iii]]                                                                                                | hobbies                    | Jul 11, 2025 |
| [[linux tech/Ideas for what one can do with a home server.md\|Ideas for what one can do with a home server]]                                   | linux tech                 | Jul 7, 2025  |
| [[hobbies/Crocheting.md\|Crocheting]]                                                                                                          | hobbies                    | Jul 7, 2025  |
| [[tbd/Good habits around electronics.md\|Good habits around electronics]]                                                                      | tbd                        | Jul 7, 2025  |
| [[tbd/Bookbinder usage.md\|Bookbinder usage]]                                                                                                  | tbd                        | Jul 7, 2025  |
| [[Quartz customization log.md\|Quartz customization log]]                                                                                      |                            | Jul 3, 2025  |
| [[linux tech/Docker and Portainer FAQs.md\|Docker and Portainer FAQs]]                                                                         | linux tech                 | Jul 2, 2025  |
| [[tbd/Online presence and identity.md\|Online presence and identity]]                                                                          | tbd                        | Jun 25, 2025 |
| [[hobbies/OSINT.md\|OSINT]]                                                                                                                    | hobbies                    | Jun 16, 2025 |
| [[tbd/What it would take for me to be an influencer.md\|What it would take for me to be an influencer]]                                        | tbd                        | Jun 5, 2025  |
| [[hobbies/Squad Busters by Supercell.md\|Squad Busters by Supercell]]                                                                          | hobbies                    | Jun 4, 2025  |
| [[tbd/Important skills in an ai-era of the internet.md\|Important skills in an ai-era of the internet]]                                        | tbd                        | Jun 3, 2025  |
| [[tbd/Pi add swap space.md\|Pi add swap space]]                                                                                                | tbd                        | May 8, 2025  |
| [[tbd/E7 pro manual.md\|E7 pro manual]]                                                                                                        | tbd                        | May 6, 2025  |
| [[tbd/Minecraft mega docker image.md\|Minecraft mega docker image]]                                                                            | tbd                        | May 3, 2025  |
| [[tbd/Top secret baked mac'n'cheese recipe.md\|Top secret baked mac'n'cheese recipe]]                                                          | tbd                        | May 2, 2025  |
| [[tbd/Immich setup.md\|Immich setup]]                                                                                                          | tbd                        | May 2, 2025  |
| [[meta/Quartz customization graveyard.md\|Quartz customization graveyard]]                                                                     | meta                       | May 1, 2025  |
| [[hobbies/book club/Okay, I'll read HPMOR.md\|Okay, I'll read HPMOR]]                                                                          | hobbies/book club          | May 1, 2025  |
| [[linux tech/VPS ufw config.md\|VPS ufw config]]                                                                                               | linux tech                 | May 1, 2025  |
| [[tbd/New server! Wahoo!.md\|New server! Wahoo!]]                                                                                              | tbd                        | May 1, 2025  |
| [[tbd/Isso link dump.md\|Isso link dump]]                                                                                                      | tbd                        | May 1, 2025  |
| [[tbd/Ssh keygen stuff.md\|Ssh keygen stuff]]                                                                                                  | tbd                        | Apr 30, 2025 |
| [[linux tech/IPtables and such for exposed docker ports.md\|IPtables and such for exposed docker ports]]                                       | linux tech                 | Apr 30, 2025 |
| [[Cool other websites.md\|Cool other websites]]                                                                                                |                            | Apr 29, 2025 |
| [[Uses.md\|Uses]]                                                                                                                              |                            | Apr 28, 2025 |
| [[tbd/nginx workflow.md\|nginx workflow]]                                                                                                      | tbd                        | Apr 24, 2025 |
| [[linux tech/bore pub as a service server.md\|bore pub as a service server]]                                                                   | linux tech                 | Apr 23, 2025 |
| [[thoughts/how I use GPTs.md\|how I use GPTs]]                                                                                                 | thoughts                   | Apr 23, 2025 |
| [[linux tech/bore.pub + letsencrypt + cloudflare.md\|bore.pub + letsencrypt + cloudflare]]                                                     | linux tech                 | Apr 22, 2025 |
| [[tbd/Making a zine.md\|Making a zine]]                                                                                                        | tbd                        | Apr 22, 2025 |
| [[hobbies/Civilization 6.md\|Civilization 6]]                                                                                                  | hobbies                    | Apr 21, 2025 |
| [[tbd/Perplexity on installing nginx, obtaining ssl, etc.md\|Perplexity on installing nginx, obtaining ssl, etc]]                              | tbd                        | Apr 21, 2025 |
| [[tbd/How racknerd recommends installing docker and compose.md\|How racknerd recommends installing docker and compose]]                        | tbd                        | Apr 21, 2025 |
| [[hobbies/cool things online/Terms of Service - RackNerd.md\|Terms of Service - RackNerd]]                                                     | hobbies/cool things online | Apr 20, 2025 |
| [[tbd/Minecraft server resources.md\|Minecraft server resources]]                                                                              | tbd                        | Apr 19, 2025 |
| [[thoughts/The philosophy for writing things down.md\|The philosophy for writing things down]]                                                 | thoughts                   | Apr 19, 2025 |
| [[tbd/Self-hosting on a Pi.md\|Self-hosting on a Pi]]                                                                                          | tbd                        | Apr 16, 2025 |
| [[linux tech/If you have two dockers on your server.md\|If you have two dockers on your server]]                                               | linux tech                 | Apr 16, 2025 |
| [[chips/GPUs/Ideas for what one could do with a nice GPU.md\|Ideas for what one could do with a nice GPU]]                                     | chips/GPUs                 | Apr 12, 2025 |
| [[hobbies/fishes/Fish homepage.md\|Fish homepage]]                                                                                             | hobbies/fishes             | Apr 9, 2025  |
| [[tbd/Risks of eating raw oysters.md\|Risks of eating raw oysters]]                                                                            | tbd                        | Apr 8, 2025  |
| [[linux tech/Cloudflare tunnels with Docker.md\|Cloudflare tunnels with Docker]]                                                               | linux tech                 | Apr 8, 2025  |
| [[hobbies/They put that poker game in League of Legends!.md\|They put that poker game in League of Legends!]]                                  | hobbies                    | Apr 8, 2025  |
| [[meta/list cards proof of concept.md\|list cards proof of concept]]                                                                           | meta                       | Apr 4, 2025  |
| [[hobbies/fishes/guppies.md\|guppies]]                                                                                                         | hobbies/fishes             | Apr 4, 2025  |
| [[hobbies/fishes/dwarf pufferfish.md\|dwarf pufferfish]]                                                                                       | hobbies/fishes             | Apr 4, 2025  |
| [[tbd/Filters to put on your images so that AI can't gen-ai them.md\|Filters to put on your images so that AI can't gen-ai them]]              | tbd                        | Apr 4, 2025  |
| [[hobbies/Rawtherapee.md\|Rawtherapee]]                                                                                                        | hobbies                    | Apr 2, 2025  |
| [[meta/Subtitles tracker.md\|Subtitles tracker]]                                                                                               | meta                       | Apr 1, 2025  |
| [[meta/Permalinks tracker.md\|Permalinks tracker]]                                                                                             | meta                       | Apr 1, 2025  |
| [[meta/Code tester.md\|Code tester]]                                                                                                           | meta                       | Mar 26, 2025 |
| [[linux tech/Cloudflare.md\|Cloudflare]]                                                                                                       | linux tech                 | Mar 26, 2025 |
| [[linux tech/Setting up SSH the way I wanted.md\|Setting up SSH the way I wanted]]                                                             | linux tech                 | Mar 23, 2025 |
| [[hobbies/Civilization 7.md\|Civilization 7]]                                                                                                  | hobbies                    | Mar 20, 2025 |
| [[hobbies/Civ notepad mod brainstorm.md\|Civ notepad mod brainstorm]]                                                                          | hobbies                    | Mar 20, 2025 |
| [[meta/Hiding tags from various components.md\|Hiding tags from various components]]                                                           | meta                       | Mar 20, 2025 |
| [[hobbies/Genshin Impact by miHoYo.md\|Genshin Impact by miHoYo]]                                                                              | hobbies                    | Mar 19, 2025 |
| [[meta/Upgrading to quartz 4.5.md\|Upgrading to quartz 4.5]]                                                                                   | meta                       | Mar 18, 2025 |
| [[meta/passphrase encrypted page.md\|passphrase encrypted page]]                                                                               | meta                       | Mar 18, 2025 |
| [[tbd/ACTUAL guide to a now playing widget.md\|ACTUAL guide to a now playing widget]]                                                          | tbd                        | Mar 18, 2025 |
| [[linux tech/My first ever raspberry pi!!!.md\|My first ever raspberry pi!!!]]                                                                 | linux tech                 | Mar 18, 2025 |
| [[meta/Dataview reference.md\|Dataview reference]]                                                                                             | meta                       | Mar 13, 2025 |
| [[meta/password locked page.md\|password locked page]]                                                                                         | meta                       | Mar 6, 2025  |
| [[hobbies/cool things online/Other digital garden platforms.md\|Other digital garden platforms]]                                               | hobbies/cool things online | Mar 6, 2025  |
| [[thoughts/blog ideas.md\|blog ideas]]                                                                                                         | thoughts                   | Feb 28, 2025 |
| [[meta/Image sources and attributions.md\|Image sources and attributions]]                                                                     | meta                       | Feb 28, 2025 |
| [[meta/How to work on each site.md\|How to work on each site]]                                                                                 | meta                       | Feb 27, 2025 |
| [[thoughts/Misc trip planning tips.md\|Misc trip planning tips]]                                                                               | thoughts                   | Feb 27, 2025 |
| [[thoughts/How to get over a social media addiction.md\|How to get over a social media addiction]]                                             | thoughts                   | Feb 26, 2025 |
| [[meta/abc js plugin(ish).md\|abc js plugin(ish)]]                                                                                             | meta                       | Feb 26, 2025 |
| [[tbd/Jupyter Repl.md\|Jupyter Repl]]                                                                                                          | tbd                        | Feb 26, 2025 |
| [[tbd/Perplexity queries on impact statistics.md\|Perplexity queries on impact statistics]]                                                    | tbd                        | Feb 25, 2025 |
| [[rgb tech/How to squash a bunch of commits in git.md\|How to squash a bunch of commits in git]]                                               | rgb tech                   | Feb 21, 2025 |
| [[meta/Password on Quartz via client encryption with Staticrypt.md\|Password on Quartz via client encryption with Staticrypt]]                 | meta                       | Feb 21, 2025 |
| [[chips/Every type of flip flop.md\|Every type of flip flop]]                                                                                  | chips                      | Feb 7, 2025  |
| [[rgb tech/Pile the journaling app.md\|Pile the journaling app]]                                                                               | rgb tech                   | Feb 6, 2025  |
| [[meta/Obsidian plugin list.md\|Obsidian plugin list]]                                                                                         | meta                       | Feb 6, 2025  |
| [[tbd/A bunch of kaomoji.md\|A bunch of kaomoji]]                                                                                              | tbd                        | Feb 6, 2025  |
| [[meta/GoatCounter analytics.md\|GoatCounter analytics]]                                                                                       | meta                       | Feb 5, 2025  |
| [[tbd/GitHub secrets.md\|GitHub secrets]]                                                                                                      | tbd                        | Feb 5, 2025  |
| [[meta/About robots.txt and crawlers.md\|About robots.txt and crawlers]]                                                                       | meta                       | Feb 4, 2025  |
| [[meta/Map.md\|Map]]                                                                                                                           | meta                       | Feb 4, 2025  |
| [[meta/Making a separate private quartz blog.md\|Making a separate private quartz blog]]                                                       | meta                       | Feb 2, 2025  |
| [[mac tech/change origin of your git repo.md\|change origin of your git repo]]                                                                 | mac tech                   | Feb 2, 2025  |
| [[tbd/Untrack something that used to be tracked in git.md\|Untrack something that used to be tracked in git]]                                  | tbd                        | Feb 2, 2025  |
| [[chips/Various areas or fields or categories or.md\|Various areas or fields or categories or]]                                                | chips                      | Jan 18, 2025 |
| [[meta/Upgrading to quartz 4.4.md\|Upgrading to quartz 4.4]]                                                                                   | meta                       | Jan 18, 2025 |
| [[thoughts/How to cram for the GRE (2023).md\|How to cram for the GRE (2023)]]                                                                 | thoughts                   | Jan 16, 2025 |
| [[rgb tech/Installing yarn.md\|Installing yarn]]                                                                                               | rgb tech                   | Jan 5, 2025  |
| [[thoughts/Avoiding getting doxxed.md\|Avoiding getting doxxed]]                                                                               | thoughts                   | Jan 3, 2025  |
| [[rgb tech/Custom domains.md\|Custom domains]]                                                                                                 | rgb tech                   | Jan 3, 2025  |
| [[mac tech/Mac setup notes.md\|Mac setup notes]]                                                                                               | mac tech                   | Jan 2, 2025  |
| [[mac tech/create cname for subdomain.md\|create cname for subdomain]]                                                                         | mac tech                   | Jan 2, 2025  |
| [[mac tech/colima.md\|colima]]                                                                                                                 | mac tech                   | Jan 2, 2025  |
| [[thoughts/Reasons why I do not like OneNote (2020-2021).md\|Reasons why I do not like OneNote (2020-2021)]]                                   | thoughts                   | Dec 17, 2024 |
| [[thoughts/Log - how 2024 went.md\|Log - how 2024 went]]                                                                                       | thoughts                   | Dec 17, 2024 |
| [[chips/TinyTapeout.md\|TinyTapeout]]                                                                                                          | chips                      | Nov 29, 2024 |
| [[rgb tech/Command for the type of shell.md\|Command for the type of shell]]                                                                   | rgb tech                   | Sep 12, 2024 |
| [[hobbies/To plan a fish tank.md\|To plan a fish tank]]                                                                                        | hobbies                    | Sep 4, 2024  |
| [[rgb tech/Setting up a second computer to contribute to the quartz thing.md\|Setting up a second computer to contribute to the quartz thing]] | rgb tech                   | Aug 6, 2024  |
| [[rgb tech/Kicad setup.md\|Kicad setup]]                                                                                                       | rgb tech                   | Aug 6, 2024  |
| [[chips/SMBus, the Smart battery system, and more.md\|SMBus, the Smart battery system, and more]]                                              | chips                      | Aug 5, 2024  |
| [[rgb tech/Keepass setup.md\|Keepass setup]]                                                                                                   | rgb tech                   | Aug 2, 2024  |
| [[tbd/Cloning a repo at a specific commit.md\|Cloning a repo at a specific commit]]                                                            | tbd                        | Aug 1, 2024  |
| [[tbd/Setting up bratify aka Svelte apps.md\|Setting up bratify aka Svelte apps]]                                                              | tbd                        | Jul 23, 2024 |
| [[rgb tech/How do virtual environments compare to conda environments.md\|How do virtual environments compare to conda environments]]           | rgb tech                   | Jul 23, 2024 |
| [[rgb tech/Setting up conda anaconda.md\|Setting up conda anaconda]]                                                                           | rgb tech                   | Jul 5, 2024  |
| [[rgb tech/Things to reinstall after a hard reset of the laptop.md\|Things to reinstall after a hard reset of the laptop]]                     | rgb tech                   | Jul 4, 2024  |
| [[rgb tech/Setting up WSL.md\|Setting up WSL]]                                                                                                 | rgb tech                   | Jun 25, 2024 |
| [[hobbies/book club/House of Leaves 🍂.md\|House of Leaves 🍂]]                                                                                | hobbies/book club          | Jun 25, 2024 |
| [[thoughts/Obsidian Plugin Wishlist.md\|Obsidian Plugin Wishlist]]                                                                             | thoughts                   | Jun 25, 2024 |
| [[chips/BIST - built-in self test.md\|BIST - built-in self test]]                                                                              | chips                      | Jun 8, 2024  |
| [[mac tech/adguard home.md\|adguard home]]                                                                                                     | mac tech                   | Jun 8, 2024  |
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