---
date created: 2025-04-30T11:39
date modified: 2025-04-30T11:45
---

[Steps for limiting outside connections to docker container with iptables? - Server Fault](https://serverfault.com/questions/704643/steps-for-limiting-outside-connections-to-docker-container-with-iptables/933803#933803) 

[Steps for limiting outside connections to docker container with iptables? - Server Fault](https://serverfault.com/questions/704643/steps-for-limiting-outside-connections-to-docker-container-with-iptables/933803#933803) 

## Setting iptables rules

```bash
# For any source accept our IP, block the packet
iptables -I DOCKER-USER -i eth0 -p tcp --dport 80 ! -s [YOUR_IP] -j DROP
# Allow the packet to your IP
sudo iptables -I DOCKER-USER -p tcp --dport 9000 -s [YOUR_IP] -j ACCEPT
# Kind of extra, but explicitly accept the packets from anywhere for the port
sudo iptables -I DOCKER-USER -p tcp --dport 3300 -j ACCEPT
# Make sure the settings persist
sudo apt-get install iptables-persistent
sudo iptables-persistent save
# Check your settings
iptables -L DOCKER-USER -n --line-numbers
```

Deleting

```
sudo iptables -D DOCKER-USER [LINE_NUMBER]
sudo iptables -D DOCKER-USER -i eth0 -p tcp --dport 80 ! -s [YOUR_IP] -j DROP
```

> [!web] Perplexity
> If the service doesn’t need public access, bind the port to 127.0.0.1:
> 
> ```
> docker run -p 127.0.0.1:80:80 [IMAGE]
> ```
> This restricts the port to localhost, but you’ll need SSH tunneling for external access.
> 
> It matters that your firewall rule is in the **DOCKER-USER** chain because Docker’s networking is managed with its own set of iptables rules, and the DOCKER-USER chain is specifically designed for user-defined rules that control container traffic **before Docker’s own rules are processed**

