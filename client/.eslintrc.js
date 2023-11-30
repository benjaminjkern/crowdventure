module.exports = {
    extends: [
        "eslint:all",
        "plugin:react/all",
        "plugin:import/recommended",
        // "plugin:jsx-a11y/recommended", <- Wanna add this later but its fine
        "plugin:react-hooks/recommended",
    ],
    parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
    },
    plugins: ["import", "jsx-a11y", "react-hooks"],
    rules: {
        "react/function-component-definition": [
            "error",
            {
                namedComponents: "arrow-function",
                unnamedComponents: "arrow-function",
            },
        ],
        "no-unused-vars": "warn",
        "react/forbid-component-props": ["error", { forbid: ["className"] }],
        "max-len": ["warn", { code: 120 }],
        curly: ["error", "multi"],
        "react/jsx-no-constructed-context-values": "warn",
        "no-console": "warn",
        camelcase: ["error", { properties: "never" }],
        "no-warning-comments": "warn",
        "no-plusplus": ["warn", { allowForLoopAfterthoughts: true }],
        "prefer-named-capture-group": "warn",
        "react/no-unescaped-entities": "warn",

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
    },
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
    },
    ignorePatterns: ["**/*.html"],
};
