---
layout: post
title: 微博自动备份与 Google Script 的简单介绍
tags: [weibo, Google Script]
categories:
  - 技术互联
---

### 微博的备份

　　微博的备份有很多种方法。包括但不限于：

- 收藏的微博直接导入有道云笔记
- @有道云笔记或者@印象笔记保存
- IFTTT 保存到印象笔记
- ...
- IFTTT 保存到 Google Spreadsheet

　　这里主要推荐一下最后一种方法，可以定时将发送的微博内容同步到一张表格里面。

### IFTTT 设置方法

　　IFTTT（If This Then That）是一个强大的第三方公开 API 接口调用网站，使用网站推荐或者自定义的 applets，可以实现很多有趣的功能。

　　而且 IFTTT 的设计也很有特色，字体很大，可以说是“岂止于大”了。

　　网站的使用方法很简单。只需要简单的登录绑定其它的第三方账号就可以了。虽然 IFTTT 使用的是第三方授权的方式，但是要严格保密 IFTTT 的密码也是必须要做的。

　　要同步微博内容到 Google Spreadsheet, 也是很简单的，只需要在 [Track all posts you publish on Sina Weibo in a Google spreadsheet](https://ifttt.com/applets/48906744d-track-all-posts-you-publish-on-sina-weibo-in-a-google-spreadsheet), 上链接微博和 Google 账号就可以了。

　　但是，有一个问题是：默认的设置 Google Spreadsheet 的文件名是微博用户名，如果微博用户名是中文名的话，就会创建大量重复的文件名，看起来比较乱。所以要在开始的时候改变文件的默认文件名。

　　到此微博的实时备份已经完成了。但是我是在使用默认设置个把月后才发现里面有很多重复的文件名，经过一番搜索我找到了 Google Script 来操作 Google Drive 里面的文件。

### Google Script 简介

　　Google Apps Script 提供了很多的操作方法，可以在线编辑，在线运行。而我只是想要将多个文件合并起来，在经过一番搜索实践后，整理了一个脚本如下所示。

```
function mergeSheets() {

  var SOURCE = "chinese-IFTTT-weibo-posts";
  var TARGET = "merged_sheet";

  /* Retrieve the desired folder */
  var myFolder = DriveApp.getFoldersByName(SOURCE).next();

  /* Get all spreadsheets that resided on that folder */
  var spreadSheets = myFolder.getFilesByType(MimeType.GOOGLE_SHEETS);

  /* Check file if exists */  
  var rootFolder = DriveApp.getRootFolder();
  var searchFiles = rootFolder.getFilesByName(TARGET);
  if(!searchFiles.hasNext()) {
    /* Create the new spreadsheet that you store other sheets */  
    var targetFile = SpreadsheetApp.create(TARGET);
  } else {
    /* Open had existed file */
    var targetFile = SpreadsheetApp.open(searchFiles.next());
  }
  var date = new Date();
  var sheetName = date.getYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getTime();
  var targetSheet = targetFile.insertSheet(sheetName, 0);

  /* Iterate over the spreadsheets over the folder */
  while(spreadSheets.hasNext()) {

    var sheet = spreadSheets.next();

    /* Open the spreadsheet */
    var spreadSheet = SpreadsheetApp.openById(sheet.getId());

    /* Get all its sheets */
    for(var y in spreadSheet.getSheets()) {

      /* Append the contents to a single spread sheet */
      var lastRow = spreadSheet.getSheets()[y].getLastRow();
      var lastColumn = spreadSheet.getSheets()[y].getLastColumn();
      var values = spreadSheet.getSheets()[y].getSheetValues(1, 1, lastRow, lastColumn);
      Logger.log(values);

      for(var i in values) {
        Logger.log(values[i]);
        targetSheet.appendRow(values[i]);
      }

      /* Copy the sheet to the new merged Spread Sheet */
      /* spreadSheet.getSheets()[y].copyTo(newSpreadSheet); */
    }
  }

}
```

　　其实就是使用 JavaScript 语言授权后调用接口实现的。不过提供的方法很多，对于需要自动化或者批量处理的情景下，可以提供很大的便利。

## 参考目录
- [1] [Merge Multiple Google Spreadsheets into One](https://ctrlq.org/code/19980-merge-google-spreadsheets)
- [2] [Drive Service | Apps Script | Google Developers](https://developers.google.com/apps-script/reference/drive/)
- [3] [Spreadsheet Service | Apps Script | Google Developers](https://developers.google.com/apps-script/reference/spreadsheet/)
