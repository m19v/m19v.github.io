---
title: vim
---

## Global

```bash
[count] [operation] [motion]                   # vim normal mode PATTERN
# e.g."
# 2dw    -    [2] [delete] [word]
#  da"   -    [] [delete] [around "]
#  da"   -    [] [delete] [around "]
#  dat   -    [] [delete] [around (html)tag]
#  ca"   -    [] [change] [around "]
#  va"   -    [] [visual mode mark] [around "]

#  zf at   -  [] [fold] [around (html)tag]
```

## Editing

```bash
.                      # repeat last command
```

## Cursor movement

```bash
],)                    # move to closing )
],}                    # move to closing }
[,(                    # move to opening (
[,{                    # move to opening {
```

## Search and replace

```bash
/pattern               # search for pattern
?pattern               # search backward for pattern
\vpattern              # 'very magic' pattern: non-alphanumeric characters are interpreted as special regex symbols (no escaping needed)

:%s/old/new/g          # replace all old with new throughout file
:%s/old/new/gc         # replace all old with new throughout file with confirmations
```

## Cut and paste

```bash
:g/{pattern}/d              # delete all lines containing pattern
```

## Marks and positions

```bash

gf                          # goto file under cursor
Ctrl + w, f                 # goto file under cursor in new window

Ctrl + i                    # go to newer position in jump list
Ctrl + o                    # go to older position in jump list
```

## Registers

```bash
:reg[isters]                # show registers content
```

Working with multiple files

```bash
:ls or :buffers             # list all open buffers
:b[uffer] file              # go to a buffer by file
:b[uffer]#                  # go to a buffer by index #
```
