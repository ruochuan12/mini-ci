import { cac } from 'cac';
import { link } from 'kolorist';
import { InlineConfig } from './types';
import { init, upload, preview } from './commands';
import { VERSION } from './const';
import logger from './logger';

const cli = cac('mini-ci');

cli.option('-d, --dry', '空跑');

cli.command('init [root]', '初始化配置项')
	.alias('create')
	.action(async (root: string, options: InlineConfig) => {
		init({ root, ...options });
	});

const cliCommonOption = (intance: any) => {
	return intance
		.option('-r, --robot <robot>', '指定机器人，默认 1')
		.option('-s, --useSelect', '需配置 configPath 选择一个配置操作')
		.option('-m, --useMultiSelect', '需配置 configPath 选择多个配置操作');
};

cliCommonOption(cli.command('upload [root]', '上传小程序').alias('u')).action(
	upload,
);

cliCommonOption(cli.command('preview [root]', '预览小程序').alias('p')).action(
	preview,
);

cli.help(() => {
	logger.info(
		`首次使用时，推荐先执行 mini-ci init 命令快速初始化配置，设置好相关配置\n更多查看 npm 文档: ${link(
			'https://www.npmjs.com/package/@ruochuan/mini-ci',
			'https://www.npmjs.com/package/@ruochuan/mini-ci',
		)}\n或者查看 github 仓库 README: ${link(
			'https://github.com/lxchuan12/mini-ci',
			'https://github.com/lxchuan12/mini-ci',
		)}\n如果希望实时使用最新版，则可以使用 npx 不全局安装\nnpx @ruochuan/mini-ci -h，注意：版本不同功能可能也不同\n`,
	);
});

cli.version(VERSION);

cli.parse();
