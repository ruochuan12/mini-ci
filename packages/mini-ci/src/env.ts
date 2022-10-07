import path from 'node:path';
import dotenv, { DotenvParseOutput } from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { camelize, isString } from './utils';

// 加载 .env 配置
export const loadEnv = (
	mode: string | undefined,
	envDir: string,
	prefix: string = 'MINI_',
) => {
	let env: Record<string, string> = {};
	let envFile = '.env';

	if (isString(mode)) {
		envFile = `.env.${mode}`;
	}

	let dotenvResult = dotenv.config({
		path: path.resolve(envDir, envFile),
	});

	if (dotenvResult.error) {
		throw dotenvResult.error;
	}

	const dotenvExpandResult = dotenvExpand.expand({
		parsed: dotenvResult.parsed,
		ignoreProcessEnv: true,
	});

	if (dotenvExpandResult.error) {
		throw dotenvExpandResult.error;
	}

	// @ts-ignore
	for (const [key, value] of Object.entries(dotenvExpandResult.parsed)) {
		if (key.startsWith(prefix)) {
			const lastKey = camelize(key.replace(prefix, '').toLowerCase());
			env[lastKey] = value;
		}
	}

	return env;
};
