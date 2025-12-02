---
link: https://blog.underfit.ai/nanogpt-record#
site: Underfit Labs
slurped: 2025-11-22T22:27
title: "A Thousand Ways to Write ZeRO-2: Setting a New Modded-NanoGPT Record"
date created: 2025-11-22T22:27
date modified: 2025-11-22T22:27
tags:
  - slurp
---

I'm excited to share that I've set a [new Modded-NanoGPT record](https://github.com/KellerJordan/modded-nanogpt/pull/149)! My PR reduced the overall training time by ~0.9s over the previous record by improving the communication-computation overlap of the distributed Adam optimizer, which brought down the duration of the Adam step and reduced GPU non-compute time.

In this post we'll go over some details of my implementation, and share some background on what led me to this point.

View Slides

## Rewriting ZeRO-2

I started learning about distributed model training strategies a few weeks ago. I wanted to implement ZeRO using asynchronous communications to see how much I could overlap communications and computations which led to me rewriting my ZeRO-2 implementation many, many times.

I had to dig through profiler traces and sift through memory snapshots to debug memory leaks until I achieved the concurrency overlap patterns that I wanted. I tried the PyTorch distributed communications futures API, the work object API, CUDA streams, CUDA events, additional process groups for concurrent communication streams, setting `CUDA_LAUNCH_BLOCKING=1` for debugging, along with various combinations of the above. I might've missed some things, but most of this I was doing for the very first time. I just tried to figure it out along the way.

> Not pictured are many, many more failed attempts and discarded implementations.

After I felt like I had implemented many of the different overlap patterns I could think of, I decided it might be a good idea to see how other projects implemented ZeRO-2. I first looked at Andrej Karpathy's [nanochat](https://github.com/karpathy/nanochat/blob/4a87a0d19f30799b6c700285822dcca850adf6a4/nanochat/adamw.py#L10) and I noticed that the overlap could be improved.

Next I decided to see if Modded-NanoGPT does anything cool that I could learn from. To my surprise, when I saw the code I knew that I could make the same improvement on it!

The distributed Adam implementation in nanochat is actually borrowed from Modded-NanoGPT! But I didn't realize this until just now while writing this post!

## Previous Implementation

### Code Review

We'll start by covering the relevant parts of the `DistAdam` class as it was prior to making my changes. Let's focus on a roughly the first 20 lines of the `step` function, but the full code is included further down below.

```
def step(self):
    rank = dist.get_rank()
    reduce_scatter_futures: list[torch.Future] = []
    all_gather_futures: list[torch.Future] = []
    grad_slices = []
    for group in self.param_groups:
        params: list[Tensor] = group["params"]
        for param in params:
            ...
            reduce_scatter_futures.append(
                dist.reduce_scatter_tensor(
                    grad_slice, grad, op=dist.ReduceOp.AVG, async_op=True
                ).get_future()
            )
            grad_slices.append(grad_slice)

    idx = 0
    for group in self.param_groups:
        ...
        params = group['params']
        for param in params:
            reduce_scatter_futures[idx].wait()
        ...
```

In the code there are two loops where we iterate through the parameters. In the first loop we enqueue a `reduce_scatter_tensor` operation for each parameter onto the CUDA stream. Immediately following this, there is a second loop which iterates through the parameters.

The first line of code in this second loop waits on the reduce-scatter future to complete before updating the parameter weights as we normally do in the optimizer step. Concurrently the next reduce-scatter operation begins. Remember that the GPU stream behaves like a queue, so the next reduce-scatter can't begin until the first one completes! Let me show you what this looks like in a profiler trace.

### Analysis

The arrows in the first image above are added to in the profiler trace to point out how the start of each "chunk" of computation in the compute stream (`stream 7`) aligns with the end of a reduce-scatter during the `DistAdam.step` in the communication stream (`stream 23`). Additionally there are empty gaps in between the computations representing time that our GPU is idle! In the details section we can see the overall step time is 1.528ms.

The other images show the timing of the reduce-scatter launch at the start of the `DistAdam` step, and that it does not overlap with the computations.

I've embedded a trace explorer so you can explore the full trace of the previous record below.

Show trace explorer

> The trace files are loaded from my server and might be slow to load. This blog is hosted from a kubernetes cluster I run in my home, hopefully it doesn't blow up 😅. You can get a live view of what is running in my cluster on the [home page](https://underfit.ai/)!
> 
> For a better viewing experience, minimize the sidebar by clicking the "hamburger" () icon for a better view and click the "expand all" () button on the left side a bit below.

I've also plotted some metrics using the [`HolisticTraceAnalysis`](https://github.com/facebookresearch/HolisticTraceAnalysis) library to compare the results.

Here's the full code for the `DistAdam` implementation.

Show full code

```
class DistAdam(torch.optim.Optimizer):
    def __init__(self, params, lr: float = 1e-3, betas: tuple[float, float] = (0.9, 0.999), eps: float = 1e-8, weight_decay: float = 0.01):
        self.world_size = dist.get_world_size() if dist.is_initialized() else 1
        defaults = dict(lr=lr, betas=betas, eps=eps, weight_decay=weight_decay)
        params = list(params)
        sizes = {p.shape for p in params}
        # create one buffer per unique parameter-size
        param_groups = []
        for size in sizes:
            group_params = [p for p in params if p.shape == size]
            param_groups.append(dict(params=group_params))
        super().__init__(param_groups, defaults)
        # init state
        for p in params:
            chunk_size = p.size(0) // self.world_size
            exp_avg = torch.zeros_like(p[:chunk_size], dtype=torch.bfloat16, device=p[0].device)
            exp_avg_sq = torch.zeros_like(exp_avg)
            self.state[p] = dict(step=0, exp_avg=exp_avg, exp_avg_sq=exp_avg_sq)
        # DistributedAdam implementation by @vagrawal

    @torch.compile
    @torch.no_grad()
    def step(self):
        rank = dist.get_rank()
        reduce_scatter_futures: list[torch.Future] = []
        all_gather_futures: list[torch.Future] = []
        grad_slices = []
        for group in self.param_groups:
            params: list[Tensor] = group["params"]
            for param in params:
                grad = param.grad
                rank_size = grad.shape[0] // self.world_size
                grad_slice = torch.empty_like(grad[:rank_size])
                reduce_scatter_futures.append(dist.reduce_scatter_tensor(grad_slice, grad, op=dist.ReduceOp.AVG, async_op=True).get_future())
                grad_slices.append(grad_slice)

        idx = 0
        for group in self.param_groups:
            beta1, beta2 = group['betas']
            eps = group['eps']
            wd = group['weight_decay']
            params = group['params']
            for param in params:
                reduce_scatter_futures[idx].wait()
                rank_size = param.shape[0] // self.world_size
                p_slice = param[rank * rank_size:(rank + 1) * rank_size]
                lr = group['lr'] * getattr(param, "lr_mul", 1.0)
                state = self.state[param]
                g_slice = grad_slices[idx]

                exp_avg = state["exp_avg"]
                exp_avg_sq = state["exp_avg_sq"]
                state["step"] += 1
                t = state["step"]
                # weight decay
                if wd != 0:
                    eff_weight_decay = lr * wd * getattr(param, "wd_mul", 1.0)
                    p_slice.mul_(1 - eff_weight_decay)
                # update running averages
                exp_avg.mul_(beta1).add_(g_slice, alpha=1 - beta1)
                exp_avg_sq.mul_(beta2).addcmul_(g_slice, g_slice, value=1 - beta2)
                # bias corrections
                bias1 = 1 - beta1 ** t
                bias2 = 1 - beta2 ** t
                # compute step
                denom = exp_avg_sq.sqrt().add_(eps)
                step_size = lr * (bias2 ** 0.5 / bias1)
                update = exp_avg.div(denom).mul_(step_size)
                p_slice.add_(other=update, alpha=-1.0)
                idx += 1
                all_gather_futures.append(dist.all_gather_into_tensor(param, p_slice, async_op=True).get_future())
        torch.futures.collect_all(all_gather_futures).wait()
```

## New Record

### Code Review

#### Backward Hooks

There are two important changes which lead to this improvement. The main change was to move the `reduce_scatter_tensor` call into a backward hook so that we can launch our async communication operations sooner.

First we register backward hooks in the `__init__` function to call `_sync_gradient`, and define the `_reduce_scatter_futures` dict to store references to the futures so we can wait on them later.

```
class DistAdam(torch.optim.Optimizer):
    def __init__(self, params, ...):
        ...
        self.should_sync = False

        self._reduce_scatter_hooks = []
        self._reduce_scatter_futures = {}
        self.register_backward_hooks()

    def register_backward_hooks(self):
        for group in self.param_groups:
            params: list[Tensor] = group["params"]
            for param in params:
                hook = param.register_post_accumulate_grad_hook(self._sync_gradient)
                self._reduce_scatter_hooks.append(hook)
```

Next we move the core of the "first loop" from the `step` function in the prior implementation which launches the `_reduce_scatter_tensor` operation into `_sync_gradient`. There's a check `self.should_sync` because in Modded-NanoGPT the Adam optimizer is stepped on every other batch, while the Muon optimizer is stepped for every batch.

```
def _sync_gradient(self, param):
    if not self.should_sync:
        return

    grad = param.grad
    rank_size = grad.shape[0] // self.world_size
    grad_slice = torch.empty_like(grad[:rank_size])
    self._reduce_scatter_futures[param] = (
        dist.reduce_scatter_tensor(
            grad_slice, grad, op=dist.ReduceOp.AVG, async_op=True
        ).get_future(),
        grad_slice
    )
```

Since backward hooks should execute for parameters as their gradients are computed, they are roughly executed in reverse order. The `step` function is changed so that it iterates through the parameters and parameter groups in reverse order.

#### Reverse Parameter Order

In the init function, the parameter groups are redefined so that parameters are grouped by the their tensor shape. During this regrouping we iterate through the parameters in forward order which means the first parameter's shape will be first in the dict (since python dict keys maintain insertion order), and later parameter shapes will appear later as we iterate through the dict.

```
class DistAdam(torch.optim.Optimizer):
    def __init__(self, params, ...):
        ...
        sizes = {p.shape for p in params}
        # create one buffer per unique parameter-size
        param_groups = []
        for size in sizes:
            group_params = [p for p in params if p.shape == size]
            param_groups.append(dict(params=group_params))
        ...
```

This regrouping is critical to the training performance. Skipping it made training faster but caused the final loss to exceed the 3.28 threshold required for Modded-NanoGPT.

So even though we've rearranged the groups, as long as we iterate in reverse order we'll wait on the reduce-scatter futures in roughly the same order as the backward pass and maintain performance.

```
def step(self):
    rank = dist.get_rank()
    all_gather_futures: list[torch.Future] = []

    for group in reversed(self.param_groups):
        beta1, beta2 = group['betas']
        eps = group['eps']
        wd = group['weight_decay']
        for param in reversed(group['params']):
            if param not in self._reduce_scatter_futures:
                continue

            fut, g_slice = self._reduce_scatter_futures[param]
            fut.wait()
```

### Results

In the first image you can see in the trace that the reduce-scatter now overlaps the computation and begins earlier. Although there are still some gaps in the compute stream, there are a smaller number of them and the "chunks" of computation are more contiguous.

If we look at the details section, we'll see that the step time is now down to 1.122ms which is roughly a 30% reduction!

The other images show the timing of the reduce-scatter launch at the start of the `DistAdam` step is now at the end of the backward pass, and now it does overlap with the computations.

I've embedded a trace explorer so you can check it out for yourself.

Show trace explorer

> The trace files are loaded from my server and might be slow to load. This blog is hosted from a kubernetes cluster I run in my home, hopefully it doesn't blow up 😅. You can get a live view of what is running in my cluster on the [home page](https://underfit.ai/)!
> 
> For a better viewing experience, minimize the sidebar by clicking the "hamburger" () icon for a better view and click the "expand all" () button on the left side a bit below.

In the metrics we can see there is better communication-computation overlap, a lower percentage of non-compute time in the "Temporal Breakdown", and a lower percentage of time spent on communication in the "Kernel Type Distribution" chart.

Interestingly the "Temporal Breakdown" chart shows an increase in idle time and a decrease in computation time percentages. My expectation was that the idle time would decrease.

The full updated code for the `DistAdam` implementation is contained below.

Show full code

```
class DistAdam(torch.optim.Optimizer):
    def __init__(self, params, lr: float = 1e-3, betas: tuple[float, float] = (0.9, 0.999), eps: float = 1e-8, weight_decay: float = 0.01):
        self.world_size = dist.get_world_size() if dist.is_initialized() else 1
        defaults = dict(lr=lr, betas=betas, eps=eps, weight_decay=weight_decay)
        params = list(params)
        sizes = {p.shape for p in params}
        # create one buffer per unique parameter-size
        param_groups = []
        for size in sizes:
            group_params = [p for p in params if p.shape == size]
            param_groups.append(dict(params=group_params))
        super().__init__(param_groups, defaults)
        # init state
        for p in params:
            chunk_size = p.size(0) // self.world_size
            exp_avg = torch.zeros_like(p[:chunk_size], dtype=torch.bfloat16, device=p[0].device)
            exp_avg_sq = torch.zeros_like(exp_avg)
            self.state[p] = dict(step=0, exp_avg=exp_avg, exp_avg_sq=exp_avg_sq)
        # DistributedAdam implementation by @vagrawal, @akash5474

        self.should_sync = False

        self._reduce_scatter_hooks = []
        self._reduce_scatter_futures = {}
        self.register_backward_hooks()

    def register_backward_hooks(self):
        for group in self.param_groups:
            params: list[Tensor] = group["params"]
            for param in params:
                hook = param.register_post_accumulate_grad_hook(self._sync_gradient)
                self._reduce_scatter_hooks.append(hook)

    @torch.compile
    @torch.no_grad()
    def _sync_gradient(self, param):
        if not self.should_sync:
            return

        grad = param.grad
        rank_size = grad.shape[0] // self.world_size
        grad_slice = torch.empty_like(grad[:rank_size])
        self._reduce_scatter_futures[param] = (
            dist.reduce_scatter_tensor(grad_slice, grad, op=dist.ReduceOp.AVG, async_op=True).get_future(),
            grad_slice
        )

    @torch.compile
    @torch.no_grad()
    def step(self):
        rank = dist.get_rank()
        all_gather_futures: list[torch.Future] = []

        for group in reversed(self.param_groups):
            beta1, beta2 = group['betas']
            eps = group['eps']
            wd = group['weight_decay']
            for param in reversed(group['params']):
                if param not in self._reduce_scatter_futures:
                    continue

                fut, g_slice = self._reduce_scatter_futures[param]
                fut.wait()

                rank_size = param.shape[0] // self.world_size
                p_slice = param[rank * rank_size:(rank + 1) * rank_size]
                lr = group['lr'] * getattr(param, "lr_mul", 1.0)
                state = self.state[param]

                exp_avg = state["exp_avg"]
                exp_avg_sq = state["exp_avg_sq"]
                state["step"] += 1
                t = state["step"]
                # weight decay
                if wd != 0:
                    eff_weight_decay = lr * wd * getattr(param, "wd_mul", 1.0)
                    p_slice.mul_(1 - eff_weight_decay)
                # update running averages
                exp_avg.mul_(beta1).add_(g_slice, alpha=1 - beta1)
                exp_avg_sq.mul_(beta2).addcmul_(g_slice, g_slice, value=1 - beta2)
                # bias corrections
                bias1 = 1 - beta1 ** t
                bias2 = 1 - beta2 ** t
                # compute step
                denom = exp_avg_sq.sqrt().add_(eps)
                step_size = lr * (bias2 ** 0.5 / bias1)
                update = exp_avg.div(denom).mul_(step_size)
                p_slice.add_(other=update, alpha=-1.0)

                all_gather_futures.append(dist.all_gather_into_tensor(param, p_slice, async_op=True).get_future())

        self._reduce_scatter_futures.clear()
        torch.futures.collect_all(all_gather_futures).wait()
```

## Conclusion

Even after I'd implemented these changes, I still tried a few different things that didn't work out. While I was experimenting with ZeRO-2 implementations I was able to interleave the launch of the CUDA communications so that they overlapped with computation throughout the backward pass.

This is not what happened with Modded-NanoGPT because it uses `torch.compile` and the backward pass gets compiled and fused into a larger execution. I'm a total beginner when it comes to `torch.compile` but I tried enabling the [compiled autograd](https://docs.pytorch.org/tutorials/intermediate/compiled_autograd_tutorial.html) feature. I had to work through a few errors but eventually I got compiled autograd working, unfortunately this only ended up making things slower and didn't interleave the backward hooks as I had hoped.

This might still be possible, and there are more things I would like to try, but by this point I've spent a healthy amount of time and money on this project. There are other things I want to learn and experiment with and eventually I had to break the cycle of "just one more YOLO run".

[

![](https://blog.underfit.ai/static/nanogpt-record/images/readme-record-entry.png)

](https://blog.underfit.ai/static/nanogpt-record/images/readme-record-entry.png)

Another really cool thing is that I got an opportunity to write a [profiling 101 post](https://blog.underfit.ai/profiling-101-nanogpt) that is featured with my record in the Modded-NanoGPT project's README.

I ended up spending quite a bit of money on GPUs, fortunately I had some GPU credits to cover the [Lambda](https://lambda.ai/) costs. Thank you Lambda for providing credits for Zach's course!

As for [Prime Intellect](https://primeintellect.ai/), I had to pay out of pocket! Prime Intellect is really great to use too, the only thing criminal about Prime Intellect is how low the prices are on the [8xH100 spot instances](https://blog.underfit.ai/app.primeintellect.ai/dashboard/create-cluster?gpu_type=H100_80GB&image=ubuntu_22_cuda_12&location=Cheapest&pricing_type=spot&quantity=8&security=Cheapest)! I wish the prime compute spot price instances were available more often, I found that they were the easiest to get dependencies for Modded-NanoGPT setup and the price is too good to resist! If only I had some Prime Intellect GPU credits!

Thanks to [@TheZachMueller](https://x.com/TheZachMueller) for the awesome [course](https://maven.com/walk-with-code/scratch-to-scale) that introduced me to distributed model training and for securing so many compute credits for us!