import { resolveConfig } from '../config';
import logger from '../logger';
import { miniCi } from '../miniCi';
import { getSortedPlugins, invokePluginsFns } from '../plugins';
import { InlineConfig } from '../types';

export interface GeneratorActionsParams {
	text?: '上传' | '预览';
	action?: 'upload' | 'preview';
}

// 生成上传、预览函数
export const generatorActions = ({
	text = '上传',
	action = 'upload',
}: GeneratorActionsParams = {}) => {
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
					logger.log('小程序配置等信息', text, root, options, config);
				}
			} else {
				logger.log('小程序配置等信息', text, root, options, config);
			}
		}
	};
	return func;
};

// 上传
export { upload } from './upload';
// 预览
export { preview } from './preview';

export { init } from './init';
