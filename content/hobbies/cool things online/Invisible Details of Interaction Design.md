---
link: https://rauno.me/craft/interaction-design
byline: Rauno Freiberg
site: Rauno Freiberg
slurped: 2025-08-28T16:44
title: Invisible Details of Interaction Design
tags:
  - slurp
date created: 2025-08-28T16:44
date modified: 2025-08-28T16:44
---

Design can feel like there's no science to it — only feel and intuition. Even researchers have trouble grounding interaction design practices in science, inherently treating them as a mysterious black box. 1 While from my own experience that's partly true, I have been trying to deconstruct and dig out the _why_ behind great displays of interaction design.

Searching the Internet for depth on interaction design yields a plethora of recycled content obsessing over user personas, storyboards, and Venn diagrams labeled with "UI" and "UX". Besides a few exceptional talks, actual substance and insight reveal themselves to those willing to fanatically dig for them. Either through studying obscure, long-winded research papers or by maniacally replaying hundreds of slow motion screen recordings.

Sitting down and just thinking hard does not magically produce valuable discoveries either. The essence of the word "interaction" implies a relationship between a human and an environment. In my experience, great revelations surface from making something — filling your headspace with a problem — and then going for a synthesising daydreaming walk to stir the pot.

This essay is not a tutorial nor a collection of guidelines. But rather an observation on the invisible details of a few interactions that I use often but rarely think about. Besides recreating interfaces, I found this exercise in reflection to be another great way to build a stronger design intuition and vocabulary.

### Metaphors

What even is interaction design? Here's how I think about it through the lens of technology. Interaction design is an artform to make experiences that fluidly respond to human intent. When does a swipe trigger an action? Do gestures retain momentum? What happens if a finger is covering content? How can we predict intent based on context? Executing well on details like these make products feel like a natural extension of ourselves. 2

But it's not an artform in the same way as painting or composing music. There's a unique human component to interaction design. Why? Because ultimately people are trying to get stuff done using a product. Beauty in form and composition is not enough. There's an inherent satisfaction apparent in striking a holistic balance between form _and_ function.

Great interaction design rewards learning by reusing metaphors. You can use most touch interfaces with just two gestures: tapping and swiping. For example, on iOS the only gesture you're explicitly taught how to do is swiping up to open:

Now you've learned swiping which unlocks control over many other parts of the interface. The sliding motion also tells you that the interface is composed of stacked layers, like a deck of cards. Knowing so, you might be enthused to try swiping down on the screen to discover more controls. Conceptually, the interface is further implicitly teaching you that swiping _down_ reveals layers of system functionality. This knowledge compounds as you delve deeper into the Apple ecosystem.

We can stretch interaction design metaphors even further. Why does swiping horizontally navigate between pages? Because that's how we've intuitively interfaced with books for thousands of years.

Great interactions are modeled after properties from the real world, like interruptability. This sounds kinda silly because, duh, obviously flipping a page in a book is interruptible. But imagine if it were an animation that you had to wait for!

Pinching is another gesture that we've come to intuitively associate with zooming. Simply put, zooming is an act of precision — adjusting the amount of detail visible.

We can think of pinching akin to movements that require intricate motor skills, like picking up tiny objects or working with spices. Naturally, we pinch our fingers for higher precision:

On a touch screen, the interface needs to first establish an anchor point from where the zooming originates, and it's a lot easier and more precise to pick the anchor point with the fingers pinched together:

![[Invisible Details of Interaction Design_image_1.png]]

Technically, the anchor point also needs to be calculated when the fingers start from apart. But usually this implies zooming out, and that the exact precision of the origin is not as important. Deliberate precision requires two fingers to start from close together, kind of like grabbing an object.

![[Invisible Details of Interaction Design_image_2.png]]

Scientifically or intuitively, there are hundreds of design decisions made by someone obsessesing over the tiniest margins so that when they work, no one has to think about. And many of them tap into our instinctive behaviors.

### Kinetic Physics

The lock screen sliding up establishes that, in essence, it's just an overlay that can be dismissed by swiping up, and within that framing so is an app. That means you also now know how to dismiss an application.

Let's take a look at how dismissing an app morphs into the Dynamic Island. Notice how the gesture retains the momentum and angle at which it was thrown. It's never perfectly centered or consistent in timing.

This movement builds on our natural sense of physics from the real world, like how swiping a playing card would feel. Although the movement of the playing card exhibits less bounce since it's conceptually lighter and does not magnetically morph into something.

### Swipe Gestures

