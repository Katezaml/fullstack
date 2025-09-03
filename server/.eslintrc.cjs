// server/.eslintrc.cjs
module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "@stylistic/js"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@stylistic/js/recommended",
    ],
    env: {
        node: true,
        es2021: true,
    },
};
