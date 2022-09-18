// import pkg from '../../package.json' assert { type: 'json' };
import { loadJsonFileSync } from 'load-json-file';
import path from 'node:path';

export const getVersionInfo = (show) => {
	if (show) {
		let { version } = loadJsonFileSync(path.resolve('package.json'));
		return console.log('@ruochuan/mp-cli, v' + version);
	}
};

export const getHelpInfo = (show) => {
	if (show) {
		let msg = '';
		msg += '\n  Usage';
		msg += '\n    $ mp-cli [options]';
		msg += '\n    $ 或者：ruochuan-mp-cli [options]';
		msg += '\n    $ 或者：rmc [options]\n';

		msg += '\n  Configs';
		msg +=
			'\n    $ 使用前查看 github 文档：https://github.com/lxchuan12/mp-cli';
		msg +=
			'\n    $ 按照文档在项目中配置好 wx.config.js (参考：https://github.com/lxchuan12/mp-cli/blob/main/wx.config.js)';
		msg +=
			'\n    $ 或者配置好 .env (参考：https://github.com/lxchuan12/mp-cli/blob/main/.env)\n';

		msg += '\n  Options';
		msg += '\n    -u, --upload             上传';
		msg += '\n    -p, --preview            预览';
		msg += '\n    -r, --robot              指定机器人 (default: 1)';
		msg += '\n    -d, --dry                空跑';
		msg += '\n    -s, --useSelect          单选';
		msg += '\n    -m, --useMultiSelect     多选';
		msg += '\n    -v, --version            显示当前版本';
		msg += '\n    -h, --help               显示帮助信息\n';

		msg += '\n  Examples';
		msg += '\n    $ mp-cli --upload';
		msg += '\n    $ mp-cli --upload --dry --robot 2';
		msg += '\n    $ mp-cli --preview';
		msg += '\n    $ mp-cli --preview --useSelect --dry --robot 2';
		msg += '\n    $ mp-cli --version';
		msg += '\n    $ mp-cli --help\n';

		msg += '\n  Docs';
		msg +=
			'\n    $ 更多如何使用可查看 github 文档：https://github.com/lxchuan12/mp-cli';

		msg +=
			'\n    $ 或者可查看 npm 文档：https://www.npmjs.com/package/@ruochuan/mp-cli';
		msg += '\n    $ 当然也可以克隆下来使用，可以根据要求自行修改';
		return console.log(msg + '\n');
	}
};
