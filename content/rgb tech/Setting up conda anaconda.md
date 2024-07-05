---
date created: 2024-05-09T14:44
date modified: 2024-07-05T12:14
---

https://docs.anaconda.com/free/anaconda/install/linux/

this has the instructions for linux which is what i want w/ wsl

repo.anaconda.com/archive

- go here to find the version # (why can't they just fetch it themselves and dynamically update the install instructions....)

Download the installer

```
curl -O https://repo.anaconda.com/archive/Anaconda3-2024.02-1-Linux-x8
```

Install the installer

This is the original command they give BUT you need to replace the path and the version... 

bash ~/Downloads/Anaconda3-<INSTALLER_VERSION>-Linux-x86_64.sh

bash ~/Anaconda3-2024.02-1-Linux-x86_64.sh

Install location: /home/eilleenz/anaconda3

Turn on the base environment every time shell opens

```shell
# The base environment is activated by default
conda config --set auto_activate_base True

# The base environment is not activated by default
conda config --set auto_activate_base False

# The above commands only work if conda init has been run first
# conda init is available in conda versions 4.6.12 and later
```

If you'd prefer that conda's base environment not be activated on startup, run the following command when conda is activated:

```shell
conda config --set auto_activate_base false
```

Ripped from online: the difference between venvs and conda environments

[[How do virtual environments compare to conda environments]]