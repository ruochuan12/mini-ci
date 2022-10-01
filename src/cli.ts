import { cac } from 'cac';
import { render } from './commands/init';
import { resolveConfig } from './config';
import { VERSION } from './const';
import logger from './logger';
import { miniCi } from './miniCi';
import { InlineConfig } from './types';

const cli = cac('mini-ci');

cli.command('init [root]', '初始化配置项')
	.alias('create')
	.action(async (root: string) => {
		logger.log('初始化配置项');
		render({ root });
	});

cli.option('-d, --dry', '空跑');

const cliCommonOption = (intance: any) => {
	return intance
		.option('-r, --robot <robot>', '指定机器人，默认 1')
		.option('-s, --useSelect', '需配置 configPath 选择一个配置操作')
		.option('-m, --useMultiSelect', '需配置 configPath 选择多个配置操作');
};

cliCommonOption(cli.command('upload [root]', '上传小程序')).action(
	async (root: string, options: InlineConfig) => {
		logger.log('上传', root, options);
		const configList = await resolveConfig({ root, ...options });
		for (let item of configList) {
			logger.log('config', item);
			if (!options.dry) {
				miniCi(item).upload();
			}
		}
	},
);

cliCommonOption(cli.command('preview [root]', '预览小程序')).action(
	async (root: string, options: InlineConfig) => {
		logger.log('预览', root, options);
		const configList = await resolveConfig({ root, ...options });
		for (let item of configList) {
			logger.log('config', item);
			if (!options.dry) {
				miniCi(item).preview();
			}
		}
	},
);

cli.help(() => {
	logger.info(
		'首次使用时，先执行 mini-ci init 命令，设置好相关配置\n更多查看文档: https://github.com/lxchuan12/mini-ci\n',
	);
});

cli.version(VERSION);

cli.parse();
