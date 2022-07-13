const { red, bold } = require('kolorist');
const getVersion = () => {
	let version;
	try {
		version = require(`${packageJsonPath}/package.json`).version;
	} catch (e) {
		console.log(e);
		console.log(
			red(
				bold(
					'未设置 version , 并且未设置 package.json 路径，无法读取 version',
				),
			),
		);
	}
	return version;
};

module.exports = {
	getVersion,
};
