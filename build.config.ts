import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
	entries: ['src/cli', 'src/index'],
	clean: true,
	declaration: true,
	rollup: {
		emitCJS: true,
		inlineDependencies: true,
	},
});
