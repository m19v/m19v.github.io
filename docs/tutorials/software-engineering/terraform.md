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

- Modules are containers for multiple resources that are used together. A module consists of a collection of `.tf` and/or `.tf.json` files kept together in a directory
- Modules are the main way to package and reuse resource configurations with terraform

### Types of modules

- **Root module** is a default module containing all `.tf` files in main working directory
- **Child module** is a separate external module referred to from a `.tf` file

### Module sources

- Local paths
  ```tf
  module "consul" {
    source = "./consul"
  }
  ```
- Terraform Registry
  ```tf
  module "consul" {
    source = "hashicorp/consul/aws"
    version = "0.1.0"
  }
  ```
- GitHub
  ```tf
  module "consul" {
    source = "git@github.com:hashicorp/example.git"
  }
  ```
- Bitbucket
- Generic Git, Mercurial repositories
- HTTP URLs
- S3 buckets
- GCS buckets
- Modules in Package Sub-directories

### Good modules

- Raises the abstraction level from base resource types
- Groups resources in a logical fashion
- Exposes input variables to allow necessary customization + composition
- Provides useful defaults
- Returns outputs to make further integrations possible

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
- Command line `-var` or `-var-file`. E.g. `-var="var_name=var_value"`

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

## Expressions

- Types and Values
- Strings and Templates
- References to Values
- Operators - `!, -, *, /, %, >, ==, etc.`
- Function Calls
- Conditional Expressions - `<CONDITION> ? <TRUE VAL> : <FALSE VAL>`
- For Expressions - `[for o in var.list : o.id]`
- Splat Expressions - `var.list[*].id`
- Dynamic Blocks
- Type Constraints
- Version Constraints

## Functions

- Numeric
- String 
- Collection
- Encoding
- Filesystem
- Data & Time
- Hash & Crypto
- IP Network
- Type conversion

## Meta arguments

### `depends_on`

- Terraform automatically generates dependency graph based on references
- If two resources depends on each other (but not each others data), `depends_on` specifies that dependency to enforce ordering
  - e.g. if software on the instance needs access to S3, trying to create the *aws_instance* would fail if atempting to create it before the *aws_aim_role_policy*.
  ```
  resource "aws_instance" "example" {
    ami = "ami-1k2j123j"
    instance_type = "t2.micro"

    iam_instance_profile = aws_iam_instance_profile.example

    depends_on = [
      aws_iam_role_policy.example,
    ]
  }
  ```

### `count`

- Allows for creation of multiple resources/modules from a single block
- Useful when the multiple necessary resources are nearly identical

```tf
resource "aws_instance" "server" {
  count = 4 # create four similar EC2 instances

  ami           = "ami-a1b2c3d4"
  instance_type = "t2.micro"

  tags = {
    Name = "Server ${count.index}"
  }
}
```

### `for_each`

- Allows for creation of multiple resources/modules from a single block
- Allows more control to customize each resource than `count`

```tf
locals {
  subnet_ids = toset([
    "subnet-abcdef",
    "subnet-012345",
  ])
}

resource "aws_instance" "server" {
  for_each = local.subnet_ids

  ami           = "ami-a1b2c3d4"
  instance_type = "t2.micro"
  subnet_id     = each.key # note: each.key and each.value are the same for a set

  tags = {
    Name = "Server ${each.key}"
  }
}
```

### `lifecycle`

- A set of meta arguments to control terraform behavior for specific resources
- *create_before_destroy* can help with zero downtime deployments
- *ignore_changes* prevents terraform from trying to revert metadata being set elsewhere
- *prevent_destroy* causes terraform to reject any plan which would destroy this resource

```tf
resource "azurerm_resource_group" "example" {
  # ...

  lifecycle {
    create_before_destroy = true
  }
}
```

### Inputs + Meta arguments

- input variables are passed in via module block

```tf
module "web_app" {
  source = "./web-app-module"

  # Input variables
  bucket_name = "devops-directive-web-app-data"
  domain = "example.com"
  db_name = "mydb"
  db_user = "foo"
  db_pass = var.db_pass
}

```

## Provisioners

Perform action on local or remote machine

- file
- local-exec
- remote-exec
- vendor
  - chef
  - puppet

## Managing multiple environments

Approaches:
- **Workspaces**: multiple named section within a single backend
```sh
~ terraform workspace list
   default
 * dev
   staging
   production 
```
- **File structure**: directory layout provides separation, modules provide reuse
```txt
_modules
  module-1
    main.tf
    variables.tf
  module-2
    main.tf
    variables.tf
dev
  main.tf
  terraform.tfvars
staging
  main.tf
  terraform.tfvars
production
  main.tf
  terraform.tfvars
```

### Terraform workspaces


## Commands

```sh
terraform workspace list
```

## References
- [Terraform Documentation](https://developer.hashicorp.com/terraform)
- [Terraform Language Documentation](https://developer.hashicorp.com/terraform/language)
- [Complete Terraform Course - From BEGINNER to PRO! by DevOps Directive](https://youtu.be/7xngnjfIlK4?si=XT2rH3c0AWKhG03F)
