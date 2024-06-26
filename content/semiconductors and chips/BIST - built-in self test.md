---
date created: 2024-06-07T13:20
date modified: 2024-06-08T16:16
---

[Built-in self-test (BiST) - Semiconductor Engineering](https://semiengineering.com/knowledge_centers/test/built-in-self-test-bist/) 

> Built-in self-test, or BIST, is a structural test method that adds logic to an IC which allows the IC to periodically test its own operation. Two major types are memory BIST and logic BIST.

> Memory BIST, or MBIST, generates patterns to the memory and reads them to log any defects. Memory BIST also consists of a repair and redundancy capability. In this technology, each die has spare circuits. If a circuit is bad, the defective circuit is disconnected and replaced with a good one. Memory BIST is also used to obtain known good memory stacks for 2.5D/3D devices.

> Logic BIST, or LBIST, uses a Pseudo-Random Pattern Generator to generate input patterns that are applied to internal scan chains. The results are compressed into a signature. Then, a Multi-Input Signature Register determines whether the signature is correct or not to tell if all tests passed.