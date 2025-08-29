---
date created: 2025-07-29T10:12
date modified: 2025-07-30T00:05
---

[How Rsync Works](https://rsync.samba.org/how-rsync-works.html) 

- very good explanation on how it works under the hood ish

[How To Use Rsync to Sync Local and Remote Directories | DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories) 

[Keeping Linux files and directories in sync with rsync](https://www.redhat.com/en/blog/sync-rsync) 

- great description of the command line switches and how you would set it up, pretty short article though

## Example rsync for quartz

```
rsync -av --exclude '.obsidian/' /mnt/c/Users/${USER}/${REST OF THE PATH}/content/ ./content/
```

Add `--dry-run` to just show the output of what would happen. 