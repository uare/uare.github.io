---
layout: post
title: 命令行解析 json 数据
tags: [jq, json]
categories:
  - 技术互联
---

### jq 简介

　　JSON 是很常见的一种数据传输格式，也常常用于配置文件，虽然各种语言都有响应的 JSON 解析处理方法，但是平时遇到大的数据文件，或者 API 的返回没有格式化的情况下，除了使用脚本语言之外，jq 提供了一种命令行方式的运行方式，配合 Linux 的管道，更加方便使用。

　　而且 jq 是 C 编写的，没有任何运行依赖，一次编译可以复制到其他服务器，无需再次编译。

### 简单用法

- 格式化输出

```
curl "https://api.github.com/repos/uare/uare.github.io/commits?per_page=5" | jq '.'
```

- 数组操作

```
curl "https://api.github.com/repos/uare/uare.github.io/commits?per_page=5" | jq '.[0]'
curl "https://api.github.com/repos/uare/uare.github.io/commits?per_page=5" | jq '.[]'  #  array/object value iterator
curl "https://api.github.com/repos/uare/uare.github.io/commits?per_page=5" | jq '.[1:2]'  #  array/slice slice
curl "https://api.github.com/repos/uare/uare.github.io/commits?per_page=5" | jq '.[]?'  #  no error
```

- 取对象属性

```
curl "https://api.github.com/repos/uare/uare.github.io/commits?per_page=5" | jq '.[].url'
curl "https://api.github.com/repos/uare/uare.github.io/commits?per_page=5" | jq '.[].urls?'  #  optional output no error
curl "https://api.github.com/repos/uare/uare.github.io/commits?per_page=5" | jq '.[] | .["url"]' |  #  equality, for special characters
curl "https://api.github.com/repos/uare/uare.github.io/commits?per_page=5" | jq '.[] | .url, .html_url'
```

- 管道

```
curl "https://api.github.com/repos/uare/uare.github.io/commits?per_page=5" | jq '.[0] | .url'
```

- 运算

```
echo 1 | jq '(. + 2) * 5'
```


## 参考目录

- [1] [jq official site](https://stedolan.github.io/jq/)
