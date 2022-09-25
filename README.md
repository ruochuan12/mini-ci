# mp-cli

![npm version](https://img.shields.io/npm/v/@ruochuan/mp-cli)
![npm download](https://img.shields.io/npm/dm/mp-cli)
![github forks](https://img.shields.io/github/forks/lxchuan12/mp-cli?style=social)
![github stars](https://img.shields.io/github/stars/lxchuan12/mp-cli?style=social)
![github watchers](https://img.shields.io/github/watchers/lxchuan12/mp-cli?style=social)
![github license](https://img.shields.io/github/license/lxchuan12/mp-cli)

> 基于微信小程序 `miniprogram-ci` 开发的上传小程序的自动化工具

[miniprogram-ci 官方文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/ci.html)

> 密钥及 IP 白名单配置 参考文档。一般来说自己使用，可以关闭 IP 白名单，因为 IP 地址可能变。

## 支持的功能

![支持的功能](./images/xmind.png)

显示帮助信息

![显示帮助信息](./images/version-and-help-v0.9.0.png)

上传效果

![上传效果](./images/upload.png)

预览效果就是在控制台显示二维码。

## 使用及功能列表

```bash
npm i @ruochuan/mp-cli -g
# 查看帮助
mp-cli -h
mp-cli --help

# 查看版本号
mp-cli -v
mp-cli --version

# 或者别名 ruochuan-mp-cli 、rmc
ruochuan-mp-cli --help
rmc --help

# 或者不全局安装 npx @ruochuan/mp-cli --help
```

-   [x] 支持上传 `mp-cli --upload`
-   [x] 支持预览 `mp-cli --preview`
-   [x] 支持指定参数 如 `robot` 默认是 1，命令：`mp-cli --upload --robot 2`
-   [x] 支持空跑，不执行 `mp-cli --upload --dry`
-   [x] 支持指定 `git commit hash` 和作者
-   [x] 支持单选多个小程序 `mp-cli --upload --useSelect`
-   [x] 支持选择多个批量上传 `mp-cli --upload --useMultiSelect`
-   [x] 支持自定义的 `projectOptions`、`uploadOptions`、`previewOptions` 配置，参考 `wx.config.js` 配置

```bash
参数可以相互结合。
--robot 2 [ 可选 1-30 ]
--dry 空跑
--useSelect 单选
--useMultiSelect 多选批量上传
```

## 使用前需先配置 `wx.config.js` 配置（更推荐）

在当前小程序项目的目录下配置 `wx.config.js`，这个优先于 `.env`

参考[当前项目中的 `wx.config.js`](https://github.com/lxchuan12/mp-cli/blob/main/wx.config.js)

按照[微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/ci.html)配置小程序密钥等，这样就能上传和预览了。如果没有微信小程序，可以自行免费开通个人的[微信小程序](https://mp.weixin.qq.com/)。

## 或者配置 `.env`

在当前小程序项目的目录下配置 `.env`

参考[当前项目中的 `.env`](https://github.com/lxchuan12/mp-cli/blob/main/.env)

## `configPath` `json` 配置

如果需要多选时，需配置 `configPath`。

参考 [当前项目中的 `config/example.json`](https://github.com/lxchuan12/mp-cli/blob/main/config/example.json)

## 可自行开发

```bash
# 克隆我写的 mp-cli 工具
git clone https://github.com/lxchuan12/mp-cli.git
cd mp-cli
yarn install
# 没有自己的小程序可以克隆腾讯开源的电商小程序
git clone https://github.com/lxchuan12/tdesign-miniprogram-starter-retail.git
# 切到分支 feature/release-it
git checkout feature/release-it
```

可以克隆我的项目，到一个目录中，比如 `projects` 中。

再克隆我的另外一个小程序（腾讯开源的电商小程序），到同一个目录中。比如 `projects` 中。

## TODOs

-   [x] 使用 `ES Module` 开发
-   [x] 初步引入 `TS`
-   [ ] cwd
-   [ ] 校验 nodejs 版本
-   [ ] 加入测试
-   [ ] 支持可视化操作

## 原理文章

文章已完成[README-2](./README-2.md)，也已发布在掘金。

[听说你还在用开发者工具上传小程序，我从尤雨溪那学会了基于 miniprogram-ci 开发脚手架工具，提效摸鱼](https://juejin.cn/post/7124467547163852808)

**注意**：文章是基于 [`tag v0.7.0`](https://github.com/lxchuan12/mp-cli/tree/0.7.0) 撰写。后续 `mp-cli` 会持续更新，文章可能不会更新。
