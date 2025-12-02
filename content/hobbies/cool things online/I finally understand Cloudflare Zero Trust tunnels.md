---
link: https://david.coffee/cloudflare-zero-trust-tunnels?ref=selfh.st#quickie-cloudflare-zero-trust-vs-tailscale
site: David Mohl
date created: 2025-09-21T18:00
slurped: 2025-11-30T18:38
title: I finally understand Cloudflare Zero Trust tunnels
date modified: 2025-11-30T18:38
tags:
  - slurp
---

A while ago, after frustration with Tailscale in environments where it couldn’t properly penetrate NAT/firewall and get a p2p connection, I decided to invest some time into learning something new: Cloudflare Zero Trust + Warp.

There are so many new concepts, but after way too long, I can finally say that **I understand Cloudflare Zero Trust Warp now**. I am a full-on Cloudflare Zero Trust with Warp convert, and while I still have Tailscale running in parallel, almost everything I do now is going through Zero Trust tunnels.

This post is an explanation of the basic concepts, because I’m sure others will have similar issues wrapping their head around it.

#### Why tho?

Why would you even sink so much time into learning this? What does it give you?

Argo tunnels through Zero Trust allow you to do a bunch of _really_ cool things:

- Connect private networks together - can be home networks, can be kubernetes clusters, you can create tunnels to and from every infra
- Expose private services to the public, on public hostnames, no matter where they are running. You could even put your router running at 192.168.1.1 on the internet, accessible to everyone, no Warp client required
- Create fully private networks with private IPs (10.x.x.x) that only resolve when Warp is connected, to services you specify
- Quickly expose a public route to any service running locally or on any server, for quick development, testing webhooks or giving coworkers a quick preview
- Create a fully private network running at home that’s only available when you’re connected to the Warp VPN client, or only to you, reachable anywhere
- No worries about NAT, everything goes through the Cloudflare network, no direct p2p connection required
- Add very granular access policies on who can access what - what login method does the user need, which email addresses are allowed. Allow bots and server-to-server exceptions with service access tokens.
    - Does the user need to have Warp running? Does he need to be enrolled in Zero Trust? Does he need some special permission flag?
- Authenticate to SSH servers through Zero Trust access policies without the need of SSH keys. Just connect Warp, type `ssh host` and you’re logged in
    - Close public SSH ports completely to only allow login through Warp
- Get the benefits of Cloudflare VPN edge routing on top (similar to 1.1.1.1 Warp+)

## Quickie: Cloudflare Zero Trust vs Tailscale

To get this out of the way:

- **Tailscale**: peer-to-peer, uses NAT and firewall penetration methods to establish p2p connections. If not possible, it goes through central relay servers. Absolute best speed and latency if a connection is established.
- **Cloudflare**: All traffic (with the exception of warp-to-warp routing, which is p2p) goes through Cloudflare’s edge network. So even SSH-ing into your local router will hop through Cloudflare servers. This adds latency, but no issues with NAT at all.

## Cloudflared != Warp

Cloudflare has 2 tools available: [Warp Client](https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp/) and [Cloudflared](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/). They interact with each other and have similarities in some areas but are not the same.

**Warp Client**

The tool that connects you to the Cloudflare network. This is the thing that you configure to add clients into your Zero Trust network and enforces policies.

Usually this runs on clients, but can also run on servers.

Warp client also supports [warp-to-warp routing](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/private-net/warp-to-warp/) which is a true p2p connection similar to Tailscale.

**Cloudflared**

The thing that creates a **tunnel** and adds it to the Zero Trust network.

Most commonly you run this on servers to expose tunnels into your network, but you can also run it on clients.

On the client side you can use `cloudflared access` to establish a connection with other things in your Zero Trust network.

Can also create one-time-use tunnels that aren’t connected to the Zero Trust network. Good for testing.

## Tunnels, Routes, Targets

This took me the longest to understand. Zero Trust allows you to configure _Tunnels_, _Routes_ and _Targets_; here’s how they interplay.

### Tunnels

The most important part of your setup. Tunnels are deployed through `cloudflared` and are simply an _exit_ for traffic. Think of it as a literal tunnel that has its end somewhere.

