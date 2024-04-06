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

## Terraform project structure

```txt
project
    .terraform
        modules
            modules.json
            ...
        provides
            ...
        terraform.tfstate
    .terraform.lock.hcl
    main.tf
```

## Providers

[Terraform providers](https://registry.terraform.io/browse/providers) are plugins that enable interaction with a resource API.

```tf
terraform {
  required_providers {
    ibm = {
      source = "IBM-Cloud/ibm"
      version = ">= 1.12.0"
    }
  }
}
```

## Modules

A Terraform module is 

## State file

_terraform.tfstate:_
- Terraform's representation of the world
- JSON file containing information about every resource and data object
- Contains sensitive info (e.g. database password), hence it should have restricted access and be encrypted 
- Can be stored **locally/local_backend** or **remotely/remote_backend** (in object store like S3 bucket, google cloud storage)

## Terraform basic usage sequence

- terraform init
  - inits project and downloads associated providers to working directory from terraform registry
- terraform plan
  - compares _desired state_ (terraform config) with _actual state_(terraform state).
- terraform apply
  - apply terraform plan using providers
- terraform destroy
  - destroys all resources and data

## Variables and Outputs

### Variable types

- Input variables
  - var.\<name\>

```tf
variable "instance_type" {
  description = "es2 instance type"
  type = string
  default = "t2.micro"
}
```
- Local variables
   - local.\<name>

```tf
locals {
  service_name = "My Service"
  owner = "Devops Directive"
}
```

- Output variables

```tf
output "instance_ip_addr" {
  value = aws_instance.instance.public_ip
}
```

### Setting input variables

(in order of precedence, lowest -> highest)

- Manual entry during plan/apply 
- Default value in declaration block
- `TF_VAR_\<name\>` environment variables 
- terraform.tfvars file
- *.auto.tfvars file
- Command line `-var` or `-var-file`

## Sensitive variables

- Mark variables as sensitive: 
  - `sensitive = true`
- Pass to terraform apply with:
  - `TF_VAR_variable`
  - `-var` (retrieve from secret manager at runtime)
- Can also use external secret store 
  - E.g. AWS Secrets Manager

## Types and validation

### Primitive types

- string
- number
- bool

### Complex types

- list(\<TYP\E>)
- set(\<TYPE\>)
- map(\<TYPE\>)
- object(\{\<ATTR NAME\> = \<TYPE\>, ...\})
- tuple(\[\<TYPE\>, ...\])

### Validation

- Type checking happens automatically
- Custom conditions can also be enforced


## References
- [Terraform Documentation](https://developer.hashicorp.com/terraform)
- [Complete Terraform Course - From BEGINNER to PRO! by DevOps Directive](https://youtu.be/7xngnjfIlK4?si=XT2rH3c0AWKhG03F)
