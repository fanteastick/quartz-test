---
date created: 2025-09-07T00:25
date modified: 2025-09-10T16:20
tags:
  - minecraft
  - self-hosted
---
## Method 1

[Self-host a Public Minecraft Server Without Opening Ports Using Crafty and Pangolin - YouTube](https://www.youtube.com/watch?v=acWB5wQQoOE)

Crafty, pangolin, connect with pangolin.url.com:25565

Pros: better ui (GUI!). cons: no vanity domain. Fix: make an SRV record anyway. 

SRV record: go to cloudflare, set an A record (e.g. "minecraft") to the VPS's domain. Then set an SRV record to `_minecraft._cp.mc` with the target being `minecraft.domain.com` and the port being the correct port. Then it should work, or try disabling pihole for a minute. Don't  forget to go into the VPS to allow the port to go through as well. 

`sudo ufw allow 25500:25600/tcp` to allow a range of ports. Actually, I also had to go into the VPS settings for pangolin and add it to the ports available to gerbil. Honestly, a bore.pub was a lot easier. 

## Method 2

1) docker compose as a local server
2) bore.pub it to a port on the vps (remember your secret!)
3) VPS umm nginx or something to redirect diff domains like vanilla.domain.com vs paper.domain.com
4) Cloudflare: make an A record, an SRV record. Make sure to disable proxying. 

## Kind of these, but not really

![How To Host A FORGE MODDED Minecraft Server In Your Home Lab Using Crafty! (Full Guide) - YouTube](https://www.youtube.com/watch?v=cP4poDZAqoY)

![Self-host a Public Minecraft Server Without Opening Ports Using Crafty and Pangolin - YouTube](https://www.youtube.com/watch?v=acWB5wQQoOE) 

## Final approach directions

Vanity domain: 

1) make server with crafty controller, set the server IP in the server.properties file, and set the config port to the same for the metrics. --> now it's accessible at `local-ip:port`
2) In the VPS, ufw allow port/tcp and ufw reload
3) On the server, create a new bore.pub service that tunnels to the desired port. --> now it's accessible at `vps-ip:port`
4) Cloudflare settings: create A record for vanity domain, then create matching SRV record.
5) In minecraft, use the vanity domain.

Port-y domain:

1) make server with crafty controller, set the server IP in the server.properties file, and set the config port to the same for the metrics.
2) In the VPS, ufw allow port/tcp and ufw reload
3) On pangolin, make a TCP tunnel to the service and enable it
4) On the pangolin docker compose, expose the port
5) In minecraft, use the pangolin-url.com:port

## Testing

- [x] Regular vanilla, pangolin + cloudflare, vanity domain
- [x] Regular vanilla, bore + cloudflare, vanity domain
- [x] Regular vanilla, bore + cloudflare, vanity domain on a `*pub` domain (so don't make a specific A record)
- [ ] Curseforge workflow
- [x] Lunar launcher testing

## Shaders

[How to Add/Get Shaders in Lunar Client for Minecraft - 2025 Full Guide - YouTube](https://www.youtube.com/watch?v=3jRnYEoHD_Y) 