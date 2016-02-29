---
layout: post
title: Debian 8 修复fcitx安装错误
tags: [Debian, fcitx, 输入法]
image:
  feature: abstract-3.jpg
  credit: dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

### 前言

　　在桌面Linux系统里面，输入法一直是个大问题。英语则没有这个问题，但是像中文等其它语言的输入法相对比较麻烦。目前来说，常用的有两个，一个是各大桌面发行版本默认的ibus，另一个就是fcitx。包括Ubuntu等发行版本上面比较流行的搜狗输入法也是基于fcitx框架的。我之前一直使用的是Centos 7桌面的fcitx，但是一次系统更新后不知道怎么了，fcitx就挂了。而且原来包含fcitx的那个个人自己的软件源仓库也清掉了，无法使用。没办法，只有自己下载源码编译安装，但仍然无法成功。后来就转到了现在使用的Debian 8系统，现在将自己在Debian 8上安装过程发现的问题及解决办法记录下来。

### 过程

　　不得不说Debian系的软件仓库要相对RedHat系要丰富一些，直接使用

```bash
    $ sudo aptitude install fcitx
```

　　之后重启或着重新登录看是否能够正常使用。如果还有输入框或者其它问题影响没办法正常使用的话，fcitx本身提供了一个排错的命令。

```bash
    $ fcitx-diagnose
```

　　通过这个命令，就可以看到缺少哪些依赖或有哪些问题，我这里使用的是Debian 8的64位系统，安装了fcitx之后， 系统会将一些库文件安装在`/usr/lib/x86_64-linux-gnu/`目录下，使得fcitx无法找到文件。这时候只需要使用`ln`命令将对应的库文件直接链接到fcitx能识别的目录中去就好了。
　　第一个是fcitx的插件目录：

```bash
    $ sudo ln -s /usr/lib/x86_64-linux-gnu/fcitx /usr/lib/fcitx/
```

　　第二个是gtk输入模块依赖：

```bash
    $ sudo ln -s /usr/lib/x86_64-linux-gnu/libgtk2.0-0/gtk-query-immodules-2.0 /usr/bin/gtk-query-immodules-2.0
    $ sudo ln -s /usr/lib/x86_64-linux-gnu/libgtk-3-0/gtk-query-immodules-3.0 /usr/bin/gtk-query-immodules-3.0
```

　　这两个是我在安装fcitx过程中遇到的比较奇怪的两个问题，也有一些其它问题。最后也是通过`fcitx-diagnose`中的查看报错信息解决了。

### 后续

　　完成fcitx的安装之后，就可以安装自己喜欢的输入法，包括rime, google-pinyin以及搜狗拼音等等。这里推荐安装配置一下云输入法的插件`Cloud Pinyin`，安装之后将默认的云输入的来源Google改为Baidu，并且根据自己的喜好调整云输入词汇在候选框的位置。
　　另外，我比较钟爱fcitx的另一个原因是，在Firefox（当然在Debian下默认的是Iceweasel）下搭配插件`Vimperator`，可以将以下配置写入`~/.vimperatorrc`中，自动转换每次Hint时的拼音输入模式为英文模式。

```vim
    nnoremap <silent> f :silent !fcitx-remote -c<CR>f
    nnoremap <silent> F :silent !fcitx-remote -c<CR>F
    nnoremap <silent> : :silent !fcitx-remote -c<CR>:
    nnoremap <silent> b :silent !fcitx-remote -c<CR>b
    nnoremap <silent> t :silent !fcitx-remote -c<CR>t
    nnoremap <silent> o :silent !fcitx-remote -c<CR>o
```
