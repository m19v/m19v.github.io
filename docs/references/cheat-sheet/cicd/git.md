---
title: Git
---

## git

```shell
# Delete branches
git push -d <remote_name> <branchname>             # In most cases <remote_name> is 'origin'
git branch -d <branchname>


# Amend most recent commit message
git commit --amend                                 # This will open your editor
git commit --amend -m "New commit message"

# Git worktree
git worktree list

git worktree add ../path branch
git worktree add -b newbranch ../path

git worktree remove develop


# Git log
git log --graph --decorate --oneline


# oneline examples
git log --all --graph --pretty=format:"%C(yellow)%h%Creset -%C(auto)%d %C(green)%ad%Creset %s %Cblue<%an>" --date="format-local:%a %Y-%m-%d %H:%M"
git log --all --graph --pretty=format:"%C(yellow)%h%Creset%C(auto)%d %C(green)%ad%Creset %s %C(blue)<%an>" --date="format-local:%d.%m.%Y %H:%M"

git log --format="tformat:%>|(15)%C(auto)%h %Cgreen %<(20,trunc)%cn %C(auto) %<(15,trunc)%ar %<($(($(tput cols)-55)),trunc)%s" --graph --all

git log --format="tformat:%>|(18)%C(auto)%h%<($(($(tput cols)-110)),trunc)%C(auto)%d %<($(($(tput cols)-100)),trunc)%s %Cgreen%<(15,trunc)%cn %C(blue)%<(16,trunc)%ad%Creset" --graph --all --date="format-local:%d.%m.%Y %H:%M"

git log --pretty='tformat:%C(bold cyan)%h %C(blue)%<(10,trunc)%aN %<(50,trunc)%C(white)%s %C(auto)%d %C(dim green)%ad' --graph --all --date="format-local:%d.%m.%Y %H:%M"
```
