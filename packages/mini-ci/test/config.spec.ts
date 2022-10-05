import { expect, test } from 'vitest';
import { resolveConfig } from '../src/config';
// import path from 'node:path';
// @ts-ignore
import miniConfig from '../mini.config.js';

test('resolveConfig miniConfig', async () => {
	const configList = await resolveConfig({});

	const config = configList[0] || {};

	expect(config?.projectOptions?.appid).toBe(miniConfig.appid);
	expect(config.plugins).toStrictEqual(miniConfig.plugins);
	expect(config.replaceRules).toStrictEqual(miniConfig.replaceRules);
});

test('resolveConfig toMatchSnapshot', async () => {
	const configList = await resolveConfig({});
	expect(configList).toMatchSnapshot();
});

// test('resolveConfig toMatchSnapshot', async () => {
// 	const configList = await resolveConfig({
// 		configPath: path.resolve('./miniConfigList'),
// 		useSelect: true,
// 		useMultiSelect: false,
// 	});
// 	expect(configList).toMatchSnapshot();
// });
