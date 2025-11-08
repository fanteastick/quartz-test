---
date created: 2025-11-06T22:01
date modified: 2025-11-06T22:02
---

Thanks perplexity

Tmux is a terminal multiplexer that lets you run commands inside persistent sessions, protecting them from disconnects or session loss. To use tmux for a long-running command like `docker buildx`, simply start your command inside a tmux session and detach whenever needed; you can always reattach later and regain access to the same window, even after disconnecting from SSH or your terminal.[1][2][3][4][5]

### Basic tmux Workflow

- Start tmux with `tmux` or name your session with `tmux new -s buildx`.[5]
- Run your desired command, e.g. `docker buildx build ...`.
- Detach from tmux by pressing `Ctrl+B` then `D` — your build continues in the background.[1][5]
- List sessions with `tmux ls` if needed.[6][1]
- Reattach to your session anytime: `tmux attach -t buildx` (or use the default session ID).[5][6][1]

### Why tmux Is Useful for Builds

- Your long-running commands (like container builds) won't be interrupted by closing SSH, terminal tabs, or even network drops.[3][4]
- You can detach/re-attach on demand and resume from exactly where you left off.[3][1]
- tmux also supports multiple windows and panes for extra productivity, but for just backgrounding a build, one session/window is enough.[7][5]

### Quick tmux Reference

| Action           | Command/Key                                | Note                                    |
|------------------|--------------------------------------------|-----------------------------------------|
| Start tmux       | `tmux` or `tmux new -s <name>`             | Create a session[5]                 |
| Detach           | `Ctrl+B`, then `D`                         | Leaves processes running[1][5]  |
| List sessions    | `tmux ls`                                  | Shows active tmux sessions[1]       |
| Reattach         | `tmux attach -t <name/id>`                 | Resume session[1][6]           |
| Exit session     | `exit`                                     | Ends session normally[5]            |

Running `docker buildx` or any critical job under tmux is a recommended practice when you need resiliency against disconnects or want on-demand access to long builds.[4][1][3]

[1](https://www.redhat.com/en/blog/introduction-tmux-linux)

[2](https://github.com/tmux/tmux/wiki/Getting-Started)

[3](https://www.linuxtrainingacademy.com/tmux-tutorial/)

[4](https://www.linode.com/community/questions/18672/how-do-i-keep-a-process-running-after-i-disconnect-from-my-linode)

[5](https://researchit.las.iastate.edu/guides/pronto/interactive_computing/tmux/)

[6](https://stackoverflow.com/questions/23403368/how-can-i-reattach-to-tmux-process)

[7](https://hamvocke.com/blog/a-quick-and-easy-guide-to-tmux/)

[8](https://www.reddit.com/r/tmux/comments/v84prx/can_somebody_explain_to_me_why_i_would_use_tmux/)

[9](https://www.youtube.com/watch?v=sMbuGf2g7gc)

[10](https://www.tecmint.com/keep-remote-ssh-sessions-running-after-disconnection/)