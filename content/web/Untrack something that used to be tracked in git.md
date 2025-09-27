---
date created: 2025-02-02T22:45
date modified: 2025-02-02T22:46
tags:
  - git
---

If you used to have a file being tracked, and then later added it to gitignore, you can do this:

```bash
# Remove the file from Git's tracking using git rm --cached:
git rm --cached <file-name>
# For directories, add the -r flag:
git rm -r --cached <directory-name>
```