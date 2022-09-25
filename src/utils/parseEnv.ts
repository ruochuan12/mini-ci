import path from 'node:path';
import fs from 'node:fs';
import dotenv from 'dotenv';
import { pathToFileURL } from 'node:url';
import { cwd } from 'node:process';
// import { loadJsonFileSync } from 'load-json-file';
import { isObject } from './isObject';
import { DEFAULT_CONFIG_FILES } from '../const/index';

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

const loadWxconfig = async (cwd: string) => {
	// 判断路径
	let resolvedPath: string = '';
	for (const filename of DEFAULT_CONFIG_FILES) {
		const filePath = path.join(cwd, filename);
		if (!fs.existsSync(filePath)) continue;

		resolvedPath = filePath;
		break;
	}

	if (!resolvedPath) {
		return {
			error: '未配置 wx.config.js 文件',
		};
	}
	let fileNameTmp: string = '';
	try {
		let fileUrl = resolvedPath;
		// 统一用 esm 处理
		// 不是 mjs 结尾，生成临时的 mjs 来读取，读取完后删除
		if (!/\.mjs$/.test(resolvedPath)) {
			const fileBase = `${resolvedPath}.timestamp-${Date.now()}`;
			fileNameTmp = `${fileBase}.mjs`;
			fileUrl = `${pathToFileURL(fileBase)}.mjs`;
			const code = fs.readFileSync(resolvedPath, 'utf8');
			fs.writeFileSync(fileNameTmp, code, 'utf8');
		}

		const res = await import(fileUrl);
		return res.default;
	} catch (e) {
		console.log('加载 wx.config.js 失败，将使用 .env 中的配置', e);
		return {
			error: '未配置 wx.config.js 文件',
		};
	} finally {
		try {
			fs.unlinkSync(fileNameTmp);
		} catch {
			// already removed if this function is called twice simultaneously
		}
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
			throw dotenvResult.error;
		}
	} else {
		parsed = wxconfig;
	}
	if (!isObject(parsed)) {
		throw new Error(`配置必须导出一个对象`);
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
