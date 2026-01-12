---
date created: 2025-02-07T15:01
date modified: 2026-01-06T11:18
draft: "true"
---

[CUDA Toolkit - Free Tools and Training | NVIDIA Developer](https://developer.nvidia.com/cuda-toolkit)

> The NVIDIA® CUDA® Toolkit provides a development environment for creating high-performance, GPU-accelerated applications. With it, you can develop, optimize, and deploy your applications on GPU-accelerated embedded systems, desktop workstations, enterprise data centers, cloud-based platforms, and supercomputers. The toolkit includes GPU-accelerated libraries, debugging and optimization tools, a C/C++ compiler, and a runtime library.

## Dec 2025 CUDA v13.1

- [CUDA Programming Guide — CUDA Programming Guide](https://docs.nvidia.com/cuda/cuda-programming-guide/) 
- [GitHub - NVIDIA/TileGym: Helpful kernel tutorials and examples for tile-based GPU programming](https://github.com/NVIDIA/TileGym)
- [CUDA Tile \| NVIDIA Developer](https://developer.nvidia.com/cuda/tile)
- [Tile IR — Tile IR](https://docs.nvidia.com/cuda/tile-ir/)

## CUDA toolkit and WSL

First downlaod for windows [CUDA Toolkit 12.8 Update 1 Downloads \| NVIDIA Developer](https://developer.nvidia.com/cuda-12-8-1-download-archive?target_os=Windows&target_arch=x86_64&target_version=11&target_type=exe_local) 

WSL guide: [CUDA on WSL User Guide — CUDA on WSL 13.1 documentation](https://docs.nvidia.com/cuda/wsl-user-guide/index.html) 

Then see the cuda toolkit commands here: [CUDA Downloads \| NVIDIA Developer](https://developer.nvidia.com/cuda-downloads?target_os=Linux&target_arch=x86_64&Distribution=WSL-Ubuntu&target_version=2.0&target_type=deb_local) 

Download cuDNN [cuDNN 9.17.1 Downloads \| NVIDIA Developer](https://developer.nvidia.com/cudnn-downloads?target_os=Linux&target_arch=x86_64&Distribution=Ubuntu&target_version=22.04&target_type=deb_local&Configuration=Full) 

## Versions, versions

```
conda create -n whisperx-gpu python=3.11 -y
conda activate whisperx-gpu

pip install "torch==2.8.0" "torchaudio==2.8.0" "torchvision>=0.22.0" --index-url https://download.pytorch.org/whl/cu128 --force-reinstall
pip install "nvidia-cudnn-cu12==9.10.2.21" "nvidia-cublas-cu12"

pip install whisperx ctranslate2

python -c "
import torch, torchaudio, torchvision
print(f'torch: {torch.__version__}')
print(f'torchaudio: {torchaudio.__version__}')
print(f'AudioMetaData: {hasattr(torchaudio, \"AudioMetaData\")}')
print(f'CUDA: {torch.cuda.is_available()}')
"

# install libcudn and check for it
wget https://developer.download.nvidia.com/compute/cudnn/9.1.0/local_installers/cudnn-local-repo-ubuntu2204-9.1.0_1.0-1_amd64.deb
sudo dpkg -i cudnn-local-repo-ubuntu2204-9.1.0_1.0-1_amd64.deb
sudo cp /var/cudnn-local-repo-ubuntu2204-9.1.0_1.0-1/cudnn-local-*-keyring.gpg /usr/share/keyrings/
sudo apt-get update
sudo apt-get install -y libcudnn9-cuda-13 libcudnn9-dev-cuda-13

sudo ldconfig -p | grep libcudnn_ops


# run command 

whisperx audio.wav --model large-v2 --align_model WAV2VEC2_ASR_LARGE_LV60K_960H --batch_size 1 --compute_type int8 --language en --vad_method silero --output_format srt --output_dir ./subs --device cpu


# GPU POOR!

worked for now: whisperx audio.wav   --model large-v2   --batch_size 1   --compute_type int8 --language en --vad_method silero --device cpu

probably gave 30s of transcription chunks every 5s
```

(01:56am) hallelujah!

(02:12am) need to do some sort of cuDNN fix for WSL

```
# Inside WSL (NOT Windows CMD)
wget https://developer.download.nvidia.com/compute/cudnn/9.1.0/local_installers/cudnn-local-repo-ubuntu2204-9.1.0_1.0-1_amd64.deb
sudo dpkg -i cudnn-local-repo-ubuntu2204-9.1.0_1.0-1_amd64.deb
sudo cp /var/cudnn-local-repo-ubuntu2204-9.1.0/cudnn-local-*/cudnn-local9.1-keyring.gpg /usr/share/keyrings/
sudo apt-get update
sudo apt-get -y install libcudnn9-cuda-12 libcudnn9-dev-cuda-12

ADD TO BASHRC: 

export LD_LIBRARY_PATH=/usr/lib/x86_64-linux-gnu:/usr/local/cuda/lib64:$LD_LIBRARY_PATH

python -c "
import torch
print(f'torch: {torch.__version__}')
print(f'cuDNN: {torch.backends.cudnn.version()}')
print(f'CUDA available: {torch.cuda.is_available()}')
"
```