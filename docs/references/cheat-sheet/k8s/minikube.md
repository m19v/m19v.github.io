---
title: Minikube
---

```shell
# START/STOP
minikube start
minikube start --memory 8000 --cpus 4 --driver=virtualbox --no-vtx-check
minikube stop
minikube delete


# ADDONS
minikube addons list
minikube addons enable ingress
minikube addons disable ingress


# DASHBOARD
minikube dashboard
```
