---
title: 随身CentOS——我的第一个Linux （二）
date: 2015-04-19T14:44:32+00:00
layout: post
guid: http://2.guandong.sinaapp.com/?p=741
categories:
  - 技术互联
tags:
  - CentOS
  - Linux
  - USB
---
### 五. 正式安装

开始的时时候会出现几个选择页面直接确定默认项，使用英语安装，并使用美式键盘。

安装源选择安装 Hard drive 本地硬盘（此时U盘就是本地硬盘）。

接下来就是一些安装选项的设置：

<h4 style="padding-left: 60px;">
  1.选择安装到自己的存储设备；
</h4>

[<img class="alignnone size-full wp-image-743" src="http://guandong-dong.stor.sinaapp.com/uploads/2015/04/screenshot-0003.png" alt="screenshot-0002" width="1366" height="768" />](http://guandong-dong.stor.sinaapp.com/uploads/2015/04/screenshot-0002.png)

<h4 style="padding-left: 60px;">
  2.选择准备安装的U盘，之后的步骤很简单，按照提示一步步就可以了；
</h4>

[<img class="alignnone size-full wp-image-743" src="http://guandong-dong.stor.sinaapp.com/uploads/2015/04/screenshot-0002.png" alt="screenshot-0002" width="1366" height="768" />](http://guandong-dong.stor.sinaapp.com/uploads/2015/04/screenshot-0002.png)

<h4 style="padding-left: 60px;">
  3.这里要注意选择自定义分区；
</h4>

[<img class="alignnone size-full wp-image-748" src="http://guandong-dong.stor.sinaapp.com/uploads/2015/04/screenshot-0009.png" alt="screenshot-0009" width="1366" height="768" />](http://guandong-dong.stor.sinaapp.com/uploads/2015/04/screenshot-0009.png)

<h4 style="padding-left: 60px;">
  4.分区的话，我们统一使用标准分区，先设置swap分区为4096Mb，然后剩下的都设为系统的跟目录分区，格式为ext4，确定之后会格式化所选分区;
</h4>

[<img class="alignnone size-full wp-image-749" src="http://guandong-dong.stor.sinaapp.com/uploads/2015/04/screenshot-0013.png" alt="screenshot-0013" width="1366" height="768" />](http://guandong-dong.stor.sinaapp.com/uploads/2015/04/screenshot-0013.png) [<img class="alignnone size-full wp-image-750" src="http://guandong-dong.stor.sinaapp.com/uploads/2015/04/screenshot-0014.png" alt="screenshot-0014" width="1366" height="768" />](http://guandong-dong.stor.sinaapp.com/uploads/2015/04/screenshot-0014.png)

<h4 style="padding-left: 60px;">
  5.是否设置bootloader密码以及选择启动顺序；
</h4>

[<img class="alignnone size-full wp-image-751" src="http://guandong-dong.stor.sinaapp.com/uploads/2015/04/screenshot-0017.png" alt="screenshot-0017" width="1366" height="768" />](http://guandong-dong.stor.sinaapp.com/uploads/2015/04/screenshot-0017.png)

[<img class="alignnone size-full wp-image-752" src="http://guandong-dong.stor.sinaapp.com/uploads/2015/04/screenshot-0018.png" alt="screenshot-0018" width="1366" height="768" />](http://guandong-dong.stor.sinaapp.com/uploads/2015/04/screenshot-0018.png)

<h4 style="padding-left: 60px;">
  6.选择安装模式，简易选择Desktop，如果U盘比较小的话，可以选择Minimal最小化安装，同时也可以选择安装的软件;
</h4>

[<img class="alignnone size-full wp-image-753" src="http://guandong-dong.stor.sinaapp.com/uploads/2015/04/screenshot-0019.png" alt="screenshot-0019" width="1366" height="768" />](http://guandong-dong.stor.sinaapp.com/uploads/2015/04/screenshot-0019.png)

<h4 style="padding-left: 60px;">
  7.耐心等待安装完成，大概会持续半个多小时。
</h4>

[<img class="alignnone size-full wp-image-754" src="http://guandong-dong.stor.sinaapp.com/uploads/2015/04/screenshot-0021.png" alt="screenshot-0021" width="1366" height="768" />](http://guandong-dong.stor.sinaapp.com/uploads/2015/04/screenshot-0021.png)

### 六．重启设置

<h4 style="padding-left: 60px;">
  1.看到下面的画面就可以重启，选择U盘启动了；
</h4>

[<img class="alignnone size-full wp-image-755" src="http://guandong-dong.stor.sinaapp.com/uploads/2015/04/screenshot-0023.png" alt="screenshot-0023" width="1366" height="768" />](http://guandong-dong.stor.sinaapp.com/uploads/2015/04/screenshot-0023.png)

<h4 style="padding-left: 60px;">
  2.添加用户，设置时间（建议使用网络时间，避免以后服务器设置出问题）；
</h4>

[<img class="alignnone size-full wp-image-745" src="http://guandong-dong.stor.sinaapp.com/uploads/2015/04/Screenshot-6.png" alt="Screenshot-6" width="1366" height="768" />](http://guandong-dong.stor.sinaapp.com/uploads/2015/04/Screenshot-6.png)

<img class="alignnone size-full wp-image-746" src="http://guandong-dong.stor.sinaapp.com/uploads/2015/04/Screenshot-7.png" alt="Screenshot-7" width="1366" height="768" />

<h4 style="padding-left: 60px;">
  3.设置Kdump大小（类似系统记录log记录），重启大功告成。
</h4>

[<img class="alignnone size-full wp-image-747" src="http://guandong-dong.stor.sinaapp.com/uploads/2015/04/Screenshot-8.png" alt="Screenshot-8" width="1366" height="768" />](http://guandong-dong.stor.sinaapp.com/uploads/2015/04/Screenshot-8.png)

[<img class="alignnone size-full wp-image-742" src="http://guandong-dong.stor.sinaapp.com/uploads/2015/04/Screenshot.png" alt="Screenshot" width="1366" height="768" />](http://guandong-dong.stor.sinaapp.com/uploads/2015/04/Screenshot.png)

# 写在最后：

<p style="padding-left: 30px;">
  很遗憾的一点是我安装CentOS 6 系统的时候，并未成功，但是留下了宝贵的截图资料。而恰恰在成功安装的CentOS 7的时候又没有截图。而且至今我也没有搞懂为什么CentOS 6 的系统安装完成后执行rpm语句，会报出 Segmentation Fault (Core Dumped) 的错误提示。
</p>

<p style="padding-left: 30px;">
  以上是我对整个实践的记录，因为硬件等各方面的原因，可能在其它设备上，会出现另外我无法预料的错误，但是非常希望能够交流探讨，共同解决问题。
</p>
