---
date created: 2025-08-25T22:05
date modified: 2025-11-02T18:05
---

Amazing free software that lets you control another host computer through a client computer. 

## On phone

[Parsec on phone again](https://www.reddit.com/r/AQW/comments/1i8ibb6/am_i_the_only_one_who_uses_parsec_to_play_on/) 

## Common support issues

[Parsec support - Mouse and Keyboard not working when connected](https://support.parsec.app/hc/en-us/articles/32381827815188-Mouse-and-Keyboard-Isn-t-Working-Correctly-When-Connected)

> [!web] Game anti-cheats blocking Parsec's inputs
> 
> If you're playing a multiplayer game, it may intentionally block Parsec's inputs. Two common examples are Valorant and more recently League of Legends, which both use Vanguard anti-cheat.
> 
> Some game anti-cheats also **run independently of the game** (such as Vanguard) and can also be in effect outside the game. If you suspect an anti-cheat is causing the issue, try to restart your computer or remove the game and the anti-cheat completely.

[Parsec support - Parsec for windows as a privileged user](https://support.parsec.app/hc/en-us/articles/32381199341716-Parsec-App-for-Windows#system_service)

> [!web]
> To check if the service is running correctly, press Ctrl+Shift+Esc on the host computer to open Task Manager. In the 'Details' tab, you must see:
> 
> - One instance of parsecd.exe running as SYSTEM
> - One instance of parsecd.exe running as your regular username
> - One instance of pservice.exe running as SYSTEM

[Now available: Microphone passthrough \| Parsec Blog](https://parsec.app/blog/now-available-microphone-passthrough) [Parsec support](https://support.parsec.app/hc/en-us/articles/32380350695956-Use-your-Microphone-with-Parsec) 

> [!summary]
> On the Windows host, download Parsec Virtual USB driver. Enable Virtual Microphone (persistent) in the host settings. In the client, enable microphone passthrough. 
