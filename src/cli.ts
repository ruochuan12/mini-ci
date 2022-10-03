import { cac } from 'cac';
import { render } from './commands/init';
import { resolveConfig } from './config';
import { VERSION } from './const';
import logger from './logger';
import { miniCi } from './miniCi';
import { getSortedPlugins, invokePluginsFns } from './plugins';
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

const fn = ({ text = '上传', action = 'upload' } = {}) => {
	const func = async (root: string, options: InlineConfig) => {
		const configList = await resolveConfig({ root, ...options });
		for (const config of configList) {
			if (!options.dry) {
				const { pre, normal, post } = getSortedPlugins(config.plugins);
				try {
					await invokePluginsFns(pre, config);
					await invokePluginsFns(normal, config);
					await miniCi(config)[action]();
				} catch (e) {
					logger.error(`小程序${text}失败`, e);
				} finally {
					await invokePluginsFns(post, config);
					logger.log('config', text, root, options, config);
				}
			} else {
				logger.log('config', text, root, options, config);
			}
		}
	};
	return func;
};

cliCommonOption(cli.command('upload [root]', '上传小程序').alias('u')).action(
	fn({ text: '上传', action: 'upload' }),
);

cliCommonOption(cli.command('preview [root]', '预览小程序').alias('p')).action(
	fn({ text: '预览', action: 'preview' }),
);

cli.help(() => {
	logger.info(
		'首次使用时，推荐先执行 mini-ci init 命令快速初始化配置，设置好相关配置\n更多查看 npm 文档: https://www.npmjs.com/package/@ruochuan/mini-ci \n或者查看 github 仓库 README: https://github.com/lxchuan12/mini-ci\n',
	);
});

cli.version(VERSION);

cli.parse();
