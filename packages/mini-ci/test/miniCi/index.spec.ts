vi.mock('../../src/miniCi/index');
import { expect, test, vi } from 'vitest';
import { miniCi } from '../../src/miniCi/index';

test('miniCi', () => {
	miniCi({}, 'weapp');
	expect(miniCi).toHaveBeenCalledWith({}, 'weapp');

	miniCi({}, 'alipay');
	expect(miniCi).toHaveBeenCalled();
	// 真正执行
	// expect(() => miniCi({}, 'alipay')).toThrowError(/alipay/);
});
