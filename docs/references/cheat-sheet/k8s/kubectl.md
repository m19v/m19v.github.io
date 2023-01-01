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
# APPLY
kubectl apply -f ./my-manifest.yaml                                 # create resource(s)
kubectl apply -f ./my1.yaml -f ./my2.yaml                           # create from multiple files
kubectl apply -f ./dir                                              # create resource(s) in all manifest files in dir
kubectl apply -f https://git.io/vPieo                               # create resource(s) from url

# CREATE
kubectl create deployment nginx --image=nginx                       # start a single instance of nginx

kubectl create job hello --image=busybox:1.28 -- echo "Hello World" # create a Job which prints "Hello World"

kubectl create cronjob hello --image=busybox:1.28 \
--schedule="*/1 * * * *" -- echo "Hello World"                      # create a CronJob that prints "Hello World" every minute
```

### Viewing and finding resources

```shell
# GET SERVICE/S
kubectl get services                                                # List all services in the namespace
kubectl get services --sort-by=.metadata.name                       # List Services Sorted by Name

# GET POD/S
kubectl get pods                                                    # List all pods in the namespace
kubectl get pods --all-namespaces                                   # List all pods in all namespaces
kubectl get pods -o wide                                            # List all pods in the current namespace, with more details
kubectl get pod my-pod -o yaml                                      # Get a pod's YAML

# Describe commands with verbose output
kubectl describe nodes my-node
kubectl describe pods my-pod

kubectl get deployment my-dep                 # List a particular deployment

# List pods Sorted by Restart Count
kubectl get pods --sort-by='.status.containerStatuses[0].restartCount'

# List PersistentVolumes sorted by capacity
kubectl get pv --sort-by=.spec.capacity.storage

# Get the version label of all pods with label app=cassandra
kubectl get pods --selector=app=cassandra -o \
  jsonpath='{.items[*].metadata.labels.version}'

# Retrieve the value of a key with dots, e.g. 'ca.crt'
kubectl get configmap myconfig \
  -o jsonpath='{.data.ca\.crt}'

# Retrieve a base64 encoded value with dashes instead of underscores.
kubectl get secret my-secret --template='{{index .data "key-name-with-dashes"}}'

# Get all worker nodes (use a selector to exclude results that have a label
# named 'node-role.kubernetes.io/control-plane')
kubectl get node --selector='!node-role.kubernetes.io/control-plane'

# Get all running pods in the namespace
kubectl get pods --field-selector=status.phase=Running

# Get ExternalIPs of all nodes
kubectl get nodes -o jsonpath='{.items[*].status.addresses[?(@.type=="ExternalIP")].address}'

# List Names of Pods that belong to Particular RC
# "jq" command useful for transformations that are too complex for jsonpath, it can be found at https://stedolan.github.io/jq/
sel=${$(kubectl get rc my-rc --output=json | jq -j '.spec.selector | to_entries | .[] | "\(.key)=\(.value),"')%?}
echo $(kubectl get pods --selector=$sel --output=jsonpath={.items..metadata.name})

# Show labels for all pods (or any other Kubernetes object that supports labelling)
kubectl get pods --show-labels

# Check which nodes are ready
JSONPATH='{range .items[*]}{@.metadata.name}:{range @.status.conditions[*]}{@.type}={@.status};{end}{end}' \
 && kubectl get nodes -o jsonpath="$JSONPATH" | grep "Ready=True"

# Output decoded secrets without external tools
kubectl get secret my-secret -o go-template='{{range $k,$v := .data}}{{"### "}}{{$k}}{{"\n"}}{{$v|base64decode}}{{"\n\n"}}{{end}}'

# List all Secrets currently in use by a pod
kubectl get pods -o json | jq '.items[].spec.containers[].env[]?.valueFrom.secretKeyRef.name' | grep -v null | sort | uniq

# List all containerIDs of initContainer of all pods
# Helpful when cleaning up stopped containers, while avoiding removal of initContainers.
kubectl get pods --all-namespaces -o jsonpath='{range .items[*].status.initContainerStatuses[*]}{.containerID}{"\n"}{end}' | cut -d/ -f3

# List Events sorted by timestamp
kubectl get events --sort-by=.metadata.creationTimestamp

# List all warning events
kubectl events --types=Warning

# Compares the current state of the cluster against the state that the cluster would be in if the manifest was applied.
kubectl diff -f ./my-manifest.yaml

# Produce a period-delimited tree of all keys returned for nodes
# Helpful when locating a key within a complex nested JSON structure
kubectl get nodes -o json | jq -c 'paths|join(".")'

# Produce a period-delimited tree of all keys returned for pods, etc
kubectl get pods -o json | jq -c 'paths|join(".")'

# Produce ENV for all pods, assuming you have a default container for the pods, default namespace and the `env` command is supported.
# Helpful when running any supported command across all pods, not just `env`
for pod in $(kubectl get po --output=jsonpath={.items..metadata.name}); do echo $pod && kubectl exec -it $pod -- env; done

# Get a deployment's status subresource
kubectl get deployment nginx-deployment --subresource=status

```

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
