vi.mock('../src/logger');
import { expect, test, vi } from 'vitest';
import logger from '../src/logger';

test('logger', () => {
	logger.log('测试 log');
	logger.warn('测试 warn');
	logger.error('测试 error');
	logger.info('测试 info');
	logger.shouldLog();
	expect(logger.log).toHaveBeenCalledWith('测试 log');
	expect(logger.warn).toHaveBeenCalledWith('测试 warn');
	expect(logger.error).toHaveBeenCalledWith('测试 error');
	expect(logger.info).toHaveBeenCalledWith('测试 info');
	expect(logger.shouldLog).toHaveBeenCalled();
});
