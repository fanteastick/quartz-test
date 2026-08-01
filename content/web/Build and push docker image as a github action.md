---
date created: 2026-03-06T13:49
date modified: 2026-03-06T13:50
tags:
  - git
---

[Build and push Docker images · Actions · GitHub Marketplace · GitHub](https://github.com/marketplace/actions/build-and-push-docker-images)

^^ this is the documentation for it. 

This is the multi-platform example from docker docs: [Multi-platform image \| Docker Docs](https://docs.docker.com/build/ci/github-actions/multi-platform/) 

```
name: ci

on:
  push:

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ vars.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Set up QEMU
        uses: docker/setup-qemu-action@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Build and push
        uses: docker/build-push-action@v6
        with:
          platforms: linux/amd64,linux/arm64
          push: true
          tags: user/app:latest
```

