/** @type {import("eslint").Linter.Config} */
const config = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: true,
    },
    plugins: ["@typescript-eslint"],
    extends: [
        // TODO: Add this: "plugin:@typescript-eslint/all",
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked",
    ],
    rules: {
        // Ben-added rules

        // Nextjs images allow for static imports inline
        "@typescript-eslint/no-var-requires": "off",
        // I fucking hate typescript and sometimes I need to turn it completely off
        "@typescript-eslint/ban-ts-comment": "warn",
        // This is nice for undefined or nulls, but when something is a boolean | undefined this shouldnt really come in here because it might be the case that I delibrately am using ||
        "@typescript-eslint/prefer-nullish-coalescing": "warn",
        // I want TODOs to show up
        "no-warning-comments": "warn",
        // There are places where I want the default function to be an empty function and it's nicer to write () => {} than () => undefined
        "@typescript-eslint/no-empty-function": "off",

        //-----------------

        // These opinionated rules are enabled in stylistic-type-checked above.
        // Feel free to reconfigure them to your own preference.
        "@typescript-eslint/array-type": "off",
        "@typescript-eslint/consistent-type-definitions": "off",

        "@typescript-eslint/consistent-type-imports": [
            "warn",
            {
                prefer: "type-imports",
                fixStyle: "inline-type-imports",
            },
        ],
        "@typescript-eslint/no-unused-vars": [
            "warn",
            { argsIgnorePattern: "^_" },
        ],
        "@typescript-eslint/require-await": "off",
        "@typescript-eslint/no-misused-promises": [
            "error",
            {
                checksVoidReturn: { attributes: false },
            },
        ],
    },
};

module.exports = config;
