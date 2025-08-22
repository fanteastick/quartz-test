---
date created: 2025-07-30T22:02
date modified: 2025-07-30T22:03
tags:
  - external
---

Thanks Perplexity

## Receiving with Cloudflare email routing

To set up **Cloudflare Email Routing** for your domain, follow these full steps:

1. **Log in to your Cloudflare dashboard** and select your domain.
    
2. Go to the **Email** section in the sidebar, then click **Email Routing**.
    
3. Click **Get Started** to begin setting up email forwarding.
    
4. Cloudflare will suggest the required DNS changes (MX and TXT records) to enable email routing for your domain. Accept these by clicking **Add records and enable**. This updates your DNS automatically to route emails through Cloudflare.
    
5. Next, create a forwarding rule by adding a **custom email address** for your domain (e.g., [yourname@yourdomain.com](mailto:yourname@yourdomain.com)) and set the **destination address** where you want to receive the emails (e.g., your personal Gmail).
    
6. Cloudflare will send a verification email to the destination address. You must follow the link in this email to verify ownership.
    
7. Once verified, your email forwarding will be active and emails sent to your domain address will be forwarded to your destination inbox.

You can add multiple custom addresses and define routing rules as needed, including catch-all forwarding for your domain. You can manage all these from the Cloudflare dashboard under Email Routing > Routes.

Regarding **security and privacy**:

- Cloudflare Email Routing is designed to be **private and secure**. Cloudflare does **not store or access the contents** of your forwarded emails.
    
- Since Cloudflare only handles incoming email forwarding, your **origin email address (destination mailbox)** is the one receiving the mail, so it is technically reachable by the sender once forwarded. However, with forwarding, the sender typically sees your domain email as the recipient, not necessarily your origin address.
    
- Cloudflare does not provide sending (SMTP) service, so sending email _from_ your domain requires a separate SMTP provider.
    
- Because forwarding exposes your origin mailbox or destination email address (the address you use to receive forwarded mail), if you want to keep your origin address private, you should avoid revealing it publicly or consider aliasing.

In summary, Cloudflare Email Routing securely forwards incoming mail without storing it, but the destination email address is technically revealed as where mail ends up.

If you want, I can also provide detailed steps on how to set up sending email from your domain using Gmail or another SMTP service combined with Cloudflare Email Routing for receiving.

