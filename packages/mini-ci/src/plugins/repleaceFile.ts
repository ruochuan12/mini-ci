import fs from 'node:fs';
import path from 'node:path';
import { ReplaceRuleItem, ReplaceRules } from '../types';
import { arrify } from '../utils';

function replace(file: ReplaceRules['file'], rules: ReplaceRules['rules']) {
	const src = path.resolve(file);
	let template = fs.readFileSync(src, 'utf8');

	template = rules.reduce(
		(template, rule) =>
			template.replace(
				rule.search,
				typeof rule.replace === 'function'
					? rule.replace()
					: rule.replace,
			),
		template,
	);

	fs.writeFileSync(src, template);
}

// 修改文件
export const replaceModify = (replaceRules: ReplaceRules[]) => {
	arrify(replaceRules).forEach((item: ReplaceRules) => {
		replace(item.file, item.rules);
	});
};

// 修改文件还原
export const replaceRenew = (replaceRules: ReplaceRules[]) => {
	arrify(replaceRules).forEach((item: ReplaceRules) => {
		replace(
			item.file,
			item.rules.map((el: ReplaceRuleItem) => {
				return { search: el.replace, replace: el.search };
			}),
		);
	});
};
