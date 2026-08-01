---
date created: 2025-09-10T14:42
date modified: 2026-03-06T16:28
subtitle: takes forever...
---
```
docker buildx build --platform linux/arm64 -f ./Dockerfile --no-cache -t username/image:version --push .
```

[[Build and push docker image as a github action]]

Buildkit propaganda:  [BuildKit: Docker's Hidden Gem That Can Build Almost Anything - Tuan-Anh Tran](https://tuananh.net/2026/02/25/buildkit-docker-hidden-gem/) 

# Changing architectures cheatsheet

```
# Figure out what arch you have
uname -m

# Docker login 
docker login

# Enable multiplatform builder
docker buildx create --name mybuilder --use --bootstrap
docker buildx ls
docker buildx inspect mybuilder
docker buildx inspect --bootstrap


# Go to the repo
git clone <> 
cd <>

# Find the Dockerfile and edit it
???

# Rebuild and push to your account
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  --tag yourusername/container-multiarch:latest \
  --push .
```

Round 2:

```
docker buildx build --platform linux/amd64,linux/arm64 -t user/container:latest .
docker login
docker login
docker tag yourimageid yourusername/yourrepo:tag
docker images
docker push yourusername/yourrepo:tag

e.g. 
docker buildx build --platform linux/arm64 --build-arg ANKI_VERSION=25.09 -t username/sync-server:1 --push .
```

Make sure you put in the right username! 

See your repositories at https://hub.docker.com/repositories/username

## QEMU enabled builder

> [!web]- Perplexity
> To update and install the latest QEMU emulators on your Docker build host and enable multi-architecture builds (especially ARM emulation), follow these steps:
> 
> ### 1. Install or Update QEMU on Host (Linux example)
> Run this to install or update QEMU and binfmt support:
> ```sh
> sudo apt update
> sudo apt install -y qemu-user-static binfmt-support
> ```
> 
> ### 2. Register QEMU Emulators in Docker
> Register all supported binary formats for emulation by running this privileged Docker command:
> ```sh
> docker run --privileged --rm tonistiigi/binfmt --install all
> ```
> This installs QEMU emulators and enables `binfmt_misc` kernel features so Docker can transparently run non-native architectures.
> 
> ### 3. Create/Bootstrap Docker Buildx Builder
> Create and switch to a buildx builder that supports multi-arch:
> ```sh
> docker buildx create --name multiarch-builder --driver docker-container --bootstrap
> docker buildx use multiarch-builder
> ```
> 
> ### 4. Build Multi-Arch Images with QEMU Emulation Enabled
> Now you can build multi-platform images:
> ```sh
> docker buildx build --platform linux/amd64,linux/arm64 -t yourusername/image:tag --push .
> ```
> 
> ***
> 
> ### Important Notes
> - Docker Desktop on macOS and Windows ships with built-in QEMU emulators and requires no manual installation.
> - On Linux hosts, you must manually install QEMU and run the registration command above.
> - The QEMU emulation might be slower and sometimes unstable; for heavy builds, consider native ARM hardware or cloud ARM builders.
> - Verify QEMU registration by checking `/proc/sys/fs/binfmt_misc`:
> ```sh
> cat /proc/sys/fs/binfmt_misc/qemu-aarch64
> ```
> Look for a line including `enabled` or `F` flag.
> 
> ***
> 
> **Summary:**  
> Ensure QEMU user mode emulators and binfmt support are installed on your build host, run the privileged registration container from `tonistiigi/binfmt`, then create and use a docker buildx builder with multi-platform support. This setup fixes common segmentation faults and allows multi-arch builds with emulation.[2][4][7]
> 
> [1](https://forums.docker.com/t/has-the-qemu-up-gradation-been-reverted-in-docker-desktop-4-28-0-for-mac-with-apple-chip/140171)
> [2](https://stackoverflow.com/questions/70307527/how-to-install-qemu-emulator-for-arm-in-a-docker-container)
> [3](https://github.com/qemus/qemu)
> [4](https://dev.to/andersonpem/setting-up-multi-architecture-docker-builds-with-qemu-22mg)
> [5](https://www.reddit.com/r/docker/comments/yhvp50/how_to_force_docker_to_run_image_in_qemu/)
> [6](https://github.com/docker/for-mac/issues/6620)
> [7](https://docs.docker.com/build/building/multi-platform/)
> [8](https://wiki.qemu.org/Hosts/Linux)
> [9](https://forums.docker.com/t/run-qemu-in-docker/42311)

## Building locally

```
docker build -t imagename .
docker images

## Push it to repo later

docker tag localimage yourusername/repository:tag
docker push yourusername/repository:tag
```

- **Storage location**: On Linux, images and containers are stored under `/var/lib/docker/` (specifically in subfolders like `overlay2`, `image`, etc.).
- **Lifetime**: The image will not be deleted automatically. It persists on your system until you explicitly remove it with `docker rmi imagename`, or wipe your Docker install/storage. Docker will not clean up images unless you tell it to.
# Thanks Perplexity

Common `--platform` options include:

- `linux/amd64` (typical 64-bit x86 architecture)
- `linux/arm64` (64-bit ARM architecture)
- `linux/arm/v7` (32-bit ARMv7 architecture)
- `linux/386` (32-bit x86 architecture)
- `linux/ppc64le` (PowerPC 64-bit little endian)
- `linux/s390x` (IBM Z mainframe)
- `windows/amd64` (Windows 64-bit x86 architecture)

**aarch64** is 64 bit arm

|Action|Result|
|---|---|
|Build local image|Remains on your host, in `/var/lib/docker/` (Linux)|
|Untagged to account|Only local, doesn't appear in Docker Hub|
|Deleted automatically|No—persists until removed manually|
|See images|`docker images`|
|Remove image|`docker rmi imagename`|
|Make portable/push|Tag then `docker push`|

## What a Dockerfile Does

A Dockerfile is a plain text file that contains a sequence of instructions used by Docker to build a Docker image. These instructions automate the assembly of an image that includes everything needed to run an application—code, environment, dependencies, and runtime configuration. For example, instructions like `FROM` specify the base image, `COPY` transfers files, `RUN` executes commands, and `CMD` defines the default command when running a container. This process ensures consistency and reproducibility of application environments across development, testing, and production.

## How to Make a Dockerfile
- Create a new text file named `Dockerfile` without an extension.
- Use Docker instructions such as:
  - `FROM` to set the base image,
  - `WORKDIR` to set the working directory inside the image,
  - `COPY` to add files from your local system to the image,
  - `RUN` to execute commands during build,
  - `CMD` or `ENTRYPOINT` to specify the runtime command.
- Example for a Node.js app:
  ```
  FROM node:20
  WORKDIR /app
  COPY package.json /app
  RUN npm install
  COPY . /app
  CMD ["node", "server.js"]
  ```
- Build the image by running `docker build -t yourusername/imagename .` in the directory containing the Dockerfile.

## What It Means to Put an Image on the Docker Registry with Your Docker Account
- A Docker registry like Docker Hub is a cloud-based repository where Docker images are stored and shared.
- "Putting an image on the Docker registry" means pushing your locally built Docker image to Docker Hub or another registry under your account. This makes the image accessible from anywhere.
- To do this:
  - Login to Docker Hub on your machine using `docker login` with your Docker account credentials.
  - Tag your image with your Docker Hub username: `docker tag imagename yourusername/imagename`
  - Push the image: `docker push yourusername/imagename`
- Once pushed, the image is stored in your Docker Hub repository and can be pulled and used on other machines or cloud services.

## Useful Links for Further Reading and Tutorials
- Docker official docs: Build and push your first image  
  https://docs.docker.com/get-started/introduction/build-and-push-first-image/
- How a Dockerfile works (detailed tutorial)  
  https://kodekloud.com/blog/how-dockerfile-works/
- Step-by-step beginner's guide to building Docker images  
  https://stackify.com/docker-build-a-beginners-guide-to-building-docker-images/

Sources: [1](https://kodekloud.com/blog/how-dockerfile-works/) [2](https://docs.docker.com/get-started/introduction/build-and-push-first-image/) [3](https://spacelift.io/blog/dockerfile) [4](https://stackify.com/docker-build-a-beginners-guide-to-building-docker-images/) [5](https://www.geeksforgeeks.org/cloud-computing/what-is-dockerfile/) [6](https://cloud.google.com/build/docs/build-push-docker-image) [7](https://www.simplilearn.com/tutorials/docker-tutorial/what-is-dockerfile) [8](https://docker-curriculum.com) [9](https://docs.docker.com/build/concepts/dockerfile/) [10](https://docs.cavatica.org/docs/upload-your-docker-image-with-a-dockerfile)