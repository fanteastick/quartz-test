---
date created: 2025-07-18T23:03
date modified: 2025-07-18T23:59
draft: "true"
---

Documentation: [Welcome to Syncthing’s documentation! — Syncthing documentation](https://docs.syncthing.net/) 

[Best practices for git repositories within a Syncthing folder? : r/Syncthing](https://www.reddit.com/r/Syncthing/comments/a3nn4n/best_practices_for_git_repositories_within_a/)

💬 Grand_Alarm_1314

> When using syncthing to synchronize a git repo, do not make concurrent changes (one person developing on branch A in the repo, another developing on branch B in the repo). The reason is that syncthing's synchronization is on-the-fly, and on-the-fly synchronization of concurrent changes can damage the repo. In fact, git's sync is only synchronized when `push` is executed, and git was invented to solve the problem of instantaneous sync that prevents multiple users from contributing to development.
> 
> So if you're just an individual user, just give both devices enough time to synchronize before you do anything.

## Setup

[Synchronizing Files on your Raspberry Pi with Syncthing - Pi My Life Up](https://pimylifeup.com/raspberry-pi-syncthing/) 

```
sudo apt update
sudo apt upgrade

sudo apt install apt-transport-https
curl -s https://syncthing.net/release-key.txt | gpg --dearmor | sudo tee /usr/share/keyrings/syncthing-archive-keyring.gpg >/dev/null
echo "deb [signed-by=/usr/share/keyrings/syncthing-archive-keyring.gpg] https://apt.syncthing.net/ syncthing stable" | sudo tee /etc/apt/sources.list.d/syncthing.list
sudo apt update
sudo apt install syncthing

# start service
syncthing
# edit config or just view
nano ~/.local/state/syncthing/config.xml

# set it up as a service
sudo systemctl enable syncthing@$USER
sudo systemctl start syncthing@$USER
sudo systemctl status syncthing@$USER
```

The config file is located at `~/.local/state/syncthing/config.xml`

The port that the gui is on is located in the `<address>` tags in the `<gui>` section. May need to unblock the port in UFW in order to access it off another device on the network (lol!). 

On windows, find the app data files with `%LOCALAPPDATA%\Syncthing` in the Explorer.