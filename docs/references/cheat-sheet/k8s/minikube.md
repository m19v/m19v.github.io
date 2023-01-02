---
title: Minikube
---

```shell
# START/STOP
minikube start
minikube start --memory 8000 --cpus 4 --driver=virtualbox --no-vtx-check
minikube stop
minikube delete


# PROFILES
minikube start -p test-profile
minikube stop -p test-profile
minikube delete -p test-profile
minikube profile list


# PROXY
set HTTP_PROXY=http://<proxy hostname:port>
set HTTPS_PROXY=https://<proxy hostname:port>
set NO_PROXY=localhost,127.0.0.1,10.96.0.0/12,192.168.59.0/24,192.168.49.0/24,192.168.39.0/24
minikube start


# ADDONS
minikube addons list
minikube addons enable ingress
minikube addons disable ingress


# DASHBOARD
minikube dashboard
```
