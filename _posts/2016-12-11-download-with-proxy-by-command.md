---
layout: post
title: 命令行使用代理下载的三种方式
tags: [proxy, aria2c]
categories:
  - 技术互联
---

## 使用 polipo 将 socks 代理转为 http/https

　　socks 代理已经越来越普及，大部分的软件的设置都可以在设置代理的时候选择 socks 代理。但是对于不支持的软件，我们可以使用 polipo 将 socks 代理转为 http 代理。

### 安装方法

```
brew install polipo # for MacOS
sudo aptitude install polipo # for Debian/Ubuntu
```

### 更改配置

　　修改 polipo 的配置目录默认配置文件（ /etc/polipo/config 或者 /usr/local/etc/polipo/config ），添加以下配置：

```
socksParentProxy = "127.0.0.1:1080"
socksProxyType = socks5
proxyAddress = "::0"        # both IPv4 and IPv6
# or IPv4 only
# proxyAddress = "0.0.0.0"
proxyPort = 8123
```

　　重启 polipo 服务即可成功。

```
brew services restart polipo # for MacOS
sudo systemctl restart polipo # for Debian/Ubuntu
```

## 常见三种下载命令的代理设置

### curl

```
curl --proxy http://127.0.0.1:8123 www.google.com
```

　　注：curl 支持 socks 代理（--socks4/socks5）。

### wget

```
# or set environment variable 
# export http_proy=http://127.0.0.1:8123
wget -e http_proxy=http://127.0.0.1:8123 $url
```

　　如果下载的链接为 https，则需要改为设置 `https_proxy` 。

### aria2c

```
aria2c --http-proxy 'http://127.0.0.1' $url # or use --https-proxy
```

　　办法总是有的，只不过还是想要表达不满，这样无形提高了很多新技术的学习成本，普通人接触的新技术就更少了。

