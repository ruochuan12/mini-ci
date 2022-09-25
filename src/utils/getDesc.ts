import { execSync } from 'node:child_process';

export const getDesc = (projectPath, version) => {
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
		userName = execSync('git config user.name', {
			cwd: projectPath,
		})
			.toString()
			.trim();
	} catch (e) {
		console.warn('git config user.name 获取失败');
		console.warn(e);
	}

	const desc = `v${version} - ${gitCommitHash} - by@${userName}`;
	return desc;
};
