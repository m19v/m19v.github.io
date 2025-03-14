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
  - [5.14. Annotations](#514-annotations)
  - [5.15. Deployments](#515-deployments)
  - [5.16. Services](#516-services)
    - [5.16.1. ClusterIP](#5161-clusterip)
    - [5.16.2. NodePort](#5162-nodeport)
    - [5.16.3. LoadBalancer](#5163-loadbalancer)
    - [5.16.4. ExternalName](#5164-externalname)
  - [5.17. Namespaces](#517-namespaces)
    - [5.17.1. Resource Quota](#5171-resource-quota)
  - [5.18. Imperative vs. Declarative](#518-imperative-vs-declarative)
- [6. Scheduling](#6-scheduling)
  - [6.1. Manual Scheduling](#61-manual-scheduling)
    - [6.1.1. Binding Object](#611-binding-object)
  - [6.2. Taints and Tolerations](#62-taints-and-tolerations)
  - [6.3. Node Selectors](#63-node-selectors)
  - [6.4. Node Affinity](#64-node-affinity)
    - [6.4.1. Node Affinity Types](#641-node-affinity-types)
  - [6.5. Taints and Tolerations vs Node Affinity](#65-taints-and-tolerations-vs-node-affinity)
  - [6.6. Resource Requirements and Limits](#66-resource-requirements-and-limits)
    - [6.6.1. Default Behaviour](#661-default-behaviour)
    - [6.6.2. Resource Requests](#662-resource-requests)
    - [6.6.3. Resource Limits](#663-resource-limits)
    - [6.6.4. LimitRange](#664-limitrange)
    - [6.6.5. ResourceQuota](#665-resourcequota)
- [7. Commands](#7-commands)
- [8. References](#8-references)


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


## 5.14. Annotations

- **Annotations** are key-value pairs that can be attached to various Kubernetes objects (e.g. pods, services, deployments etc.) to store arbitrary metadata that is not used for identification or selection. 
- Usage of Annotations:
  - Storing build or version information
  - Providing links to documentation or related resources
  - Specifying configuration options for tools that interact with the resource (e.g., deployment tools, monitoring systems)


## 5.15. Deployments

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


## 5.16. Services

- **Service** is used to expose a set of Pods and enable communication between them
- Services enable communication between different components of an application, allowing Pods to discover and interact with each other reliably
- There are different types of Services, each serving a specific purpose
- Service acts as built-in *load balancer* to distribute load across different Pods (`Algorithm: Random, SessionAffinity: Yes`)
  
### 5.16.1. ClusterIP

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

### 5.16.2. NodePort

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

### 5.16.3. LoadBalancer

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

### 5.16.4. ExternalName


## 5.17. Namespaces

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

### 5.17.1. Resource Quota

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


## 5.18. Imperative vs. Declarative

In the context of Infrastructure as Code (IaC), imperative and declarative are two different approaches to defining and managing infrastructure. 

- In an **imperative** approach, you specify how to achieve a desired state by providing a sequence of commands or instructions.
-  In a **declarative** approach, you specify what the desired state of the infrastructure should be, without detailing the steps to achieve that state.

```sh
# IMPERAIVE APPROACH

# create objects
kubectl run --image=nginx nginx 
kubectl create deployment --image=nginx nginx 
kubectl expose deployment nginx --port 80

# update objects
kubectl edit deployment nginx
kubectl scale deployment nginx --replicas=5
kubectl set image deployment nginx nginx=nginx:1.18

kubectl create -f nginx.yaml
kubectl replace -f nginx.yaml
kubectl delete -f nginx.yaml


# DECLARATIVE APPROACH

kubectl apply -f object-definition-file.yaml
```


# 6. Scheduling

- **Scheduling** is a process of assigning pods (the smallest deployable units in Kubernetes) to nodes (the machines or virtual machines in the cluster) based on resource availability and other constraints.

## 6.1. Manual Scheduling

```yaml
apiVersion: v1
kind: Pod
metadata:
 name: nginx
 labels:
  name: nginx
spec:
 containers:
 - name: nginx
   image: nginx
   ports:
   - containerPort: 8080
 nodeName: node02                            # Specifies the name of Node, by default is not set
```

### 6.1.1. Binding Object

```yaml
apiVersion: v1
kind: Binding
metadata:
  name: my-pod
  namespace: default
target:
  apiVersion: v1
  kind: Node
  name: my-node
```

## 6.2. Taints and Tolerations

- **Taints** are applied to nodes to prevent certain pods from being scheduled on them
- **Tolerations** are applied to pods to allow them to be scheduled on nodes with specific taints

```sh
kubectl taint nodes <NODE-NAME> <KEY>=<VALUE>:<TAINT-EFFECT>

# TAINT-EFFECT defines what happens to Pods that do not TOLERATE this taint.
# TAINT-EFFECTs: NoSchedule, PreferNoSchedule, NoExecute



# TAINTING NODE EXAMPLE
kubectl taint nodes node1 app=blue:NoSchedule

# TOLERATION DEFINITION OF POD EXAMPLE
apiVersion: v1
kind: Pod
metadata:
 name: nginx
 labels:
  name: nginx
spec:
 containers:
 - name: nginx
   image: nginx
   ports:
   - containerPort: 8080
 tolerations:
 - key: "app"
   operator: "Equal" 
   value: "blue"
   effect: "NoSchedule"
```


## 6.3. Node Selectors

- Label a node:
```sh
kubectl label nodes node01 size=Large
```
- Assign a Pod to the Node
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
spec:
  containers:
  - name: nginx
    image: nginx
  nodeSelector:
    size: Large
```
- Node Selector's Limitations:
  - Advanced expressions, e.g. Large OR Medium, NOT Small etc. 

## 6.4. Node Affinity

Node affinity is conceptually similar to `nodeSelector`, allowing you to constrain which nodes your Pod can be scheduled on based on node labels.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: with-node-affinity
spec:
  containers:
  - name: nginx
    image: nginx
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: size
            operator: In                                        # operators: In, NotIn, Exists, DoesNotExist
            values:
            - Large
            - Medium
```

### 6.4.1. Node Affinity Types

- Available:
  - `requiredDuringSchedulingIgnoredDuringExecution`
  - `preferredDuringSchedulingIgnoredDuringExecution`
- Planned:
  - `requiredDuringSchedulingRequiredDuringExecution`


Two states in the lifecycle of the Pod considering Node Affinity:
- **DuringScheduling** is a state when Pod does not exists and is created for the first time. If *reqired* then a node with specified lable must exist in order the Pod to be scheduled. 
- **DuringExecution** is a state where the Pod is running and the change made in environment which affects Node Affinity, e.g. change in the label of the Node. If *ignored*, the Pod will continue running if node label is changed or removed.  

Read [more.](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#node-affinity)


## 6.5. Taints and Tolerations vs Node Affinity

**Taints and Tolerations**: Taints are applied to nodes to repel certain pods unless those pods have matching tolerations. This mechanism is useful for reserving nodes for specific workloads.
**Node Affinity**: Node affinity allows you to specify rules based on node labels that determine which nodes a pod can be scheduled on. It helps ensure that pods are placed on nodes with specific characteristics.


- Taints and Tolerations do not guarantee that the pods will only prefer these nodes.
- As such, a combination of taints and tolerations and node affinity rules can be used together to completely dedicate nodes for specific parts.


## 6.6. Resource Requirements and Limits

> **Note**: Requests and Limits for resources are set per container in the pod.

### 6.6.1. Default Behaviour

### 6.6.2. Resource Requests

```sh
apiVersion: v1
kind: Pod
metadata:
 name: nginx
 labels:
  name: nginx
spec:
 containers:
 - name: nginx
   image: nginx
   ports:
   - containerPort: 8080
   resources:
     requests:
       memory: "4Gi"  
       cpu: 2                           # 1 CPU Count: 1 AWS vCPU, 1 GCP Core, 1 Azure Core, 1 Hyperthread
```

### 6.6.3. Resource Limits

- **Limit = Requests** if `Request` is not defined

```sh
apiVersion: v1
kind: Pod
metadata:
 name: nginx
 labels:
  name: nginx
spec:
 containers:
 - name: nginx
   image: nginx
   ports:
   - containerPort: 8080
   resources:
     requests:
       memory: "4Gi"  
       cpu: 1                           # 1 CPU Count: 1 AWS vCPU, 1 GCP Core, 1 Azure Core, 1 Hyperthread
    limits:
       memory: "8Gi"  
       cpu: 2
```

### 6.6.4. LimitRange

- Applies in Namespace level (Namespace level object)
- 

```sh
# LimitRange CPU
apiVersion: v1
kind: LimitRange
metadata:
  name: cpu-resource-constraint
spec:
  limits:
  - default: # this section defines default limits
      cpu: 500m
    defaultRequest: # this section defines default requests
      cpu: 500m
    max: # max and min define the limit range
      cpu: "1"
    min:
      cpu: 100m
    type: Container


# LimitRange Memory
apiVersion: v1
kind: LimitRange
metadata:
  name: memory-resource-constraint
spec:
  limits:
  - default:
      memory: 1Gi
    defaultRequest:
      memory: 1Gi
    max: 
      memory: 1Gi
    min:
      memory: 500Mi
    type: Container

```

### 6.6.5. ResourceQuota

```sh
apiVersion: v1
kind: ResourceQuota
metadata:
  name: my-resource-quota
spec:
  hard:
    requests.cpu: 4
    requests.memory: 4Gi
    limit.cpu: 10
    limit.memory: 10Gi
```

## DeamonSets

- DeamonSet ensures that one copy of pod is present in all nodes of cluster
- Similar to `ReplicaSet` but deployes a pod on each nodes
- A pod is deployed on new node and removed when node is removed
- Use cases
  - Monitoring solution
  - Logs Viewer
  - Examples:
    - kube-proxy
    - weave-net (networking solution)

```yaml
# deamon-set-definition.yaml

apiVersion: apps/v1
kind: DeamonSet
metadata:
  name: monitoring-deamon
spec:
  selector:
    matchLabels:
      app: monitoring-agent
  template:
    metadata:
      labels:
        app: monitoring-agent
    spec:
      containers:
      - name: monitoring-agent
        image: monitoring-agent
```


## Static Pods

### What is Static Pods

- `Static Pods` are pods with `kubelet` without `kube-apiserver` or other k8s control plain components
- `kubelet` can manage pod independently from `kube-apiserver`
- Pod definition files must be provided to `kubelet` manually by putting them into `/etc/kubernetes/manifests` directory designated to store information about pods
- `kubelet` periodically checks `/etc/kubernetes/manifests` 
- `kubelet` creates a pod and makes sure it stays alive and removes pods if definition file is removed from manifests directory
- On `Static Pods` `kubelet` works in pod level and it is not possible to create `ReplicaSets`, `Deployments` or `Services` by copying definition files into manifest directory as it requires other control plane components, such as `replication`, `deployment-controller` etc.
- `--pod-manifest-path=/etc/kubernetes/manifests` flag or `--config=kubeconfig.yaml with content: staticPodPath: /etc/kubernetes/manifests` is used to set a designated directory to be scanned by `kubelet`
- Check running containers with: (i: no `kubectrl` util as `kube-apiserver` not available)
  - `docker ps` for `Docker`
  - `crictl ps` for `cri-o`
  - `nerdctl ps` for `containerd`


### Static Pods in Cluster

- `kubelet` takes requests to create pod from different inputs:
  - from definition file from static pod folder
  - from http api endpoint (i.e. from `kube-apiserver`)
- `kubectl get pods` will also list pods created statically but they can NOT be edited, deleted etc. from `kube-apiserver`
- Static pods can be recognized by their name where node name is appended to it 


### Static Pods Use Case

- To deploy Control Plane components as Static Pods. E.g. `kubeadm` tool uses a mechanist of Static Pods to create a k8s cluster. E.g. by just putting `controller-manager.yaml`, `apiserver.yaml`, `etcd.yaml` into static pod folder and the k8s control plane components will be started as pods


### Static Pods vs. DaemonSets

| Static Pods                                      | DaemonSets                                         |
| ------------------------------------------------ | -------------------------------------------------- |
| Created by kubelet                               | Created kube-apiserver (DaemonSet Controller)      |
| Deploy Control Plane components as Static Pods   | Deploy Monitoring Agents, Logging Agents on nodes  |
| Ignored by kube-scheduler                        | Ignored by kube-scheduler                          |



## Multiple Schedulers



# 7. Commands

```sh
# GET

kubectl get all

kubectl get pods --watch
kubectl get pods -n kube-system
kubectl get pods -o wide

kubectl get pods -l environment=production,tier=frontend
kubectl get pods -l 'environment in (production),tier in (frontend)'
kubectl get pods -l 'environment,environment notin (frontend)'

kubectl get pods --selector app=App1
kubectl get pods --selector app=App1 --no-headers | wc -l

kubectl get pod <pod-name> --all-namespaces

kubectl get replicationcontroller
kubectl get replicaset
kubectl get replicaset myapp-rs -o yaml

kubectl get deployments

kubectl get services




# DESCRIBE

kubectl describe pod myapp-pod
kubectl describe node kubemaster






# APPLY

kubectl apply -f object-definition-file.yaml
kubectl apply -f /path/to/object-definition-files





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






# LABEL

kubectl label nodes <node-name> <label-key>=<label-value>





# REPLACE

kubectl replace --force -f replicaset-definition.yaml





# SCALE

kubectl scale --replicas=6 -f replicaset-definition.yaml
kubectl scale --replicas=6 -f replicaset myapp-rs





# DELETE

kubectl delete replicaset myapp-replicaset               # deletes all underlying Pods 





# CONFIG

kubectl config set-context $(kubectl config current-context) --namespace=dev





# TAINT

kubectl taint nodes <NODE-NAME> <KEY>=<VALUE>:<TAINT-EFFECT>                    # TAINT-EFFECTs: NoSchedule, PreferNoSchedule, NoExecute
kubectl taint nodes <NODE-NAME> <KEY>=<VALUE>:<TAINT-EFFECT>-                   # UNTAINT
```

# 8. References

- [Certified Kubernetes Administrator (CKA) with Practice Tests by Mumshad Mannambeth](https://www.udemy.com/course/certified-kubernetes-administrator-with-practice-tests)
- [Kubernetes Commands](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands)