When does a swipe trigger an action? It seems trivial: you press down, move a little, and then finally trigger an action _after_ releasing the finger. After building a few touch interactions myself using SwiftUI, I realised that might not always be the case. Sometimes we expect the action to be triggered _whilst_ swiping.

Lightweight actions, such as displaying overlays, feel more natural to trigger during the swipe after an arbitrary amount of distance. For example, with a single gesture, I can immediately grok the overlaying surface, understand that it gives me a search input, and then dismiss if it's not what I want. Waiting for the gesture to end would feel inappropriate here.

Here's an example from the MercuryOS SwiftUI prototype I was working on. It feels expected to trigger an action when elements moving during the gesture reach their logical, final position. Notice how the screen is unlocked after both the titles snap to their position, and then locked with a single gesture without releasing the finger. Again, waiting for the gesture to end before unlocking would make the interface feel broken and provide less affordance.

Now, let's look at examples where triggering an action requires explicit intent. The iOS App Switcher will never dismiss an app before the gesture ends. No matter the distance or the fact that the app is partially off-screen:

This makes sense to me because dismissing an app is destructive, and it wouldn't feel nice if the app were to dismiss in the middle of the swipe. What if I were change my mind half-way through and accidentally reached the threshold for dismissing? I could potentially lose some important progress in an app! To make sure the interface responds to intent, triggering on gesture end, regardless of distance, feels right here.

Here's another example where despite swiping an adequate amount of distance for the view to be fully visible and snap, it doesn't until the gesture ends. This makes it lightweight to briefly peek at another screen when scanning for an app, without committing to it, and quickly interrupt the gesture by changing direction.

### Responsive Gestures

Truly fluid gestures are immediately responsive. As mentioned above, gestures can have an explicit trigger threshold, but this does not mean simply performing an animation 0 → 1 would feel great.

For example, a naive implementation for pinching a card would exponentially zoom in after a certain threshold:

Pinching an adequate amount to animate would not feel exactly broken here. But the interface gives zero affordance or confidence that the card is even pinchable with a lower velocity. Neither does this feel satisfying to perform.

It feels a lot better by feeling the scale delta applying immediately, and then performing an animation past a given threshold:

For some reason navigating iOS Settings does not feel as responsive as the App Switcher. A layer slides over from the right which tells me that it can be dismissed by swiping left. But if you happen to mistap, then swiping back immediately does not interrupt the animation — you have to wait for it to end.

### Spatial Consistency

The Dynamic Island has this nice interaction where on tap the application slides out under from the Island to cover the screen:

But if the Island is _expanded_ which conceptually tells the interface my intent is to receive _more_ detail, the application does not slide out from the Island. Instead, it launches from the icon, if its visible. Alternatively, the application slides in from the right:

I can only assume that by launching Spotify from the icon, it is a lot more clear where the audio is playing from. Say you had three music apps on the same row. Through motion this helps establish a relationship between the audio player and its source.

Similarly, if the app slides in from the right, it communicates where it is spatially — in the App Switcher. By moving in from the right, not left, it also signifies that the app is now first on the stack of apps in the switcher.

However, the native Clock app will never open from its icon. It always jumps out from the Island, even when expanded:

This seems to support the theory above. Because the Island timer module is only specific to one app, and there can't be another with the same Island, there's no need to make it clear where it's from.

### Fluid Morphing

We're all familiar with the beautifully fluid, interruptible gestures of iOS to quickly navigate apps. Swiping up morphs the full screen app into its icon:

A curious detail here is that the icon is intentionally stretched from the bottom to fill the frame as it fludily morphs its shape from a vertical rectangle to a uniform square. It's a tiny bit more obvious what happens when looking at the non-standard GitHub icon:

![[Invisible Details of Interaction Design_image_3.png]]

This technique does assume that app icons adhere to the guidelines outlined by Apple. The Bluesky icon ignores the recommended safe zone and as a result the bottom ~10pt of the icon is cropped, duplicated, and stretched, resulting in this weird repeating image effect:

![[Invisible Details of Interaction Design_image_4.png]]

In practice this does not feel completely off, but definitely not as great:

### Frequency & Novelty

As a designer, I love to animate everything. Object permanence, creating a focal point, and delight are all good reasons for doing so. But it's not so obvious when _not_ to animate something.

Sometimes we can get away with not animating mouse or keyboard interactions, without it feeling jarring. There is an inherent disconnect between input from peripheral devices and what happens on the screen. Pressing a key feels less visceral, and more mechanical than touching the screen.

