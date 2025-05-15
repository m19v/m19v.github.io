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
  - [3.4. Workload Identity Federation](#34-workload-identity-federation)
  - [3.5. IAM and Organization Policy](#35-iam-and-organization-policy)
  - [3.6. Policy Intelligence](#36-policy-intelligence)
- [4. Configuring Virtual Private Cloud for Isolation and Security](#4-configuring-virtual-private-cloud-for-isolation-and-security)
  - [4.1. Virtual Private Cloud (VPC) firewalls](#41-virtual-private-cloud-vpc-firewalls)
    - [4.1.1. Configuring VPC Firewalls](#411-configuring-vpc-firewalls)
  - [4.2. Load balancing and SSL policies](#42-load-balancing-and-ssl-policies)
  - [4.3. Interconnect and Peering options](#43-interconnect-and-peering-options)
  - [4.4. Connecting to GC](#44-connecting-to-gc)
  - [4.5. VPC Service Controls](#45-vpc-service-controls)
    - [4.5.1. Private Google API access](#451-private-google-api-access)
- [5. Access Context Manager](#5-access-context-manager)
- [6. VPC Flow Logs](#6-vpc-flow-logs)
  - [6.1. Configuring and Using VPC Flow Logs in Cloud Logging](#61-configuring-and-using-vpc-flow-logs-in-cloud-logging)
  - [Log Explorer](#log-explorer)
- [7. Cloud IDS](#7-cloud-ids)
- [8. References](#8-references)


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

## 3.4. Workload Identity Federation

## 3.5. IAM and Organization Policy 

A Policy is a collection of access statements. Each policy contains a set of roles and role members.

- Allow policy
- Deny policy


**Organization Policies** focus on **what**, and lets the administrator set restrictions on specific resources, services, or groups of services to determine how they can be configured and used.  
**IAM policies** focus on **who**, and lets the administrator authorize who can take action on specific resources or services based on permissions.  


## 3.6. Policy Intelligence

Policy Intelligence assists through the lifecycle of policy management to manage policies securely. Policy Intelligence gives a suite of tools for troubleshooting, analysis, and recommendations.  

Policy Troubleshooter can be accessed using the 
- Console
  - Simple queries
- Google Cloud CLI
  - Complex Scenarios
- REST API
  - Complex Scenarios


# 4. Configuring Virtual Private Cloud for Isolation and Security

## 4.1. Virtual Private Cloud (VPC) firewalls

A Virtual Private Cloud (or VPC) is a global, private, isolated virtual network partition that provides managed networking functionality for your Google Cloud resources.

Firewall rules:
- Directional 
  - Ingress
  - Egress
- Source or destination
  - The source parameter is only applicable to ingress rules
  - The destination parameter is only applicable to egress rules
- Protocol and port 
  - Rules can be restricted to apply to specific protocols only, or combinations of protocols and ports only
- Action
  - Allow or deny
- Priority 
  - A numerical value from 0 to 65,535, which is used to determine the order the rules are evaluated. Lower number indicates a higher priority and Increased network security.



### 4.1.1. Configuring VPC Firewalls

```sh
# gcloud commands to configure VPC
```


## 4.2. Load balancing and SSL policies

Application Load Balancer or Proxy Network Load Balancer support SSL for encryption in transit.


## 4.3. Interconnect and Peering options

VPC peering allows you to create connectivity across two nonoverlapping VPC networks. Peered networks do not need to be in the same project, or even in the same organization. VPC Network Peering gives you several advantages over using external IP addresses or VPNs to connect networks, including: Decreased network latency.


## 4.4. Connecting to GC

Secure connections to public cloud providers are a concern for all organizations and can be securely accomplished through Cloud VPN or Cloud Interconnect:

- **Cloud VPN** securely connects your peer network to your Virtual Private Cloud network through an IPsec VPN connection.  
- **Cloud Interconnect** extends your on-premises network to Google's network through a highly available, low latency connection.
  - Dadicated Interconnect
    - Minimum bandwidth of 10 Gbps
  - Partner Interconnect
    - - Minimum bandwidth of 50 Mbps


## 4.5. VPC Service Controls

**VPC Service Controls** improve your ability to reduce the risk of data exfiltration from your Google-managed services like Cloud Storage and BigQuery.


### 4.5.1. Private Google API access

**Private Google API Access** enables Compute Engine instances on a VPC subnet to reach Google APIs and services using an internal IP address rather than an external IP address.


# 5. Access Context Manager

**Access Context Manager** is a tool with an API that allows Google Cloud organization administrators to define fine-grained, attribute based access control for projects and resources in Google Cloud.

Access Context Manager reduces the size of your privileged network:
- Access Policies
- Access Levels
  - IP address
  - Device type
  - User identity


# 6. VPC Flow Logs

VPC Flow Logs record network flows sent from or received by VM instances, e.g. geographic details, source and destination IPs, etc. These logs can be used for network monitoring, forensics, real-time security analysis, and even for expense optimization.

## 6.1. Configuring and Using VPC Flow Logs in Cloud Logging

```sh
# gcloud commands for VPC Flow Logs

gcloud auth list                                             # list the active account name
gcloud config list project                                   # list the project ID
gcloud config get-value project


gcloud compute networks subnets update default \
--region us-central1 --enable-flow-logs \
--logging-metadata=include-all


gcloud compute instances create default-us-vm \
--machine-type e2-micro \
--zone=us-central1-f --network=default

```

## Log Explorer

```sh
# type = Subnetwork, Log name = vpc_flows
resource.type="gce_subnetwork"
log_name="projects/qwiklabs-gcp-02-67bdee26242f/logs/compute.googleapis.com%2Fvpc_flows"

# Add FILTERS:
# Access logs for a specific source or destination IP address
jsonPayload.connection.src_ip="10.128.0.2"

# Access logs for specific ports and protocols
jsonPayload.connection.dest_port=22
jsonPayload.connection.dest_port=(80 OR 22)
jsonPayload.connection.protocol=17                       # UDP (protocol #17) and TCP (protocol #6),  ICMP is protocol #1

# E.g.:
resource.type="gce_subnetwork"
log_name="projects/qwiklabs-gcp-02-67bdee26242f/logs/compute.googleapis.com%2Fvpc_flows"
jsonPayload.connection.src_ip="10.128.0.2"
```


# 7. Cloud IDS

**Cloud IDS** is an intrusion detection service that provides threat detection for intrusions, malware, spyware, and command-and-control attacks on your network.

# 8. References

- [Managing Security in Google Cloud](https://www.cloudskillsboost.google/paths/15/course_templates/21)
