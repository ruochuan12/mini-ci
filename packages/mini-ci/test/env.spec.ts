import { expect, test } from 'vitest';
import { loadEnv } from '../src/env';

test('load env', () => {
	const env = loadEnv(undefined, './');
	expect(env).toMatchSnapshot();
});

test('load env development', () => {
	const env = loadEnv('development', './');
	expect(env).toMatchSnapshot();
});

test('load env test', () => {
	const env = loadEnv('test', './');
	expect(env).toMatchSnapshot();
});

test('load env production', () => {
	const env = loadEnv('production', './');
	expect(env).toMatchSnapshot();
});
