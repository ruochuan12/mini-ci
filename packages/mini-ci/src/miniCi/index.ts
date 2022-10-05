import WeappCI from './weappCi';

export const miniCi = (options, platform: string = 'weapp') => {
	const platformMap = {
		weapp: WeappCI,
	};
	let PlatformCi = platformMap[platform];
	if (!PlatformCi) {
		throw new Error(`暂时不支持 ${platform} 平台`);
	}
	const ci = new PlatformCi(options);
	return ci;
};
