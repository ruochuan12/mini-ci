const { green, bold } = require('kolorist');
const ci = require('miniprogram-ci');

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
	} = options;

	step(`当前小程序名称为：${name}`);

	step('输出上传相关参数');
	console.log('上传相关参数', options);

	const project = new ci.Project({
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
	});

	const commonConfig = {
		version,
		robot,
		setting: {
			es6: true,
			es7: true,
			minify: true,
			ignoreUploadUnusedFiles: true,
		},
		// onProgressUpdate: console.log,
	};

	// 上传
	if (upload) {
		step('开始上传小程序...');
		console.log('上传的配置', commonConfig);
		if (isDryRun) {
			return;
		}
		const uploadResult = await ci.upload({
			project,
			...commonConfig,
			desc,
		});
		console.log('uploadResult', uploadResult);
	}
	// 预览
	if (preview) {
		step('开始生成预览二维码...');
		console.log('预览的配置', commonConfig);
		if (isDryRun) {
			return;
		}
		const previewResult = await ci.preview({
			project,
			...commonConfig,
		});
		console.log('previewResult', previewResult);
	}
}

module.exports = main;
