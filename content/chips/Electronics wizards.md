---
date created: 2025-08-29T11:25
date modified: 2025-11-30T19:10
subtitle: there's a whole other world out there
tags:
  - resourceland
  - electrical
---
> Competition is always a good thing. It forces us to do our best. A monopoly renders people complacent and satisfied with mediocrity.  💬 Nancy Pearcey

## Links

[tscircuit - Code Electronics with React](https://tscircuit.com/) --> By the same people/guy behind [autorouting | Substack](https://blog.autorouting.com/) [API for IoT Devices](https://www.seam.co/) [electronics.dev | Substack](https://electronics.dev/) 

2 labs: [Purdue Radio Navigation Laboratory](https://engineering.purdue.edu/RNL/) [Harvard Architecture, Circuits and Compilers \| Harvard Architecture, Circuits and Compilers](https://vlsiarch.eecs.harvard.edu/) 

[IEEE paper on a wheelchair controlled by jaw](https://ieeexplore.ieee.org/document/8914544/authors) - by some Canadians

[Integrated injection logic - Wikipedia](https://en.m.wikipedia.org/wiki/Integrated_injection_logic) [Ground bounce - Wikipedia](https://en.m.wikipedia.org/wiki/Ground_bounce) [Buridan's ass - Wikipedia](https://en.m.wikipedia.org/wiki/Buridan%27s_ass#Application_to_digital_logic:_metastability) [Metastability (electronics) - Wikipedia](https://en.m.wikipedia.org/wiki/Metastability_(electronics)) [Double data rate - Wikipedia](https://en.m.wikipedia.org/wiki/Double_data_rate) 

NYU: [Welcome to the MyHDL documentation — MyHDL 0.11 documentation](https://docs.myhdl.org/en/stable/) [Introduction - NYU Processor Design Documentation](https://nyu-processor-design.github.io/) 

Preparing Fermilab to Carry Out the P5 Plan [2407.13924](https://arxiv.org/pdf/2407.13924)

Cool guy with cool projects [Benchoff Design Portfolio](https://bbenchoff.github.io/system7/?page=BusTideDisplay)

[GitHub - platima/Board-Taxonomies: Definitions and examples for different categories of embedded computing boards](https://github.com/platima/board-taxonomies)

(South) bay area ham radio [SPECS Outreach Homepage](https://www.qsl.net/k9stv/) [Southern Peninsula Emergency Communications System \| Meetup](https://www.meetup.com/southern-peninsula-emergency-communications-system/) [Contact the ISS - ARISS](https://www.ariss.org/contact-the-iss.html)

another guy on twitter [Hong's Electronics](https://www.jhongelectronics.org/?m=1)

AI-powered EDA and ASICs [Normal Computing](https://www.normalcomputing.com/) 

[DIY Electric Skateboard Tutorial - faster than a Boosted Board - SmartBuilds.io](https://smartbuilds.io/diy-electric-skateboard-tutorial/) skateboard description 

This paper has been making the rounds lately [See through walls with WiFi!](https://dspace.mit.edu/handle/1721.1/87086)  

Two cool hackaday guides, idk why it says unreachable [hackaday podcast hidden message](https://hackaday.com/2022/07/01/unraveling-the-hackaday-podcast-hidden-message/)  [hackaday youtube as file storage](https://hackaday.com/2023/02/21/youtube-as-infinite-file-storage/)  

[Build a 6502 computer | Ben Eater](https://eater.net/6502) 

[Home | nand2tetris](https://www.nand2tetris.org/)

[MicroZed Chronicles: Proportional Integral Derivative (PID) Controller](https://www.adiuvoengineering.com/post/microzed-chronicles-proportional-integral-derivative-pid-controller)

[fromthetransistor.com](https://www.fromthetransistor.com/) kind of not kino but i'll add it bc everybody glazes [GitHub - geohot/fromthetransistor: From the Transistor to the Web Browser, a rough outline for a 12 week course](https://github.com/geohot/fromthetransistor) 

[Mechanical Computing](https://tennysontbardwell.com/blog/2025/04/30/mechanical-computing/index.html) 

[PyXL - GPIO Benchmark](https://www.runpyxl.com/gpio) 

[ARTIQ | M-Labs](https://m-labs.hk/experiment-control/artiq/) 

[Simon Oz - YouTube](https://www.youtube.com/@szymonozog7862/videos) GPU programming resources

[NaN boxing or how to make the world dynamic - Blog by Piotr Duperas](https://piotrduperas.com/posts/nan-boxing)

[ICP-RIE: Dielectric Etcher – The KNI Lab at Caltech](https://lab.kni.caltech.edu/ICP-RIE:_Dielectric_Etcher) 

[Why do CPUs have multiple cache levels? \| The ryg blog](https://fgiesen.wordpress.com/2016/08/07/why-do-cpus-have-multiple-cache-levels/) 

Google XPUs: [GitHub - google-coral/coralnpu: A machine learning accelerator core designed for energy-efficient AI at the edge.](https://github.com/google-coral/coralnpu) and also [Tensor Processing Units (TPUs) \| Google Cloud](https://cloud.google.com/tpu) 

[GitHub - DoctorWkt/acwj: A Compiler Writing Journey](https://github.com/DoctorWkt/acwj) 

[T3X.ORG subc/index](https://www.t3x.org/subc/) 

[GitHub - FFmpeg/asm-lessons: FFmpeg Assembly Language Lessons](https://github.com/FFmpeg/asm-lessons?tab=readme-ov-file) 

[hello-world iOS app · GitHub](https://gist.github.com/nicolas17/966a03ce49f949dd17b0123415ef2e31) in assembly

> [!seealso]-
> ```
> .global _main
> .extern _putchar
> 
> .align 4
> 
> _main:
>     ; prolog; save fp,lr,x19
>     stp x29, x30, [sp, #-0x20]!
>     str x19, [sp, #0x10]
>     mov x29, sp
>     ; make space for 2 dword local vars
>     sub sp, sp, #0x10
>     ; save argc/argv
>     stp x0, x1, [sp]
> 
>     ; create autorelease pool and save into x19
>     bl _objc_autoreleasePoolPush
>     mov x19, x0
> 
>     ; initialize app delegate class
>     bl initAppDelegate
> 
>     ; create CFString with delegate class name
>     mov x0, 0
>     adrp x1,     str_AppDelegate@PAGE
>     add  x1, x1, str_AppDelegate@PAGEOFF
>     mov x2, 0x0600 ; kCFStringEncodingASCII
>     bl _CFStringCreateWithCString
> 
>     ; x0 = UIApplicationMain(argc, argv, nil, CFSTR("AppDelegate"));
>     mov x3, x0
>     ldr x0, [sp]
>     ldr x1, [sp, #0x8]
>     mov x2, #0
>     bl _UIApplicationMain
>     mov x7, x0 ; save retval
> 
>     ; pop autorelease pool
>     mov x0, x19
>     bl _objc_autoreleasePoolPop
> 
>     ; epilog
>     ; restore stack pointer
>     add sp, sp, 0x10
>     ; restore saved registers
>     ldr x19, [sp, #0x10]
>     ldp x29, x30, [sp], #0x20
>     ; get retval
>     mov x0, x7
>     ret
> 
> initAppDelegate:
>     ; prolog; save fp,lr,x20
>     stp x29, x30, [sp, #-0x20]!
>     str x20, [sp, #0x10]
>     mov x29, sp
> 
>     ; Class c = objc_allocateClassPair(objc_getClass("NSObject"), "AppDelegate", 0);
>     adrp x0,     str_NSObject@PAGE
>     add  x0, x0, str_NSObject@PAGEOFF
>     bl _objc_getClass
>     adrp x1,     str_AppDelegate@PAGE
>     add  x1, x1, str_AppDelegate@PAGEOFF
>     mov x2, 0
>     bl _objc_allocateClassPair
> 
>     ; save the class since we'll clobber x0 several times
>     mov x20, x0
> 
>     ; class_addProtocol(c, objc_getProtocol("UIApplicationDelegate"));
>     adrp x0,     str_UIAppDelegate@PAGE
>     add  x0, x0, str_UIAppDelegate@PAGEOFF
>     bl _objc_getProtocol
>     mov x1, x0
>     mov x0, x20
>     bl _class_addProtocol
> 
>     ; class_addMethod(c, S("application:didFinishLaunchingWithOptions:"), didFinishLaunching, "B@:@@");
> 
>     adrp x0,     str_didFinishLaunchingSel@PAGE
>     add  x0, x0, str_didFinishLaunchingSel@PAGEOFF
>     bl _sel_getUid
>     mov x1, x0
>     mov x0, x20
>     adr x2, didFinishLaunching
>     adrp x3, str_typestr@PAGE
>     add  x3, x3, str_typestr@PAGEOFF
>     bl _class_addMethod
>     
>     ; objc_registerClassPair(c);
>     mov x0, x20
>     bl _objc_registerClassPair
> 
>     ; epilog
>     ldr x20, [sp, #0x10]
>     ldp x29, x30, [sp], #0x20
>     ret
> 
> ; parameters:
> ; x0: self
> ; x1: _sel
> ; x2: application
> ; x3: launchOptions
> didFinishLaunching:
>     ; prolog, save fp, lr, x19-x22
>     stp x29, x30, [sp, #-0x30]!
>     stp x19, x20, [sp, #0x10]
>     stp x21, x22, [sp, #0x20]
>     mov x29, sp
>     sub sp, sp, 0x20
> 
>     ; x19 = @selector(mainScreen)
>     adrp x0, str_mainScreen@PAGE
>     add  x0, x0, str_mainScreen@PAGEOFF
>     bl _sel_getUid
>     mov x19, x0
> 
>     ; objc_getClass("UIScreen")
>     adrp x0, str_UIScreen@PAGE
>     add  x0, x0, str_UIScreen@PAGEOFF
>     bl _objc_getClass
> 
>     ; x20 = [UIScreen mainScreen]
>     mov x1, x19
>     bl _objc_msgSend
>     mov x20, x0
>     ; x19 is now free
> 
>     ; x1 = @selector(bounds)
>     adrp x0, str_bounds@PAGE
>     add x0, x0, str_bounds@PAGEOFF
>     bl _sel_getUid
>     mov x1, x0
> 
>     ; [x20 bounds]
>     mov x0, x20
>     bl _objc_msgSend
> 
>     stp d0, d1, [sp]
>     stp d2, d3, [sp, #0x10]
> 
>     ; x19 = @selector(initWithFrame:)
>     adrp x0, str_initWithFrame@PAGE
>     add x0, x0, str_initWithFrame@PAGEOFF
>     bl _sel_getUid
>     mov x19, x0
> 
>     ; x0 = UIWindow
>     adrp x0, str_UIWindow@PAGE
>     add  x0, x0, str_UIWindow@PAGEOFF
>     bl _objc_getClass
> 
>     ; x0 = class_createInstance(x0)
>     mov x1, #0x0
>     bl _class_createInstance
>     ; x0 now has the instance
>     
>     ; x20 = [x0 initWithFrame:d]
>     mov x1, x19 ;initWithFrame
>     ldp d0, d1, [sp]
>     ldp d2, d3, [sp, #0x10]
>     bl _objc_msgSend
>     mov x20, x0
> 
>     ; x19 = @selector(init)
>     adrp x0, str_init@PAGE
>     add x0, x0, str_init@PAGEOFF
>     bl _sel_getUid
>     mov x19, x0
> 
>     ; x0 = UIViewController
>     adrp x0, str_UIViewController@PAGE
>     add  x0, x0, str_UIViewController@PAGEOFF
>     bl _objc_getClass
> 
>     ; x0 = class_createInstance(UIViewController)
>     mov x1, #0x0
>     bl _class_createInstance
>     ; x0 now has the instance
> 
>     ; x21 = [x0 init]
>     mov x1, x19 ;init
>     bl _objc_msgSend
>     mov x21, x0
> 
>     ; x19 = @selector(yellowColor)
>     adrp x0, str_yellowColor@PAGE
>     add  x0, x0, str_yellowColor@PAGEOFF
>     bl _sel_getUid
>     mov x19, x0
> 
>     ; x22 = [UIColor yellowColor]
>     adrp x0, str_UIColor@PAGE
>     add  x0, x0, str_UIColor@PAGEOFF
>     bl _objc_getClass
>     mov x1, x19
>     bl _objc_msgSend
>     mov x22, x0
> 
>     ; x19 = @selector(setBackgroundColor:)
>     adrp x0, str_setBackgroundColor@PAGE
>     add  x0, x0, str_setBackgroundColor@PAGEOFF
>     bl _sel_getUid
>     mov x19, x0
> 
>     ; x1 = @selector(view)
>     adrp x0, str_view@PAGE
>     add  x0, x0, str_view@PAGEOFF
>     bl _sel_getUid
>     mov x1, x0
> 
>     ; x0 = [[controller view] setBackgroundColor: x22];
>     mov x0, x21
>     bl _objc_msgSend
>     mov x1, x19
>     mov x2, x22
>     bl _objc_msgSend
> 
>     adrp x0, str_setRoot@PAGE
>     add  x0, x0, str_setRoot@PAGEOFF
>     bl _sel_getUid
>     mov x1, x0
> 
>     ; [window setRootViewController:viewController]
>     mov x0, x20
>     mov x2, x21
>     bl _objc_msgSend
> 
>     ; [x20 makeKeyAndVisible]
>     adrp x0, str_makeKeyAndVisible@PAGE
>     add x0, x0, str_makeKeyAndVisible@PAGEOFF
>     bl _sel_getUid
> 
>     mov x1, x0
>     mov x0, x20
>     bl _objc_msgSend
> 
>     ; return YES
>     mov x0, #0x1
> 
>     ; epilog
>     add sp, sp, 0x20
>     ldp    x19, x20, [sp, #0x10]
>     ldp    x21, x22, [sp, #0x20]
>     ldp    x29, x30, [sp], #0x30
>     ret
> 
> .data
> str_NSObject:               .asciz "NSObject"
> str_AppDelegate:            .asciz "AppDelegate"
> str_UIAppDelegate:          .asciz "UIApplicationDelegate"
> str_UIScreen:               .asciz "UIScreen"
> str_UIWindow:               .asciz "UIWindow"
> str_UIViewController:       .asciz "UIViewController"
> str_UIColor:                .asciz "UIColor"
> 
> str_typestr:                .asciz "B@:@@"
> str_didFinishLaunchingSel:  .asciz "application:didFinishLaunchingWithOptions:"
> str_mainScreen:             .asciz "mainScreen"
> str_bounds:                 .asciz "bounds"
> str_initWithFrame:          .asciz "initWithFrame:"
> str_makeKeyAndVisible:      .asciz "makeKeyAndVisible"
> str_init:                   .asciz "init"
> str_view:                   .asciz "view"
> str_setBackgroundColor:     .asciz "setBackgroundColor:"
> str_yellowColor:            .asciz "yellowColor"
> str_setRoot:                .asciz "setRootViewController:"
> ```

[Multirate Systems and Filter Banks](https://authors.library.caltech.edu/records/rmhds-22q28) PPV textbook

MAGIC VLSI

- [terpconnect.umd.edu/\~newcomb/vlsi/magic\_tut/Magic\_x3.pdf](https://terpconnect.umd.edu/~newcomb/vlsi/magic_tut/Magic_x3.pdf) 
- [GitHub - RTimothyEdwards/magic: Magic VLSI Layout Tool](https://github.com/RTimothyEdwards/magic) 
- [Magic VLSI](http://opencircuitdesign.com/magic/) 

[McKinnon Building \| These are some of the things I have built and written about](https://dmckinnon.github.io/) 

- ML business card

[mitxela.com](https://mitxela.com/) I love this guy and his youtube

[Intel 4004 — 50th Anniversary Project](https://4004.com/) 

[home \| DAM](https://dam.stanford.edu/index.html) stanford - research on distributedsomething something

[VLSI Group](https://vlsi.stanford.edu/) also stanford

[wafer.space - Budget silicon manufacturing.](https://wafer.space/)

[Pure Logic on Steam](https://store.steampowered.com/app/1861500/Pure_Logic/)  ==> this was an ad, though...

[The Untold History of Arduino](https://arduinohistory.github.io/) 

[Unusual circuits in the Intel 386's standard cell logic](https://www.righto.com/2025/11/unusual-386-standard-cell-circuits.html) 

[Ironwood: The first Google TPU for the age of inference](https://blog.google/products/google-cloud/ironwood-tpu-age-of-inference/) [Ironwood TPUs and new Axion-based VMs for your AI workloads \| Google Cloud Blog](https://cloud.google.com/blog/products/compute/ironwood-tpus-and-new-axion-based-vms-for-your-ai-workloads)

[microcad.xyz](https://microcad.xyz/) 

Huawei patent for 2nm [CN119301758A - A metal integration method for manufacturing integrated devices - Google Patents](https://patents.google.com/patent/CN119301758A/en?oq=CN2022097621) 

[net.in.tum.de/fileadmin/TUM/NET/NET-2024-04-1/NET-2024-04-1\_16.pdf](https://www.net.in.tum.de/fileadmin/TUM/NET/NET-2024-04-1/NET-2024-04-1_16.pdf) The Path of a Packet Through the Linux Kernel 

[ASM Visualizer](https://asm.diveintosystems.org/)

## Conferences

[Committees - Hot Chips](https://hotchips.org/about/committees/) 

[ISSCC Information for Students — International Solid-State Circuits Conference](https://www.isscc.org/information-for-students)

[Intel Labs \| The Future Begins Here](https://www.intel.com/content/www/us/en/research/overview.html)

## Related

![[GPU resources]]