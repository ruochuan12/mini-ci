#!/usr/bin/env node
const main = require('./utils/main');
const { getParams } = require('./utils/getParams');
const getDesc = require('./utils/getDesc');
const { parseEnv, formatConfig } = require('./utils/parseEnv');
const { getConfig } = require('./utils/getConfig');
const { getVersion } = require('./utils/getVersion');

const parseEnvResult = parseEnv();

const {
	robot,
	dry: isDryRun,
	preview,
	upload,
	useSelect,
	useMultiSelect,
} = getParams();

(async () => {
	let mpConfigList = [parseEnvResult];

	// 根据配置，单选还是多选来上传小程序
	if (useSelect || useMultiSelect) {
		const configResult = await getConfig({
			configPath: parseEnvResult.configPath,
			useSelect,
			useMultiSelect,
		});
		mpConfigList = configResult.map((el) => formatConfig(el));
	}
	for (const mpConfigItem of mpConfigList) {
		const {
			name,
			appid,
			privateKeyPath,
			projectPath,
			packageJsonPath,
			version,
			desc,
			projectOptions,
			uploadOptions,
			previewOptions,
		} = mpConfigItem;
		let lastVersion = version || getVersion(packageJsonPath);
		const lastDesc = desc || getDesc(projectPath, version);
		try {
			const res = await main({
				name,
				projectPath,
				appid,
				privateKeyPath,
				version: lastVersion,
				robot,
				upload,
				preview,
				isDryRun,
				desc: lastDesc,
				projectOptions,
				uploadOptions,
				previewOptions,
			});
			console.log(res);
		} catch (err) {
			console.log('执行失败', err);
		}
	}
})();
