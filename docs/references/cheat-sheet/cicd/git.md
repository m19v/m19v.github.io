---
title: Git
---

## git log

```shell
git log --graph --decorate --oneline

# oneline example
git log --all --graph --pretty=format:"%C(yellow)%h%Creset -%C(auto)%d %C(green)%ad%Creset %s %Cblue<%an>" --date="format-local:%a %Y-%m-%d %H:%M"
git log --all --graph --pretty=format:"%C(yellow)%h%Creset%C(auto)%d %C(green)%ad%Creset %s %C(blue)<%an>" --date="format-local:%d.%m.%Y %H:%M"

git log --format="tformat:%>|(15)%C(auto)%h %Cgreen %<(20,trunc)%cn %C(auto) %<(15,trunc)%ar %<($(($(tput cols)-55)),trunc)%s" --graph --all
```
