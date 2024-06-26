---
date created: 2024-06-06T22:54
date modified: 2024-06-25T23:11
---
## Sync content changes

`git pull`

`npx quartz sync`

Alternatively: (honestly preferred bc I like seeing a more descriptive message than "quartz sync: [date]")

```
git add . (or some regex); git commit -m "message"; git push
```

If added too many and want to remove from the commit but still preserve local changes:

```
git reset --mixed HEAD content* (or some other regex)
```

Alternative #2: 

To add anything non-`content`: 

```
git add .
git reset -- content
```

To add only `content`:

```
git add content
```
## Merge changes from upstream

h/t [git - How can I merge changes from an upstream branch to my fork's branch - Stack Overflow](https://stackoverflow.com/questions/52981111/how-can-i-merge-changes-from-an-upstream-branch-to-my-forks-branch)

A good practice is to have this structure, which looks like you do, but is good to explain for clarification purposes:

```
origin  https://github.com/your-username/forked-repository.git (fetch)
origin  https://github.com/your-username/forked-repository.git (push)
upstream    https://github.com/original-owner-username/original-repository.git (fetch)
upstream    https://github.com/original-owner-username/original-repository.git (push)
```

So `origin` is your fork and `upstream` the original repository. Then use

```
git fetch upstream
```

And you will get this output

```
From https://github.com/original-owner-username/original-repository
 * [new branch]      master     -> upstream/master
```

where you have now a branch called `upstream/master` which tracks the original repo.

Then checkout to your local fork branch and merge

```
git checkout master
git merge upstream/master
```

> [!warning] To change
> Instead of using `master` as the branch it should be `v4` for Quartz. 

## Preview locally

`npx quartz build --serve`

Doesn't hotload so need to restart every time I change stuff. 