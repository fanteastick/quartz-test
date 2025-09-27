---
date created: 2025-09-12T01:33
date modified: 2025-09-15T23:58
---

Best app for [[spaced repetition]] and trusted by aspiring doctors everywhere. 

[anki/docs/syncserver at main · ankitects/anki · GitHub](https://github.com/ankitects/anki/tree/main/docs/syncserver) 

[GitHub - ankicommunity/anki-devops-services: Anki Sync Server with Docker - and it works!](https://github.com/ankicommunity/anki-devops-services#about-this-docker-image)

## Thanks perplexity
> [!web]- From the web
> 
> In the **Anki Windows app**, there is currently no option in the main user interface to set a custom sync server. To sync with a self-hosted server, a small code change is needed: place a Python file (addon) in the Anki add-ons folder to specify the address of the self-hosted server. Here’s how:
> 
> ## Steps to Use a Custom Sync Server
> 
> - Create a file named `mysyncserver.py` in the `Anki/addons` folder.
> - Add the following code to the file, replacing the address with your server’s actual URL:
>   ```python
>   import anki.sync
>   anki.sync.SYNC_BASE = 'http://your.server.address:port/'
>   anki.sync.SYNC_MEDIA_BASE = 'http://your.server.address:port/msync/'
>   ```
> - Restart Anki, then use your server’s local credentials when syncing. The Windows client will now communicate with your own server, not AnkiWeb.[2]
> - If using TLS, additional lines for certificate paths are required.[2]
> 
> ## Notes
> 
> - This addon-based method is necessary because, as of now, **no GUI option exists** for specifying a custom sync server in the Windows app.[2]
> - The sync button and messages may still mention “AnkiWeb,” but your data goes to your self-hosted server.[5][2]
> - Usernames and passwords are those set up for your local server, not your AnkiWeb credentials.[5][2]
> 
> For most users, this is considered an advanced configuration.[5][2]
> 
> [1](https://www.reddit.com/r/Anki/comments/1i1s7eh/selfhosting_sync_server_configuration/)
> 
> [2](https://github.com/dsnopek/anki-sync-server)
> 
> [3](https://docs.ankiweb.net/syncing.html)
> 
> [4](https://docs.ankiweb.net/syncing.html?highlight=one+way+sync)
> 
> [5](https://docs.ankiweb.net/sync-server.html)
> 
> [6](https://forums.ankiweb.net/t/modify-sync-settings-without-gui/60298)
> 
> [7](https://docs.ankiweb.net/preferences.html)
> 
> [8](https://www.reddit.com/r/Anki/comments/s7mz2l/how_to_sync_progress_on_desktop_and_app/)
> 
> [9](https://forums.ankiweb.net/t/direct-syncing-between-devices-without-sync-server/21375)
> 
> [10](https://forums.ankiweb.net/t/self-hosting-sync/26870)

## Viewing stuff

[GitHub - cenekp74/anki-share](https://github.com/cenekp74/anki-share?tab=readme-ov-file)

[GitHub - CravingCrates/AnkiCollab-Plugin: The source code for the Anki Plugin](https://github.com/CravingCrates/AnkiCollab-Plugin/tree/main)

[GitHub - fasiha/fuzzy-anki: An Anki browser: upload your APKG decks or ANKI2 collections and see what's inside!](https://github.com/fasiha/fuzzy-anki)

Misc japanese thing: [ichi.moe - Japanese transliteration and dictionary service](https://ichi.moe/) --> [Monarobot.com](https://monarobot.com/) 

[Fuzzy-Anki](https://fasiha.github.io/fuzzy-anki/)