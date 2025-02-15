import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        files: ["*.ts", "*.tsx"],
        extends: [
            "eslint:recommended",
            "plugin:react/recommended",
            "plugin:react-hooks/recommended",
            "plugin:@typescript-eslint/recommended",
            "plugin:@typescript-eslint/recommended-requiring-type-checking",
            "plugin:jsx-a11y/recommended",
            "plugin:storybook/recommended",
            "prettier",
        ],
        plugins: ["import", "jest", "typescript-sort-keys", "unused-imports"],
        rules: {
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-empty-function": "off",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    // Allow unused vars prefixed with an underscore or name "ignored"
                    varsIgnorePattern: "([iI]gnored)|(_\\w+)",
                },
            ],
            "@typescript-eslint/prefer-includes": "off",
            "@typescript-eslint/restrict-plus-operands": "off",
            "import/order": [
                "error",
                {
                    alphabetize: {
                        order: "asc",
                    },
                    "newlines-between": "always",
                    groups: [
                        "builtin",
                        ["external", "internal"],
                        "parent",
                        "sibling",
                        "index",
                    ],
                },
            ],
            "jest/no-focused-tests": "error",
            "jsx-a11y/label-has-associated-control": [
                "error",
                {
                    assert: "either",
                },
            ],
            "no-empty-function": "off",
            "no-restricted-imports": [
                "warn",
                {
                    patterns: [
                        {
                            group: ["*.css", "*.scss"],
                            message: "Please use CSS-in-JS instead",
                        },
                        {
                            group: ["**/dist/"],
                            message:
                                "Deep imports from 'dist' are not allowed. Instead import from the package root.",
                        },
                    ],
                },
            ],
            "no-unused-vars": [
                "error",
                {
                    // Allow unused variables prefixed with an underscore or name "ignored"
                    varsIgnorePattern: "([iI]gnored)|(_\\w+)",
                },
            ],
            "react-hooks/exhaustive-deps": "error",
            "react-hooks/rules-of-hooks": "error",
            "react/jsx-curly-spacing": [
                "error",
                {
                    when: "never",
                },
            ],
            "react/jsx-equals-spacing": ["error", "never"],
            "react/jsx-no-bind": "off",
            "react/jsx-tag-spacing": "error",
            "react/jsx-wrap-multilines": "error",
            "react/no-array-index-key": "error",
            "react/prop-types": "off",
            "react/self-closing-comp": "error",
            "typescript-sort-keys/interface": [
                "error",
                "asc",
                {
                    requiredFirst: true,
                },
            ],
            "unused-imports/no-unused-imports": "error",
        },
    },
    {
        files: ["*.test.*", "*.tests.*"],
        rules: {
            "@typescript-eslint/no-unsafe-return": "off",
            "@typescript-eslint/no-non-null-assertion": "off",
            "react/display-name": "off",
        },
    },
];

export default eslintConfig;
