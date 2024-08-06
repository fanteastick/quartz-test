---
date created: 2024-05-09T14:44
date modified: 2024-08-02T16:32
draft: "true"
---
## Quartz

- [ ] Subtitles on a quartz page? maybe if subtitle metadata then display it as part of the beforebody in like all caps type of font
- [ ] change the heading font to something matching
- [ ] Copy URL to clipboard optional component [Tailwind CSS Copy to Clipboard - Flowbite](https://flowbite.com/docs/components/clipboard/)
- [ ] change githubsource component to have input variables for user, repo, branch
- [ ] feature: fix footnotes linking and jumping around
## Non-quartz
- [ ] update cv site favicon [Favicon · Issue #60 · BartoszJarocki/cv · GitHub](https://github.com/BartoszJarocki/cv/issues/60) 
- [ ] analytics site
- [ ] setup home server
	- [ ] learn about NAS?
- [ ] check out [LilyPond – Music notation for everyone](https://lilypond.org/) 
- [ ] neovim setup
- [ ] stow dotfiles
- [ ] pi or esp32

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

## ALL (other) TASKS:

 > [!TODO] All tasks
> ```dataview
> TASK
> WHERE !completed AND file.name != this.file.name
> GROUP BY file.link
> SORT rows.file.ctime ASC
> ``` 
