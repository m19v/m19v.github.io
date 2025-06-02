---
title: ArgoCD
---

- [1. Intro](#1-intro)
- [2. CD Workflow without ArgoCD](#2-cd-workflow-without-argocd)
- [3. CD Workflow with ArgoCD](#3-cd-workflow-with-argocd)
- [4. Git as Single Source of Truth](#4-git-as-single-source-of-truth)
- [5. Easy Rollback](#5-easy-rollback)
- [6. Cluster Disaster Recovery](#6-cluster-disaster-recovery)
- [7. K8s Access Control with Git \& ArgoCD](#7-k8s-access-control-with-git--argocd)
- [8. ArgoCD as K8s extension](#8-argocd-as-k8s-extension)
- [9. Configure ArgoCD](#9-configure-argocd)
- [10. Multiple Clusters with ArgoCD](#10-multiple-clusters-with-argocd)
- [11. Replacement for other CI/CD tools?](#11-replacement-for-other-cicd-tools)
- [12. Demo](#12-demo)
- [13. References](#13-references)


# 1. Intro

ArgoCD is a GitOps Continuous Delivery Tool for Kubernetes. ArgoCD supports k8s yaml files, helm charts and kustomize. 

# 2. CD Workflow without ArgoCD

**CI:** Code commit -> Build,Test -> Build and Push Docker images to Registry -> ...  
**CD:** ... -> Update k8s manifest -> kubectl apply...

Challenges of above approach:
- Install and setup tools like `kubectl`
- Configure access to K8s cluster
- Configure access to Cloud Platform
- Security challenge
- No visibility of deployment status

# 3. CD Workflow with ArgoCD

- Deploy ArgoCD in k8s cluster 
- Configure ArgoCD to track Git repository
- ArgoCD monitors for any changes and applies automatically

**CI:** Code commit -> Build,Test -> Build and Push Docker images to Registry -> Update k8s manifest (in separate repo)...  
**CD:** ... -> Track and Sync changes by ArgoCD (application configuration repo)...

> **Note:** Best Practice for Git repository is to separate **application source code**, **application configuration** (also called GitOps repository) and **system configuration.**  


# 4. Git as Single Source of Truth

- K8s configuration defined as Code in Git repository
- Desired State is defined in Git repository (i.e. manual change of cluster will be reverted,synced with described state in git)
- Git repository is a single interface of version controlled changes

```md
Git Repository (Desired Target State)   <--->   ArgoCD (Sync Agent)   <--->   Kubernetes Cluster (Actual Live State)
```

> **Info:** It is also possible to configure ArgoCD to not sync manual cluster changes automatically but send alert instead. 


# 5. Easy Rollback

- Declarative - declare your desired end state
- `git revert ...` to previous working state
- No need to manually revert every update in the cluster (e.g. `kubectl delete ...` or `helm uninstall ...`)


# 6. Cluster Disaster Recovery

- If cluster A fails, just create new cluster B and refer to declared state in git application configuration repository


# 7. K8s Access Control with Git & ArgoCD

- Manage Cluster Access indirectly via Git
  - No every developer should have access to application configuration git repository, but only create Merge Requests
- No need to create ClusterRole & User resources in K8s
- No need to give access to external CI/CD tools (e.g. Jenkins) to K8s Cluster to apply changes as ArgoCD agent already runs in Cluster and sync desired state
  - No cluster credentials outside of K8s


# 8. ArgoCD as K8s extension

- ArgoCD uses existing K8s functionalities
  - e.g. using etcd to store data
  - e.g. using k8s controllers for monitoring and comparing actual and desired state
- Visibility in the Cluster, which other tools (e.g. Jenkins) does not have


# 9. Configure ArgoCD

1. Deploy ArgoCD into K8s Cluster (Extends K8s API with `crd` Custom Resource Definition)
2. Configure ArgoCD with K8s yaml file
   1. Main Resource is `Application`
        ```yaml
        apiVersion: argoproj.io/v1alpha1
        kind: Application
        metadata:
        name: guestbook
        namespace: argocd
        spec:
        project: default
        source:                                   # desired state
            repoURL: https://github.com/argoproj/argocd-example-apps.git
            targetRevision: HEAD
            path: guestbook
        destination:                              # k8s cluster
            server: https://kubernetes.default.svc
            namespace: guestbook
        ```
    2. Multiple Application can be logically grouped by `AppProject`
        ```yaml
        apiVersion: argoproj.io/v1alpha1
        kind: AppProject
        metadata:
            name: my-project
            namespace: argocd
            # Finalizer that ensures that project is not deleted until it is not referenced by any application
            finalizers:
                - resources-finalizer.argocd.argoproj.io
        spec:
            description: Example Project
            # Allow manifests to deploy from any Git repos
            sourceRepos:
            - '*'
            # Only permit applications to deploy to the guestbook namespace in the same cluster
            destinations:
            - namespace: guestbook
                server: https://kubernetes.default.svc
            # Deny all cluster-scoped resources from being created, except for Namespace
            clusterResourceWhitelist:
            - group: ''
                kind: Namespace
            # Allow all namespaced-scoped resources to be created, except for ResourceQuota, LimitRange, NetworkPolicy
            namespaceResourceBlacklist:
            - group: ''
                kind: ResourceQuota
            - group: ''
                kind: LimitRange
            - group: ''
                kind: NetworkPolicy
            # Deny all namespaced-scoped resources from being created, except for Deployment and StatefulSet
            namespaceResourceWhitelist:
            - group: 'apps'
                kind: Deployment
            - group: 'apps'
                kind: StatefulSet
            roles:
            # A role which provides read-only access to all applications in the project
            - name: read-only
                description: Read-only privileges to my-project
                policies:
                - p, proj:my-project:read-only, applications, get, my-project/*, allow
                groups:
                - my-oidc-group
            # A role which provides sync privileges to only the guestbook-dev application, e.g. to provide
            # sync privileges to a CI system
            - name: ci-role
                description: Sync privileges for guestbook-dev
                policies:
                - p, proj:my-project:ci-role, applications, sync, my-project/guestbook-dev, allow
                # NOTE: JWT tokens can only be generated by the API server and the token is not persisted
                # anywhere by Argo CD. It can be prematurely revoked by removing the entry from this list.
                jwtTokens:
            - iat: 1535390316
        ```


# 10. Multiple Clusters with ArgoCD

- Configure and manage just 1 ArgoCD for development, staging and production clusters
  - Option 1: **Multiple git branch** for each environment (e.g. development, staging and production branches) - NOT BEST PRACTICE
  - Option 2: Using **overlays with Kustomize**
    ```md
    ./myapp-cluster
        - base
            - deployment.yaml
            - kustomization.yaml
            - rbac.yaml
            - service.yaml
        - overlays 
            - deployment
                - kustomization.yaml
            - staging
                - kustomization.yaml
            - production
                - kustomization.yaml
    ```
- Same ArgoCD instance is able to sync a fleet of K8s clusters


# 11. Replacement for other CI/CD tools?

- No, we still need CI Pipeline to test and build application
- ArgoCD is a **Replacement for CD** (Continuous Delivery) specifically for Kubernetes
- ArgoCD alternatives: FluxCD, JenkinsX

# 12. Demo

- Install ArgoCD in K8s cluster
- Configure ArgoCD with `Application` CRD
  - Test it using [demo git repository](https://gitlab.com/nanuchi/argocd-app-config)

# 13. References

[ArgoCD Tutorial for Beginners](https://youtu.be/MeU5_k9ssrs?si=THME2fb5U9MYR2Ow)