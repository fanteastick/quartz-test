---
date created: 2026-01-19T23:02
date modified: 2026-01-19T23:41
tags:
  - idea
---

Just writing down some ideas from a long conversation with perplexity, but I'll avoid copy pasting the whole response. 

## Continue.dev and Obsidian vault misc

Continue.dev btw: [Continue - Ship faster with Continuous AI](https://www.continue.dev/)  [How to Configure OpenRouter with Continue - Continue](https://docs.continue.dev/customize/model-providers/top-level/openrouter) 

Example prompts that can be useful

```
Summarize the key points of @Url([https://example.com/blog/post](https://example.com/blog/post)) in 3 bullet points.
  
Using @Web("vector databases for personal notes"), give me a concise overview and recommend a setup for my home lab.

For each URL in this file, fetch it with @Url and produce a 2‑sentence summary. Output as a markdown list with the link followed by its summary.

You are auditing my notes for AI‑generated content.
Use @Tree to list all markdown files in this repo.
For each .md file, if it contains the exact phrase “Thanks Perplexity” and is longer than 2000 characters, consider it AI‑heavy.
Produce a markdown table with: file path, approximate word count, and a 1‑sentence description of what the file is about.
```

## CPU-only ollama

- OpenBLAS? TODO
- High core count helps parallelize for inference
- Quantization matters - Q4_K_M or Q5_K_M
- Apparently you can pin certain tasks to certain cores, e.g. p-cores

Generically, Perplexity recommends these models: Llama 3.1 8B Instruct, Phi-3 Medium 14B, Qwen2.5 7B Instruct

As a single user, I should just have one server being the workhorse that the user (me) is interfacing with on my active computer. If it was for more people, the other option is to two (or more) servers hosting the same exact model, and then having nginx or HAProxy to do some load balancing.

### Specifics

Server setup

```
curl -fsSL https://ollama.com/install.sh | sh
ollama serve  # uses all 40 cores automatically
ollama pull llama3.1:8b-instruct-q4_K_M  # ~5GB RAM, perfect fit
```

Continue.dev config

```
models:
  - name: "i9-7900X Server"
    provider: ollama
    model: llama3.1:8b-instruct-q4_K_M
    apiBase: "http://192.168.1.100:11434"  # server LAN IP
    roles: [chat, edit, apply]
    capabilities: [tool_use]
```

Use the extra RAM to preload some more models

```
# On server
export OLLAMA_MAX_LOADED_MODELS=3
ollama serve
```
- `llama3.1:8b-instruct-q4_K_M` (main workhorse)
- `phi3:mini-instruct-q4_K_M` (ultra-fast chats)
- `qwen2.5:7b-instruct-q4_K_M` (backup/generalist)

### What's ollama serve

Does NOT keep all your cores active at all times; it's a low-idle background HTTP server that spins up model runners when you send requests. 

> Request arrives → model loads (if needed) → 40 cores parallelize → response streams → model unloads → back to idle

```
best option
sudo systemctl enable ollama    # auto-start on boot
sudo systemctl start ollama     # low-idle HTTP server

# When you want to use it background, low CPU
ollama serve &
# Kill when done (or let it idle harmlessly)
pkill ollama

# Alternatively in like TMUX
screen -S ollama
ollama serve
# Ctrl+A,D to detach, screen -r ollama to reattach
```

## Homegrown distributed inference

TODO - it's not natively supported by ollama

- Ollama? a mod?
- What else?