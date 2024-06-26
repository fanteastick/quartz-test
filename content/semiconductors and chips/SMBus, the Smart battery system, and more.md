---
date created: 2024-06-25T23:13
date modified: 2024-06-25T23:21
---
# System Management Bus...

[System Management Bus - Wikipedia](https://en.wikipedia.org/wiki/System_Management_Bus)

The System Management Bus (abbreviated to SMBus or SMB) is a single-ended simple two-wire bus for the purpose of lightweight communication. Most commonly it is found in chipsets of computer motherboards for communication with the power source for ON/OFF instructions. The exact functionality and hardware interfaces vary with vendors.

It is derived from I²C for communication with low-bandwidth devices on a motherboard, especially power related chips such as a laptop's rechargeable battery subsystem (see Smart Battery System and ACPI). Other devices might include external master hosts, temperature sensor, fan or voltage sensors, lid switches, clock generator, and RGB lighting. PCI add-in cards may connect to an SMBus segment.

A device can provide manufacturer information, indicate its model/part number, save its state for a suspend event, report different types of errors, accept control parameters, return status over SMBus, and poll chipset registers. The SMBus is generally not user configurable or accessible. Although SMBus devices usually can't identify their functionality, a new PMBus coalition has extended SMBus to include conventions allowing that.

The SMBus was defined by Intel and Duracell in 1994.[1] It carries clock, data, and instructions and is based on Philips' I²C serial bus protocol. Its clock frequency range is 10 kHz to 100 kHz. (PMBus extends this to 400 kHz.) Its voltage levels and timings are more strictly defined than those of I²C, but devices belonging to the two systems are often successfully mixed on the same bus. 

# ...which was developed by The Smart Battery System Implementers Forum

[SBS-IF Smart Battery System Implementers Forum](https://sbs-forum.org/)

The Smart Battery System Implementers Forum (SBS-IF) has been creating, promoting, and supporting open standards for smart battery systems for more than a decade (since the mid-1990s).

SBS-IF specifications, which include those for the popular [System Management Bus (SMBus)](http://smbus.org/), are widely adopted in the industry.

The SBS-IF is now part of the [System Management Interface Forum (SMIF), Inc.](http://smiforum.org/), a non-profit industry group incorporated in Texas.

# What they're doing now

[System Management Interface Forum (SMIF)](https://smiforum.org/) 

The System Management Interface Forum (SMIF), Inc., supports the rapid advancement of an efficient and compatible technology base that promotes power management and systems technology implementations. The group’s activities include: promoting global development of communications protocols; identification of appropriate applications; providing global educational services; promoting worldwide compatibility and interoperability; and identifying, selecting, augmenting as appropriate, and publishing specifications. The SMIF provides a membership path for any company or individual to be active participants in any or all of the various working groups established by the implementers forums.
