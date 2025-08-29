---
link: https://www.tinytpu.com/
slurped: 2025-08-28T00:22
title: "Tiny-TPU: the why and how"
date created: 2025-08-28T00:22
date modified: 2025-08-28T00:22
tags:
  - slurp
---

Nobody really understands how TPUs work…and neither do we! So we wanted to make this because we wanted to take a shot and try to guess how it works–from the perspective of complete novices!

We wanted to do something very challenging to prove to ourselves that we can do anything we put our mind to. The reasoning for why we chose to build a TPU specifically is fairly simple:

None of us have real professional experience in hardware design, which, in a way, made the TPU even more appealing since we weren't able to estimate exactly how difficult it would be. As we worked on the initial stages of this project, we established a strict design philosophy: ALWAYS TRY THE HACKY WAY. This meant trying out the "dumb" ideas that came to our mind first BEFORE consulting external sources. This philosophy helped us make sure we weren't reverse engineering the TPU, but rather **re-inventing it**, which helped us derive many of the key mechanisms used in the TPU ourselves.

We also wanted to treat this project as an exercise to code without relying on AI to write for us, since we felt that our initial instinct recently has been to reach for these AI tools whenever we faced a slight struggle. We wanted to cultivate a certain **style of thinking** that we could take forward with us and use in any future endeavours to think through difficult problems. Inspired by Sholto Douglas’s message in his [YouTube short](https://www.youtube.com/results?search_query=sholto+douglas) — that you don’t need permission to make great things — we kept shipping and learning in public.[[1]](https://www.tinytpu.com/#fn1)

A TPU is an application specific integrated circuit (ASIC) - basically a custom chip - designed by Google to make inferencing (using) and training ML models faster and more efficient. Whereas a GPU can be used to render frames AND run ML workloads, a TPU can only perform math operations, allowing it to be better at what it's designed for. Naturally, trying to master a single task is much easier and will yield better results than trying to master multiple tasks and the TPU strongly employs this philosophy.

_Quick primer on hardware design:_

In hardware, the unit of time we're dealing with is called a clock cycle. This is an arbitrary period of time that we can set, as developers, to meet our requirements. Generally, a single clock cycle can range from 1 picosecond (ps) to 1 nanosecond (ns) and any operations we run will be executed BETWEEN clock cycles.

![[Tiny-TPU - the why and how_image_1.svg]]

Clock cycle timing diagram showing how operations are synchronized in hardware

The language we use to describe hardware is called Verilog. It's a hardware description language that allows us to describe the behaviour of a given hardware module (similar to functions in software), but instead of executing as a program, it synthesizes into boolean logic gates (AND, OR, NOT, etc.) that can be combined to build the digital logic for any chip we want. Here's a simple example of an addition in Verilog:

```
module add (
    input wire clk,
    // reset signal to reset the module
    input wire rst,

    // registers to hold the input and output values
    input reg a,
    input reg b,
    output reg c
  );
    
    always @(posedge clk) begin 

    // everything in this block will be executed every clock cycle
    
      if (rst) begin
      // reset the output to 0 when the reset signal is high
        c <= 0; 
      end else begin
        // add the two inputs and store the result in the output
        c <= a + b; 
      end
    end

endmodule
```

In the example above, the value of the signal b at the next clock cycle is set to the current value of the signal a. You'll find that in most cases, signals (variables) are updated in sequential clock cycles, as opposed to immediate updates like you would find in software design.

Specifically, the TPU is very efficient at performing matrix multiplications, which make up 80-90% of the compute operations in transformers (up to 95% in very large models) and 70-80% in CNNs. Each matrix multiplication represents the calculation for a single layer in an MLP, and in deep learning, we have many of these layers, making TPUs increasingly efficient for larger models.

When we started this project, all we knew was that the equation y = mx + b is the foundational building block for neural networks. However, we needed to fully UNDERSTAND the math behind neural networks to build other modules in our TPU. So before we started writing any code, each of us worked out the math of a simple 2 -> 2 -> 1 multi-layer perceptron (MLP).

![[Tiny-TPU - the why and how_image_2.svg]]

Architecture of our 2→2→1 multi-layer perceptron for solving the XOR problem

### Why XOR?

The reason we chose this specific network is because we were targeting inference and training for the XOR problem (the "hello world" of neural networks). The XOR problem is one of the simplest problems a neural network can solve. All other gates (AND, OR, etc) can predict the outputs from its inputs using just one linear line (one neuron) to separate which inputs correspond to a 0 and which ones correspond to a 1. But to classify all XOR, an MLP is needed, since it requires curved decision boundaries, which can't be achieved with ONLY linear equations. For a geometric and first-principles treatment, the free book [Understanding Deep Learning](https://udlbook.github.io/udlbook/) is excellent.

![[Tiny-TPU - the why and how_image_3.svg]]

OR and XOR decision boundaries

### Batching and dimensions

Now, say we want to do continuous inference (i.e. self driving car making multiple predictions a second). That would imply that we're sending multiple pieces of data at once. Since data is inherently multidimensional and has many features, we would have matrices with very large dimensions. However, the XOR problem simplifies the dimensions for us, as there are only two features (0 or 1) and 4 possible pieces of input data (four possible binary combinations of 0 and 1). This gives us a 4x2 matrix, where 4 is the number of rows (batch size) and 2 is the number of columns (feature size).

The XOR input matrix and target outputs:

X=[00011011]∈R4×2,y=[0110]∈R4×1 \mathbf{X} = \begin{bmatrix} 0 & 0 \\[0.3em] 0 & 1 \\[0.3em] 1 & 0 \\[0.3em] 1 & 1 \end{bmatrix} \in \mathbb{R}^{4 \times 2}, \quad \mathbf{y} = \begin{bmatrix} 0 \\[0.3em] 1 \\[0.3em] 1 \\[0.3em] 0 \end{bmatrix} \in \mathbb{R}^{4 \times 1}

Each row represents one of the four possible XOR inputs, and the output vector shows the expected XOR results

Another simplification we're making for our systolic array example here is that we'll use a 2x2 instead of the 256x256 array used in the TPUv1. However, the math is still faithful so nothing is actually dumbed down, rather scaled down instead.

The first step in the equation is multiplying m with x, which, in matrix form, would be XWT\mathbf{X}\mathbf{W}^T.

More formally:

Z=XWT+b\mathbf{Z} = \mathbf{X}\mathbf{W}^T + \mathbf{b}

where X∈Rn×d\mathbf{X} \in \mathbb{R}^{n \times d} is our input matrix, W∈Rm×d\mathbf{W} \in \mathbb{R}^{m \times d} is our weight matrix, and b∈R1×m\mathbf{b} \in \mathbb{R}^{1 \times m} is our bias vector

How can we perform matrix multiplication in hardware? Well, we can use a unit called the systolic array!

### Systolic array and PEs

The heart of a TPU is a unit called the systolic array.[[2]](https://www.tinytpu.com/#fn2) It consists of individual building blocks called Processing Elements (PE) which are connected together in a grid-like structure. Each PE performs a multiply-accumulate operation, meaning it multiplies an incoming input X with a stationary weight W[[3]](https://www.tinytpu.com/#fn3) and adds it to an incoming accumulated sum, all in the same clock cycle.

![[Tiny-TPU - the why and how_image_4.svg]]

Processing Element (PE) architecture showing multiply-accumulate operation (without load weight and start flags)

```
always_ff @(posedge clk or posedge rst) begin
        if (rst) begin
            input_out <= 0;
            psum_out <= 0;
            weight_reg <= 0;
        end else if (load_weight) begin
            weight_reg <= weight;
        end else if (start) begin
            input_out <= input_in;
            // the main multiply-accumulate operation
            psum_out <= (input_in * weight_reg) + psum_in;
        end
    end
```

### Systolic matrix multiplication

When these PEs are connected together, they can be used to perform matrix multiplication systolically, meaning multiple elements of the output matrix can be calculated every clock cycle. The inputs enter the systolic array from the left and move to the neighbouring PE to the right, every clock cycle. The accumulated sums start with the multiplication output from the first row of PEs, move downwards, and get added to the products of each successive PE, until they up at the last row of PEs where they become an element of the output matrix.

![[Tiny-TPU - the why and how_image_5.svg]]

Systolic array architecture showing how PEs are connected to perform matrix multiplication

Because of this single unit (and the fact that matrix multiplications dominate the computations performed in models), TPUs can very easily inference and train any model.

### Worked example

Now let's walk through the example of our XOR problem:

Our systolic array takes two inputs: the input matrix and the weight matrix. For our XOR network, we initialize with the following weights and biases:

Layer 1 parameters:

W1=[−0.2985−0.5792−0.0913−0.4234]∈R2×2,b1=[−0.4939−0.1890]∈R1×2\mathbf{W}_1 = \begin{bmatrix} \phantom{-}0.2985 & -0.5792 \\[0.3em] \phantom{-}0.0913 & \phantom{-}0.4234 \end{bmatrix} \in \mathbb{R}^{2 \times 2}, \quad \mathbf{b}_1 = \begin{bmatrix} -0.4939 & \phantom{-}0.189\phantom{0} \end{bmatrix} \in \mathbb{R}^{1 \times 2}

Layer 2 parameters:

W2=[−0.5266−0.2958]∈R1×2,b2=[−0.6358]∈R1×1\mathbf{W}_2 = \begin{bmatrix} \phantom{-}0.5266 & \phantom{-}0.2958 \end{bmatrix} \in \mathbb{R}^{1 \times 2}, \quad \mathbf{b}_2 = \begin{bmatrix} \phantom{-}0.6358 \end{bmatrix} \in \mathbb{R}^{1 \times 1}

### Input and weight scheduling

To input our input batch within the systolic array, we need to:

- Rotate our X matrix by 90 degrees

![[Tiny-TPU - the why and how_image_6.svg]]

Matrix rotation by 90 degrees to prepare for systolic array input

- STAGGER the inputs (delay each row by 1 clock cycle)[[4]](https://www.tinytpu.com/#fn4)

![[Tiny-TPU - the why and how_image_7.svg]]

Input matrix staggering pattern for systolic array processing

To input our weight matrix: we need to:

- Stagger the weight matrix (similar to the inputs)

![[Tiny-TPU - the why and how_image_8.svg]]

Weight matrix staggering pattern for systolic array processing

- Transpose it!

![[Tiny-TPU - the why and how_image_9.svg]]

Weight matrix transposition for correct mathematical alignment

Note that the rotating and staggering don't have any mathematical significance — they are simply required to make the systolic array work. The transpoing too is just for mathematical bookkeeping – it's required to make the matrix math work because of how we set up our weight pointers within the neural network drawing.

### Staggering and FIFOs

To perform the staggering, we designed near-identical accumulators for the weights and inputs that would sit above and to the left of the systolic array, respectively.

Since the activations are fed into the systolic array one-by-one, we thought a first-in-first-out queue (FIFO) would be the optimal data storage option. There was a slight difference between a traditional FIFO and the accumulators we built, however. Our accumulators had 2 input ports — one for writing weights manually to the FIFO and one for writing the previous layer's outputs from the activation modules BACK into the input FIFOs (the previous layer's outputs are inputs for the current layer).

We also needed to load the weights in a similar fashion for every layer, so we replicated the logic for the weight FIFOs, without the second port.

### Systolic array matrix multiplication

clk 0

### Bias and activation

The next step in the equation is adding the bias. To do this in hardware, we need to create a bias module under each column of the systolic array. We can see that as the sums move out of the last row within the systolic array, we can immediately stream them into our bias modules to compute our pre-activations. **We will denote these values with the variable Z.**

Zbiased=Z+b\mathbf{Z}_{\text{biased}} = \mathbf{Z} + \mathbf{b}

The bias vector b\mathbf{b} is broadcast across all rows of the matrix — meaning it's added to each row of Z\mathbf{Z}

Now our equation is starting to look a lot like what we've learned in high school –but just in multidimensional form, where each column that streams out of the systolic array represents its own feature!

Next we have to apply the activation, for which we chose Leaky ReLU.[[5]](https://www.tinytpu.com/#fn5) This is also an element-wise operation, similar to the bias, meaning we need an activation module under every bias module (and by proxy under every column of the systolic array) and we can stream the outputs of our bias modules into the activation modules immediately. **We will denote these post-activation values with H**.

The Leaky ReLU function applies element-wise:

LeakyReLUβ(z)={zif z>0β⋅zif z≤0\text{LeakyReLU}_\beta(z) = \begin{cases} z & \text{if } z > 0 \\[0.3em] \beta \cdot z & \text{if } z \leq 0 \end{cases}

where β=0.5\beta = 0.5 is our leak factor. For matrices, this applies to each element independently.

For our XOR example, let's see how Layer 1 processes the data. First, the systolic array computes XW1T\mathbf{X}\mathbf{W}_1^T:

Z1=[.0..0..0..1..1..0..1..1.][−0.2985−0.0913−0.5792−0.4234]=[−0.0000−0.0000−0.5792−0.4234−0.2985−0.0913−0.2807−0.5147]\mathbf{Z}_1 = \begin{bmatrix} \phantom{.}0\phantom{.} & \phantom{.}0\phantom{.} \\[0.2em] \phantom{.}0\phantom{.} & \phantom{.}1\phantom{.} \\[0.2em] \phantom{.}1\phantom{.} & \phantom{.}0\phantom{.} \\[0.2em] \phantom{.}1\phantom{.} & \phantom{.}1\phantom{.} \end{bmatrix} \begin{bmatrix} \phantom{-}0.2985 & \phantom{-}0.0913 \\[0.2em] -0.5792 & \phantom{-}0.4234 \end{bmatrix} = \begin{bmatrix} \phantom{-}0.0000 & \phantom{-}0.0000 \\[0.2em] -0.5792 & \phantom{-}0.4234 \\[0.2em] \phantom{-}0.2985 & \phantom{-}0.0913 \\[0.2em] -0.2807 & \phantom{-}0.5147 \end{bmatrix}

Then bias is added:

Z1=Z1+b1=[−0.4939−0.1890−1.0731−0.6124−0.1954−0.2803−0.7746−0.7037]\mathbf{Z}_1 = \mathbf{Z}_1 + \mathbf{b}_1 = \begin{bmatrix} -0.4939 & \phantom{-}0.1890 \\[0.2em] -1.0731 & \phantom{-}0.6124 \\[0.2em] -0.1954 & \phantom{-}0.2803 \\[0.2em] -0.7746 & \phantom{-}0.7037 \end{bmatrix}

Finally, LeakyReLU is applied element-wise:

H1=LeakyReLU0.5(Z1)=[−0.2470−0.1890−0.5366−0.6124−0.0977−0.2803−0.3873−0.7037]\mathbf{H}_1 = \text{LeakyReLU}_{0.5}(\mathbf{Z}_1) = \begin{bmatrix} -0.2470 & \phantom{-}0.1890 \\[0.2em] -0.5366 & \phantom{-}0.6124 \\[0.2em] -0.0977 & \phantom{-}0.2803 \\[0.2em] -0.3873 & \phantom{-}0.7037 \end{bmatrix}

Negative values are multiplied by 0.5, positive values pass through unchanged.

### Systolic array with bias and leaky ReLU

clk 0

### Pipelining

Now you might be asking – why don't we merge the bias term and the activation term in one clock cycle? Well, this is because of something called pipelining! Pipelining allows multiple operations to be executed simultaneously across different stages of the TPU —instead of waiting for one complete operation to finish before starting the next, you break the work into stages that can overlap. Think of it like an assembly line: while one worker (activation module) processes a part, the previous worker (bias module) is already working on the next part. This keeps all of the modules busy rather than having them sit idle waiting for the previous stage to complete. It also affects the speed at which we can run our TPU — if we have one module that tries to squeeze many operations in a single cycle, our clock speed will be bottlenecked by that module, as the other modules can only run as fast as that single module. Therefore, it's efficient and best practice to split up operations into individual clock cycles as much as possible.

![[Tiny-TPU - the why and how_image_10.svg]]

Pipelining stages showing how operations overlap across clock cycles

Another mechanism we used to run our chip as efficiently as possible, was a propagating "start" signal, which we called a travelling chip enable (denoted by the purple dot). Because everything in our design was staggered, we realized that we could very elegantly assert a start signal for a single clock cycle at the first accumulator and have it propagate to neighbouring modules exactly when they needed to be turned on.

This would extend into the systolic array and eventually the bias and activation modules, where neighbouring PEs and modules, moving from the top left to the bottom right, were turned on in consecutive clock cycles. This ensured that every module was only performing computations when it was required to and wasn't wasting power in the background.

### Double buffering

Now, we know that starting a new layer means we must compute the same XWT\mathbf{X}\mathbf{W}^T using a new weight matrix. How can we do this if our systolic array is weight-stationary? How can we change the weights?

While thinking about this problem, we came across the idea of double buffering, which originates from video games. The reason why double buffering exists is to prevent something called screen tearing on your monitor. Ultimately, pixels take time to load and we'd like to "hide away" that time somehow. And if you paid attention, this is the exact same problem we're currently facing with the systolic array. Fortunately, video game designers have already come up with a solution for this problem. By adding a second "shadow" buffer, which holds the weights of the next layer while the current layer is being computed on, we can load in new weights during computation, cutting the total clock cycle count in half.

To make this work, we also needed to add some signals to move the data. First, we needed a signal to indicate when to switch the weights in the shadow buffer and the active buffer. We called this signal the "switch" signal (denoted by the blue dot) and it copied the values in the shadow buffer to the active buffer. It propagated from the top left of the systolic array to the bottom right (the same path as the travelling chip enable, but only within the systolic array). We then needed one more signal to indicate when we wanted to move the weights down by one row and we called this the "accept" flag (denoted by the green dot) because each row is ACCEPTING a new set of weights. This would move the new weights into the top row of the systolic array, as well as each row of weights down into the next row of the systolic array. These two control flags worked in tandem to make our double buffering mechanism work.

### Double buffering in the systolic array

If you haven't already noticed, this allows the systolic array to do something powerful…continuous inference!!! We can continuously stream in new weights and inputs and compute forward pass for as many layers as we want. This touches into a core design philosophy of the systolic array: we want to maximize PE usage. **We always want to keep the systolic array fed!**

For Layer 2, the outputs from Layer 1 (H1\mathbf{H}_1) now become our inputs:

z2=H1W2T=[−0.2470−0.1890−0.5366−0.6124−0.0977−0.2803−0.3873−0.7037][−0.5266−0.2958]=[−0.0741−0.1014−0.0315−0.0042]\mathbf{z}_2 = \mathbf{H}_1\mathbf{W}_2^T = \begin{bmatrix} -0.2470 & \phantom{-}0.1890 \\[0.2em] -0.5366 & \phantom{-}0.6124 \\[0.2em] -0.0977 & \phantom{-}0.2803 \\[0.2em] -0.3873 & \phantom{-}0.7037 \end{bmatrix} \begin{bmatrix} \phantom{-}0.5266 \\[0.2em] \phantom{-}0.2958 \end{bmatrix} = \begin{bmatrix} -0.0741 \\[0.2em] -0.1014 \\[0.2em] \phantom{-}0.0315 \\[0.2em] \phantom{-}0.0042 \end{bmatrix}

Adding bias and applying activation:

z2=z2+b2=[−0.5617−0.5344−0.6673−0.6400]\mathbf{z}_2 = \mathbf{z}_2 + \mathbf{b}_2 = \begin{bmatrix} \phantom{-}0.5617 \\[0.2em] \phantom{-}0.5344 \\[0.2em] \phantom{-}0.6673 \\[0.2em] \phantom{-}0.6400 \end{bmatrix}

y^=h2=LeakyReLU0.5(z2)=[−0.5617−0.5344−0.6673−0.6400]\hat{\mathbf{y}} = \mathbf{h}_2 = \text{LeakyReLU}_{0.5}(\mathbf{z}_2) = \begin{bmatrix} \phantom{-}0.5617 \\[0.2em] \phantom{-}0.5344 \\[0.2em] \phantom{-}0.6673 \\[0.2em] \phantom{-}0.6400 \end{bmatrix}

All values are positive, so they pass through unchanged. These are our final predictions for the XOR problem!

### Forward pass walkthrough (with double buffering)

clk 0

### Control unit and ISA

Our final step for inference was making a control unit to use a custom instruction set (ISA) to assert all of our control flags and load data through a data bus. Including the data bus, our ISA was 24 bits long and it made our testbench more elegant as we could pass a single string of bits every clock cycle, rather than individually setting multiple flags.

We then put everything together and got inference completely working! This was a big milestone for us and we were very proud about what we had accomplished.

## Backpropagation and training

Ok we've solved inference — but what about training? Well here's the beauty: We can use the same architecture we use for inference for training! Why? Because training is just matrix multiplications with a few extra steps.

Here's where things get really exciting. Let's say we just ran inference on the XOR problem and got a prediction that looks something like [0.8, 0.3, 0.1, 0.9] when we actually wanted [1, 0, 0, 1]. Our model is performing poorly! We need to make it better. This is where training comes in. We're going to use something called a loss function to tell our model exactly how poorly it's doing. For simplicity, we chose Mean Squared Error (MSE) — think of it like measuring the "distance" between what we predicted and what we actually wanted, just like how you might measure how far off target your basketball shot was. **Let's denote the loss with L.**

L=1N∑i=1N(yi−y^i)2\mathcal{L} = \frac{1}{N}\sum_{i=1}^{N}(y_i - \hat{y}_i)^2

where yiy_i is the target output, y^i\hat{y}_i is our prediction, and NN is the number of samples

For our XOR example, with predictions y^=[0.5617,0.5344,0.6673,0.6400]T\hat{\mathbf{y}} = [0.5617, 0.5344, 0.6673, 0.6400]^T and targets y=[0,1,1,0]T\mathbf{y} = [0, 1, 1, 0]^T:

L=14[(0−0.5617)2+(1−0.5344)2+(1−0.6673)2+(0−0.6400)2]\mathcal{L} = \frac{1}{4}[(0 - 0.5617)^2 + (1 - 0.5344)^2 + (1 - 0.6673)^2 + (0 - 0.6400)^2]

L=14[0.3155+0.2168+0.1107+0.4096]=0.2631\mathcal{L} = \frac{1}{4}[0.3155 + 0.2168 + 0.1107 + 0.4096] = 0.2631

This loss value tells us how far off our predictions are from the true XOR outputs.

So right after we finish computing our final layer's activations (let's call them H2\mathbf{H}_2), we immediately stream them into a loss module to calculate just how bad our predictions are. These loss modules sit right below our activation modules, and we only use them when we've reached our final layer. But here's the key insight: you don't actually need to calculate the loss value itself to train. You just need its derivative. Why? Because that derivative tells us which direction to adjust our weights to make the loss smaller. It's like having a compass that points toward "better performance."

### The magic of the chain rule

This is where calculus enters the picture. To make our model better, we need to figure out how changing each weight affects our loss. The chain rule lets us break this massive calculation into smaller, manageable pieces.

The chain rule for gradients:

∂L∂W=∂L∂Z⋅∂Z∂W\frac{\partial \mathcal{L}}{\partial \mathbf{W}} = \frac{\partial \mathcal{L}}{\partial \mathbf{Z}} \cdot \frac{\partial \mathbf{Z}}{\partial \mathbf{W}}

This allows us to compute gradients layer by layer, propagating them backwards through the network

![[Tiny-TPU - the why and how_image_11.svg]]

Let's naively trace through what happens step by step.

1. Calculate ∂L∂H2\frac{\partial \mathcal{L}}{\partial \mathbf{H}_2} - how much the loss changes with respect to our final activations.
  
3. Compute ∂H2∂Z2\frac{\partial \mathbf{H}_2}{\partial \mathbf{Z}_2} by taking the derivative of the activation (leaky ReLU in our case).
  
5. Compute ∂Z2∂W2\frac{\partial \mathbf{Z}_2}{\partial \mathbf{W}_2}, ∂Z2∂H2\frac{\partial \mathbf{Z}_2}{\partial \mathbf{H}_2}
  
7. Compute ∂Z2∂b2\frac{\partial \mathbf{Z}_2}{\partial \mathbf{b}_2}
  
9. Rinse and repeat for the n-1 layer.

Propagating gradients to the hidden layer:

∂L∂H1=∂L∂z2W2=[−0.28080−0.23280−0.16640−0.32000][−0.52660−0.29580]=[−0.14790−0.08310−0.12260−0.06890−0.08760−0.04920−0.16850−0.09470]\frac{\partial \mathcal{L}}{\partial \mathbf{H}_1} = \frac{\partial \mathcal{L}}{\partial \mathbf{z}_2} \mathbf{W}_2 = \begin{bmatrix} \phantom{-}0.2808\phantom{0} \\[0.5em] -0.2328\phantom{0} \\[0.5em] -0.1664\phantom{0} \\[0.5em] \phantom{-}0.3200\phantom{0} \end{bmatrix} \begin{bmatrix} \phantom{-}0.5266\phantom{0} & \phantom{-}0.2958\phantom{0} \end{bmatrix} = \begin{bmatrix} \phantom{-}0.1479\phantom{0} & \phantom{-}0.0831\phantom{0} \\[0.5em] -0.1226\phantom{0} & -0.0689\phantom{0} \\[0.5em] -0.0876\phantom{0} & -0.0492\phantom{0} \\[0.5em] \phantom{-}0.1685\phantom{0} & \phantom{-}0.0947\phantom{0} \end{bmatrix}

And through the first layer's activation:

∂L∂Z1=∂L∂H1⊙∂LeakyReLU0.5(Z1)∂Z1\frac{\partial \mathcal{L}}{\partial \mathbf{Z}_1} = \frac{\partial \mathcal{L}}{\partial \mathbf{H}_1} \odot \frac{\partial \text{LeakyReLU}_{0.5}(\mathbf{Z}_1)}{\partial \mathbf{Z}_1}

With mixed positive and negative values in Z1\mathbf{Z}_1, the gradient is:

∂L∂Z1=[−0.14790−0.08310−0.12260−0.06890−0.08760−0.04920−0.16850−0.09470]⊙[.0.5.0.1..0.5.0.1..0.5.0.1..0.5.0.1.]=[−0.07390−0.08310−0.06130−0.06890−0.04380−0.04920−0.08430−0.09470]\frac{\partial \mathcal{L}}{\partial \mathbf{Z}_1} = \begin{bmatrix} \phantom{-}0.1479\phantom{0} & \phantom{-}0.0831\phantom{0} \\[0.5em] -0.1226\phantom{0} & -0.0689\phantom{0} \\[0.5em] -0.0876\phantom{0} & -0.0492\phantom{0} \\[0.5em] \phantom{-}0.1685\phantom{0} & \phantom{-}0.0947\phantom{0} \end{bmatrix} \odot \begin{bmatrix} \phantom{.}0.5\phantom{.0} & \phantom{.}1\phantom{.} \\[0.5em] \phantom{.}0.5\phantom{.0} & \phantom{.}1\phantom{.} \\[0.5em] \phantom{.}0.5\phantom{.0} & \phantom{.}1\phantom{.} \\[0.5em] \phantom{.}0.5\phantom{.0} & \phantom{.}1\phantom{.} \end{bmatrix} = \begin{bmatrix} \phantom{-}0.0739\phantom{0} & \phantom{-}0.0831\phantom{0} \\[0.5em] -0.0613\phantom{0} & -0.0689\phantom{0} \\[0.5em] -0.0438\phantom{0} & -0.0492\phantom{0} \\[0.5em] \phantom{-}0.0843\phantom{0} & \phantom{-}0.0947\phantom{0} \end{bmatrix}

Once we have all of these individual derivatives, we can multiply them together to find any derivative with respect of the loss (i.e. ∂L∂H2⋅∂H2∂Z2⋅∂Z2∂W2\frac{\partial \mathcal{L}}{\partial \mathbf{H}_2} \cdot \frac{\partial \mathbf{H}_2}{\partial \mathbf{Z}_2} \cdot \frac{\partial \mathbf{Z}_2}{\partial \mathbf{W}_2} gives us ∂L∂W2\frac{\partial \mathcal{L}}{\partial \mathbf{W}_2}).

After that, we have to compute the activation derivative ∂H2∂Z2\frac{\partial \mathbf{H}_2}{\partial \mathbf{Z}_2}, for which the formula is ∂LeakyReLUβ(Z2)∂Z2={1if Z2>0βif Z2≤0\frac{\partial \text{LeakyReLU}_{\beta}(\mathbf{Z}_2)}{\partial \mathbf{Z}_2} = \begin{cases} 1 & \text{if } \mathbf{Z}_2 > 0 \\[0.3em] \beta & \text{if } \mathbf{Z}_2 \leq 0 \end{cases}. This is also an element-wise computation, meaning we can structure it exactly like the loss module (and bias and activation modules), but it will perform a different calculation. One important note about this module, however, is that it requires the activations we computed during forward pass.

Now you might be wondering — how do we actually compute derivatives in hardware? Let's look at Leaky ReLU as an example, since it's beautifully simple but demonstrates the key principles. Remember that Leaky ReLU applies different operations based on whether the input is positive or negative. The derivative follows the same pattern: it outputs 1 for positive inputs and a small constant (we used 0.01) for negative inputs.

The Leaky ReLU gradient:

∂LeakyReLUβ(z)∂z={1if z>0βif z≤0\frac{\partial \text{LeakyReLU}_\beta (z)}{\partial z} = \begin{cases} 1 & \text{if } z > 0 \\[0.3em] \beta & \text{if } z \leq 0 \end{cases}

```
always @(posedge clk) begin
    if (rst) begin
        output <= 0;
    end else begin
        output <= (input > 0) ? input : 0.01 * input;
    end
end
```

![[Tiny-TPU - the why and how_image_12.svg]]

Leaky ReLU derivative implementation in hardware showing the conditional logic

What's beautiful about this is that it's just a simple comparison – no complex arithmetic needed. The hardware can compute this derivative in a single clock cycle, keeping our pipeline flowing smoothly. This same principle applies to other activation functions: their derivatives often simplify to basic operations that hardware can execute very efficiently.

You'll notice a really cool pattern emerging: all these modules that sit underneath the systolic array process column vectors that stream out one by one. This gave us the idea to unify them into something we called a **vector processing unit (VPU)** – because that's exactly what they're doing, processing vectors element-wise![[6]](https://www.tinytpu.com/#fn6)

Not only is this more elegant to work with, it's also useful when we scale our TPU beyond a 2x2 systolic array, as we'll have N number of these modules (N being the size of the systolic array), each of which we would have to interface with individually. Unifying these modules under a parent module makes our design more scalable and elegant!

![[Tiny-TPU - the why and how_image_13.svg]]

Vector Processing Unit (VPU) architecture showing unified element-wise operations

Additionally, by incorporating control signals for each module, which we call the VPU pathway bits, we can selectively enable or skip specific operations. This makes the VPU flexible enough to support both inference and training. For instance, during the forward pass, we want to apply biases and activations but skip computing loss or activation derivatives. When transitioning to the backward pass, all modules are engaged, but within the backward chain we only need to compute the activation derivative. Due to pipelining, all values that flow through the VPU pass through each of the four modules, and any unused modules simply act as registers, forwarding their inputs to outputs without performing computation.

The next few derivatives are interesting because we can actually use matrix multiplication (and the systolic array!) to compute the derivatives with the help of these three identities:

1. If we have Z=XWT+b\mathbf{Z} = \mathbf{X}\mathbf{W}^T + \mathbf{b} and take its derivative with respect to the weights, we get:

    ∂Z∂W=X\frac{\partial \mathbf{Z}}{\partial \mathbf{W}} = \mathbf{X}

2. If we have Z=XWT+b\mathbf{Z} = \mathbf{X}\mathbf{W}^T + \mathbf{b} and take its derivative with respect to the inputs X\mathbf{X}, we get:

    ∂Z∂X=WT\frac{\partial \mathbf{Z}}{\partial \mathbf{X}} = \mathbf{W}^T

    (just the weight matrix transposed)

3. For the bias term, the derivative is simply 1.

    ∂Z∂b=1\frac{\partial \mathbf{Z}}{\partial \mathbf{b}} = 1

This means that we can multiply the previous ∂H∂Z\frac{\partial \mathbf{H}}{\partial \mathbf{Z}} with X\mathbf{X}, WT\mathbf{W}^T, and 1 to get ∂H∂W\frac{\partial \mathbf{H}}{\partial \mathbf{W}}, ∂H∂X\frac{\partial \mathbf{H}}{\partial \mathbf{X}}, and ∂H∂b\frac{\partial \mathbf{H}}{\partial \mathbf{b}}, respectively, and we can multiply all of these by ∂L∂H\frac{\partial \mathcal{L}}{\partial \mathbf{H}} to get the gradients of the loss with respect to all of our second layer parameters. And because all of the gradients are actually gradient matrices, we can use the systolic array!

Now something to note about the activation derivative ∂H2∂Z2\frac{\partial \mathbf{H}_2}{\partial \mathbf{Z}_2} and the weight derivative ∂Z∂W\frac{\partial \mathbf{Z}}{\partial \mathbf{W}} is that they both require the post-activations (H) we calculate during forward pass. This means we need to store the outputs of every layer in some form of memory to be able to perform training. Here's where we created a new scratchpad memory module[[7]](https://www.tinytpu.com/#fn7) which we called the unified buffer (UB).[[8]](https://www.tinytpu.com/#fn8) This lets us store our H values immediately after we compute them during forward pass.

We realized that we can also get rid of the input and weight accumulators, as well as manually loading the bias and leak factors into their respective modules, by using the UB to store them. This is also better practice, rather than loading in new data every clock cycle with the instruction set. Since we want to access two values (2 inputs or 2 weights for each row/col of the systolic array) at the same time, we added TWO read and write ports. We did this for each data primitive (inputs, weights, bias, leak factor, post activations) to minimize data contention since we have many different types of data.

To read values, we supply a starting address and the number of locations we want the UB to read and it will read 2 values every clock cycle. Writing is a similar mechanism, where we specify which values we want to write to each of the two input ports. The beauty in the read mechanism is that it runs in the background once we supply a starting address until the number of locations given are read, meaning we only need to provide an instruction for this every few clock cycles.

![[Tiny-TPU - the why and how_image_14.svg]]

Unified Buffer (UB) architecture showing dual-port read mechanism

![[Tiny-TPU - the why and how_image_15.svg]]

Unified Buffer timing waveform showing read operation

At the end of the day, not having these mechanisms wouldn't break the TPU — but they allow us to always keep the systolic array fed, which is a core design principle we couldn't compromise.

While we were working on this, we realized we could make one last small optimization for the activation derivative module — since we only use the H2\mathbf{H}_2 values once (for computing ∂H2∂Z2\frac{\partial \mathbf{H}_2}{\partial \mathbf{Z}_2}), we created a tiny cache within the VPU instead of storing them in the UB. The rest of the H\mathbf{H} values will be stored in the UB because they're needed to compute multiple derivatives.

![[Tiny-TPU - the why and how_image_16.svg]]

H-cache optimization for storing temporary activation values

This is what the new TPU architecture, modified to perform training, looks like:

![[Tiny-TPU - the why and how_image_17.svg]]

Complete TPU architecture showing all components for both inference and training

Now we can do backpropagation!

### The beautiful symmetry of forward and backward pass

Going back to the computational graph, we discovered something remarkable: the longest chain in backpropagation closely resembles forward pass! In forward pass, we multiply activation matrices with transposed weight matrices while in backward pass, we multiply gradient matrices with untransposed weight matrices. It's like looking in a mirror!

![[Tiny-TPU - the why and how_image_18.svg]]

Forward pass computation flow showing matrix operations

This insight led us to compute the long chain of the computational graph first (highlighted in yellow) – getting all our ∂L∂Zn\frac{\partial \mathcal{L}}{\partial \mathbf{Z}_n} gradients just like we computed activations in forward pass. We could cache these gradients and reuse them, following the same efficient pattern we'd already mastered.

### Backward pass through the second hidden layer (long chain)

clk 0

To then calculate the leaf nodes (weight gradients) we create a loop where we:

1. Fetch a bridge node ( ∂L∂Zn\frac{\partial \mathcal{L}}{\partial \mathbf{Z}_n}) from our unified buffer and transpose it
2. Fetch the corresponding Hn\mathbf{H}_n matrix, also from unified buffer
3. Stream these through our systolic array to compute the weight gradients

However, there is a problem which you may have noticed already. With a batch size larger than 2, our transposed ∂L∂Zn\frac{\partial \mathcal{L}}{\partial \mathbf{Z}_n} matrices don't fit into the systolic array! To solve this, we introduced tiling.

### How tiling works

Tiling allows us to split up our transposed pre-activation gradient matrices into manageable chunks to fit into our 2 by 2 systolic array. When our batch size exceeds the array capacity, we divide the computation into smaller tiles that can be processed sequentially. For example, to calculate the gradient matrix for our first layer of weights, our 4 by 2∂L∂Z1\frac{\partial \mathcal{L}}{\partial \mathbf{Z}_1} gradient matrix is split into two 2 by 2 tiles, with each tile transposed. The corresponding input matrix X\mathbf{X} is similarly partitioned into matching 2 by 2 tiles. Each tile pair then undergoes separate matrix multiplication in the systolic array, meaning we perform two distinct matrix multiplications to compute the complete gradient matrix for our first layer weights. The same procedure is repeated for the second layer of weights.

Computing layer 1 weight gradients for our XOR network without tiling:

∂L∂W1=(∂L∂Z1)TX\frac{\partial \mathcal{L}}{\partial \mathbf{W}_1} = \left(\frac{\partial \mathcal{L}}{\partial \mathbf{Z}_1}\right)^T \mathbf{X}

[−0.0405−0.02300−0.0454−0.02580]=[−0.0739−0.0613−0.0438−0.08430−0.0831−0.0689−0.0492−0.09470][00011011]\begin{bmatrix} \phantom{-}0.0405 & \phantom{-}0.0230\phantom{0} \\[0.5em] \phantom{-}0.0454 & \phantom{-}0.0258\phantom{0} \end{bmatrix} = \begin{bmatrix} \phantom{-}0.0739 & -0.0613 & -0.0438 & \phantom{-}0.0843\phantom{0} \\[0.5em] \phantom{-}0.0831 & -0.0689 & -0.0492 & \phantom{-}0.0947\phantom{0} \end{bmatrix} \begin{bmatrix} 0 & 0 \\[0.5em] 0 & 1 \\[0.5em] 1 & 0 \\[0.5em] 1 & 1 \end{bmatrix}

Computing layer 1 weight gradients for our XOR network with tiling:

[−0.07390−0.06130−0.08310−0.06890][0001]=[−0.0000−0.06130−0.0000−0.06890][−0.04380−0.08430−0.04920−0.09470][1011]=[−0.04050−0.08430−0.04540−0.09470]\begin{align*} \begin{bmatrix} \phantom{-}0.0739\phantom{0} & -0.0613\phantom{0} \\[0.5em] \phantom{-}0.0831\phantom{0} & -0.0689\phantom{0} \end{bmatrix} \begin{bmatrix} 0 & 0 \\[0.5em] 0 & 1 \end{bmatrix} &= \begin{bmatrix} \phantom{-}0\phantom{.0000} & -0.0613\phantom{0} \\[0.5em] \phantom{-}0\phantom{.0000} & -0.0689\phantom{0} \end{bmatrix} \\[1em] \begin{bmatrix} -0.0438\phantom{0} & \phantom{-}0.0843\phantom{0} \\[0.5em] -0.0492\phantom{0} & \phantom{-}0.0947\phantom{0} \end{bmatrix} \begin{bmatrix} 1 & 0 \\[0.5em] 1 & 1 \end{bmatrix} &= \begin{bmatrix} \phantom{-}0.0405\phantom{0} & \phantom{-}0.0843\phantom{0} \\[0.5em] \phantom{-}0.0454\phantom{0} & \phantom{-}0.0947\phantom{0} \end{bmatrix} \end{align*}

[−0.0000−0.06130−0.0000−0.06890]+[−0.04050−0.08430−0.04540−0.09470]=[−0.04050−0.02300−0.04540−0.02580]\begin{bmatrix} \phantom{-}0\phantom{.0000} & -0.0613\phantom{0} \\[0.5em] \phantom{-}0\phantom{.0000} & -0.0689\phantom{0} \end{bmatrix} + \begin{bmatrix} \phantom{-}0.0405\phantom{0} & \phantom{-}0.0843\phantom{0} \\[0.5em] \phantom{-}0.0454\phantom{0} & \phantom{-}0.0947\phantom{0} \end{bmatrix} = \begin{bmatrix} \phantom{-}0.0405\phantom{0} & \phantom{-}0.0230\phantom{0} \\[0.5em] \phantom{-}0.0454\phantom{0} & \phantom{-}0.0258\phantom{0} \end{bmatrix}

Similarly for layer 2 weight gradients without tiling:

∂L∂W2=(∂L∂z2)TH1\frac{\partial \mathcal{L}}{\partial \mathbf{W}_2} = \left(\frac{\partial \mathcal{L}}{\partial \mathbf{z}_2}\right)^T \mathbf{H}_1

[−0.05210−0.08910]=[−0.28080−0.23280−0.16640−0.32000][−0.24700−0.18900−0.53660−0.61240−0.09770−0.28030−0.38730−0.70370]\begin{bmatrix} -0.0521\phantom{0} & \phantom{-}0.0891\phantom{0} \end{bmatrix} = \begin{bmatrix} \phantom{-}0.2808\phantom{0} & -0.2328\phantom{0} & -0.1664\phantom{0} & \phantom{-}0.3200\phantom{0} \end{bmatrix} \begin{bmatrix} -0.2470\phantom{0} & \phantom{-}0.1890\phantom{0} \\[0.5em] -0.5366\phantom{0} & \phantom{-}0.6124\phantom{0} \\[0.5em] -0.0977\phantom{0} & \phantom{-}0.2803\phantom{0} \\[0.5em] -0.3873\phantom{0} & \phantom{-}0.7037\phantom{0} \end{bmatrix}

Similarly for layer 2 weight gradients with tiling:

[−0.28080−0.23280][−0.24700−0.18900−0.53660−0.61240]=[−0.05560−0.08950][−0.16640−0.32000][−0.09770−0.28030−0.38730−0.70370]=[−0.10770−0.17860]\begin{align*} \begin{bmatrix} \phantom{-}0.2808\phantom{0} & -0.2328\phantom{0} \end{bmatrix} \begin{bmatrix} -0.2470\phantom{0} & \phantom{-}0.1890\phantom{0} \\[0.5em] -0.5366\phantom{0} & \phantom{-}0.6124\phantom{0} \end{bmatrix} &= \begin{bmatrix} \phantom{-}0.0556\phantom{0} & -0.0895\phantom{0} \end{bmatrix} \\[1em] \begin{bmatrix} -0.1664\phantom{0} & \phantom{-}0.3200\phantom{0} \end{bmatrix} \begin{bmatrix} -0.0977\phantom{0} & \phantom{-}0.2803\phantom{0} \\[0.5em] -0.3873\phantom{0} & \phantom{-}0.7037\phantom{0} \end{bmatrix} &= \begin{bmatrix} -0.1077\phantom{0} & \phantom{-}0.1786\phantom{0} \end{bmatrix} \end{align*}

[−0.05560−0.08950]+[−0.10770−0.17860]=[−0.05210−0.08910]\begin{bmatrix} \phantom{-}0.0556\phantom{0} & -0.0895\phantom{0} \end{bmatrix} + \begin{bmatrix} -0.1077\phantom{0} & \phantom{-}0.1786\phantom{0} \end{bmatrix} = \begin{bmatrix} -0.0521\phantom{0} & \phantom{-}0.0891\phantom{0} \end{bmatrix}

### Gradient descent

As the tiled weight gradients stream out of the systolic array row by row, they flow directly into our gradient descent module. This module retrieves the current weights from memory and applies updates using the incoming gradients. Since weight gradients are inherently additive across batch samples, we can process them sequentially where each tile's contribution accumulates naturally into the final weight update, similar to how the number 2 can be split into 1 + 1.

### Gradient descent for the first layer of weights

clk 0

The gradient descent update rule:

θnew=θold−α∇θL\bm{\theta}_{\text{new}} = \bm{\theta}_{\text{old}} - \alpha \nabla_{\bm{\theta}} \mathcal{L}

where α\alpha is the learning rate and θ\bm{\theta} represents any parameter (weights or biases)

Applying gradient descent with learning rate α=0.75\alpha = 0.75:

W1new=[−0.2985−0.5792−0.0913−0.4234]−0.75⋅[−0.0405−0.02300−0.0454−0.02580]=[−0.2682−0.5964−0.0572−0.4041]W2new=[−0.52660−0.29580]−0.75⋅[−0.05210−0.08910]=[−0.56570−0.22900]\mathbf{W}_1^{\text{new}} = \begin{bmatrix} \phantom{-}0.2985 & -0.5792 \\[0.5em] \phantom{-}0.0913 & \phantom{-}0.4234 \end{bmatrix} - 0.75 \cdot \begin{bmatrix} \phantom{-}0.0405 & \phantom{-}0.0230\phantom{0} \\[0.5em] \phantom{-}0.0454 & \phantom{-}0.0258\phantom{0} \end{bmatrix} = \begin{bmatrix} \phantom{-}0.2682 & -0.5964 \\[0.5em] \phantom{-}0.0572 & \phantom{-}0.4041 \end{bmatrix} \\[2em] \mathbf{W}_2^{\text{new}} = \begin{bmatrix} \phantom{-}0.5266\phantom{0} & \phantom{-}0.2958\phantom{0} \end{bmatrix} - 0.75 \cdot \begin{bmatrix} -0.0521\phantom{0} & \phantom{-}0.0891\phantom{0} \end{bmatrix} = \begin{bmatrix} \phantom{-}0.5657\phantom{0} & \phantom{-}0.2290\phantom{0} \end{bmatrix}

You might be wondering: "We've used our matrix multiplication identities for the long chain and weight gradients — how do we calculate bias gradients?" Well, we've actually already done most of the work! Since we're processing batches of data, we can simply sum (the technical term is "reduce") the ∂L∂Zn\frac{\partial \mathcal{L}}{\partial \mathbf{Z}_n} gradients across the batch dimension. The beauty is that we can do this reduction right when we're computing the long chain by simply passing the pre-activation gradients through the gradient descent modules and flipping a control bit to pass the output of the gradient descent module as the next old bias value input on the next clock cycle.

### Gradient descent for the first layer of biases

clk 0

Bias gradients (sum over samples):

∂L∂b1=[−0.05310−0.05970],∂L∂b2=0.2017,\frac{\partial \mathcal{L}}{\partial \mathbf{b}_1} = \begin{bmatrix} \phantom{-}0.0531\phantom{0} \\[0.5em] \phantom{-}0.0597\phantom{0} \end{bmatrix}, \quad \frac{\partial \mathcal{L}}{\partial \mathbf{b}_2} = 0.2017,

Applying gradient descent with learning rate α=0.75\alpha = 0.75:

b1new=[−0.4939−0.18900]−0.75⋅[−0.05310−0.05970]=[−0.5337−0.14430]b2new=0.6358−0.75⋅0.2017=0.4846\mathbf{b}_1^{\text{new}} = \begin{bmatrix} -0.4939 \\[0.5em] \phantom{-}0.1890\phantom{0} \end{bmatrix} - 0.75 \cdot \begin{bmatrix} \phantom{-}0.0531\phantom{0} \\[0.5em] \phantom{-}0.0597\phantom{0} \end{bmatrix} = \begin{bmatrix} -0.5337 \\[0.5em] \phantom{-}0.1443\phantom{0} \end{bmatrix} \\[2em] \mathbf{b}_2^{\text{new}} = 0.6358 - 0.75 \cdot 0.2017 = 0.4846

With all these new changes and control flags, our instruction is significantly longer — 94 bits in fact! But we can confirm that every single one of these bits is needed and we ensured that we couldn't make the instruction set any smaller without compromising the speed and efficiency of the TPU.

![[Tiny-TPU - the why and how_image_19.svg]]

94-bit Instruction Set Architecture (ISA) layout showing control flags and data fields

### Putting it all together

By continuing this same process iteratively – forward pass, backward pass, weight updates – we can train our network until it performs exactly how we want. The same systolic array that powered our inference now powers our training, with just a few additional modules to handle the gradient computations.

What started as a simple idea about matrix multiplication has grown into a complete training system. Every component works together in harmony: data flows through pipelines, modules operate in parallel, and our systolic array stays fed with useful work.

![[Tiny-TPU - the why and how_image_20.png]]

Final waveform simulation in GTKWave showing the weight and bias updates in memory after one epoch!

[2] Fun fact: the name of the systolic array is actually inspired by the human heart — just as systolic blood pressure is created by coordinated heart contractions that push blood through the cardiovascular system in waves, a systolic array processes data through coordinated computational "beats" that push information through the processing elements in waves. [↩ back](https://www.tinytpu.com/#fn2-ref)

[3] This is a weight-stationary systolic array, which means the weights for each layer are stationary within their respective PEs and don't move around. However, there is a non-weight-stationary systolic array where the weights move along with the inputs, which has its own advantages and disadvantages. [↩ back](https://www.tinytpu.com/#fn3-ref)

[4] Many illustrations online that depict staggering are actually flat out wrong because they pad consecutive rows with zeros, insetad of delaying them by a clock cycle. While this still gets the correct output, it wastes memory because we would have to store additional zeros that we don't use. [↩ back](https://www.tinytpu.com/#fn4-ref)

[5] We chose Leaky ReLU over ReLU because we found that since we have a very small network, the model wasn't training properly when we used ReLU — it needed more non-linearity. [↩ back](https://www.tinytpu.com/#fn5-ref)

[7] A scratchpad memory is a large bank of registers (each of which can store individual values) that lets us access any register we want. A FIFO for example is NOT a scratchpad memory since you can only access the first element in the queue. [↩ back](https://www.tinytpu.com/#fn7-ref)