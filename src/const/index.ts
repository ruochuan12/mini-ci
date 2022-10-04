import { version } from '../../package.json';

export const VERSION = version as string;

export const DEFAULT_CONFIG_FILES = [
	'mini.config.js',
	'mini.config.mjs',
	// 'mini.config.ts',
	'mini.config.json',
	'wx.config.js',
	'wx.config.mjs',
	// 'wx.config.ts',
	'wx.config.json',
	// 'wx.config.cjs',
	// 'wx.config.mts',
	// 'wx.config.cts',
];

export const DEFAULT_CONFIG_PATH = 'miniConfig';
