---
date created: 2024-07-23T13:20
date modified: 2024-07-23T14:36
---

Followed these instructions for linking the remote repo as upstream: [Setting up your GitHub repository](https://quartz.jzhao.xyz/setting-up-your-GitHub-repository) 

Install pnpm with `npm install -g pnpm` 

Start environment

```
pnpm i
pnpm dev
```

It's a Svelte/vite app. 

http://localhost:5173/

To do the first GitHub push, I had to do 

```
    git remote add origin https://github.com/fanteastick/bratify.git
    git branch -M main
    git push -u origin main
```

Deployed it on Vercel since I wanted it to be a private repo (especially since it's not my work/no major changes made by me). All I did was go to Dashboard --> New --> Project --> imported the git repo --> didn't change any defaults because it was detected as a svelte project. Then added a domain and good to go!