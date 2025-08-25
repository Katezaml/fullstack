import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin-js";

export default [
    js.configs.recommended,
    {
        plugins: {
            js: stylistic,
        }
// eslint.config.js
        import js from "@eslint/js";
        import ts from "@typescript-eslint/eslint-plugin";
        import tsParser from "@typescript-eslint/parser";
        import react from "eslint-plugin-react";
        import reactHooks from "eslint-plugin-react-hooks";
        import reactRefresh from "eslint-plugin-react-refresh";
        import stylistic from "@stylistic/eslint-plugin-js";

        export default [
            js.configs.recommended,
            {
                files: ["**/*.{ts,tsx}"],
                languageOptions: {
                    parser: tsParser,
                },
                plugins: {
                    "@typescript-eslint": ts,
                    react,
                    "react-hooks": reactHooks,
                    "react-refresh": reactRefresh,
                    "@stylistic/js": stylistic,
                },
                rules: {
                    ...react.configs.recommended.rules,
                    ...reactHooks.configs.recommended.rules,
                    // můžeš přidat další vlastní pravidla pokud bude potřeba
                },
                settings: {
                    react: {
                        version: "detect",
                    },
                },
            },
        ];
