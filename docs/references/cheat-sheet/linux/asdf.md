---
title: asdf
---
`asdf` - Multiple Runtime Version Manager

## Manage plugins

Plugins are how `asdf` knows to handle different tools like Java, Maven, Node.js etc.

```bash
asdf plugin list all                       # List plugins registered on asdf with URLs
asdf plugin list [--urls] [--refs]         # List installed plugins [git urls] [git-ref]

asdf plugin add <name> [<git-url>]         # Add a plugin from the asdf plugin repo OR, add a custom Git repo with name and URL

asdf plugin remove <name>                  # Remove plugin and package versions
asdf plugin update <name> [<git-ref>]      # Update a plugin to latest commit

asdf plugin update --all                   # Update all plugins to latest
```

## Manage packages

```bash
asdf current                               # Display current version set or being used for all packages
```

## Utils

```bash
asdf version                               # Print the currently installed version of asdf
```

## Resources
- GitHub: https://github.com/asdf-vm/asdf
- Docs:   https://asdf-vm.com
