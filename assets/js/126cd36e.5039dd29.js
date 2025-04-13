"use strict";(self.webpackChunkm_19_v=self.webpackChunkm_19_v||[]).push([[4799],{515:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>r,default:()=>u,frontMatter:()=>l,metadata:()=>o,toc:()=>i});const o=JSON.parse('{"id":"references/cheat-sheet/k8s/kubectl","title":"Kubectl","description":"Kubectl configuration","source":"@site/docs/references/cheat-sheet/k8s/kubectl.md","sourceDirName":"references/cheat-sheet/k8s","slug":"/references/cheat-sheet/k8s/kubectl","permalink":"/docs/references/cheat-sheet/k8s/kubectl","draft":false,"unlisted":false,"editUrl":"https://github.com/m19v/m19v.github.io/blob/main/docs/references/cheat-sheet/k8s/kubectl.md","tags":[],"version":"current","lastUpdatedBy":"m19v","lastUpdatedAt":1744578423000,"frontMatter":{"title":"Kubectl"},"sidebar":"tutorialSidebar","previous":{"title":"Helm","permalink":"/docs/references/cheat-sheet/k8s/helm"},"next":{"title":"Minikube","permalink":"/docs/references/cheat-sheet/k8s/minikube"}}');var s=n(4848),a=n(8453);const l={title:"Kubectl"},r=void 0,c={},i=[{value:"Kubectl configuration",id:"kubectl-configuration",level:2},{value:"Resource management",id:"resource-management",level:2},{value:"Creating resources",id:"creating-resources",level:3},{value:"Viewing and finding resources",id:"viewing-and-finding-resources",level:3},{value:"Updating resources",id:"updating-resources",level:3},{value:"Patching resources",id:"patching-resources",level:3},{value:"Editing resources",id:"editing-resources",level:3},{value:"Scaling resources",id:"scaling-resources",level:3},{value:"Deleting resources",id:"deleting-resources",level:3},{value:"Interaction with resources",id:"interaction-with-resources",level:2},{value:"Interacting with running Pods",id:"interacting-with-running-pods",level:3},{value:"Copying files and directories to and from containers",id:"copying-files-and-directories-to-and-from-containers",level:3},{value:"Interacting with Deployments and Services",id:"interacting-with-deployments-and-services",level:3},{value:"Interacting with Nodes and cluster",id:"interacting-with-nodes-and-cluster",level:3},{value:"Resource types",id:"resource-types",level:4},{value:"Formatting output",id:"formatting-output",level:4},{value:"Kubectl output verbosity and debugging",id:"kubectl-output-verbosity-and-debugging",level:4},{value:"Etc.",id:"etc",level:2},{value:"Resources",id:"resources",level:2}];function d(e){const t={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",p:"p",pre:"pre",...(0,a.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{id:"kubectl-configuration",children:"Kubectl configuration"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-shell",children:"# CONFIG VIEW\nkubectl config view                                                 # Show Merged kubeconfig settings.\nKUBECONFIG=~/.kube/config:~/.kube/kubconfig2                        # Use multiple kubeconfig files at the same time and view merged config\nkubectl config view -o jsonpath='{.users[*].name}'                  # get a list of users\n\n# CONFIG CONTEXT\nkubectl config get-contexts                                         # display list of contexts\nkubectl config current-context                                      # display the current-context\nkubectl config use-context my-cluster-name                          # set the default context to my-cluster-name\nkubectl config set-context --current --namespace=ggckad-s2          # permanently save the namespace for all subsequent kubectl commands in that context.\nkubectl config set-context gce --user=cluster-admin --namespace=foo \\\n  && kubectl config use-context gce                                 # set a context utilizing a specific username and namespace.\n\n# CONFIG CLUSTER\nkubectl config set-cluster my-cluster-name                          # set a cluster entry in the kubeconfig\nkubectl config set-cluster my-cluster-name --proxy-url=my-proxy-url # configure the URL to a proxy server to use for requests made by this client in the kubeconfig\n\n# CONFIG USERS & CREDENTIALS\nkubectl config set-credentials kubeuser/foo.kubernetes.com \\\n--username=kubeuser --password=kubepassword                         # add a new user to your kubeconf that supports basic auth\nkubectl config unset users.foo                                      # delete user foo\n"})}),"\n",(0,s.jsx)(t.h2,{id:"resource-management",children:"Resource management"}),"\n",(0,s.jsx)(t.h3,{id:"creating-resources",children:"Creating resources"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-shell",children:'# APPLY\nkubectl apply -f ./my-manifest.yaml                                 # create resource(s)\nkubectl apply -f ./my1.yaml -f ./my2.yaml                           # create from multiple files\nkubectl apply -f ./dir                                              # create resource(s) in all manifest files in dir\nkubectl apply -f https://git.io/vPieo                               # create resource(s) from url\n\n# CREATE\nkubectl create deployment nginx --image=nginx                       # start a single instance of nginx\n\nkubectl create job hello --image=busybox:1.28 -- echo "Hello World" # create a Job which prints "Hello World"\n\nkubectl create cronjob hello --image=busybox:1.28 \\\n--schedule="*/1 * * * *" -- echo "Hello World"                      # create a CronJob that prints "Hello World" every minute\n'})}),"\n",(0,s.jsx)(t.h3,{id:"viewing-and-finding-resources",children:"Viewing and finding resources"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-shell",children:"# GET SERVICE/S\nkubectl get services                                                # List all services in the namespace\nkubectl get services --sort-by=.metadata.name                       # List Services Sorted by Name\n\n\n# GET POD/S\nkubectl get pod my-pod -o yaml                                      # Get a pod's YAML\nkubectl get pods                                                    # List all pods in the namespace\nkubectl get pods --all-namespaces                                   # List all pods in all namespaces\nkubectl get pods -o wide                                            # List all pods in the current namespace, with more details\nkubectl get pods --show-labels                                              # Show labels for all pods (or any other Kubernetes object that supports labelling)\nkubectl get pods --sort-by='.status.containerStatuses[0].restartCount'      # List pods Sorted by Restart Count\n\nkubectl get pods --selector=app=cassandra -o \\\n  jsonpath='{.items[*].metadata.labels.version}'                            # Get the version label of all pods with label app=cassandra\n\nkubectl get pods --field-selector=status.phase=Running                      # Get all running pods in the namespace\nkubectl get pods -o json | jq -c 'paths|join(\".\")'                          # Produce a period-delimited tree of all keys returned for pods, etc\n\nkubectl get pods -o json \\\n  | jq '.items[].spec.containers[].env[]?.valueFrom.secretKeyRef.name' \\\n  | grep -v null | sort | uniq                                              # List all Secrets currently in use by a pod\n\nsel=${$(kubectl get rc my-rc --output=json | jq -j '.spec.selector | to_entries | .[] | \"\\(.key)=\\(.value),\"')%?}               # List Names of Pods that belong to Particular RC. \"jq\" command useful for transformations that are too complex for jsonpath, it can be found at https://stedolan.github.io/jq/\necho $(kubectl get pods --selector=$sel --output=jsonpath={.items..metadata.name})\n\nkubectl get pods --all-namespaces -o jsonpath='{range .items[*].status.initContainerStatuses[*]}{.containerID}{\"\\n\"}{end}' | cut -d/ -f3    # List all containerIDs of initContainer of all pods. Helpful when cleaning up stopped containers, while avoiding removal of initContainers.\n\n\n# GET DEPLOYMENT\nkubectl get deployment my-dep                                       # List a particular deployment\nkubectl get deployment nginx-deployment --subresource=status        # Get a deployment's status subresource\n\n\n# GET NODE/S\nkubectl get node --selector='!node-role.kubernetes.io/control-plane'                            # Get all worker nodes (use a selector to exclude results that have a label named 'node-role.kubernetes.io/control-plane')\nkubectl get nodes -o json | jq -c 'paths|join(\".\")'                                             # Produce a period-delimited tree of all keys returned for nodes. Helpful when locating a key within a complex nested JSON structure\nkubectl get nodes -o jsonpath='{.items[*].status.addresses[?(@.type==\"ExternalIP\")].address}'   # Get ExternalIPs of all nodes\n\nJSONPATH='{range .items[*]}{@.metadata.name}:{range @.status.conditions[*]}{@.type}={@.status};{end}{end}' \\\n && kubectl get nodes -o jsonpath=\"$JSONPATH\" | grep \"Ready=True\"                               # Check which nodes are ready\n\n\n\n# GET SECRET\nkubectl get secret my-secret --template='{{index .data \"key-name-with-dashes\"}}'              # Retrieve a base64 encoded value with dashes instead of underscores.\nkubectl get secret my-secret -o go-template='{{range $k,$v := .data}}{{\"### \"}}{{$k}}{{\"\\n\"}}{{$v|base64decode}}{{\"\\n\\n\"}}{{end}}'        # Output decoded secrets without external tools\n\n\n# GET PERSISTENTVOLUMES\nkubectl get pv --sort-by=.spec.capacity.storage                     # List PersistentVolumes sorted by capacity\n\n\n# GET CONFIGMAP\nkubectl get configmap myconfig -o jsonpath='{.data.ca\\.crt}'        # Retrieve the value of a key with dots, e.g. 'ca.crt'\n\n\n# GET EVENTS\nkubectl get events --sort-by=.metadata.creationTimestamp            # List Events sorted by timestamp\nkubectl events --types=Warning                                      # List all warning events\n\n\n# DESCRIBE\nkubectl describe nodes my-node                                      # Describe commands with verbose output\nkubectl describe pods my-pod\n\n\n# DIFF\nkubectl diff -f ./my-manifest.yaml                                  # Compares the current state of the cluster against the state that the cluster would be in if the manifest was applied.\n\n# ETC\n# Produce ENV for all pods, assuming you have a default container for the pods, default namespace and the `env` command is supported.\n# Helpful when running any supported command across all pods, not just `env`\nfor pod in $(kubectl get po --output=jsonpath={.items..metadata.name}); do echo $pod && kubectl exec -it $pod -- env; done\n"})}),"\n",(0,s.jsx)(t.h3,{id:"updating-resources",children:"Updating resources"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-shell",children:'kubectl set image deployment/frontend www=image:v2               # Rolling update "www" containers of "frontend" deployment, updating the image\nkubectl rollout history deployment/frontend                      # Check the history of deployments including the revision\nkubectl rollout undo deployment/frontend                         # Rollback to the previous deployment\nkubectl rollout undo deployment/frontend --to-revision=2         # Rollback to a specific revision\nkubectl rollout status -w deployment/frontend                    # Watch rolling update status of "frontend" deployment until completion\nkubectl rollout restart deployment/frontend                      # Rolling restart of the "frontend" deployment\n\n\ncat pod.json | kubectl replace -f -                              # Replace a pod based on the JSON passed into stdin\n\nkubectl replace --force -f ./pod.json                            # Force replace, delete and then re-create the resource. Will cause a service outage.\n\nkubectl expose rc nginx --port=80 --target-port=8000             # Create a service for a replicated nginx, which serves on port 80 and connects to the containers on port 8000\n\nkubectl get pod mypod -o yaml \\\n| sed \'s/\\(image: myimage\\):.*$/\\1:v4/\' | kubectl replace -f -   # Update a single-container pod\'s image version (tag) to v4\n\nkubectl label pods my-pod new-label=awesome                      # Add a Label\nkubectl label pods my-pod new-label-                             # Remove a label\nkubectl annotate pods my-pod icon-url=http://goo.gl/XXBTWq       # Add an annotation\nkubectl autoscale deployment foo --min=2 --max=10                # Auto scale a deployment "foo"\n'})}),"\n",(0,s.jsx)(t.h3,{id:"patching-resources",children:"Patching resources"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-shell",children:'# Partially update a node\nkubectl patch node k8s-node-1 -p \'{"spec":{"unschedulable":true}}\'\n\n# Update a container\'s image; spec.containers[*].name is required because it\'s a merge key\nkubectl patch pod valid-pod -p \'{"spec":{"containers":[{"name":"kubernetes-serve-hostname","image":"new image"}]}}\'\n\n# Update a container\'s image using a json patch with positional arrays\nkubectl patch pod valid-pod --type=\'json\' -p=\'[{"op": "replace", "path": "/spec/containers/0/image", "value":"new image"}]\'\n\n# Disable a deployment livenessProbe using a json patch with positional arrays\nkubectl patch deployment valid-deployment  --type json   -p=\'[{"op": "remove", "path": "/spec/template/spec/containers/0/livenessProbe"}]\'\n\n# Add a new element to a positional array\nkubectl patch sa default --type=\'json\' -p=\'[{"op": "add", "path": "/secrets/1", "value": {"name": "whatever" } }]\'\n\n# Update a deployment\'s replica count by patching its scale subresource\nkubectl patch deployment nginx-deployment --subresource=\'scale\' --type=\'merge\' -p \'{"spec":{"replicas":2}}\'\n'})}),"\n",(0,s.jsx)(t.h3,{id:"editing-resources",children:"Editing resources"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-shell",children:'kubectl edit svc/docker-registry                                  # Edit the service named docker-registry\nKUBE_EDITOR="nano" kubectl edit svc/docker-registry               # Use an alternative editor\n'})}),"\n",(0,s.jsx)(t.h3,{id:"scaling-resources",children:"Scaling resources"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-shell",children:"kubectl scale --replicas=3 rs/foo                                 # Scale a replicaset named 'foo' to 3\nkubectl scale --replicas=3 -f foo.yaml                            # Scale a resource specified in \"foo.yaml\" to 3\nkubectl scale --current-replicas=2 --replicas=3 deployment/mysql  # If the deployment named mysql's current size is 2, scale mysql to 3\nkubectl scale --replicas=5 rc/foo rc/bar rc/baz                   # Scale multiple replication controllers\n"})}),"\n",(0,s.jsx)(t.h3,{id:"deleting-resources",children:"Deleting resources"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-shell",children:'kubectl delete -f ./pod.json                                      # Delete a pod using the type and name specified in pod.json\nkubectl delete pod unwanted --now                                 # Delete a pod with no grace period\nkubectl delete pod,service baz foo                                # Delete pods and services with same names "baz" and "foo"\nkubectl delete pods,services -l name=myLabel                      # Delete pods and services with label name=myLabel\nkubectl -n my-ns delete pod,svc --all                             # Delete all pods and services in namespace my-ns,\n# Delete all pods matching the awk pattern1 or pattern2\nkubectl get pods  -n mynamespace --no-headers=true | awk \'/pattern1|pattern2/{print $1}\' | xargs  kubectl delete -n mynamespace pod\n'})}),"\n",(0,s.jsx)(t.h2,{id:"interaction-with-resources",children:"Interaction with resources"}),"\n",(0,s.jsx)(t.h3,{id:"interacting-with-running-pods",children:"Interacting with running Pods"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-shell",children:"# LOGS\nkubectl logs my-pod                                 # dump pod logs (stdout)\nkubectl logs -l name=myLabel                        # dump pod logs, with label name=myLabel (stdout)\nkubectl logs my-pod --previous                      # dump pod logs (stdout) for a previous instantiation of a container\nkubectl logs my-pod -c my-container                 # dump pod container logs (stdout, multi-container case)\nkubectl logs -l name=myLabel -c my-container        # dump pod logs, with label name=myLabel (stdout)\nkubectl logs my-pod -c my-container --previous      # dump pod container logs (stdout, multi-container case) for a previous instantiation of a container\nkubectl logs -f my-pod                              # stream pod logs (stdout)\nkubectl logs -f my-pod -c my-container              # stream pod container logs (stdout, multi-container case)\nkubectl logs -f -l name=myLabel --all-containers    # stream all pods logs with label name=myLabel (stdout)\n\n\n# RUN\nkubectl run -i --tty busybox --image=busybox:1.28 -- sh  # Run pod as interactive shell\nkubectl run nginx --image=nginx -n mynamespace      # Start a single instance of nginx pod in the namespace of mynamespace\nkubectl run nginx --image=nginx --dry-run=client -o yaml > pod.yaml\n                                                    # Generate spec for running pod nginx and write it into a file called pod.yaml\n\n# ATTACH\nkubectl attach my-pod -i                            # Attach to Running Container\n\n\n# PORT-FORWARD\nkubectl port-forward my-pod 5000:6000               # Listen on port 5000 on the local machine and forward to port 6000 on my-pod\n\n\n# EXEC\nkubectl exec my-pod -- ls /                         # Run command in existing pod (1 container case)\nkubectl exec --stdin --tty my-pod -- /bin/sh        # Interactive shell access to a running pod (1 container case)\nkubectl exec -ti <pod name> -- bash                 # Interactive bash access to a running pod (1 container case)\nkubectl exec my-pod -c my-container -- ls /         # Run command in existing pod (multi-container case)\n\n\n# TOP\nkubectl top pod POD_NAME --containers               # Show metrics for a given pod and its containers\nkubectl top pod POD_NAME --sort-by=cpu              # Show metrics for a given pod and sort it by 'cpu' or 'memory'\n"})}),"\n",(0,s.jsx)(t.h3,{id:"copying-files-and-directories-to-and-from-containers",children:"Copying files and directories to and from containers"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-shell",children:"kubectl cp /tmp/foo_dir my-pod:/tmp/bar_dir            # Copy /tmp/foo_dir local directory to /tmp/bar_dir in a remote pod in the current namespace\nkubectl cp /tmp/foo my-pod:/tmp/bar -c my-container    # Copy /tmp/foo local file to /tmp/bar in a remote pod in a specific container\nkubectl cp /tmp/foo my-namespace/my-pod:/tmp/bar       # Copy /tmp/foo local file to /tmp/bar in a remote pod in namespace my-namespace\nkubectl cp my-namespace/my-pod:/tmp/foo /tmp/bar       # Copy /tmp/foo from a remote pod to /tmp/bar locally\n\ntar cf - /tmp/foo | kubectl exec -i -n my-namespace my-pod -- tar xf - -C /tmp/bar           # Copy /tmp/foo local file to /tmp/bar in a remote pod in namespace my-namespace\nkubectl exec -n my-namespace my-pod -- tar cf - /tmp/foo | tar xf - -C /tmp/bar              # Copy /tmp/foo from a remote pod to /tmp/bar locally\n"})}),"\n",(0,s.jsx)(t.h3,{id:"interacting-with-deployments-and-services",children:"Interacting with Deployments and Services"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-shell",children:"kubectl logs deploy/my-deployment                         # dump Pod logs for a Deployment (single-container case)\nkubectl logs deploy/my-deployment -c my-container         # dump Pod logs for a Deployment (multi-container case)\n\nkubectl port-forward svc/my-service 5000                  # listen on local port 5000 and forward to port 5000 on Service backend\nkubectl port-forward svc/my-service 5000:my-service-port  # listen on local port 5000 and forward to Service target port with name <my-service-port>\n\nkubectl port-forward deploy/my-deployment 5000:6000       # listen on local port 5000 and forward to port 6000 on a Pod created by <my-deployment>\nkubectl exec deploy/my-deployment -- ls                   # run command in first Pod and first container in Deployment (single- or multi-container cases)\n"})}),"\n",(0,s.jsx)(t.h3,{id:"interacting-with-nodes-and-cluster",children:"Interacting with Nodes and cluster"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-shell",children:"kubectl cordon my-node                                                # Mark my-node as unschedulable\nkubectl drain my-node                                                 # Drain my-node in preparation for maintenance\nkubectl uncordon my-node                                              # Mark my-node as schedulable\nkubectl top node my-node                                              # Show metrics for a given node\nkubectl cluster-info                                                  # Display addresses of the master and services\nkubectl cluster-info dump                                             # Dump current cluster state to stdout\nkubectl cluster-info dump --output-directory=/path/to/cluster-state   # Dump current cluster state to /path/to/cluster-state\n\n# View existing taints on which exist on current nodes.\nkubectl get nodes -o='custom-columns=NodeName:.metadata.name,TaintKey:.spec.taints[*].key,TaintValue:.spec.taints[*].value,TaintEffect:.spec.taints[*].effect'\n\n# If a taint with that key and effect already exists, its value is replaced as specified.\nkubectl taint nodes foo dedicated=special-user:NoSchedule\n"})}),"\n",(0,s.jsx)(t.h4,{id:"resource-types",children:"Resource types"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-shell",children:'kubectl api-resources\n\nkubectl api-resources --namespaced=true      # All namespaced resources\nkubectl api-resources --namespaced=false     # All non-namespaced resources\nkubectl api-resources -o name                # All resources with simple output (only the resource name)\nkubectl api-resources -o wide                # All resources with expanded (aka "wide") output\nkubectl api-resources --verbs=list,get       # All resources that support the "list" and "get" request verbs\nkubectl api-resources --api-group=extensions # All resources in the "extensions" API group\n'})}),"\n",(0,s.jsx)(t.h4,{id:"formatting-output",children:"Formatting output"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-shell",children:"# To output details to your terminal window in a specific format, add the -o (or --output) flag to a supported kubectl command.\n\n# Output format\t                                  Description\n\n-o=custom-columns=<spec>                          Print a table using a comma separated list of custom columns\n-o=custom-columns-file=<filename>                 Print a table using the custom columns template in the <filename> file\n-o=json\t                                          Output a JSON formatted API object\n-o=jsonpath=<template>\t                          Print the fields defined in a jsonpath expression\n-o=jsonpath-file=<filename>                       Print the fields defined by the jsonpath expression in the <filename> file\n-o=name\t                                          Print only the resource name and nothing else\n-o=wide\t                                          Output in the plain-text format with any additional information, and for pods, the node name is included\n-o=yaml\t                                          Output a YAML formatted API object\n\n# EXAMPLES using -o=custom-columns:\n\n# All images running in a cluster\nkubectl get pods -A -o=custom-columns='DATA:spec.containers[*].image'\n\n# All images running in namespace: default, grouped by Pod\nkubectl get pods --namespace default --output=custom-columns=\"NAME:.metadata.name,IMAGE:.spec.containers[*].image\"\n\n # All images excluding \"registry.k8s.io/coredns:1.6.2\"\nkubectl get pods -A -o=custom-columns='DATA:spec.containers[?(@.image!=\"registry.k8s.io/coredns:1.6.2\")].image'\n\n# All fields under metadata regardless of name\nkubectl get pods -A -o=custom-columns='DATA:metadata.*'\n"})}),"\n",(0,s.jsx)(t.h4,{id:"kubectl-output-verbosity-and-debugging",children:"Kubectl output verbosity and debugging"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-shell",children:"# Kubectl verbosity is controlled with the -v or --v flags followed by an integer representing the log level. General Kubernetes logging conventions and the associated log levels are described here.\n\n# Verbosity\t              Description\n--v=0                     Generally useful for this to always be visible to a cluster operator.\n--v=1                     A reasonable default log level if you don't want verbosity.\n--v=2                     Useful steady state information about the service and important log messages that may correlate to significant changes in the system. This is the recommended default log level for most systems.\n--v=3                     Extended information about changes.\n--v=4                     Debug level verbosity.\n--v=5                     Trace level verbosity.\n--v=6                     Display requested resources.\n--v=7                     Display HTTP request headers.\n--v=8                     Display HTTP request contents.\n--v=9                     Display HTTP request contents without truncation of contents.\n"})}),"\n",(0,s.jsx)(t.h2,{id:"etc",children:"Etc."}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-shell",children:"kubectl explain pods                                        # get the documentation for pod manifests\n"})}),"\n",(0,s.jsx)(t.h2,{id:"resources",children:"Resources"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.a,{href:"https://kubernetes.io/docs/reference/kubectl/cheatsheet/",children:"1. Kubectl Cheat Sheet."})})]})}function u(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>l,x:()=>r});var o=n(6540);const s={},a=o.createContext(s);function l(e){const t=o.useContext(a);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),o.createElement(a.Provider,{value:t},e.children)}}}]);