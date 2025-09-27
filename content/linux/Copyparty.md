---
date created: 2025-08-30T09:50
date modified: 2025-08-30T09:52
---
```
[/]            # create a volume at "/" (the webroot), which will
  /w           # share /w (the docker data volume)
  accs:
    g: *      # everyone gets "get" access, but
    rwmda: me  # the user "me" gets read-write-move-delete-admin
```

The above is what I put in the config file. 

[copyparty/docs/examples/docker/basic-docker-compose at hovudstraum](https://github.com/9001/copyparty/tree/hovudstraum/docs/examples/docker/basic-docker-compose)

The "g" allows the anonymous viewer to only "get", which means when browsing the base domain, you can't see the other files. But if I log in then I can see everything. And I can still embed the content in other files. 

Template for embedding the content: 

![observatory](https://files.fanteastick.org/pics/maui/ES6A9220.jpg)