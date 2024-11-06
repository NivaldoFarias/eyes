import eslint from "@eslint/js";
import globals from "globals";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import reactRefresh from "eslint-plugin-react-refresh";

export default tseslint.config(
	eslintPluginPrettier,
	{ ignores: ["dist"] },
	{
		files: ["**/*.{js,jsx}"],
		languageOptions: {
			ecmaVersion: 2022,
			globals: globals.browser,
			parserOptions: {
				ecmaVersion: "latest",
				ecmaFeatures: { jsx: true },
				sourceType: "module",
			},
		},
		settings: { react: { version: "18.3" } },
		plugins: {
			react,
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh,
		},
		rules: {
			...eslint.configs.recommended.rules,
			...react.configs.recommended.rules,
			...react.configs["jsx-runtime"].rules,
			...reactHooks.configs.recommended.rules,
			"react/jsx-no-target-blank": "off",
			"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
		},
	},
	{
		files: ["**/*.{js,jsx,ts,tsx}"],
		plugins: {
			"@typescript-eslint": tseslint.plugin,
		},
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				project: ["./tsconfig.json", "./tsconfig.eslint.json"],
			},
		},
		rules: {
			// eslint rules
			"prettier/prettier": "off",

			// typescript-eslint rules
			"@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
			"@typescript-eslint/no-namespace": "off",
			"@typescript-eslint/dot-notation": "off",
			"@typescript-eslint/no-unsafe-argument": "off",
			"@typescript-eslint/no-extraneous-class": "off",
			"@typescript-eslint/no-unsafe-assignment": "off",
			"@typescript-eslint/no-unsafe-call": "off",
			"@typescript-eslint/no-unsafe-return": "off",
			"@typescript-eslint/no-unsafe-member-access": "off",
		},
	},
	{
		files: ["*.cjs"],
		languageOptions: {
			globals: globals.commonjs,
		},
	},
	{
		files: ["*.mjs"],
		languageOptions: {
			globals: globals.node,
		},
	},
);
