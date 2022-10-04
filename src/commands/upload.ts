import { generatorActions } from '.';
import { InlineConfig } from '../types';

// 上传
export const upload = (root: string, options: InlineConfig) => {
	return generatorActions({ text: '上传', action: 'upload' })(root, options);
};
