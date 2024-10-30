---
title: Kubernetes
---

# Intro

This document contains my notes on preparation course of Certified Kubernetes Administrators (CKA) Certification by Mumshad Mannambeth.

# Certification

- [Certified Kubernetes Administrator](https://www.cncf.io/certification/cka/)
- [Exam Curriculum (Topics)](https://github.com/cncf/curriculum)
- [Candidate Handbook](https://www.cncf.io/certification/candidate-handbook)
- [Exam Tips](http://training.linuxfoundation.org/go//Important-Tips-CKA-CKAD)

# CKA Lecture and Lab Notes

- [Certified Kubernetes Administrator (CKA) Course](https://github.com/kodekloudhub/certified-kubernetes-administrator-course)

# Core Concepts

## Kubernetes Architecture

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


## Docker vs ContainerD



# Commands

```sh
# COMMENT

```

# References
- []()
