export default abstract class BaseCi {
	constructor(options) {
		this.options = options;
		this._init();
	}
	/** 初始化函数，会被构造函数调用 */
	protected abstract _init(): void;
	abstract upload();
	abstract preview();
}
