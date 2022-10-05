vi.mock('../src/commands/index');
import { expect, test, vi } from 'vitest';
import { generatorActions, preview, upload, init } from '../../src/commands';

test('commands', () => {
	init({});
	generatorActions({ text: '上传', action: 'upload' });

	generatorActions({ text: '预览', action: 'preview' });
	upload('', {});
	preview('', {});
	expect(init).toHaveBeenCalledWith({});
	expect(preview).toHaveBeenCalledWith('', {});
	expect(upload).toHaveBeenCalledWith('', {});
	expect(generatorActions).toHaveBeenCalledWith({
		text: '上传',
		action: 'upload',
	});

	expect(generatorActions).toBeCalledTimes(2);
});
