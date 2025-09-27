---
date created: 2025-09-03T22:24
date modified: 2025-09-03T22:25
---

Go to racknerd website --> nerdvm -> restore lol -> log in and get into the vnc

Go to email to get latest root login info and login as root. then do these commands: (Thanks perplexity)

```bash
sudo systemctl status fail2ban
```

To see all active Fail2Ban jails and their status (including banned IPs), run:

```bash
sudo fail2ban-client status
```

To check the status of a specific jail like SSH:

```bash
sudo fail2ban-client status sshd
```

If you suspect you are banned or want to disable Fail2Ban temporarily, you can stop the service:

```bash
sudo systemctl stop fail2ban
```

You can also review the Fail2Ban logs to see bans and actions:

```bash
sudo tail /var/log/fail2ban.log
```

To list all banned IPs for a jail (e.g., sshd):

```bash
sudo fail2ban-client status sshd
```

To unban a specific IP:

```bash
sudo fail2ban-client set sshd unbanip <IP_ADDRESS>
```

If you want to see which users are allowed (system users), you can use:

```bash
cut -d: -f1 /etc/passwd
```

