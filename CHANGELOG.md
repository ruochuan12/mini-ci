

# [0.11.0](https://github.com/lxchuan12/mini-ci/compare/0.10.3...0.11.0) (2022-10-02)


### Features

* 🎸 使用 cac 等重构优化，更名 mini-ci ([f80a62a](https://github.com/lxchuan12/mini-ci/commit/f80a62a4b329f94f494aa68168e5db91af05f6e2))
* 🎸 支持快速初始化配置、支持 js 或 json 配置、支持插件、支持上传预览前后替换文件等功能 ([c685203](https://github.com/lxchuan12/mini-ci/commit/c685203dca4fa1fac0181edf5020c9dee6ef4136))

## [0.10.3](https://github.com/lxchuan12/mp-cli/compare/0.10.2...0.10.3) (2022-09-25)


### Bug Fixes

* 🐛 修复 project.config.json setting 自动获取不对的问题 ([158074a](https://github.com/lxchuan12/mp-cli/commit/158074a131facd4dc6662851accb6ad1303046d3))
* 🐛 修复 wx.config.js 不存在，则获取 .env 配置问题 ([c13189d](https://github.com/lxchuan12/mp-cli/commit/c13189dca9d809d5cfc11a82b3b64e5997419923))
* 🐛 移除 parse-git-config 改用 git config user.name 修复路径不对获取不到问题 ([129d911](https://github.com/lxchuan12/mp-cli/commit/129d911945b2bd9f24d1c08af4fee7d1b02b0b72))

## [0.10.2](https://github.com/lxchuan12/mp-cli/compare/0.10.1...0.10.2) (2022-09-19)

## [0.10.1](https://github.com/lxchuan12/mp-cli/compare/0.10.0...0.10.1) (2022-09-19)


### Bug Fixes

* 🐛 修复 mp-cli not find 和目录调整等 ([36412b0](https://github.com/lxchuan12/mp-cli/commit/36412b0ca06d80bdc2be21d2463e2980fed9baa1))

# [0.10.0](https://github.com/lxchuan12/mp-cli/compare/0.9.1...0.10.0) (2022-09-18)


### Features

* 🎸 修改为 ts，引入 unbuild、esno 等优化、打包构建 ([6d451db](https://github.com/lxchuan12/mp-cli/commit/6d451dbcdae603f4fe819e854285f7734b7d32d5))

## [0.9.1](https://github.com/lxchuan12/mp-cli/compare/0.9.0...0.9.1) (2022-09-18)

# [0.9.0](https://github.com/lxchuan12/mp-cli/compare/0.8.0...0.9.0) (2022-09-18)


### Features

* 🎸 支持 commonjs 中的 wx.config.js，临时创建 wx.config.mjs 读取 ([3490f3e](https://github.com/lxchuan12/mp-cli/commit/3490f3e432d686a1fdaebbce56be21be5405d546))


### Reverts

* Revert "chore: 🤖 添加 npm.access public" ([bf92fcc](https://github.com/lxchuan12/mp-cli/commit/bf92fcc0a65e6ba9434f26b986edb951b8139cce))

# [0.8.0](https://github.com/lxchuan12/mp-cli/compare/0.7.0...0.8.0) (2022-08-07)


### Bug Fixes

* 🐛 修复 --version 版本号显示错误 ([0fa0ae8](https://github.com/lxchuan12/mp-cli/commit/0fa0ae8ec75b35f9a962f7909e1f24552fdd0494))


### Features

* 🎸 整体更新优化成 ES Module ([6ece4b7](https://github.com/lxchuan12/mp-cli/commit/6ece4b710eef6bee59a53fbc735d63342b74879c))

# [0.7.0](https://github.com/lxchuan12/mp-cli/compare/0.6.0...0.7.0) (2022-08-06)


### Features

* 🎸 添加上传、预览配置 setting 读取 项目路径下的 project.config.json setting ([6816390](https://github.com/lxchuan12/mp-cli/commit/6816390be34805595e9957796d03b67a7ec9be6f))

# [0.6.0](https://github.com/lxchuan12/mp-cli/compare/0.5.0...0.6.0) (2022-07-25)


### Features

* 🎸 更新 help 信息 ([37c226b](https://github.com/lxchuan12/mp-cli/commit/37c226b467bb06110b67baa87d0a0bcbe3ae319d))
* 🎸 添加 version help 和 alias 简写功能 ([23eae37](https://github.com/lxchuan12/mp-cli/commit/23eae37b8d6dab473222699a0c11049c22570b09))

# [0.5.0](https://github.com/lxchuan12/mp-cli/compare/0.4.0...0.5.0) (2022-07-24)


### Features

* 🎸 新增支持自定义 projectOptions uploadOptions previewOptions ([792c2dd](https://github.com/lxchuan12/mp-cli/commit/792c2ddcf336b361694b12a02d964025ee4c545a))

# [0.4.0](https://github.com/lxchuan12/mp-cli/compare/0.3.0...0.4.0) (2022-07-13)


### Features

* 🎸 支持 wx.config.js 配置(更推荐) 、支持可选 version 和可选 desc ([8fda254](https://github.com/lxchuan12/mp-cli/commit/8fda254d38c50979d3222d3a82ed292dedbe9b98))

# [0.3.0](https://github.com/lxchuan12/mp-cli/compare/0.2.0...0.3.0) (2022-07-12)


### Features

* 添加 env node ([4f4c610](https://github.com/lxchuan12/mp-cli/commit/4f4c610156f15e612dff31c8f7efe77380bda2e8))
* 添加 package.json 路径配置 ([23fb259](https://github.com/lxchuan12/mp-cli/commit/23fb259ab6566faccea22fd587b8db1bf59536cd))

# 0.2.0 (2022-07-10)


### Features

* 支持指定机器人、支持指定版本描述、空跑、单选、多选批量上传预览等功能 ([2dc7a25](https://github.com/lxchuan12/mp-cli/commit/2dc7a25b9b56f12baa6a88d3611b6ed185333e59))