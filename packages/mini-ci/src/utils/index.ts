import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';
import { InlineConfig } from '../types';
export { default as copy } from './copy';

export const isObject = (val: any) => typeof val === 'object' && val !== null;

export const readJSON = (file: fs.PathOrFileDescriptor) =>
	JSON.parse(fs.readFileSync(file, 'utf8'));

export function slash(p: string): string {
	return p.replace(/\\/g, '/');
}

// const pkg = readJSON(new URL('../package.json', import.meta.url));

export const isWindows = os.platform() === 'win32';
export function normalizePath(id: string): string {
	return path.posix.normalize(isWindows ? slash(id) : id);
}

export const getResolvedRoot = (config: InlineConfig) => {
	return normalizePath(
		config.root ? path.resolve(config.root) : process.cwd(),
	);
};

// 简单的转数组的函数
export const arrify = (arr: any) => {
	if (Array.isArray(arr)) {
		return arr;
	} else {
		return [];
	}
};

const camelizeRE = /_(\w)/g;
/**
 * @private
 */
export const camelize = (str: string): string => {
	return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));
};

export const isString = (val: any) => typeof val === 'string';
