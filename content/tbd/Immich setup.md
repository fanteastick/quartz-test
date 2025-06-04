---
date created: 2025-05-02T17:29
date modified: 2025-05-02T21:21
subtitle: we have google photos at home
---
## The real setup
1) Tailscale
- connect da server hosting it
- connect da phone accessing it
1) Immich setup with docker compose: [Docker Compose \[Recommended\] | Immich](https://immich.app/docs/install/docker-compose/) 
- download docker-compose, env
- repopulate the values and choose a db password
1) Post installation [Post installation steps | Immich](https://immich.app/docs/install/post-install) 

## Misc

- 321 backup strategy
- [[Download more storage space]]
## Debunked 

[Enabling HTTPS · Tailscale Docs](https://tailscale.com/kb/1153/enabling-https) 

[Remotely access and share your self-hosted services - YouTube](https://www.youtube.com/watch?v=Vt4PDUXB_fg)

Perplexity on sharing: 

|Method|Tailscale Required?|Publicly Exposed?|Security Level|Best For|
|---|---|---|---|---|
|Add to Tailnet|Yes|No|Highest|Tech-savvy family, max privacy|
|Tailscale Device/Service Sharing|Yes|No|Very High|Sharing just Immich, not all|
|Tailscale Funnel|No|Yes|Moderate (if secured)|Non-technical users, quick share|
|Cloudflare Tunnel + Zero Trust|No|Yes|High (if secured)|Public sharing, granular control|
