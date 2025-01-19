---
date created: 2024-05-09T14:44
date modified: 2025-01-02T17:23
tags:
  - git
---
- GitHub Pages now automatically does that for you in your branch

You need to go to the dns provider -> advanced dns -> make new cname record

https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-a-subdomain

Back in MY day, we had to manually change the CNAME file whenever the domain changed...

In general for domains and subdomains with GitHub pages, you need to create a new A record and point it to the GitHub pages IP. Then go into your GitHub repo settings and put in your new subdomain. 