---
title: Bash
---

## Introduction

This is a quick reference to getting started with Bash scripting.

## Parameter expansions
### Basics

```bash {3-4,7} showLineNumbers title="Basics"
name="John"
echo ${name}
echo ${name/J/j}    #=> "john" (substitution)
echo ${name:0:2}    #=> "Jo" (slicing)
echo ${name::2}     #=> "Jo" (slicing)
echo ${name::-1}    #=> "Joh" (slicing)
echo ${name:(-1)}   #=> "n" (slicing from right)
echo ${name:(-2):1} #=> "h" (slicing from right)
echo ${food:-Cake}  #=> $food or "Cake"
length=2
echo ${name:0:length}  #=> "Jo"
```