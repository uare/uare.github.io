---
title: 随身CentOS——我的第一个Linux (MarkDown完整版)
date: 2015-04-19T18:12:40+00:00
author: zhendong
layout: post
guid: http://2.guandong.sinaapp.com/?p=762
categories:
  - 技术互联
tags:
  - CentOS
  - Linux
  - USB
---
<pre style="font-family: Source Code Pro,monospace; font-size: .9em; white-space: pre-wrap; display: block; padding: 2px; margin: 0 0 1.1em; line-height: 1.45; word-break: break-word; word-wrap: break-word; color: #333; background-color: rgba(102,128,153,0.05); border: 0; border-radius: 5px; text-align: start; background: #f6f6f6;" xml:space="preserve"><code style="font-family: Source Code Pro,monospace; font-size: inherit; padding: 18px 28px; color: #f8f8f2; background-color: transparent; white-space: pre-wrap; border-radius: 0; display: block; background: #23241f;">  这是我的第一个Linux系统,因为硬盘实在是赛的东西太多了，所以一次偶然机会看见可以制作装进&lt;span style="color: #f92672;">U&lt;/span>盘随身Linux系统,就忍不住来试一下，做一些有益的探索。
</code></pre><section> 

<h2 style="font-family: inherit; font-weight: bold; line-height: 1.1; color: inherit; margin-top: 21px; margin-bottom: 10.5px; font-size: 2.15em; margin: 1.2em 0; text-align: start;">
  准备工具：
</h2>

<ol style="margin-top: 0; margin-bottom: 1.1em;">
  <li>
    闲置的32G存储空间U盘；
  </li>
  <li>
    CentOS7镜像文件；
  </li>
  <li>
    U盘刻录工具<a id="" style="background: transparent; color: #1980e6; text-decoration: none;" href="http://www.ezbsystems.com/ultraiso/index.html" target="_blank">UItroISO</a>；
  </li>
  <li>
    U盘分区工具<a id="" style="background: transparent; color: #1980e6; text-decoration: none;" href="http://www.diskgenius.cn/" target="_blank">DiskGenius</a>；
  </li>
  <li>
    可以U盘启动电脑。
  </li>
</ol></section> <section> 

<h2 style="font-family: inherit; font-weight: bold; line-height: 1.1; color: inherit; margin-top: 21px; margin-bottom: 10.5px; font-size: 2.15em; margin: 1.2em 0; text-align: start;">
  注释：
</h2>

<ol style="margin-top: 0; margin-bottom: 1.1em;">
  <li>
    <p style="margin: 0 0 1.1em;">
      16GU盘应该也是可以的，8G的U盘可能就有些吃力了，因为CentOS7镜像文件就比较大，包括安装之后的系统文件，可供实际使用的存储空间就更少了；
    </p>
  </li>
  
  <li>
    <p style="margin: 0 0 1.1em;">
      U盘刻录刻录工具很多，我使用的是软碟通<a id="" style="background: transparent; color: #1980e6; text-decoration: none;" href="http://www.ezbsystems.com/ultraiso/index.html" target="_blank">UItroISO</a>，其它像Windows Installer，老毛桃等等还有很多，但是不保证任意一个都能完整刻录ISO文件，U盘分区工具同理；
    </p>
  </li>
  
  <li>
    <p style="margin: 0 0 1.1em;">
      以下的截图都是我在未安装成功CentOS 6时的截图，尽量按照我的理解详细解释，CentOS 7的安装步骤大同小异。
    </p>
  </li>
</ol></section> <section> 

<h2 style="font-family: inherit; font-weight: bold; line-height: 1.1; color: inherit; margin-top: 21px; margin-bottom: 10.5px; font-size: 2.15em; margin: 1.2em 0; text-align: start;">
  安装步骤：
</h2>

