---
date created: 2024-08-01T12:35
date modified: 2025-01-03T01:11
---

Vercel: [Adding & Configuring a Custom Domain](https://vercel.com/docs/projects/domains/add-a-domain#subdomains) 

Github: [Managing a custom domain for your GitHub Pages site - GitHub Docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) 

- Apex domain and www: [Managing a custom domain for your GitHub Pages site - GitHub Docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain-and-the-www-subdomain-variant) 
- basically put the www as the custom domain in the gh pages part of the repo settings, and then in dns settings put the cname to www and to name.github.io and the a records also to the right ips

## Github Instructions

Public repo --> settings --> pages --> deploy from branch or actions depends on the setup --> set custom domain

In the DNS, go to advanced --> CNAME record --> put in the prefix for subdomain you want it to have --> point it to github.io

[[create cname for subdomain]] 

## Vercel instructions

Any repo

Go to vercel --> new project --> deploy --> add custom domain

In the DNS, go to advanced --> CNAME record --> point to vercel's stuff