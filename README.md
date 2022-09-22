# 项目简介

该项目目的是实现一个用于大屏的中国疫情地图，实时数据来自网易新闻提供的[接口](https://c.m.163.com/ug/api/wuhan/app/data/list-total)，技术栈采用 `Vue3`、 `element-plus`、 `tailwindCss` 以及 `echart`

## 目录结构

```
├─assets
│  └─json // 存放echarts所需中国地图的json文件 
├─components // echart 组件
├─hooks // 抽取可复用逻辑、状态
├─utils // 工具函数
└─views // 视图组件
```

## 代理

为解决跨域问题，在本地起了一个 node 代理，主要代码如下

```
import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
const app = express()

app.use('/list', createProxyMiddleware({
  target: 'https://c.m.163.com',
  changeOrigin: true,
  pathRewrite: {
    '^/list': ''
  },
}))

app.listen(3000)
```