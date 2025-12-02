---
date created: 2025-10-17T21:19
date modified: 2025-10-17T22:09
---

Especially after it's been used as a boot media or iso flashed. 

Thanks Perplexity!

When you see "unallocated" space in Windows Disk Management after deleting partitions, that space is free but not yet assigned or formatted as a usable partition.

## If You Can't Delete Some Partitions:

- **System Reserved, Recovery, or EFI partitions:**  
    Windows protects essential partitions like EFI system partitions, recovery partitions, and OEM partitions to keep your OS and firmware working. These cannot be deleted from normal Disk Management or even sometimes with DiskPart unless you use special tools or commands and understand the risks.
- **To deal with undeletable partitions:**
	- Use **DiskPart** (Command Prompt with admin rights) for more control.
> [!attention]
> - Run commands `list disk`, `select disk X`, then `list partition` to see all partitions. Use `select partition Y` and `delete partition override` to forcibly delete, but only do this if you're sure the partition isn't critical.

- Keep in mind deleting system or recovery partitions can break boot or recovery functionality.
- **How to use Disk Management for unallocated space:**  
    To use unallocated space, you must either create a **new partition** ("New Simple Volume") or **extend** an existing partition adjacent to it ("Extend Volume").
- If "Extend Volume" is greyed out, it is usually because the unallocated space is not immediately next to the partition you want to extend.

## Recommendations:

- Be cautious deleting protected/system partitions; only delete partitions you have created or know are safe to remove.
- Use free third-party tools like **EaseUS Partition Master** or **MiniTool Partition Wizard** to visually manage partitions more flexibly and safely merge or resize partitions even when Disk Management struggles.[diskpart+4](https://www.diskpart.com/articles/delete-unallocated-partition-7201.html)​

In summary, unallocated space itself cannot be deleted — you create or extend partitions from it. For locked partitions, use DiskPart with override carefully or a third-party partition manager for greater control. Always back up important data before deleting or resizing partitions to avoid data loss.

1. [https://www.diskpart.com/articles/delete-unallocated-partition-7201.html](https://www.diskpart.com/articles/delete-unallocated-partition-7201.html)
2. [https://www.youtube.com/watch?v=yMg5tam5Yvo](https://www.youtube.com/watch?v=yMg5tam5Yvo)
3. [https://www.easeus.com/partition-master/delete-unallocated-space.html](https://www.easeus.com/partition-master/delete-unallocated-space.html)
4. [https://www.tenforums.com/tutorials/96684-delete-volume-partition-windows-10-a.html](https://www.tenforums.com/tutorials/96684-delete-volume-partition-windows-10-a.html)
5. [https://www.reddit.com/r/pchelp/comments/1fvpev2/disk_0_unallocated_space_cannot_delete/](https://www.reddit.com/r/pchelp/comments/1fvpev2/disk_0_unallocated_space_cannot_delete/)
6. [https://www.youtube.com/watch?v=TsjDR16rbjk](https://www.youtube.com/watch?v=TsjDR16rbjk)
7. [https://learn.microsoft.com/en-us/answers/questions/4258180/i-cant-delete-unallocated-space](https://learn.microsoft.com/en-us/answers/questions/4258180/i-cant-delete-unallocated-space)
8. [https://www.youtube.com/watch?v=wpon4oAGFdk](https://www.youtube.com/watch?v=wpon4oAGFdk)
9. [https://support.microsoft.com/en-us/windows/disk-management-in-windows-ad88ba19-f0d3-0809-7889-830f63e94405](https://support.microsoft.com/en-us/windows/disk-management-in-windows-ad88ba19-f0d3-0809-7889-830f63e94405)

---

# And then setting it up to be recognized again

If your USB is not recognized anymore after wiping partitions in Windows Disk Management, it's usually because there is no valid partition or filesystem on it to mount and assign a drive letter.

### How to fix this in Windows:

1. **Open Disk Management:** (Right-click Start > Disk Management) and find your USB drive showing as unallocated.

2. **Create a new partition:**  
   - Right-click the unallocated space → **New Simple Volume**.  
   - Follow the wizard to create and format the partition, choosing FAT32 or exFAT for compatibility.  
   - Assign a drive letter during this process.

3. **If the USB is not showing up at all:**  
   - Open **DiskPart** from an Administrator Command Prompt:  
     ```
     diskpart
     list disk
     select disk X  # replace with your USB disk
     clean
     create partition primary
     format fs=exfat quick
     assign
     exit
     ```

   This wipes all partitions, then creates and formats a fresh partition for use.

4. **If Windows Disk Management or DiskPart can't access the USB:**  
   - Try a third-party tool like **Rufus** or **EaseUS Partition Master** to reinitialize, format, and restore functionality.  
   - Sometimes flashing Linux ISOs or partial wipes can corrupt the partition table or use file systems Windows cannot read.

5. **Check device status:**  
   Use *Device Manager* to verify the USB is detected at a hardware level. If not, test on another PC or try other USB ports to rule out hardware failure.

6. **Final note:**  
   Persistent failures may indicate the USB drive is physically damaged or its firmware corrupted, which software cannot fix.

Following these steps should restore your USB drive's functionality after wiping partitions so it can show up in File Explorer and be usable again.[1][2][3][6]

If you want, guidance on using Rufus or third-party tools for recovery can be provided.

[1](https://www.youtube.com/watch?v=c0wqT3ojCio)

[2](https://www.youtube.com/watch?v=BCJYkUl7ZjM)

[3](https://www.reddit.com/r/linux4noobs/comments/14wj4ld/messed_up_while_formatting_a_usb_drive_and_now/)

[4](https://bbs.archlinux.org/viewtopic.php?id=283114)

[5](https://learn.microsoft.com/en-us/answers/questions/4081082/usb-not-formatting-after-live-booting-linux)

[6](https://basics.net/2022/12/23/windows-usb-stick-not-recognized-after-formatting-with-linux/)