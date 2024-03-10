---
title: Ansible
---

## Ansible

- Ansible is an open source engine that automates application deployment, orchestration, cloud provisioning etc. 
- It uses human readable YAML syntax for Ansible Playbooks to describe automation jobs. 
- Ansible is agent-less and designed for multi-tier deployment. Connects nodes via ssh by pushing "Ansible modules" which is removed after its execution.

## Environment Setup

### Types of machines:

- Control machine − a system on which Ansible is installed which manages other machines by executing playbook.
- Remote machine − a remote system managed by control machine.

### Installation

```shell
apt update
apt upgrade -y

apt install ansible -y
```

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

## WSL Playbook

```shell
curl
zsh
git
exa
zsh-autosuggestions
fzf
direnv
Hack Herd Font
starship

neovim
vim-plug

-----------------

sudo apt update
sudo apt install git

# Create m19v user and group

sudo apt install ansible
```

## Roles

## Variables

## Advanced execution

## Troubleshooting

## References

- [Ansible Documentation](https://docs.ansible.com/ansible/latest/)
- [Ansible Best Practices](https://docs.ansible.com/ansible/2.9/user_guide/playbooks_best_practices.html)
- [Ansible Builtin Modules, Plugins etc.](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/)
