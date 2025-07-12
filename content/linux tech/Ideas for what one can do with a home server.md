---
date created: 2025-01-02T17:31
date modified: 2025-07-07T23:50
subtitle: and now, they can collect dust in my home instead
tags:
  - idea
---

It's so sad to see a powerful machine becoming demoted to a glorified external hard drive. Even worse, collecting dust!

- [x] blog post detailing the evolution, and then summarizing the final result --> [2025-04-29 | Eilleen's Blog](https://blog.eilleeenz.com/2025/2025-04-29) 
## Done
- expose services to the internet with [[Cloudflare tunnels with Docker]]
- web server [GitHub - http-party/http-server: a simple zero-configuration command-line http server](https://github.com/http-party/http-server) [Use HTTPS and Custom Domains for Local Development with Docker Nginx | Dave Kerr Software](https://hackerrdave.com/https-local-docker-nginx/) 
- self-hosted git server, like GitLab --> turns out [[Gitea and Cloudflare Tunnels|gitea]] is better --> need a new solution for larger file dumps
- Virtual machine to SSH into: [[Setting up SSH the way I wanted]]
- Docker containers --> [[Docker and Portainer FAQs|Portainer]] is good for this as a beginner
- Minecraft server under a vanity domain [[Minecraft server resources]]
- VPS for a public-facing IP when it's needed (Racknerd thank you)
- VPN (Tailscale thank you)
- Ollama self-hosted LLMs (Open Web UI thank you) (also it's just on my normal pc for the gpu accel)
- A functional homepage with glance [glance/docs/configuration.md at main · glanceapp/glance · GitHub](https://github.com/glanceapp/glance/blob/main/docs/configuration.md) 
- Pangolin can do everything cloudflare tunnels does, but it needs another paid vps:  [GitHub - fosrl/pangolin: Tunneled Mesh Reverse Proxy Server with Identity and Access Control and Dashboard UI](https://github.com/fosrl/pangolin) and [Fossorial Docs](https://docs.fossorial.io/Getting%20Started/quick-setup) lolol
- self hosted comments system [[Isso link dump]] ; and managing multiple sites!
- self-hosted website analytics: umami --> pangolin but with authentication disabled [umami/docker-compose.yml · GitHub](https://github.com/umami-software/umami/blob/master/docker-compose.yml) 
- Secure the vps with ssh, maybe a honeypot, figure out how to restrict access to certain web ports [Securing the SSH service | Hetzner Community](https://community.hetzner.com/tutorials/securing-ssh#step-1---securing-the-ssh-service) and a cuter guide [Preparing Your Ubuntu Server for First Use](https://ivansalloum.com/preparing-your-ubuntu-server-for-first-use/) , also [[IPtables and such for exposed docker ports]] 
## In progress

- Figure out wtf is wrong with my server - it might be temperature
	- dust the fans/heatsinks
	- fan operation
	- lm-sensors to alert temperatures
```
journalctl -b -1 | grep -i thermal
journalctl -b -1 | grep -i overheat
```
- backup solution
	- Immich: [Remotely access and share your self-hosted services - YouTube](https://www.youtube.com/watch?v=Vt4PDUXB_fg) 
	- Files or something, and do it over Tailscale only
- Kanban 2025-07-07
	- Planka - kind of annoying to set up. works though. Doesn't have JSON/CSV export
	- Wekan - need to rebuild the image. 
## Not done
- UFW docker [GitHub - chaifeng/ufw-docker: To fix the Docker and UFW security flaw without disabling iptables](https://github.com/chaifeng/ufw-docker)
- sysadmin and devops, like [DevOps BootCamp](https://devopsbootcamp.osuosl.org/) (h/t to CW in 2021!)
- Video editing and rendering
- 3D modeling/CAD farm
- Simulations 
- Otterwiki: [GitHub - redimp/otterwiki: A minimalistic wiki powered by python, markdown and git.](https://github.com/redimp/otterwiki) 
- Caddy as a file server:  [file\_server (Caddyfile directive) — Caddy Documentation](https://caddyserver.com/docs/caddyfile/directives/file_server)
- More robust self-hosted git, maybe [Codeberg.org](https://codeberg.org/) 
- Overnight "sleep mode" or some type of scheduling for the PCs
- [GitHub - librenms/docker: LibreNMS Docker image](https://github.com/librenms/docker/tree/master)  and example compose [docker/examples/compose/compose.yml at master · librenms/docker · GitHub](https://github.com/librenms/docker/blob/master/examples/compose/compose.yml) 
- [GitHub - cisagov/LME](https://github.com/cisagov/LME) - Logging Made Easy (LME) is a no cost, open source platform that centralizes log collection, enhances threat detection, and enables real-time alerting, helping small to medium-sized organizations secure their infrastructure.
	- Accompanying video tutorial: [Logging Made Easy (LME) 2.0 Installation - YouTube](https://www.youtube.com/watch?v=LKD8sw6VuPw) 
- [GitHub - r-smith/deceptifeed: Honeypot servers with an integrated threat feed](https://github.com/r-smith/deceptifeed) 
- [Running Cockpit — Cockpit Project](https://cockpit-project.org/running.html#ubuntu)
- [FireHOL - FireHOL Welcome Guide](https://firehol.org/guides/firehol-welcome/)
- CIS benchmarks: [Center for Internet Security (CIS) Benchmarks - Microsoft Compliance | Microsoft Learn](https://learn.microsoft.com/en-us/compliance/regulatory/offering-cis-benchmark)
- Mail server: [Home - Docker Mailserver](https://docker-mailserver.github.io/docker-mailserver/latest/) 
- zotero + swag: [GitHub - linuxserver/docker-zotero: Web accessible Zotero inside a Debian Container](https://github.com/linuxserver/docker-zotero?tab=readme-ov-file) [docker-swag/Dockerfile at master · linuxserver/docker-swag · GitHub](https://github.com/linuxserver/docker-swag/blob/master/Dockerfile) 

> [!web] From the web
> Thanks perplexity
> 
> | Use Case              | Power Consumption | Value for Home Use         |
> | --------------------- | ----------------- | -------------------------- |
> | NAS                   | Moderate          | High (storage, backups)    |
> | Home Lab              | Moderate          | High (learning, testing)   |
> | Web/App Server        | Moderate          | Medium (personal projects) |
> | Backup Server         | Moderate          | High (data safety)         |
> | Media Server          | Moderate          | High (media streaming)     |
> | Test/Dev Environment  | Moderate          | Medium (development)       |
> | Distributed Computing | High              | Low (unless cause-driven)  |
> 

## Tabled

- Similar project to pangolin: [GitHub - hintjen/selfhosted-gateway: Self-hosted Docker native tunneling to localhost. Expose local docker containers to the public Internet via a simple docker compose interface.](https://github.com/hintjen/selfhosted-gateway?tab=readme-ov-file#getting-started) apparently this uses traefik tho, a Reddit comment said traefik is slow
- Local DNS --> Pi-hole has a local DNS system
	- Turns out I can't really use this because I didn't set Pi-hole as my DHCP
- Other VPS's
	- DigitalOcean, except my account is suspended
	- Linode?
	- Can't do aws: it's not free after 1yr
	- Google: lowk can't figure out free tier
- Ngrok [ngrok - Online in One Line](https://dashboard.ngrok.com/get-started/setup/windows) [Download ngrok](https://ngrok.com/downloads/linux?tab=install) 
	- Don't need it now that I have a VPS
- media server, e.g. [Plex on Unraid](https://thedocsworld.net/plex-on-unraid/)
	- low interest
- NAS - network attached storage - file storage/sharing on the network - Unraid is apparently good for this
- bitcoin mining isn't profitable anymore: [BTC mining farm in 2025, does it work? : r/BitcoinMining](https://www.reddit.com/r/BitcoinMining/comments/1h7zjuc/btc_mining_farm_in_2025_does_it_work/) ⛽[[How to mine Bitcoin at home in 2025]]
- home assistant - I don't have any smart devices (maybe alexa/google home???)
- alternative self hosted comments system: [About | Comentario Documentation](https://docs.comentario.app/en/about/) 