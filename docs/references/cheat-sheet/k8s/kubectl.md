---
title: Kubectl
---

## Kubectl configuration

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

```shell
kubectl apply -f ./my-manifest.yaml                                 # create resource(s)
kubectl apply -f ./my1.yaml -f ./my2.yaml                           # create from multiple files
kubectl apply -f ./dir                                              # create resource(s) in all manifest files in dir
kubectl apply -f https://git.io/vPieo                               # create resource(s) from url

kubectl create deployment nginx --image=nginx                       # start a single instance of nginx

kubectl create job hello --image=busybox:1.28 -- echo "Hello World" # create a Job which prints "Hello World"

kubectl create cronjob hello --image=busybox:1.28 \
--schedule="*/1 * * * *" -- echo "Hello World"                      # create a CronJob that prints "Hello World" every minute
```

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

## Etc.
```shell
kubectl explain pods                                                # get the documentation for pod manifests
```
