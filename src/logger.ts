// import { EOL } from 'node:os';

import { green, yellow, red } from 'kolorist';

class Logger {
	isCI: boolean;
	isDryRun: boolean;
	constructor({ isCI = true, isDryRun = false } = {}) {
		this.isCI = isCI;
		this.isDryRun = isDryRun;
	}

	shouldLog() {}

	log(...args: unknown[]) {
		console.log(green('@ruochuan/mini-ci'), ...args);
	}

	error(...args: any[]) {
		console.error(red('ERROR'), ...args);
	}

	info(...args: any[]) {
		// @ts-ignore
		this.log(green(...args));
	}

	warn(...args: any[]) {
		this.log(yellow('WARNING'), ...args);
	}
}

export default new Logger();
