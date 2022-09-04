---
title: Ansible
---

Published on August 05, 2022  
Updated on September 05, 2022

## Ansible

- Ansible is an open source engine that automates application deployment, orchestration, cloud provisioning etc. 
- It uses human readable YAML syntax for Ansible Playbooks to describe automation jobs. 
- Ansible is agent-less and designed for multi-tier deployment. Connects nodes via ssh by pushing "Ansible modules" which is removed after its execution.

## Environment Setup

### Types of machines:

- Control machine − a system on which Ansible is installed which manages other machines by executing playbook.
- Remote machine − a remote system managed by control machine.

### Control Machine Requirement

- Python 3 or higher

### Installation

**Option 1.** Configure PPA on control machine and install Ansible as follows:

```shell
sudo apt-get update
sudo apt-get install software-properties-common 
sudo apt-add-repository ppa:ansible/ansible $ sudo apt-get update 
sudo apt-get install ansible
```
**Option 2.** Install Ansible using ```python pip```

```shell
python3 -m pip install --user ansible
```

or check official [getting started with Ansible](https://docs.ansible.com/ansible/latest/getting_started/index.html) for complete details!

## Yaml

## Ad-hoc commands

## Playbook

### Running a playbook
```shell
ansible-playbook <YAML>                   # Run on all hosts defined
ansible-playbook <YAML> -f 10             # Run 10 hosts parallel
ansible-playbook <YAML> --verbose         # Verbose on successful tasks
ansible-playbook <YAML> -C                # Test run
ansible-playbook <YAML> -C -D             # Dry run
ansible-playbook <YAML> -l <host>         # Run on single host
```

### Run Infos
```shell
ansible-playbook <YAML> --list-hosts
ansible-playbook <YAML> --list-tasks
```

### Syntax Check
```shell
ansible-playbook --syntax-check <YAML>
```

## Playbook snippets

## Ansible Inventory
A list of managed nodes that are logically organized. You create an inventory on the control node to describe host deployments to Ansible.

## Roles

## Variables

## Advanced execution

## Troubleshooting

## References

- [Getting started with Ansible](https://docs.ansible.com/ansible/latest/getting_started/index.html)
- [Ansible Documentation](https://docs.ansible.com/ansible/latest/)
- [Ansible Cheat Sheet](https://lzone.de/cheat-sheet/Ansible)
- [Cheatsheet for Ansible](https://devhints.io/ansible)