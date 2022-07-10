// const path = require('path');
const { execSync } = require('child_process');
const parseGitConfig = require('parse-git-config');
const getDesc = (projectPath, version) => {
	// 获取最新 git 记录 7位的 commit hash
	let gitCommitHash = 'git commit hash 为空';
	try {
		gitCommitHash = execSync('git rev-parse --short HEAD', {
			cwd: projectPath,
		})
			.toString()
			.trim();
	} catch (e) {
		console.warn('获取 git commit hash 失败');
		console.warn(e);
	}

	// 获取项目的git仓库的 user.name
	let userName = '默认';
	try {
		const {
			user: { name = '默认' },
		} = parseGitConfig.sync({
			cwd: projectPath,
			path: '.git/config',
		});
		userName = name;
	} catch (e) {
		console.warn('获取 .git/config user.name 失败');
		console.warn(e);
	}

	const desc = `v${version} - ${gitCommitHash} - by@${userName}`;
	return desc;
};

module.exports = getDesc;
