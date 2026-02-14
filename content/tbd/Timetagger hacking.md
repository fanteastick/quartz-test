---
date created: 2025-11-03T23:22
date modified: 2026-01-19T22:48
---

First time vibe coding! understanding a codebase is too hard. [[how I use GPTs]]

## Relevant commands

```
# start locally - it will be at localhost8080 and you can log in with the default user for localhost testing! so handy
nohup python -m timetagger > timetagger-dev.log 2>&1 & echo $! > timetagger.pid

#end
kill $(cat timetagger.pid) && rm -f timetagger.pid
kill -9 $(cat timetagger.pid) && rm -f timetagger.pid

## or look for anything running
ps aux | grep -i "python -m timetagger" | grep -v grep
kill ----


# view logs
tail -f timetagger-dev.log

# build for docker
docker build -f deploy/repo.Dockerfile -t USERNAME/timetagger:TAG .

```

## Changing tick size and color

front.py: check out the env SMALLER and COLORS.tick_text

## Snap to previous time

Add buttons in dialogs.py with onclick functions that activate this snapping logic. 

## How timing records are stored

Thank you, Claude 3.5 via GitHub Copilot free tier!

front.py implements the PScript front end for the TimeTagger app: it defines TimeTaggerCanvas and widgets (TopWidget, RecordsWidget, AnalyticsWidget) that handle layout, drawing and user input on an HTML canvas. TimeRange encapsulates the visible time window, tick calculation, snapping and animated transitions, using SCALES/INTERVALS and a small cache to avoid recomputing ticks each frame. 

Records are accessed through window.store.records (get_records, get_running_records, get_stats, create, put, get_by_key) and rendered/edited by RecordsWidget with clustering, snapping, pickers and drag interactions so only the visible subset is processed and updated. 

Visuals (FONT, COLORS, SMALLER) are centralized and the AnalyticsWidget aggregates stats into animated bars, keeping intermediate state to animate changes and limit work to what is visible.

Sorry, the license says I need to share under the same license;... I swear I'll fork it and make it public soon. 

## Misc - preferred pdfextend params

`pdfextend in.pdf out.pdf --right=160 --bottom=100 --spacing=6 --line-width=0.5 --unit=mm --grid=dots --color=#7a9ed4`
