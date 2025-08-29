---
date created: 2025-01-05T17:58
date modified: 2025-03-23T11:28
---
## On the same network

Bunch of useful commands: 

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install openssh-server
sudo systemctl daemon-reload
sudo systemctl start ssh
sudo systemctl status ssh
sudo apt purge openssh-server
sudo apt install openssh-server
```

Make sure to go into router settings and fix the IP address of the device. 

## Enable WOL on ASUS motherboard

[How to set and enable WOL(Wake On Lan) function in BIOS | Official Support | ASUS Global](https://www.asus.com/support/faq/1045950/)   

This actually completely messed up my wifi... argh...

- In hindsight, that makes sense because you need to be on LAN to do wake on LAN, so having wifi is counterintuitive here. 

## Tips that have been copied from a Perplexity response

Thank you perplexity 🖤

- Enable SSH to start automatically on boot. This is typically done by default when you install the SSH server.
- Configure your network to use DHCP or set a static IP address. This ensures your PC gets an IP address when it boots up.
- Consider enabling Wake-on-LAN (WoL) in your BIOS/UEFI settings. This allows you to turn on the PC remotely using a special network packet.

