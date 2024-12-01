---
date created: 2024-11-29T00:39
date modified: 2024-11-29T00:49
tags:
  - external
subtitle: 👟 but shoes? shoes, i know
---

[Flip-Flop Types, Truth Table, Circuit, Working, Applications](https://www.electronicsforu.com/technology-trends/learn-electronics/flip-flop-rs-jk-t-d)

[Flip-flop (electronics) - Wikipedia](https://en.wikipedia.org/wiki/Flip-flop_(electronics)) 

## SR Flip-Flop

![[Every type of flip flop_image_1.png]] 

Truth table:

| **S** | **R** | **Q** | **Q’** |
| ----- | ----- | ----- | ------ |
| 0     | 0     | 0     | 1      |
| 0     | 1     | 0     | 1      |
| 1     | 0     | 1     | 0      |
| 1     | 1     | ∞     | ∞      |

## JK Flip-Flop

![[Every type of flip flop_image_2.png]]

Truth table

| **J** | **K** | **Q** | **Q’** |
| ----- | ----- | ----- | ------ |
| 0     | 0     | 0     | 0      |
| 0     | 1     | 0     | 0      |
| 1     | 0     | 0     | 1      |
| 1     | 1     | 0     | 1      |
| 0     | 0     | 1     | 1      |
| 0     | 1     | 1     | 0      |
| 1     | 0     | 1     | 1      |
| 1     | 1     | 1     | 0      |

## D Flip-Flop

![[Every type of flip flop_image_3.png]]

Truth table: 

| **Clock** | **D** | **Q** | **Q’** |
| --------- | ----- | ----- | ------ |
| ↓ » 0     | 0     | 0     | 1      |
| ↑ » 1     | 0     | 0     | 1      |
| ↓ » 0     | 1     | 0     | 1      |
| ↑ » 1     | 1     | 1     | 0      |

## T Flip-Flop

![[Every type of flip flop_image_4.png]] 

Truth table: 

| **T** | **Q** | **Q (t+1)** |
| ----- | ----- | ----------- |
| 0     | 0     | 0           |
| 1     | 0     | 1           |
| 0     | 1     | 1           |
| 1     | 1     | 0           |
