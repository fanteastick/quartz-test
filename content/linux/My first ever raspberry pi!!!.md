---
date created: 2024-11-19T20:48
date modified: 2025-03-18T11:25
tags:
  - pi
---

Amazing that it took me this long to get here... lol...

Supplies needed:

- pi
- hdmi cord <> microhdmi adapter
	- Initially I wanted to only do setup headlessly (no screen) but something was wrong so I had to plug it in
	- Technically it should be possible though: [Raspberry Pi Headless Setup - YouTube](https://www.youtube.com/watch?v=9fEnvDgxwbI) [How to Set Up a Headless Raspberry Pi, No Monitor Needed | Tom's Hardware](https://www.tomshardware.com/reviews/raspberry-pi-headless-setup-how-to,6028.html) 
- ethernet
- mouse and keyboard via USB

## Following the "getting started"

[Getting started - Raspberry Pi Documentation](https://www.raspberrypi.com/documentation/computers/getting-started.html)

### Downloading OS

[Raspberry Pi OS – Raspberry Pi](https://www.raspberrypi.com/software/) downloaded the raspberry pi OS using raspberry pi imager for windows

It's a raspberry pi 4 B. You'll need some sort of converter to make the micro-SD plug into the laptop or PC you're using. You can put in Wi-Fi details at this stage. 

If it errors out, you can just keep trying again. Re-downloading the OS on the SD card is equivalent to resetting the Pi. 

## Goals

- [x] SSH into it
- [x] PiHole
- [ ] public access across one of my own domains (perhaps Cloudflare?) [Setting up a Cloudflare Tunnel on the Raspberry Pi - Pi My Life Up](https://pimylifeup.com/raspberry-pi-cloudflare-tunnel/) 

## Did you know that you should probably switch your pi from SD to an SSD?

Apparently an SD card is bad at frequent read-writes. I got a SATA SSD hat and plugged it into one of my many  SSDs on hand. Anyone want one, by the way?

## Related

[[Home networking concepts learned through Pi]] 

Commonly used resources: 

- [Pi My Life Up - 800+ DIY Projects, Tutorials & Guides](https://pimylifeup.com/) 