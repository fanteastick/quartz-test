---
date created: 2025-03-20T22:32
date modified: 2025-04-08T14:50
tags:
  - pi
---

I love you Let's Talk Dev... my savior frfr: [Cloudflare Tunnels for Docker: A Step-by-Step Guide to Securely Exposing Your Self Hosted Apps](https://www.youtube.com/watch?v=SivE_EfUNd8)  

> [!web]- youtube tutorial embed
> <iframe width="560" height="315" src="https://www.youtube.com/embed/SivE_EfUNd8?si=259azzHFFK9BjVno" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

[Create a tunnel (dashboard) · Cloudflare Zero Trust docs](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/) 

Reddit: [Is there an easier way to use cloudflared tunnels? : r/selfhosted](https://www.reddit.com/r/selfhosted/comments/1jnt02i/is_there_an_easier_way_to_use_cloudflared_tunnels/)

Alternatives: [Linux Handbook: Cloudflare Tunnels Alternatives](https://linuxhandbook.com/cloudflare-tunnels-alternative/) 

## Overview

Use Cloudflare tunnels to expose docker services to the web under your domain name. 

1. Docker-compose your service
2. Set up a tunnel through Cloudflare zero trust
3. Add the tunnel to the docker compose to connect the two
4. Set up https

The example I will use is uptime-kuma.

## Docker compose, part 1

```
services:
  uptime-kuma:
    image: louislam/uptime-kuma:1
    volumes:
      - ./data:/app/data
    ports:
      # <Host Port>:<Container Port>
      - 3001:3001
    restart: unless-stopped
```

And deploy the stack!

## Tunneling

[Cloudflare Dashboard | Manage Your Account](https://dash.cloudflare.com/) 

--> Zero Trust --> Networks --> Tunnels

> [!caption|center] 
> ![[Cloudflare tunnels_image_1.png|600]]
> Select Cloudflared.

![[Cloudflare tunnels_image_2.png]]

The token is kind of hidden so you need to click this whole thing to get the token value. Before going next, go back to the docker compose file.

## Docker compose, part 2

Add this second half of the file. 

```
services:
  uptime-kuma:
    image: louislam/uptime-kuma:1
    volumes:
      - ./data:/app/data
    ports:
      # <Host Port>:<Container Port>
      - 3001:3001
    restart: unless-stopped

  cloudflared:
    image: cloudflare/cloudflared:latest
    restart: unless-stopped
    command: tunnel --no-autoupdate run
    environment:
      - TUNNEL_TOKEN=${TUNNEL_TOKEN}
```

Add an environment variable `TUNNEL_TOKEN` which is set to the full value of the token given in the previous step. Deploy the stack again.

## Back to tunnels

In the same screen as before, there should be an entry at the bottom for connections, then it's ok to go next. 

Go to the public hostname section:

![[Cloudflare tunnels_image_3.png|360]] 

Set the subdomain to whatever, and the domain is a dropdown. 

Service: choose `HTTP` and the URL is the `name of the service:internal port in the docker machine`

With kuma, I put `uptime-kuma:3001`

Let's say I have another service that I have at port 80 internally, but externally it's port 85 because it's conflicting with other stuff. Although locally I access it at `IP_ADDRESS:85`, I would put `service:80` here. 

## Last step

![[Cloudflare#HTTPs]]

## Final words

Hooray! After a few minutes, it should all propagate. 

How to check the logs for errors:

- per-stack logs
- `docker logs cloudflared`

It's all a matter of finding the right tutorial...

Random extras:

- [Secure Self-Hosting with Cloudflare Tunnels and Docker: Zero Trust Security - DEV Community](https://dev.to/mihailtd/secure-self-hosting-with-cloudflare-tunnels-and-docker-zero-trust-security-5bbn) 
- [Setting up a reverse proxy for HTTPS with a custom domain using Nginx Proxy Manager, Pi-Hole and Cloudflare](https://fullmetalbrackets.com/blog/reverse-proxy-using-nginx-pihole-cloudflare/)
- [Guide: Cloudflare Tunnel with Nginx Proxy Manager · GitHub](https://gist.github.com/prateekrajgautam/75afbaa9bcda8eb1dfb6b5ceecd25e8c) 