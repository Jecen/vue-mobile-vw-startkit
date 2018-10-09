# 天阙FED 基于 vw 适配的 Vue 模版

## 基本指令
To start:

```bash
$ npm install
```

To develop:

```bash
$ npm run dev
```

To build for production:

```bash
$ npm run build
```

To lint you code:

```bash
$ npm run lint
```


---
## 项目结构
```
+-- build -> webpack配置文件 代理配置
|
+-- client
|   +-- assets -> 资源目录
|   |   +-- css -> 样式资源文件
|   |   +-- img -> 图片资源文件
|   |   +-- lib -> 第三方库资源文件
|   |
|   +-- components -> 全局组件目录
|   |   +-- Component -> 组件
|   |       +-- index.vue -> 组件模版文件
|   |       +-- cell -> 组件下子组件文件夹
|   |
|   +-- router -> 路由配置
|   |   +-- fatherA -> 拥有子路由的页面A
|   |   |   +--> index.js -> 页面A模块路由的配置
|   |   +-- fatherB -> 拥有子路由的页面B
|   |   |   +--> index.js -> 页面B模块路由的配置
|   |   |
|   |   +-- index.js -> 各级路由的汇总配置
|   |
|   +-- store -> vuex配置
|   |   +-- modules -> vuex模块文件夹
|   |   +-- index.js
|   |
|   +-- views -> 视图文件夹
|   |   +-- home -> home 模块
|   |   |   +-- children -> home 模块的子路由目录
|   |   |   |   +-- home-children-one -> home 模块的子路由 home-children-one
|   |   |   |   |   +-- index.vue -> home 模块的子路由 home-children-one 组件
|   |   |   |   |   +-- components -> 页面组件目录
|   |   |   |   |   +-- children -> 子路由视图目录
|   |   |   |   |
|   |   |   |   +-- etc
|   |   |   |
|   |   |   +-- index.vue -> home 组件
|   |   |   +-- components -> 页面组件
|   |   |
|   |   +-- login -> login 模块
|   |   |   +-- children -> login 模块的子路由目录
|   |   |   |   +-- login-children-one -> login 模块的子路由 login-children-one
|   |   |   |   |   +-- index.vue -> login 模块的子路由 login-children-one 组件
|   |   |   |   |   +-- components -> 页面组件目录
|   |   |   |   |   +-- children -> 子路由视图目录
|   |   |   |   |
|   |   |   |   +-- etc
|   |   |   |
|   |   |   +-- index.vue -> login 组件
|   |   |   +-- components -> 页面组件
|   |   |
|   |   +-- index.vue -> Root 组件
|   |
|   +-- app.js -> 应用配置
|   |
|   +-- index.js -> root
|
+-- static -> 静态资源目录
```
## vw 配置
配置文件位于[project dir]/.postcssrc.js
* 确定设计稿尺寸
* 修改```.postcssrc.js```中```postcss-px-to-viewport```插件```viewportWidth```对应的值
```
"postcss-px-to-viewport": {
    "unitToConvert": 'px', // 转换的目标单位
    "viewportWidth": 750, // 设计稿尺寸
    "unitPrecision": 5, // 
    "viewportUnit": 'vw',
    "fontViewportUnit": 'vw',  // 转换的单位
    "selectorBlackList": ['ig'], // 忽略转换规则的关键字
    "minPixelValue": 1,
    "mediaQuery": false
},
```

