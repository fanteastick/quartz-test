---
date created: 2025-03-21T17:38
date modified: 2025-09-07T12:28
tags:
  - guide
subtitle: the server room is very warm and loud
---

This is approximately how I'd do it. 

> [!summary]
> Docker evolution: Portainer stacks --> plain docker runs --> Dockge managing docker-compose
> 
> Services evolution: Grafana, Pihole --> minecraft server --> Glance, dozzle, security, self-hosted dbs, immich
> 
> Devices evolution: Pi --> + local PC server --> + VPS
> 
> Networking evolution: Port forwarding ❌ (NAT) --> Cloudflare tunneling --> ngrok --> bore.pub --> ngrok and cloudflare tunnels again (dockflare) --> Tailscale and funnels --> Pangolin tunneling
> 
> - reverse proxy sidequest! in the end, I still don't really understand nginx/NPM, but I got it working once manually.. i have never gotten NPM docker container to work. this involved using the rpi as a dns server temporarily
> 
> Security evolution: fail2ban and ufw --> deceptifeed --> VPNs + ssh key auth
> 
> New tools and skills: nano (text editor), systemd journalctl, linux file structure, Docker containers, Perplexity, misc networking checks [[Home networking concepts learned through Pi]]

That stupid thing

| Step                   | Command/Action                |
| ---------------------- | ----------------------------- |
| Install lm-sensors     | `sudo apt install lm-sensors` |
| Detect sensors         | `sudo sensors-detect`         |
| Load modules           | `sudo service kmod start`     |
| View readings          | `sensors`                     |
| Real-time monitoring   | `watch sensors`               |
| Optional GUI (Psensor) | `sudo apt install psensor`    |

## Upgrading the kernel because wireguard default on 5

```
  247  uname -r
  248  sudo apt-get update
  249  sudo apt-get install --install-recommends linux-generic-hwe-18.04
```

## UFW firewall
```
# Allow only your internal subnet (example: 192.168.1.0/24) to access port 9000
sudo ufw allow from 192.168.1.0/24 to any port 9000 proto tcp

# Deny all other access to port 9000
sudo ufw deny 9000/tcp
```

## Set time zone

`sudo timedatectl set-timezone America/New_York`

## SSH

[[Setting up SSH the way I wanted]] 

```
sudo apt update && sudo apt upgrade -y
sudo apt install net-tools
sudo apt install openssh
sudo apt install fail2ban
```

## Install docker

> [!web]
> Official instructions: [Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/) 

Delete old docker versions:

```bash
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done
```

Before you install Docker Engine for the first time on a new host machine, you need to set up the Docker `apt` repository. Afterward, you can install and update Docker from the repository.

1. Set up Docker's `apt` repository.

```bash
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

2. Install the Docker packages.

To install the latest version, run:

```console
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

3. Verify that the installation is successful by running the `hello-world` image:

```console
sudo docker run hello-world
```

This command downloads a test image and runs it in a container. When the container runs, it prints a confirmation message and exits.

You have now successfully installed and started Docker Engine.

### POST-INSTALLATION

[Post-installation steps | Docker Docs](https://docs.docker.com/engine/install/linux-postinstall/)

```
sudo usermod -aG docker $USER
```

## Set up Portainer

> [!web] From the web
> [Install Portainer CE with Docker on Linux | Portainer Documentation](https://docs.portainer.io/start/install-ce/server/docker/linux)

%% ## Lightdm

Had to reinstall bc GUI wasn't working, then disabled it bc it kept turning off my screen. Thanks perplexity. 

> [!web] Perplexity
> Yes, you can completely disable LightDM temporarily. Here are a few methods to achieve this:
> 
> **Disable LightDM Using Systemd**
> 
> You can disable LightDM from starting at boot using the following command:
> 
> `sudo systemctl disable lightdm`
> 
> To stop it immediately without rebooting:
> 
> `sudo systemctl stop lightdm`
> 
> If you want to re-enable it later:
> 
> `sudo systemctl enable lightdm`

Which kind of didn't work, and had to deal with [[Systemd and auto shutdowns]]

## Wireguard

Is a VPN.

[GitHub - wg-easy/wg-easy at production](https://github.com/wg-easy/wg-easy/tree/production) 

## DNS and Dynamic DNS

[Tutorials | legoclan.com](https://www.legoclan.com/tutorials/#FreeDNS) useful snippet of freeDNS information:

> When creating your DDNS entry for FreeDNS the only fields required are Service Type, Hostname, and Password.
> 
> The password is your authentication token from FreeDNS, it’s not your FreeDNS account password.
> 
> Login to http://freedns.afraid.org/dynamic/ and copy the “Direct URL” link for the hostname you want to update.  
> [![2015-03-10 23_25_31](https://www.legoclan.com/wp-content/uploads/2014/10/2015-03-10-23_25_31-1024x82.png)](https://www.legoclan.com/wp-content/uploads/2014/10/2015-03-10-23_25_31.png)
> 
> Example – freedns.afraid.org/dynamic/update.php?**Ui0ylkVF3VRTT4lBQUkdSm9K7ToyN3I1MDu2**
> 
> Your authentication token is everything from the **right** of the question mark, in this example **Ui0ylkVF3VRTT4lBQUkdSm9K7ToyN3I1MDu2** would be my password.

 %%

## Figure out what's connected

```
lscpu # cpu
lspci # peripherals
```

## Open WebUI 

[⏱️ Quick Start | Open WebUI](https://docs.openwebui.com/getting-started/quick-start/) 

Someone else's docker compose: [ollama-webui-docker/docker-compose.yml at main · codearrangertoo/ollama-webui-docker · GitHub](https://github.com/codearrangertoo/ollama-webui-docker/blob/main/docker-compose.yml) 

## Make the server sleep and wake up in 7 hours from now

```
sudo rtcwake -m off -l -s $((7*60*60))

# in ~/.bashrc
gotosleep() {
  seconds=$(echo "$1 * 3600" | bc)
  sudo rtcwake -m off -l -s ${seconds%.*}
}

```

## Check what ports are available

```bash
sudo ss -tuln
```

## Docker versioning

[[If you have two dockers on your server]]

## Logwatch

[How to install and configure Logwatch - Ubuntu Server documentation](https://documentation.ubuntu.com/server/how-to/observability/install-logwatch/index.html) 

> Logs are an invaluable source of information about problems that may arise in your server. [Logwatch](https://sourceforge.net/projects/logwatch/) keeps an eye on your logs for you, flags items that may be of interest, and reports them via email.

## Add a new user

```
adduser newusername
usermod -aG sudo newusername
groups newusername
```

