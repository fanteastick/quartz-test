---
date created: 2025-04-03T23:13
date modified: 2025-08-29T11:43
tags:
  - external
---

[Nightshade: Protecting Copyright](https://nightshade.cs.uchicago.edu/)

[GitHub - microsoft/InvisMark: code share for paper InvisMark: Invisible and Robust Watermarking for AI-generated Image Provenance](https://github.com/microsoft/InvisMark)

Basically the go-to approach is to put some sort of mask on it that confuses the AI model trying to "learn" your style. 

---

Thank you perplexity. 

## Overall examples

1. Perturbation-Based Tools
PhotoGuard: Developed by MIT researchers, this tool adds imperceptible pixel-level changes to images. These alterations disrupt AI models like Stable Diffusion, making manipulated outputs appear unrealistic or warped. This technique includes:

Encoder Attacks: Embeds signals that confuse AI systems, categorizing images incorrectly.

Diffusion Attacks: Alters how AI models process images, preventing realistic edits.

2. Pixel-Level Style Masks
Tools like Glaze, developed by the University of Chicago, apply small, invisible changes to an image's pixels. These changes confuse AI models attempting to replicate the style or content of the image. Glaze is free and widely used by artists to prevent style theft.

3. Metadata and Scrambling Techniques
Some tools scramble metadata (e.g., titles and descriptions) and segment images into unrecognizable parts for AI systems. While undetectable to humans, these methods disrupt AI training and image generation processes.

## Metadata and scrambling

Here are examples of tools and techniques that scramble metadata and segment images to disrupt AI training and generation processes:

1. Kin.Art
Kin.Art employs two strategies:

Image Segmentation: It breaks images into unrecognizable parts, effectively scrambling visual data. While undetectable to humans, this segmentation confuses generative AI models, preventing them from interpreting or generating content based on the image.

Metadata Scrambling: Kin.Art alters metadata (e.g., titles and descriptions) to mislead AI systems. This ensures labels read by AI models do not accurately reflect the image's content.

2. Nightshade
Nightshade, developed by researchers at the University of Chicago, uses "data poisoning" techniques:

It introduces prompt-specific poison samples that distort training data. This scrambling can cause significant disruptions in how generative AI models process affected images.

3. ShortPixel Image Optimizer
This WordPress plugin embeds protective metadata into images:

Metadata tags such as "DMI-PROHIBITED" signal to AI systems that the image cannot be used for data mining or training purposes.

This approach prevents unauthorized scraping or analysis while preserving the image's usability for human viewers.

These tools demonstrate innovative methods to protect digital assets from exploitation by generative AI systems.

## Pixel level style masks

1. Glaze
Developed by the University of Chicago, Glaze applies "style cloaks" to artwork. These cloaks consist of subtle pixel-level perturbations that are imperceptible to human viewers but mislead AI models attempting to mimic an artist's style.

The tool is highly effective, with studies showing it disrupts mimicry in over 92% of cases under normal conditions and 85% against adaptive countermeasures.

2. Fawkes (Adapted for Art)
Originally designed to protect personal photos from facial recognition systems, Fawkes has been adapted to safeguard artistic styles. It uses pixel-level changes to confuse AI models, preventing them from accurately learning features like brushstrokes or textures.

These tools exemplify innovative methods for protecting artists' work from generative AI systems while maintaining the visual integrity of their creations.

## Perturbation based tools

1. PhotoGuard
Description: PhotoGuard employs adversarial noise to protect images by targeting two areas:

Encoder Attacks: Adds perturbations that confuse the latent encoder of diffusion models, ensuring the model misinterprets the image.

Diffusion Attacks: Alters the image's representation during the diffusion process, preventing realistic outputs.

Use Case: Protects against malicious image editing and text-to-image synthesis by disrupting AI model processing.

2. Mist
Description: Mist builds on earlier methods like AdvDM by introducing a texture loss that measures differences between the original and perturbed images in latent space. This makes it effective at protecting images from being used in DreamBooth or Textual Inversion models.

Use Case: Protects artistic styles and privacy-related content while maintaining visual quality.

3. Anti-DreamBooth
Description: Focuses on undermining DreamBooth's ability to generate high-quality outputs by adding adversarial perturbations to images, especially for human faces.

Use Case: Protects personal privacy and prevents AI models from learning personalized features.

4. MetaCloak
Description: Uses a meta-learning strategy combined with data transformations to generate robust adversarial examples. It focuses on creating subtle perturbations that are effective against DreamBooth and similar generative models.

Use Case: Provides strong protection for privacy-sensitive information in images.

5. VCPro (Visual-Friendly Concept Protection)
Description: Introduces selective adversarial perturbations that target specific regions of an image rather than the entire image. It uses spatial information and regional adversarial loss to focus on protecting critical areas.

Use Case: Protects specific concepts (e.g., faces or styles) while minimizing perceptibility of the perturbations.

6. AdvDM (Adversarial Diffusion Model)
Description: An earlier approach that applies adversarial noise to diffusion-based models, disrupting their ability to generate coherent outputs from protected images.

Use Case: General protection against text-to-image generation.
