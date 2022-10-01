const fs = require('fs');
const path = require('path');
function replace(file, rules) {
	const src = path.resolve(file);
	let template = fs.readFileSync(src, 'utf8');

	template = rules.reduce(
		(template, rule) =>
			template.replace(
				rule.search,
				typeof rule.replace === 'string'
					? rule.replace
					: rule.replace.bind(global),
			),
		template,
	);

	fs.writeFileSync(src, template);
}

module.exports = {
	replaceRules: [],
	getRules: function (config) {
		// production.config
		const originalConfig =
			require('../config/customize/production.config.json').config;
		this.replaceRules = [
			{
				file: './dist/build/mp-weixin/common/vendor.js',
				rules: [
					{
						search: originalConfig.appid,
						replace: config.appid,
					},
					{
						search: originalConfig.url,
						replace: config.url,
					},
				],
			},
			{
				file: './dist/build/mp-weixin/project.config.json',
				rules: [
					{
						search: originalConfig.appid,
						replace: config.appid,
					},
				],
			},
		];
	},
	modify: function (config) {
		this.getRules(config);
		// 修改文件
		this.replaceRules.forEach((item) => {
			replace(item.file, item.rules);
		});
	},
	renew: function () {
		// 修改文件还原
		this.replaceRules.forEach((item) => {
			replace(
				item.file,
				item.rules.map((el) => {
					return { search: el.replace, replace: el.search };
				}),
			);
		});
	},
};
