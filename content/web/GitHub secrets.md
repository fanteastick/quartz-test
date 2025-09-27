---
date created: 2024-07-16T21:48
date modified: 2025-02-05T15:24
tags:
  - git
---

> I needed this to work literally yesterday! It's so bad! 💬 Me, when I realized someone else was using my [[GoatCounter analytics]] code

## Secrets specifically for Quartz

Note: these instructions are for GitHub but for Vercel it's even easier, just have the `process.env` and add it as a secret in your Vercel project settings. 

### In your GitHub repo settings

Go to Settings --> left sidebar at the bottom there's Secrets and variables --> Actions --> new repository secret

Edit the workflow that builds:

```yml title="deploy.yml"
  deploy:
    needs: build
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Prepare deployment
        env:
          MY_SECRET: ${{ secrets.MY_SECRET }}
        run: |
          # Any preparation steps that need secrets
          echo "My secret is $MY_SECRET"

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### In the code

Thank you Perplexity! (paraphrased)

1. In your project, install: `npm install --save-dev @types/node` which should update your `package.json` and `package-lock.json`. Also `npm install dotenv` so you can use the secrets locally.

2. Extend the `ProcessEnv` interface by making a file `environment.d.ts` in the root. 

```ts title="environment.d.ts"
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GISCUS_REPO_ID: string;
      GISCUS_CATEGORY_ID: string;
    }
  }
}
```

3. Create a `.env` file and add it to the `.gitignore`. The contents should be like this:

```txt title=".env"
GISCUS_REPO_ID='ssssss' as string;
GISCUS_CATEGORY_ID='ggggggg' as string;
```

4. Use `process.env.MY_SECRET` in the typescript files: 

```ts title="quartz.layout.ts"
import 'dotenv/config';
const myRepoID = process.env.GISCUS_REPO_ID;
const myCategoryID = process.env.GISCUS_CATEGORY_ID;
...
provider: 'giscus',
  options: {
    repoId: myRepoID,
    categoryId: myCategoryID,
```

## Even more restricting giscus embeds

Make this file: [giscus/giscus.json at main · giscus/giscus · GitHub](https://github.com/giscus/giscus/blob/main/giscus.json) 

As described here: [giscus/ADVANCED-USAGE.md at main · giscus/giscus · GitHub](https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md#origins) 

## Links I was reading

[Using secrets in GitHub Actions - GitHub Docs](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions)

Honestly did a whole bunch of reading on this topic and I still don't get how to use it...

[Contexts - GitHub Docs](https://docs.github.com/en/actions/learn-github-actions/contexts)

[Using environments for deployment - GitHub Docs](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)
