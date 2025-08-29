---
date created: 2025-03-25T17:03
date modified: 2025-03-25T23:10
draft: "true"
---
## Update the root url in the app.ini

```
docker exec -it <container_name> /bin/bash

nano /data/gitea/conf/app.ini

[server]
ROOT_URL = https://your-new-domain.com/

docker restart <container_name>
```

## Considerations

High traffic/large repos - may prove difficult or poor performance.

Git operations need some setup

## Setting up the git stuff

Thanks Perplexity

### SSH settings

```
Host your-gitea-hostname
ProxyCommand /usr/local/bin/cloudflared access ssh --hostname %h
```

### HTTPS git operations

Go to Cloudflare Zero Trust dashboard > Access > Service Auth

Create new token -> choose a name. Keep the client and the secret. 

Run these commands:

```
git config --global http.https://your-gitea-domain.extraheader "CF-Access-Client-Id: your-client-id"
git config --global http.https://your-gitea-domain.extraheader "CF-Access-Client-Secret: your-client-secret"

# Check your work:
git config --global --get-all http.https://your-gitea-domain.extraheader

# troubleshooting
GIT_CURL_VERBOSE=1 git clone your-repository-url
```

