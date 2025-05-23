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
  - [6.7. DeamonSets](#67-deamonsets)
  - [6.8. Static Pods](#68-static-pods)
    - [6.8.1. What is Static Pods](#681-what-is-static-pods)
    - [6.8.2. Static Pods in Cluster](#682-static-pods-in-cluster)
    - [6.8.3. Static Pods Use Case](#683-static-pods-use-case)
    - [6.8.4. Static Pods vs. DaemonSets](#684-static-pods-vs-daemonsets)
  - [6.9. Multiple Schedulers](#69-multiple-schedulers)
  - [6.10. Configuring Scheduler Profiles](#610-configuring-scheduler-profiles)
  - [6.11. Admission Controllers](#611-admission-controllers)
  - [6.12. Validating and Mutating Admission Controllers](#612-validating-and-mutating-admission-controllers)
    - [6.12.1. Validating Admission Controllers](#6121-validating-admission-controllers)
    - [6.12.2. Mutating Admission Controller](#6122-mutating-admission-controller)
    - [6.12.3. Custom Validating/Mutating Admission Controllers](#6123-custom-validatingmutating-admission-controllers)
- [7. Logging and Monitoring](#7-logging-and-monitoring)
  - [7.1. Monitor Cluster Components](#71-monitor-cluster-components)
    - [7.1.1. Tools](#711-tools)
  - [7.2. Managing Application Logs](#72-managing-application-logs)
- [8. Application Lifecycle Management](#8-application-lifecycle-management)
  - [8.1. Rolling Updates and Rollbacks](#81-rolling-updates-and-rollbacks)
    - [8.1.1. Deployment Strategy](#811-deployment-strategy)
  - [8.2. Configure Applications](#82-configure-applications)
    - [8.2.1. Commands and Arguments in Docker and K8s](#821-commands-and-arguments-in-docker-and-k8s)
    - [8.2.2. Configuring Environment Variables in Applications](#822-configuring-environment-variables-in-applications)
    - [8.2.3. Configuring ConfigMaps in Applications](#823-configuring-configmaps-in-applications)
    - [8.2.4. Configure Secrets an Applications](#824-configure-secrets-an-applications)
      - [8.2.4.1. Create Secrets](#8241-create-secrets)
      - [8.2.4.2. Encrypting Secret Data at Rest](#8242-encrypting-secret-data-at-rest)
      - [8.2.4.3. Secret Store Providers](#8243-secret-store-providers)
  - [8.3. Scale Applications](#83-scale-applications)
  - [8.4. Multi Container Pods](#84-multi-container-pods)
    - [8.4.1. Multi-container Pods Design Patterns](#841-multi-container-pods-design-patterns)
  - [8.5. InitContainers](#85-initcontainers)
  - [8.6. Self Healing Applications](#86-self-healing-applications)
  - [8.7. Intro to Autoscaling](#87-intro-to-autoscaling)
    - [8.7.1. Scaling Cluster Infra vs Scaling Workloads](#871-scaling-cluster-infra-vs-scaling-workloads)
    - [8.7.2. Manual vs Automated Scaling](#872-manual-vs-automated-scaling)
    - [8.7.3. Horizontal Pod Autoscaler (HPA)](#873-horizontal-pod-autoscaler-hpa)
      - [8.7.3.1. Scaling a workload manually](#8731-scaling-a-workload-manually)
      - [8.7.3.2. HPA](#8732-hpa)
    - [8.7.4. Vertical Pod Autoscaling (VPA)](#874-vertical-pod-autoscaling-vpa)
      - [8.7.4.1. Deployment of VPA Components](#8741-deployment-of-vpa-components)
    - [8.7.5. In-place resize Pods](#875-in-place-resize-pods)
      - [8.7.5.1. Limitations](#8751-limitations)
    - [8.7.6. VPA vs. HPA](#876-vpa-vs-hpa)
- [9. Cluster Maintenance](#9-cluster-maintenance)
  - [9.1. OS Upgrade](#91-os-upgrade)
  - [9.2. Kubernetes Software Versions](#92-kubernetes-software-versions)
  - [9.3. Cluster Upgrade Process](#93-cluster-upgrade-process)
    - [9.3.1. `kubeadm upgrade`](#931-kubeadm-upgrade)
    - [9.3.2. Cluster Upgrade - Demo](#932-cluster-upgrade---demo)
    - [9.3.3. Backup and Restore Methods](#933-backup-and-restore-methods)
      - [9.3.3.1. Backup Candidates](#9331-backup-candidates)
- [10. Security](#10-security)
  - [10.1. Kubernetes Security Primitives](#101-kubernetes-security-primitives)
    - [10.1.1. Cluster Hosts Security](#1011-cluster-hosts-security)
    - [10.1.2. Kubernetes Security](#1012-kubernetes-security)
    - [10.1.3. TLS Certificates](#1013-tls-certificates)
    - [10.1.4. Application Communication within Cluster](#1014-application-communication-within-cluster)
  - [10.2. Authentication](#102-authentication)
    - [10.2.1. Users](#1021-users)
      - [10.2.1.1. Basic Authentication Mechanism - Static Password File](#10211-basic-authentication-mechanism---static-password-file)
      - [10.2.1.2. Basic Authentication Mechanism - Static Token File](#10212-basic-authentication-mechanism---static-token-file)
    - [10.2.2. Service Accounts](#1022-service-accounts)
  - [10.3. TLS Certificates in K8s](#103-tls-certificates-in-k8s)
    - [10.3.1. TLS Basics](#1031-tls-basics)
      - [10.3.1.1. Private vs Public Key](#10311-private-vs-public-key)
      - [10.3.1.2. Symmetric Encryption](#10312-symmetric-encryption)
      - [10.3.1.3. Asymmetric Encryption](#10313-asymmetric-encryption)
      - [10.3.1.4. Asymmetric Encryption - SSH](#10314-asymmetric-encryption---ssh)
      - [10.3.1.5. Asymmetric Encryption - HTTPS](#10315-asymmetric-encryption---https)
      - [10.3.1.6. Certificate Authority (CA)](#10316-certificate-authority-ca)
      - [10.3.1.7. Naming Convention of Public and Private Keys](#10317-naming-convention-of-public-and-private-keys)
      - [10.3.1.8. TLS Use Cases](#10318-tls-use-cases)
    - [10.3.2. TLS in Kubernetes](#1032-tls-in-kubernetes)
    - [10.3.3. TLS in Kubernetes - Certificate Creation](#1033-tls-in-kubernetes---certificate-creation)
    - [10.3.4. View Certificate Details](#1034-view-certificate-details)
  - [10.4. Certificate API](#104-certificate-api)
    - [10.4.1. Steps to generate certificate for a new User](#1041-steps-to-generate-certificate-for-a-new-user)
  - [10.5. KubeConfig](#105-kubeconfig)
  - [10.6. Persistent Key/Value Store](#106-persistent-keyvalue-store)
  - [10.7. API Group](#107-api-group)
  - [10.8. Authorization](#108-authorization)
    - [10.8.1. Authorization Modes](#1081-authorization-modes)
    - [10.8.2. Authorization Mechanisms](#1082-authorization-mechanisms)
      - [10.8.2.1. **Node Authorizer**](#10821-node-authorizer)
      - [10.8.2.2. **ABAC**](#10822-abac)
      - [10.8.2.3. **RBAC**](#10823-rbac)
      - [10.8.2.4. Webhook](#10824-webhook)
    - [10.8.3. RBAC](#1083-rbac)
    - [10.8.4. Cluster Roles and Role Bindings](#1084-cluster-roles-and-role-bindings)
  - [10.9. Service Accounts](#109-service-accounts)
  - [10.10. Image Security](#1010-image-security)
  - [10.11. Docker Security](#1011-docker-security)
  - [10.12. Security Context](#1012-security-context)
  - [10.13. Network Policies](#1013-network-policies)
  - [10.14. Kubectx and Kubens](#1014-kubectx-and-kubens)
  - [10.15. Custorm Resource Definition (CRD)](#1015-custorm-resource-definition-crd)
  - [10.16. Custom Controllers](#1016-custom-controllers)
  - [10.17. Operator Framework](#1017-operator-framework)
- [11. Storage](#11-storage)
  - [11.1. Docker Storage](#111-docker-storage)
    - [11.1.1. Docker Storage Drivers and File Systems](#1111-docker-storage-drivers-and-file-systems)
    - [11.1.2. Volume Driver Plugins in Docker](#1112-volume-driver-plugins-in-docker)
  - [11.2. Container Interfaces](#112-container-interfaces)
    - [11.2.1. Container Storage Interface (CSI)](#1121-container-storage-interface-csi)
  - [11.3. Volumes](#113-volumes)
    - [11.3.1. Volumes and Mounts](#1131-volumes-and-mounts)
    - [11.3.2. Volume Types](#1132-volume-types)
  - [11.4. Persistent Volumes (PV)](#114-persistent-volumes-pv)
  - [11.5. Persistent Volume Claims (PVC)](#115-persistent-volume-claims-pvc)
  - [11.6. Storage Class](#116-storage-class)
    - [11.6.1. Static Provisioning of Volume](#1161-static-provisioning-of-volume)
    - [11.6.2. Dynamic Provisioning of Volume](#1162-dynamic-provisioning-of-volume)
- [12. Networking](#12-networking)
- [13. Design and Install a Kubernetes Cluster](#13-design-and-install-a-kubernetes-cluster)
- [14. Install "K8s the kubeadm way"](#14-install-k8s-the-kubeadm-way)
- [15. Helm Basics](#15-helm-basics)
- [16. Kustomize Basics](#16-kustomize-basics)
- [17. End to End tests on a K8s Cluster](#17-end-to-end-tests-on-a-k8s-cluster)
- [18. Troubleshooting](#18-troubleshooting)
- [19. Other Topics](#19-other-topics)
- [20. Ligtning Labs](#20-ligtning-labs)
- [21. Mock Exams](#21-mock-exams)
- [22. Course Conclusion](#22-course-conclusion)
- [23. Commands](#23-commands)
- [24. References](#24-references)


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

## 6.7. DeamonSets

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


## 6.8. Static Pods

### 6.8.1. What is Static Pods

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


### 6.8.2. Static Pods in Cluster

- `kubelet` takes requests to create pod from different inputs:
  - from definition file from static pod folder
  - from http api endpoint (i.e. from `kube-apiserver`)
- `kubectl get pods` will also list pods created statically but they can NOT be edited, deleted etc. from `kube-apiserver`
- Static pods can be recognized by their name where node name is appended to it 


### 6.8.3. Static Pods Use Case

- To deploy Control Plane components as Static Pods. E.g. `kubeadm` tool uses a mechanist of Static Pods to create a k8s cluster. E.g. by just putting `controller-manager.yaml`, `apiserver.yaml`, `etcd.yaml` into static pod folder and the k8s control plane components will be started as pods


### 6.8.4. Static Pods vs. DaemonSets

| Static Pods                                      | DaemonSets                                         |
| ------------------------------------------------ | -------------------------------------------------- |
| Created by kubelet                               | Created kube-apiserver (DaemonSet Controller)      |
| Deploy Control Plane components as Static Pods   | Deploy Monitoring Agents, Logging Agents on nodes  |
| Ignored by kube-scheduler                        | Ignored by kube-scheduler                          |



## 6.9. Multiple Schedulers

## 6.10. Configuring Scheduler Profiles

## 6.11. Admission Controllers

## 6.12. Validating and Mutating Admission Controllers

### 6.12.1. Validating Admission Controllers

- Validates the request and allow/deny it

### 6.12.2. Mutating Admission Controller

- Mutates/Changes object before it is created (e.g. `DefaultStorageClass`)

### 6.12.3. Custom Validating/Mutating Admission Controllers

- `MutatingAdmissionWebhook`
- `ValidatingAdmissionWebhook`


- Webhooks above will reference `Admission Webhook Server` with custom logic


# 7. Logging and Monitoring

## 7.1. Monitor Cluster Components

### 7.1.1. Tools

- Prometheus
- DataDog
- Elastic Stack
- Dynatrace
- Mentics Server: in-memory solution without storing data option. 
  - `kubelet` contains sub-component called `cAdvisor` (i.e. container advisor) responsible for retrieving performance metrics and exposing them through `kubelet` API for Metrics Server. 
  - Enable Metrics Service: 
    - `git clone https://github.com/kubernetes-incubator/metrics-server.git & kubectl create -f deploy/1.8+`
  - Cluster Performance view:
    - `kubectl top node`
    - `kubectl top pod`

## 7.2. Managing Application Logs


# 8. Application Lifecycle Management

## 8.1. Rolling Updates and Rollbacks

### 8.1.1. Deployment Strategy

- Recreate: destroy all and create all
- Rolling Update: destroy and create one-by-one (DEFAULT Deployment Strategy)

## 8.2. Configure Applications

- Configuring Command and Arguments on applications
- Configure Environment Variables
- Configure Secrets

### 8.2.1. Commands and Arguments in Docker and K8s

- Read [more](https://docs.docker.com/reference/dockerfile/#cmd)
- Containers (unlike VMs) are not meant to host OS, but run specific process.


```Dockerfile
FROM nginx

ENTRYPOINT ["sleep"]
CMD ["5"]
```

```yaml
apiVersion: v1
kind: Pod
metadata:
 name: nginx-sleeper-pod
spec:
 containers:
 - name: nginx
   image: nginx
   command: ["sleep"]                    # Overrides executables ENTRYPOINT in Dockerfile
   args: ["10"]                          # Overrides CMD defined after ENTRYPOINT as arguments in Dockerfile
```

### 8.2.2. Configuring Environment Variables in Applications

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: envar-demo
spec:
  containers:
  - name: envar-demo-container
    image: nginx
    env:
    - name: MY_VAR
      value: "My Value"
```

```yaml
# ENV Value Types

# 1. Plain Key Value
...
    env:
    - name: MY_VAR
      value: "My Value"
...

# 2. ConfigMap
...
    env:
    - name: MY_VAR
      valueFrom: 
        configMapKeyRef:
...

# 3. Secrets
...
    env:
    - name: MY_VAR
      valueFrom: 
        secretKeyRef:
...
```

### 8.2.3. Configuring ConfigMaps in Applications

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: configmap-demo
data:
  # property-like keys; each key maps to a simple value
  player_initial_lives: "3"
  ui_properties_file_name: "user-interface.properties"

  # file-like keys
  game.properties: |
    enemy.types=aliens,monsters
    player.maximum-lives=5    
  user-interface.properties: |
    color.good=purple
    color.bad=yellow
    allow.textmode=true  
```

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: env-configmap
spec:
  containers:
    - name: app
      command: ["/bin/sh", "-c", "printenv"]
      image: busybox:latest
      envFrom:
        - configMapRef:
            name: configmap-demo
```

```yaml
# ConfigMaps in Pods

# 1. ENV
envFrom:
  - configMapRef:
      name: app-config

# 2. SINGLE ENV
env:
  - name: APP_COLOR
    valueFrom:
      configMapKeyRef:
        name: app-config
        key: APP_COLOR

# 3. VOLUME
volumes:
- name: app-config-value
  configMap:
    name: app-config
```

### 8.2.4. Configure Secrets an Applications

#### 8.2.4.1. Create Secrets

- Imperative approach - see [Commands](#9-commands)
- Declarative approach

```yaml
# kubectl create -f secret-data.yaml

# Secrets are only encoded, NOT Encryped
# echo -n 'password' | base64
# echo -n 'cGFzc3dvcmQ=' | base64 --decode

# secret-data.yaml

apiVersion: v1
kind: Secret
metadata:
  name: app-secret
data:
  DB_User: root
  DB_Password: dmFsdWUtMg0KDQo=
---
apiVersion: v1
kind: Pod
metadata:
  name: sapmple-secret-pod
spec:
  containers:
    - name: test-container
      image: registry.k8s.io/busybox
      envFrom:
        - secretRef:
            name: app-secret                           # ref to secret name
```

```yaml
# Secrets in Pods

# 1. ENV
envFrom:
  - secretRef:
      name: app-config

# 2. SINGLE ENV
env:
  - name: DB_password
    valueFrom:
      secretKeyRef:
        name: app-secret
        key: DB_password

# 3. VOLUME
volumes:
- name: app-secret-volume
  secret:
    secretName: app-secret
```    


#### 8.2.4.2. Encrypting Secret Data at Rest

Secrets are not encrypted, so it is not safer in that sense. However, some best practices around using secrets make it safer. As in best practices like:

- Not checking-in secret object definition files to source code repositories.
- Enabling Encryption at Rest for Secrets so they are stored encrypted in ETCD. 
  - Read more about [Encrypting Confidential Data at Rest](https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/)
  - Or [here](https://www.youtube.com/watch?v=MTnQW9MxnRI)

#### 8.2.4.3. Secret Store Providers

- Third-party secrets store providers: AWS Provider, Azure Provider, GCP Provider, Vault Provider (HashiCorp Vault)
- Helm Secrets plugin

## 8.3. Scale Applications

- See [Deployments, Rolling updates and Rollback section](#81-rolling-updates-and-rollbacks)

## 8.4. Multi Container Pods

```yaml
# pod-definition.yaml

apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx:1.14.2
    ports:
    - containerPort: 80
  - name: nginx-2
    image: nginx:1.14.2
    ports:
    - containerPort: 81
```

### 8.4.1. Multi-container Pods Design Patterns

- Sidecar (e.g. service and logging containers)
- Adapter
- Ambassador

## 8.5. InitContainers

```yaml
# pod-definition.yaml
# initContainer must run to a completion before the real container hosting the application starts. 

apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  labels:
    app: myapp
spec:
  containers:
  - name: myapp-container
    image: busybox:1.28
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
  initContainers:
  - name: init-myservice
    image: busybox
    command: ['sh', '-c', 'git clone <some-repository-that-will-be-used-by-application> ; done;']
```

## 8.6. Self Healing Applications

Kubernetes supports self-healing applications through ReplicaSets and Replication Controllers. The replication controller helps in ensuring that a POD is re-created automatically when the application within the POD crashes.

## 8.7. Intro to Autoscaling


### 8.7.1. Scaling Cluster Infra vs Scaling Workloads

- **Scaling Cluster Infra** by increasing number of nodes horizontally or increasing size of resources (CPU, RAM) on existing node
- **Scaling Workloads** by increasing the number of pods horizontally or increase resources allocated to existing pods

### 8.7.2. Manual vs Automated Scaling

- **Manual Scaling** of 
  - Cluster Infra:
    - Horizontally: `kubeadm join ...`
    - Vertically: rare
  - Workloads:
    - Horizontally: `kubectl scale ...`
    - Vertically: `kubectl edit ...`
- **Automatied Scaling** of
  - Cluster Infra:
    - **Cluster Autoscaler**
  - Workloads:
    - [Horizontal Pod Autoscaler (HPA)](#88-horizontal-pod-autoscaler-hpa)
    - [Vertical Pod Autoscaler (VPA)](#89-vertical-pod-autoscaling-vpa)


### 8.7.3. Horizontal Pod Autoscaler (HPA)

- Increate the running instances of application horizontally
- HPA relies on 
  - **Metrics Server** or **Custom Metrics Adapter** for *internal sources*
  - **External Adapter** for e.g. DataDog, Dynatrace etc.

#### 8.7.3.1. Scaling a workload manually

```sh
# Manually check the load and increase replicas

kubectl top pod my-app-pod
kubectl scale deployment my-app --replicas=3
```

#### 8.7.3.2. HPA

HPA:
  - Observes metrics
  - Adds pods
  - Balances thresholds
  - Tracks multiple metrics

```sh
# IMPERATIVE: Create HPA for specific deployment

kubectl autoscale deployment my-app \
          --cpu-percent=50 --min=1 --max=10                       # CPU thresholds of 50% and min 1 pod and max 10 pods
```

```yaml
# DECLARATIVE: Create HPA for specific deployment

apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: php-apache
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app
  minReplicas: 1
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 50
```

### 8.7.4. Vertical Pod Autoscaling (VPA)

- Manual:
  - `kubectl edit deployment my-app` and manually change resources
- VPA:
  - Observe metrics
  - Adjust pod resources: e.g. increase the size of resources vertically, such as CPU, RAM
  - Balances threshold

```yaml
apiVersion: "autoscaling.k8s.io/v1"
kind: VerticalPodAutoscaler
metadata:
  name: stress-vpa
spec:
  targetRef:
    apiVersion: "apps/v1"
    kind: Deployment
    name: high-cpu-utilization-deployment
  updatePolicy:
    updateMode: Auto                # Modes: Off, Initial, Recreate and Auto         
  resourcePolicy:
    containerPolicies:
      - containerName: '*'
        minAllowed:
          cpu: 100m
          memory: 50Mi
        maxAllowed:
          cpu: 200m                 # maximum vpa will be allocating this many cpus even if demand is higher.
          memory: 500Mi
        controlledResources: ["cpu", "memory"]
```

#### 8.7.4.1. Deployment of VPA Components

- VPA does NOT come built-in with K8s, but must be deployed
  - `kubectl apply -f https://github.com/kubernetes/autoscaler/releases/latest/download/vertical-pod-autoscaler.yaml`
- VPA includes following pods:
  - `vpa recommender` - continuously monitoring resource usage from Metrics Server and provides recommendation for optimal cpu, ram values
  - `vpa updater` - get an information from recommender and evicts pods needed to be updated with recommended resources
  - `vpa admission controller` - controller then creates new pod with new resources values recommended


### 8.7.5. In-place resize Pods

- As of kubernetes version 1.32, if the resource definition parameter is changed, the default behaviour is delete running instance of pod and spin up a new pod with changes
- **InPlacePodVerticalScaling:** Resize CPU and Memory Resources assigned to Containers without restart
  - FEATURE STATE: K8s v1.27 [alpha][enabled by default:false]
  - Enable feature: `FEaTURE_GATES:InPlacePodVerticalScaling=true`


```yaml
apiVersion: v1
kind: Pod
metadata:
  name: resize-demo
spec:
  containers:
  - name: pause
    image: registry.k8s.io/pause:3.8
    resizePolicy:
    - resourceName: cpu
      restartPolicy: NotRequired                   # Default, but explicit here
    - resourceName: memory
      restartPolicy: RestartContainer
    resources:
      limits:
        memory: "200Mi"
        cpu: "700m"
      requests:
        memory: "200Mi"
        cpu: "700m"
```

#### 8.7.5.1. Limitations

- Only CPU and Memory resources can be changed
- Pod QoS Class cannot change
- InitContainers and Ephemeral COntainers cannot be resized
- Resource requests and limits cannot be removed once set
- A container's memor limit may not be reduced below its usage. If a request pts a container in this state, the resize status will remain in InProgress until the resired memory limit becomes feasible. 


### 8.7.6. VPA vs. HPA

| Feature                  | VPA (Vertical Scaling)                     | HPA (Horizontal Scaling)                                         |
|--------------------------|--------------------------------------------|------------------------------------------------------------------|
| Scaling Method           | Increase CPU & memory of existing Pods     | Adds/Removes Pods based on load                                  |
| Pods Behavior            | Restarts Pods to apply new resource values | Keeps existing Pods running                                      |
| Handles Traffic Spikes?  | NO, because scaling requires a Pod restart | YES, instantly adds more Pods                                    |
| Optimizes Costs?         | Prevents over-provisioning of CPU/RAM      | Avoids unnecessary idle Pods                                     |
| Best for                 | Stateful workloads, CPU/RAM-heavy apps     | Stateless services, web apps, microservices                      |
| Use cases                | DBs, JVM-baseds apps, AI/ML workloads      | Web servers (Nginx, API services), message queues, microservices |



# 9. Cluster Maintenance

## 9.1. OS Upgrade

- Drain and cordon nodes (see Command section)
- Uncordon nodes (see Command section)

## 9.2. Kubernetes Software Versions

Kubernetes version 1.27
- kube-apiserver: v1.27.0
- kube-scheduler: v1.27.0
- kube-controller-manager: v1.27.0
- kubelet: v1.27.0
- kube-proxy: v1.27.0
- etcd: v3.5.7 (or similar, depending on the Kubernetes version)
- coredns: v1.10.1 (or similar, depending on the Kubernetes version)
- container runtime: Versions can vary (e.g., containerd v1.6.0 or Docker v20.10.0)

## 9.3. Cluster Upgrade Process

- Kubenrnetes Supports only 3 last versions
- It is recommended to upgrade one MINOR version at a time. 
- Upgrade possibilies of different versions.

  - kube-apiserver: vX
  ---
  - kube-controller-manager: vX-1
  - kube-scheduler: vX-1
  ---
  - kubelet: vX-2
  - kube-proxy: vX-2
  ---
  - kubectl: vX+1, vX, vX-1
- Upgrade using `kubeadm`
  - `kubeadm upgrade plan`
  - `kubeadm upgrade apply`
- Upgrade Sequence:
  - First Master Node
  - Then Worker Nodes
- Upgrade Strategies of Worker Nodes
    - Upgrade ALL of Worker Nodes at once
    - Upgrade ONE node as a time
    - Add NEW node with new k8s version. I.e. provision new nodes and decomission old one. 

### 9.3.1. `kubeadm upgrade`

Upgrade Master Node:
- `kubeadm upgrade plan`     # `kubeadm` does not upgrade `kubelet`
- `apt-get upgrade -y kubeadm=1.12.0-00` 
- `kubeadm upgrade apply v1.12.0`
- `apt-get upgrade -y kubelet=1.12.0-00`
- `systemctl restart kubelet`

Upgrade Worker Nodes:
- `kubectl drain node-1`
- `apt-get upgrade -y kubeadm=1.12.0-00` 
- `apt-get upgrade -y kubelet=1.12.0-00`
- `kubeadm upgrade node config --kubelet-version 1.12.0`
- `systemctl restart kubelet`
- `kubectl get nodes`
- `kubectl uncordon node-1`

### 9.3.2. Cluster Upgrade - Demo

- Read [more](https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/kubeadm-upgrade/)

### 9.3.3. Backup and Restore Methods

#### 9.3.3.1. Backup Candidates

- Resource Configurations (namespace, configmap, secrets etc.)
  - `kubectl get all --all-namespaces -o yaml > all-resources.yaml`
- ETCD Cluster (Stores information about the state of k8s cluster)
  - ETCD Cluster is hosted on Master Nodes
  - ETCD Cluster data dir to backup `--data-dir=/var/lib/etcd`
  - Create a Snapshot of ETCD with  
    `ETCDCTL_API=3 etcdctl snapshot save etcd_snapshot.db`
  - Restore ETCD from Backup  
    ```sh
    service kube-apiserver stop
    ETCDCTL_API=3 etcdctl snapshot restore etcd_snapshot.db --data-dir /var/lib/etcd-from-backup
    systemctl daemon-reload
    service etcd restart
    service kube-apiserver start
    ```
  - Read more about [backup tools](https://velero.io/docs/v1.15/)
- Persistence Volumes


# 10. Security

## 10.1. Kubernetes Security Primitives

### 10.1.1. Cluster Hosts Security

- All access to cluster host must be secured
- `root` access disabled
- Password based authentication disabled
- SSH Key based authentication enabled

### 10.1.2. Kubernetes Security

- Securing the access to `kube-apiserver` is the first line of diffence
  - **Authentication**, i.e. who can access it?
    - Files - Username and Passwords
    - Files - Username and Tokens
    - Certificates
    - External Authentication providers - LDAP
    - Service Accounts
  - **Authorization**, i.e. what can they do?
    - RBAC Authorization
    - ABAC Authorization
    - Node Authorization
    - Webhook Mode
  
### 10.1.3. TLS Certificates

-  All communication between `kube-apiserver` and
  - ETCD Cluster
  - Kubelet
  - Kube Proxy
  - Kube Scheduler
  - Kube Controller Manager is secured TLS Encryption.

### 10.1.4. Application Communication within Cluster

- By default all Pods can access other Pods within the Cluster
- The Pods access by another Pods can be restricted by [Network Policies](#)


## 10.2. Authentication 

- Users who may access K8s Cluster
  - Users
    - Admins
    - Developers
  - Service Accounts
    - Bots (CI/CD etc.)
  - Application End Users (Usually managed by Application Authentication Management)

### 10.2.1. Users

All user access are managed by `kube-apiserver` whether access with `kubectl` or `curl https://kube-server-ip:6443/` by
 - First **Authenticate Users**
 - Then **Process Requests**

`kube-apiserver` Authentication Mechanisms:

  - Static Password File (not recommended)
  - Static Token File (not recommended)
  - Certificates
  - Identity Services (e.g. third Party Auth protocol LDAP, Cerberus etc.)

#### 10.2.1.1. Basic Authentication Mechanism - Static Password File

```csv
# basic-auth.csv
password123,user1,u001,group1
password123,user2,u002,group2
password123,user3,u003,group3
```

```sh
kube-apiserver --basic-auth-file=/path/to/basic-auth.csv
systemctl restart kube-apiserver
```

Then `kube-apiserver` can be access with

```sh
curl -v -k https://master-node-ip:6443/api/v1/pods -u "user1:password123"
```

#### 10.2.1.2. Basic Authentication Mechanism - Static Token File

```csv
# basic-token-auth.csv
a3f5c8e1d2b4a6e7,user1,u001,group1
9b1e2c3d4f5a6b7c,user2,u002,group2
7e8f9a0b1c2d3e4f,user3,u003,group3
```

```sh
kube-apiserver --token-auth-file=/path/to/basic-token-auth.csv
systemctl restart kube-apiserver
```

Then `kube-apiserver` can be access with

```sh
curl -v -k https://master-node-ip:6443/api/v1/pods --header "Authorization: Bearer a3f5c8e1d2b4a6e7"
```

### 10.2.2. Service Accounts

- `kubectl create serviceaccount sa1`


## 10.3. TLS Certificates in K8s

### 10.3.1. TLS Basics

**Transport Layer Security (TLS)** is primarily associated with securing communications over the internet and it is used in various applications and protocols, like: SSH, HTTPS, Email Protocols(SMTP, IMAP), FPN, FTPS, APIs(RESTful APIs), WebSocket Secure (WSS), DB Connections etc.

- **TLS** certificates are digital certificates that authenticate the identity of a website or server and enable encrypted communication between clients and servers over the internet, ensuring data privacy and integrity during transmission.
- **Key Pair Generation**: When you create a key pair, a cryptographic algorithm (like RSA or ECC) generates two keys: a private key and a public key. These keys are mathematically linked.
- **Private Key**: is used to *decrypt information* or *sign data* and is kept secret.
- **Public Key**: is used to *encrypt information* or *verify signatures* and can be shared with anyone.
- **Certificate Signing Request (CSR)**: includes the public key along with information about the entity requesting a certificate (e.g. organization’s name, domain). When you generate a CSR, you create it using your public key.
- **Certificate (CRT or Digital Certificate)**: contains the public key along with information about the certificate holder (e.g. their identity, domain). It is issued by a Certificate Authority (CA) after verifying the information in the CSR. The CRT allows others to trust that the public key belongs to the entity it claims to represent. I.e. Certificate is so called Validated User ID and Key is Password.
- **Digital Signature**: When you sign data with your private key, others can use your public key to verify that the signature is valid. This ensures that the data hasn’t been tampered with and confirms the identity of the sender.
- **Root Certificate** is a special type of digital certificate that belongs to a trusted organization called a Certificate Authority (CA).
- **Certificate Authority (CA)**: An entity that issues digital certificates, verifying the identity of the certificate holder and ensuring the integrity of the public key.

#### 10.3.1.1. Private vs Public Key

- Key Pair
- Data can be encrytped with ANY of them and ONLY decrypted with other
- Data can NOT be encrypted with one and descrypted with the same key
- If data is encrypted with Private Key, anyone who has Public Key can decrypt data!
- **Signing** is done with a private key and **Verification** is done with a public key
- **Encryption** is done with a public key and **Decryption** is done with a private key

#### 10.3.1.2. Symmetric Encryption

Symmetric encryption is a cryptographic method where the same key is used for both encrypting and decrypting data, ensuring that only parties with the shared key can access the original information.

#### 10.3.1.3. Asymmetric Encryption

Asymmetric encryption is a cryptographic method that uses a pair of keys—a public key for encryption and a private key for decryption-allowing secure communication where the public key can be shared openly while the private key remains confidential.

#### 10.3.1.4. Asymmetric Encryption - SSH

Asymmetric encryption in SSH (Secure Shell) uses a pair of keys—a public key and a private key—to secure communications between a client and a server. The public key is shared with the server, while the private key remains confidential on the client.

#### 10.3.1.5. Asymmetric Encryption - HTTPS

In **HTTPS** (Hypertext Transfer Protocol Secure), **both symmetric and asymmetric encryption are used** to secure communications between a web browser and a server:

- **Asymmetric Encryption**: Initially used during the SSL/TLS handshake process to establish a secure connection. The server presents its public key to the client, allowing the client to encrypt a shared secret (session key) that only the server can decrypt with its private key. This ensures that the client is communicating with the legitimate server.
- **Symmetric Encryption**: Once the secure connection is established and the session key is shared, symmetric encryption is used for the actual data transmission. This is because symmetric encryption is faster and more efficient for encrypting large amounts of data compared to asymmetric encryption.


#### 10.3.1.6. Certificate Authority (CA)

- Public CAs have also Private and Public Keys
  - Private CA Service can be hosted within ones infrastructure
- CA uses Private Key to **sign** Certificates
- Public Keys of CAs are available in e.g. Browsers (Trusted Root Certification Authorities)
- Browser uses Public Key of CA to **verify** that a specific Certificate was signed with Private Key of Official CA


Public CAs:
- Symantec
- Comodo
- GlobalSign
- Digicert

#### 10.3.1.7. Naming Convention of Public and Private Keys

- Certificate (Public Key)
  - *.crt, *.pem: 
    - server.crt
    - server.pem
    - client.crt
    - client.pem
- Private Key
  - *.key, *-key.pem:
    - server.key
    - server-key.pem
    - client.key
    - client-key.pem

#### 10.3.1.8. TLS Use Cases

- Admins generate Key Pairs to secure SSH
- Web Server has Key Pairs to secure Website with HTTPS
- CA Generates its own Key Pairs to sign/verify Certificates
- End Users/Browser only generates single Symetric Key



### 10.3.2. TLS in Kubernetes

- Root Certificates (on CA Servers)
- Server Certificates signed by CA (on Servers)
- Client Certificates signed by CA (on Clients)


**Certificate Authority**

- CA
  - ca.crt, ca.key

**Server Certificates for Servers**

- kube-apiserver (server)
  - kube-apiserver.crt, kube-apiserver.key
- etcd (server)
  - etcd.crt, etcd.key
- kubelet (server)
  - kubelet.crt, kubelet.key

**Client Certificates for Clients**

- kube-apiserver (client)
  - etcd (server)
    -  kube-apiserver-etcd.crt, kube-apiserver-etcd.key
  - kubelet (server)
    -  kube-apiserver-kubelet.crt, kube-apiserver-kubelet.key
- kubelet (client)
  - kube-apiserver (server) 
    - kubelet-kube-apiserver.crt, kubelet-kube-apiserver.key
- admin (client)
  - kube-apiserver (server)
    - admin-kube-apiserver.crt, admin-kube-apiserver.key
- kube-scheduler (client)
  - kube-apiserver (server)
    - kube-scheduler-kube-apiserver.crt, kube-scheduler-kube-apiserver.key
- kube-controller-manager (client)
  - kube-apiserve (server)
    - kube-controller-manager-kube-apiserver.crt, kube-controller-manager-kube-apiserver.key
- kube-proxy (client)
  - kube-apiserve (server)
    - kube-proxy-kube-apiserver.crt, kube-proxy-kube-apiserver.key


### 10.3.3. TLS in Kubernetes - Certificate Creation

Tools to create certificates
- EASYRSA
- OPENSSL
- CFSSL


```sh
# CA --------------------------------------------------------------------------

# Generate Private Key ca.key for CA
openssl genrsa -out ca.key 2048

# Generate Certificate Signing Request (CSR) ca.crs using ca.key for CA. CSR is a certificate with all your details but without signature
openssl req -new -key ca.key -subj "/CN=KUBERNETES-CA" -out ca.csr

# Sign (ROOT) Certificate ca.crt using ca.csr and ca.key for CA (self-signed). CA ca.crt must be in ALL k8s hosts (servers/clients)
openssl x509 -req -in ca.csr -signkey ca.key -out ca.crt



# CLIENT Certificates ---------------------------------------------------------

# Generate Private Key admin.key for Admin
openssl genrsa -out admin.key 2048

# Generate Certificate Signing Request (CSR) admin.crs using admin.key for Admin. CSR is a certificate with all your details but without signature. Certificate is so called Validated User ID and Key is Password
# "/CN=kube-admin" is admin name which e.g. appears in audit logs
# "/O=system:masters" is a Group Detail added to Certificate to differentiat admin user from simple user. 
# Groups named "system:masters", "system:kube-scheduler", "system:kube-controller-manager", "system:kube-proxy", "system:nodes" exists in k8s with admin/relevant priviledges
openssl req -new -key admin.key -subj "/CN=kube-admin/O=system:masters" -out admin.csr

# Sign Admin admin.crt using ca.csr and ca.key. CA Key Pair is used to sign all server and client certificates
openssl x509 -req -in ca.csr -signkey ca.key -out admin.crt



# SERVER Certificates ---------------------------------------------------------

# Generate Private Key kube-apiserver.key for kube-apiserver
openssl genrsa -out kube-apiserver.key 2048

# Generate Certificate Signing Request (CSR) kube-apiserver.crs using kube-apiserver.key for kube-apiserver. CSR is a certificate with all your details but without signature
openssl req -new -key kube-apiserver.key -subj "/CN=kube-apiserver" -out kube-apiserver.csr -config openssl.cnf

# openssl.cnf
[req]
req_extensions = v3_req
distinguished_name = req_distinguished_name
[ v3_req ]
basicConstraints = CA:FALSE
keyUsage = nonRepudiation,
subjectAltName = @alt_names
[alt_names]                        # Only clients refering to kube-apiserver by defined names can establish valid connection
DNS.1 = kubernetes
DNS.2 = kubernetes.default
DNS.3 = kubernetes.default.svc
DNS.4 = kubernetes.deafult.svc.cluster.local
IP.1 = 10.96.0.1
IP.2 = 172.17.0.87

# Sign kube-apiserver kube-apiserver.crt using ca.csr and ca.key. CA Key Pair is used to sign all server and client certificates
openssl x509 -req -in kube-apiserver.csr -signkey ca.key -out kube-apiserver.crt
```


### 10.3.4. View Certificate Details

```sh
# View Certificate Details and Perform a healthcheck of Certificates ----------
# Check Details:
#   - Common Name (e.g. kube-apiserver)
#   - Subject Alternative Name (kubernetes, kubernetes.default etc.)
#   - Validity (e.g. expirity date)
#   - Issuer (e.g. CA)
#   - See https://kubernetes.io/docs/setup/best-practices/certificates/ or https://github.com/mmumshad/kubernetes-the-hard-way/tree/master/tools

openssl x509 -in /etc/kubernetes/pki/apiserver.crt -text -noout


# Show certificate of server --------------------------------------------------

openssl s_client -connect <ip-of-host>


# Inspect Service Logs --------------------------------------------------------

journalctl -u etcd.service -l

kubectl logs etcd-master
```


## 10.4. Certificate API

- In a Kubernetes cluster, a **Certificate Authority (CA) server** is responsible for managing and issuing digital certificates
- If a new developer needs to access k8s cluster, he/she must create Private Key and provide CSR which then will be signed with CA private key on CA server by k8s admins
- The built-in **Certificate API** in Kubernetes is a set of resources and functionalities that facilitate the management of TLS certificates within a Kubernetes cluster (e.g. sign and rotate certificates etc.)
  - Admin creates `CertificateSigningRequest` object (e.g. Instead of signing to CA server and signing certificate manually)
  - Request then can be reviewed
  - And approved using `kubectl get csr && kubectl certificate approve <name-of-csr>` commands
  - Certificates then can be extracted and shared with users with `kubectl get csr <name-of-csr> -o yaml && echo "certificate-encoded-in-base64" | base64 --decode`
  - **Kube Controller Manager** is responsible for operations with certificates (components: CSR-APPROVING, CSR-SIGNING)


### 10.4.1. Steps to generate certificate for a new User

```sh
# USER creates Private Key and CSR
openssh genrsa -out jane.key 2048
openssl req -new -key jane.key -subj "/CN=jane" -out jane.csr


# ADMIN encodes in with base64, creates CertificateSigningRequest object, approve and share certificate with user
cat jane.csr | base64 -w 0


apiVersion: certificates.k8s.io/v1
kind: CertificateSigningRequest
metadata:
  name: jane
spec:
  request: <base64-encoded-csr>
  expirationSeconds: 600
  usages:
    - digital signature
    - key encipherment
    - server auth


kubect get csr
kubect certificate approve jane
kubectl get csr <name-of-csr> -o yaml 
echo "certificate-encoded-in-base64" | base64 --decode
```

## 10.5. KubeConfig

```sh
# View KubeConfig
kubectl config view --kubeconfig=/custom/path/to/config
kubectl config use-context prod-user@production
kubectl config -h

```

```sh
# Authenticate using Certificates with curl,kubectl or define all values in $HOME/.kube/config

curl https://kube-apiserver:6443/api/v1/pods --key admin.key --cert admin.crt --cacert ca.crt
kubect get pods --server kube-apiserver:6443 --client-key admin.key --client-certificate admin.crt --certificate-authority ca.crt


# $HOME/.kube/config
apiVersion: v1
kind: Config
current-context: kubernetes-admin@kubernetes-cluster
clusters:                                     # Clusters (e.g. dev, prod, google)
- name: kubernetes-cluster
  cluster:
    certificate-authority: ca.crt             # alternatively use "certificate-authority-data: <base64-encoded-certificate>"
    server: https://kube-apiserver:6443
kind: Config
users:                                        # Users (e.g. admin, devuser, produser)
- name: kubernetes-admin
  user:
    client-certificate: admin.crt
    client-key: admin.key
contexts:                                     # Contexts (<user>@<cluster> e.g. admin@dev, devuser@prod)
- name: kubernetes-admin@kubernetes-cluster
  context:
    cluster: kubernetes-cluster
    user: kubernetes-admin
    namespace: kubernetes-namespace
```

## 10.6. Persistent Key/Value Store

## 10.7. API Group

**API groups** make it easier to extend the Kubernetes API. The API group is specified in a *REST path* and in the *apiVersion field* of a serialized object.
  - /metrics
  - /healthz
  - /version
  - /logs
  - /api (responsible for cluster functionality)
  - /apis (responsible for cluster functionality)

API groups in Kubernetes:

- The **core** (also called legacy) group is found at REST path `/api/v1`. The core group is not specified as part of the apiVersion field, for example, apiVersion: v1.
- The **named groups** are at REST path `/apis/$GROUP_NAME/$VERSION`, more organized and use apiVersion: $GROUP_NAME/$VERSION (for example, apiVersion: batch/v1).


**Core groups:**

- /api
  - /v1
    - namespaces
    - pods
    - rc
    - events
    - endpoints
    - nodes
    - bindings
    - PV
    - PVC
    - configmaps
    - secrets
    - services

**Named groups:**

- /apis
  - /apps (API Groups)
    - /v1 (aka apiVersion)
      - /deployments (aka RESOURCES)
        - list, get, create, delete, update, watch (aka VERBS)
      - /replicasets
      - /statefulsets
  - /extensions
  - /networking.k8s.io
    - /v1
      - /networkpolicies
  - /storage.k8s.io
  - /authentication.k8s.io
  - /certificates.k8s.io
    - /v1
      - /certificatesigningrequests


```sh
# Start Kubectl Proxy (i.e. http proxy service) locally which uses credentials from KubeConfig and provides access to Kube ApiServer
kubectl proxy
# List available API Groups in K8s Cluster/Kube ApiServer
curl https://localhost:6443 -k
```


## 10.8. Authorization

- Admins
- Developers
- Bots


### 10.8.1. Authorization Modes

**Authorization modes** refer to the specific configurations or settings that determine which [authorization mechanisms](#1082-authorization-mechanisms) are active:

- AlwaysAllow
- Node
- ABAC
- RBAC
- Webhook
- AlwaysDeny


### 10.8.2. Authorization Mechanisms

- Node based 
  - used to access within the cluster, e.g. node access to apiserver
- Attribute Based Authorization (ABAC)
  - difficult to manage as it is managed by policy file defined in Kube ApiServer 
  - external access to apiserver 
- Role Based Authorization (RBAC)
- Webhook

```sh
# Flag used to set authorization mode on Kube ApiServer. Authorization check in defined ORDER of authorization mode
---authorization-mode = Node,RBAC,Webhook \\
```


#### 10.8.2.1. **Node Authorizer**

e.g. is managed by certificates
- Kube ApiServer (server)
  - Kubelet (client, certificate group part of "system:node:node1") 
    - Read:
      - Services, Endpoints, Nodes, Pods
    - Write
      - Node status, Pod status, events


#### 10.8.2.2. **ABAC**

e.g. is managed by policy file defined in Kube ApiServer (see below)
- Kube ApiServer (server)
  - User (client, e.g. dev-user-1)
    - Can View, Create, Delete Pods

```json
// ABAC policy file
{"kind": "Policy", "spec": {"user":"dev-user-1", "namespace": "*", "resource": "pods", "apiGroup": "*" }}
```

#### 10.8.2.3. **RBAC**

e.g. is managed by policy file defined in Kube ApiServer
- Kube ApiServer (server)
  - Developers
    - User (client, e.g. dev-user-1)
      - Can View Pods
  - Admins
    - User (client, e.g. admin-user-1)
      - Can View, Create, Delete Pods

#### 10.8.2.4. Webhook

- Authorization managed by external tool
  - Open Policy Agent


### 10.8.3. RBAC


**Roles** and **RoleBindings** are namespaces, i.e. created within namespace. They created in `default` namespace if the namespace is not defined in description file.

```sh
# Check RBAC

kubectl roles
kubectl rolebindings
kubectl auth can-i --list 
```

1. Create a Role 
    ```yaml
    # Role definition file developer-role.yaml
    apiVersion: rbac.authorization.k8s.io/v1
    kind: Role
    metadata:
      name: developer-role
      namespace: dev-namespace
    rules:
      - apiGroups: [""]                       # "" indicates the core API group
        resources: ["pods", "services"]
        verbs: ["get", "list", "create", "update", "delete"]
        resourceName: ["blue", "orange"]      # Specify Pod Names
      - apiGroups: ["apps"]                   # For resources in the apps API group
        resources: ["deployments"]
        verbs: ["get", "list", "create", "update", "delete"]
    ```

2. Link a Role to User
    ```yaml
    # Bind a Role to User in developer-rolebinding.yaml
    apiVersion: rbac.authorization.k8s.io/v1
    kind: RoleBinding
    metadata:
      name: developer-rolebinding
      namespace: dev-namespace
    subjects:
      - kind: User
        name: dev-user
        apiGroup: rbac.authorization.k8s.io
    roleRef:
      kind: Role
      name: developer-role
      apiGroup: rbac.authorization.k8s.io
    ```


### 10.8.4. Cluster Roles and Role Bindings

**Resources**:
  - **namespaced**
    - pods, replicasets, jobs, deployments, services, secrets, roles, rolebindings, configmaps, PVC
  - **cluster-scoped**
    - nodes 
      - nodes are cluster wide/scoped resources and can not be assosiated to any particular namespace
    - clusterroles
    - clusterrolebindings
    - PV
    - certificatesigningrequests
    - namespaces

```sh
# List namespaced and non-namespaces api-resources
kubectl api-resources --namespaced=true/false
```

E.g. of cluster roles:
- Cluster Admin
  - Can view, create or delete Nodes
- Storage Admin
  - Can view, create or delete PVs/PVCs


```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: cluster-administrator
rules:
  - apiGroups: [""]                  # "" indicates the core API group
    resources: ["nodes"]
    verbs: ["list", "get", "create", "delete"]
```

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: cluster-admin-clusterrolebinding
subjects:
  - kind: User
    name: cluster-admin
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: cluster-administrator
  apiGroup: rbac.authorization.k8s.io
```

## 10.9. Service Accounts

Types of user accounts:
- User account
  - used by humans
- Service account
  - used by machines, bots, application (e.g. Premetheus, Jenkins)
  - has an automatically (must be manually created from version v1.24) created token, stored as secret 
  - every namespace has default service account, which associated to pod on creation

```sh
kubectl get serviceaccount
kubectl create serviceaccount <service-account-name>
```

## 10.10. Image Security

```sh
# Create a secret of type docker-registry
kubectl create secret docker-registry <secret-name> \
--docker-server=string \
--docker-username=user \
--docker-password=password \
--docker-email=email \
[--from-file=[key=]source] [--dry-run=server|client|none]


apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
spec:
  containers:
  - name: nginx-container
    image: nginx:latest
  imagePullSecrets:
  - name: <docker-registry-secret-name>
```

## 10.11. Docker Security

```sh
# Capability of root user list under
cat /usr/include/linux/capability.h
# E.g.: CHOWN, DAC, KILL, SETFCAP, SETPCAP, SETGID, SETUID, NET_BIND, NET_RAW, MAC_ADMIN, BROADCAST, NET_ADMIN, SYS_ADMIN, SYS_CHROOT, AUDIT_WRITE, MANY MORE


# Root user in linux and docker container does not have the same capabilities

# Add or Drop additional capabilities to docker container with
docker run --cap-add MAC_ADMIN ubuntu
docker run --cap-drop KILL ubuntu

# Run docker container with all capabilities
docker run --privilided ubuntu 
```

## 10.12. Security Context

```sh
apiVersion: v1
kind: Pod
metadata:
  name: ubuntu-sleep-pod
  labels:
    app: ubuntu-sleep
spec:
  securityContext:    # Pod Level Security Context
    runAsUser: 1000   # Run the container as user ID 1000
    runAsGroup: 3000  # Run the container as group ID 3000
    fsGroup: 2000     # Set the group ID for mounted volumes
  containers:
    - name: ubuntu-container
      image: ubuntu:latest
      command: ["sleep"]
      args: ["3600"]
      securityContext:    # Container Level Security Context
        runAsUser: 1000   # Run the container as user ID 1000
        runAsGroup: 3000  # Run the container as group ID 3000
        capabilities:     # Capabilities are supported only in container level
          add: ["MAC_ADMIN"]
```

## 10.13. Network Policies

A **NetworkPolicy** in Kubernetes is a resource that defines rules for controlling the **ingress** and **egress** traffic to and from Pods, allowing administrators to specify which Pods can communicate with each other and with external endpoints.

```sh
# Egress poicity type is not defined, hence egress response traffic not isolated. But egress originiating from db still requires egress policy definition
# Below db only accepts traffic from api-pod on port 3306

apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: db-policy
spec:
  podSelector:
    matchLabels:
      role: db
  policyTypes:
    - Ingress
  ingress:
    - from:
        - podSelector:              # all Pods will be allowed to reach db within defined namespace if podSelector not defined (AND operation)
            matchLabels:
              name: api-pod
          namespaceSelector:        # to restrict Network Policy to specific namespace traffic flow (if - in front of it, then separate rule)
            matchLabels:
              name: prod
        - ipBlock:
            cidr: 192.168.5.10/32   # Allow traffic from specific ip (OR operation with 1st rule "podSelector")
      ports:
      - protocol: TCP
        port: 3306



# Below db only accepts traffic from api-pod on port 3306 AND can push backups to external server with defined ip

apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: db-policy
spec:
  podSelector:
    matchLabels:
      role: db
  policyTypes:
    - Ingress
    - Egress
  ingress:
    - from:
        - podSelector:              # all Pods will be allowed to reach db within defined namespace if podSelector not defined (AND operation)
            matchLabels:
              name: api-pod
      ports:
      - protocol: TCP
        port: 3306
  egress:
    - to:
        - ipBlock:
            cidr: 192.168.5.10/32 
      ports:
      - protocol: TCP
        port: 80
```


## 10.14. Kubectx and Kubens

**kubectx** is a tool to switch between contexts (clusters)
**kubens** is a tool to switch between Kubernetes namespaces

```sh
# kubens and kubectx installation
sudo git clone https://github.com/ahmetb/kubectx /opt/kubectx
sudo ln -s /opt/kubectx/kubectx /usr/local/bin/kubectx
sudo ln -s /opt/kubectx/kubens /usr/local/bin/kubens
```


## 10.15. Custorm Resource Definition (CRD)

- Resource - objects that represent the state of the cluster
  - ReplicaSet
  - Deployments
  - Job
  - CronJob
  - Statefulset
  - Namespace
- Controller -  control loops that manage the lifecycle of resources to maintain the desired state
  - ReplicaSet
  - Deployments
  - Job
  - CronJob
  - Statefulset
  - Namespace


Custom resource

```yaml
# flight-ticket.yaml
apiVersion: flights.com/v1
kind: FlightTicket
metadata:
  name: my-flight-ticket
spec:
  from: Berlin
  to: London
  number: 2
```

Custom Resource Definition (CRD)

```yaml
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: flighttickets.flights.com
spec:
  group: flights.com         # value of "apiVersion" of definition file
  scope: Namespaced
  names:
    kind: FlightTicket       # value of "kind" of definition file
    singular: flightticket
    plural: flighttickets
    shortnames:
      - ft
  versions:
  - name: v1
    served: true
    storage: true
    schema:
      openAPIV3Schema:
        type: object
        properties:
          spec:
            type: object
            properties:
              from:
                type: string
              to:
                type: string
              number:
                type: integer
                minumum: 1
                maximum: 10
```

```sh
kubectl create -f flight-ticket.yaml
kubectl get flightticket
kubectl delete flightticket
```

## 10.16. Custom Controllers

To create Custom Controller
- Install Go
- Clone [sample of custom controller](https://github.com/kubernetes/sample-controller)
- Customize controller.go
- Build it with `go build -o sample-controller .`
- Run it with `./sample-controller -kubeconfig=$HOME/.kube/config`
  - Custom Controller can be containerized and run as k8s pod


```go
// flightticket_controller.go
package flightticket

var controllerKind = 
apps.SchemeGroupVersion.WithKind("Flightticket")

// Run begins watching and syncing
func (dc *FligjtTicketController) Run (worker int, stopCh <-chan struct{})

// Cal BookFlightAPIReplicaSet
func (dc *FlightTicketController) callBookFlightAPI(obj interface{})
```

## 10.17. Operator Framework

- Operator Framework can be used to package Custom Resource Definition and Custom Controller together as simple entity
- **etcd operator** is famous example to deploy and manage an etcd cluster within kubernetes
  - CRS
    - EtcdCluster
    - EtcdBackup
    - EtcdRestore
  - CC
    - ETCD Controller
    - Backup Operator
    - Restore Operator
- Check [OperatorHub.io](https://operatorhub.io/) for available operators


# 11. Storage

## 11.1. Docker Storage

- Storage Drivers
- Volume Drivers

### 11.1.1. Docker Storage Drivers and File Systems

**Storage Drivers** in Docker enables Layered Architecture and helps to manage storage on images and containers. Common Storage Drivers:
- AUFS (default SD on Ubuntu)
- ZFS
- BTRFS
- Device Mapper
- Overlay
- Overlay2

By default Docker stores data in
- /var/lib/docker
  - /aufs
  - /containers      (layered architecture, transient, **container layers are read/write**)
  - /image           (layered architecture, **image layers are read-only**)
  - /volumes
    - /data_volume
      ```sh
      # Volume created with
      docker volume create data_volume 
      # and use either with VOLUME MOUNT: 
      docker run -v data_volume:/var/lib/mysql mysql 
      # BIND MOUNT: 
      docker run -v /data/mysql:/var/lib/mysql mysql
      docker run --mount type=bind, source=/data/mysql, target=/var/lib/mysql mysql
      ```

### 11.1.2. Volume Driver Plugins in Docker

**Volumes** in Docker are handled by **Volume Driver Plugins** and not by Storage Drivers.

Volume Driver Plugins:
- Local (default)
- Azure File Storage
- Convoy
- DigitalOcean Block Storage
- Flocker
- gce-docker
- GlusterFS
- NetApp
- RexRay
- Portworx
- VMware vSphere Storage

```sh
# AWS Cloud Storage, Amazon EBS
docker run -it --name mysql --volume-driver rexray/ebs --mount src=ebs-vol, target=/var/lib/mysql mysql
```

## 11.2. Container Interfaces

**Kubernetes**:
- **Container Runtime Interface (CRI)**
  -   rkt
  -   docker
  -   cri-o
- **Container Network Interface (CNI)**
  - waveworks
  - flannel
  - cilium
- **Container Storage Interface (CSI)**
  - portworx
  - Amazon EBS
  - DELL EMC
  - GlusterFS


### 11.2.1. Container Storage Interface (CSI)

Container Storage Interface (CSI) is not kubernetes specific but universal standard which enables any orchestration tool to work with any storage vendor. Currently Kubernetes, Cloud Foundry and Mesos are with CSI. CSI definces RPCs as:
- CreateVolume
- DeleteVolume
- ControllerPublishVolume

## 11.3. Volumes

### 11.3.1. Volumes and Mounts

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: random-number-generator
spec:
  containers:
  - image: alpine
    name: alpine
    command: ["/bin/sh","-c"]
    args: ["shuf -i 0-100 -n 1 >> /opt/number.out;"]
    volumeMounts:
    - mountPath: /opt
      name: data-volume
  
  volumes:
  - name: data-volume
    hostPath:                             # hostPath (bounded to node)
      path: /data
      type: Directory
```

### 11.3.2. Volume Types

Volume Types:
- NFS
- GlusterFS
- Flocker
- Ceph
- Scaleio
- AWS


```yaml
volumes:
- name: data-volume
  hostPath:                             # hostPath (bounded to node)
    path: /data
    type: Directory


volumes:
- name: data-volume
  awsElasticBlockStore:                 # awsElasticBlockStore (not bounded to node)
    volumeID: <volume-id>
    fsType: ext4
```

## 11.4. Persistent Volumes (PV)


**Persistent Volumes (PV)** is a cluster-wide pool of storage volumes configured by administrator. Resources can select storage from PV pool using **Persistent Volume Claims (PVC)**.


```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-vol1
spec:
  accessModes:                                    # accessMode - how a volume should be mounted on the host
    - ReadWriteOnce                               # ReadOnlyMany, ReadWriteOnce, ReadWriteMany
  persistentVolumeReclaimPolicy: Retain           # Defines what happens to the volume when it is released. Recycle, Delete, Retain (will not be deleted)
  capacity:
    storage: 1Gi
  # 1. Option
  hostPath:                                       # Not for PROD
    path: /tmp/data
  # 2. Option
  awsElasticBlockStore:
    volumeID: <volume-id>
    fsType: ext4
```

## 11.5. Persistent Volume Claims (PVC)

Resources will be boind to a single Persistent Volume (PV) by Persistent Volume Claims (PVC). During the bind following criterias are considered:
- Sufficient Capacity
- Access Modes
- Volume Modes
- Storage Class
- Selector (is used to bind PVC to specific PV)


```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-persistent-volume-claim
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 500Mi
---
apiVersion: v1
kind: Pod
metadata:
  name: mypod
spec:
  containers:
    - name: myfrontend
      image: nginx
      volumeMounts:
      - mountPath: "/var/www/html"
        name: mypd
  volumes:
    - name: mypd
      persistentVolumeClaim:
        claimName: my-persistent-volume-claim
```

## 11.6. Storage Class

### 11.6.1. Static Provisioning of Volume

- Before PV is created a disk on e.g. google-cloud must be created manually

```sh
gcloud beta compute disks create --size 1GB --region us-east1 pd-disk
```

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-persistent-volume-claim
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 500Mi
```

### 11.6.2. Dynamic Provisioning of Volume

- PV Definition is not needed for DPV but created automatically by StorageClass

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: google-storage
provisioner: kubernetes.io/gce-pd
parameters:
  type: pd-standard
  replication-type: none
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-persistent-volume-claim
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: google-storage               # Definition of storageClassName to dynamically define PV and create disk
  resources:
    requests:
      storage: 500Mi
```

# 12. Networking
# 13. Design and Install a Kubernetes Cluster
# 14. Install "K8s the kubeadm way"
# 15. Helm Basics
# 16. Kustomize Basics
# 17. End to End tests on a K8s Cluster
# 18. Troubleshooting
# 19. Other Topics
# 20. Ligtning Labs
# 21. Mock Exams
# 22. Course Conclusion


# 23. Commands

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

kubectl get configmaps

kubectl get secrets
kubectl get secret app-secret -o yaml

kubectl get hpa

kubectl get all --all-namespaces -o yaml > all-resources.yaml                 # Backup all resource configurations

kubectl get serviceaccount

kubectl get roles

kubectl get rolebindings





# DESCRIBE

kubectl describe pod myapp-pod
kubectl describe node kubemaster






# APPLY

kubectl apply -f object-definition-file.yaml                                   # Create or Update (DEFAULT Rolling Update) k8s object 
kubectl apply -f /path/to/object-definition-files





# CREATE

kubectl create deployment --image=nginx nginx --namespace=dev
kubectl create deployment my-deployment --image=nginx nginx --replicas=3 --dry-run=client -o yaml

kubectl create service nodeport myapp-service --tcp=8080:8080 --dry-run=client -o yaml

kubectl create namespace dev

kubectl create configmap <config-name> --from-literal=APP_COLOR=blue
kubectl create configmap <config-name> --from-file=app_config.properties

kubectl create secret generic <secret-name> --from-literal=<key>=<value>
kubectl create secret generic <secret-name> --from-file=<path-to-file>

kubectl create serviceaccount <service-account-name>
kubectl create token <service-account-name>

kubectl create secret docker-registry <secret-name> \
--docker-server=string \
--docker-username=user \
--docker-password=password \
--docker-email=email [--from-file=[key=]source] [--dry-run=server|client|none]



# EXEC

kubectl exec etcd-master -n kube-system etcdctl get / --prefix -keys-only





# RUN

kubectl run nginx --image=nginx --namespace=default --dry-run=client -o yaml
kubectl run nginx --image=nginx -- <arg1> <arg2> ... <argN>
kubectl run nginx --image=nginx --command -- <cmd> <arg1> <arg2> ... <argN>






# EDIT

kubectl edit replicaset






# LABEL

kubectl label nodes <node-name> <label-key>=<label-value>





# REPLACE

kubectl replace --force -f replicaset-definition.yaml





# SCALE

kubectl scale --replicas=6 -f replicaset-definition.yaml
kubectl scale --replicas=6 -f replicaset myapp-rs





# AUTOSCALE 

kubectl autoscale deployment foo --cpu-percent=50 --min=1 --max=10                # Create HPA for a deployment "foo" with CPU thresholds of 50% and min 1 pod and max 10 pods




# DELETE

kubectl delete replicaset myapp-replicaset               # deletes all underlying Pods 





# CONFIG

kubectl config -h
kubectl config view --kubeconfig=/custom/path/to/config
kubectl config use-context <user-name>@<cluster-name>
kubectl config set-context $(kubectl config current-context) --namespace=dev





# TAINT

kubectl taint nodes <NODE-NAME> <KEY>=<VALUE>:<TAINT-EFFECT>                    # TAINT-EFFECTs: NoSchedule, PreferNoSchedule, NoExecute
kubectl taint nodes <NODE-NAME> <KEY>=<VALUE>:<TAINT-EFFECT>-                   # UNTAINT




# LOGS

kubectl logs -f <pod-name>
kubectl logs -f <pod-name> [container-name]




# AUTH

kubectl auth can-i --list                                                      # check current user permissions
kubectl auth can-i <verb> <resource> -n <namespace> --as <user-name>           # check if the current user can perform a specific action on a resource
kubectl auth can-i create pods -n <namespace> --as dev-user                                  




# ROLLOUT

kubectl rollout status deployment/<depoyment-name>                                 # Check the status of a rollout
kubectl rollout history deployment/<depoyment-name>                                # Show the history of rollouts
kubectl rollout undo deployment/<depoyment-name> --to-revision=<revision_number>   # Undo a rollout to the specific revision




# DRAIN

kubectl drain <node-name>                                   # drain the node (will be marked as unschedulable) for maintenance purpose to gracefully terminate pods running on it and to reschedule them. 




# CORDON

kubectl cordon <node-name>                                  # cordon node (mark as unschedulable) so that no new pods are scheduled on it





# UNCORDON

kubectl uncordon <node-name>                                # uncordon the node so that pods can be scheduled on it after drain





# KUBE-CONTROLLER-MANAGER

kube-controller-manager --pod-eviction-timeout=5m0s                          # set time to wait pods to be evicted. I.e. control plane waits 5 minutes before considering the pod as dead and redeploy it





# ETCDCTL

ETCDCTL_API=3 etcdctl member list
ETCDCTL_API=3 etcdctl snapshot save etcd_snapshot.db \
                      --endpoints=https://127.0.0.1:2379 \
                      --cacert=/etc/etcd/ca.crt \
                      --cert=/etc/etcd/etcd-server.crt \
                      --key=/etc/etcd/etcd-server.key
ETCDCTL_API=3 etcdctl snapshot status etcd_snapshot.db
ETCDCTL_API=3 etcdctl snapshot restore etcd_snapshot.db --data-dir /var/lib/etcd-from-backup

```

# 24. References

- [Certified Kubernetes Administrator (CKA) with Practice Tests by Mumshad Mannambeth](https://www.udemy.com/course/certified-kubernetes-administrator-with-practice-tests)
- [Kubernetes Commands](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands)