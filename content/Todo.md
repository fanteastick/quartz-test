---
date created: 2024-05-09T14:44
date modified: 2025-10-27T22:53
draft: "true"
---

## ALL (other) TASKS:

 > [!TODO]- All tasks
> ```dataview
> TASK
> WHERE !completed AND file.name != this.file.name
> GROUP BY file.link
> SORT rows.file.ctime ASC
> ``` 

## Quartz

- [ ] there's something funny going on with the search function on mobile
- [ ] fix the lightbox - apparently it's bad html to have a div inside a p
- [ ] carousel - change the code from html-y to markdown-y. It must be possible, i'm sure
- [ ] image grid - also should be very possible. i think the lightbox is messing w the css selectors [obsidian-minimal/src/scss/features/image-grid.scss at 10b663fba981df877b8da18d8d12cbaa79bed217 · kepano/obsidian-minimal · GitHub](https://github.com/kepano/obsidian-minimal/blob/10b663fba981df877b8da18d8d12cbaa79bed217/src/scss/features/image-grid.scss#L17) 
- [ ] Callouts causing issues like not fully collapsing: https://github.com/jackyzha0/quartz/commit/4923affa7722dfc751f1074348e6dad214fe0c08#diff-675ca1385a10894da9cc01b31207ec58adce5a15d61ef8fc373b09e24d6d97be 
- [ ] Paths causing issues like the "Click here to refresh the page" https://github.com/jackyzha0/quartz/commit/ecb3d92941b7cae7ce222e2247c18918366207e4#diff-6a4a7529a465eca0d1e1a6a62e78fbb533b87ac4c520049c2740721af4f25562
## Non-quartz

- [x] analytics site --> goatcounter
- [ ] neovim setup
- [ ] stow dotfiles
- [ ] email forwarding and etc --> need to migrate over my first domain to cloudflare? but DNS only? I have a Perplexity query going for this

## Done
- [x] Custom landing page - maybe for the first one, no source, backlinks, graph and explorer to left
- [x] integrate a google doc somewhere so I can just say "this is LITERALLY what I'm doing now"
- [x] brat generator
- [x] feature: merge in the official comments giscus widget but just don't use it
- [x] layout: make a combined githubsource and backlinks thing so that it sticks together on mobileonly
- [x] add a floating return to top button
	- 2024-07-09 tried it out. had a lot of trouble figuring out what part of the code to add it to. pretty easy to copy code from freecodecamp for a css-only thing, bc honestly just an `a href="#"` anyway.
	- 2024-07-17 just made it a link at the bottom of mobileonly view. 
- [x] edit the 404 page to be fun and cute
- [x] add the external link icon to the GitHistory thing [quartz-test/quartz/plugins/transformers/links.ts at 7a482cfe7772142f6a6037d81e1ca44ef971a83b · fanteastick/quartz-test · GitHub](https://github.com/fanteastick/quartz-test/blob/7a482cfe7772142f6a6037d81e1ca44ef971a83b/quartz/plugins/transformers/links.ts#L68) + a stylesheet
- [x] AfterBody component to slap a graph view on mobile
- [x] fix subdomains
- [x] Investigate the weird github renaming stuff
- [x] remove the strikethrough on a checked-off item
- [x] remove the fade on the explorer
- [x] change the colors
	- [x] background
	- [x] links vs internal links
- [x] fix the table of contents not folding down on mobileonly view
- [x] move the explorer to constantly viewable
- [x] note outlines on the side, or on top when mobile view
- [x] cleanup gh
- [x] new wifi network
	- pihole/adguard -> tbd
	- port forwarding

