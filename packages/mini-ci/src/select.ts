import fs from 'node:fs';
import enquirer from 'enquirer';
import logger from './logger';
import { InlineConfig, UserConfig } from './types';

interface SelectOptions {
	configList: any[];
	useSelect?: InlineConfig['useSelect'];
	useMultiSelect?: InlineConfig['useMultiSelect'];
}

export const select = async (options: SelectOptions) => {
	let {
		configList,
		useSelect = false,
		useMultiSelect = false,
	} = options || {};

	// logger.log('根据单选或者多选选择小程序参数', options);

	// 单选、多选 两者只能选择其一
	if (useSelect) {
		useMultiSelect = false;
	}
	if (useMultiSelect) {
		useSelect = false;
	}

	const { prompt, MultiSelect } = enquirer;

	// logger.log('configList', configList);

	let result: UserConfig[] = [];

	if (useSelect) {
		const { name } = await prompt({
			type: 'select',
			name: 'name',
			message: '请选择一个小程序配置',
			choices: configList,
		});
		result = configList.filter((el) => el.name === name);
		return result;
	}

	if (useMultiSelect) {
		const multiSelectPrompt = new MultiSelect({
			name: 'value',
			message: '可选择多个小程序配置',
			limit: 7,
			choices: configList,
		});

		try {
			const answer = await multiSelectPrompt.run();
			logger.log('您已选择:', answer);
			result = configList.filter((el) => answer.includes(el.name));
			return result;
		} catch (err) {
			logger.log('您已经取消', err);
			process.exit(1);
		}
	}

	return result;

	// const { yes } = await prompt({
	// 	type: 'confirm',
	// 	name: 'yes',
	// 	message: `确认选择这(几)个小程序？`,
	// });

	// if (!yes) {
	// 	return;
	// }
};