<pre style="font-family: Source Code Pro,monospace; font-size: .9em; white-space: pre-wrap; display: block; padding: 2px; margin: 0 0 1.1em; line-height: 1.45; word-break: break-word; word-wrap: break-word; color: #333; background-color: rgba(102,128,153,0.05); border: 0; border-radius: 5px; text-align: start; background: #f6f6f6;" xml:space="preserve"><code style="font-family: Source Code Pro,monospace; font-size: inherit; padding: 18px 28px; color: #f8f8f2; background-color: transparent; white-space: pre-wrap; border-radius: 0; display: block; background: #23241f;">&lt;span style="color: #75715e;">下载镜像&lt;/span>&lt;span style="color: #ae81ff;">-&lt;/span>&lt;span style="color: #ae81ff;">-&lt;/span>&lt;span style="color: #ae81ff;">-&lt;/span>&lt;span style="color: #ae81ff;">-&lt;/span>&gt;&lt;span style="color: #75715e;">写入U盘&lt;/span>&lt;span style="color: #ae81ff;">-&lt;/span>&lt;span style="color: #ae81ff;">-&lt;/span>&lt;span style="color: #ae81ff;">-&lt;/span>&lt;span style="color: #ae81ff;">-&lt;/span>&gt;&lt;span style="color: #75715e;">更改分区&lt;/span>&lt;span style="color: #ae81ff;">-&lt;/span>&lt;span style="color: #ae81ff;">-&lt;/span>&lt;span style="color: #ae81ff;">-&lt;/span>&lt;span style="color: #ae81ff;">-&lt;/span>&gt;&lt;span style="color: #75715e;">修改启动&lt;/span>&lt;span style="color: #ae81ff;">-&lt;/span>&lt;span style="color: #ae81ff;">-&lt;/span>&lt;span style="color: #ae81ff;">-&lt;/span>&lt;span style="color: #ae81ff;">-&lt;/span>&gt;&lt;span style="color: #75715e;">正式安装&lt;/span>&lt;span style="color: #ae81ff;">-&lt;/span>&lt;span style="color: #ae81ff;">-&lt;/span>&lt;span style="color: #ae81ff;">-&lt;/span>&lt;span style="color: #ae81ff;">-&lt;/span>&gt;&lt;span style="color: #75715e;">重启设置&lt;/span>
</code></pre>

<p style="margin: 0 0 1.1em;">
  一. 下载镜像
</p>

下载CentOS 7的镜像文件，为了能够更快的下载下来可以选择国内的镜像点，像网易，搜狐和好多大学的都是有的，这里我选择的是<a id="" style="background: transparent; color: #1980e6; text-decoration: none;" href="http://mirrors.xmu.edu.cn/" target="_blank">厦大的开源软件镜像点</a>。

<p style="margin: 0 0 1.1em;">
  二. 写入镜像
</p>

使用软碟通UItraIOS写入镜像的程序很简单，要注意的是写入镜像会将U盘格式化，提前备份U盘数据。在写完后记得查看/Packages/和/repodata/两个文件夹下的文件名是否正确，因为有可能在写入镜像的过程中因为文件名太长而截断导致显示不完全。其中，/Packages/中的文件除了一个TRANS.TBL都是以rpm结尾的，/repodata/中的文件大部分是以xml，gz，bz2结尾的。检查的时候最好还是对应镜像网站上的OS文件夹做一下对比就一目了然了。

<p style="margin: 0 0 1.1em;">
  三. 更改分区
</p>

运行DiskGenius，将U盘现在的分区进行压缩，留下空余分区，我是将U盘分区压缩到8G，剩下的留给安装CentOS 7系统了。这个分区在安装完成后是还可以留作普通U盘使用的，所以大小可以自己合理设置。

