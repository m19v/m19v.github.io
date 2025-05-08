---
title: ArgoCD
---

- [1. Intro](#1-intro)
- [2. CD Workflow without ArgoCD](#2-cd-workflow-without-argocd)
- [3. CD Workflow with ArgoCD](#3-cd-workflow-with-argocd)
- [4. Git as Single Source of Truth](#4-git-as-single-source-of-truth)
- [5. References](#5-references)


# 1. Intro

ArgoCD is a Continuous Delivery Tool. ArgoCD supports k8s yaml files, helm charts and kustomize. 

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
**CD:** ... -> Track and Sync changes by ArgoCD (application cofngiguration repo)...

> **Note:** Best Practice for Git repository is to separate **application source code**, **application configuration** (also called GitOps repository) and **system configuration.**  


# 4. Git as Single Source of Truth



# 5. References

[ArgoCD Tutorial for Beginners](https://youtu.be/MeU5_k9ssrs?si=THME2fb5U9MYR2Ow)