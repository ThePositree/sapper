import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://eslint.org/docs/latest/use/configure/migration-guide#using-eslintrc-configs-in-flat-config
const compat = new FlatCompat({
	baseDirectory: __dirname
});

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
		ignores: ["**/*.config.js"],
		languageOptions: {
			parserOptions: {
				project: "./tsconfig.json"
			}
		}
	},
	{
		languageOptions: { globals: globals.browser },
		settings: { react: { version: "detect" } }
	},
	...compat.extends("eslint-config-airbnb"),
	...compat.extends("eslint-config-airbnb-typescript"),
	pluginReact.configs.flat["jsx-runtime"],
	eslintPluginPrettierRecommended,
	{
		rules: {
			"no-continue": "off",
			"no-plusplus": "off",
			"no-restricted-syntax": "off"
		}
	}
];
