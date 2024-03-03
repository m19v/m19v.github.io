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
asdf list <name> [version]                 # List installed versions of a package and optionally filter the versions
asdf list all <name> [<version>]           # List all versions of a package and optionally filter the returned versions

asdf latest --all                          # Show latest stable version of all the packages and if they are installed


asdf install <name>                        # Install one tool at the version specified in the .tool-versions file
asdf install <name> <version>              # Install a specific version of a package
asdf uninstall <name> <version>            # Remove a specific version of a package


asdf global <name> <version>               # Set the package global version
asdf shell <name> <version>                # Set the package version to `ASDF_${LANG}_VERSION` in the current shell
```

## Utils

```bash
asdf info                                  # Print asdf information
asdf version                               # Print the currently installed version of asdf
asdf update                                # Update asdf to the latest stable release
```

## Resources
- GitHub: https://github.com/asdf-vm/asdf
- Docs:   https://asdf-vm.com
