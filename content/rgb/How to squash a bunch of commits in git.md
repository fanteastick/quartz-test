---
date created: 2025-02-20T21:51
date modified: 2025-02-21T15:33
tags:
  - git
  - external
---

Thank you perplexity

To squash multiple commits on the main branch into a single commit, you can use Git's interactive rebase feature. Here's how to do it:

1. First, identify how many commits you want to squash. Let's say you want to squash the last 5 commits.
2. Run the following command:

```bash
git rebase -i HEAD~5
```

3. This will open an editor with a list of commits. Change the word "pick" to "squash" (or just "s") for all commits except the first one[4](https://www.hatica.io/blog/squashing-git-commits/)[7](https://www.datacamp.com/tutorial/git-squash-commits).
4. Save and close the editor. Another editor will open, allowing you to edit the commit message for the squashed commit[4](https://www.hatica.io/blog/squashing-git-commits/).
5. Edit the commit message as desired, then save and close the editor[4](https://www.hatica.io/blog/squashing-git-commits/).
6. If you've already pushed these commits to a remote repository, you'll need to force push the changes:

`git push --force origin main`

Be cautious when using force push, especially on shared branches, as it rewrites history[1](https://www.freecodecamp.org/news/git-squash-commits/)[7](https://www.datacamp.com/tutorial/git-squash-commits).

Remember, squashing commits on the main branch can be risky, especially if others are working on the same branch. It's generally better to avoid making experimental commits directly on the main branch. Instead, consider creating a separate branch for testing in the future[5](https://www.reddit.com/r/git/comments/s2ut6o/how_can_i_combine_multiple_pushed_commits_to_a/)[7](https://www.datacamp.com/tutorial/git-squash-commits).

%% 

### Citations:

1. [https://www.freecodecamp.org/news/git-squash-commits/](https://www.freecodecamp.org/news/git-squash-commits/)
2. [https://betterstack.com/community/questions/how-to-merge-multiple-commits-into-another-branch-as-single-squashed-commit/](https://betterstack.com/community/questions/how-to-merge-multiple-commits-into-another-branch-as-single-squashed-commit/)
3. [https://stackoverflow.com/questions/5189560/how-do-i-squash-my-last-n-commits-together/48866309](https://stackoverflow.com/questions/5189560/how-do-i-squash-my-last-n-commits-together/48866309)
4. [https://www.hatica.io/blog/squashing-git-commits/](https://www.hatica.io/blog/squashing-git-commits/)
5. [https://www.reddit.com/r/git/comments/s2ut6o/how_can_i_combine_multiple_pushed_commits_to_a/](https://www.reddit.com/r/git/comments/s2ut6o/how_can_i_combine_multiple_pushed_commits_to_a/)
6. [https://stackoverflow.com/questions/25356810/how-to-squash-all-commits-on-branch](https://stackoverflow.com/questions/25356810/how-to-squash-all-commits-on-branch)
7. [https://www.datacamp.com/tutorial/git-squash-commits](https://www.datacamp.com/tutorial/git-squash-commits)
8. [https://stackoverflow.com/questions/6934752/combining-multiple-commits-before-pushing-in-git](https://stackoverflow.com/questions/6934752/combining-multiple-commits-before-pushing-in-git)
9. [https://www.youtube.com/watch?v=IlFK3JGCDqU](https://www.youtube.com/watch?v=IlFK3JGCDqU)
 %%