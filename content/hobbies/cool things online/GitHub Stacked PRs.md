---
link: https://github.github.com/gh-stack/
site: GitHub Stacked PRs
slurped: 2026-04-14T00:46
title: GitHub Stacked PRs
date created: 2026-04-14T00:46
date modified: 2026-04-14T00:46
---

Break large changes into small, reviewable pull requests that build on each other — with native GitHub support and the `gh stack` CLI.

[Quick Start](https://github.github.com/gh-stack/getting-started/quick-start/) [Overview](https://github.github.com/gh-stack/introduction/overview/)

Stacked PRs, Native in GitHub

Arrange pull requests in an ordered stack and merge them all in one click. Each PR represents one focused layer of your change, reviewed independently and landed together.

Simplified Stack Management

Navigate between PRs in your stack from the GitHub UI, check the status of every layer at a glance, and trigger a cascading rebase across the entire stack with one click.

Powerful CLI

The `gh stack` CLI makes it easy to create stacks, perform cascading rebases, push branches and create PRs, and navigate between layers — all from your terminal.

AI Agent Integration

Run `npx skills add github/gh-stack` to teach your AI coding agents how to work with stacks. Break up a large diff into a stack or develop with stacks from the start.

Large pull requests are hard to review, slow to merge, and prone to conflicts. Reviewers lose context, feedback quality drops, and the whole team slows down. Stacked PRs solve this by breaking big changes into a chain of small, focused pull requests that build on each other — each one independently reviewable.

A **stack** is a series of pull requests in the same repository where each PR targets the branch of the PR below it, forming an ordered chain that ultimately lands on your main branch.

![A stack of pull requests: main at the bottom, with auth-layer (PR #1), api-endpoints (PR #2), and frontend (PR #3) stacked on top](https://github.github.com/gh-stack/_astro/stack-diagram.sUflwxUA_yKVNY.svg)

GitHub understands stacks end-to-end: the pull request UI shows a **stack map** so reviewers can navigate between layers, branch protection rules are enforced against the **final target branch** (not just the direct base), and CI runs for every PR in the stack as if they were targeting the final branch.

![The stack navigator in a pull request header](https://github.github.com/gh-stack/_astro/stack-navigator.DbHWHwGH_Z14GiHR.webp)

The `gh stack` CLI handles the local workflow: creating branches, managing rebases, pushing to GitHub, and creating PRs with the correct base branches. On GitHub, the PR UI gives reviewers the context they need — a stack map for navigation, focused diffs for each layer, and proper rules enforcement.

When you’re ready to merge, you can merge all or a part of the stack. Each PR can be merged directly or through the merge queue. After a merge, the remaining PRs in the stack are automatically rebased so the lowest unmerged PR targets the base branch.

```
# Install the CLI extensiongh extension install github/gh-stack# Alias `gh stack` as `gs` for easier use (optional)gh stack alias# Start a stack (creates and checks out the first branch)gs init auth-layer# ... make commits ...# Create new layers in the stack (creates and checks out each new branch)gs add api-routes# ... make commits ...gs add frontend# ... make commits ...# Push all branchesgs push# Open a stack of PRsgs submit
```

Ready to dive in? Start with the [Quick Start guide](https://github.github.com/gh-stack/getting-started/quick-start/) or read the [full overview](https://github.github.com/gh-stack/introduction/overview/).