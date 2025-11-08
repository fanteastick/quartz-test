---
date created: 2025-11-02T20:33
date modified: 2025-11-07T18:21
tags:
  - self-hosted
---
> [!infobox] The verdict
> My final pick was TimeTagger! It is very good - fast, responsive, and simple to setup. Just remember that for the password hashes, since I've got them quoted in the docker .env, I need the raw, un-escaped version. 
> 
> All the other ones were kind of more corporate-minded - having projects, clients, also no calendar view. 
> 
> Timetagger doesn't really have a calendar view, but it's easy to see each week/month/year etc, it's easy to export and import, and tags are so straightforward and nice. It's a little clunky to add to the timeline, but I vibe-coded two buttons (snap to previous/next end/start) which help a lot. Also it auto-snaps sometimes if you do "already started" or go into the timeline and drag around the start and stop fences.

[Docker Compose – Kimai](https://www.kimai.org/documentation/docker-compose.html#apache-prod)

- only has android mobile app by a community member
- but it also has a desktop app (also community member) 
	- [CodeTimer Mobile – Kimai](https://www.kimai.org/store/owlysk-codetimer-mobile.html)
- [Kimai](https://demo.kimai.org/es/quick_entry/) Demo
- the vibe is a little corporate

[GitHub - DRYTRIX/TimeTracker](https://github.com/DRYTRIX/TimeTracker) 

- seems new - only 400 stars on github but also active development, also the screenshots look great
- Guide to a sane setup: [TimeTracker/docs/DOCKER\_COMPOSE\_SETUP.md · DRYTRIX/TimeTracker · GitHub](https://github.com/DRYTRIX/TimeTracker/blob/4c4e04fc25422b9b1bc40f125ba50a45195aa4c2/docs/DOCKER_COMPOSE_SETUP.md) look for docker-compose-example yml
- time-logging can't log directly on calendar. but it has a kanban!

[Docker \| solidtime](https://docs.solidtime.io/self-hosting/guides/docker) [self-hosting-examples/1-docker-with-database at main](https://github.com/solidtime-io/self-hosting-examples/tree/main/1-docker-with-database) 

- probably most polished version? the docker compose is too complicated
- PWA on mobile
- toooo complicated to set up (laravel env and ports and such)

[TimeTagger - Tag your time, get the insight](https://timetagger.app/)

- a little too simple, hard to see long-term views