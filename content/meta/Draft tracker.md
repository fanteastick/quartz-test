---
tags:
  - tracker
  - graph-exclude
date created: 2024-09-04T23:33
date modified: 2024-09-04T23:38
draft: "true"
---

The query

```dataview
TABLE file.folder as "Folder", dateformat(date-created, "yyyy-MM-dd") as "Date Created"
WHERE typeof(draft) = "string" AND file.name != this.file.name
SORT date-created DESC
```
