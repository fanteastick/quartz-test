---
date created: 2024-09-04T23:27
date modified: 2024-11-28T23:18
draft: "true"
---
- [ ] todo

Mostly wanted to use this to have a shortcut for opening the Messenger app... I hate navigating to Messenger... speed is the best...

## Auto hot key

Homepage: [AutoHotkey](https://www.autohotkey.com/) 

[Figure out a way to open a specific window inside program - AutoHotkey Community](https://www.autohotkey.com/boards/viewtopic.php?t=84070) 

## Komorebi Commands

```
komorebic start --whkd --bar
```

```
komorebic stop --whkd --bar
```
### Keybinds

[Example configurations - Commands - Komorebi](https://lgug2z.github.io/komorebi/example-configurations.html?h=commands#whkdrc)

```
# Focus windows
alt + h                 : komorebic focus left
alt + j                 : komorebic focus down
alt + k                 : komorebic focus up
alt + l                 : komorebic focus right
alt + shift + oem_4     : komorebic cycle-focus previous # oem_4 is [
alt + shift + oem_6     : komorebic cycle-focus next # oem_6 is ]

# Move windows
alt + shift + h         : komorebic move left
alt + shift + j         : komorebic move down
alt + shift + k         : komorebic move up
alt + shift + l         : komorebic move right
alt + shift + return    : komorebic promote
```

### Setup
- set this up with winget and the windows terminal
```
winget install LGUG2Z.komorebi
winget install LGUG2Z.whkd
```

> While you can set the workspace padding (the space between the outer edges of the windows and the bezel of your monitor) and the container padding (the space between each of the tiled windows) for each workspace independently, you can also set a default for both of these values that will apply to all workspaces using default_workspace_padding and default_container_padding.
