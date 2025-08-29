---
date created: 2025-04-21T22:01
date modified: 2025-04-23T11:25
---

Thank you [GitHub - ekzhang/bore: 🕳 bore is a simple CLI tool for making tunnels to localhost](https://github.com/ekzhang/bore) !!! 

Install rust

```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
```

Install bore cli:

```
cargo install bore-cli
```

start the server

```
bore server --secret your_secret_here
```

Starting it as a systemd service:

```title="/etc/systemd/system/bore.service"
[Unit]
Description=Bore TCP Tunnel Server
After=network.target

[Service]
ExecStart=/root/.cargo/bin/bore server --secret your_secret_here
Restart=always
User=root

[Install]
WantedBy=multi-user.target
```

enable the service:

```
sudo systemctl daemon-reload
sudo systemctl enable --now bore
```

Check the service logs

```
journalctl -u bore.service
```

download from [Releases · ekzhang/bore](https://github.com/ekzhang/bore/releases): 

```
wget https://github.com/ekzhang/bore/releases/download/v0.4.1/bore-x86_64-unknown-linux-gnu
mv bore-x86_64-unknown-linux-gnu /usr/local/bin/bore
chmod +x /usr/local/bin/bore
```

download rust

[Other Installation Methods - Rust Forge](https://forge.rust-lang.org/infra/other-installation-methods.html)

With cloudflare, when pointing the domain to the server, unselect "Proxied". 

To check the domain name ip address:

```
host <domain>
nslookup <domain>
nc -vz <domain> <port>
telnet
ping
```

On the client side, how to run multiple bore services

```title="/etc/systemd/system/bore-3000.service"
[Unit]
Description=Bore tunnel for port 3000

[Service]
ExecStart=/usr/local/bin/bore local 3000 --to your.bore.server --secret your_secret_here -p 3000
Restart=always
User=youruser

[Install]
WantedBy=multi-user.target
```

```
sudo systemctl enable --now bore-3000.service
```

Check active ports open

```
netstat -lntu
```

Disable all or enable all at once

```
sudo systemctl stop 'bore-*.service'

for svc in $(systemctl list-unit-files --type=service | grep '^bore-' | awk '{print $1}'); do
    sudo systemctl start "$svc"
done
```
