---
link: https://www.nicolekerrison.com/resources/bratify
slurped: 2024-09-12T18:30
title: brat-ify your python plots | Nicole Kerrison
tags:
  - external
date created: 2024-09-12T18:30
date modified: 2024-09-15T10:09
---

[brat-ify your python plots | Nicole Kerrison](https://www.nicolekerrison.com/resources/bratify) 

![[brat-ify your python plots - Nicole Kerrison_image_1.gif]]

The repository linked below contains several Matplotlib style sheets designed to help you brat-ify your python plots. BRAT's cover font uses [Arial Narrow](https://learn.microsoft.com/en-us/typography/font-list/arial-narrow), which you will need in order to fully embrace the aesthetic (assuming that's your goal). If your Mac has Microsoft Office installed, you should already have this font on your system.

## Instructions

1. [Download the GitHub repository](https://github.com/nkerrison/bratify) by clicking the link and selecting **Code** → **Download ZIP**.
2. When you installed Matplotlib, it came with several built-in style sheets kept in a folder named `stylelib`. To install the following brat-inspired style sheets, you'll need to find where on your computer that `stylelib` folder is located:  
    
    ```
    
        import matplotlib
        print(matplotlib.get_data_path())
        
    ```

    For my install, the `stylelib` folder is here:

    ```
    
        ~/anaconda3/lib/python3.11/site-packages/matplotlib/mpl-data
        
    ```
    
3. Unzip the GitHub repository and move its contents to the `stylelib` folder. You can use Finder and select **Go** → **Go to Folder...** to quickly navigate to the `stylelib` folder.
4. The style sheets are ready to be used! You can try plotting the following, if you don't already have some code to test:
    
    ```
    
        # --- imports
        import matplotlib.pyplot as plt
        import numpy as np
        
        # --- data
        x = np.linspace(0, 10, 100)
        sin = np.sin(x)
        cos = np.cos(x)
        
        # --- plot
        plt.figure(figsize=(10, 6))
        plt.plot(x, sin, label='sine wave')
        plt.scatter(x, cos, label='cosine wave')
        
        # --- plot settings
        plt.title('plot title')
        plt.xlabel('x-axis label')
        plt.ylabel('y-axis label')
        plt.legend()
        
    ```
    
5. To use a style sheet, include one of the following commands in your code:

## Examples 

## BRAT (2024)

```

	plt.style.use('brat')
	
```

![[brat-ify your python plots - Nicole Kerrison_image_2.png]]

## CRASH (2022)

```

	plt.style.use('crash')
	
```

![[brat-ify your python plots - Nicole Kerrison_image_3.png]]

## how i'm feeling now (2020)

```

	plt.style.use('how-im-feeling-now')
	
```

![[brat-ify your python plots - Nicole Kerrison_image_4.png]]

## Charli (2019)

```

	plt.style.use('charli')
	
```

![[brat-ify your python plots - Nicole Kerrison_image_5.png]]

## Pop 2 (2017)

```

	plt.style.use('pop-2')
	
```

![[brat-ify your python plots - Nicole Kerrison_image_6.png]]

## Number 1 Angel (2017)

```

	plt.style.use('number-1-angel')
	
```

![[brat-ify your python plots - Nicole Kerrison_image_7.png]]

## SUCKER (2014)

```

	plt.style.use('sucker')
	
```

![[brat-ify your python plots - Nicole Kerrison_image_8.png]]

## True Romance (2013)

```

	plt.style.use('true-romance')
	
```

![[brat-ify your python plots - Nicole Kerrison_image_9.png]]

## Shamelessly copy pasting the code

### Brat

```title="brat.mplstyle"
# Written by Nicole Kerrison, the following Matplotlib style sheet was 
# inspired by Charli XCX's 'BRAT' (2024) album cover art.

figure.dpi             : 300
figure.facecolor       : 89CC04
figure.titlesize       : 26

font.family            : Arial Narrow, Arial
font.stretch           : condensed
text.color             : 000000

lines.linewidth        : 1.5
lines.markerfacecolor  : 000000
lines.markeredgecolor  : 000000

axes.prop_cycle        : cycler('color', ['000000'])
axes.linewidth         : 1.5
axes.titlesize         : 22
axes.titleweight       : bold
axes.labelsize         : 22
axes.facecolor         : 89CC04
axes.edgecolor         : 000000
axes.labelcolor        : 000000
axes.titlepad          : 15
axes.labelpad          : 10
axes.titlecolor        : 000000

xtick.labelcolor       : 000000
ytick.labelcolor       : 000000
xtick.color            : 000000
ytick.color            : 000000
xtick.labelsize        : 15
ytick.labelsize        : 15
xtick.direction        : out
ytick.direction        : out

legend.fontsize        : 15
legend.frameon         : False
legend.facecolor       : 89CC04
legend.labelcolor      : 000000
legend.framealpha      : 0.5

savefig.facecolor      : 89CC04
```

### charli

```title="charli.mplstyle"
# Written by Nicole Kerrison, the following Matplotlib style sheet was 
# inspired by Charli XCX's 'Charli' (2019), whose album cover art
# was updated in anticipation of her sixth studio album, 'BRAT' (2024).

figure.dpi             : 300
figure.facecolor       : 918A84
figure.titlesize       : 26

font.family            : Arial Narrow, Arial
font.stretch           : condensed
text.color             : 000000

lines.linewidth        : 1.5
lines.markerfacecolor  : 000000
lines.markeredgecolor  : 000000

axes.prop_cycle        : cycler('color', ['000000'])
axes.linewidth         : 1.5
axes.titlesize         : 22
axes.titleweight       : bold
axes.labelsize         : 22
axes.facecolor         : 918A84
axes.edgecolor         : 000000
axes.labelcolor        : 000000
axes.titlepad          : 15
axes.labelpad          : 10
axes.titlecolor        : 000000

xtick.labelcolor       : 000000
ytick.labelcolor       : 000000
xtick.color            : 000000
ytick.color            : 000000
xtick.labelsize        : 15
ytick.labelsize        : 15
xtick.direction        : out
ytick.direction        : out

legend.fontsize        : 15
legend.frameon         : False
legend.facecolor       : 918A84
legend.labelcolor      : 000000
legend.framealpha      : 0.5

savefig.facecolor      : 918A84
```

### crash

```title="crash.mplstyle"
# Written by Nicole Kerrison, the following Matplotlib style sheet was 
# inspired by Charli XCX's 'CRASH' (2022), whose album cover art
# was updated in anticipation of her sixth studio album, 'BRAT' (2024).

figure.dpi             : 300
figure.facecolor       : 68C9F5
figure.titlesize       : 26

font.family            : Arial Narrow, Arial
font.stretch           : condensed
text.color             : FF0000

lines.linewidth        : 1.5
lines.markerfacecolor  : FF0000
lines.markeredgecolor  : FF0000

axes.prop_cycle        : cycler('color', ['FF0000'])
axes.linewidth         : 1.5
axes.titlesize         : 22
axes.titleweight       : bold
axes.labelsize         : 22
axes.facecolor         : 68C9F5
axes.edgecolor         : FF0000
axes.labelcolor        : FF0000
axes.titlepad          : 15
axes.labelpad          : 10
axes.titlecolor        : FF0000

xtick.labelcolor       : FF0000
ytick.labelcolor       : FF0000
xtick.color            : FF0000
ytick.color            : FF0000
xtick.labelsize        : 15
ytick.labelsize        : 15
xtick.direction        : out
ytick.direction        : out

legend.fontsize        : 15
legend.frameon         : False
legend.facecolor       : 68C9F5
legend.labelcolor      : FF0000
legend.framealpha      : 0.5

savefig.facecolor      : 68C9F5
```

### how-im-feeling-now
```title="how-im-feeling-now.mplstyle"
# Written by Nicole Kerrison, the following Matplotlib style sheet was 
# inspired by Charli XCX's 'how i'm feeling now' (2020), whose album cover art
# was updated in anticipation of her sixth studio album, 'BRAT' (2024).

figure.dpi             : 300
figure.facecolor       : ffffff
figure.titlesize       : 26

font.family            : Arial Narrow, Arial
font.stretch           : condensed
text.color             : B7B7B7

lines.linewidth        : 1.5
lines.markerfacecolor  : B7B7B7
lines.markeredgecolor  : B7B7B7

axes.prop_cycle        : cycler('color', ['B7B7B7'])
axes.linewidth         : 1.5
axes.titlesize         : 22
axes.titleweight       : bold
axes.labelsize         : 22
axes.facecolor         : ffffff
axes.edgecolor         : B7B7B7
axes.labelcolor        : B7B7B7
axes.titlepad          : 15
axes.labelpad          : 10
axes.titlecolor        : B7B7B7

xtick.labelcolor       : B7B7B7
ytick.labelcolor       : B7B7B7
xtick.color            : B7B7B7
ytick.color            : B7B7B7
xtick.labelsize        : 15
ytick.labelsize        : 15
xtick.direction        : out
ytick.direction        : out

legend.fontsize        : 15
legend.frameon         : False
legend.facecolor       : ffffff
legend.labelcolor      : B7B7B7
legend.framealpha      : 0.5

savefig.facecolor      : ffffff
```

### number-1-angel
```title="number-1-angel.mplstyle"
# Written by Nicole Kerrison, the following Matplotlib style sheet was 
# inspired by Charli XCX's 'Number 1 Angel' (2017), whose album cover art
# was updated in anticipation of her sixth studio album, 'BRAT' (2024).

figure.dpi             : 300
figure.facecolor       : BA0001
figure.titlesize       : 26

font.family            : Arial Narrow, Arial
font.stretch           : condensed
text.color             : FF0000

lines.linewidth        : 1.5
lines.markerfacecolor  : FF0000
lines.markeredgecolor  : FF0000

axes.prop_cycle        : cycler('color', ['FF0000'])
axes.linewidth         : 1.5
axes.titlesize         : 22
axes.titleweight       : bold
axes.labelsize         : 22
axes.facecolor         : BA0001
axes.edgecolor         : FF0000
axes.labelcolor        : FF0000
axes.titlepad          : 15
axes.labelpad          : 10
axes.titlecolor        : FF0000

xtick.labelcolor       : FF0000
ytick.labelcolor       : FF0000
xtick.color            : FF0000
ytick.color            : FF0000
xtick.labelsize        : 15
ytick.labelsize        : 15
xtick.direction        : out
ytick.direction        : out

legend.fontsize        : 15
legend.frameon         : False
legend.facecolor       : BA0001
legend.labelcolor      : FF0000
legend.framealpha      : 0.5

savefig.facecolor      : BA0001
```

### pop-2
```title="pop-2.mplstyle"
# Written by Nicole Kerrison, the following Matplotlib style sheet was 
# inspired by Charli XCX's 'Pop 2' (2017), whose album cover art
# was updated in anticipation of her sixth studio album, 'BRAT' (2024).

figure.dpi             : 300
figure.facecolor       : DFB3F5
figure.titlesize       : 26

font.family            : Arial Narrow, Arial
font.stretch           : condensed
text.color             : 000000

lines.linewidth        : 1.5
lines.markerfacecolor  : 000000
lines.markeredgecolor  : 000000

axes.prop_cycle        : cycler('color', ['000000'])
axes.linewidth         : 1.5
axes.titlesize         : 22
axes.titleweight       : bold
axes.labelsize         : 22
axes.facecolor         : DFB3F5
axes.edgecolor         : 000000
axes.labelcolor        : 000000
axes.titlepad          : 15
axes.labelpad          : 10
axes.titlecolor        : 000000

xtick.labelcolor       : 000000
ytick.labelcolor       : 000000
xtick.color            : 000000
ytick.color            : 000000
xtick.labelsize        : 15
ytick.labelsize        : 15
xtick.direction        : out
ytick.direction        : out

legend.fontsize        : 15
legend.frameon         : False
legend.facecolor       : DFB3F5
legend.labelcolor      : 000000
legend.framealpha      : 0.5

savefig.facecolor      : DFB3F5
```

### sucker
```title="sucker.mplstyle"
# Written by Nicole Kerrison, the following Matplotlib style sheet was 
# inspired by Charli XCX's 'SUCKER' (2014), whose album cover art
# was updated in anticipation of her sixth studio album, 'BRAT' (2024).

figure.dpi             : 300
figure.facecolor       : FFB5DA
figure.titlesize       : 26

font.family            : Arial Narrow, Arial
font.stretch           : condensed
text.color             : ffffff

lines.linewidth        : 1.5
lines.markerfacecolor  : ffffff
lines.markeredgecolor  : ffffff

axes.prop_cycle        : cycler('color', ['ffffff'])
axes.linewidth         : 1.5
axes.titlesize         : 22
axes.titleweight       : bold
axes.labelsize         : 22
axes.facecolor         : FFB5DA
axes.edgecolor         : ffffff
axes.labelcolor        : ffffff
axes.titlepad          : 15
axes.labelpad          : 10
axes.titlecolor        : ffffff

xtick.labelcolor       : ffffff
ytick.labelcolor       : ffffff
xtick.color            : ffffff
ytick.color            : ffffff
xtick.labelsize        : 15
ytick.labelsize        : 15
xtick.direction        : out
ytick.direction        : out

legend.fontsize        : 15
legend.frameon         : False
legend.facecolor       : FFB5DA
legend.labelcolor      : ffffff
legend.framealpha      : 0.5

savefig.facecolor      : FFB5DA
```

### true-romance

```title="true-romance.mplstyle"
# Written by Nicole Kerrison, the following Matplotlib style sheet was 
# inspired by Charli XCX's 'True Romance' (2013), whose album cover art
# was updated in anticipation of her sixth studio album, 'BRAT' (2024).

figure.dpi             : 300
figure.facecolor       : 94006A
figure.titlesize       : 26

font.family            : Arial Narrow, Arial
font.stretch           : condensed
text.color             : ffffff

lines.linewidth        : 1.5
lines.markerfacecolor  : ffffff
lines.markeredgecolor  : ffffff

axes.prop_cycle        : cycler('color', ['ffffff'])
axes.linewidth         : 1.5
axes.titlesize         : 22
axes.titleweight       : bold
axes.labelsize         : 22
axes.facecolor         : 94006A
axes.edgecolor         : ffffff
axes.labelcolor        : ffffff
axes.titlepad          : 15
axes.labelpad          : 10
axes.titlecolor        : ffffff

xtick.labelcolor       : ffffff
ytick.labelcolor       : ffffff
xtick.color            : ffffff
ytick.color            : ffffff
xtick.labelsize        : 15
ytick.labelsize        : 15
xtick.direction        : out
ytick.direction        : out

legend.fontsize        : 15
legend.frameon         : False
legend.facecolor       : 94006A
legend.labelcolor      : ffffff
legend.framealpha      : 0.5

savefig.facecolor      : 94006A
```