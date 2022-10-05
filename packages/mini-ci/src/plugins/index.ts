import { Plugin, UserConfig } from '../types';
import { arrify } from '../utils';
import { replaceModify, replaceRenew } from './repleaceFile';

interface SortedPluginsOb {
	pre: Plugin[];
	normal: Plugin[];
	post: Plugin[];
}

// 内置插件
const innerPlugins: Plugin[] = [
	{
		name: 'replaceModify',
		enforce: 'pre',
		handler: (config: UserConfig) => {
			replaceModify(config.replaceRules!);
		},
	},
	{
		name: 'replaceRenew',
		enforce: 'post',
		handler: (config: UserConfig) => {
			replaceRenew(config.replaceRules!);
		},
	},
];

// 排序
export function getSortedPlugins(plugins: readonly Plugin[]): SortedPluginsOb {
	const pre: Plugin[] = [];
	const normal: Plugin[] = [];
	const post: Plugin[] = [];
	const realPlugins = arrify(plugins);
	for (const plugin of [...innerPlugins, ...realPlugins]) {
		if (plugin.enforce === 'pre') {
			pre.push(plugin);
			continue;
		}
		if (plugin.enforce === 'post') {
			post.push(plugin);
			continue;
		}
		normal.push(plugin);
	}
	return { pre, normal, post };
}

// 批量执行插件函数
export const invokePluginsFns = async (plugins: Plugin[], args: any) => {
	for (const plugin of plugins) {
		await plugin.handler(args);
	}
};
