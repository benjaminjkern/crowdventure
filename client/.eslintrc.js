module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "next/core-web-vitals",
    ],
    parser: "@babel/eslint-parser",
    parserOptions: {
        requireConfigFile: false,
        babelOptions: {
            babelrc: false,
            configFile: false,
            // your babel options
            presets: ["@babel/preset-env", "@babel/preset-react"],
        },
    },
    env: {
        browser: true,
        node: true,
    },
    rules: {
        "react/prop-types": "off",
        "no-unused-vars": "warn",
    },
};
