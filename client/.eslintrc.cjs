/** @type {import("eslint").Linter.Config} */
// eslint-disable-next-line import/no-commonjs
module.exports = {
    extends: [
        "eslint:all",
        "plugin:react/all",
        "plugin:import/recommended",
        // "plugin:jsx-a11y/recommended", <- Wanna add this later but its fine for now
        "plugin:react-hooks/recommended",
    ],
    parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
        project: true,
    },
    parser: "@typescript-eslint/parser",
    plugins: ["import", "jsx-a11y", "react-hooks", "@typescript-eslint"],
    rules: {
        "react/function-component-definition": [
            "error",
            {
                namedComponents: "arrow-function",
                unnamedComponents: "arrow-function",
            },
        ],
        // "no-unused-vars": "warn",
        "react/forbid-component-props": "off",
        "max-len": ["warn", { code: 120 }],
        curly: ["error", "multi"],
        "react/jsx-no-constructed-context-values": "warn",
        "no-console": "warn",
        camelcase: ["error", { properties: "never" }],
        "no-warning-comments": "warn",
        "no-plusplus": ["warn", { allowForLoopAfterthoughts: true }],
        "prefer-named-capture-group": "warn",
        "react/no-unescaped-entities": "warn",
        "react/jsx-sort-props": "warn",

        // Import ones that are turned off for some reason
        "import/no-deprecated": "error",
        "import/no-empty-named-blocks": "error",
        "import/no-extraneous-dependencies": "error",
        "import/no-mutable-exports": "error",
        "import/no-unused-modules": "error",
        "import/no-amd": "error",
        "import/no-commonjs": "error",
        "import/no-import-module-exports": "error",
        "import/no-nodejs-modules": "error",
        "import/no-absolute-path": "error",
        "import/no-cycle": "error",
        "import/no-dynamic-require": "error",
        "import/no-relative-packages": "error",
        "import/no-relative-parent-imports": "error",
        "import/no-restricted-paths": "error",
        "import/no-self-import": "error",
        "import/no-useless-path-segments": "error",
        "import/no-webpack-loader-syntax": "error",
        "import/dynamic-import-chunkname": "error",
        "import/extensions": "error",
        "import/first": "error",
        "import/newline-after-import": "error",
        "import/no-named-default": "error",
        "import/no-namespace": "error",
        "import/no-unassigned-import": { allow: ["**/*.css"] },

        "import/order": "warn",
        "import/consistent-type-specifier-style": ["warn", "prefer-inline"],

        // Completely disagree
        "quote-props": "off",
        "sort-keys": "off",
        "comma-dangle": "off",
        "array-element-newline": "off",
        "object-curly-spacing": "off",
        "react/jsx-filename-extension": "off",
        "padded-blocks": "off",
        "one-var": "off",
        "consistent-return": "off",
        "multiline-ternary": "off",
        "no-ternary": "off",
        "object-property-newline": "off",
        "function-call-argument-newline": "off",
        "id-length": "off",
        "react/jsx-max-props-per-line": "off",
        "react/jsx-no-literals": "off",
        "react/jsx-one-expression-per-line": "off",
        "lines-around-comment": "off",
        "no-inline-comments": "off",
        "implicit-arrow-linebreak": "off",
        "function-paren-newline": "off",
        "react/jsx-curly-newline": "off",
        "nonblock-statement-body-position": "off",
        "max-params": "off",
        "dot-location": "off",
        "react/button-has-type": "off",
        "no-undefined": "off",
        "array-callback-return": "off",
        "operator-linebreak": "off",
        "react/jsx-child-element-spacing": "off",
        "space-before-function-paren": "off",
        "brace-style": "off",
        "array-bracket-newline": "off",
        "no-continue": "off",

        // Can maybe see where they're coming from but I disagree
        "react/no-multi-comp": "off",
        "react/jsx-props-no-spreading": "off",
        "line-comment-position": "off",
        "no-nested-ternary": "off",
        "max-statements": "off",
        "no-throw-literal": "off",
        // Honestly dont entirely know what this is for but I dont care about it that much
        "react/iframe-missing-sandbox": "off",
        "default-param-last": "off",
        "init-declarations": "off",
        "require-unicode-regexp": "off",
        "capitalized-comments": "off",
        "multiline-comment-style": "off",
        "default-case": "off",
        "react/hook-use-state": "off",

        /*
         * I would still like to have a warning for something like these
         * but they are either too annoying or dont do exactly what I want
         */
        "sort-imports": "off", // This would be great if I could fix it automatically
        "react/prop-types": "off",
        "no-magic-numbers": "off",
        "react/no-array-index-key": "off",
        "max-lines-per-function": "off",
        "react/jsx-max-depth": "off",
        "react/jsx-no-bind": "off",
        "no-empty-function": "off",
        "prefer-destructuring": "off", // Case of const a = b[1]; would be annoying to write as const [_, a] = b;
        complexity: "off",
        "max-lines": "off",
        "no-negated-condition": "off",
        "react/no-object-type-as-default-prop": "off",
        "react/require-default-props": "off",
        "import/no-unresolved": "off",
        "import/prefer-default-export": "off",
        "no-alert": "off",

        /*
         * Doesnt exist here but it does exist in eslint-plugin-unicorn
         * "prefer-logical-operator-over-ternary": "error",
         */

        // These ones are nice but conflict with prettier
        "no-extra-parens": "off", // The two differ on whether ...(a ? b : c) needs parentheses or not
        quotes: "off", // Prettier will force a situation like 'url("SUP")' to interfere with this
        "react/jsx-indent": "off",
        /*
         * Prettier will put an object inside of a ternary indented two extra spaces out for some reason,
         * this one can probably be fixed on the prettier side but whatever
         */
        indent: "off",
        "react/jsx-newline": "off",
        "no-mixed-operators": "off",
        "no-confusing-arrow": "off", // This one would actually be sorta nice but prettier makes it annoying

        // Ben-added typescript rules

        // Nextjs images allow for static imports inline
        "@typescript-eslint/no-var-requires": "off",
        // I fucking hate typescript and sometimes I need to turn it completely off
        "@typescript-eslint/ban-ts-comment": "warn",
        // This is nice for undefined or nulls, but when something is a boolean | undefined this shouldnt really come in here because it might be the case that I delibrately am using ||
        "@typescript-eslint/prefer-nullish-coalescing": "off",
        // There are places where I want the default function to be an empty function and it's nicer to write () => {} than () => undefined
        "@typescript-eslint/no-empty-function": "off",
        // Runs on types!!!! Super dumb and should just use typescript version
        "no-unused-vars": "off",

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
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
    },
    ignorePatterns: ["**/*.html", "lib/clientDefs.ts"],
};
