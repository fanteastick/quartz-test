---
date created: 2025-04-22T22:20
date modified: 2025-05-03T15:29
---

## thank you itzg

```yaml title="docker-compose.yml"
version: "3.8"

services:
  mc:
    image: itzg/minecraft-server:latest
    ports:
      - "25566:25565"
    environment:
      EULA: "TRUE"
      TYPE: PAPER
    depends_on:
      restore-backup:
        condition: service_completed_successfully
    volumes:
      - ./mc-data:/data
  # "init" container for mc to restore the data volume when empty    
  restore-backup:
    # Same image as mc, but any base image with bash and tar will work
    image: itzg/mc-backup
    restart: "no"
    entrypoint: restore-tar-backup
    volumes:
      # Must be same mount as mc service, needs to be writable
      - ./mc-data:/data
      # Must be same mount as backups service, but can be read-only
      - ./mc-backups:/backups:ro
  backups:
    image: itzg/mc-backup
    depends_on:
      mc:
        condition: service_healthy
    environment:
      BACKUP_INTERVAL: "6h"
      RCON_HOST: mc
      # since this service waits for mc to be healthy, no initial delay is needed
      INITIAL_DELAY: 0
    volumes:
      - ./mc-data:/data:ro
      - ./mc-backups:/backups
```

- backups older than 7 days deleted
- backup interval every 6hr
- `docker compose up restore-backup` and then `docker compose up -d`
## Additional files to make:

`post-backup.sh` contents "echo "Backup from \$RCON_HOST to \$DEST_DIR finished""

## Sources

[GitHub - itzg/docker-mc-backup: Provides a side-car container to backup itzg/minecraft-server server data](https://github.com/itzg/docker-mc-backup)

Get UUIDs: 

```
https://api.mojang.com/users/profiles/minecraft/<username>
```

## Method 1

[Self-host a Public Minecraft Server Without Opening Ports Using Crafty and Pangolin - YouTube](https://www.youtube.com/watch?v=acWB5wQQoOE)

Crafty, pangolin, connect with pangolin.url.com:25565

Pros: better ui (GUI!). cons: no vanity domain. Fix: make an SRV record anyway. 

## Method 2

1) docker compose as a local server
2) bore.pub it to a port on the vps (remember your secret!)
3) VPS umm nginx or something to redirect diff domains like vanilla.domain.com vs paper.domain.com
4) Cloudflare: make an A record, an SRV record. Make sure to disable proxying. 