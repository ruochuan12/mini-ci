import BaseCi from './baseCi';
import ci, { Project } from 'miniprogram-ci';

export default class WeappCI extends BaseCi {
	private instance: Project;
	// constructor() {}
	_init() {
		console.log('WeappCI-init');
		this.instance = new ci.Project(this.options.projectOptions);
	}
	async upload() {
		await ci.upload({
			project: this.instance,
			...this.options.uploadOptions,
		});
	}
	async preview() {
		console.log('预览');
		await ci.preview({
			project: this.instance,
			...this.options.uploadOptions,
		});
	}
}
