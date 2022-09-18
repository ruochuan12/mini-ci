import { getConfig } from './getConfig';
import { parseEnv } from './parseEnv';

(async () => {
	const { configPath } = await parseEnv();
	const result = await getConfig({
		configPath,
		useSelect: true,
		useMultiSelect: !true,
	});

	console.log(result, 'result');
})();
