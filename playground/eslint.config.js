import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin-js";

export default [
    js.configs.recommended,
    {
        plugins: {
            js: stylistic,
        }