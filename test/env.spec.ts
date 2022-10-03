import { expect, test } from 'vitest';
import { loadEnv } from '../src/env';

test('load env', () => {
	const env = loadEnv('./');

	const { appid } = env;

	expect(appid).toBe('wxdd3948dc1c7f95c2');
});
