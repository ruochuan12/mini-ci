import main from './utils/main';
import { getParams } from './utils/getParams';
import { getDesc } from './utils/getDesc';
import { parseEnv, formatConfig } from './utils/parseEnv';
import { getConfig } from './utils/getConfig';
import { getVersion } from './utils/getVersion';
import { getHelpInfo, getVersionInfo } from './utils/getInfo';

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
		mpConfigList = !Array.isArray(configResult)
			? []
			: configResult.map((el) => formatConfig(el));
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
