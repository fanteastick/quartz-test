---
date created: 2025-04-23T23:51
date modified: 2025-04-24T00:01
tags:
  - external
---

date modified: 2025-04-23T23:53

Thank you perplexity

## Best Workflow for Adding New Sites to Nginx

The most reliable and maintainable workflow for adding new sites (domains or subdomains) to your Nginx setup is to use the **sites-available/sites-enabled** convention. This approach allows you to easily manage, enable, or disable sites without editing the main Nginx configuration each time[^6][^7][^9][^10].

**Recommended Workflow:**

- Set up your app or static files on a unique port (for proxying) or in a unique directory (for static content).
- Example for proxy: Your app listens on `127.0.0.1:9000`.
- Example for static: Files are in `/var/www/html/example.com`.

### 2. Create a New Nginx Server Block

- Copy an existing config as a template or create a new one in `/etc/nginx/sites-available/`.

```
sudo cp /etc/nginx/sites-available/template /etc/nginx/sites-available/newsite.example.com
sudo nano /etc/nginx/sites-available/newsite.example.com
```

- Adjust `server_name`, proxy settings, SSL paths, etc., as needed.

### 3. Enable the Site

```
sudo ln -s /etc/nginx/sites-available/newsite.example.com /etc/nginx/sites-enabled/
```

### 4. Obtain SSL Certificates (If Needed)

- Use [Certbot](https://certbot.eff.org/) or another ACME client to get SSL certificates for your new domain.
- Certbot can automatically edit your server block and reload Nginx.

Instructions: Using Certbot to Secure Nginx with SSL

Follow these steps to obtain and install a free SSL certificate from Let’s Encrypt for your Nginx site using Certbot. This workflow will automatically configure your Nginx server blocks for HTTPS and set up automatic renewals.

1. Install Certbot and the Nginx Plugin

On Ubuntu/Debian, run:

```
sudo apt update
sudo apt install certbot python3-certbot-nginx
```

2. Confirm Your Nginx Server Block

Ensure your server block in /etc/nginx/sites-available/yourdomain.com has the correct server_name directive for the domain you want to secure.

Example:

```
server_name yourdomain.com www.yourdomain.com;
```

Test your Nginx config:

```
sudo nginx -t
```

Reload Nginx if needed:

```
sudo systemctl reload nginx
```

3. Allow HTTPS Through Your Firewall

If you use UFW, run:

```
sudo ufw allow 'Nginx Full'
```

4. Obtain and Install the SSL Certificate

Run Certbot with the Nginx plugin, specifying your domain(s):

```
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Certbot will:

Detect your Nginx configuration.

Ask for your email and agreement to the terms.

Perform domain validation.

Ask if you want to redirect HTTP to HTTPS (recommended: choose redirect).

Automatically edit your Nginx config to use SSL.

5. Verify HTTPS

Visit https://yourdomain.com in your browser to confirm your site is now secured with SSL.

6. Automatic Renewal

```
sudo certbot renew --dry-run
```

### 5. Test Nginx Configuration

```
sudo nginx -t
```

### 6. Reload Nginx

```
sudo systemctl reload nginx
```

- Visit your new domain in a browser to confirm it works.
- Check logs in `/var/log/nginx/` if you encounter issues.

## Example: Adding a Proxy Site

Suppose you want to add `app.example.com` proxied to `localhost:9001`:

1. **Create config:**

```
sudo nano /etc/nginx/sites-available/app.example.com
```

```nginx
server {
    server_name app.example.com;

    location / {
        proxy_pass http://127.0.0.1:9001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/app.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/app.example.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

server {
    listen 80;
    server_name app.example.com;
    return 301 https://$host$request_uri;
}
```

2. **Enable site:**

```
sudo ln -s /etc/nginx/sites-available/app.example.com /etc/nginx/sites-enabled/
```

3. **Test and reload:**

```
sudo nginx -t
sudo systemctl reload nginx
```

- **Separation of concerns:** Each site has its own config file, making troubleshooting and updates easier[^6][^7][^9][^10].
- **Easy enable/disable:** Remove the symlink from `sites-enabl- **Scalability:** Adding new sites is as simple as copying, editing, and linking a config file[^2][^6][^9].

> **Tip:** Use subdomains for different apps/services (e.g., `app1.example.com`, `app2.example.com`) as this is more robust than subdirectories, especially for complex or proxied apps[^3].

This workflow is widely used and considered best practice for managing multiple sites on a single Nginx server[^2][^6][^7][^9][^10].

[^1]: https://stackoverflow.com/questions/76652569/how-to-deploy-multiple-websites-in-a-single-nginx-server-virtual-host

[^2]: https://webdock.io/en/docs/how-guides/shared-hosting-multiple-websites/how-configure-nginx-to-serve-multiple-websites-single-vps

[^3]: https://forum.level1techs.com/t/best-practices-for-nginx-across-multiple-devices/174558

[^4]: https://askubuntu.com/questions/766352/multiple-websites-on-nginx-one-ip

[^5]: https://www.digitalocean.com/community/questions/setup-vps-with-nginx-and-add-multiple-website

[^6]: https://betterstack.com/community/questions/nginx-missing-site-available-directory/

[^7]: https://askubuntu.com/questions/1509792/what-is-the-difference-between-nginx-config-files

[^8]: https://serverfault.com/questions/845739/nginx-multiple-websites-on-one-server

[^9]: https://www.linode.com/docs/guides/how-to-enable-disable-website/

[^10]: https://www.youtube.com/watch?v=8kqhXbNc4u8

[^11]: https://www.reddit.com/r/nginx/comments/re8ksm/why_is_sitesenabled_and_sitesavailable_deprecated/

