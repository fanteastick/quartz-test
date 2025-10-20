---
date created: 2025-10-19T00:04
date modified: 2025-10-19T00:20
---

I powered on a PC I hadn't used in a while and the BIOS was hanging/freezing. There was like a little green patch and a little dog in the corner too. So weird. I had to install a random Linux distro to properly partition the drive, and then used that to also run some RAM tests, and finally got it back to the OS that I actually wanted. 

Below are some tools, notes, and useful steps that I took. I'm sorry Perplexity... too many queries... On that note, I've noticed that perplexity usually spazzes out with long conversations being re-opened, or if you try to scroll up a lot. 

## Error codes and such

POST error - power-on self test

## Memtester

It'll auto-loop until you stop it. Allocate an amount of RAM less than what you have available right now. Avoid multitasking! Opening Chromium at the same time will probably cause the OS to freeze. 

[memtester version 4](https://pyropus.ca./software/memtester/) 

[Ubuntu Manpage: memtester - stress test to find memory subsystem faults.](https://manpages.ubuntu.com/manpages/questing/man8/memtester.8.html) 

## Memtest86+

[MemTest86 - Official Site of the x86 and ARM Memory Testing Tool](https://www.memtest86.com/) 

How to boot into it: [Booting MemTest86](https://www.memtest86.com/tech_booting-memtest.html)

If it crashes while testing just one RAM stick, it's probably faulty - either the stick itself, or the location. When testing RAM, start with the A2 slot (second from the left of the CPU).

Tests ran: 

- [ ] TODO

## Risks of leaving an old laptop powered on

- battery degradation
	- micro-charging
	- lithium ion batteries prefer cycling between 30 and 70%
- heat buildup
- fire hazard