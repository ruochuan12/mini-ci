const { getConfig } = require('./getConfig');
const parseEnv = require('./parseEnv');

const { configPath } = parseEnv();

(async () => {
	const result = await getConfig({
		configPath,
		useSelect: true,
		useMultiSelect: !true,
	});

	console.log(result, 'result');
})();
