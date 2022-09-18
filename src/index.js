#!/usr/bin/env node
import main from './utils/main.js';
import { getParams } from './utils/getParams.js';
import { getDesc } from './utils/getDesc.js';
import { parseEnv, formatConfig } from './utils/parseEnv.js';
import { getConfig } from './utils/getConfig.js';
import { getVersion } from './utils/getVersion.js';
import { getHelpInfo, getVersionInfo } from './utils/getInfo.js';

const {
	robot,
	dry: isDryRun,
	preview,
	upload,
	useSelect,
	useMultiSelect,
	version,
	help,
} = getParams();

const init = async () => {
	process.title = '@ruochuan/mp-cli，作者@若川';
	if (version || help) {
		getVersionInfo(version);
		getHelpInfo(help);
		return;
	}

	const parseEnvResult = await parseEnv();
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
		const lastDesc = desc || getDesc(projectPath, lastVersion);
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
};

init().catch((e) => {
	console.log('init 执行异常', e);
});
