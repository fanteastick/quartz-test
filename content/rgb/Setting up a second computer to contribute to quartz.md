---
date created: 2024-05-09T14:44
date modified: 2024-08-06T02:45
---

Clone

```shell
git clone https://github.com/<https path>
```

Had to install node and npm

https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl#install-nvm-nodejs-and-npm 

---

Node issues with deploy:

> Evo_F — Yesterday at 10:03 PM

Try adding:

```
with:
  node-version: latest
```

directly underneath the line:

```
- uses: actions/setup-node@v4
```