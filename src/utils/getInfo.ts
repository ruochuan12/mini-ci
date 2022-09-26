// import pkg from '../../package.json' assert { type: 'json' };
import { version } from '../../package.json';

// import { loadJsonFileSync } from 'load-json-file';

export const getVersionInfo = (show: boolean) => {
	if (show) {
		// let { version } = loadJsonFileSync('./package.json');
		console.log('@ruochuan/mp-cli v' + version);
	}
};

export const getHelpInfo = (show: boolean) => {
	if (!show) {
		return;
	}
	const helpText = `@ruochuan/mp-cli v${version}

	Usage
		$ npx @ruochuan/mp-cli [options]
		$ 或者 npm i @ruochuan/mp-cli -g 全局安装后
		$ mp-cli [options]
		$ 或者：ruochuan-mp-cli [options]
		$ 或者：rmc [options]

	Configs
		$ 使用前查看 github 文档：https://github.com/lxchuan12/mp-cli
		$ 按照文档在项目中配置好 wx.config.js (参考：https://github.com/lxchuan12/mp-cli/blob/main/wx.config.js)
		$ 或者配置好 .env (参考：https://github.com/lxchuan12/mp-cli/blob/main/.env)

	Options
		-u, --upload             上传
		-p, --preview            预览
		-r, --robot              指定机器人 (default: 1)
		-d, --dry                空跑
		-s, --useSelect          单选
		-m, --useMultiSelect     多选
		-v, --version            显示当前版本
		-h, --help               显示帮助信息

	Examples
		$ mp-cli --upload
		$ mp-cli --upload --dry --robot 2
		$ mp-cli --preview
		$ mp-cli --preview --useSelect --dry --robot 2
		$ mp-cli --version
		$ mp-cli --help

	Docs
		$ 更多如何使用可查看 github 文档：https://github.com/lxchuan12/mp-cli
		$ 或者可查看 npm 文档：https://www.npmjs.com/package/@ruochuan/mp-cli
		$ 当然也可以克隆下来使用，可以根据要求自行修改`;

	console.log(helpText);
};
