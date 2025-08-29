---
date created: 2025-07-14T21:24
date modified: 2025-07-15T02:00
---
## Samba setup

Samba is a file server/network drive thing. 

```
# install
sudo apt install samba samba-common-bin
# check if you alr have it
smbd -V
sudo service smbd status
systemctl status smbd

# Need to restart samba after every change to the settings
sudo systemctl restart smbd
```

### Samba config file

Edit with sudo nano: `/etc/samba/smb.conf`

```
[shared]
path = /home/server/shared
writeable = yes
create mask = 0777
directory mask = 0777
public = yes
guest ok = yes
```

Set a password for the server user: `sudo smbpasswd -a server` (when did i create a user..?)

Make sure the folder exists

```
mkdir -p /home/server/shared
chmod 777 /home/server/shared
```

## Add server to another device to see the files

```
# Find the origin server's IP address on tailscale
tailscale ip -4
```

### Add network drive to windows file explorer

This PC -> right click -> Map network drive -> choose a letter -> enter folder path

The folder path should be `\\<tailscale-ip>\shared`. Note that we named it `[shared]` in the samba config. Then you might need to put in your password, then Reconnect at sign-in. 

### Change the server's ufw settings

```
sudo ufw status
# On only your own IP:
sudo ufw allow from 192.168.1.0/24 to any port 445 proto tcp
sudo ufw allow from 192.168.1.0/24 to any port 139 proto tcp
```

Figure out local network range with `ipconfig`

### Change the shared folder permissions

Of course, it needs to be editable by your samba user.

```
ls -ld /home/shared
sudo chown -R server:server /home/shared
sudo chmod -R 775 /home/shared
```

## Obsidian git and changing the ownership and mounting the drive in wsl

Dubious ownership message

### Mount the drive: 

```
# mounting the drive in WSL
sudo mkdir /mnt/z
sudo mount -t drvfs Z: /mnt/z
# also i had to do something like \usr server <password>
```

Persistent the mount by auto-mounting on wsl start: add the below to `/etc/fstab`

```
Z: /mnt/z drvfs defaults 0 0
```

and then run `sudo mount -a`

### Figure out top level owner
```
git rev-parse --show-toplevel
```

Then Git gave a message such as 

```
fatal: detected dubious ownership in repository at '/mnt/z/<FOLDER>'
To add an exception for this directory, call:
	git config --global --add safe.directory /mnt/z/<FOLDER>
```

## In the end...

Turns out having obsidian over a samba share slows down the user experience a lot, since obsidian relies on auto-saves (aka, frequently reading files). So I'll do something with rsync instead. 

> [!web]- Crontab instructions via perplexity
> Create a script (e.g., `~/sync-obsidian.sh`):
> 
> ```bash
> #!/bin/bash
> rsync -av --delete /path/to/your/local/obsidian-vault/ /mnt/shared/obsidian-vault-backup/
> ```
> 
> - Replace `/path/to/your/local/obsidian-vault/` with your vault directory.
> - Replace `/mnt/shared/obsidian-vault-backup/` with where on your share you want the backup.
> 
> Make it executable:
> 
> ```bash
> chmod +x ~/sync-obsidian.sh
> ```
> 
> Edit your crontab:
> 
> ```bash
> crontab -e
> ```
> 
> Add this line (runs every 30 minutes):
> 
> ```
> */30 * * * * /home/youruser/sync-obsidian.sh
> ```
> 

> [!web]- Perplexity on persisting the wsl mount
> To **make your mount persist between WSL sessions**, you should use the Linux standard `/etc/fstab` file, together with appropriate WSL config settings. This ensures your network or Windows drive mounts are *automatically* restored each time you start WSL.
> 
> Here’s how to do it:
> 
>  1. **Update `/etc/wsl.conf` (optional, recommended)**
> 
> This configures WSL to process your `/etc/fstab` on startup:
> 
> Open (or create) `/etc/wsl.conf` in your WSL distro:
> 
> ```bash
> sudo nano /etc/wsl.conf
> ```
> 
> Add (or ensure you have):
> 
> ```ini
> [automount]
> enabled = true
> mountFsTab = true
> ```
> 
> Save the file.
> 
>  2. **Edit `/etc/fstab`**
> 
> This file defines mounts that should happen at startup, just like on a regular Linux system.
> 
> Open `/etc/fstab`:
> 
> ```bash
> sudo nano /etc/fstab
> ```
> 
> **For a Windows drive** (for example, Z: mounted to `/mnt/z`):
> ```
> Z: /mnt/z drvfs defaults 0 0
> ```
> 
> **For a Samba/SMB network share:**
> ```
> # Example for a Samba share
> //192.168.0.34/shared /mnt/shared cifs credentials=/home/youruser/.smbcredentials,uid=1000,gid=1000,iocharset=utf8 0 0
> ```
> - Adjust paths and credentials as needed.
> - Make sure the mount target directory (e.g., `/mnt/z` or `/mnt/shared`) exists.
> 
>  3. **Test Your `/etc/fstab`**
> 
> After editing, test your mounts:
> 
> ```bash
> sudo mount -a
> ```
> 
> Fix any errors reported—they must all succeed for auto-mount at startup to work.
> 
>  4. **Restart WSL**
> 
> - Exit all WSL windows.
> - Run in Windows command prompt or PowerShell:
>   ```
>   wsl --shutdown
>   ```
> - Re-open your WSL distro. Your mount(s) should now be present automatically.
> 
>  **How it works**
> 
> - **`/etc/fstab`** is read by WSL on each launch *if* `mountFsTab = true` is set in `/etc/wsl.conf`
> - Mounts defined there (Windows drives, Samba shares, etc.) are auto-mounted each time your WSL environment starts.
> 
