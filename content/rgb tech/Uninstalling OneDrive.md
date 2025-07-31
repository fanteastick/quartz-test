---
date created: 2024-08-02T16:18
date modified: 2025-07-18T09:34
---

[Turn off, disable, or uninstall OneDrive - Microsoft Support](https://support.microsoft.com/en-us/office/turn-off-disable-or-uninstall-onedrive-f32a17ce-3336-40fe-9c38-6efb09f944b0)

I hate that it keeps getting detected as the home folder for my PC when I want things in my actual home folder.

## Unlink

Go to Onedrive settings, go to **Account**, and select **Unlink this PC**. After unlinking, restart your PC, and the folders should revert to local paths

Turn off folder backup in OneDrive settings before uninstalling: If OneDrive is still active or reinstalled, right-click the OneDrive icon in the system tray, select Settings > Sync & backup > Manage Backup, and turn off backup for all folders. This prevents apps from saving to OneDrive folders automatically.

Uninstall via installed programs in settings

Also in the file explorer, right click in the left sidebar and select "show all folders" . then go to each individual Onedrive subfolder, right click --> properties --> location -> restore default

## Reset the regedit

Thanks Perplexity

The error **"Can't move the folder because there is a folder in the same location that can't be redirected"** happens because your Documents folder (or another user folder) is currently or was previously mapped to your OneDrive directory, and Windows now detects a conflicting folder at the intended destination[1][2][5][8].

**How to fix this:**

### 1. **Registry Edit to Restore Folder Paths**

You need to manually reset the folder path in the Windows Registry for the affected folder:

1. Press `Win + R`, type `regedit`, and press Enter.
2. Navigate to:
```
HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders
   ```
3. In the right pane, find the key for your folder:
   - **Documents:** `Personal`
   - **Desktop:** `Desktop`
   - **Pictures:** `My Pictures`
   
4. Double-click the entry and set its value to the default, for example:
   - Documents: **`%USERPROFILE%\Documents`**
   - Desktop: **`%USERPROFILE%\Desktop`**
   - Pictures: **`%USERPROFILE%\Pictures`**
5. Click OK and close the Registry Editor.

### 2. **Restart File Explorer or Your PC**

- Open Task Manager (`Ctrl + Shift + Esc`).
- Find "Windows Explorer" in the list, right-click it, and select **Restart**;
- Alternatively, sign out and back in, or reboot the computer.

### 3. **Manually Move Your Files**

After fixing the path in the registry, manually move files (such as game saves) from the old OneDrive Documents folder to your newly restored local Documents folder.

### 4. **Try Location Tab Again**

Once you have updated the registry and restarted, right-click your Documents folder (in your user profile, not in OneDrive) and the Location tab should reappear and function properly.

**Why this happens:**  
When OneDrive redirected your Documents folder, Windows set the folder path to the OneDrive location. Simply unlinking OneDrive does not always revert the folder path, and the presence of folders at both locations creates a conflict upon attempting to redirect. Editing the registry directly is the most reliable fix for this scenario.

[1] https://support.microsoft.com/en-us/topic/operation-to-change-a-personal-folder-location-fails-in-windows-ffb95139-6dbb-821d-27ec-62c9aaccd720

[2] https://www.partitionwizard.com/partitionmanager/cant-move-the-folder.html

[3] https://www.tenforums.com/general-support/166006-error-attempting-redirect-documents-folder.html

[4] https://community.appuals.com/t/solved-folder-moving-error-cant-redirect-folder-in-same-location/1017

[5] https://superuser.com/questions/1725456/wha-cant-i-move-my-documents-folder

[6] https://answers.microsoft.com/en-us/windows/forum/all/cannot-redirect-documents-folder/98d539d2-b85b-44e2-b129-a7d4bb602a12

[7] https://www.youtube.com/watch?v=A39B6H9T2uE

[8] https://www.reddit.com/r/WindowsHelp/comments/1e6x5v9/restoring_the_default_location_of_user_folders/