vi.mock('../../src/miniCi/weappCi');
import { expect, test, vi } from 'vitest';
import WeappCi from '../../src/miniCi/weappCi';

test('weappCi', () => {
	const weappCi = new WeappCi({});
	weappCi.upload();
	expect(weappCi.upload).toHaveBeenCalled();
	weappCi.preview();
	expect(weappCi.preview).toHaveBeenCalled();
});
