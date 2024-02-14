---
title: Makefile
---

## Introduction

- `make` utility is primarily used to **build** and **compile** programs.
- `make` is also used to **automate** repetitive tasks.

## Installation

```shell
# Ubuntu
sudo apt update
sudo apt install build-essential

# Verify with
which make
# Output
/usr/bin/make
```

## Makefile

- Makefiles are directory specific, `make` will search in the directory where it was called.

```makefile
# Makefile format:

EXAMPLE_VARIABLE=example-variable-value

target: [source]
    [COMMAND PREFIXES]command arg1 arg2 \
    arg3 $(EXAMPLE_VARIABLE)
```
**target** - a user-specified name to refer to a group of commands. Aligned on the left-hand column, is a continuous word (no spaces), and ends with a colon (:).  
**source** - a reference to files or other targets and represents prerequisites or dependencies for the target. More than one source can be specified after any target, separated by spaces.  
**command** - as many indented by one `tab` lines followed by a command (shell compatbale) allowed. `make` will go though them one by a time.

## Command prefixes

Command prefixes define how `make` must handle the command

```makefile
-	            # Do not abort if an error is encountered
@               # Do not print command
+	            # Run even if Make is in ‘don’t execute’ mode
```

## File Suffix Rules

Used for file processing based on their extension.

```makefile
# declaration of file suffixes to be used
.SUFFIXES: .jpg .png    

# declaration of suffix rule
# format: "original_extension.target_extension:"
.jpg.png:
    @echo converting $< to $@
    convert $< $@
```

## Automatic variables

```shell

```

## Special variables

```shell

```

## Directives

```shell

```

## References

- [GNU make](https://www.gnu.org/software/make/manual/html_node/index.html)
- [GNU make - Quick Reference](https://www.gnu.org/software/make/manual/html_node/Quick-Reference.html)
- 