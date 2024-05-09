---
date created: 2024-05-09T14:44
date modified: 2024-05-09T15:01
---
- Install git and git bash
https://docs.github.com/en/get-started/getting-started-with-git/set-up-git
git --version to check version

- set username in git 
https://docs.github.com/en/get-started/getting-started-with-git/set-up-git

- set email in git
	- use the noreply email in settings --> email --> it should just say like noreply or something
	- https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/setting-your-commit-email-address 

authenticate w github from git 

- did ssh for rgb computer
- https://docs.github.com/en/get-started/getting-started-with-git/caching-your-github-credentials-in-git 

quick diversion to [[Setting up conda anaconda on a new computer]]

--- 

Actually better to just follow this: 

https://learn.microsoft.com/en-us/windows/wsl/tutorials/wsl-git

To set up GCM for use with a WSL distribution, open your distribution and enter this command:

If GIT installed is >= v2.39.0

```
git config --global credential.helper "/mnt/c/Program\ Files/Git/mingw64/bin/git-credential-manager.exe"
```