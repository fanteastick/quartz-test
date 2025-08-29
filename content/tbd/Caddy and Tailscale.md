---
subtitle: it's time to eat the frog!
date created: 2025-08-25T20:54
date modified: 2025-08-26T01:12
draft: "true"
---

Option 1: [GitHub - lucaslorentz/caddy-docker-proxy: Caddy as a reverse proxy for Docker](https://github.com/lucaslorentz/caddy-docker-proxy)

Option 2: [GitHub - caddymanager/caddymanager: Easily manage your Caddy2 servers using a modern web-UI, built on the MEVN stack.](https://github.com/caddymanager/caddymanager)

Option 3: just do it: [Deploying Web Apps with Caddy: A Beginner's Guide \| Better Stack Community](https://betterstack.com/community/guides/web-servers/caddy/) 

![[Caddy_image_1.png]] 

## Things that I had to do:

Docker compose like this:

```
services:
  caddy:
    image: caddy:latest
    restart: unless-stopped
    ports:
      - 80:80
      - 443:443
      - 443:443/udp
    volumes:
      - ${CADDY_DATA_DIR}:/etc/caddy
      - caddy_data:/data
      - caddy_config:/config
      - /var/run/tailscale/tailscaled.sock:/var/run/tailscale/tailscaled.sock:ro
    command: sh -c "mkdir -p /var/run/tailscale && caddy run --config
      /etc/caddy/Caddyfile"
volumes:
  caddy_data: null
  caddy_config: null
networks: {}

```

Things that people didn't mention: binding the tailscaled socket??? I can't tell if this is super necessary. Also need to `mkdir` in the command in order to have it accessible. because of this, instead of restarting the container in dockge, you need to stop and start it again for the certificates to work.

Caddyfile like this:

```
:80 {
    root * /etc/caddy/site
    file_server
}

https://---.ts.net {
  reverse_proxy localhost:80
}
```

Check that certs are being requested: `sudo journalctl -u tailscaled --since "1 hour ago" | grep cert`

See in the logs that the certs are working...? and change the url when looking for it. 

Create a docker network, add my docker containers, and then do `doker network inspect ---` to check that they're all on the same network. 

Installing curl:

```
docker ps | grep <container>
docker exec -it <container id> sh
apk add curl

curl sksksk:8080
```

--- 

got overwhelmed! nothing was working. 

[How to securely access homelab with Tailscale — Evgenii Burmakin](https://frey.today/homelab-with-tailscale-docker-caddy-ssl-cloudflare/) promising

Misc: [GitHub - sytone/obsidian-remote: Run Obsidian.md in a browser via a docker container.](https://github.com/sytone/obsidian-remote?tab=readme-ov-file#using-docker-compose) 

[How is everyone securing self hosted obsidian? : r/selfhosted](https://www.reddit.com/r/selfhosted/comments/1mwccl3/how_is_everyone_securing_self_hosted_obsidian) 