---
date created: 2024-05-09T14:44
date modified: 2025-07-14T22:43
tags:
  - wsl
  - git
---
# Quick guide to login properly

Set your Git config to use the email associated with your GitHub account, **or your GitHub noreply email if you have email privacy enabled**:

```
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

part 2 logging in: 

```
sudo apt install gh
gh auth login
# then you need to do it in a web browser. although once i accidentally "opened" the webpage in the terminal. 
```

Unfinished (2025-07-14), but with https you need to make a personal access token (apparently less secure), or with SSH you can choose to use an existing ssh key. Something about keygen. and then adding it in your GitHub settings. 

# Miscellaneous 

> [!warning] Actual steps to follow...
> ...are in the second half, there's a link to the Microsoft learn page for setting up git on WSL

- Install git and git bash

[Set up Git - GitHub Docs](https://docs.github.com/en/get-started/getting-started-with-git/set-up-git)

`git --version` to check version

- set username in git, set email in git
	- use the noreply email in settings --> email --> it should just say like noreply or something
	- [Setting your commit email address - GitHub Docs](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/setting-your-commit-email-address)

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

- [Caching your GitHub credentials in Git - GitHub Docs](https://docs.github.com/en/get-started/getting-started-with-git/caching-your-github-credentials-in-git)

quick diversion to [[Setting up conda anaconda]]

--- 

Actually better to just follow this: 

[Get started using Git on WSL \| Microsoft Learn](https://learn.microsoft.com/en-us/windows/wsl/tutorials/wsl-git) 

To set up GCM for use with a WSL distribution, open your distribution and enter this command:

If GIT installed is >= v2.39.0

```
git config --global credential.helper "/mnt/c/Program\ Files/Git/mingw64/bin/git-credential-manager.exe"
```

---

## Logging into github

[GitHub CLI: gh auth login](https://cli.github.com/manual/gh_auth_login)

Download it for windows and then run this command, and then open the web browser to log in.

```bash
gh auth login
```

---

Seeing the info about your commit

```
https://github.com/username/repo/commit/abcdef123456.patch
```