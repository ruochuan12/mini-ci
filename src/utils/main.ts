import omits from 'omit.js';
import ci from 'miniprogram-ci';
import { green, bold } from 'kolorist';
import { loadJsonFileSync } from 'load-json-file';
import { isObject } from './isObject';

const omit = omits.default;
// console.log('omit', omits.default);

// 获取配置
const getLastOptions = (val) => (isObject(val) ? val : {});

const step = (msg) => console.log(bold(green(`[step] ${msg}`)));

async function main(options = {}) {
	const {
		name,
		projectPath,
		appid,
		privateKeyPath,
		version,
		upload,
		isDryRun,
		preview,
		robot,
		desc,
		projectOptions,
		uploadOptions,
		previewOptions,
	} = options;

	step(`当前小程序名称为：${name}`);

	step('输出上传相关参数');
	console.log('传递的参数', options);

	const lastProjectOptions = {
		projectPath,
		type: 'miniProgram',
		appid,
		privateKeyPath,
		ignores: [
			`${projectPath}/node_modules/**/*`,
			`${projectPath}/CHANGELOG.md`,
			`${projectPath}/README.md`,
			`${projectPath}/yarn.lock`,
			`${projectPath}/package-lock.json`,
		],
		...getLastOptions(projectOptions),
	};

	console.log(
		'ci.Project 项目的参数',
		omit(lastProjectOptions, ['project', 'privateKeyPath']),
	);

	const project = new ci.Project(lastProjectOptions);
	const setting = loadJsonFileSync(`${projectPath}/project.config.json`);

	const commonConfig = {
		version,
		robot,
		setting,
		// onProgressUpdate: console.log,
	};

	// 上传
	if (upload) {
		step('开始上传小程序...');
		const lastUploadOptions = {
			project,
			...commonConfig,
			desc,
			...getLastOptions(uploadOptions),
		};
		console.log(
			'ci.upload 上传的配置',
			omit(lastUploadOptions, ['project']),
		);
		if (isDryRun) {
			return;
		}
		const uploadResult = await ci.upload(lastUploadOptions);
		console.log('uploadResult', uploadResult);
	}
	// 预览
	if (preview) {
		step('开始生成预览二维码...');
		const lastPreviewOptions = {
			project,
			...commonConfig,
			...getLastOptions(previewOptions),
		};
		console.log(
			'ci.preview 预览的配置',
			omit(lastPreviewOptions, ['project']),
		);
		if (isDryRun) {
			return;
		}
		const previewResult = await ci.preview(lastPreviewOptions);
		console.log('previewResult', previewResult);
	}
}

export default main;
