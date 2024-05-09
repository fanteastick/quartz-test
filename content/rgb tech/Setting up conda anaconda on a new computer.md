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

## How do virtual environments compare to conda environments

Python virtual environments are the light version of the conda environments.

Virtual environments are a native tool to Python developers, and they provide a functionality similar to that of the conda environments. The main difference is that they rely on the _Python package manager_. **Libraries and programs that do not belong to the Python ecosystem can't be installed with these tools**. In these cases, one must rely on the operating system's ability to install programs.

The Python package manager improved a lot in the past decade. Today, no one has issues installing numpy, pyqt, or scikit with a simple `pip` command. However, many of these packages still rely on libraries available at an operating-system level. For example, Python itself is grabbed from the operating system and not installed purposefully on each environment. **Virtual environments are a very good tool to isolate dependencies across projects that rely mostly on Python packages**.

Source: https://notes.aquiles.me/difference_conda_environment_and_virtual_environment_in_pyhon/#:~:text=Virtual%20environments%20are%20a%20native,be%20installed%20with%20these%20tools
