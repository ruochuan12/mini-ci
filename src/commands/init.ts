import path from 'node:path';
import { DEFAULT_CONFIG_LIST, DEFAULT_CONFIG_PATH } from '../const';
import logger from '../logger';
import { InlineConfig } from '../types';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
// import { URL } from 'node:url';

import { copy, getResolvedRoot } from '../utils/index';

// 初始化
export const init = function render(config: InlineConfig) {
	// resolve root
	const resolvedRoot = getResolvedRoot(config);

	const __filename = fileURLToPath(import.meta.url);
	const __dirname = dirname(__filename);
	const templateRoot = path.resolve(__dirname, '../..', DEFAULT_CONFIG_PATH);

	logger.log('初始化配置项...');

	// logger.log(
	// 	'模板路径、目标路径：',
	// 	templateRoot,
	// 	resolvedRoot,
	// );

	if (config.dry) {
		return;
	}
	copy(templateRoot, resolvedRoot);
	logger.success(
		`初始化配置项完成，可以查看生成的文件 mini.config.js 修改配置、文件夹 ${DEFAULT_CONFIG_LIST}（可选，多选时再配置）`,
	);
};
