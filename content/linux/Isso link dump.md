---
date created: 2025-04-30T17:22
date modified: 2025-05-01T00:53
---

[Isso – a commenting server similar to Disqus](https://isso-comments.de/)

Issue 1: in the pangolin logs it'll say can't ping, and it'll say 404 page not found. that means the tunnel can't reach it. need to disable authentication, but not SSL. If it's not working, try deleting the resource and try again. Also try `sudo ufw allow <port>`

second issue: resource not found when you visit the base page. Solution: the script is located at like /js something, so you can first check that. Then you can also set up the admin page ([Advanced integration](https://isso-comments.de/docs/guides/advanced-integration/)) for editing the stuff. 

Third issue: cors. to check, inspect element, network, and then refresh the page again. the script will be one of the items and it'll error out if cors. solution: make sure to add http:// and https:// versions of each site that it can embed on.

Fourth issue: css. Add property !important like `margin-left: auto !important;` to the stylesheets of wherever you're adding it. 

[Server Configuration](https://isso-comments.de/docs/reference/server-config/) 

[GitHub - isso-comments/isso: a Disqus alternative](https://github.com/isso-comments/isso) 

[Multiple Sites & Sub-URI](https://isso-comments.de/docs/reference/multi-site-sub-uri/)