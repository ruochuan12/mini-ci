import path from 'node:path';
import fs from 'node:fs';
import { execaCommandSync } from 'execa';
import { pathToFileURL } from 'node:url';

import { getResolvedRoot, isObject, readJSON, uniqueId } from './utils/index';
import { DEFAULT_CONFIG_FILES } from './const';
import { loadEnv } from './env';
import logger from './logger';
import { select } from './select';
import { InlineConfig, UserConfig } from './types';

// 获取 package.json 版本号
export const getVersion = (packageJsonPath: string) => {
	let version = '1.0.0';
	try {
		version = readJSON(`${packageJsonPath}`).version;
	} catch (e) {
		logger.warn(
			'未设置 version , 并且未设置 package.json 路径，无法读取 version，默认使用 1.0.0',
			e,
		);
	}
	return version;
};

// 获取配置
export const getDesc = (
	projectPath: UserConfig['projectPath'],
	version: UserConfig['version'],
) => {
	// 获取最新 git 记录 7位的 commit hash
	let gitCommitHash = 'git commit hash 为空';
	try {
		gitCommitHash = execaCommandSync('git rev-parse --short HEAD', {
			stdio: 'pipe',
			cwd: projectPath,
		}).stdout;
	} catch (e) {
		logger.warn('获取 git commit hash 失败', e);
	}

	// 获取项目的git仓库的 user.name
	let userName = '默认';
	try {
		userName = execaCommandSync('git config user.name', {
			stdio: 'pipe',
			cwd: projectPath,
		}).stdout;
	} catch (e) {
		logger.warn('git config user.name 获取失败', e);
	}

	const desc = `v${version} - ${gitCommitHash} - by@${userName}`;
	return desc;
};

// 获取默认的路径
const getDefaultConfigFilePath = (configDir: string) => {
	// 判断路径
	let resolvedPath: string = '';
	for (const filename of DEFAULT_CONFIG_FILES) {
		const filePath = path.resolve(configDir, filename);
		if (!fs.existsSync(filePath)) continue;

		resolvedPath = filePath;
		break;
	}

	return resolvedPath;
};

// 解析 js/json 配置文件
export const resolveFileConfig = async (filePath: string) => {
	let fileNameTmp: string = '';
	// json 文件
	if (/\.json$/.test(filePath)) {
		return readJSON(filePath);
	}
	try {
		let fileUrl = filePath;
		// 统一用 esm 处理
		// 不是 mjs 结尾，生成临时的 mjs 来读取，读取完后删除
		if (!/\.mjs$/.test(filePath)) {
			const fileBase = `${filePath}.timestamp-${Date.now()}`;
			fileNameTmp = `${fileBase}.mjs`;
			fileUrl = `${pathToFileURL(fileBase)}.mjs`;
			const code = fs.readFileSync(filePath, 'utf8');
			fs.writeFileSync(fileNameTmp, code, 'utf8');
		}

		const res = await import(fileUrl);
		return res.default;
	} catch (e) {
		logger.log(`加载配置文件 ${filePath} 失败`, e);
		return;
	} finally {
		try {
			fs.unlinkSync(fileNameTmp);
		} catch {
			// already removed if this function is called twice simultaneously
		}
	}
};

// 加载配置
const loadConfigFromFile = async (
	configDir: string,
): Promise<UserConfig | undefined> => {
	const resolvedPath = getDefaultConfigFilePath(configDir);
	if (!resolvedPath) {
		return;
	}
	return resolveFileConfig(resolvedPath);
};

// 合并配置
export const mergeConfig = (
	defaults: Record<string, any>,
	config: Record<string, any>,
) => {
	// 获取配置
	const getLastOptions = (val: any) => (isObject(val) ? val : {});
	const projectOptions = {
		projectPath: config.projectPath,
		type: 'miniProgram',
		appid: config.appid,
		privateKeyPath: config.privateKeyPath,
		ignores: [
			'node_modules/**/*',
			'CHANGELOG.md',
			'README.md',
			'yarn.lock',
			'package-lock.json',
			'pnpm-lock.yaml',
		],
		...getLastOptions(config.projectOptions),
	};

	let setting = {};
	try {
		const projectConfig = readJSON(
			`${config.projectPath}/project.config.json`,
		);
		setting = projectConfig?.setting;
	} catch (e) {
		logger.warn(
			`加载项目中的 ${config.projectPath}/project.config.json 失败`,
		);
	}
	const commonConfig = {
		version: config.version || getVersion(config.packageJsonPath),
		robot: defaults.robot,
		setting,
		// onProgressUpdate: console.log,
	};

	const uploadOptions = {
		...commonConfig,
		desc: config.desc || getDesc(config.projectPath, commonConfig.version),
		...getLastOptions(config.uploadOptions),
	};

	const previewOptions = {
		...commonConfig,
		...getLastOptions(config.previewOptions),
	};

	return {
		projectOptions,
		uploadOptions,
		previewOptions,
		plugins: config.plugins,
		replaceRules: config.replaceRules,
		name: config.name,
		// id: uniqueId(),
	};
};

// 获取配置的列表
export const getConfigList = async (configPath: string) => {
	let configPathList: string[] = [];
	try {
		configPathList = fs.readdirSync(configPath);
	} catch (error) {
		logger.error(error);
		throw new Error('请设置小程序配置路径 configPath');
	}
	if (configPathList.length === 0) {
		throw new Error('请设置小程序配置路径 configPath');
	}

	// logger.log(configPathList, 'configPathList');
	const configList: any[] = [];
	for (let el of configPathList) {
		let config = await resolveFileConfig(`${configPath}/${el}`);
		configList.push(config);
	}

	return configList;
};

// 解析配置
export const resolveConfig = async (config: InlineConfig) => {
	// resolve root
	const resolvedRoot = getResolvedRoot(config);

	let loadResult;
	// 如果指定了配置的文件
	if (config.config) {
		loadResult = await resolveFileConfig(
			path.resolve(resolvedRoot, config.config),
		);
	} else {
		loadResult = await loadConfigFromFile(resolvedRoot);
	}

	if (!isObject(loadResult)) {
		const envFile = config.mode ? `.env.${config.mode}` : '.env';
		logger.log(
			`加载 mini.config.(js|json) 失败，或未指定可用的配置文件，将使用 ${envFile} 中的配置`,
			loadResult,
		);
		// @ts-ignore
		loadResult = loadEnv(config.mode, resolvedRoot);
	}
	if (!isObject(loadResult)) {
		throw new Error(
			'未发现配置项，请检查 mini-ci 的 mini.config.js 或者 .env 相关配置',
		);
	}

	let loadResultList: any[] = [];
	// 单选或者多选
	if (config.useSelect || config.useMultiSelect || config.useAllConfig) {
		const configList = await getConfigList(
			path.resolve(resolvedRoot, loadResult?.configPath!),
		);
		const allConfigList = [...configList, loadResult];
		// 批量操作所有
		if (config.useAllConfig) {
			loadResultList = allConfigList;
		} else {
			loadResultList = await select({
				configList: allConfigList,
				useSelect: config.useSelect,
				useMultiSelect: config.useMultiSelect,
			});
		}
	} else {
		loadResultList = [loadResult];
	}

	const lastConfigList = loadResultList.map((item) => {
		return mergeConfig(config, item!);
	});

	return lastConfigList;
};
