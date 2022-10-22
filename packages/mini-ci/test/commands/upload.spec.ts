import { execaCommandSync } from 'execa';
import { test, expect } from 'vitest';
import { join } from 'node:path';
import type { ExecaSyncReturnValue, SyncOptions } from 'execa';

execaCommandSync('node');

const CLI_PATH = join(__dirname, '../../dist/cli.mjs');

const projectName = 'test-app';
const genPath = join(__dirname, projectName);

const run = (
	args: string[],
	options: SyncOptions<string> = {},
): ExecaSyncReturnValue<string> => {
	return execaCommandSync(`node ${CLI_PATH} ${args.join(' ')}`, options);
};

test('初始化成功', () => {
	const { stdout, exitCode } = run(['init', '-d']);
	expect(stdout).toContain('初始化配置项...');
});

test('上传成功', () => {
	const { stdout, exitCode } = run(['upload']);
	expect(stdout).toContain('小程序上传成功');
});

test('预览成功', () => {
	const { stdout, exitCode } = run(['preview']);
	console.log(stdout, 'stdout-2');
	expect(stdout).toContain('小程序预览成功');
});
