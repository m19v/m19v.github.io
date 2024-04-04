---
title: Terraform
---

## What is Terraform?
Terraform is a declarative (i.e. end state to be declared/defined) infrastructure as code tool to automate build, change, and versioning of infrastructure safely and efficiently with
- low-level components: compute instances, storage, networking etc.
- high-level components: DNS entries and SaaS features

## Terraform vs. Ansible
Terraform mainly focuses on infrastructure provisioning while Ansible aims to configure that infrastructure.

## Provisioning cloud resources
Approaches:
- GUI
- API/CLI
- IaC (Infrastructure as Code)

## Categories of IaC tools
- Ad hoc scripts
- Configuration management tools
- Server templating tools
- Orchestration tools
- Provisioning tools

## IaC Provisioning tools landscape

Cloud specific:
- Cloud Foundation
- Azure Resource Manager
- Google Cloud Deployment Manager

Cloud agnostic:
- Terraform
- Pulumi

## Common patterns of terraform usage

- Terraform (Provisioning) + Ansible (Config Management)
- Terraform (Provisioning) + Packer (Server Templating)
- Terraform (Provisioning) + Kubernetes (Orchestration)

## Terraform architecture

```txt
+------------------+
|  Terraform State |
+------------------+ <-----> +----------------+         +--------------+         +-----+
                             | Terraform Core | <-----> | AWS Provider | <-----> | AWS |
+------------------+ ------> +----------------+         +--------------+         +-----+
| Terraform Config |
+------------------+         
```

## References
- [Terraform Documentation](https://developer.hashicorp.com/terraform)
- [Complete Terraform Course - From BEGINNER to PRO! by DevOps Directive](https://youtu.be/7xngnjfIlK4?si=XT2rH3c0AWKhG03F)
