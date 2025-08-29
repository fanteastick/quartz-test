---
tags:
  - git
date created: 2025-08-28T22:14
date modified: 2025-08-28T22:15
---

To set up a **local mirror** of GitHub repositories on a self-hosted git service, a process called "mirroring" is used. Mirroring duplicates all branches, tags, and history, and lets the local copy sync updates from the original GitHub source, ensuring preservation if the original disappears.[1][2][3]

## Basic Manual Mirror Setup

1. **Clone as Mirror:**  
Run this in a terminal (replace the repo URL as needed):  
```
git clone --mirror https://github.com/EXAMPLE-USER/REPOSITORY.git
```

This produces a bare repository with all refs and history.[1]

2. **Set Up Local Hosting or Self-Hosted Git:**  
If using a service like Gitea, GitLab, or similar, create a new (bare) repository there for the mirror.[4][5][3]

3. **Push Mirror:**  
Navigate into the cloned directory and push the repository to the new self-hosted service:
```
cd REPOSITORY.git
git push --mirror https://your-git-server/NEW-REPOSITORY.git
```

This command syncs all refs, branches, and tags.[1]

4. **Schedule Regular Syncs (Optional but recommended):**  
To keep your mirror updated, periodically run:
```
git fetch -p origin
git push --mirror
```

Automate this with cron jobs or scripts.[2][1]

## Special Self-Hosting Solutions

- **Gitea & GitLab:** Both have built-in repository mirroring/pull features, allowing automated background syncs from GitHub to your hosted service.[5][4]
- **Standalone Tools:** There are lightweight tools, such as `git-mirror`, that automate downloading and serving mirrored repositories on your local machine. Configuration typically just needs the original clone URL and a folder or port to serve from.[2]

## Serving Your Mirrors

- You can serve mirrored repositories with a simple HTTP server (like lighttpd) by storing mirrored `.git` folders in a directory, making them clonable via HTTP.[3]
- Larger platforms (Gitea, GitLab) provide a full-featured web interface, user management, and automation.[4][5]

## Summary Table

| Step                   | Description                                                             | Reference     |
|------------------------|-------------------------------------------------------------------------|---------------|
| Clone as mirror        | `git clone --mirror ...` fetches all of a repo                          | [1]       |
| Create local repo      | Set up a bare repo in self-hosted platform (Gitea, GitLab, etc.)        | [4][5]|
| Mirror push            | `git push --mirror ...` to self-hosted service                          | [1]       |
| Automate syncing       | `git fetch -p origin` then `git push --mirror` by cron or script        | [1][2]|
| Serve/host             | Use Gitea, GitLab, HTTP server, or standalone tool (`git-mirror`)       | [2][3]|

This approach keeps a complete, up-to-date local backup of any GitHub repository, independently accessible in case the original goes offline.[3][4][2][1]

[1](https://docs.github.com/en/repositories/creating-and-managing-repositories/duplicating-a-repository)

[2](https://github.com/beefsack/git-mirror)

[3](https://docs.buildstream.build/2.0/examples/git-mirror.html)

[4](https://stackoverflow.com/questions/76505437/mirroring-a-gitlab-or-github-repo-to-a-selfhosted-gitea-server)

[5](https://docs.gitlab.com/user/project/repository/mirror/)

[6](https://www.reddit.com/r/selfhosted/comments/115mxbp/gire_a_selfhosted_git_mirroringbackup_service/)

[7](https://www.reddit.com/r/git/comments/1bo3lel/how_is_it_possible_to_push_an_old_local_git/)

[8](https://news.ycombinator.com/item?id=40470543)

[9](https://stackoverflow.com/questions/11502542/git-local-mirror)

[10](https://stackoverflow.com/questions/17371150/moving-git-repository-content-to-another-repository-preserving-history)