import { InlineConfig } from '../types';
import { generatorActions } from '.';

// 预览
export const preview = (root: string, options: InlineConfig) => {
	return generatorActions({ text: '预览', action: 'preview' })(root, options);
};
