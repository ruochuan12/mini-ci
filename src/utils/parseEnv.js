const path = require('path');

const formatConfig = (options) => {
	let { name, appid, privateKeyPath, projectPath, configPath } = options;

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

	const cwd = process.cwd();
	privateKeyPath = path.join(cwd, privateKeyPath);
	projectPath = path.join(cwd, projectPath);
	configPath = path.join(cwd, configPath || '');

	return {
		name,
		appid,
		privateKeyPath,
		projectPath,
		configPath,
	};
};

const parseEnv = () => {
	// const path = require('path');

	const cwd = process.cwd();

	const { parsed, error } = require('dotenv').config({
		path: path.join(cwd, './.env'),
	});
	if (error) {
		throw error;
	}

	let { name, appid, privateKeyPath, projectPath, configPath } =
		formatConfig(parsed);

	return {
		name,
		appid,
		privateKeyPath,
		projectPath,
		configPath,
	};
};

module.exports = {
	parseEnv,
	formatConfig,
};
