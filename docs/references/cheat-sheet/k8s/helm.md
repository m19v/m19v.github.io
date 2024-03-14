---
title: Helm
---

## Basic terms

```bash
Chart        # It is name of your chart in case it has been pulled and untarred.
             # It is <repo_name>/<chart_name> in case the repository has been added but chart not pulled.
             # It is the URL/Absolute path to the chart.

Name         # It is the name you want to give to your current helm chart installation.

Release      # Is the name you assigned to an installation instance.

Revision     # Is the value from the Helm history command

Repo-name    # The name of a repository.

DIR          # Directory name/path
```

## Chart Management

```bash
helm create <name>                      # Creates a chart directory along with the common files and directories used in a chart.
helm package <chart-path>               # Packages a chart into a versioned chart archive file.
helm lint <chart>                       # Run tests to examine a chart and identify possible issues:
helm show all <chart>                   # Inspect a chart and list its contents:
helm show values <chart>                # Displays the contents of the values.yaml file
helm pull <chart>                       # Download/pull chart 
helm pull <chart> --untar=true          # If set to true, will untar the chart after downloading it
helm pull <chart> --verify              # Verify the package before using it
helm pull <chart> --version <number>    # Default-latest is used, specify a version constraint for the chart version to use
helm dependency list <chart>            # Display a list of a chart’s dependencies:
```

## Install and Uninstall Apps

```bash
helm install <name> <chart>                           # Install the chart with a name
helm install <name> <chart> --namespace <namespace>   # Install the chart in a specific namespace
helm install <name> <chart> --set key1=val1,key2=val2 # Set values on the command line (can specify multiple or separate values with commas)
helm install <name> <chart> --values <yaml-file/url>  # Install the chart with your specified values
helm install <name> <chart> --dry-run --debug         # Run a test installation to validate chart (p)
helm install <name> <chart> --verify                  # Verify the package before using it 
helm install <name> <chart> --dependency-update       # update dependencies if they are missing before installing the chart
helm uninstall <name>                                 # Uninstall a release
```
## Perform App Upgrade and Rollback

## List, Add, Remove, and Update Repositories

```bash
helm repo add <repo-name> <url>                   # Add a repository from the internet:
helm repo list                                    # List added chart repositories
helm repo update                                  # Update information of available charts locally from chart repositories
```

## Search Repositories

```bash
helm search repo <keyword>        # Search repositories for a keyword in charts
helm search hub <keyword>         # Search for charts in the Artifact Hub or your own hub instance
```

## Helm Release monitoring

```bash
helm env                                 # Env prints out all the environment information in use by Helm.
```

## Download Release Information

## Plugin Management

```bash
helm plugin list                          # View a list of all installed plugins
```

## References
[Cheat Sheet - HELM](https://helm.sh/docs/intro/cheatsheet/)
