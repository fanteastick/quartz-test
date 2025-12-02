---
date created: 2025-01-21T22:09
date modified: 2025-11-22T21:47
tags:
  - pi
---
# Pi-hole

[Blocklist Collection ¦ Firebog](https://firebog.net/)

[Pi-Hole DHCP configuration guide · GitHub](https://gist.github.com/fellipec/a22581a9c1d6faf2402c83c138bce479) by fellipec

Thanks Perplexity: 

To configure each Windows device to use Pi-hole as its DNS server directly (bypassing the router for DNS), do the following on the Windows machine:

1. Open the Control Panel.
2. Navigate to Network and Internet > Network and Sharing Center > Change adapter settings.
3. Right-click your active network connection (Ethernet or Wi-Fi) and select Properties.
4. In the Networking tab, select "Internet Protocol Version 4 (TCP/IPv4)" and click Properties.
5. In the IPv4 Properties window, select "Use the following DNS server addresses."
6. Enter the IP address of your Pi-hole server as the Preferred DNS server.
7. (Optional) You can enter a public DNS (e.g., 8.8.8.8) as the Alternate DNS server for fallback.
8. Click OK and close all dialogs.
9. To apply changes, disable and re-enable the network connection or reboot the machine.

This will make the Windows device send DNS queries directly to the Pi-hole, allowing it to see the actual device IP in the logs. Repeat this on each Windows device you want to protect this way.

Note: This approach requires manual setup on each device but avoids the router acting as a DNS proxy that masks device IPs seen by Pi-hole.[1][2][3][7]

If you want to automate this for multiple devices, consider setting Pi-hole as your DHCP server or configuring your router's DHCP DNS option to advertise Pi-hole as the DNS server instead.

two good help links:  [How do I configure my devices to use Pi-hole as their DNS server?](https://discourse.pi-hole.net/t/how-do-i-configure-my-devices-to-use-pi-hole-as-their-dns-server/245) AND [How do I use Pi-hole's built in DHCP server (and why would I want to)?](https://discourse.pi-hole.net/t/how-do-i-use-pi-holes-built-in-dhcp-server-and-why-would-i-want-to/3026) 

## IPv4 and IPv6

[[Wake on Lan]]

### and when it's dynamically assigned

## DNS

[[Custom domains]]

### DDNS

## WAN

## DHCP

## 5G vs 2.4G

# Port forwarding, and the dangers

## Nginx and reverse proxy

[[nginx workflow]]

[[Deploying Isso Commenting System Under Nginx With Docker]]

## Docker and portainer

> [!NOTE]- Note on docker and portainer
> ![[Docker and Portainer FAQs]]

[[Docker best practices]]

[[Minecraft mega docker image]]

[[If you have two dockers on your server]]

[[How racknerd recommends installing docker and compose]]

## SSL certificates

## SSH keys and private keys

[[Setting up SSH the way I wanted]] 

Putty and PuttyGen

## Dig

[Google Apps Toolbox - Dig (DNS lookup)](https://toolbox.googleapps.com/apps/dig/)

E.g. looking for a txt record associated, or something

## Opened ports checker

[yougetsignal - Open Port Check Tool - Test Port Forwarding on Your Router](https://www.yougetsignal.com/tools/open-ports/) 

[DNS Checker - DNS Check Propagation Tool](https://dnschecker.org/)

[Port Checker - Check Open Ports Online](https://portchecker.co/)

## SOCKS5

[SOCKS5 Proxies: Residential, Dedicated, and More – Free Trial](https://decodo.com/proxies/socks5) 

## DNS over HTTPS

[DNS over TLS vs. DNS over HTTPS | Secure DNS | Cloudflare](https://www.cloudflare.com/en-ca/learning/dns/dns-over-tls/) 