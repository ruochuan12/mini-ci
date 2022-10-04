import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
	entries: ['src/cli', 'src/index'],
	clean: true,
	declaration: true,
	externals: ['vitest'],
	rollup: {
		emitCJS: true,
		inlineDependencies: true,
	},
});
