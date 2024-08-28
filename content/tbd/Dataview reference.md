---
date created: 2024-06-10T09:37
date modified: 2024-08-27T00:39
---

Official documentation: [Dataview](https://blacksmithgu.github.io/obsidian-dataview/) by blacksmithgu

## My own notes

### Calling a custom frontmatter property: 

Just do the kebab-case version of the name. e.g. "date modified" becomes `date-modified`. 

Excluding a tag: do a `FROM -#tag`

The FROM modifier only works with one `AND`. Can't do `FROM x AND x AND x`. 

### Date format

Dataview uses [Luxon tokens](https://moment.github.io/luxon/#/formatting?id=table-of-tokens) for formatting. 

Use this by doing something like `dateformat(date-modified, MMM d, yyyy) as Modified`

## File properties

Source: [Dataview in Obsidian: A Beginner's Guide - Obsidian Rocks](https://obsidian.rocks/dataview-in-obsidian-a-beginners-guide/) 

Accessed 2024-06-10 (09:39am)

Not included in the table: if you want to reference a custom file property, you can use the name with spaces replaced with `-`. For example, do `LIST date-created` if the property is "date created".

| Field Name         | Data Type      | Description                                                                                                                                                                     |
| :----------------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `file.name`        | Text           | The file name as seen in Obsidians sidebar.                                                                                                                                     |
| `file.folder`      | Text           | The path of the folder this file belongs to.                                                                                                                                    |
| `file.path`        | Text           | The full file path, including the files name.                                                                                                                                   |
| `file.ext`         | Text           | The extension of the file type; generally `md`.                                                                                                                                 |
| `file.link`        | Link           | A link to the file.                                                                                                                                                             |
| `file.size`        | Number         | The size (in bytes) of the file.                                                                                                                                                |
| `file.ctime`       | Date with Time | The date that the file was created.                                                                                                                                             |
| `file.cday`        | Date           | The date that the file was created.                                                                                                                                             |
| `file.mtime`       | Date with Time | The date that the file was last modified.                                                                                                                                       |
| `file.mday`        | Date           | The date that the file was last modified.                                                                                                                                       |
| `file.tags`        | List           | A list of all unique tags in the note. Subtags are broken down by each level, so `#Tag/1/A` will be stored in the list as `[#Tag, #Tag/1, #Tag/1/A]`.                           |
| `file.etags`       | List           | A list of all explicit tags in the note; unlike `file.tags`, does not break subtags down, i.e. `[#Tag/1/A]`                                                                     |
| `file.inlinks`     | List           | A list of all incoming links to this file, meaning all files that contain a link to this file.                                                                                  |
| `file.outlinks`    | List           | A list of all outgoing links from this file, meaning all links the file contains.                                                                                               |
| `file.aliases`     | List           | A list of all aliases for the note as defined via the [YAML frontmatter](https://help.obsidian.md/How+to/Add+aliases+to+note).                                                  |
| `file.tasks`       | List           | A list of all tasks (I.e., `\|[ ] some task`) in this file.                                                                                                                     |
| `file.lists`       | List           | A list of all list elements in the file (including tasks); these elements are effectively tasks and can be rendered in task views.                                              |
| `file.frontmatter` | List           | Contains the raw values of all frontmatter in form of `key \|value` text values; mainly useful for checking raw frontmatter values or for dynamically listing frontmatter keys. |
| `file.day`         | Date           | Only available if the file has a date inside its file name (of form `yyyy-mm-dd` or `yyyymmdd`), or has a `Date` field/inline field.                                            |
| `file.starred`     | Boolean        | if this file has been starred via the Obsidian Core Plugin "Starred Files".                                                                                                     |

## Dataview Serializer

Official documentation: [Overview | Obsidian Dataview Serializer](https://developassion.gitbook.io/obsidian-dataview-serializer) 

> Currently, this plugin is only compatible with LIST and TABLE queries. CALENDAR and TASK queries are not supported.

![[Quartz Cheatsheet#Dataview Serializer syntax]]

Me, a Serializer fan 🤞🤞
