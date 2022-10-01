import path from 'node:path';
import dotenv, { DotenvParseOutput } from 'dotenv';

// 加载 .env 配置
export const loadEnv = (envDir: string) => {
	let env: DotenvParseOutput | undefined = {};
	let dotenvResult = dotenv.config({
		path: path.resolve(envDir, '.env'),
	});

	env = dotenvResult.parsed;
	if (dotenvResult.error) {
		throw dotenvResult.error;
	}
	return env;
};
