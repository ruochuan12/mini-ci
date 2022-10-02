import path from 'node:path';
import { DEFAULT_CONFIG_PATH } from '../const';
import logger from '../logger';
import { InlineConfig } from '../types';
import { fileURLToPath } from 'node:url';

// import { URL } from 'node:url';

import { copy, getResolvedRoot } from '../utils/index';

export const render = function render(config: InlineConfig) {
	// resolve root
	const resolvedRoot = getResolvedRoot(config);
	const templateRoot = path.resolve(
		fileURLToPath(import.meta.url),
		'../../',
		DEFAULT_CONFIG_PATH,
	);
	logger.info(templateRoot, resolvedRoot);

	if (config.dry) {
		return;
	}
	copy(templateRoot, resolvedRoot);
};
