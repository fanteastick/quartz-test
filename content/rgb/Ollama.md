---
date created: 2024-09-17T09:08
date modified: 2025-04-25T22:49
draft: "true"
---
## The documentation

[GitHub - ollama/ollama: Get up and running with Llama 3.3, Phi 4, Gemma 2, and other large language models.](https://github.com/ollama/ollama)

- There's a windows download right on this page
- Then there's a little pop up saying "Ollama is running", and it's also in the toolbar on the bottom right. 
- Restart windows command prompt, and then type in ollama

Just did the linux install

## How to use it

[Ollama on Windows - A Beginner's Guide » Ralgar.one](https://www.ralgar.one/ollama-on-windows-a-beginners-guide/) 

> ...as a general rule of thumb, the bigger the file, the more powerful a computer is needed. 💬 Rasmus Lindbacke, July 18, 2024

1. pick a model: [library](https://ollama.com/library) 
![[Ollama_image_1.png]]
2. `ollama run phi3` 

```
ollama show phi3
  Model
    architecture        phi3
    parameters          3.8B
    context length      131072
    embedding length    3072
    quantization        Q4_0

  Parameters
    stop    "<|end|>"
    stop    "<|user|>"
    stop    "<|assistant|>"

  License
    Microsoft.
    Copyright (c) Microsoft Corporation.
```
## Commands cheatsheet

```
ollama list

ollama show <model name>

ollama rm <model_name>

## linux start and stop ollama
ollama serve
sudo systemctl stop ollama
```

## Embedding models

[Embedding models · Ollama Blog](https://ollama.com/blog/embedding-models) 

## Openwebui

[How to Enable Web Search in Open WebUI - YouTube](https://www.youtube.com/watch?v=fwscnJu_Md0)

[⏱️ Quick Start | Open WebUI](https://docs.openwebui.com/getting-started/quick-start/)

Docker desktop reported usage spikes when I ask a query - 7b model might be a little too big. 

![[Ollama_image_2.png|400]]