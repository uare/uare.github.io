---
title: 随身CentOS——我的第一个Linux （一）
date: 2015-04-18T22:00:07+00:00
layout: post
categories:
  - 技术互联
tags:
  - CentOS
  - Linux
  - USB
---

------

　　这是我的第一个Linux系统,因为硬盘实在是赛的东西太多了，所以一次偶然机会看见可以制作装进U盘随身Linux系统,就忍不住来试一下，做一些有益的探索。

## 准备工具：

1. 闲置的32G存储空间U盘；
2. CentOS7镜像文件；
3. U盘刻录工具UItroISO；
4. U盘分区工具[DiskGenius](http://www.diskgenius.cn/)；
5. 可以U盘启动电脑。

## 注释：

1. 16GU盘应该也是可以的，8G的U盘可能就有些吃力了，因为CentOS7镜像文件就比较大，包括安装之后的系统文件，可供实际使用的存储空间就更少了；
2. U盘刻录刻录工具很多，我使用的是软碟通[UItraISO](http://www.ezbsystems.com/ultraiso/index.html)，其它像Windows Installer，老毛桃等等还有很多，但是不保证任意一个都能完整刻录ISO文件，U盘分区工具同理；
3. 以下的截图都是我在未安装成功CentOS 6时的截图，尽量按照我的理解详细解释，CentOS 7的安装步骤大同小异。

## 安装步骤：

　　下载镜像-->写入U盘-->更改分区-->修改启动-->正式安装-->重启设置

### 下载镜像

　　下载CentOS 7的镜像文件，为了能够更快的下载下来可以选择国内的镜像点，像网易，搜狐和好多大学的都是有的，这里我选择的是[厦大的开源软件镜像点](http://mirrors.xmu.edu.cn/)。

### 写入镜像

　　使用软碟通UItraIOS写入镜像的程序很简单，要注意的是写入镜像会将U盘格式化，提前备份U盘数据。在写完后记得查看/Packages/和/repodata/两个文件夹下的文件名是否正确，因为有可能在写入镜像的过程中因为文件名太长而截断导致显示不完全。其中，/Packages/中的文件除了一个TRANS.TBL都是以rpm结尾的，/repodata/中的文件大部分是以xml，gz，bz2结尾的。检查的时候最好还是对应镜像网站上的OS文件夹做一下对比就一目了然了。

### 更改分区

　　运行DiskGenius，将U盘现在的分区进行压缩，留下空余分区，我是将U盘分区压缩到8G，剩下的留给安装CentOS 7系统了。这个分区在安装完成后是还可以留作普通U盘使用的，所以大小可以自己合理设置。

![diskgenius](http://guandong-dong.stor.sinaapp.com/uploads/2015/04/diskgenius.png)

### 修改启动

　　分区更改好后，重启电脑在开机后立即按下F12选择电脑启动选项（这里不同的电脑按键设置是不一样的，只要能够进入BIOS系统更改系统启动选项就好）。这里我们选择U盘启动为第一启动，如果当时电脑有插入多个USB设备，请确定你U盘的盘符。
　　第一次进入后选择第一项 Install CentOS 7直接安装或者第二项 Test this media & install CentOS 7 检测硬件再安装都可以，之后等待系统启动。如果不出意外，这时系统会启动失败，现实无法找到boot文件夹。这是不要着急，先输入 cd /dev/ 查看当前所有设备。然后再输入 ls sd\* 缩小查找范围。这时一般情况下会出现 sdb sdb1 sda sda1 sda2 sda3 sda4。其中sdb1就是指我们镜像刻录的U盘分区，记住这串字符。另外sda\*的数量则取决于当前电脑硬盘的分区数目。这时我们按下 Ctrl+Alt+Delete重启电脑。
　　同样开机时按下F12的选择U盘启动。在第一个选择界面的第一项或者第二项按下Tab键，编辑其同安装文件源，将从hed:开始到第一个空格的地方删掉改成 /dev/sdb1/ ,按下回车Enter执行安装程序。

**后面的步骤请移步[第二部分](http://2.guandong.sinaapp.com/archives/741)！**
