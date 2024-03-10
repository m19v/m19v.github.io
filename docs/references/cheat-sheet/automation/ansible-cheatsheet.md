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

## Ansible configuration

### ansible.cfg
```shell
[default]
inventory = nameOfInventoryFile
private_key_file = ~/.ssh/nameOfSSHKey
```

## Ad-hoc commands

## Playbook

## Ansible commands

```shell
ansible all --key-file ~/.ssh/nameOfSSHKey -i inventory -m ping

ansible all --list-hosts

ansible all -m gather_facts
ansible all -m gather_facts --limit ip.address.of.single.host

# sudo apt update to update package index
ansible all -i hosts -m apt -a update_cache=true --become --ask-become-pass

# install tmux
ansible all -i hosts -m apt -a name=tmux --become --ask-become-pass
ansible all -i hosts -m apt -a "name=tmux state=latest" --become --ask-become-pass

# sudo apt dist-upgrade
ansible all -i hosts -m apt -a upgrade=dist --become --ask-become-pass

ansible-playbook --ask-become-pass playbookFileName.yml

# List tags of a playbook
ansible-playbook -i nameOfInventory --list-tags playbookFileName.yml
ansible-playbook -i nameOfInventory --tags "tag1,tag2,tag3" --ask-become-pass playbookFileName.yml

# Syntax check
ansible-playbook --syntax-check <YAML>

# Ansoble Vaults
ansible-vault create secret.yml
ansible-vault edit secret.yml

# Ansoble Galaxy
ansible-galaxy install -r requirements.yml
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

## SSH Overview
### SSH Key-Based Authentication

- Install OpenSSH on server

```bash
# Ubuntu
sudo apt install openssh-server
```

- Create an SSH key pair (with a passphrase) for your normal user account and copy it to target server

```bash

# -t ed25519        type of algorith
# -C                comment to ssh key
ssh-keygen -t ed25519 -C "ansible tutorial key"

# following command will copy the public key to the host under the folder 
# .ssh/authorized_keys
ssh-copy-id -i ~/.ssh/id_ed25519.pub 1p.address.of.host
```

- Create a specific SSH key for Ansible Control Node (without passphrase as ansible can not enter passphrase everytime connecting target servers) and copy it to target server

```bash
# with different name e.g. /home/username/.ssh/ansible
ssh-keygen -t ed25519 -C "ansible control node"
```

### Adding SSH Key to SSH Agent

```bash
# Check if ssh-agent is running
eval "$(ssh-agent -s)"        
# Add ssh key to ssh-agent
ssh-add ~/.ssh/nameOfSSHKey
# Verify Key is added to ssh-agent
ssh-add -l
```

## References

- [Ansible Documentation](https://docs.ansible.com/ansible/latest/)
- [Ansible Best Practices](https://docs.ansible.com/ansible/2.9/user_guide/playbooks_best_practices.html)
- [Ansible Builtin Modules, Plugins etc.](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/)