A good example for this would be command menus. It's tempting to throw an opacity and scale fade on the overlay. But if we for a moment consider the interaction frequency being hundreds of times a day, it does start to feel more like cognitive burden after seeing the same animation for the hundredth time. 3

When so commonly executed, the interaction novelty is also diminished. It doesn't feel like you're doing anything peculiar, deserving of a special flourish.

A case in point: I was working on a bookmarking tool ([bmrks.com](https://bmrks.com/)) and intuitively felt great about animating the active indicator and elements being added and removed from the list:

After a couple of days they began to feel sluggish. Despite making the motion even snappier, my perceived performance was making me feel like I have to wait too much when interfacing with the keyboard. I removed motion from core interactions and suddenly felt like I was moving much faster:

Context (right-click) menus on macOS also appear without motion. Used thousands of times a day, with very low novelty and high frequency. Despite being a mouse interaction, it feels right to not animate the menu appearing:

Interestingly enough, the menu subtly fades out. On closer inspection, the selected item briefly blinks the accent color (pink) to provide assurance that the element was successfully selected. I can only assume that the menu fading out makes this feel more graceful and intentional than abruptly disappearing after the blink:

Another good example is the App Switcher on macOS which gets a lot of mileage for heavy keyboard users. The overlay never animates which makes moving between apps feel snappy:

Furthermore, if the time delta between pressing Command and Tab is low enough, the previously active window receives focus immediately without showing the menu:

### Fidgetability

Wonderful interactions don't have to be entirely practical. We've all been in math class, either biting our lips or repetitively clicking a pencil while crunching numbers. Behaviors like this are considered fidgeting. In other words, repetitive movements that apparently help release situational stress, or even enhance concentration. Although there is no scientific research that supports this claim 4, fidgeting does regardless feel like a part of intentional interaction design.

Fidgetability could also be an after-thought, or a happy side-effect. However, the AirPods case is uncannily satisfying to play with. Assuming it to be a coincidence would be very generous.

Apple Pencil is a more obvious candidate to intentionally design to be fidgetable. The tip of the pencil is unscrewable which means it can be replaced eventually. Oddly enough, twisting the tip and rotating the pencil body provides satisfying friction to casually play with while thinking.

Now here's a crazy one that I would not bet my money on being intentional. Although it is dope.

### Scroll Landmarks

On macOS you can always find the pointer by shaking the mouse. This interaction feels wonderful because it taps into the frustration and natural reaction that people feel when losing track of the pointer.

Something similar quite often happens to me on mobile when browsing long-form content. I've scrolled down half-way, and while reading I want to quickly recall something from above. But then I feel awkward scrolling back up because I will lose my precious scroll position and reading progress.

I made a tiny prototype where double tapping the scrollbar will place a landmark for the current scroll position. Now I could freely navigate around the page and double tap the landmark to get back to where I was before.

This feels familiar to use because the scrollbar is already interactive on touch. If you didn't know, long-pressing the scrollbar would make it draggable which is much faster to scroll quickly.

This reminds me of an old minimap prototype I made. Inspired by games where you always have a bird's eye view of the surrounding environment. Why not have a similar heads up display for navigating a page?

### Touch Content Visiblity

On touch interfaces, sometimes a finger might obfuscate what's happening on the screen which makes it hard to perform gestures at pixel-level precision. Commonly, the interface would then render a temporary representation of what's underneath the finger.

For example, on iOS when pressing down and dragging to move the text caret, a magnifying loupe will appear above the touch point. However, whenever the finger moves downwards and no longer covers the caret, the loupe disappears.

A similar detail is used for the keyboard. Pressing a key will show an enlarged key which gives you confidence that the interface understood what you meant.

It doesn't always make sense to mirror the obfuscated region. For example, sliders can be tiny and disappear under the touch of the thumb. It helps to ensure that the dragging gesture does not cancel when moving away from the slider and still pressing down:

Although seeking video is mostly a visual interaction, there's an unintelligible level of discomfort apparent when interacting with an element that you can't see.

Here's a more obvious example where it's critical to understand contents of the menu:

### Implicit Input

Forever long we've been peeling back the layers between humans and computing. Touch input elevated the relationship by introducing gestures and haptics. Soon applications will no longer be bound by the constraints of a fixed screen.

The keyboard, mouse, touch, voice are all explicit inputs. They feel like a natural extension of ourselves 2 when dialed into perfection. But isn't the mother of all inputs no input at all? When an interface makes use of context as input and can infer what you're trying to do without asking, it truly feels magical.

For example, by looking at the screen, Apple Maps will show the active route navigation without unlocking. Apple Wallet will increase the brightness when presenting a pass for scanning. Spotify will adjust the interface to be more accessible while driving.

Some custom iOS apps will blur the contents of the app when opening the App Switcher. At first, I figured it was just a performance optimization. But it turns out that it's a deliberate attempt to conceal possibly sensitive data, like medical records or a bank statement.

### Fitts's Law

Fitts's Law states that the time to click on something depends on distance and size. 5 The bigger the target, and the closer it is to where your pointer is, the better.

Operating systems make use of "magic corners" on the edges of the screen because the target area is infinitely large. 6 For example, on macOS, you can configure what happens when the pointer moves to a corner. You could show the Launchpad from the top-left corner:

The target size is infinite because the pointer can't overshoot past the corner, so the precision required for this interaction is very low. Reaching for any corner becomes a quick flick of the mouse. This is also why operating systems place commonly used menus, like the Apple menu, in corners.

Radial menus are an exemplary case of Fitts's Law. They spawn around the pointer making the size and distance towards any target the same for all actions. Over time, muscle memory will kick in and even make it possible to select an action based purely on distance and direction.

Here's a radial menu you can try:

Hold and rotate from anywhere

### Scrolling

On most operating systems, you can scroll any scrollable region, even if the window itself is not active. This is great, except when another window scrolls unintentionally.

With the Magic Mouse I can scroll on a window, then move the pointer over a second window to click or find something, and the scroll events will not register on the second window. This feels great to me.

However, with any traditional mouse, like the Logitech MX Master 3, the scrolling on the first window is cancelled and hijacked by the second window. And it's really frustrating when this happens daily:

With the Magic Mouse, scrolling is cancelled explicitly by focusing another window:

Pointing devices like the Magic Trackpad and Magic Mouse also unlock direct manipulation for desktop computing. Besides the obvious ones like swiping between apps, it's also possible to directly manipulate sliders by scrolling, all with a single interaction:

### Closing Thoughts

For me, understanding and articulating why something feels right does not come as intuitively as _designing_ something to feel right. But they are two sides of the same coin. There must be a reason. It can be as simple as a particular spring curve or something more innate, like metaphors. Analyzing and making sense of design details beyond just "it feels nice" helps nurture taste, amplify level of execution, and grow appreciation for how hard the pursuit of excellence is.

### Acknowledgments

Thanks to [Paco](https://twitter.com/pacocoursey), [Alasdair](https://twitter.com/almonk), [Emil](https://twitter.com/emilkowalski_), [Thomas](https://twitter.com/thomaspaulmann) for reading early drafts and their insights and feedback.

No artificial intelligence was used to generate content for this essay.

### Resources

1. [E. Goodman, E. Stolterman, R. Wakkary. Understanding Interaction Design Practices (2011)](https://summit.sfu.ca/_flysystem/fedora/sfu_migrate/15215/2011_CHI_Understanding_Goodman_vy-edited.pdf)
2. [C. Karunamuni, N. Vries, M. Alonso. Designing Fluid Interfaces (2018)](https://developer.apple.com/videos/play/wwdc2018/803/)
3. [Brandur. Learning From Terminals to Design the Future of User Interfaces (2017)](https://brandur.org/interfaces)
4. [S. L. Kriescher. The Effects of Fidgets on Attention and Learning of College Students (2020)](https://digscholarship.unco.edu/cgi/viewcontent.cgi?article=1669&context=dissertations)
5. [Paul Morris Fitts. The information capacity of the human motor system in controlling the amplitude of movement (1954)](https://en.wikipedia.org/wiki/Fitts%27s_law)
6. [Kevin Hale. Visualizing Fitts's Law (2010)](http://www.particletree.com/features/visualizing-fittss-law/)
7. [Apple Human Interface Guidelines (1987)](https://andymatuschak.org/files/papers/Apple%20Human%20Interface%20Guidelines%201987.pdf)
8. [Rasmus Andersson. The curious case of user interfaces (2023)](https://www.youtube.com/watch?v=76b3c_ssyPQ&ab_channel=Figma)
9. [Metamuse. Rethink the OS with Jason Yuan (2020)](https://museapp.com/podcast/17-rethink-the-os/)
10. [Jason Yuan. MercuryOS (2019)](https://www.mercuryos.com/)
11. [Paul Graham. How to Do Great Work (2023)](http://paulgraham.com/greatwork.html#f2n)
12. [App Dissection. Brian Lovin](https://brianlovin.com/app-dissection)