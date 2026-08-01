---
date created: 2026-04-29T00:06
date modified: 2026-04-29T00:09
---

## QUick fix

`docker network prune -f`

## Permanent (recommended): 

Edit /etc/docker/daemon.json: (create if not existing already)

```
{
  "default-address-pools": [
    {"base":"172.20.0.0/16","size":24},
    {"base":"172.21.0.0/16","size":24},
    {"base":"10.0.0.0/16","size":24}
  ]
}
```