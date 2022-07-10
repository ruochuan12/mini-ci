const fs = require('fs');

const getConfig = async (options = {}) => {
	let { configPath, useSelect = true, useMultiSelect = false } = options;

	console.log('根据单选或者多选选择小程序参数', options);

	let configPathList = [];
	if (useSelect || useMultiSelect) {
		try {
			configPathList = fs.readdirSync(configPath);
		} catch (error) {
			throw new Error('请设置 小程序配置路径 configPath');
		}
		if (configPathList.length === 0) {
			throw new Error('请设置 小程序配置路径 configPath');
		}
	}

	// 单选、多选 两者只能选择其一
	if (useSelect) {
		useMultiSelect = false;
	}
	if (useMultiSelect) {
		useSelect = false;
	}

	const { prompt, MultiSelect } = require('enquirer');

	// console.log(configPathList, 'configPathList');
	const configPathListJson = configPathList.map((el) => {
		return require(`${configPath}/${el}`);
	});

	// console.log('configPathListJson', configPathListJson);

	let result = [];

	if (useSelect) {
		const { name } = await prompt({
			type: 'select',
			name: 'name',
			message: '请选择一个小程序配置',
			choices: configPathListJson,
		});
		result = configPathListJson.filter((el) => el.name === name);
		return result;
	}

	if (useMultiSelect) {
		const multiSelectPrompt = new MultiSelect({
			name: 'value',
			message: '可选择多个小程序配置',
			limit: 7,
			choices: configPathListJson,
		});

		try {
			const answer = await multiSelectPrompt.run();
			console.log('Answer:', answer);
			result = configPathListJson.filter((el) =>
				answer.includes(el.name),
			);
			return result;
		} catch (err) {
			console.log('您已经取消');
			console.log(err);
			process.exit(1);
		}
	}

	const { yes } = await prompt({
		type: 'confirm',
		name: 'yes',
		message: `确认选择这(几)个小程序？`,
	});

	if (!yes) {
		return;
	}
};

module.exports = {
	getConfig,
};
