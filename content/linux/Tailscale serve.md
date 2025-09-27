---
date created: 2025-08-26T09:48
date modified: 2025-09-09T20:58
---
## Basic serve commands

```
sudo tailscale serve --https=3420 --bg localhost:3420
sudo tailscale serve --https=3420 off

sudo tailscale serve --bg 8002
sudo tailscale serve --https=443 off

sudo tailscale serve status
```

[Tailscale Serve · Tailscale Docs](https://tailscale.com/kb/1312/serve)

[Tailscale Serve examples · Tailscale Docs](https://tailscale.com/kb/1313/serve-examples) 

[Contain your excitement: A deep dive into using Tailscale with Docker](https://tailscale.com/blog/docker-tailscale-guide) 

[How to Use Tailscale Serve with Docker Compose for Secure, Private Self-Hosting](https://www.elliotblackburn.com/how-to-use-tailscale-serve-with-docker-compose-for-secure-private-self-hosting/)

## Turn off all the serves and then turn them on again

```
sudo tailscale serve status | grep https | awk -F':' '{print $3}' | awk -F" \(tail" '{print $1}' | sort > serves.txt
IFS=$'\n'; for line in $(cat serves.txt); do source te "$line"; done
IFS=$'\n'; for line in $(cat serves.txt); do source ts "$line"; done
```

## Basic scripts

I symlinked these to `ts` and `te`. 

Scripts to start and stop a serve:

```csh title="tunnel_start.sh"
#!/bin/bash

# Check if an argument was provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 <port>"
    exit 1
fi

port=$1

# Run the tailscale serve command
sudo tailscale serve -bg --https=$port localhost:$port

```

```csh title="tunnel_end.sh"
#!/bin/bash

# Check if an argument was provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 <port>"
    exit 1
fi

port=$1

# Run the tailscale serve command
sudo tailscale serve --https=$port off
echo "Closed port $port on tailscale serve."
```