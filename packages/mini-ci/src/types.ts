import { IInnerUploadOptions } from 'miniprogram-ci/dist/@types/ci/upload';

export interface ReplaceRuleItem {
	search: string | Function;
	replace: string | Function;
}

export interface ReplaceRules {
	file: string;
	rules: ReplaceRuleItem[];
}

export interface Plugin {
	enforce?: 'pre' | 'post';
	handler: Function;
	name: string;
}

export interface UserConfig {
	robot?: number;
	root?: string;
	name?: string;
	projectPath: string;
	packageJsonPath?: string;
	appid: string;
	privateKeyPath: string;
	// # 多个小程序配置的路径
	configPath?: string;
	// # 版本描述可选，默认会读取版本号和git commit hash 和作者
	// # 如：v1.0.0 - 4c29ae8 - by@若川
	desc?: string;
	// # 版本号可选，默认读取 package.json 中的 version
	version?: string;
	replaceRules?: ReplaceRules[];
	// 参考文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/ci.html
	// 其他项目配置自定义配置，和上面配置合并
	projectOptions?: {};
	// 新增上传的自定义配置
	uploadOptions?: IInnerUploadOptions;
	// 新增下载的自定义配置
	previewOptions?: {};
}

export interface InlineConfig {
	// @default process.cwd()
	root?: string;
	useMultiSelect?: boolean;
	useSelect?: boolean;
	robot?: number;
	dry?: boolean;
	useAllConfig?: boolean;
}