Tunnels are deployed to infrastructure in the target network. So if you have a home network with 192.168.1.1/24, you want to deploy `cloudflared` on any machine that’s always on and within that network. It can be your router, or your Raspi, it doesn’t matter.

For server-hosted services, you can have a tunnel on your main dev server, on a server, or on a pod in your Kubernetes cluster.

Now you have an opening into these networks through Warp/Argo tunnels.

#### Configuring tunnels

You can either [configure](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/do-more-with-tunnels/local-management/configuration-file/) tunnels through the Zero Trust UI by “adopting” them, or configure them in the `/etc/cloudflared/config.yml` config on the machine itself. Personal preference, I usually configure them on the machine itself.

The config specifies where a request should get routed to when it arrives at the tunnel. So the tunnel knows what to do with it.

In this config we tell cloudflared to route traffic arriving at this tunnel for hostname `gitlab.widgetcorp.tech` to localhost:80, and `gitlab-ssh` to the local SSH server.

```
❯ cat /etc/cloudflared/config.yml
tunnel: a2f17e27-cd4d-4fcd-b02a-63839f57a96f
credentials-file: /etc/cloudflared/a2f17e27-cd4d-4fcd-b02a-63839f57a96f.json
ingress:
  - hostname: gitlab.widgetcorp.tech
    service: http://localhost:80
  - hostname: gitlab-ssh.widgetcorp.tech
    service: ssh://localhost:22
  - service: http_status:404

  # Catch-all for WARP routing
  - service: http_status:404

warp-routing:
  enabled: true
```

The config alone doesn’t do anything. It just exposes a tunnel, and that’s it. What we need now are routes and targets.

#### Exposing a private network to the public with tunnels quickly

Quick addition, as this is a super common use case. If you want to just expose something in your home network to the internet, you can add a config like this:

```
tunnel: a2f17e27-cd4d-4fcd-b02a-63839f57a96f
credentials-file: /etc/cloudflared/a2f17e27-cd4d-4fcd-b02a-63839f57a96f.json
ingress:
  - hostname: homeassistant.mydomain.com
    service: http://192.168.1.3:80
```

Then go into Cloudflare DNS settings and map the domain `homeassistant.mydomain.com` to the tunnel:

`CNAME homeassistant.mydomain.com a2f17e27-cd4d-4fcd-b02a-63839f57a96f.cfargotunnel.com`

Now all traffic going to this domain will go through the cloudflared tunnel, which is configured to route `homeassistant.mydomain.com` to `192.168.1.3`. **No Warp client needed**, Argo tunnel does everything for us.

**Note:** If you adopted the tunnels and don’t use `config.yaml`, you can automatically create matching DNS records in the Cloudflare UI and don’t need to do this manually.

### Routes

A route defines _where_ to direct traffic to.

Let’s say your homeassistant runs on 192.168.1.3 at home and you want to reach it from outside. Just above we deployed a `cloudflared` tunnel on our router at 192.168.1.3, and added a config pointing the domain to the Argo tunnel, so `homeassistant.mydomain.com` is already available to the public. However, `192.168.1.3` isn’t, as it’s a private network IP.

