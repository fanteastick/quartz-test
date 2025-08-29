---
date created: 2025-03-05T17:20
date modified: 2025-07-02T23:33
---

FAQ, Frequently Asked (by me) Questions

- [ ] mounts and where your files are stored (kind of addressed by )
- [ ] docker file vs docker compose, like how the  build process works and how it gets uploaded to docker hub vs accessed locally

## Misc links

[Portainer Setup Guide With Automatic HTTPS & OAuth SSO via Authelia • Helge Klein](https://helgeklein.com/blog/portainer-setup-guide-with-automatic-https-oauth-sso-via-authelia/) 

[Remote Access | Plex Support](https://support.plex.tv/articles/200289506-remote-access/) 

[SWAG - LinuxServer.io](https://docs.linuxserver.io/general/swag/) 

[GitHub - nickjj/docker-node-example: An example Node / Express app that's using Docker and Docker Compose.](https://github.com/nickjj/docker-node-example?tab=readme-ov-file#running-this-app) 

## Portainer stacks == Docker compose

[Stacks = docker-compose, the Portainer way](https://www.portainer.io/blog/stacks-docker-compose-the-portainer-way) accessed 2025-03-05

> So what is the Stacks option? The Stacks, as Portainer calls them, are sets of features that will allow you to start and run your container(s) using a well-structured docker-compose.yml file. 

## Portainer networks == Docker networks

[Networks | Portainer Documentation](https://docs.portainer.io/user/docker/networks) accessed 2025-03-05

> [!NOTE] bridge
> 
> If you don’t specify a driver, this type of network will be created by default. Bridge networks are normally used when your applications run in standalone containers that need to communicate with each other.

## Rebuilding a docker image based on your system architecture

```bash
git clone https://github.com/shommey/dockerized-quartz.git
docker build --platform=$(uname -m) -t shommey/dockerized-quartz:latest .
```

Then the last line will be something like ` => => naming to docker.io/shommey/dockerized-quartz:latest` which you can put in the docker compose file:

```
version: '3'
services:
  quartz:
    image: docker.io/shommey/dockerized-quartz:latest
    ...
```

## In the console, you can install a text editor

```
docker exec -it <container_name> /bin/bash
apt-get update
apt-get install -y nano
```

Alternatively in an alpine-based container: `apk add nano`

Perplexity says: If you want nano available every time you start the container, add these commands to your Dockerfile: `RUN apt-get update && apt-get install nano -y`

## Seeing the logs

[How to View Docker Container Logs - A Step-by-Step Guide | SigNoz](https://signoz.io/guides/docker-view-logs/)

## Docker pruning

[Prune unused Docker objects | Docker Docs](https://docs.docker.com/engine/manage-resources/pruning/)

## Remove old stacks that are no longer needed

```
docker compose -p mc-vanilla down --remove-orphans --volumes
```

## Linking paths and bind mounts and named volumes

Thanks Perplexity

To link a specific file from your host filesystem (e.g., /home/user/whitelist.yml) to a specific location inside a Docker container (e.g., data/whitelist.yml), you should use a bind mount in your docker-compose.yml file. Here’s how to do it:

Example docker-compose.yml:

```
services:
  your_service:
    image: your_image
    volumes:
      - /home/user/whitelist.yml:/data/whitelist.yml
```

To use a different source directory on your host (e.g., /home/user/mc-data-2) instead of a relative path like ./mc-data, simply specify the absolute path in your docker-compose.yml under the volumes section for your service.

Example:

```
services:
  your_service:
    image: your_image
    volumes:
      - /home/user/mc-data-2:/data
```

## Start a specific compose file

```
docker compose -f /path/to/fred.yml up -d
```

[Educational resources | Docker Docs](https://docs.docker.com/get-started/resources/)

## See all the containers and ports

```
docker ps
docker container ls --format "table {{.ID}}\t{{.Names}}\t{{.Ports}}" -a
```

## Enter the shell for a container

```
 docker ps
 docker exec -it <container id> sh
 ls -lrt /*
```
