---
link: https://akashrajpurohit.com/blog/resolving-missing-memory-stats-in-docker-stats-on-raspberry-pi/
byline: Akash Rajpurohit
site: Akash Rajpurohit
date created: 2024-03-23T17:00
slurped: 2025-09-07T16:13
title: Resolving Missing Memory Stats in Docker Stats on Raspberry Pi
date modified: 2025-09-07T16:14
tags:
  - slurp
---

## Introduction

Running Docker containers on your Raspberry Pi can be a great way to explore different software and services. However, encountering issues with retrieving memory usage information using `docker stats` can be frustrating. In this blog post will dive into the common reasons behind missing memory stats and guide you through the troubleshooting steps to resolve them.

## Understanding the Problem

When you run `docker stats` on your Raspberry Pi, you might encounter an issue where the memory usage information is missing and it will display `0.00%` for the memory usage. This can be frustrating as you might want to monitor the memory usage of your containers to ensure that they are not consuming too much memory.

For example I was using [cadvisor ↗️](https://github.com/google/cadvisor?ref=akashrajpurohit.com) to monitor my containers with prometheus and grafana and noticed that the memory usage was always 0.00% for all my containers.

There can be several factors can contribute to the absence of memory usage information in docker stats on your Raspberry Pi:

- **Missing cgroups memory accounting:** By default, cgroups memory accounting, a Linux kernel feature used by Docker to track resource allocation, might be disabled on your Raspberry Pi OS.
    
- **Incorrect Docker configuration:** In rare cases, your Docker configuration might require adjustments to enable memory reporting specifically for ARM architecture.
    
- **Docker version compatibility:** The version of Docker you are using might not be compatible with the Raspberry Pi OS, leading to issues with memory stats retrieval.

## Troubleshooting Steps

To resolve the issue of missing memory stats in `docker stats` on your Raspberry Pi, you can follow these troubleshooting steps:

### Verify docker info

First, you can check the output of `docker info` to verify that the memory accounting is enabled. Look for the `Cgroup Driver` and `Cgroup Version` fields in the output.

```
docker info | grep -i cgroup
```

If the values are not set, run the command `docker info` without grep and you should be seeing these warnings at the end.

```
WARNING: No memory limit supportWARNING: No swap limit support
```

### Enable cgroups memory accounting

To enable cgroups memory accounting on your Raspberry Pi OS, you can modify the `cmdline.txt` file to include the `cgroup_enable=cpuset cgroup_enable=memory cgroup_memory=1` option. This will enable memory accounting for cgroups, allowing Docker to track memory usage.

Usually the file is located at `/boot/cmdline.txt`, if it is moved somewhere else like for me it was moved to `/boot/firmware/cmdline.txt`. You can find the moved file name when you try to `cat /boot/cmdline.txt`.

Assuming your file is located at `/boot/firmware/cmdline.txt`, you can use the open the file add add the `cgroup_enable=cpuset cgroup_enable=memory cgroup_memory=1` option to the file:

```
sudo vi /boot/firmware/cmdline.txt
```

and then add these options to the end of the line:

```
cgroup_enable=cpuset cgroup_enable=memory cgroup_memory=1
```

Save and exit the file and reboot your Raspberry Pi to apply the changes.

After the reboot, you can verify that memory accounting is enabled by running `docker info` and checking the `Cgroup Driver` and `Cgroup Version` fields.

## Conclusion

By following the troubleshooting steps outlined in this blog post, you can resolve the issue of missing memory stats in `docker stats` on your Raspberry Pi.

Enabling cgroups memory accounting and verifying the Docker configuration can help you ensure that memory usage information is accurately reported for your containers. This will allow you to monitor the memory usage of your containers and take appropriate actions to optimize resource allocation and performance.

I hope this blog post has been helpful in resolving this issue. If you have any questions or suggestions, feel free to reach out to me on [Twitter ↗️](https://twitter.com/AkashWhoCodes?ref=akashrajpurohit.com) / [Reddit ↗️](https://www.reddit.com/user/Developer_Akash/?ref=akashrajpurohit.com).

See you in the next one! 👋