![Configuring a route in Zero Trust](app://obsidian.md/routes-configure.png)

You can define:

- A route like `192.168.1.1/24` pointing at your tunnel, to route _ALL_ traffic to the full IP range through that tunnel (so even 192.168.1.245 will go through your tunnel)
- Or a more specific route like `192.168.1.3/32` pointing at your tunnel, to _ONLY_ route traffic to 192.168.1.3 through that tunnel.

When configured, once your user connects their Warp client that’s set up with your Zero Trust network, the Warp client will see requests to 192.168.1.3 and route it through the Cloudflare network to reach your specific tunnel. Like a little police helper directing cars where to go.

_If the Warp client is **not** connected, 192.168.1.3 will just resolve in your current local network. If connected, it will resolve to the tunnel._

**The routed IP doesn’t need to exist!** So you could, for example, route a random IP you like (e.g., 10.128.1.1) to your tunnel, the tunnel then forwards it based on your routes, for example to 192.168.1.1. This is extremely powerful because it allows you to build your own fully virtual network.

That’s all it does, what happens afterwards is up to the tunnel config that we created above. The tunnel decides where to point the incoming request to, whether that’s localhost or somewhere else.

To summarize, the `route` tells the Warp client where to route traffic to.

Now we have 2 things working:

- `homeassistant.mydomain.com` - goes through a Cloudflare DNS record pointing at an Argo tunnel, which then forwards to 192.168.1.3. This works without Warp connected as it’s on the DNS level, public to everyone.
- `192.168.1.3` - The Warp client sees the request and routes it through the Argo tunnel, which then forwards it to `192.168.1.3` within that network. This needs Warp connected to work, and is only visible to people in your Zero Trust org.

### Targets

This one took me a while.

Targets are needed to _define a piece of infrastructure_ that you want to protect through Zero Trust. They are like a pointer pointing to something in your network. This goes hand-in-hand with routes, but isn’t always needed.

Let’s say you have 192.168.1.3 (homeassistant) exposed through a Cloudflare tunnel. By default, anyone in your network that is part of your Zero Trust org and has Warp client installed can now access your homeassistant at 192.168.1.3.

We can change that with targets. For example, defining a target with hostname = `homeassistant.mydomain.com` to the route `192.168.1.3/32` allows us to add access policies to it. We can also put an entire network into the target by specifying `192.168.1.3/24` to control access. This also works with virtual IPs like 10.128.1.1!

![Configuring a target in Zero Trust](app://obsidian.md/targets-config-screen.png)

Targets alone won’t do anything, they just point to the service or network. “Hey, here is homeassistant”, or “hey, here is my home network”.

## Access Policies: Protecting Who Can Access What

Continuing the example from above:

- we have a tunnel running on our home network that routes `homeassistant.mydomain.com` to `192.168.1.3`
- we set up public DNS records to point `homeassistant.mydomain.com` to the Argo tunnel in Cloudflare
- we created a _route_ `192.168.1.3` to go through the same tunnel
- we also created a _target_ pointing to `192.168.1.3`

When users access either `192.168.1.3` or `homeassistant.mydomain.com`, the Warp client will route the request through the tunnel, which then forwards the request to 192.168.1.3. Homeassistant loads and everything is fine.

_But do we want that?_

Probably not.

Access policies to the rescue!

With access policies, we can leave things in the public but protect them with Cloudflare Zero Trust access. So while 192.168.1.3 is only available if Warp is connected (so routing to it works), we can add security to our public `homeassistant.mydomain.com`.

Go to Access -> Applications -> Add an Application -> Self-hosted.

Here we can define _what_ should be protected, and _how_.

Going with our previous example, we can add a public hostname `homeassistant.mydomain.com` or an IP like `192.168.1.3` (or both), then attach policies of who should be able to access it.

You can specify **Include** (“OR”) and **Require** (“AND”) selectors.

- **Require** rules must always be met, _on top_ of include rules, to grant access
- Any of the **Include** rules must match to grant access

Then there are _Actions_:

- **Allow** - when the policy matches, allow access
- **Deny** - when the policy matches, deny access. aka blocking something.
- **Bypass** - when the policy matches, bypass Zero Trust completely. No more checking.
- **Service Auth** - when the policy matches, allow authentication to the service with a service token header (good for server-to-server, or bots). Check Access -> Service Auth to create these tokens.

### Allow public access to everyone logging into your network

The most common use case: `homeassistant.mydomain.com` is public. We want to keep it public, but add an extra layer of security.

Add an _include_ policy, pick any of the `email` selectors, add the email of the user you want to allow access to. Now only people authenticated with your Zero Trust org with the specified emails can access your homeassistant, without needing to have Warp running.

We can harden this by adding _require_ rules: Add a _Login Method_ selector rule, pick a specific login method like GitHub. Now only people with specific emails that have authenticated through GitHub can access your homeassistant, without needing to have Warp running.

![Configuring an Access Policy with GitHub and email](app://obsidian.md/policy-github-emails.png)

### Bypass login completely when connected through WARP

Another policy I like having is to skip the login screen entirely when connected through Warp. If a user is already enrolled into my Zero Trust org and has the Warp client provisioned, then there’s no need to ask them to authenticate again.

We can add a separate policy (don’t edit the one we just created above), pick the _Gateway_ selector and set it to _Allow_ or _Bypass_.

![Policy to allow Gateway auth](app://obsidian.md/policy-gateway-auth.png)

**Don’t use ‘Warp’** - the Warp selector will match anyone that has Warp running, including the consumer 1.1.1.1 app. _Gateway_, on the other hand, matches only if someone is connecting through your Gateway, be that DNS or a provisioned Warp client.

_(The ‘Gateway’ selector is only available if the Warp client is set to allow WARP authentication identity)_

Now when:

- Warp through Zero Trust is running on a machine: No login screen
- No Warp running (public access): Prompt for login screen, but only allow specific emails that authenticated through GitHub

This setup makes it very convenient to reach homeassistant, no matter if connected through Warp or not.

## Deploying the Warp client and enrolling into Zero Trust

Are you still with me?

Our network is basically done. We have a login-protected `homeassistant.mydomain.com` that routes through our tunnel into our private network and terminates at `192.168.1.3`, and we have a direct route to `192.168.1.3` that only works when connected with Warp.

We also have login policies to make sure only specific users (logged in with GitHub and certain email addresses) can access homeassistant.

_So how do we deploy the dang Warp client?_

Actually the same: We create some policies.

**Head to Settings -> Warp Client**

In **Enrollment Permissions**, we specify the same policies for who can enroll. For example,  when authenticated through GitHub is allowed to enroll. In the _Login Methods_ we can specify what login methods are available when someone tries to enroll into our Zero Trust org.

Toggle _WARP authentication identity settings_ to make the _Gateway_ selector available in policies, effectively allowing the configured WARP client to be used as a login method.

**Careful here**, once someone is enrolled, they are basically in your Zero Trust network through Warp. Make sure you harden this.

Then, in **Profile settings**, we define _how the WARP client behaves_. These are things like protocol: MASQUE or WireGuard, service mode, what IPs and domains to exclude from WARP routing (e.g., the local network should never go through WARP), setting it to exclude or include mode and so on.

Other settings I recommend setting:

- _Install CA to system certificate store_ - installs the Cloudflare CA certificate automatically when enrolled.
- _Override local interface IP_ - assigns a unique CGNAT private IP to the client. This is needed for warp-to-warp routing.
- _Device Posture_ - what checks the WARP client should perform for the org. E.g., check the OS version, some OS files on disk, etc. I have this set to _WARP_ and _Gateway_ because I want the client to provide information on whether the user is connected through WARP and Gateway, for skipping certain login pages.

Once done, just open the Warp client ([https://developers.cloudflare.com/warp-client/)](https://developers.cloudflare.com/warp-client/\)), and log in to your network. This should open the login pages you specified in the _Device Enrollment_ screen, and check all the enrollment policies you specified.

Once passed, congratulations, your WARP client is now connected to your Zero Trust network. The client will then go ahead and start routing `192.168.1.3` through your tunnels, as specified in your tunnel and route settings.

🎉

## What we built

If you followed this guide, here is what we built:

- Login methods to connect the Warp client to your Zero Trust org through GitHub and specific email addresses
- A _tunnel_ within your private network that
    - Forwards any request coming in with host `homeassistant.mydomain.com` to `192.168.1.3`
- A _route_ that forwards all traffic for `192.168.1.3` to the tunnel in your private network, which will terminate it at 192.168.1.3, which will only work when connected through Warp to route the request
- A DNS name `homeassistant.mydomain.com` that points to the Argo tunnel, and will allow everyone (even if not connected through Warp) to access homeassistant which runs at 192.168.1.3
- Access policies that will
    - Ask users that are not connected to Zero Trust through Warp to log in with GitHub and specific email, so everyone can access it if they can log in
    - A policy that skips the login screen completely and just shows homeassistant if the user connects through Zero Trust Warp client (enrolled into our org)

You don’t need the public domain and you don’t need the route to 192.168.1.3. These are 2 different options that you can use to expose homeassistant when you’re not at home. One is using a public domain name everyone can see, one is explicitly requiring connecting through enrolled Warp.

What I _didn’t_ cover in this post:

- Warp-to-warp routing
- Creating and assigning fully private IPs that only exist within your Zero Trust network
- SSH authentication through Zero Trust access policies (that’s what we need _Targets_ for)
- The other application types besides _Self-Hosted_

I’m happy to expand on it if there’s interest. Let me know on [X](https://x.com/dvcrn) or [Bluesky](https://bsky.app/profile/david.d.sh).

Happy tunneling! ⛅