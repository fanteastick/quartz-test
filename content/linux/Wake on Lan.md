---
date created: 2025-08-22T20:39
date modified: 2025-08-27T17:10
---

It uses port 9. Relevant for windows setup.

## apt install

- etherwake
- ifconfig
- net-tools
- wakeonlan
- ethtool

## Mac address

IP address as well. Also netmask???

```
wakeonlan <ip address>; wakeonlan <MAC address>
Sending magic packet to 255.255.255.255:9 with <MAC address>

# wifi driver causing issues

echo "blacklist wil6210" | sudo tee /etc/modprobe.d/blacklist-wil6210.conf
wlp3s0 got disabled
```
## utilities

Upsnap (my shayla)

Tailscale blog link dump

- [Making a Wake-on-LAN server using Tailscale, UpSnap, and Raspberry Pi](https://tailscale.com/blog/wake-on-lan-tailscale-upsnap)
- [Four increasingly sophisticated ways to put a service on your tailnet](https://tailscale.com/blog/four-ways-tailscale-service#3-install-the-service-in-a-container-and-use-a-tailscale-sidecar) 
- [Contain your excitement: A deep dive into using Tailscale with Docker](https://tailscale.com/blog/docker-tailscale-guide) 
## BIOS settings

Thanks Perplexity

1. **Enter UEFI BIOS:**
    - When powering on your ASUS computer, press and hold the **Del** key while pressing the **Power button** to enter the BIOS setup.
    - Alternatively, repeatedly press **F2** during boot to access the UEFI BIOS.
2. **Go to Advanced Mode:**
    - In the BIOS screen, press **F7** or click to switch from EZ Mode to Advanced Mode.
3. **Navigate to Advanced > APM Configuration:**
    - Find the **Advanced** tab.
    - Select **APM Configuration**.
4. **Enable Wake-on-LAN:**
    - Find the setting **Power On By PCI-E** or **Power On By PCI** and set it to **Enabled**.
    - Find **ErP** (Energy-related Products) and set it to **Disabled** (ErP can prevent WoL from working).

## Windows defender firewall

To allow Wake-on-LAN (WOL) packets and UpSnap pings to go through the Windows firewall, you need to create inbound firewall rules that allow the relevant network traffic:

1. Allow Wake-on-LAN Magic Packets (UDP Port 9)

- Open **Windows Defender Firewall with Advanced Security** (search from Start menu).
- Select **Inbound Rules** on the left.
- Click **New Rule...** on the right.
- Select **Port** rule type and click **Next**.
- Choose **UDP** and specify **Specific local ports:** `9` (standard WoL port).
- Click **Next**, select **Allow the connection**.
- Apply to all profiles (Domain, Private, Public) if you use different networks.
- Name the rule like "Allow WoL Magic Packet UDP 9" and finish.

2. Allow ICMP Echo Requests (Ping)

- In the **Inbound Rules** list, find the rules named:
    
    - **File and Printer Sharing (Echo Request - ICMPv4-In)**
    - Enable these rules for the network profile(s) you use (Private, Domain).
- If not found, create a new inbound rule for allowing ICMPv4 Echo Request as follows:
    
    - Select **Custom** rule type.
    - Protocol type: choose **ICMPv4**.
    - On the next screen, specify **Allow the connection**.
    - Choose the profiles where you want ping enabled.
    - Name the rule "Allow ICMPv4 Echo Request" and finish.

3. Ensure Network Profile is Correct

- The firewall rules apply based on the network profile (Private, Domain, Public) your PC connection uses.
- Make sure your active network profile matches the profiles selected in the rules.

## 4. Additional Tips

- Disable "Fast Startup" in Windows Power Options if WOL still doesn’t work after firewall configuration.
- Confirm BIOS/UEFI WOL settings are enabled.
- Restart your PC after applying these firewall changes.

This will allow UpSnap to ping your Windows device and send WOL magic packets successfully from your Raspberry Pi.

If you want, I can provide PowerShell commands to automate these firewall rules setup.

## Windows

[Get started with OpenSSH Server for Windows \| Microsoft Learn](https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse?tabs=gui&pivots=windows-11) 

- openssh
- wireguard filter - udp.port = 9 or something
- firewall to open port 9
- wakeonlan on the rpi to send a ping