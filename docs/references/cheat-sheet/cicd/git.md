---
title: Git
---

## git log

```shell
git log --graph --decorate --oneline

# oneline example
git log --all --graph --pretty=format:"%C(yellow)%h%Creset -%C(auto)%d %C(green)%ad%Creset %s %Cblue<%an>" --date="format-local:%a %Y-%m-%d %H:%M"
git log --all --graph --pretty=format:"%C(yellow)%h%Creset%C(auto)%d %C(green)%ad%Creset %s %C(blue)%aN" --date="format-local:%d.%m.%Y %H:%M"
```
