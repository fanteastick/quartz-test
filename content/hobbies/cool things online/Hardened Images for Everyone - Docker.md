---
link: https://www.docker.com/blog/docker-hardened-images-for-every-developer/
byline: Igor Aleksandrov
site: Docker
date created: 2025-12-17T05:55
slurped: 2025-12-19T19:31
title: Hardened Images for Everyone | Docker
date modified: 2025-12-19T19:32
tags:
  - slurp
---

Containers are the universal path to production for most developers, and Docker has always been the steward of the ecosystem. Docker Hub has over 20 billion monthly pulls, with nearly 90% of organizations now relying on containers in their software delivery workflows. That gives us a responsibility: to help secure the software supply chain for the world.

Why? Supply-chain attacks are exploding. In 2025, they caused more than $60 billion in damage, tripling from 2021. No one is safe. Every language, every ecosystem, every build and distribution step is a target. 

For this reason, we launched Docker Hardened Images (DHI), a secure, minimal, production-ready set of images, in May 2025, and since then have hardened over 1,000 images and helm charts in our catalog. Today, we are establishing a new industry standard by making DHI freely available and open source to everyone who builds software. All 26 Million+ developers in the container ecosystem. DHI is fully open and free to use, share, and build on with no licensing surprises, backed by an Apache 2.0 license. DHI now gives the world a secure, minimal, production-ready foundation from the very first pull.

If it sounds too good to be true, here’s the bottom line up front: every developer and every application can (and should!) use DHI without restrictions. When you need continuous security patching, applied in under 7 days, images for regulated industries (e.g., FIPS, FedRAMP), you want to build customized images on our secure build infrastructure, or you need security patches beyond end-of-life, DHI has commercial offerings. Simple.

Since the introduction of DHI, enterprises like Adobe and Qualcomm have bet on Docker for securing their entire enterprise to achieve the most stringent levels of compliance, while startups like Attentive and Octopus Deploy have accelerated their ability to get compliance and sell to larger businesses.

Now everyone and every application can build securely from the first `docker build`. Unlike other opaque or proprietary hardened images, DHI is compatible with Alpine and Debian, trusted and familiar open source foundations teams already know and can adopt with minimal change. And while some vendors suppress CVEs in their feed to maintain a green scanner, Docker is _always_ transparent, even when we’re still working on patches, because we fundamentally believe you should always know what your security posture is. The result: dramatically reduced CVEs (guaranteed near zero in DHI Enterprise), images up to 95 percent smaller, and secure defaults without ever compromising transparency or trust.

There’s more. We’ve already built Hardened Helm Charts to leverage DHI images in Kubernetes environments; those are open source too. And today, we’re expanding that foundation with Hardened MCP Servers. We’re bringing DHI’s security principles to the MCP interface layer, the backbone of every agentic app. And starting now, you can run hardened versions of the MCP servers developers rely on most: Mongo, Grafana, GitHub, and more. And this is just the beginning. In the coming months, we will extend this hardened foundation across the entire software stack with hardened libraries, hardened system packages, and other secure components everyone depends on. The goal is simple: be able to secure your application from `main()` down. 

##   The philosophy of Docker Hardened Images

Base images define your application’s security from the very first layer, so it’s critical to know exactly what goes into them. Here’s how we approach it.

First: total transparency in every part of our minimal, opinionated, secure images.

DHI uses a distroless runtime to shrink the attack surface while keeping the tools developers rely on. But security is more than minimalism; it requires full transparency. Too many vendors blur the truth with proprietary CVE scoring, downgraded vulnerabilities, or vague promises about reaching SLSA Build Level 3.

DHI takes a different path. Every image includes a complete and verifiable SBOM. Every build provides SLSA Build Level 3 provenance. Every vulnerability is assessed using transparent public CVE data; we won’t hide vulnerabilities when we haven’t fixed them. Every image comes with proof of authenticity. The result: a secure foundation you can trust, built with clarity, verified with evidence, and delivered without compromise.

