import path from 'node:path';
import { DEFAULT_CONFIG_PATH } from '../const';
import logger from '../logger';
import { InlineConfig } from '../types';
import { fileURLToPath } from 'node:url';

// import { URL } from 'node:url';

import { copy, getResolvedRoot } from '../utils/index';

// 初始化
export const init = function render(config: InlineConfig) {
	// resolve root
	const resolvedRoot = getResolvedRoot(config);
	const templateRoot = path.resolve(
		fileURLToPath(import.meta.url),
		'../../',
		DEFAULT_CONFIG_PATH,
	);

	logger.info('初始化配置项：模板路径和目标路径', templateRoot, resolvedRoot);

	if (config.dry) {
		return;
	}
	copy(templateRoot, resolvedRoot);
};
