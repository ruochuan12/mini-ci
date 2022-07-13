# mp-cli

> 基于微信小程序 miniprogram-ci 开发的上传小程序的自动化工具

[miniprogram-ci 官方文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/ci.html)

> 密钥及 IP 白名单配置 参考文档。一般来说自己使用，可以关闭 IP 白名单，因为 IP 地址可能变。

上传效果如下图所示：

![上传效果](./images/upload.png)

## 功能列表

-   [x] 支持指定参数 如 robot 默认是 1，命令：`yarn run upload --robot 2`
-   [x] 支持上传 `yarn run upload`
-   [x] 支持预览 `yarn run preview`
-   [x] 支持空跑，不执行 `yarn run upload --dry`
-   [x] 支持指定 git commit hash 和作者
-   [x] 支持单选多个小程序 `yarn run upload --useSelect`
-   [x] 支持选择多个批量上传 `yarn run upload --useMultiSelect`

```bash
参数可以相互结合。
--robot 2 [ 可选 1-30 ]
--dry 空跑
--useSelect 单选
--useMultiSelect 多选批量上传
```

## 可自行开发

```sh
git clone https://github.com/lxchuan12/mp-cli.git
cd mp-cli
yarn install
# 建议使用 yarn install
```

## 支持 wx.config.js 配置（推荐）

在当前的目录下配置`wx.config.js`，这个优先于 `.env`

```js
module.exports = {
	// # 可选，未填时 输出【未设置名称】
	name: '若川视野-小程序1-wx.config.js',
	// # 必填
	projectPath: '../tdesign-miniprogram-starter-retail',
	// # package.json 文件路径，读取 package.json 文件的版本号
	packageJsonPath: '../tdesign-miniprogram-starter-retail',
	// # 必填
	appid: 'wxdd3948dc1c7f95c2',
	// # 必填
	privateKeyPath: './key/private.wxdd3948dc1c7f95c2.key',
	// # 多个小程序配置的路径
	configPath: './config',
	// # 版本描述可选，默认会读取版本号和git commit hash 和作者
	// # 如：v1.0.0 - 4c29ae8 - by@若川
	desc: '版本描述可选',
	// # 版本号可选，默认读取 package.json 中的 version
	version: '1.0.0',
};
```

## .env 默认配置

```sh
# 可选，未填时 输出【未设置名称】
name="若川视野-小程序1"
# 必填
projectPath="../tdesign-miniprogram-starter-retail"
# package.json 文件路径，读取 package.json 文件的版本号
packageJsonPath="../tdesign-miniprogram-starter-retail"
# 必填
appid="wxdd3948dc1c7f95c2"
# 必填
privateKeyPath="./key/private.wxdd3948dc1c7f95c2.key"
# 需要支持单选和多选上传预览时 必填
# 多个小程序配置的路径
configPath="./config"
# 版本描述可选，默认会读取版本号和git commit hash 和作者
# 如：v1.0.0 - 4c29ae8 - by@若川
desc="版本描述可选"
# 版本号可选，默认读取 package.json 中的 version
version="1.0.0"
```

## `configPath` `json` 配置

参考 `config/example.json`

```json
{
	"name": "若川视野的小程序-默认",
	"appid": "wxdd3948dc1c7f95c2",
	"privateKeyPath": "./key/private.wxdd3948dc1c7f95c2.key",
	"projectPath": "../tdesign-miniprogram-starter-retail",
	"packageJsonPath": "../tdesign-miniprogram-starter-retail"
	// # 版本号可选，默认读取 package.json 中的 version
	"version": "1.0.0",
}
```

## 支持可视化操作 TODO

> 有空再开发

## TODO: 写文章
