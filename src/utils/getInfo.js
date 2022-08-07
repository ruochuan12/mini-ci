// import pkg from '../../package.json' assert { type: 'json' };
import { loadJsonFileSync } from 'load-json-file';

export const getVersionInfo = (show) => {
	if (show) {
		let { version } = loadJsonFileSync('../../package.json');
		return console.log('@ruochuan/mp-cli, v' + version);
	}
};

export const getHelpInfo = (show) => {
	if (show) {
		let msg = '';
		msg += '\n  Usage';
		msg += '\n    $ node src/index.js [options]\n';
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
		msg += '\n    $ node src/index.js --upload';
		msg += '\n    $ node src/index.js --upload --dry --robot 2';
		msg += '\n    $ node src/index.js --preview';
		msg +=
			'\n    $ node src/index.js --preview --useSelect --dry --robot 2';
		msg += '\n    $ node src/index.js --version';
		msg += '\n    $ node src/index.js --help';
		msg += '\n  Docs';
		msg +=
			'\n    $ 更多如何使用可查看文档：https://github.com/lxchuan12/mp-cli';
		msg +=
			'\n    $ 注意：当前未在 npm 发包，建议克隆下来使用，也可以根据要求自行修改';
		return console.log(msg + '\n');
	}
};
