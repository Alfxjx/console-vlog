import babel from "rollup-plugin-babel";

export default {
	input: "src/main.ts",
	output: [
		{
			file: "./dist/bundle.esm.js",
			format: "es",
		},
		{
			file: "./dist/bundle.cjs.js",
			format: "cjs",
		},
	],
	plugins: [
		babel({
			extensions: [".ts", ".tsx", ".js"],
			exclude: "node_modules/**",
		}),
	],
};
