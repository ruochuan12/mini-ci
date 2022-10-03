import { expect, test } from 'vitest';
import { resolveConfig } from '../src/config';
// @ts-ignore
import miniConfig from '../mini.config.js';

test('resolveConfig miniConfig', async () => {
	const configList = await resolveConfig({});

	const config = configList[0] || {};

	expect(config?.projectOptions?.appid).toBe(miniConfig.appid);
	expect(config.plugins).toStrictEqual(miniConfig.plugins);
	expect(config.replaceRules).toStrictEqual(miniConfig.replaceRules);
});
