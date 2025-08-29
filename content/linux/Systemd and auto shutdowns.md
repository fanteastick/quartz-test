---
date created: 2025-03-23T00:50
date modified: 2025-05-01T21:42
draft: "true"
---

Thanks perplexity

The message "sleep-monitor-systemd system is about to suspend" indicates that the system is preparing to enter a low-power state, likely triggered by systemd's power management settings. Here’s how you can investigate and resolve this issue:

---

## Steps to Prevent System from Suspending

### 1. Disable Suspend and Hibernation Targets

You can prevent the system from suspending by masking the relevant systemd targets:

```bash

sudo systemctl mask sleep.target suspend.target hibernate.target hybrid-sleep.target

```

This will create symlinks to `/dev/null` for these targets, effectively disabling them. To verify the status:

```bash

sudo systemctl status sleep.target suspend.target hibernate.target hybrid-sleep.target

```

If you need to re-enable these later:

```bash

sudo systemctl unmask sleep.target suspend.target hibernate.target hybrid-sleep.target

```

---

### 2. Modify `logind.conf`

Edit the `logind.conf` file to disable automatic suspend actions:

```bash

sudo nano /etc/systemd/logind.conf

```

Add or modify the following lines:

```

[Login]

HandleLidSwitch=ignore

HandleLidSwitchDocked=ignore

IdleAction=ignore

```

Save and exit, then restart `systemd-logind` for the changes to take effect:

```bash

sudo systemctl restart systemd-logind

```

---

### 3. Check for Sleep Hooks

Custom scripts or hooks in `/usr/lib/systemd/system-sleep/` may be triggering the suspend action. List the contents of this directory:

```bash

ls /usr/lib/systemd/system-sleep/

```

If you find any scripts, review their contents and remove or rename them if they are unnecessary.

---

### 4. Investigate Power Management Settings

Some desktop environments or tools (e.g., GNOME, KDE) may have their own power management settings that enforce suspend behavior. Check these settings within your desktop environment and disable any automatic sleep or suspend options.

---

### 5. Verify ACPI Events

ACPI events (like closing a laptop lid) may trigger suspension. To debug ACPI events:

```bash

journalctl | grep ACPI

```

You can also disable specific ACPI actions by editing `/etc/systemd/logind.conf` as shown above.

---

### 6. Review System Logs

Continue reviewing logs to identify what triggered the suspend action:

```bash

journalctl -b | grep "suspend"

journalctl -b | grep "PrepareForSleep"

```

Look for patterns or specific services initiating the suspend process.

---

By following these steps, you should be able to prevent your system from entering a suspend state and resolve the issue causing it.

<div style="text-align: center">⁂</div>

[^1]: https://whynothugo.nl/journal/2022/10/26/systemd-locking-and-sleeping/

[^2]: https://wiki.archlinux.org/title/Power_management/Suspend_and_hibernate

[^3]: https://manpages.debian.org/testing/systemd/systemd-sleep.conf.5.en.html

[^4]: https://www.tecmint.com/disable-suspend-and-hibernation-in-linux/

[^5]: https://man.archlinux.org/man/systemd-sleep.conf.5.en

[^6]: https://blog.wijman.net/disable-suspend-and-hibernation-modes-in-linux/

[^7]: https://www.freedesktop.org/software/systemd/man/systemd-sleep.conf.html

[^8]: https://www.unixtutorial.org/disable-sleep-on-ubuntu-server/

[^9]: https://docs.fedoraproject.org/en-US/quick-docs/systemd-understanding-and-administering/

[^10]: https://documentation.suse.com/smart/systems-management/html/systemd-working-with-timers/index.html

[^11]: https://askubuntu.com/questions/1485429/ubuntu-suspends-itself

[^12]: https://www.reddit.com/r/systemd/comments/ql6g7c/how_to_disable_sleepthenhibernate_but_allow_sleep/

[^13]: https://www.reddit.com/r/linuxquestions/comments/1fyknen/display_screen_sleep_settings/

[^14]: https://bbs.archlinux.org/viewtopic.php?id=244352

[^15]: https://community.frame.work/t/responded-psa-systemd-suspend-then-hibernate-behavior-changed-in-v252/24882

[^16]: https://unix.stackexchange.com/questions/781679/how-can-i-debug-what-triggers-systemd-sleep-target

[^17]: https://forum.manjaro.org/t/systemd-256-may-break-sleep/167722

[^18]: https://serverfault.com/questions/1045949/how-to-disable-suspend-on-ubuntu-20-04-systemd-via-cli

[^19]: https://askubuntu.com/questions/47311/how-do-i-disable-my-system-from-going-to-sleep