Second: Migrating to secure images takes real work, and no one should pretend otherwise. But as you’d expect from Docker, we’ve focused on making the DX incredibly easy to use. As we mentioned before, DHI is built on the open source foundations the world already trusts, Debian and Alpine, so teams can adopt it with minimal friction.  We’re reducing that friction even more: [Docker’s AI assistant](https://docs.docker.com/dhi/migration/migrate-with-ai/) can scan your existing containers and recommend or even apply equivalent hardened images; the feature is experimental as this is day one, but we’ll quickly GA it as we learn from real world migrations. 

Lastly: we think about the most aggressive SLAs and longest support times and make certain that every piece of DHI can support that when you need it.

DHI Enterprise, the commercial offering of DHI, includes a 7-day commitment for critical CVE remediation, with a roadmap toward one day or less. For regulated industries and mission-critical systems, this level of trust is mandatory. Achieving it is hard. It demands deep test automation and the ability to maintain patches that diverge from upstream until they are accepted. That is why most organizations cannot do this on their own. In addition, DHI Enterprise allows organizations to easily customize DHI images, leveraging Docker’s build infrastructure which takes care of the full image lifecycle management for you, ensuring that build provenance and compliance is maintained. For example, typically organizations need to add certificates and keys, system packages, scripts, and so on. DHI’s build service makes this trivial.

Because our patching SLAs and our build service carry real operational cost, DHI has historically been one commercial offering. But our vision has always been broader. This level of security should be available to everyone, and the timing matters. Now that the evidence, infrastructure, and industry partnerships are in place, we are delivering on that vision. That is why today we are making Docker Hardened Images free and open source.

This move carries the same spirit that defined Docker Official Images over a decade ago. We made them free, kept them free, and backed them with clear docs, best practices, and consistent maintenance. That foundation became the starting point for millions of developers and partners.

Now we’re doing it again. DHI being free is powered by a rapidly growing ecosystem of partners, from Google, MongoDB, and the CNCF delivering hardened images to security platforms like Snyk and JFrog Xray integrating DHI directly into their scanners. Together, we are building a unified, end-to-end supply chain that raises the security bar for the entire industry.

 “Docker’s move to make its hardened images freely available under Apache 2.0 underscores its strong commitment to the open source ecosystem. Many CNCF projects can already be found in the DHI catalog, and giving the broader community access to secure, well-maintained building blocks helps us strengthen the software supply chain together. It’s exciting to see Docker continue to invest in open collaboration and secure container infrastructure.”

Jonathan Bryce

Executive Director at the Cloud Native Computing Foundation

 “Software supply chain attacks are a severe industry problem. Making Docker Hardened Images free and pervasive should underpin faster, more secure software delivery across the industry by making the right thing the easy thing for developers.”

James Governor

Analyst and Co-founder, RedMonk

 “Security shouldn’t be a premium feature. By making hardened images free, Docker is letting every developer, not just big enterprises, start with a safer foundation. We love seeing tools that reduce noise and toil, and we’re ready to run these secure workloads on Google Cloud from day one”

Ryan J. Salva

Senior Director of Product at Google, Developer Experiences

 “At MongoDB, we believe open source plays a central role in how modern software is built, enabling flexibility, choice, and developer productivity. That’s why we’re excited about free Docker Hardened Images for MongoDB. These images provide trusted, ready-to-deploy building blocks on proven Linux foundations such as Alpine and Debian, and with an Apache 2.0 license, they remain fully open source and free for anyone to use. With Docker Hub’s global reach and MongoDB’s commitment to reliability and safety, we are making it easier to build with confidence on a secure and open foundation for the future”

Jim Scharf

Chief Technology Officer, MongoDB

 “We’re excited to partner with Docker to deliver secure, enterprise-grade AI workloads from development to production. With over 50 million users and the majority of Fortune 500 trusting Anaconda to help them operate at enterprise scale securely, this partnership with Docker brings that same foundation to Docker Hardened Images. This enables teams to spend less time managing risk and more time innovating, while reducing the time from idea to production.”

David DeSanto

Chief Executive Officer, Anaconda

 “Socket stops malicious packages at install time, and Docker Hardened Images (DHI) give those packages a trustworthy place to run. With free DHI, teams get both layers of protection without lifting a finger. Pull a hardened image, run npm install, and the Socket firewall embedded in the DHI is already working for you. That is what true secure-by-default should look like, and we’re excited to partner with Docker and make it happen at their scale.”

Feross Aboukhadijeh

Founder and CEO, Socket

 “Teams building with Temporal orchestrate mission-critical workflows, and Docker is how they deploy those services in production. Making Docker Hardened Images freely available gives our users a very strong foundation for those workflows from day one, and Extended Lifecycle Support helps them keep long running systems secure without constant replatforming.”

Maxim Fateev

Chief Technology Officer, Temporal

 “At CircleCI, we know teams need to validate code as fast as they can generate it—and that starts with a trusted foundation. Docker Hardened Images eliminate a critical validation bottleneck by providing pre-secured, continuously verified components right from the start, helping teams ship fast, with confidence.”

Rob Zuber

Chief Technology Officer, CircleCI

 “We evaluated multiple options for hardened base images and chose Docker Hardened Images (DHI) for its alignment with our supply chain security posture, developer tooling compatibility, Docker’s maturity in this space, and integration with our existing infrastructure. Our focus was on balancing trust, maintainability, and ecosystem compatibility.”

Vikram Sethi

Principal Scientist, Adobe

 “Developers deserve secure foundations that do not slow them down. By making Docker Hardened Images freely available, Docker is making it easier than ever to secure the software supply chain at the source. This helps eliminate risk before anything touches production, a mission shared by LocalStack. At LocalStack, we are especially excited that developers will be able to use these hardened, minimal images for our emulators, helping teams finally break free from constant CVE firefighting.”

Waldemar Hummer

Co-Founder and CTO at LocalStack

## A Secure Path for Every Team and Business

Everyone now has a secure foundation to start from with DHI. But businesses of all shapes and sizes often need more. Compliance requirements and risk tolerance may demand CVE patches ahead of upstream the moment the source becomes available. Companies operating in enterprise or government sectors must meet strict standards such as FIPS or STIG. And because production can never stop, many organizations need security patching to continue even after upstream support ends.

That is why we now offer three DHI options, each built for a different security reality.

**Docker Hardened Images**: Free for Everyone. DHI is the foundation modern software deserves: minimal hardened images, easy migration, full transparency, and an open ecosystem built on Alpine and Debian.

**Docker Hardened Images (DHI) Enterprise**: DHI Enterprise delivers the guarantees that organizations, governments, and institutions with strict security or regulatory demands rely on. FIPS-enabled and STIG-ready images. Compliance with CIS benchmarks. SLA-backed remediations they can trust for critical CVEs in under 7 days. And those SLAs keep getting shorter as we push toward one-day (or less) critical fixes.

For teams that need more control, DHI Enterprise delivers. Change your images. Configure runtimes. Install tools like curl. Add certificates. DHI Enterprise gives you unlimited customization, full catalog access, and the ability to shape your images on your terms while staying secure.

**DHI Extended Lifecycle Support (ELS):** ELS is a paid add-on to DHI Enterprise, built to solve one of software’s hardest problems. When upstream support ends, patches stop but vulnerabilities don’t. Scanners light up, auditors demand answers, and compliance frameworks expect verified fixes. ELS ends that cycle with up to five additional years of security coverage, continuous CVE patches, updated SBOMs and provenance, and ongoing signing and auditability for compliance.

You can learn more about these options [here](https://www.docker.com/products/hardened-images/).

## Here’s how to get started

Securing the container ecosystem is something we do together. Today, we’re giving the world a stronger foundation to build on. Now we want every developer, every open source project, every software vendor, and every platform to make Docker Hardened Images the default.

- Join our launch [webinar](https://www.docker.com/events/dhi-els-launch-webinar/) to get hands-on and learn what’s new.
- [Start using](https://hub.docker.com/hardened-images/catalog) Docker Hardened Images today for free.
- [Explore the docs](https://docs.docker.com/dhi/get-started/) and bring DHI into your workflows               
- Join our [partner program](https://docker.com/dhi-partners-sign-up/) and help raise the security bar for everyone.    

Lastly, we are just getting started, and if you’re reading this and want to help build the future of container security, we’d love to meet you. [Join us.](https://www.docker.com/careers/)

## Authors’ Notes

### Christian Dupuis

Today’s announcement marks a watershed moment for our industry. Docker is fundamentally changing how applications are built-secure by default for every developer, every organization, and every open-source project. 

This moment fills me with pride as it represents the culmination of years of work: from the early days at Atomist building an event-driven SBOM and vulnerability management system, the foundation that still underpins Docker Scout today, to unveiling DHI earlier this year, and now making it freely available to all. I am deeply grateful to my incredible colleagues and friends at Docker who made this vision a reality, and to our partners and customers who believed in us from day one and shaped this journey with their guidance and feedback.

Yet while this is an important milestone, it remains just that, a milestone. We are far from done, with many more innovations on the horizon. In fact, we are already working on what comes next.

Security is a team sport, and today Docker opened the field to everyone. Let’s play.

### Michael Donovan

I joined Docker to positively impact as many developers as possible. This launch gives every developer the right to secure their applications without adding toil to their workload. It represents a monumental shift in the container ecosystem and the digital experiences we use every day.

I’m extremely proud of the product we’ve built and the customers we serve every day. I’ve had the time of my life building this with our stellar team and I’m more excited than ever for what’s to come next.
