import * as QRCode from 'qrcode';
import { UserConfig } from '../types';
import logger from '../logger';

// 生成二维码并输出到控制台
export const printQrcode = async (config: UserConfig) => {
	// 先写死
	const url = `https://open.weixin.qq.com/sns/getexpappinfo?appid=${config.projectOptions.appid}#wechat-redirect`;
	let terminalStr = await QRCode.toString(url, {
		type: 'terminal',
		small: true,
	});
	logger.log(`【${config.name}】体验版二维码如下:\n`);

	console.log(terminalStr);
};
