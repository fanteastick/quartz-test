---
date created: 2025-05-02T18:05
date modified: 2025-05-02T18:07
draft: "true"
---
# Q1
## Why Immich Shows 97.9 GiB Instead of ??TB

Immich reports available/used storage based on the storage location it is configured to use, not the total capacity of your entire system or all disks. In your case, Immich is only seeing and reporting the size of the specific filesystem or mount point where its library or data directory is located, not your entire ??TB disk.

## Key Points

- Immich calculates storage based on the mounted path: Immich only checks the size of the folder or dataset it is pointed to for its library, not the full disk or other partitions[1](https://github.com/immich-app/immich/issues/9514)[2](https://www.reddit.com/r/immich/comments/1howyar/immich_reports_wrong_used_storage/).
    
- Your `df` output: The main filesystem `/dev/mapper/ubuntu--vg-ubuntu--lv` is about 98 GB in size, which matches what Immich reports (97.9 GiB total). This means Immich's storage directory is on this partition, not on your larger ??TB disk.
    
- Your ??TB disk is not mounted as Immich's storage: If you have a ??TB disk, it is likely mounted elsewhere, or not at all, and Immich is not configured to use it.

# Q2

Correct-your current `df` output does not show a ??TB partition or filesystem mounted. Here’s what your `df` output reveals:

## What Your `df` Output Shows

- /dev/mapper/ubuntu--vg-ubuntu--lv: ~98GB (this is where your `/` root filesystem is, and where Immich is storing data)
    
- /dev/---p2: ~1.9GB (likely your `/boot` partition)
    
- /dev/---p1: ~1.1GB (likely your EFI partition)
    
- tmpfs: Temporary filesystems (RAM-backed, not persistent storage)

There is no ??TB partition listed as mounted. This means:

- The ??TB disk/partition is either not mounted, not formatted, or not present on the system as far as the OS can see.

## How to Find and Mount Your ??TB Disk

## 1. List All Disks

Run:

text

`lsblk -o NAME,SIZE,MOUNTPOINT`

or

text

`sudo fdisk -l`

This will show all disks and partitions, including those not currently mounted.

## 2. Look for the ??TB Device

Find the device (e.g., `/dev/sdb`, `/dev/nvme1n1`, etc.) that matches ~??TB.

## 3. Mount the Disk

If it’s not mounted, you can mount it. For example:

text

`sudo mkdir /mnt/bigdisk sudo mount /dev/sdX1 /mnt/bigdisk`

Replace `/dev/sdX1` with the correct device name/partition.

## 4. (Optional) Format If Needed

If the disk is unformatted, you’ll need to format it first (be careful, this erases all data on it):

text

`sudo mkfs.ext4 /dev/sdX1`

Then mount as above.

## 5. Point Immich to This Disk

Update Immich's storage path to use a directory on this mounted disk (e.g., `/mnt/bigdisk/immich`).

## Summary Table

|What You See in `df`|What It Means|
|---|---|
|No ??TB partition|Not mounted/recognized|
|98GB partition|Where Immich is storing|

If you want Immich to use the ??TB disk, you must mount it and point Immich’s storage there.

If you need step-by-step help with mounting or reconfiguring Immich, just provide the output of `lsblk` and I’ll guide you!

Add to follow-up

Check sources

---

Answer from Perplexity: [pplx.ai/share](https://www.perplexity.ai/search/pplx.ai/share)

# Q3

## Why You Only See 100GB Available

- You have allocated only 100GB out of the ??TB to your root filesystem.
    
- The rest of the space (about ??TB) is unallocated within LVM-it’s not assigned to any logical volume or filesystem, so it’s invisible to both the OS and Immich.

## What To Do Next

## 1. Check Free Space in LVM

Run:

text

`sudo vgdisplay`

Look for "Free PE / Size"-this is your unallocated space.

## 2. Expand Your Logical Volume

To make more space available to Immich (and your system), you need to extend your logical volume and filesystem. For example, to add 1TB:

text

`sudo lvextend -L +1T /dev/ubuntu-vg/ubuntu-lv sudo resize2fs /dev/ubuntu-vg/ubuntu-lv`

- Adjust the names if your volume group or logical volume have different names (use `lsblk` or `lvs` to confirm).
- If you want to use all available space, you can use `-l +100%FREE` instead of `-L +1T`.

## 3. Verify

After expanding, run `df -h` again. You should see your root filesystem (and thus Immich’s storage) with much more available space.
