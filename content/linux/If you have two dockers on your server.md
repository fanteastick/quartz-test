---
date created: 2025-04-16T22:56
date modified: 2025-04-16T23:06
---

argh! that's why I was getting permissions issues

1) check for two dockers:

```
docker version
pidof dockerd
which docker
snap list | grep docker
apt list --installed | grep docker
```

2) remove all the containers controlled by the snap docker

```
docker ps -a
docker rm -f $(docker ps -a -q)
```

3) Uninstall the snap docker

```
sudo snap stop docker
sudo snap remove docker
```

4) Reboot the system to restore the `/var/run/docker.sock`