![](http://guandong-dong.stor.sinaapp.com/uploads/2015/04/diskgenius.png)

<p style="margin: 0 0 1.1em;">
  四. 修改启动
</p>

分区更改好后，重启电脑在开机后立即按下F12选择电脑启动选项（这里不同的电脑按键设置是不一样的，只要能够进入BIOS系统更改系统启动选项就好）。这里我们选择U盘启动为第一启动，如果当时电脑有插入多个USB设备，请确定你U盘的盘符。

第一次进入后选择第一项 Install CentOS 7直接安装或者第二项 Test this media & install CentOS 7 检测硬件再安装都可以，之后等待系统启动。如果不出意外，这时系统会启动失败，现实无法找到boot文件夹。这是不要着急，先输入 cd /dev/ 查看当前所有设备。然后再输入 ls sd\* 缩小查找范围。这时一般情况下会出现 sdb sdb1 sda sda1 sda2 sda3 sda4。其中sdb1就是指我们镜像刻录的U盘分区，记住这串字符。另外sda\*的数量则取决于当前电脑硬盘的分区数目。这时我们按下 Ctrl+Alt+Delete重启电脑。

同样开机时按下F12的选择U盘启动。在第一个选择界面的第一项或者第二项按下Tab键，编辑其同安装文件源，将从hed:开始到第一个空格的地方删掉改成 /dev/sdb1/ ,按下回车Enter执行安装程序。

五. 正式安装

开始的时时候会出现几个选择页面直接确定默认项，使用英语安装，并使用美式键盘。

安装源选择安装 Hard drive 本地硬盘（此时U盘就是本地硬盘）。

接下来就是一些安装选项的设置：

<ol style="margin-top: 0; margin-bottom: 1.1em;">
  <li>
    选择安装到自己的存储设备；<img src="http://guandong-dong.stor.sinaapp.com/uploads/2015/04/screenshot-0002.png" alt="" />
  </li>
  <li>
    选择准备安装的U盘，之后的步骤很简单，按照提示一步步就可以了；<img src="http://guandong-dong.stor.sinaapp.com/uploads/2015/04/screenshot-0002.png" alt="" />
  </li>
  <li>
    这里要注意选择自定义分区；<img src="http://guandong-dong.stor.sinaapp.com/uploads/2015/04/screenshot-0009.png" alt="" />
  </li>
  <li>
    分区的话，我们统一使用标准分区，先设置swap分区为4096Mb，然后剩下的都设为系统的跟目录分区，格式为ext4，确定之后会格式化所选分区;<img src="http://guandong-dong.stor.sinaapp.com/uploads/2015/04/screenshot-0013.png" alt="" /><img src="http://guandong-dong.stor.sinaapp.com/uploads/2015/04/screenshot-0014.png" alt="" />
  </li>
  <li>
    是否设置bootloader密码以及选择启动顺序；<img src="http://guandong-dong.stor.sinaapp.com/uploads/2015/04/screenshot-0017.png" alt="" /><img src="http://guandong-dong.stor.sinaapp.com/uploads/2015/04/screenshot-0018.png" alt="" />
  </li>
  <li>
    选择安装模式，简易选择Desktop，如果U盘比较小的话，可以选择Minimal最小化安装，同时也可以选择安装的软件;<img src="http://guandong-dong.stor.sinaapp.com/uploads/2015/04/screenshot-0019.png" alt="" />
  </li>
  <li>
    耐心等待安装完成，大概会持续半个多小时。<img src="http://guandong-dong.stor.sinaapp.com/uploads/2015/04/screenshot-0021.png" alt="" />
  </li>
</ol>

<p style="margin: 0 0 1.1em;">
  六．重启设置
</p>

<ol style="margin-top: 0; margin-bottom: 1.1em;">
  <li>
    看到下面的画面就可以重启，选择U盘启动了；<img src="http://guandong-dong.stor.sinaapp.com/uploads/2015/04/screenshot-0023.png" alt="" />
  </li>
  <li>
    添加用户，设置时间（建议使用网络时间，避免以后服务器设置出问题）；<img src="http://guandong-dong.stor.sinaapp.com/uploads/2015/04/Screenshot-6.png" alt="" /><img src="http://guandong-dong.stor.sinaapp.com/uploads/2015/04/Screenshot-7.png" alt="" />
  </li>
  <li>
    设置Kdump大小（类似系统记录log记录），重启大功告成。<img src="http://guandong-dong.stor.sinaapp.com/uploads/2015/04/Screenshot-8.png" alt="" /><img src="http://guandong-dong.stor.sinaapp.com/uploads/2015/04/Screenshot.png" alt="" />
  </li>
</ol></section> <section> 

<h2 style="font-family: inherit; font-weight: bold; line-height: 1.1; color: inherit; margin-top: 21px; margin-bottom: 10.5px; font-size: 2.15em; margin: 1.2em 0; text-align: start;">
  写在最后：
</h2>

<blockquote style="padding: 15px 20px; margin: 0 0 1.1em; border-left: 5px solid rgba(102,128,153,0.075); border-left-width: 10px; background-color: rgba(102,128,153,0.05); border-top-right-radius: 5px; border-bottom-right-radius: 5px;">
  <p style="margin: 0 0 1.1em; font-size: 1em; font-weight: 300; line-height: 1.45; margin-bottom: 0;">
    很遗憾的一点是我安装CentOS 6 系统的时候，并未成功，但是留下了宝贵的截图资料。而恰恰在成功安装的CentOS 7的时候又没有截图。而且至今我也没有搞懂为什么CentOS 6 的系统安装完成后执行rpm语句，会报出 Segmentation Fault
  </p>
  
  <p>
    (Core Dumped) 的错误提示。
  </p>
  
  <p>
    以上是我对整个实践的记录，因为硬件等各方面的原因，可能在其它设备上，会出现另外我无法预料的错误，但是非常希望能够交流探讨，共同解决问题。
  </p>
</blockquote>

<p style="margin: 0 0 1.1em;">
  <strong style="font-weight: bold;">MarkDown</strong>
</p>

<strong style="font-weight: bold;">2015年4月19日</strong></section>