## 使用 VUE 搭建的后台管理页面

此框架基于 **vue-admin-template** 的二次开发

**版本**

**vue：2.6.10**

**vue-admin-template： 4.4.0**

**element-ui：2.13.2**



## 主要开发目录结构 src

```
src/
|-- api					接口目录
|-- components			功能组件目录
|-- layout				页面结构组件目录
|-- store				接口管理目录
|-- styles 				样式目录
|-- utils				工具目录
`-- views 				视图目录
```

开发环境服务器接口配置文件: **.env.development**

生产环境服务器配置文件: **.env.production**



## 后台接口代码

使用 Go 搭建的 API 后台：**[api-go](https://github.com/wantidea/api-go)**



## 使用

开发：

```bash
npm install
npm run dev
```

生产部署：

```bash
npm install
npm run build:prod
```

