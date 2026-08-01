---
date created: 2026-03-13T12:13
date modified: 2026-03-13T12:26
---

Let's get specific!

```
pip install whisperx
sudo apt install ffmpeg
```
## Split the video and the audio

```
ffmpeg -i bio-lecture.mp4 -vn -acodec pcm_s16le -ar 16000 -ac 1 audio.wav
```

## Whisperx-ing

```
conda activate whisperx

whisperx audio.wav --model large-v2 --align_model WAV2VEC2_ASR_LARGE_LV60K_960H --batch_size 1 --compute_type int8 --language en --vad_method silero --output_format srt --output_dir ./subs --device cpu --max_line_width 30
```

## Hard encode the srt onto the video

```
ffmpeg -i input.mp4 -vf "subtitles=subtitle.srt:force_style='Alignment=2,MarginV=30'" \
  -c:v libx264 -crf 18 -preset veryfast -c:a copy output.mp4
```