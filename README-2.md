---
highlight: darcula
theme: smartblue
---

# 从尤雨溪发布 Vue 2.7 中，我学会了如何开发基于 miniprogram-ci 小工具，告别使用小程序开发者工具上传、预览

## 1. 前言

>大家好，我是[若川](https://lxchuan12.gitee.io)。**为了能帮助到更多对源码感兴趣、想学会看源码、提升自己前端技术能力的同学**。我倾力持续组织了一年[每周大家一起学习200行左右的源码共读活动](https://juejin.cn/post/7079706017579139102)，感兴趣的可以点此扫码加我微信 [ruochuan12](https://juejin.cn/pin/7005372623400435725) 参与。

想学源码，极力推荐关注我写的专栏（目前3K+人关注）[《学习源码整体架构系列》](https://juejin.cn/column/6960551178908205093) 包含`jQuery`、`underscore`、`lodash`、`vuex`、`sentry`、`axios`、`redux`、`koa`、`vue-devtools`、`vuex4`、`koa-compose`、`vue 3.2 发布`、`vue-this`、`create-vue`、`玩具vite`等20余篇源码文章。

[本文提到的工具已开源，可以直接克隆拿去用，也可以自行修改使用，https://github.com/lxchuan12/mp-cli.git，求个star^_^](https://github.com/lxchuan12/mp-cli.git)

估计有很多开发小程序的同学，还在使用微信开发者工具上传小程序。如果你是，那么这篇文章非常适合你。如果不是，同样也很适合你。TODO: 因为文章中有很多流程化。

## miniprogram-ci 官方文档

[miniprogram-ci 文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/ci.html)

### 上传

```js
const ci = require('miniprogram-ci')
;(async () => {
  const project = new ci.Project({
    appid: 'wxsomeappid',
    type: 'miniProgram',
    projectPath: 'the/project/path',
    privateKeyPath: 'the/path/to/privatekey',
    ignores: ['node_modules/**/*'],
  })
  const uploadResult = await ci.upload({
    project,
    version: '1.1.1',
    desc: 'hello',
    setting: {
      es6: true,
    },
    onProgressUpdate: console.log,
  })
  console.log(uploadResult)
})()
```

### 预览

```js
const ci = require('miniprogram-ci')
;(async () => {
  const project = new ci.Project({
    appid: 'wxsomeappid',
    type: 'miniProgram',
    projectPath: 'the/project/path',
    privateKeyPath: 'the/path/to/privatekey',
    ignores: ['node_modules/**/*'],
  })
  const previewResult = await ci.preview({
    project,
    desc: 'hello', // 此备注将显示在“小程序助手”开发版列表中
    setting: {
      es6: true,
    },
    qrcodeFormat: 'image',
    qrcodeOutputDest: '/path/to/qrcode/file/destination.jpg',
    onProgressUpdate: console.log,
    // pagePath: 'pages/index/index', // 预览页面
    // searchQuery: 'a=1&b=2',  // 预览参数 [注意!]这里的`&`字符在命令行中应写成转义字符`\&`
  })
  console.log(previewResult)
})()
```

## Taro 小程序插件 @tarojs/plugin-mini-ci

如果使用 Taro 开发的小程序，可以使用。

具体如何使用参考文档，我在本文中就不赘述了。

[小程序持续集成 @tarojs/plugin-mini-ci](https://taro-docs.jd.com/taro/docs/plugin-mini-ci/)

我组织的[源码共读第30期](https://juejin.cn/post/7082662027143053342)读的就是这个插件，非常值得学习。[@tarojs/plugin-mini-ci 源码解读可以参考 @NewName 的源码文章](https://juejin.cn/post/7089819849257385997)

我体验下来的感觉有以下几点可以优化。

- 不支持指定机器人
- 不支持不打包时上传
- 不支持官方提供的更多配置
- 不支持选择多个小程序批量上传等等

如果有时间我可能给 `Taro` 提 `PR`，当然不一定会被合并。

## uni-app 好像没有提供类似的插件

uni-app 好像没有提供类似的插件。需要自己动手，丰衣足食。

## release-it && 生成 changelog

于是我们自己动手，丰衣足食，写一个工具解决上面提到的问题，支持 `Taro` 打包后的小程序和 `uni-app` 打包后的，还有原生小程序上传和预览。

开发小工具之前，先提一下好用的工具，便于版本管理。

据说很多小伙伴的项目，没有打 `tag`、没有版本的概念，没有生成 `changelog`，没有配置 `eslint`、`prettier`，没有 `commit` 等规范。

这些其实不难，`commit` 规范一般安装 `git-cz` 即可，其他就不赘述了。

[release-it 官网仓库](https://github.com/release-it/release-it)

```bash
npm init release-it
# 选择 .release-it.json 用下面的配置，复制粘贴到 .release-it.json 中。
# 再安装 changelog 插件
npm i @release-it/conventional-changelog -D
```

```json
{
  "github": {
    "release": false
  },
  "git": {
    "commitMessage": "release: v${version}"
  },
  "npm": {
    "publish": false
  },
  "plugins": {
    "@release-it/conventional-changelog": {
      "preset": "angular",
      "infile": "CHANGELOG.md"
    }
  }
}
```

这样配置后，可以 `npm run release` 执行 `release-it` 版本。

### npm init release-it 原理

为啥 npm init 也可以直接初始化一个项目，带着疑问，我们翻看 npm 文档。

npm init

npm init 用法：

```bash
npm init [--force|-f|--yes|-y|--scope]
npm init <@scope> (same as `npx <@scope>/create`)
npm init [<@scope>/]<name> (same as `npx [<@scope>/]create-<name>`)
```

`npm init <initializer>` 时转换成 `npx` 命令：

```bash
npm init foo -> npx create-foo
npm init @usr/foo -> npx @usr/create-foo
npm init @usr -> npx @usr/create
```

看完文档，我们也就理解了：

**运行 `npm init release-it` => 相当于 `npx create-release-it`**

[create-release-it](https://github.com/release-it/create-release-it)

`npm init release-it` 原理其实就是 `npx create-release-it` 
选择一些配置，生成 `.release-it.json` 或者 `package.json` 的 `release-it` 配置。

再写入命令`release` 配置到 `package.json`。

```json
{
  scripts {
    "release": "release-it"
  }
}
```

最后执行 `npm install release-it --save-dev`
也就是源码里的 `await execa('npm', ['install', 'release-it', '--save-dev'], { stdio: 'inherit' });`。

[这行源码位置](https://github.com/release-it/create-release-it/blob/master/index.js#L120)

## 小程序上传初步实现

实现也比较简单。

### 添加功能支持指定参数

```js
const getParams = () => {
	const params = process.argv.slice(2);
	const paramsDefault = {
		default: {
			robot: 1,
			preview: false,
			upload: false,
			// 空跑，不执行
			dry: false,
			// 根据配置，单选还是多选来上传小程序
			useSelect: false,
			useMultiSelect: false,
		},
	};
	return require('minimist')(params, paramsDefault);
};

module.exports = {
	getParams,
};
```

### 支持读取项目的 `package.json` 的 `version`，也支持读取自定义`version`

```js
const { red, bold } = require('kolorist');
const getVersion = () => {
	let version;
	try {
		version = require(`${packageJsonPath}/package.json`).version;
	} catch (e) {
		console.log(e);
		console.log(
			red(
				bold(
					'未设置 version , 并且未设置 package.json 路径，无法读取 version',
				),
			),
		);
	}
	return version;
};

module.exports = {
	getVersion,
};
```

### 版本描述 支持指定 git commit hash 和作者

`git rev-parse --short HEAD` 读取 `git` 仓库最近一次的 `commit hash`。

`parse-git-config` 可以读取 `.git/config` 配置。

```js
// const path = require('path');
const { execSync } = require('child_process');
const parseGitConfig = require('parse-git-config');
const getDesc = (projectPath, version) => {
	// 获取最新 git 记录 7位的 commit hash
	let gitCommitHash = 'git commit hash 为空';
	try {
		gitCommitHash = execSync('git rev-parse --short HEAD', {
			cwd: projectPath,
		})
			.toString()
			.trim();
	} catch (e) {
		console.warn('获取 git commit hash 失败');
		console.warn(e);
	}

	// 获取项目的git仓库的 user.name
	let userName = '默认';
	try {
		const {
			user: { name = '默认' },
		} = parseGitConfig.sync({
			cwd: projectPath,
			path: '.git/config',
		});
		userName = name;
	} catch (e) {
		console.warn('获取 .git/config user.name 失败');
		console.warn(e);
	}

	const desc = `v${version} - ${gitCommitHash} - by@${userName}`;
	return desc;
};

module.exports = getDesc;
```

### 读取配置 wx.config.js 配置（更推荐）

当前也支持读取 `.env` 配置。读取 .env 配置，可以采用 `dotenv`。

但 `wx.config.js` 可以配置更多东西而且更灵活。所以更推荐。

感兴趣的可以研究 `vue-cli` 是如何读取 `vue.config.js` 配置的。围绕工作相关的学习，往往收益更大。

```js
// 读取 wx.config.js 配置
const loadWxconfig = (cwd) => {
	try {
		return require(path.join(cwd, 'wx.config.js'));
	} catch (e) {
		return {
			error: '未配置 wx.config.js 文件',
		};
	}
};

const parseEnv = () => {
	const cwd = process.cwd();

	let parsed = {};
	let wxconfig = loadWxconfig(cwd);
	if (wxconfig.error) {
		let dotenvResult = require('dotenv').config({
			path: path.join(cwd, './.env'),
		});

		parsed = dotenvResult.parsed;
		if (dotenvResult.error) {
			throw error;
		}
	} else {
		parsed = wxconfig;
	}
  // 代码有省略
}
```

### 支持选择多个小程序

### 支持多个批量上传

```js
```

### 接入 CI/CD、接入邮件提醒、接入钉钉、支持可视化操作等等

## 总结

TODO:
收获了。

TODO: 流程图
配图 上传效果图。
配置密钥


最后可以持续关注我@若川。欢迎点此扫码加我微信 [ruochuan12](https://juejin.cn/pin/7005372623400435725) 交流，参加[每周大家一起学习200行左右的源码共读活动](https://juejin.cn/post/7079706017579139102)，共同进步。
