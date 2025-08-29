---
date created: 2025-04-22T15:12
date modified: 2025-04-22T22:09
---

step 0: Do this: [[bore pub as a service server]] 

Then perplexity: 

## Step-by-Step Guide: Nginx Reverse Proxy with Subdomains and SSL Certificates

Follow these instructions to set up Nginx as a reverse proxy on your VPS, mapping each subdomain to a different internal port, and securing each with a free Let's Encrypt SSL certificate.

**1. Prerequisites**

- A VPS running Ubuntu/Debian/CentOS.
- Nginx installed.
- Domain with DNS access (e.g., via Cloudflare, GoDaddy, Namecheap).
- Subdomains (e.g., `service1.yourdomain.com`, `service2.yourdomain.com`) pointed to your VPS IP via A records[5](https://dev.to/thatonehidde/how-to-set-up-a-reverse-proxy-with-nginx-configure-ssl-and-connect-a-subdomain-582o).

**2. Install Nginx**

bash

`sudo apt update sudo apt install nginx`

Check Nginx status:

bash

`systemctl status nginx`

**3. Configure DNS**

- In your domain registrar’s DNS panel, create A records for each subdomain:
    
    - `service1.yourdomain.com` → VPS IP
        
    - `service2.yourdomain.com` → VPS IP[5](https://dev.to/thatonehidde/how-to-set-up-a-reverse-proxy-with-nginx-configure-ssl-and-connect-a-subdomain-582o)

**4. Configure Nginx Reverse Proxy**

Create a new config file for each subdomain in `/etc/nginx/sites-available/`:

**Example for `service1.yourdomain.com` (port 9000):**

text

```server {
listen 80;
server_name service1.yourdomain.com;
location / 
{
proxy_pass http://127.0.0.1:9000;
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
} }
```

**Example for `service2.yourdomain.com` (port 8080):**

```
server {     listen 80;    server_name service2.yourdomain.com;     location / {        proxy_pass http://127.0.0.1:8080;        proxy_set_header Host $host;        proxy_set_header X-Real-IP $remote_addr;    } }
```

Save each file (e.g., `/etc/nginx/sites-available/service1`, `/etc/nginx/sites-available/service2`).

Enable the sites:

bash

```
sudo ln -s /etc/nginx/sites-available/service1 /etc/nginx/sites-enabled/ 
sudo ln -s /etc/nginx/sites-available/service2 /etc/nginx/sites-enabled/
```

Test and reload Nginx:

`sudo nginx -t sudo systemctl reload nginx`

**5. Install Certbot for SSL**

`sudo apt install certbot python3-certbot-nginx`

**6. Obtain SSL Certificates**

Run for each subdomain:

```
sudo certbot --nginx -d service1.yourdomain.com 
sudo certbot --nginx -d service2.yourdomain.com
```

- Enter your email, agree to the TOS, and Certbot will automatically configure SSL in your Nginx configs and reload Nginx[5](https://dev.to/thatonehidde/how-to-set-up-a-reverse-proxy-with-nginx-configure-ssl-and-connect-a-subdomain-582o)[4](https://community.octoprint.org/t/reverse-proxy-via-nginx-using-subdomain-and-lets-encrypt-ssl-certificate/56961).

**7. Verify**

- Visit `https://service1.yourdomain.com` and `https://service2.yourdomain.com` in your browser.
- Both should load securely (lock icon) and proxy to the correct internal ports.

## Summary Table

|Subdomain|Internal Port|Nginx Proxy Config|SSL via Certbot|
|---|---|---|---|
|service1.yourdomain.com|9000|Yes|Yes|
|service2.yourdomain.com|8080|Yes|Yes|

**References:**

- Nginx config for subdomain reverse proxy[1](https://serverfault.com/questions/753105/how-to-reverse-proxy-to-different-places-depending-on-subdomain-in-nginx)[2](https://ryan.himmelwright.net/post/nginx-subdomain-reverse-proxy/)[5](https://dev.to/thatonehidde/how-to-set-up-a-reverse-proxy-with-nginx-configure-ssl-and-connect-a-subdomain-582o)[8](https://stackoverflow.com/questions/61335378/nginx-reverse-proxy-config-for-subdomain)
    
- Certbot SSL configuration for Nginx[4](https://community.octoprint.org/t/reverse-proxy-via-nginx-using-subdomain-and-lets-encrypt-ssl-certificate/56961)[5](https://dev.to/thatonehidde/how-to-set-up-a-reverse-proxy-with-nginx-configure-ssl-and-connect-a-subdomain-582o)

This setup ensures each service is accessible via its own subdomain, with HTTPS, without exposing port numbers to users.

### Citations:

1. [https://serverfault.com/questions/753105/how-to-reverse-proxy-to-different-places-depending-on-subdomain-in-nginx](https://serverfault.com/questions/753105/how-to-reverse-proxy-to-different-places-depending-on-subdomain-in-nginx)
2. [https://ryan.himmelwright.net/post/nginx-subdomain-reverse-proxy/](https://ryan.himmelwright.net/post/nginx-subdomain-reverse-proxy/)
3. [https://www.reddit.com/r/homelab/comments/7w9vcj/guide_for_nginx_reverse_proxy_with_subdomains/](https://www.reddit.com/r/homelab/comments/7w9vcj/guide_for_nginx_reverse_proxy_with_subdomains/)
4. [https://community.octoprint.org/t/reverse-proxy-via-nginx-using-subdomain-and-lets-encrypt-ssl-certificate/56961](https://community.octoprint.org/t/reverse-proxy-via-nginx-using-subdomain-and-lets-encrypt-ssl-certificate/56961)
5. [https://dev.to/thatonehidde/how-to-set-up-a-reverse-proxy-with-nginx-configure-ssl-and-connect-a-subdomain-582o](https://dev.to/thatonehidde/how-to-set-up-a-reverse-proxy-with-nginx-configure-ssl-and-connect-a-subdomain-582o)
6. [https://askubuntu.com/questions/500638/nginx-reverse-proxy-and-subdomains](https://askubuntu.com/questions/500638/nginx-reverse-proxy-and-subdomains)
7. [https://techenclave.com/threads/nginx-reverse-proxy-on-subdomain.207010/](https://techenclave.com/threads/nginx-reverse-proxy-on-subdomain.207010/)
8. [https://stackoverflow.com/questions/61335378/nginx-reverse-proxy-config-for-subdomain](https://stackoverflow.com/questions/61335378/nginx-reverse-proxy-config-for-subdomain)

---

Answer from Perplexity: [pplx.ai/share](https://www.perplexity.ai/search/pplx.ai/share)

---

If you use bore.pub (or your own Bore instance) to expose **two different Minecraft servers** on your VPS, each server will be mapped to a different public port on the VPS. Here’s how you and others would connect to them:

## How Bore Works in This Scenario

- **Each Minecraft server runs on a different port** (e.g., 25565 and 25566) on your home/local network.
- You run Bore to tunnel each local server port to a different public port on your VPS.
    - For example:
        - Home Server 1 (port 25565) → VPS port 25565
        - Home Server 2 (port 25566) → VPS port 25566

## How Players Connect

- **Players connect using your VPS’s domain/IP and the port assigned to each server:**
    - For Server 1: `yourdomain.com` (or `yourdomain.com:25565`—the default port can be omitted)
    - For Server 2: `yourdomain.com:25566`

You **must specify the port** for any server not running on the default Minecraft port (25565), as Minecraft clients only use the domain name alone for the default port[2](https://www.minecraftforum.net/forums/support/server-support-and/1926827-running-multiple-servers-on-a-vps)[5](https://github.com/GameServerManagers/LinuxGSM/discussions/3500).

## Using Subdomains (Optional)

If you want to use subdomains (e.g., `mc1.yourdomain.com` and `mc2.yourdomain.com`) **without specifying ports**, you can set up DNS SRV records. This allows Minecraft Java Edition clients to resolve a subdomain to a specific port[5](https://github.com/GameServerManagers/LinuxGSM/discussions/3500):

- Set up an A record for each subdomain pointing to your VPS IP.
    
- Create an SRV record for each subdomain that points to the correct port.

**Example SRV record for `mc2.yourdomain.com` on port 25566:**

`Service: _minecraft Protocol: _tcp Name: mc2 Target: yourdomain.com Port: 25566 Priority: 0 Weight: 5`

Players can then connect with just `mc2.yourdomain.com` in the Minecraft client (Java Edition). **Note:** Not all Minecraft clients (especially Bedrock Edition) support SRV records.

## Summary Table

|Server|Local Port|VPS Public Port|Player Connects With|SRV Record Needed?|
|---|---|---|---|---|
|Server 1|25565|25565|yourdomain.com|No|
|Server 2|25566|25566|yourdomain.com:25566|Yes (for subdomain)|

## Key Points

- Each server must be tunneled to a unique port on your VPS.
- Players connect using the VPS domain/IP and the assigned port.
- To use subdomains without specifying a port, set up DNS SRV records (Java Edition only)[5](https://github.com/GameServerManagers/LinuxGSM/discussions/3500).

This is the standard method for exposing multiple Minecraft servers via a single VPS using tunneling solutions like Bore.

### Citations:

1. [https://www.reddit.com/r/admincraft/comments/18z7584/minecraft_server_tunneling_with_a_vps/](https://www.reddit.com/r/admincraft/comments/18z7584/minecraft_server_tunneling_with_a_vps/)
2. [https://www.minecraftforum.net/forums/support/server-support-and/1926827-running-multiple-servers-on-a-vps](https://www.minecraftforum.net/forums/support/server-support-and/1926827-running-multiple-servers-on-a-vps)
3. [https://www.spigotmc.org/threads/using-vps-as-a-proxy.454791/](https://www.spigotmc.org/threads/using-vps-as-a-proxy.454791/)
4. [https://www.spigotmc.org/threads/running-server-behind-vpn-proxy-tunnel-without-loss-of-performance.31919/](https://www.spigotmc.org/threads/running-server-behind-vpn-proxy-tunnel-without-loss-of-performance.31919/)
5. [https://github.com/GameServerManagers/LinuxGSM/discussions/3500](https://github.com/GameServerManagers/LinuxGSM/discussions/3500)
6. [https://www.youtube.com/watch?v=APGt2ab50Wk](https://www.youtube.com/watch?v=APGt2ab50Wk)
7. [https://www.youtube.com/watch?v=1w-Eqi9Vt24](https://www.youtube.com/watch?v=1w-Eqi9Vt24)
8. [https://www.youtube.com/watch?v=C3co2KkD3b4](https://www.youtube.com/watch?v=C3co2KkD3b4)
9. [https://www.linkedin.com/pulse/hosting-minecraft-server-behind-cgnat-jeffrey-samuels](https://www.linkedin.com/pulse/hosting-minecraft-server-behind-cgnat-jeffrey-samuels)

