---
title: Kubernetes
---

# 1. Table of Content
- [1. Table of Content](#1-table-of-content)
- [2. Intro](#2-intro)
- [3. Certification](#3-certification)
- [4. CKA Lecture and Lab Notes](#4-cka-lecture-and-lab-notes)
- [5. Core Concepts](#5-core-concepts)
  - [5.1. Kubernetes Architecture](#51-kubernetes-architecture)
  - [5.2. Open Container Initiative (OCI)](#52-open-container-initiative-oci)
  - [5.3. Container Runtime Interface (CRI)](#53-container-runtime-interface-cri)
  - [5.4. Docker vs ContainerD](#54-docker-vs-containerd)
    - [5.4.1. Docker](#541-docker)
    - [5.4.2. ContainerD](#542-containerd)
  - [5.5. ETCD](#55-etcd)
    - [5.5.1. Get started quickly with ETCD](#551-get-started-quickly-with-etcd)
    - [5.5.2. ETCD in Kubernetes](#552-etcd-in-kubernetes)
    - [5.5.3. ETCD Setup - Manual vs kubeadm](#553-etcd-setup---manual-vs-kubeadm)
  - [5.6. Kube-API Server](#56-kube-api-server)
  - [5.7. Kube Controller Manager](#57-kube-controller-manager)
    - [5.7.1. Installation of Kube-Controller-Manager](#571-installation-of-kube-controller-manager)
  - [5.8. Kube Scheduler](#58-kube-scheduler)
  - [5.9. Kubelet](#59-kubelet)
  - [5.10. Kube Proxy](#510-kube-proxy)
  - [5.11. Pods](#511-pods)
- [6. Commands](#6-commands)
- [7. References](#7-references)


# 2. Intro

This document contains my notes on preparation course of Certified Kubernetes Administrators (CKA) Certification by Mumshad Mannambeth.

# 3. Certification

- [Certified Kubernetes Administrator](https://www.cncf.io/certification/cka/)
- [Exam Curriculum (Topics)](https://github.com/cncf/curriculum)
- [Candidate Handbook](https://www.cncf.io/certification/candidate-handbook)
- [Exam Tips](http://training.linuxfoundation.org/go//Important-Tips-CKA-CKAD)

# 4. CKA Lecture and Lab Notes

- [Certified Kubernetes Administrator (CKA) Course](https://github.com/kodekloudhub/certified-kubernetes-administrator-course)

# 5. Core Concepts

## 5.1. Kubernetes Architecture

- Worker Nodes: hosts application as containers
    - Worker Nodes Components:
        - kubelet: is an agent which runs on Worker Nodes
        - kube-proxy: is a service responsible for networking on Worker Nodes
- Master Node: manage, plan schedule, monitor etc. nodes using Control Plane Components
    - Control Plane Components:
        - kube-apiserver: is responsible for orchestration of all operations within k8s cluster Control Plane Components 
        - ETCD Cluster: is a database which stores information in a key-value format
        - kube-scheduler: identifies right node based on containers resource requirements
        - Controller-Manager
            - Node-Controller
            - Replication-Controller


## 5.2. Open Container Initiative (OCI)

- **imagespec**: specifications how container image must be built
- **runtimespec**: specifications how conainer runtime should be developed

## 5.3. Container Runtime Interface (CRI)

- Kubernetes introduced **Container Runtime Interface (CRI)** which allows any vendor to work as container runtime as long as it adheres to **OCI** specification and not only Docker which used initially **dockershim**. 
- Starting from version **v1.24** Kubernetes deleted **dockershim** and Docker support


## 5.4. Docker vs ContainerD

### 5.4.1. Docker

- Docker is not only container runtime, but also consist of multiple tools
  - CLI
  - API
  - BUILD
  - Volumes
  - AUTH
  - SECURITY
  - ContainerD
- Docker uses container runtime ContainerD

### 5.4.2. ContainerD

- ContainerD is part of Cloud Native Computing Foundation (CNCF)
- ContainerD is a higher-level tool that manages the entire lifecycle of containers.
- ContainerD is a deamon which manages runc and compatable with Container Runtime Interface (CRI)
- **runc** is a container runtime
- ContainerD works as container runtime on its own separate from Docker
- ContainerD comes with `crt` CLI tool mainly made for debugging container. `nerdctl` (similar to docker CLI) provides stable and humand-friendly user experience
- `crictl` is another CLI tool from k8s community compatable with CRI which works accross different container runtime. Mainly used for debugging
- Read [more](https://github.com/containerd/containerd/blob/main/docs/getting-started.md)


## 5.5. ETCD

- **ETCD** is a distributed reliable key-value store that is simple, secure and fast
- **Key-Value Store** stores information if form of documents, pages (i.e. files) which can be in any format and structure

### 5.5.1. Get started quickly with ETCD

 - Download the relevant binary for your operating system from github releases page (https://github.com/etcd-io/etcd/releases)

   For Example: To download ETCD v3.5.6, run the below curl command

   ```
   $ curl -LO https://github.com/etcd-io/etcd/releases/download/v3.5.6/etcd-v3.5.6-linux-amd64.tar.gz
   ```
 - Extract it.
   ```
   $ tar xvzf etcd-v3.5.6-linux-amd64.tar.gz
   ```
 - Run the ETCD Service
   ```
   $ ./etcd
   ```
 - When you start **`ETCD`** it will by default listen on port **`2379`**
  - The default client that comes with **`ETCD`** is the [**`etcdctl`**](https://github.com/etcd-io/etcd/tree/main/etcdctl) client. You can use it to store and retrieve key-value pairs.
    ```
    Syntax: To Store a Key-Value pair
    $ ./etcdctl put key1 value1
    ```
    ```
    Syntax: To retrieve the stored data
    $ ./etcdctl get key1
    ```
    ```sh
    Syntax: To view more commands. Run etcdctl without any arguments
    $ ./etcdctl

    # etcdctl command in API 3 version
    etcdctl snapshot save 
    etcdctl endpoint health
    etcdctl get
    etcdctl put

    export ETCDCTL_API=3           # set the environment variable ETCDCTL_API for desired API version

    # Certs for ETCDCTL to authenticate to the ETCD API Server
    --cacert /etc/kubernetes/pki/etcd/ca.crt     
    --cert /etc/kubernetes/pki/etcd/server.crt     
    --key /etc/kubernetes/pki/etcd/server.key

    # Example: 
    kubectl exec etcd-master -n kube-system -- sh -c "ETCDCTL_API=3 etcdctl get / --prefix --keys-only --limit=10 --cacert /etc/kubernetes/pki/etcd/ca.crt --cert /etc/kubernetes/pki/etcd/server.crt  --key /etc/kubernetes/pki/etcd/server.key" 

    ```

### 5.5.2. ETCD in Kubernetes

- The **ETCD Datastore** stores following cluster information:
  - Nodes
  - PODS
  - Configs
  - Secrets
  - Accounts
  - Roles
  - Bindings
  - Others

- `kubectl get` command retrieves all information from the **ETCD Server**

### 5.5.3. ETCD Setup - Manual vs kubeadm

- Read [more](https://github.com/kodekloudhub/certified-kubernetes-administrator-course/blob/master/docs/02-Core-Concepts/05-ETCD-in-Kubernetes.md)


## 5.6. Kube-API Server

- **Kube-API Server** is a primary management component in K8s
- kube-api server performs following actions when  `kubectl` command is executed:
  - Authenticate User
  - Validate Request
  - Retrieve dataf
- Read [more](https://github.com/kodekloudhub/certified-kubernetes-administrator-course/blob/master/docs/02-Core-Concepts/06-Kube-API-Server.md)


## 5.7. Kube Controller Manager

- **Kube Controller Manager** manages various controllers in kubernetes
- **Controller** is a process that continuously monitors the state of the components within the system and ensures the whole system to have the desired functioning state
- Controllers:
  - **Node Controller** - monitors health of Nodes every `5s`
    - `Node Monitor Period = 5s`
    - `Node Monitor Grace Period = 40s` (i.e. waits 40s before marking it as unreachable)
    - `POD Eviction Timeout = 5m` (i.e. waits 5m to come back up if unreachable before removing pods and provisioning resources to the healthy nodes if it is part of replica set)
  - **Replication Controller** - monitors state of replica sets
  - **Deployment Controller**
  - **Namespace Controller**
  - **Endpoint-Controller**
  - **CronJob**
  - **Job Controller**
  - **PV Protection Controller**
  - **Service Account Controller**
  - **Stateful Set**
  - **Replica Set**
  - **PV Binder Controller**

### 5.7.1. Installation of Kube-Controller-Manager

- Read [more](https://github.com/kodekloudhub/certified-kubernetes-administrator-course/blob/master/docs/02-Core-Concepts/07-Kube-Controller-Manager.md)


## 5.8. Kube Scheduler

- **kube-scheduler** is responsible for scheduling pods on nodes. The kube-scheduler is only responsible for deciding which pod goes on which node depending on certain criteria (e.g. **Filter Nodes**, **Rank Nodes**). It doesn't actually place the pod on the nodes, that's the job of the `kubelet`.
- Read [more](https://github.com/kodekloudhub/certified-kubernetes-administrator-course/blob/master/docs/02-Core-Concepts/08-Kube-Scheduler.md)

## 5.9. Kubelet

- **kubelet** is a node agent which is responsible for creating the pods on the nodes and the sole point of contact for the kubernetes cluster
- kubelet also collects reports and sends regularly to master node


## 5.10. Kube Proxy

- **POD Network** is an internal virtual network that spans across all nodes in the cluster to which all pods are connected. Within k8s cluster every pod can reach every other pod which is accomplished by deploying networking solution, i.e. POD Network.
- **kube-proxy** is a network component in Kubernetes that helps manage network communication to and from the Pods in a k8s cluster. Key function of kube-proxy:
  - Traffic Routing
  - Load Balancing
  - Service Discovery
  - Protocol Support

## 5.11. Pods

- **Pod** is a logical host for one or more containers that are deployed together on the same host

```yaml
# Example of Pod definition with YAML

apiVersion: v1
kind: Pod               
metadata:                       # dictionary
    name: myapp-pod
    labels:                     # under labels custom key:value allowed
        app: myapp
        type: front-end

spec:                           # dictionary
    containers:                 # list/array
        - name: nginx-controller
          image: nginx

```


# 6. Commands

```sh
kubectl get pods -n kube-system
kubectl get pods -o wide


kubectl describe pod myapp-pod


kubectl exec etcd-master -n kube-system etcdctl get / --prefix -keys-only


kubectl run nginx --image=nginx --dry-run=client -o yaml
```

# 7. References

- [Certified Kubernetes Administrator (CKA) with Practice Tests by Mumshad Mannambeth](https://www.udemy.com/course/certified-kubernetes-administrator-with-practice-tests)