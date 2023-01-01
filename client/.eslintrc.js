module.exports = {
    extends: ["eslint:recommended", "plugin:react/recommended"],
    parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
    },
    rules: {
        "react/prop-types": "off",
        "no-unused-vars": "warn",
    },
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
    },
    ignorePatterns: ["**/*.html"],
};
