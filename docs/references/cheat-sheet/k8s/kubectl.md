---
title: Kubectl
---

## Kubectl context and configuration

```shell
# CONFIG VIEW
kubectl config view                                                 # Show Merged kubeconfig settings.
KUBECONFIG=~/.kube/config:~/.kube/kubconfig2                        # Use multiple kubeconfig files at the same time and view merged config
kubectl config view -o jsonpath='{.users[*].name}'                  # get a list of users

# CONFIG CONTEXT
kubectl config get-contexts                                         # display list of contexts
kubectl config current-context                                      # display the current-context
kubectl config use-context my-cluster-name                          # set the default context to my-cluster-name
kubectl config set-context --current --namespace=ggckad-s2          # permanently save the namespace for all subsequent kubectl commands in that context.
kubectl config set-context gce --user=cluster-admin --namespace=foo \
  && kubectl config use-context gce                                 # set a context utilizing a specific username and namespace.

# CONFIG CLUSTER
kubectl config set-cluster my-cluster-name                          # set a cluster entry in the kubeconfig
kubectl config set-cluster my-cluster-name --proxy-url=my-proxy-url # configure the URL to a proxy server to use for requests made by this client in the kubeconfig

# CONFIG USERS & CREDENTIALS
kubectl config set-credentials kubeuser/foo.kubernetes.com \
--username=kubeuser --password=kubepassword                         # add a new user to your kubeconf that supports basic auth
kubectl config unset users.foo                                      # delete user foo
```


## Resource management

### Creating resources

### Viewing and finding resources

### Updating resources 

### Patching resources

### Editing resources

### Scaling resources

### Deleting resources

## Interaction with resources

### Interacting with running Pods

### Copying files and directories to and from containers 

### Interacting with Deployments and Services

### Interacting with Nodes and cluster 

#### Resource types

#### Formatting output

#### Kubectl output verbosity and debugging
