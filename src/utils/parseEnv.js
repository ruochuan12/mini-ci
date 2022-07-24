const path = require('path');

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

	const cwd = process.cwd();
	privateKeyPath = path.join(cwd, privateKeyPath);
	projectPath = path.join(cwd, projectPath);
	configPath = path.join(cwd, configPath || '');
	packageJsonPath = path.join(cwd, packageJsonPath || '');

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

const loadWxconfig = (cwd) => {
	try {
		return require(path.join(cwd, 'wx.config.js'));
	} catch (e) {
		return {
			error: '未配置 wx.config.js 文件',
		};
	}
};

const parseEnv = () => {
	const cwd = process.cwd();

	let parsed = {};
	let wxconfig = loadWxconfig(cwd);
	if (wxconfig.error) {
		let dotenvResult = require('dotenv').config({
			path: path.join(cwd, './.env'),
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

module.exports = {
	parseEnv,
	formatConfig,
};
