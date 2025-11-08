---
date created: 2025-08-22T20:39
date modified: 2025-11-07T18:22
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
## Utilities

**Upsnap** (my shayla) which I have #self-hosted 

Tailscale blog link dump

- [Making a Wake-on-LAN server using Tailscale, UpSnap, and Raspberry Pi](https://tailscale.com/blog/wake-on-lan-tailscale-upsnap)

---

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

## Windows

- wireguard filter - udp.port = 9 or something
- firewall to open port 9
- wakeonlan on the rpi to send a ping

## Random additional things I had to do

Half of this was from Perplexity. Just dumping out text right now before I forget. 2025-08-30

### Passwordless sudo for shutdown

Configure passwordless sudo for the shutdown command on the target machine. This avoids needing to input a password at all. You can edit the sudoers file with `visudo` and add a line such as:

```
ez ALL=(ALL) NOPASSWD: /sbin/shutdown
```

### Shut off wifi

```
sudo ip link set wlp6s0 down
```

Edit netplan: /etc/netplan/* - check if ethernet enp2s0 is enabled. Add or modify ethernet settings for DHCP or static IP.

```yaml
network:
	version: 2
	renderer: networkd
	ethernets:
		enp2s0:
			dhcp4: true
```

Apply changes with `sudo netplan apply`

## WOL on windows laptop

If your Dell laptop’s Ethernet port light turns off in sleep mode and it doesn’t respond to Wake-on-LAN (WOL), it means the network adapter is losing power during sleep — so it can’t listen for the magic packet. This behavior is common on many laptops because Windows or BIOS power-saving features disable the NIC when sleeping or on battery power.

### 1. Keep the NIC powered during sleep
- Open **Device Manager** → **Network Adapters** → right-click your Ethernet device → **Properties**.
- Under **Power Management**, *uncheck* “Allow the computer to turn off this device to save power.”
- Check “Allow this device to wake the computer” and “Only allow a magic packet to wake the computer.”
- Under the **Advanced** tab:
  - Enable **Wake on Magic Packet**.
  - Enable **Shutdown Wake-On-LAN** or **Wake from shutdown** (if available).
  - Set **Energy Efficient Ethernet** or **Green Ethernet** to *Disabled*.
  - Set **WOL & Shutdown Link Speed** to *10 Mbps* or *100 Mbps* to keep the port active.[1][2][3]

### 2. Adjust BIOS/UEFI settings

Reboot and enter BIOS (usually F2 or Dell):

- Enable **Wake on LAN/WLAN** or **Wake on AC** under Power Management.
- Disable **Deep Sleep Control** or **ErP Mode**, since these cut power to the Ethernet controller entirely during sleep/off states.
- Save and exit BIOS, then retest.

### 3. Plug in AC Power

Many laptops disable WOL when running only on battery. Ensure the charger is connected; otherwise the NIC will power down even if settings are correct.

### 4. Verify Link LED behavior

When configured correctly, the Ethernet port LEDs should stay on or blink faintly when the laptop sleeps — indicating the NIC is powered and can receive a WOL packet. If completely off, power delivery is still being cut, typically by the BIOS or hardware energy-saving mode.

### Summary

Your laptop’s NIC LEDs going dark in sleep means it’s not receiving standby power, so WOL can’t function. Turn off “Deep Sleep” in BIOS, disable all power-saving Ethernet features in Windows, and keep the AC adapter plugged in. After that, the port light should remain on and WOL over Ethernet will start working reliably.

> [!note]- Sources
> [1](https://www.anyviewer.com/how-to/wol-not-working-2578.html)
> [2](https://learn.microsoft.com/en-us/answers/questions/4213518/how-to-keep-ethernet-port-powered-when-computer-is)
> [3](https://h30434.www3.hp.com/t5/Desktop-Wireless-and-Networking/Trying-Wake-On-LAN-but-the-ethernet-port-switches-off-on/td-p/8470582)
> [4](https://www.dell.com/support/kbdoc/en-us/000129137/wake-on-lan-wol-troubleshooting-best-practices)
> [5](https://www.dell.com/community/en/conversations/xps-desktops/xps-8940-wake-on-lan-wol-not-working/647f9bc6f4ccf8a8defbe66f)
> [6](https://wiki.archlinux.org/title/Wake-on-LAN)
> [7](https://www.windowscentral.com/software-apps/windows-11/how-to-enable-wake-on-lan-on-windows-11)
> [8](https://www.elevenforum.com/t/wol-wake-on-lan-not-working.13600/)
> [9](https://www.dell.com/support/kbdoc/en-us/000129781/steps-for-fixing-windows-computers-that-do-not-wake-up-or-resume-from-suspend-or-hibernate-mode-but-will-power-on)
> [10](https://www.reddit.com/r/techsupport/comments/4ps322/wake_on_lan_works_when_pc_is_asleep_but_not_when/)
> [11](https://support.logmein.com/pro/help/how-to-wake-a-computer-in-sleep-mode-or-powered-off-using-wake-on-lan-logmein-t-host-preferences-wakeonlan)
> [12](https://learn.microsoft.com/en-us/answers/questions/4183400/wake-on-lan-not-working-anymore)
> [13](https://www.reddit.com/r/computing/comments/u0q5hw/is_it_normal_for_the_ethernet_port_to_go_like/)
> [14](https://www.reddit.com/r/techsupport/comments/18yvlcn/wake_on_lan_not_working_with_windows/)
> [15](https://www.youtube.com/watch?v=qX8KBFL0jjI)
> [16](https://www.youtube.com/watch?v=LXFBk8ELLVU)
> [17](https://forums.tomshardware.com/threads/wakeonlan-not-working-ethernet-link-light-is-off-even-if-laptop-is-on-but-ethernet-connection-works-fine-because-laptop-gets-online.3865208/)
> [18](https://www.facebook.com/groups/372119787729533/posts/1068392094768962/)
> [19](https://www.dell.com/support/kbdoc/en-ed/000129137/wake-on-lan-wol-troubleshooting-best-practices)
> [20](https://h30434.www3.hp.com/t5/Desktop-Wireless-and-Networking/Wake-On-Lan-Issue/td-p/9359139)
> 

Because Dell integrates most of its low-power logic under “USB Wake Support” instead of a separate “Deep Sleep Control” flag:

- **Enable USB Wake Support** to keep peripheral and Ethernet controllers powered during sleep.
- Keep the **laptop connected to AC power**, or the ports (and thus the NIC) will lose power.
- In **Windows**, confirm that your Ethernet adapter in Device Manager has these enabled:
    - “Allow this device to wake the computer.”
    - “Only allow a magic packet to wake the computer.”
- This combined setup makes your Latitude 7450 capable of waking from **sleep (S3)** using WOL, but not from full shutdown.

> [!bug]- even more pplx info, which is basically a good summary of the steps
> If your Dell Latitude 7450 still won’t respond to Wake-on-LAN (WOL) after verifying BIOS, driver, and Windows settings, the remaining culprits are almost always related to **driver power handling**, **link state management**, or **hardware power gating**.  
> 
> 
> ***
> 
> ### 1. Update the Ethernet driver to the latest OEM version
> Outdated Realtek or Intel drivers can silently disable WOL at the firmware or Windows kernel level.  
> - Visit **Dell Support → Drivers & Downloads → Latitude 7450 → Network**.  
> - Install the most recent **Realtek USB GBE Ethernet Controller** or **Intel I219-LM** driver (depending on your adapter).  
> - This is crucial: Dell resolved a bug in early 2025 where *WolMagicPacketEnable = 0x0* prevented wake events; updated drivers restore correct behavior.[1][2]
> 
> ***
> 
> ### 2. Disable PCI Express Link State Power Management
> Windows’ “Link State Power Management” can suspend PCIe buses that carry the NIC during sleep.
> - Open Control Panel → Power Options → *Change plan settings* → *Change advanced power settings* → *PCI Express → Link State Power Management*.  
> - Set **Plugged in = Off**.[3][4]
> - Restart the laptop.
> 
> ***
> 
> ### 3. Verify Device Manager advanced options
> In **Device Manager → Network Adapter → Properties:**
> - **Advanced Tab:**  
>   - Wake on Magic Packet = Enabled  
>   - Wake on Pattern Match = Enabled  
>   - “Reduce Speed During Standby” = Disabled (if present)  
>   - “Energy Efficient Ethernet” = Disabled  
>   - “Green Ethernet” = Disabled  
> - **Power Management Tab:**  
>   - “Allow the computer to turn off this device to save power” = *checked*  
>   - “Allow this device to wake the computer” = *checked*  
>   - “Only allow a magic packet to wake the computer” = *checked*  
> 
> If these don’t show, reinstall Dell’s custom NIC driver package.
> 
> ***
> 
> ### 4. Confirm BIOS Wake Settings
> Reboot → **F2** to enter BIOS → *Power Management.*  
> Ensure:
> - **Wake on LAN/WLAN:** *Enabled*  
> - **USB Wake Support:** *Enabled*  
> - **Block Sleep (S3):** *Disabled*  
> - **Modern Standby (S0ix)**: if available, either disable or test with it off — some firmware implementations disable Ethernet during Modern Standby.[2][5]
> 
> ***
> 
> ### 5. Avoid Dell monitor RJ45 adapters or docks
> If you’re testing through a **Dell dock or monitor’s RJ45 port**, such as a Dell U3425WE or WD19, the embedded network controller may not forward WOL packets when the system sleeps. Connect the Ethernet cable directly to the laptop’s NIC instead. Dell confirmed this as a known cause in Windows 11.[1]
> 
> ***
> 
> ### 6. Test wake while laptop is in S3 vs Hibernate
> Windows 11 and some Dell firmware don’t permit WOL from hibernate (S4) or Modern Standby (S0ix).  
> Try explicitly putting the laptop into **S3 Sleep** with:
> ```bash
> powercfg /hibernate off
> ```
> Then test WOL again.[6][7][1]
> 
> ***
> 
> ### 7. Still no LED activity?
> If the **Ethernet LED** goes off entirely when asleep, your NIC is losing power due to a firmware gate. There is no reliable workaround for that besides disabling low-power states in BIOS/Firmware — which Dell limits on most Latitude laptops for energy compliance. In such cases, **Wake-on-LAN from Sleep** is unsupported, and only **Wake from Dock or Power button** remains available.[8][6][1]
> 
> ***
> 
> In short:  
> 1. Install the newest Dell LAN driver (critical fix in 2025).  
> 2. Disable Link State Power Management.  
> 3. Recheck BIOS → Wake on LAN/WLAN ON, Modern Standby OFF.  
> 4. Test with Ethernet directly plugged into the laptop (no docks).  
> 5. Confirm you're testing from S3 sleep — not hibernate or Modern Standby.  
> 
> Following those steps resolves virtually every Latitude 7450 WOL failure reported since mid‑2024.[4][3][2][1]
> 
> [1](https://www.dell.com/support/kbdoc/en-us/000223411/computer-cannot-wake-from-hibernate-using-wake-on-lan-when-connected-to-monitor-rj45-port)
> [2](https://www.dell.com/support/kbdoc/en-yt/000129137/wake-on-lan-wol-troubleshooting-best-practices?lang=en)
> [3](https://www.youtube.com/watch?v=ofszjnyuuy0)
> [4](https://www.youtube.com/watch?v=wmnhR_kZ1lY)
> [5](https://www.dell.com/support/kbdoc/en-us/000129137/wake-on-lan-wol-troubleshooting-best-practices)
> [6](https://www.reddit.com/r/techsupport/comments/mizh2z/troubleshooting_wol_on_dell_laptop/)
> [7](https://www.reddit.com/r/techsupport/comments/18yvlcn/wake_on_lan_not_working_with_windows/)
> [8](https://www.reddit.com/r/homelab/comments/1lr0mvm/ive_tried_every_single_fix_for_wakeonlan_i_could/)
> [9](https://learn.microsoft.com/en-us/answers/questions/3839327/pc-wont-connect-to-ethernet-after-waking-up-from-s)
> [10](https://www.youtube.com/watch?v=qX8KBFL0jjI)