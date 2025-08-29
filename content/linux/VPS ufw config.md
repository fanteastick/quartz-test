---
date created: 2025-04-24T22:36
date modified: 2025-05-01T16:34
---

Reload and logs

```
sudo ufw reload
sudo tail -f /var/log/ufw.log
```

Deny incoming

```
sudo ufw default deny incoming
sudo ufw deny <port>
```

Allow things

```
sudo ufw allow from <trusted-ip> to any port <port>
sudo ufw allow from <trusted-ip> to any port 1:65535 proto udp
sudo ufw allow from <trusted-ip> to any port 1:65535 proto tcp
sudo ufw allow from <ip> to any port 22,80,443/tcp
sudo ufw allow from <ip>
```

To delete by rule numbers

```
sudo ufw status numbered
sudo ufw delete <number>
for i in 7 6 5 ; do sudo ufw delete $i; done
for i in {20..10}; do sudo ufw delete $i; done

OR

sudo ufw delete deny from any to any port 22
sudo ufw delete deny <port>
```

UFW matches in order from top to bottom!

```
sudo ufw insert <position> <rule>
sudo ufw status numbered
sudo ufw delete <rule-number>
```

## Fail2ban

```
sudo fail2ban-client status
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
sudo nano /etc/fail2ban/jail.local
sudo systemctl restart fail2ban
sudo fail2ban-client status
sudo fail2ban-client status sshd
```

Fail2ban is more like a "peace of mind" safety measure - they always tell you to add it and in theory it works but in reality attacks will be more complex than this