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
  - [5.12. ReplicaSets](#512-replicasets)
  - [5.13. Labels and Selectors](#513-labels-and-selectors)
  - [5.14. Deployments](#514-deployments)
  - [5.15. Services](#515-services)
    - [5.15.1. ClusterIP](#5151-clusterip)
    - [5.15.2. NodePort](#5152-nodeport)
    - [5.15.3. LoadBalancer](#5153-loadbalancer)
    - [5.15.4. ExternalName](#5154-externalname)
  - [5.16. Namespaces](#516-namespaces)
    - [Resource Quota](#resource-quota)
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
    namespace: dev
    labels:                     # under labels custom key:value allowed
        app: myapp
        type: front-end

spec:                           # dictionary
    containers:                 # list/array
        - name: nginx-controller
          image: nginx

```

## 5.12. ReplicaSets

- **ReplicaSet** and **ReplicationController** (deprecated in favor of ReplicaSet) are both Kubernetes resources for managing pod replication to ensure a specified number of pod replicas running at any given time

```yaml
# Example of ReplicationController definition with YAML

apiVersion: v1
kind: ReplicationController
metadata:                       # dictionary
    name: myapp-rc
    namespace: dev
    labels:                     # under labels custom key:value allowed
        app: myapp
        type: front-end

spec:                           # dictionary
    template:                   # Pod template for replication
        metadata:                       
            name: myapp-pod
            labels:                     
                app: myapp
                type: front-end

        spec:                           
            containers:                 
                - name: nginx-controller
                image: nginx
    
    replicas: 3
```

```yaml
# Example of ReplicaSet definition with YAML

apiVersion: apps/v1
kind: ReplicaSet
metadata:                       # dictionary
    name: myapp-rs
    namespace: dev
    labels:                     # under labels custom key:value allowed
        app: myapp
        type: front-end

spec:                           # dictionary
    template:                   # Pod template for replication
        metadata:                       
            name: myapp-pod
            labels:                     
                app: myapp
                type: front-end

        spec:                           
            containers:                 
                - name: nginx-controller
                image: nginx
    
    replicas: 3
    selector:                   # Major difference from ReplicationController
        matchLabels:
            type: front-end     # To select all existing Pods matching defined label
```

## 5.13. Labels and Selectors

- **Labels** are *key/value* pairs that are attached to objects such as Pods for categorizing resources.
- **Selectors** are *queries* to filter resources based on *labels*.


## 5.14. Deployments

- **Deployment** is a higher-level abstraction that manages a ReplicaSet, which in turn manages the Pods.

```yaml
# Example of Deployment definition with YAML

apiVersion: apps/v1
kind: Deployment
metadata:                       # dictionary
    name: myapp-rs
    namespace: dev
    labels:                     # under labels custom key:value allowed
        app: myapp
        type: front-end

spec:                           # dictionary
    template:                   # Pod template for replication
        metadata:                       
            name: myapp-pod
            labels:                     
                app: myapp
                type: front-end

        spec:                           
            containers:                 
                - name: nginx-controller
                image: nginx
    
    replicas: 3
    selector:                   
        matchLabels:
            type: front-end     # To select all existing Pods matching defined label
```


## 5.15. Services

- **Service** is used to expose a set of Pods and enable communication between them
- Services enable communication between different components of an application, allowing Pods to discover and interact with each other reliably
- There are different types of Services, each serving a specific purpose
- Service acts as built-in *load balancer* to distribute load across different Pods (`Algorithm: Random, SessionAffinity: Yes`)
  
### 5.15.1. ClusterIP

- This is the default service type
- It exposes the service on a cluster-internal IP
- Only accessible from within the cluste
- Useful for internal communication between services

```yaml
# Example of Service of type ClusterIP definition with YAML

apiVersion: v1
kind: Service               
metadata:                       # dictionary
    name: back-end
    namespace: dev

spec:
    type: ClusterIP
    ports:
      - port: 80                # The port that the service will expose
        targetPort: 8080        # The port on the pod that the service should forward to
    selector:
        app: myapp
        type: back-end

```

### 5.15.2. NodePort

- Service of type NodePort listens on the static port of each node's IP address in cluster and forward request to the Pods
- Node's port range `30 000 to 32 767`

```yaml
# Example of Service of type NodePort definition with YAML

apiVersion: v1
kind: Service               
metadata:                       # dictionary
    name: myapp-service
    namespace: dev

spec:
    type: NodePort
    ports:
      - port: 80                # The port that the service will expose
        targetPort: 8080        # The port on the pod that the service should forward to
        nodePort: 30008         # The port on each node that will forward to the service
    selector:
        app: myapp
        type: front-end

```

### 5.15.3. LoadBalancer

- Creates an external load balancer (if supported by the cloud provider)
- Automatically assigns a public IP address to the service
- Distributes incoming traffic across multiple nodes
- Ideal for production environments where you need to handle large amounts of traffic

```yaml
# Example of Service of type LoadBalancer definition with YAML

apiVersion: v1
kind: Service               
metadata:                       # dictionary
    name: myapp-service
    namespace: dev

spec:
    type: LoadBalancer
    ports:
      - port: 80                # The port that the service will expose
        targetPort: 8080        # The port on the pod that the service should forward to
        nodePort: 30008         # The port on each node that will forward to the service

```

### 5.15.4. ExternalName


## 5.16. Namespaces

- **Namespace** is a way to organize and manage resources within a cluster which provides a mechanism for isolating groups of resources
- Key Points of Namespaces:
  - Isolation
  - Resource Management
  - Access Control
  - Resource Quotas
  - Network Policies
  - Scoped Resources
  
> **Info:** A pattern to access a service in a different namespace using DNS:  
> 
> `<service-name>.<namespace>.svc.cluster.local`  
> - `<service-name>`: name of the service to access
> - `<namespace>`: namespace where the service is located
> - `svc`: indicates that a service being accessed
> - `cluster.local`: default domain name for services in the k8s cluster (can be customized)

```yaml
# Example of Namespace definition with YAML

apiVersion: v1
kind: Namespace
metadata:
    name: dev
```

### Resource Quota

```yaml
# Example of ResourceQuota definition with YAML

apiVersion: v1
kind: ResourceQuota
metadata:
    name: compute-quota
    namespace: dev

spec: 
  hard:
    pods: "10"
    requests.cpu: "4"
    requests.memory: "5Gi"
    limits.cpu: "10"
    limits.memory: "10Gi"
```


# 6. Commands

```sh
# GET

kubectl get all

kubectl get pods
kubectl get pods -n kube-system
kubectl get pods -o wide

kubectl get pods -l environment=production,tier=frontend
kubectl get pods -l 'environment in (production),tier in (frontend)'
kubectl get pods -l 'environment,environment notin (frontend)'

kubectl get pod <pod-name> --all-namespaces

kubectl get replicationcontroller
kubectl get replicaset
kubectl get replicaset myapp-rs -o yaml

kubectl get deployments

kubectl get services




# DESCRIBE

kubectl describe pod myapp-pod





# CREATE

kubectl create deployment --image=nginx nginx --namespace=dev
kubectl create deployment my-deployment --image=nginx nginx --replicas=3 --dry-run=client -o yaml

kubectl create service nodeport myapp-service --tcp=8080:8080 --dry-run=client -o yaml

kubectl create namespace dev





# EXEC

kubectl exec etcd-master -n kube-system etcdctl get / --prefix -keys-only





# RUN

kubectl run nginx --image=nginx --namespace=default --dry-run=client -o yaml






# EDIT

kubectl edit replicaset





# REPLACE

kubectl replace -f replicaset-definition.yaml





# SCALE

kubectl scale --replicas=6 -f replicaset-definition.yaml
kubectl scale --replicas=6 -f replicaset myapp-rs





# DELETE

kubectl delete replicaset myapp-replicaset               # deletes all underlying Pods 





# CONFIG

kubectl config set-context $(kubectl config current-context) --namespace=dev
```

# 7. References

- [Certified Kubernetes Administrator (CKA) with Practice Tests by Mumshad Mannambeth](https://www.udemy.com/course/certified-kubernetes-administrator-with-practice-tests)