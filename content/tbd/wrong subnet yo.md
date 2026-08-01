---
date created: 2026-05-06T20:06
date modified: 2026-05-06T20:48
---

sometimes your subnet is wrong.

`sudo nano /etc/netplan/01-netcfg.yaml`

```
network:
  version: 2
  ethernets:
    enpXs0:        # replace with your interface
      dhcp4: no
      addresses: [192.168.1.17/24]
      routes:
        - to: default
          via: 192.168.1.254
      nameservers:
        addresses: [8.8.8.8, 1.1.1.1]
```

`sudo netplan apply`

`sudo cp /etc/netplan/50-cloud-init.yaml /etc/netplan/50-cloud-init.yaml.bak`