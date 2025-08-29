---
date created: 2025-03-20T20:35
date modified: 2025-03-26T00:03
---

# Misc Links

[Raspberry Pi](https://blog.cloudflare.com/tag/raspberry-pi/) - Cloudflare blogs with this tag

[Manage DNS records · Cloudflare DNS docs](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/) 

[Overview · Cloudflare Rules docs](https://developers.cloudflare.com/rules/)

[Page Rule or Redirect? - General / Rules - Cloudflare Community](https://community.cloudflare.com/t/page-rule-or-redirect/505783)

# HTTPs and Cloudflare tunnels

[[Cloudflare tunnels with Docker]] : [[Gitea and Cloudflare Tunnels]] [[Ollama and Cloudflare tunnels]]

> [!web]+ perplexity
> > [!question]
> > I've been making http tunnels with cloudflared. how do i make them https?
> 
> To convert your HTTP Cloudflare Tunnels to HTTPS, you can follow these steps:
> 
> 1. Enable "Always Use HTTPS" in your Cloudflare dashboard:
> 
>     - Log in to your Cloudflare account and go to the specific domain
> 
>     - Navigate to SSL/TLS > Edge Certificates
> 
>     - Switch the "Always Use HTTPS" toggle to On[^4]
> 
> 2. Ensure your SSL/TLS encryption mode is not set to "Off" in the SSL/TLS > Overview section of your Cloudflare dashboard[^4].
> 
> 3. If your origin server is using a self-signed certificate or you're having issues with HTTPS, you can enable the "No TLS Verify" setting in the Cloudflare Zero Trust dashboard:
> 
>     - Select 'https' on the Service Type drop-down
> 
>     - In "Additional application settings" under "TLS", enable "No TLS Verify"[^3]
> 
> 4. If you're using Cloudflare Tunnel with a local HTTP service, Cloudflare will handle the encryption from the user to the connector on your machine. You can keep using HTTP between the Cloudflared container and your local service[^6].
> 
> By implementing these steps, your Cloudflare Tunnel will serve traffic over HTTPS, redirecting all HTTP requests to HTTPS automatically.

[^1]: https://www.reddit.com/r/CloudFlare/comments/13d9esk/expose_a_local_http_service_with_https_through/

[^2]: https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/

[^3]: https://community.cloudflare.com/t/tunnel-not-working-on-https-and-onyl-working-on-http/488438

[^4]: https://developers.cloudflare.com/ssl/edge-certificates/additional-options/always-use-https/

[^5]: https://community.cloudflare.com/t/cloudflare-tunnels-avoid-using-http/521210

[^6]: https://community.cloudflare.com/t/having-trouble-setting-up-http-to-https-redirect-for-tunnel/396017

[^7]: https://community.traefik.io/t/http-to-https-redirect-with-cloudflare-tunnel/22278

[^8]: https://community.cloudflare.com/t/cloudflare-tunnel-with-https/641039
