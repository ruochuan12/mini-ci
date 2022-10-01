import fs from 'node:fs';
import path from 'node:path';

/**
 * 拷贝路径
 * @param {string} src source filename to copy
 * @param {string} dest destination filename of the copy operation
 */
function copy(src: string, dest: string) {
	const stats = fs.statSync(src);

	if (stats.isDirectory()) {
		// skip node_module
		if (path.basename(src) === 'node_modules') {
			return;
		}

		// if it's a directory, render its subdirectories and files recursively
		fs.mkdirSync(dest, { recursive: true });
		for (const file of fs.readdirSync(src)) {
			copy(path.resolve(src, file), path.resolve(dest, file));
		}
		return;
	}

	fs.copyFileSync(src, dest);
}

export default copy;
