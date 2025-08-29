---
date created: 2025-04-30T23:36
date modified: 2025-04-30T23:37
---

Thanks perplexity

To create a new user on your remote server and set up SSH key authentication (with password login already disabled), follow these steps:

## 1. Create the New User

You can create a new user and their home directory with:

```bash
sudo useradd -m -s /bin/bash newusername
```

Alternatively, on some systems, you might use:

```bash
sudo adduser newusername
```

## 2. Create the .ssh Directory

Set up the `.ssh` directory in the new user's home:

```bash
sudo mkdir /home/newusername/.ssh
sudo chown newusername:newusername /home/newusername/.ssh
sudo chmod 700 /home/newusername/.ssh
```

## 3. Add the User’s Public Key

- If the user already has an SSH public key, copy it to `/home/newusername/.ssh/authorized_keys`.
- If you are generating a key for them (for example, as an admin), you can do so with:

```bash
sudo -u newusername ssh-keygen
```

Or generate the key elsewhere and copy the public key into `/home/newusername/.ssh/authorized_keys`[2][8].

Paste or copy the public key into `authorized_keys`:

```bash
sudo nano /home/newusername/.ssh/authorized_keys
```

Paste the public key, save, and exit.

Set permissions:

```bash
sudo chown newusername:newusername /home/newusername/.ssh/authorized_keys
sudo chmod 600 /home/newusername/.ssh/authorized_keys
```

## 4. (Optional) Give Sudo Access

If the user needs sudo privileges:

```bash
sudo usermod -aG sudo newusername
```

## 5. Verify SSH Key Authentication

The user should now be able to log in using their private key from their client device:

```bash
ssh newusername@your.server.ip
```

No password prompt should appear if the key is correctly set up and permissions are correct[10].

---

Key Points:

- Do not copy private keys to the server; only the public key goes in `authorized_keys`[6].
- Permissions are critical: `.ssh` should be `700`, `authorized_keys` should be `600`, and both should be owned by the user[4][5][10].
- If you need to generate a key for the user as an admin, use `sudo -u newusername ssh-keygen` or generate it elsewhere and transfer the private key securely to the user[2][8].

This process ensures your new user can log in via SSH key authentication, even with password login disabled.

Citations:

[1] https://unix.stackexchange.com/questions/210228/add-a-user-without-password-but-with-ssh-and-public-key

[2] https://serverfault.com/questions/323958/how-do-you-create-an-ssh-key-for-another-user

[3] https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent

[4] https://humanwhocodes.com/snippets/2021/03/create-user-linux-ssh-key/

[5] https://askubuntu.com/questions/743852/how-to-create-new-user-with-public-key-authentication

[6] https://superuser.com/questions/283216/ssh-key-authentication-with-another-user

[7] https://phoenixnap.com/kb/setup-passwordless-ssh

[8] https://discussion.fedoraproject.org/t/how-can-i-generate-ssh-keys-for-a-specific-user/69550

[9] https://www.reddit.com/r/linuxquestions/comments/m8j4sy/adding_new_ssh_key_to_server_after_disabling/

[10] https://www.strongdm.com/blog/ssh-passwordless-login