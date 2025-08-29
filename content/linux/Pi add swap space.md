---
date created: 2025-05-08T13:25
date modified: 2025-05-08T13:41
---

Thanks perplexity

To add or increase swap space on your Raspberry Pi, follow these steps:

1. **Turn off the current swap file:**
   ```
   sudo dphys-swapfile swapoff
   ```

2. **Edit the swap configuration file:**
   ```
   sudo nano /etc/dphys-swapfile
   ```

   Find the line that starts with `CONF_SWAPSIZE=` and set it to your desired size in megabytes. For example, for 2 GB swap, use:

   ```
   CONF_SWAPSIZE=4096
	CONF_MAXSWAP=4096
   ```

   Save and exit the editor (`CTRL + X`, then `Y`, then `Enter`)[2][5][6].

3. **Recreate the swap file:**
   ```
   sudo dphys-swapfile setup
   ```

4. **Turn the swap back on:**
   ```
   sudo dphys-swapfile swapon
   ```

5. **(Recommended) Reboot your Pi:**
   ```
   sudo reboot
   ```

After rebooting, you can check the swap size with:

```
free -h
```

or

```
htop
```

This process will increase your available virtual memory and help prevent out-of-memory issues when running memory-intensive applications like Authentik[2][5][6].

Citations:

[1] https://forums.raspberrypi.com/viewtopic.php?t=46472

[2] https://pimylifeup.com/raspberry-pi-swap-file/

[3] https://raspberrypi.stackexchange.com/questions/70/how-to-set-up-swap-space

[4] https://akashrajpurohit.com/blog/increase-swap-memory-on-raspberry-pi/

[5] https://itsfoss.com/pi-swap-increase/

[6] https://harish2k01.in/increasing-swap-memory-on-a-raspberry-pi/

[7] https://www.youtube.com/watch?v=qNbMjw89hFY

[8] https://forums.raspberrypi.com/viewtopic.php?t=199208

---

Answer from Perplexity: pplx.ai/share