---
layout: post
title: 移除 Git 里面的敏感信息
tags: [Git, GitHub, bash]
categories:
  - 技术互联
---

### 原由

　　在 Git 提交更新过程中，难免会出现将不需要提交的信息提交到了 Git 历史记录中，小一点的可能是一个错别字，或者包含了对团队合作无用的信息，大一点的可能就提交了数据库密码等的敏感信息，如果被公司合规部门发现，有可能丢掉的不仅是奖金，还有可能会失去当前的工作岗位。所以在日常工作中，对于 Git 的提交一定要小心谨慎，这篇文章将会从小到大依次提供一些场景下面的修复手段，希望能够有所帮助。

### 场景

- 更新最近的提交记录

　　Git 软件使用过程中要求每一次提交必须是一个原子提交，越小越好。对于一次提交几十个文件，更新非常多的提交，一定要拆分开来。如果不拆分，非常不利于 code review，而且如果能将代码拆分出来，基本说明对逻辑理解很透彻，很有利于代码仓库的后续可维护性。在原子提交过程中，如果发现之前的提交未包含一个完整的功能我们可以继续使用 git commit 提交到之前的 commit 中去，命令如下：

```bash
git commit --amend
```

　　这个命令给我们提供了一种新的工作方式，除了提交到暂存区，我们也可以提前写好 commit 信息，后续持续补充。这个命令也对我们修复之前的 commit 信息的错别字也很有帮助，因为再次提交的时候，还是有机会继续修改 commit 信息的。当然这个命令只是对当前本地未同步到远端分支的最新提交有效，如果已经提交到远端，需要强制推送更新到远端（`git push --force`，一般情况下，远端提交不允许这么做）。如果是有更加复杂的修改需求，我们就需要结合 `git reset` 去更新历史记录了。

- 忽略不必要的文件

　　在 Git 仓库初始化的时候，我们会初始化一份公用的 `.gitignore` 文件，这份文件提供了对于这个仓库绝大部分语言，开发操作系统以及编辑器无需提交到远端的文件过滤。这里推荐一个比较实用的网站，能够生成一份比较详细的公用 ignore 文件：[gitignore.io/](http://gitignore.io/)。
　　只要我们键入常见的语言，系统和编辑器就可以自动生成一份详尽的示例文件。比如我们只要输入 `Node`，`macOS` 和 `VistualStudioCode` 就会生成一份非常标准的 [gitignore 文件](http://gitignore.io/api/node,macos,visualstudiocode)。网站也提供命令行式的调用方法，需要可以自行研究。
　　但是有时候由于某些原因，开发者本地需要更新一个文件，不需要提交到远端仓库，但是又不能加入到 `.gitignore` 文件，这个时候我们可以使用 `.git/exclude`
文件去忽略它。使用命令如下：

```bash
echo "need_ignore_local_only.txt" >> .git/exclude
```

　　这样就可以修改了文件，同时保证了工作区的整洁。

- 批量更新历史记录的作者信息

　　当处理多个 Repo ，需要区别 Git 作者信息，但有时候不小心可能就会使用错误的作者信息提交了 commit
。这个时候也是需要重新 commit ，首先我们先列一下但前仓库的作者信息：

```bash
# list all commits
git log --date-order --oneline  --format="%h Author: %aN<%aE>, Date: %aI"
# list author name
git log --date-order --format="%aN" | sort -n | uniq
# list author email
git log --date-order --format="%aE" | sort -n | uniq
```

　　如果发现我们有不应该出现的作者信息存在我们需要进行更新，方法是设置一个 [Git Alias](https://stackoverflow.com/questions/2919878/git-rewrite-previous-commit-usernames-and-emails)，通过 `filter-branch` 操作：

```bash
git config alias.change-commits '!'"f() { VAR=\$1; OLD=\$2; NEW=\$3; shift 3; git filter-branch --env-filter \"if [[ \\\"\$\`echo \$VAR\`\\\" = '\$OLD' ]]; then export \$VAR='\$NEW'; fi\" \$@; }; f "
export FILTER_BRANCH_SQUELCH_WARNING=1
# To Change the author name
git change-commits GIT_AUTHOR_NAME "old name" "new name"
# To Change the author Emaol
git change-commits GIT_AUTHOR_EMAIL "old@email.com" "new@email.com"
```

　　需要注意的是如果之前做过一次，那么已经存在一份 backup
，需要手动删除，或者使用强制更新:

```bash
git update-ref -d refs/original/refs/heads/master
# Or update force
git change-commits GIT_AUTHOR_EMAIL "old@email.com" "new@email.com" --force
```

　　如果项目比较大，或者需要更新的比较多，也可以直接参考 [GitHub 的官方文档](https://help.github.com/en/github/using-git/changing-author-info)
更新作者信息。

- 彻底移除代码仓库的敏感信息

　　如果仓库里面包含敏感信息的话，用 `git filter-branch`
也可以做但是比较麻烦，推荐参考 [GitHub
官方文档](https://help.github.com/en/github/authenticating-to-github/removing-sensitive-data-from-a-repository)，使用
[BFG Reo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/) 来清理敏感数据：

```bash
bfg --delete-files SENSITIVE_FILE.txt repo.git
```

### 结论

　　Git 作为一个使用人数非常多的软件，设计理念非常优秀（任何记录都是可以修改的），因为使用量大，所以在所难免出现失误。因此使用时务必谨慎小心，我个人还是推荐多多读一下
Git Manual 文件，理解其中原理，对减少失误是帮助最大的。
