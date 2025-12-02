---
date created: 2025-04-02T12:19
date modified: 2025-10-26T17:45
tags:
  - photography
---

> [!web] From the web
> [darktable](https://www.darktable.org/)
> 
> darktable is an open source photography workflow application and raw developer. A virtual lighttable and darkroom for photographers. It manages your digital negatives in a database, lets you view them through a zoomable lighttable and enables you to develop raw images and enhance them.

Shoutout Perplexity for helping me figure out how to use the software.

## Settings menu

There's a little settings wheel on the top of the center bar. 

![[darktable_image_1.png|200]]

## Navigating the filmstrip in darkroom mode

Spacebar to go forward, Backspace to go backwards. Make sure your mouse is not over another photo when you press "r" to reject an image. Then you can go back to lightroom mode 

## Shortcuts

![[darktable_image_2.png]]

At the bottom, you can search for actions and shortcuts. Then you can double click on an action to go into "shortcut setting" mode, and then set something. It'll tell you if there are conflicts or something.

![[darktable_image_3.png]]

I set a shortcut for cropping. 

## Rotate hacks

When in the rotation/perspective view, you can set a box and then tell it to automatically scale it from there. 

Alternatively, you can **right click**, hold and drag, and that'll set a line in which to horizontally scale it on. Or vertically! The degrees will show. 

## Additional shortcuts

w -> shows a preview when you press and hold

I created a shift+w to adjust color calibration. Then you can click the dropper next to CCT: and select a square

![[darktable_image_4.png]]

## Lensfun for lens corrections

[Lensfun's coverage](https://wilson.bronger.org/lensfun_coverage.html) 

This is the list of the available lenses by default in darktable when you go to the lens correction section. 

## Manage the hotbar or quick access panel

![[darktable_image_5.png]]

> [!web] From the web
> How to Set Up Your Hotbar
> Locate the Quick Access Panel on the right side in the darkroom view.
> 
> Add modules by right-clicking the “hamburger” icon at the panel's top-left, or use the layout manager (“Manage module layouts”) to configure which controls appear.
> 
> You can also Ctrl+click any widget in a processing module to add it to the Quick Access Panel while in visual shortcut mapping mode.
> 
> Once added, each module is quickly accessible, and the sidebar only contains the modules you want—making editing streamlined and efficient.
> 
> If you want to reorder or remove items from the Quick Access Panel, use the layout manager for further customization.

Thanks perplexity!

## Presets

> [!web] From the web
> Adjust global vibrance, contrast, and global saturation to 20% in the relevant modules.
> 
> Save these settings as a preset or a style (a style can include changes from multiple modules).
> 
> Go to the preferences → shortcuts tab, then map a hotkey to apply your saved preset or style in the darkroom view.
> 
> Now, pressing your chosen shortcut will apply all preset settings—including vibrance, contrast, and saturation—at once.

## Darkroom mode and the film strip

To unselect anything you selected in the film strip, ctrl + shift + a. 

To select: alt click the first, shift click the last. 

To copy paste edits: ctrl shift v and ctrl shift c

Can't delete in darkroom mode. You have to do r or something to apply a rejection marker and then filter it out in lightroom mode. 

## Local contrast or Exposure by mask

To delete a mask, enter edit mode with the mouse button and right click the shape. 

Mask --> draw mask --> oval --> edit as you please

### Making new instances

![[darktable_image_6.png]]

## How it works

> [!web] About Deleting Original RAW Files
> If you delete the original RAW files from their original import location, darktable cannot access the source file again, so you will lose the ability to reload or re-edit that RAW with full fidelity.
> 
> Darktable's edits rely on the original RAW file being present because it is a non-destructive editor that reads RAW data dynamically.
> 
> The XMP sidecar files store editing instructions only and do not contain the RAW data itself.
> 
> If you want to keep the ability to edit in darktable, you must keep the RAW files or move them in a way that keeps the folder structure and update darktable about the new location.
> 
> Alternatively, exporting edited images creates new image files that do not rely on RAW files, but these exported images are not the same as RAW and usually have less editing flexibility.