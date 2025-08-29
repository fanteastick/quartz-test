---
date created: 2025-07-15T00:16
date modified: 2025-07-18T22:02
---

You can create this little window that stays always on top with autohotkey, and it's quite convenient.

![[AutoHotkey widget_image_1.png|200]]

## Code

Something along these lines...

```
#SingleInstance Force

; Floating launcher for Obsidian vaults and Chrome profiles (AutoHotkey v2)
#Requires AutoHotkey v2.0

; Create the GUI
myGui := Gui("+AlwaysOnTop +ToolWindow", "Launcher")
myGui.AddText("x10", "Obsidian Vaults")
myGui.AddButton("x10 w100 h30", "Content").OnEvent("Click", OpenContent)
myGui.AddButton("x10 w100 h30", "Blog").OnEvent("Click", OpenBlog)
myGui.AddButton("x10 w100 h30", "Personal").OnEvent("Click", OpenPersonal)

myGui.AddText("x10", "Chrome Profiles")
myGui.AddButton("x10 w100 h30", "Personal").OnEvent("Click", OpenChromeDefault)
; myGui.AddButton("x10 w100 h30", "Chrome Profile 1").OnEvent("Click", OpenChrome1)
; myGui.AddButton("x10 w100 h30", "Chrome Profile 2").OnEvent("Click", OpenChrome2)

myGui.AddText("x10", "Other")
myGui.AddButton("x10 w100 h30", "etc").OnEvent("Click", OpenETC)

myGui.OnEvent("Close", (*) => ExitApp())
myGui.Show("w125")
; Button event functions

OpenContent(*) {
    Run("obsidian://open?vault=content")
}
OpenBlog(*) {
    Run("obsidian://open?vault=blog_content")
}
OpenPersonal(*) {
    Run("obsidian://open?vault=<etc etc>")
}

OpenChrome1(*) {
    Run('"C:\Program Files\Google\Chrome\Application\chrome.exe" --profile-directory="<etc etc>"')
}
OpenChrome2(*) {
    Run('"C:\Program Files\Google\Chrome\Application\chrome.exe" --profile-directory="Profile 2"')
}
```

## Notes

Run the script by just making it a desktop shortcut and double clicking. 

Stays always on top because of this line: `myGui := Gui("+AlwaysOnTop +ToolWindow", "Launcher")`