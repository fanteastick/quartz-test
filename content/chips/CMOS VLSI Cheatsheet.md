---
date created: 2026-01-30T00:51
date modified: 2026-02-25T00:37
tags:
  - vlsi
---

Sometimes I forget the basics. Sue me!

- [Karnaugh Maps](https://learnabout-electronics.org/Digital/dig24.php) 

see [[#Transistor operating regions]]

- Linear mode
$$
I=\mu_eC_{ox}\frac{W}{L}((V_{gs}-V_t)V_{ds} - \frac{1}{2}V_{ds}^2)
$$
- Saturation mode
$$
I=\mu_eC_{ox}\frac{1}{2}\frac{W}{L}(V_{gs}-V_t)^2
$$

![[Pasted image 20260208111252.png]]

Source: [Book Draft: _Analog: Inexact Science, Vibrant Art_ (pdf)](https://chic.caltech.edu/wp-content/uploads/2023/01/Hajimiri_Analog_DRAFT012023.pdf) by Ali Hajimiri

## Calculators

[Boolean Algebra Calculator - eMathHelp](https://www.emathhelp.net/calculators/discrete-mathematics/boolean-algebra-calculator)

[Hex Calculator](https://www.rapidtables.com/calc/math/hex-calculator.html) 

[Lookahead carry unit - Wikipedia](https://en.wikipedia.org/wiki/Lookahead_carry_unit) 

[Karnaugh Map Simulator](http://vlabs.iitkgp.ac.in/coa/exp13/kmap.html) Karnaugh maps calculator

## PMOS vs NMOS

PMOS: usually drawn with a dot at the gate.

[MOSFET Structure and Operation for Analog IC Design - Technical Articles](https://www.allaboutcircuits.com/technical-articles/mosfet-structure-and-operation-for-analog-ic-design/) 

> ![[Pasted image 20260130015635.png]]

More ways to draw CMOS transistors: [Transistor Level Implementation of CMOS Combinational Logic Circuits](https://tiij.org/issues/issues/spring97/electronics/cmos/cmostran.html)

> ![[Pasted image 20260130015735.png]] 
## Implementing boolean equations with combinational MOS circuits

Pull up and pull down network are logical duals. PDN is when the output should be 0, because it gets pulled to 0, because at least one path has the transistors on which pulls it down to 0. 

- pull up is PMOS connected to VDD, pull down is NMOS connected to GND
- In NMOS: OR operations = Parallel. AND = series.
- In PMOS: OR = series. AND = parallel. 

[Combinational MOS Logic Circuits](https://www.tutorialspoint.com/vlsi_design/vlsi_design_combinational_mos_logic_circuits.htm)

![[Pasted image 20260130013347.png]]

## Boolean algebra

Aka boolean logic

[Boolean Algebra Simplification with Examples | Electronics Tutorials](https://www.electronics-tutorials.ws/boolean/boolean-algebra-simplification.html) 

> ![[CMOS VLSI Cheatsheet_image_2.png]]

### Truth Tables

NAND

NOR 

XOR

## VTC voltage transfer curve

[CAD of Electronics Lab](https://rajeev2007.github.io/ICT/Cad%20CMOS%20Inverter.html) this one is a description of an educational lab, but it's pretty good. 

> Digital inverter quality is often measured using the Voltage Transfer Curve (VTC), which is a plot of input vs. output voltage. From such a graph, device parameters including noise tolerance, gain, and operating logic-levels can be obtained.
> 
> ![[Pasted image 20260130013406.png]]
> |Fig.2: Voltage Transfer Curve for a typical 20 μm Inverter|
> 
> Ideally, the voltage transfer curve (VTC) appears as an inverted step-function - this would indicate precise switching between _on_ and _off_ - but in real devices, a gradual transition region exists. The VTC indicates that for low input voltage, the circuit outputs high voltage; for high input, the output tapers off towards 0 volts. The slope of this transition region is a measure of quality - steep (close to -Infinity) slopes yield precise switching. The tolerance to noise can be measured by comparing the minimum input to the maximum output for each region of operation (on / off). This is more explicitly shown in the fig.3.
> 
> ![[Pasted image 20260130013417.png]]
> | Fig.3: Definition of noise margin |
> 
> Noise margin : is a parameter intimately related to the transfer characteristics. It allows one to estimate the allowable noise voltage on the input of a gate so that the output will not be affected. Noise margin (also called noise immunity) is specified in terms of two parameters - the low noise margin NL, and the high noise margin NH . Referring to above figure, NL is defined as the difference in magnitude between the maximum LOW input voltage recognized by the driven gate and the maximum LOW output voltage of the driving gate. That is, NL =|VIL - VOL|. Similarly, the value of NH is the difference in magnitude between the minimum HIGH output voltage of the driving gate and the minimum HIGH input voltage recognizable by the driven gate. That is, NMH =|VOH - VIH|. Where VIH: minimum HIGH input voltage, VIL: maximum LOW input voltage, VOH: minimum HIGH output voltage, VOL: maximum LOW output voltage.

## Transistor operating regions

[web.engr.oregonstate.edu/\~webbky/ECE322\_files/Section 4 MOSFETS.pdf](https://web.engr.oregonstate.edu/~webbky/ECE322_files/Section%204%20MOSFETS.pdf)

> ![[Pasted image 20260130015452.png]]

## Sizing

Usually PMOS is wider than NMOS, because the mobility ratio is 1:2 usually. 

## Things I didn't look in detail, but the pages seem useful

[MOSFET Gradual Channel Approximation](https://lampz.tugraz.at/~hadley/psd/L10/gradualchannelapprox.php) 

[2110.06526](https://arxiv.org/pdf/2110.06526) Nazarian, Practice Problems for Hardware Engineers

[Transistor Level Implementation of CMOS Combinational Logic Circuits](https://tiij.org/issues/issues/spring97/electronics/cmos/cmostran.html) 