import { getConfig } from './getConfig.js';
import parseEnv from './parseEnv.js';

(async () => {
	const { configPath } = await parseEnv();
	const result = await getConfig({
		configPath,
		useSelect: true,
		useMultiSelect: !true,
	});

	console.log(result, 'result');
})();
