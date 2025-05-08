---
title: Managing Security in Google Cloud
---

- [1. Intro](#1-intro)
- [2. Foundations of Google Cloud Security](#2-foundations-of-google-cloud-security)
  - [2.1. Google's infrastructure security layers](#21-googles-infrastructure-security-layers)
  - [2.2. VPC network security and monitoring](#22-vpc-network-security-and-monitoring)
- [3. Identity and Access Management (IAM)](#3-identity-and-access-management-iam)
  - [3.1. IAM Objects managed by Resource Manager](#31-iam-objects-managed-by-resource-manager)
  - [3.2. IAM Roles](#32-iam-roles)
  - [3.3. Service Accounts](#33-service-accounts)


# 1. Intro

# 2. Foundations of Google Cloud Security

## 2.1. Google's infrastructure security layers
- Operations
- Internet communication
- Data storage
- Service deployment
- Low-level infrastructure (Data Centers)

## 2.2. VPC network security and monitoring

Google Virtual Private Cloud (VPC) is Google Cloud virtual private network to 
    - define resources on a logically isolated network
    - control public internet ingress and egress traffic via firewall rules

# 3. Identity and Access Management (IAM)

## 3.1. IAM Objects managed by Resource Manager

- Organization (e.g.: example.com)
  -  Root Node for Google Cloud resources
  -  Contains all projects and resources
- Folders (folder a, b, dev, prod)
  - Folders offer flexible management
  - Optionally group projects under an Organization (e.g. Departments in Organization) which share common IAM
  - Can contain both projects and other folders
- Projects (project a, b, archive, application, storage, data warehouse)
  - All GC Resources are associated with a project
  - Used to track resource and quota usage
  - Enable billing
  - Manage permissions and credentials
  - Enable services and APIs
- Resources (Compute Engine, Pub/Sub, Cloud Storage, App Engine, Cloud Storage, Bigtable, BigQuery)
- Members
- Roles

## 3.2. IAM Roles

Three kinds of IAM roles in GC
- Basic
  - applied at project or resource level
  - Types of Basic Role:
    - Owner (managing project,e.g.: invite members, remove members, delete project and following)
    - Editor (modify,edit, e.g.: deploy app, modify code, configure service and following)
    - Viewer (read-only)
    - Billing Administrator (manage billing)
- Predefined/Curated
  - are designed to map to job functions: Compute Network Admin, Security Reviewer, etc.
  - a collection of permissions for particular service (e.g. InstanceAdmin Role, Browser Role)
- Custom
  - let define a precise set or permissions

## 3.3. Service Accounts

Service Accounts control server-to-server interactions:
- Used to authenticate from one service to another
- Used to control privileges used by resources

Types of Service Accounts
- Google-managed
- User-managed

Use `gcloud` command-line tool to list all of the keys associated with a Service Account

```sh
gcloud iam service-accounts keys list --iam-account service-account-email-id
```