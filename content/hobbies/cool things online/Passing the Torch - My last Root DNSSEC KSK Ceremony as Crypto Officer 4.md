---
link: https://technotes.seastrom.com/2025/11/23/passing-the-torch.html
slurped: 2025-11-24T22:46
title: Passing the Torch - My last Root DNSSEC KSK Ceremony as Crypto Officer 4
date created: 2025-11-23T22:46
date modified: 2025-11-24T22:46
tags:
  - slurp
---

Many years ago, when I was but an infant, the first computers were connected on the [ARPANET](https://en.wikipedia.org/wiki/ARPANET) - the seminal computer network that would eventually evolve to become the Internet. Computers at the time were large and expensive; indeed the first version of [NCP](https://en.wikipedia.org/wiki/Network_Control_Protocol_\(ARPANET\)) - the predecessor of TCP/IP - only countenanced roughly 250 computers on the network.

The name (human friendly) to network address (computer friendly) mapping on this network was maintained via a "hosts file" - literally a flat file of ordered pairs, creating the connection between host (computer) name and address.

So it continued as computers got less expensive and proliferated, the [Network Effect](https://en.wikipedia.org/wiki/Network_effect) caused more institutions to want to be connected to the ARPANET. TCP/IP was developed in response to this, with support for orders of magnitude more connected computers. Along the way, the military users of the network got carved off into its own network, and by the early 1980s we had the beginnings of the Internet, or a "catenet" as it was sometimes called at the time - a network of networks.

Clearly, as we went from "a couple hundred computers" to "capacity for billions", a centrally managed host file wasn't going to scale, and by the early 1980s development had started on a distributed database to replace the centrally managed file. The name for this distributed database was the Domain Name System, or DNS.

It's important to realize that at the time, access to the network of networks was still restricted to a chosen few - higher education, research institutions, military organizations and the military-industrial complex (ARPA, later DARPA, was, after all, an activity of the United States Department of Defense), and a few companies that were tightly associated with one or more of those constituencies. Broad public commercial access to the Internet was many years in the future.

It was in this environment that the DNS sprang forth. Academics, military researchers, university students - a pretty collegial environment. Not to mention paleo-cybersecurity practices - indeed the word "cybersecurity" may not have even been coined yet, though the notion of "computer security" dates back to the early 1970s.

I've mentioned this brief "history of the early Internet" to preemptively answer the question which inevitably arises: why didn't DNS have better security built in? The answer is twofold: firstly it didn't have to based on the environment that it evolved in, and secondly, even if it had, the security practices would have been firmly rooted in 1980s best practices, which would certainly be inadequate by modern standards.

Discovery of security flaws in 1990 led the IETF to begin development on Domain Name System Security Extensions (DNSSEC) in 1995. Early versions were difficult to deploy. Later versions improved somewhat. But inertia is a thing, the status quo tends to prevail, and there was very real concern that DNSSEC would be a net reliability minus (security vs. availability can be a tricky circle to square), concentrate power in undesirable ways, and result in other unforeseen negative effects.

At the end of the day, as it so often does, it took a crisis to get the ball rolling for real. In 2008, [Dan Kaminsky](https://en.wikipedia.org/wiki/Dan_Kaminsky) discovered a fundamental flaw in DNS, which simplified cache poisoning - essentially making it possible for an attacker to misdirect users to arbitrary web sites.

In less than two years, the DNS root would be cryptographically signed - allowing those who wished to sign their domains as well to create a cryptographic chain of trust authenticating their DNS lookups. This is non-repudiation, not non-disclosure - DNS queries and responses continued to happen in the clear. But this time, responses came back with a digital signature, courtesy of DNSSEC.

David Huberman at ICANN did a splendid slide deck explaining [how it all works](https://technotes.seastrom.com/assets/2025-11-23-passing-the-torch/2-David-Huberman_DNS-security-and-the-Root-DNSSEC-KSK-Ceremony.pdf).

Trust in a system requires more than technical correctness. It involves trust in the execution of running the system itself. For that reason ICANN decided that it would build a framework to facilitate trust and transparency. Among other things it included:

- Placing the cryptographic material in two highly secure sites, one near Washington DC and one in Los Angeles (geographic diversity)
- Creating a multi-layered security regimen requiring several people to access the Key Management Facility
- Storing cryptographic material in offline [HSMs](https://en.wikipedia.org/wiki/Hardware_security_module) which utilize [Shamir's Secret Sharing](https://en.wikipedia.org/wiki/Shamir%27s_secret_sharing) to require a quorum of at least 3 out of 7 Crypto Officers to be present in order to "wake them up"
- Trusted Community Representatives with roles of Crypto Officer and Recovery Key Share Holder
- Highly scripted (and therefore auditable) ceremonies surrounding handling the cryptographc material
- Live streaming all events
- Hosting External Witnesses from the community who have expressed interest in being present for a ceremony in person

When the call for volunteers to be Trusted Community Representatives came out, I was no stranger to community involvement, having served several years on the ARIN Advisory Council and done community work (and later Board work) for NANOG. I was employed by a Top Level Domain operator, and submitted my CV and expressed my interest.

That's how I found myself in Culpeper, Virginia in 2010 as Crypto Officer 4 at the first ceremony for signing the DNSSEC Root. I had no idea that I would still be doing it fifteen years later. I was the last of the original Crypto Officers for KMF-East, and the second last overall - outlasted only by Subramanian "SM" Moonesamy, who is Crypto Officer 7 for KMF-West.

It's been an adventure. I've been a small participant in root key rolls, put in a B-roll appearance on BBC Horizon (S53E13), become friends with many of the people I served with, overseen ceremonies remotely during the COVID lockdown, and witnessed an amazing pivot by ICANN staff who managed to get new HSMs selected, tested, integrated, and deployed on only 8 months' notice, a feat which I remain in awe of.

I was an early advocate for improving trust in our process by leveraging natural turnover and backfilling existing TCRs with people selected from a broader set of qualified individuals than just the fellowship of DNS protocol experts, operators, and developers. I'm grateful that our voices were heard.

On November 13th 2025, I passed the torch to [Lodrina Cherne](https://www.sans.org/profiles/lodrina-cherne) who is now Crypto Officer 4 for KMF-East. Lodrina is a security researcher, an educator with an emphasis on digital forensics, and works in security engineering at a large cloud provider. I'm honored to have her as my successor.

I've had several people reach out to me to ask what prompted me to step back from the ICANN volunteer work. Those who were hoping for some kind of salacious dirt or scandal were sorely disappointed - quite the opposite, this is a huge success story and I'm pleased to have been able to do my small part. A direct cut and paste from Slack logs with one of them follows:

> What led you to step back from ICANN?

Several things:

- It was understood to be a 5 year commitment. I've been doing it for more than 15.
- It was broadly agreed among the cohort many years ago (over a decade ago) that more people from more diverse backgrounds than just DNS-old-boy-network (which was the original group of TCRs) was a Good Thing.
- Many people cycled out earlier; I was happy to let the folks for whom travel was more odious go first. But it's only practical and only really good for the system to cycle out a single TCR per ceremony.
- COVID delayed this. Kaminsky's untimely death and subsequent replacement as a recovery key shareholder (RKSH) delayed this.
- A further delay was the AEP Keyper HSM getting abruptly EOLed, and the transition to the Thales Luna HSMs. It went off without a hitch after being researched, developed, and executed in 8 months - a record which I stand in awe of and which is a true testament to the skill and commitment of the ICANN PTI team. ICANN expressed the desire for continuity among long-serving COs past that milestone; Frederico Neves (fellow original Crypto Officer) and I were willing to extend our stay for that.

So in short it was time to pass the torch. Everyone has been doing everything right. I remarked at the end of the Ceremony 59 that when we started doing this 15 years ago, success was not guaranteed; it took the Kaminsky bug to get us over the line to actually deploy it. Today, the major Unix DNS resolvers ship with DNSSEC validation enabled. All of the major public DNS resolvers (google, quad9, cloudflare) do DNSSEC validation. I thanked everyone who has been responsible for and put their personal credibility on the line for the security, integrity, and credibility of this process and stated that I was honored to have been able to play a small part in doing that.

Epilogue:

I won't be participating in most East Coast ceremonies from here on out, but I don't rule out occasionally showing up as an external witness, particularly at KMF-West where I have never visited in person.

Here scans of our ceremony scripts from both Ceremony 59 and the previous day's administrative ceremonies.

[Root DNSSEC KSK Ceremony 59](https://technotes.seastrom.com/assets/2025-11-23-passing-the-torch/20251113%20Root%20DNSSEC%20KSK%20Ceremony%2059.pdf)

[Root DNSSEC KSK Administrative Ceremony 59 Backup HSM Acceptance Testing](https://technotes.seastrom.com/assets/2025-11-23-passing-the-torch/20251112%20Root%20DNSSEC%20KSK%20Administrative%20Ceremony%2059%20Backup%20HSM%20Acceptance%20Testing.pdf)

[Root DNSSEC KSK Administrative Ceremony 59 Safe #2 Credentiais Safe Deposit Box Lock Assembly Programming](https://technotes.seastrom.com/assets/2025-11-23-passing-the-torch/20251112%20Root%20DNSSEC%20KSK%20Administrative%20Ceremony%2059%20Safe%20%232%20Credentiais%20Safe%20Deposit%20Box%20Lock%20Assembly%20Programming.pdf)

[kskm-ksrsigner-logs.pdf](https://technotes.seastrom.com/assets/2025-11-23-passing-the-torch/20251113%20kskm-ksrsigner-logs.pdf)