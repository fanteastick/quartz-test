---
link: https://wangcong.org/2019-03-14-how-to-pretend-to-be-a-linux-kernel-expert.html
site: A Geek’s Page
date created: 2019-03-14T14:25
slurped: 2025-12-12T21:49
title: How to pretend to be a Linux kernel expert
date modified: 2025-12-16T23:30
tags:
  - slurp
---

### How to pretend to be a Linux kernel expert

Like many other areas, surprisingly it is not even hard to pretend to be an expert in Linux kernel, as long as you can talk so much bullshit that even others don’t want to challenge your authority on this topic. Especially in United States, people tend to talk a lot in their everyday life within this culture, and sometimes only by talking a lot you could show your “expertise” to people. I am always amazed to see how people could literally talking for hours without essentially giving any single piece of useful information.

Take a look at Donald Trump who already self-claims to be an expert in so many areas and watch the way he speaks, most of the time it is full of bullshit, and there are still a lot, really a lot, of people still believe in and like him. If he could make it, you could too. :)

On the other hand, being a true expert is hard, really really hard. You have to spend years on really studying, most of the time you can’t even show off this to your friends. And, you have to work with other true experts in a very hard way to make them accept your work, sometimes this is even painful.

So, is there any quick way to become an expert without even understanding the stuffs you are talking about? That is not just possible but also doable in the real world, as long as the people that challenge you are not true experts either. Use some social engineering tricks when you are challenged, make others feel uncomfortable or even stupid when they are trying to challenge you, you are the expert already!

This guide is supposed to be such one for you, particularly and hopefully this could help you survive any Linux kernel domain-specific interviews, without even writing any single line of code.

Of course we are only interested in the first part. Cheating is easy and quick, sometimes you don’t even have to feel guilty. Hey, look, you are already an expert, cheating on a simple question doesn’t harm or define who you are, right?

Before your interview, try to search on Glassdoor to see what kind of interview questions this company usually asks. This works quite well as interviewers are often very lazy to prepare any new interview questions, they just share a pool of questions, or even worse, they just search for one online like you just did.

Try to memorize the answers online. This should work for all kind of interview questions, especially those with quick answers.

Particularly for Linux kernel, which is usually domain-specific, try to grab some Linux kernel books, for instance, Understanding Linux Kernel. You don’t have read all of them, just pick a topic, for example, networking, and read some related chapters and memorize the diagrams, the fancy terms, try to mimic what true experts speak in this area. The more you can memorize, the better you would be. There is really nothing you have to understand.

Remember, people are very impressed if you can just draw a complex diagram on a whiteboard in front of them, as long as you can just bring it up in a right time.

1. Talking, talking, talking

If people don’t believe you are an expert after listening to you, you are just not talking enough. And of course, wording is also important, how to make a trivial thing look great is an art you have to master.

Let’s use a real example.

Question: How do you understand Linux TCP/IP stack?

Bad answer: I have no experience in this area, I only have very limited knowledge of networking, especially Linux networking.

Good answer: I have been working on many networking related projects in my previous jobs (even it is just `ping google.com`), particularly I wrote some script to diagnose the networking latency in our Linux network (routers run Linux) and identify some unexpected packet drops and the bottleneck (even it is just a wrapper of ping just for parsing its output), then I worked closely with our networking team to solve it successfully (someone fixed the broken routers for you). This boots up the networking performance by X percent and saves about X thousands dollars for our company (no one can verify this). I led and drove the whole project (of course you did!), successfully applied my networking knowledge in my job. In the other job, I worked on another networking throughput tuning, I evaluated this issue and setup a test case for reproducing it, after narrowing down (just blindly guessing) to the bottom, I found out the bottleneck is in some middle router (by running trouceroute after searching on stackoverflow) which caused TCP congestions (you can always blame TCP). We replaced the current default TCP congestion control algorithm with a evolutional BBR (you don’t even need to know what BBR stands for), the throughput went up by X percent (again, no one could verify, just don’t be too aggressive).

See the difference? Even your networking knowledge is nothing beyond what you find on stackoverflow, you can still decorate it like you are the expert! It is all about wording, wording and wording.

People are easier to be convinced with numbers, even fake ones, they have no way to verify what you claim unless you really go out of the script. Trying to give yourself as much credits as you can, there is no way to verify what you have done and what your colleagues have done in one particular project, especially when it was a long time ago.

You still have to memorize some terms like “TCP congestion control”, you don’t even need to understand it, in fact the people interview you unlikely understand it either, they don’t want to challenge you unless they are really paranoid, they just want to hear words like “TCP congestion control”. By delivering as many words like this as you can, you could make them feel like you are unchallengeable and definitely the expert they want! Keep talking until this is true, I bet they don’t even want to interrupt you. How dare they? :)

Let me give you some golden sentences here:

“Everything is file in UNIX”. Of course, who would doubt about this!

“Keep it simple”. Of course, of course, everyone loves KISS. It is never aggressive to stress this point for any software engineer.

“A key for optimizing networking performance is to reduce copies”. Many people don’t understand this, you just need to repeat it in an appropriate context, or fold this into your own experience. Senior level expert!

“There is always a tradeoff.” Ah, what a true expert now you are!!! This could impress a lot of people, believe me. Senior staff level!

“The whole TCP/IP stack should be just moved to user-space, it is hard to optimize in kernel-space.” Wow, what a broad vision you have! You are the leading expert of the industry now!! Congratulations! Senior principle level!

“I think DPDK and eBPF is the future.” Who would question your expertise preference and vision anyway, dear director?

“The trend is hardware offloads a lot of work from CPU.” Sure… Any experienced networking engineers would agree.

Now let’s try to combine some of them together:

DPDK and eBPF should integrate really well with containers, provide better performance and isolations for different workloads. With the hardware accelerations, the CPU will be freed to do some more important work within the whole TCP/IP stack in the near future.

Look, it sounds really great, no one could question it and everyone would agree you are the senior principle engineer they should hire.

Key takeaways:

You are very welcome!