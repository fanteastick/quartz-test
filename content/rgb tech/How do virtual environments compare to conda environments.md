---
date created: 2024-06-08T16:39
date modified: 2024-07-23T11:45
---
## How do virtual environments compare to conda environments

Source: [Difference conda environment and virtual environment in pyhon | Aquiles Carattino](https://notes.aquiles.me/difference_conda_environment_and_virtual_environment_in_pyhon/#:~:text=Virtual%20environments%20are%20a%20native,be%20installed%20with%20these%20tools) 

Accessed on 2024-06-08

Python virtual environments are the light version of the conda environments.

Virtual environments are a native tool to Python developers, and they provide a functionality similar to that of the conda environments. The main difference is that they rely on the _Python package manager_. **Libraries and programs that do not belong to the Python ecosystem can't be installed with these tools**. In these cases, one must rely on the operating system's ability to install programs.

The Python package manager improved a lot in the past decade. Today, no one has issues installing numpy, pyqt, or scikit with a simple `pip` command. However, many of these packages still rely on libraries available at an operating-system level. For example, Python itself is grabbed from the operating system and not installed purposefully on each environment. **Virtual environments are a very good tool to isolate dependencies across projects that rely mostly on Python packages**.
