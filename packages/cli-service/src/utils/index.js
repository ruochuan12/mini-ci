const getConfigList = () => {
	let configPathList = [];
	try {
		configPathList = fs.readdirSync(configPath);
	} catch (error) {
		throw new Error('请设置 小程序配置路径 configPath');
	}
	if (configPathList.length === 0) {
		throw new Error('请设置 小程序配置路径 configPath');
	}
};
