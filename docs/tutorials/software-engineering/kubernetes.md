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
- `crictl` is another CLI tool compatable with CRI which works accross different container runtime. Mainly used for debugging




# 6. Commands

```sh
# COMMENT

```

# 7. References
- []()
