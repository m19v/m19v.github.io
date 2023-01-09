---
title: Systemd
---

## VIEWING systemd INFORMATION

```shell
systemctl list-dependencies                 # List a unit’s dependencies
systemctl list-sockets                      # List sockets and what activates
systemctl list-jobs                         # List active systemd jobs
systemctl list-unit-files                   # List unit files and their states
systemctl list-units                        # List if units are loaded/active
systemctl get-default                       # List default target
```