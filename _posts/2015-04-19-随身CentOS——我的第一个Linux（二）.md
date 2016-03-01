---
title: 随身CentOS——我的第一个Linux （二）
date: 2015-04-19T14:44:32+00:00
layout: post
categories:
  - 技术互联
tags:
  - CentOS
  - Linux
  - USB
---

-----

### 五. 正式安装

　　开始的时时候会出现几个选择页面直接确定默认项，使用英语安装，并使用美式键盘。
　　安装源选择安装 Hard drive 本地硬盘（此时U盘就是本地硬盘）。
　　接下来就是一些安装选项的设置：

1.选择安装到自己的存储设备；

![screenshot-0002](http://guandong-dong.stor.sinaapp.com/uploads/2015/04/screenshot-0002.png)

2.选择准备安装的U盘，之后的步骤很简单，按照提示一步步就可以了；

![screenshot-0002](http://guandong-dong.stor.sinaapp.com/uploads/2015/04/screenshot-0002.png)

3.这里要注意选择自定义分区；

![screenshot-0009](http://guandong-dong.stor.sinaapp.com/uploads/2015/04/screenshot-0009.png)

4.分区的话，我们统一使用标准分区，先设置swap分区为4096Mb，然后剩下的都设为系统的跟目录分区，格式为ext4，确定之后会格式化所选分区;

![screenshot-0014](http://guandong-dong.stor.sinaapp.com/uploads/2015/04/screenshot-0014.png)

5.是否设置bootloader密码以及选择启动顺序；

![screenshot-0017](http://guandong-dong.stor.sinaapp.com/uploads/2015/04/screenshot-0017.png)

![screenshot-0018](http://guandong-dong.stor.sinaapp.com/uploads/2015/04/screenshot-0018.png)

6.选择安装模式，简易选择Desktop，如果U盘比较小的话，可以选择Minimal最小化安装，同时也可以选择安装的软件;

![screenshot-0019](http://guandong-dong.stor.sinaapp.com/uploads/2015/04/screenshot-0019.png)

7.耐心等待安装完成，大概会持续半个多小时。

![screenshot-0021](http://guandong-dong.stor.sinaapp.com/uploads/2015/04/screenshot-0021.png)

### 六．重启设置

1.看到下面的画面就可以重启，选择U盘启动了；

![screenshot-0023](http://guandong-dong.stor.sinaapp.com/uploads/2015/04/screenshot-0023.png)

2.添加用户，设置时间（建议使用网络时间，避免以后服务器设置出问题）；

![Screenshot-6](http://guandong-dong.stor.sinaapp.com/uploads/2015/04/Screenshot-6.png)

![Screenshot-7](http://guandong-dong.stor.sinaapp.com/uploads/2015/04/Screenshot-7.png)

3.设置Kdump大小（类似系统记录log记录），重启大功告成。

![Screenshot-8](http://guandong-dong.stor.sinaapp.com/uploads/2015/04/Screenshot-8.png)

![Screenshot](http://guandong-dong.stor.sinaapp.com/uploads/2015/04/Screenshot.png)

# 写在最后：

　　很遗憾的一点是我安装CentOS 6 系统的时候，并未成功，但是留下了宝贵的截图资料。而恰恰在成功安装的CentOS 7的时候又没有截图。而且至今我也没有搞懂为什么CentOS 6 的系统安装完成后执行rpm语句，会报出 Segmentation Fault (Core Dumped) 的错误提示。

　　以上是我对整个实践的记录，因为硬件等各方面的原因，可能在其它设备上，会出现另外我无法预料的错误，但是非常希望能够交流探讨，共同解决问题。

