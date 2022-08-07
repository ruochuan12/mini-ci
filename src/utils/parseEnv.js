import path from 'node:path';
import dotenv from 'dotenv';
import { cwd } from 'node:process';
const cwdPath = cwd();

const formatConfig = (options) => {
	let {
		name,
		appid,
		privateKeyPath,
		projectPath,
		configPath,
		packageJsonPath,
		desc,
		version,
		projectOptions,
		uploadOptions,
		previewOptions,
	} = options;

	if (!name) {
		name = '未设置名称';
	}

	if (!appid) {
		throw new Error('appid 不能为空');
	}
	if (!privateKeyPath) {
		throw new Error('privateKeyPath 不能为空');
	}

	if (!projectPath) {
		throw new Error('projectPath 不能为空');
	}

	if (!packageJsonPath) {
		throw new Error('packageJsonPath 不能为空');
	}

	privateKeyPath = path.resolve(cwdPath, privateKeyPath);
	projectPath = path.resolve(cwdPath, projectPath);
	configPath = path.resolve(cwdPath, configPath || '');
	packageJsonPath = path.resolve(cwdPath, packageJsonPath || '');

	return {
		name,
		appid,
		privateKeyPath,
		projectPath,
		configPath,
		packageJsonPath,
		desc,
		version,
		projectOptions,
		uploadOptions,
		previewOptions,
	};
};

const loadWxconfig = async (cwd) => {
	try {
		const res = await import(path.join(cwd, 'wx.config.js'));
		return res.default;
	} catch (e) {
		console.log('加载 wx.config.js 失败', e);
		return {
			error: '未配置 wx.config.js 文件',
		};
	}
};

const parseEnv = async () => {
	let parsed = {};
	let wxconfig = await loadWxconfig(cwdPath);
	if (wxconfig.error) {
		let dotenvResult = dotenv.config({
			path: path.resolve(cwdPath, './.env'),
		});

		parsed = dotenvResult.parsed;
		if (dotenvResult.error) {
			throw error;
		}
	} else {
		parsed = wxconfig;
	}

	let {
		name,
		appid,
		privateKeyPath,
		projectPath,
		configPath,
		packageJsonPath,
		desc,
		version,
		projectOptions,
		uploadOptions,
		previewOptions,
	} = formatConfig(parsed);

	return {
		name,
		appid,
		privateKeyPath,
		projectPath,
		configPath,
		packageJsonPath,
		desc,
		version,
		projectOptions,
		uploadOptions,
		previewOptions,
	};
};

export { parseEnv, formatConfig };
