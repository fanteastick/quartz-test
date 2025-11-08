---
date created: 2025-03-20T23:35
date modified: 2025-04-25T22:48
tags:
  - external
  - cloudflare
  - self-hosted
draft: "true"
---
# how do i host my own api endpoint for an ollama llm? I have docker and a cloudflare domain

Here's how to host your own Ollama LLM API endpoint using Docker and Cloudflare:

## Step 1: Deploy Ollama in Docker

```bash
# Pull latest Ollama image
docker pull ollama/ollama

# Create persistent volume and run container
docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
```

This creates a Docker container with persistent model storage[^2]. To use GPU acceleration, add `--gpus=all` flag[^2].

## Step 2: Configure Cloudflare Tunnel

1. **Create Cloudflare API Token** with:

    - Zone: DNS Edit

    - Account: Cloudflare Tunnel Edit[^5]

2. **Deploy cloudflared tunnel** via Docker Compose:

```yaml
services:
  ollama:
    image: ollama/ollama
    volumes:
      - ollama:/root/.ollama
    networks:
      - private
  cloudflared:
    image: cloudflare/cloudflared
    command: tunnel --no-autoupdate run --token ${TUNNEL_TOKEN}
    environment:
      - TUNNEL_TOKEN=your_api_token_here
    networks:
      - private
    depends_on:
      - ollama
volumes:
  ollama:
networks:
  private:
```

This configuration[^7] creates a private network between Ollama and Cloudflare Tunnel while keeping your API endpoint secure.

## Step 3: Configure DNS \& Security

1. Create CNAME record in Cloudflare pointing to your tunnel subdomain

2. Set up Zero Trust rules in Cloudflare Dashboard to:

    - Require authenticated access

    - Enable TLS encryption

    - Apply geographic restrictions if needed[^5][^7]

## Usage Example with Python

```python

from langchain_community.llms import Ollama
llm = Ollama(
    base_url="https://your-domain.com/api",  # Your Cloudflare domain
    model="llama2"
)
response = llm.invoke("Explain quantum computing in simple terms")
print(response)
```

This uses LangChain to access your private API endpoint through Cloudflare's secure tunnel[^1][^7].

[^1]: https://www.youtube.com/watch?v=dcHSxUqZ7No

[^2]: https://collabnix.com/how-to-run-open-source-llms-locally-with-ollama-and-docker-llama3-1-phi3-mistral-gemma2/

[^3]: https://gosuperrad.com/how-to-setup-cloudflare-ddns-using-docker/

[^4]: https://community.cloudflare.com/t/can-i-use-cloudflared-in-a-docker-compose-yml/407168

[^5]: https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel-api/

[^6]: https://github.com/tamimology/docker-cloudflare-setup

[^7]: https://dev.to/mihailtd/secure-self-hosting-with-cloudflare-tunnels-and-docker-zero-trust-security-5bbn

[^8]: https://www.cloudflare.com/case-studies/docker/

[^9]: https://hub.docker.com/r/ollama/ollama

[^10]: https://geshan.com.np/blog/2025/02/ollama-docker-compose/

[^11]: https://www.youtube.com/watch?v=SivE_EfUNd8

[^12]: https://hub.docker.com/r/oznu/cloudflare-ddns/

[^13]: https://www.reddit.com/r/docker/comments/1htexwr/how_to_deploy_an_application_using_ollama/

[^14]: https://stackoverflow.com/questions/78906594/ollama-installation-on-docker-container-and-docker-compose-file

[^15]: https://www.datacamp.com/tutorial/deploy-llm-applications-using-docker

[^16]: https://docs.docker.com/guides/rag-ollama/develop/

[^17]: https://docs.dify.ai/development/models-integration/ollama

[^18]: https://forums.docker.com/t/how-to-link-my-ollama-with-my-app-in-docker/144682

[^19]: https://www.reddit.com/r/webscraping/comments/1d69kh2/docker_image_providing_api_for_cloudflare/

[^20]: https://www.null-byte.org/homelab/cloudflare-and-dynamic-dns-with-ddclient-and-docker/