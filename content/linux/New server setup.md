---
subtitle: cold, calculated, precise.
date created: 2025-09-07T12:28
date modified: 2026-05-14T22:04
---

In comparison to [[Fumbling around a new server]]

## Installation

Make sure to install the OpenSSH server so you can ssh into the machine!

- sudo apt install net-tools --> so you can see the ip address of the device

### Docker and Dockge

Installation: [[How racknerd recommends installing docker and compose]] 

```
sudo docker run hello-world
sudo usermod -aG docker $USER
```

Then logout and log back in.

Dockge: [GitHub - louislam/dockge](https://github.com/louislam/dockge)

```
curl https://raw.githubusercontent.com/louislam/dockge/master/compose.yaml --output compose.yaml
```

And then edit the stacks location in 3 places. 

## Pangolin (site setup)

Pangolin --> new site --> newt --> copy the config --> save 

Create a new docker stack with the same config and check that it successfully completed.

## Tailscale node

Tailscale --> add new linux server --> paste in the script --> `sudo tailscale up`.

Do `sudo tailscale status` to check if it worked. 

And then add the easy tunneling scripts: [[Tailscale serve]]

## Monitoring

UFW

Dozzle - for all docker logs [Agent Mode \| Dozzle](https://dozzle.dev/guide/agent) . Make sure to copy over the key and the secret from the host. In the host, add the IP address as an agent. 

## Other crucial docker containers

VSCode in docker: [hub.docker.com/r/linuxserver/code-server](https://hub.docker.com/r/linuxserver/code-server)

Dockflare:  [GitHub - ChrispyBacon-dev/DockFlare: DockFlare: Automate Cloudflare Tunnels with Docker Labels](https://github.com/ChrispyBacon-dev/DockFlare)

![[New server setup_image_1.png]]

[[Download more storage space]]

[Docker - Crafty Documentation](https://docs.craftycontrol.com/pages/getting-started/installation/docker/#using-docker-cli) 

[[Resolving Missing Memory Stats in Docker Stats on Raspberry Pi]]

`sudo apt install ripgrep`