Sources: Cloudflare documentation and setup guides [1](https://developers.cloudflare.com/email-routing/get-started/enable-email-routing/)[2](https://www.worthyblog.com/setup-cloudflare-email-routing/)[3](https://developers.cloudflare.com/email-routing/setup/email-routing-addresses/)[5](https://developers.cloudflare.com/email-routing/).

1. [https://developers.cloudflare.com/email-routing/get-started/enable-email-routing/](https://developers.cloudflare.com/email-routing/get-started/enable-email-routing/)
2. [https://www.worthyblog.com/setup-cloudflare-email-routing/](https://www.worthyblog.com/setup-cloudflare-email-routing/)
3. [https://developers.cloudflare.com/email-routing/setup/email-routing-addresses/](https://developers.cloudflare.com/email-routing/setup/email-routing-addresses/)
4. [https://developers.cloudflare.com/email-routing/get-started/](https://developers.cloudflare.com/email-routing/get-started/)
5. [https://developers.cloudflare.com/email-routing/](https://developers.cloudflare.com/email-routing/)
6. [https://www.nonprofitpress.cloud/guides/how-nonprofits-can-use-cloudflare-email-routing-gmail-to-send-and-receive-custom-domain-emails-for-free/](https://www.nonprofitpress.cloud/guides/how-nonprofits-can-use-cloudflare-email-routing-gmail-to-send-and-receive-custom-domain-emails-for-free/)
7. [https://community.cloudflare.com/t/trying-to-set-up-a-business-email-address/696960](https://community.cloudflare.com/t/trying-to-set-up-a-business-email-address/696960)
8. [https://forwardemail.net/en/guides/cloudflare](https://forwardemail.net/en/guides/cloudflare)
9. [https://www.reddit.com/r/CloudFlare/comments/1ko76s6/email_routing_reliability_in_2025/](https://www.reddit.com/r/CloudFlare/comments/1ko76s6/email_routing_reliability_in_2025/)
## Sending email with an SMTP

Here are detailed steps to set up sending email from your domain using Gmail SMTP combined with Cloudflare Email Routing for receiving:

1. **Enable 2-Factor Authentication (2FA) on your Google Account**
    
    - Log into your Google Account.
        
    - Navigate to Security settings and enable 2FA if not already enabled. This is required to create an App Password for Gmail SMTP.
        
2. **Create a Gmail App Password for Mail**
    
    - Go to your Google Account > Security > App passwords.
        
    - Select "Mail" as the app and your device/computer as the device.
        
    - Click Generate and copy the generated password (you’ll use this instead of your regular Google password later).
        
3. **Add Your Domain Email Address to Gmail as a 'Send mail as' Address**
    
    - In Gmail, click the Settings gear icon > See all settings > Accounts and Import tab.
        
    - Find "Send mail as," then click "Add another email address."
        
    - Enter your name and your domain email address that you use with Cloudflare Email Routing (e.g., [yourname@yourdomain.com](mailto:yourname@yourdomain.com)).
        
    - Untick “Treat as an alias” for proper SMTP sending.
        
    - Click Next Step.
        
4. **Configure SMTP Server in Gmail Settings**
    
    - SMTP Server: `smtp.gmail.com`
        
    - Port: `587` (TLS)
        
    - Username: Your full Gmail address (e.g., [yourname@gmail.com](mailto:yourname@gmail.com))
        
    - Password: The App Password you generated
        
    - Select "Secured connection using TLS."
        
5. **Verify the Email Address**
    
    - Gmail will send a verification code to your domain email address (which gets forwarded to your Gmail inbox via Cloudflare Email Routing).
        
    - Check your Gmail inbox, find the verification email, and enter the code in the setup window or click the confirmation link.
        
6. **Start Sending Emails from Your Domain Email through Gmail**
    
    - When composing a message in Gmail, use the "From" dropdown to select your newly added domain email address.
        
    - Emails sent this way will use Gmail SMTP but appear to be from your custom domain.
        
    - Replies will come to your Gmail inbox due to Cloudflare forwarding.

**Important Notes:**

- Cloudflare Email Routing only receives and forwards incoming mail to your Gmail or other destination inbox.
    
- Sending is handled via Gmail SMTP using the steps above.
    
- This method avoids self-hosting mail servers and leverages Gmail’s reliable SMTP.
    
- Your origin email (the Gmail account receiving mail) is technically known because forwarded emails come there.
    
- DNS MX and TXT records for your domain must be properly set in Cloudflare for Email Routing functionality.

This is a secure and convenient setup commonly used to send and receive mail using a custom domain without hosting email servers.

If you want, I can also help you with the specific DNS record settings you need to confirm on Cloudflare for this to work.

Sources: Cloudflare docs, Gmail SMTP guides, community tutorials[1](https://gist.github.com/6220119/4ed99bc428d8f7fc8faeda9c05e6f4c6)[2](https://gist.github.com/irazasyed/a5ca450f1b1b8a01e092b74866e9b2f1)[3](https://juri.dev/notes/email-routing-gmail-cloudflare/)[4](https://community.cloudflare.com/t/solved-how-to-use-gmail-smtp-to-send-from-an-email-address-which-uses-cloudflare-email-routing/382769)[6](https://dev.to/pierre/gmail-with-cloudflare-email-routing-4413).

1. [https://gist.github.com/6220119/4ed99bc428d8f7fc8faeda9c05e6f4c6](https://gist.github.com/6220119/4ed99bc428d8f7fc8faeda9c05e6f4c6)
2. [https://gist.github.com/irazasyed/a5ca450f1b1b8a01e092b74866e9b2f1](https://gist.github.com/irazasyed/a5ca450f1b1b8a01e092b74866e9b2f1)
3. [https://juri.dev/notes/email-routing-gmail-cloudflare/](https://juri.dev/notes/email-routing-gmail-cloudflare/)
4. [https://community.cloudflare.com/t/solved-how-to-use-gmail-smtp-to-send-from-an-email-address-which-uses-cloudflare-email-routing/382769](https://community.cloudflare.com/t/solved-how-to-use-gmail-smtp-to-send-from-an-email-address-which-uses-cloudflare-email-routing/382769)
5. [https://reseau.cabot.place/Homelab/Using-Gmail-SMTP-with-Cloudflare-Email-Routing.-A-Step-by-Step-Guide](https://reseau.cabot.place/Homelab/Using-Gmail-SMTP-with-Cloudflare-Email-Routing.-A-Step-by-Step-Guide)
6. [https://dev.to/pierre/gmail-with-cloudflare-email-routing-4413](https://dev.to/pierre/gmail-with-cloudflare-email-routing-4413)
7. [https://www.reddit.com/r/SaaS/comments/1g0m0um/how_to_set_up_a_custom_email_using_gmail/](https://www.reddit.com/r/SaaS/comments/1g0m0um/how_to_set_up_a_custom_email_using_gmail/)
8. [https://pradeepsingh.com/send-mail-as-gmail-cloudflare/](https://pradeepsingh.com/send-mail-as-gmail-cloudflare/)
9. [https://www.youtube.com/watch?v=_JJ10QqVBWs](https://www.youtube.com/watch?v=_JJ10QqVBWs)
10. [https://developers.cloudflare.com/email-routing/get-started/](https://developers.cloudflare.com/email-routing/get-started/)