import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";
import jestPlugin from "eslint-plugin-jest";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import typescriptSortKeysPlugin from "eslint-plugin-typescript-sort-keys";
import nextPlugin from "@next/eslint-plugin-next";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    // Ignore paths per ESLint 9 (replaces .eslintignore)
    {
        ignores: [
            "node_modules",
            ".next",
            "coverage",
            "eslint.config.*",
            "jest.config.*",
            "next.config.*",
            "next-env.d.ts",
            // User request: ignore SnoKing files
            "src/utils/helpers/**/snoKing*",
            "src/types/snoKing.ts",
            "src/actions/**/fetchSnoKingEvents*",
            "src/**/__tests__/**/snoKing*",
            "src/**/__tests__/**/fetchSnoKingEvents*",
        ],
    },

    // Register Next.js plugin so Next build can detect it, and keep compat extends for full config
    {
        plugins: {
            "@next/next": nextPlugin,
        },
    },

    // (placeholder; Next config appended at the end to satisfy Next.js detection)

    // Base ESLint recommended for JS
    js.configs.recommended,

    // Ensure TS type-aware rules can read project settings
    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: __dirname,
            },
        },
    },

    // TypeScript-ESLint latest recommended sets
    ...tseslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,

    // Project rules and plugin mappings
    {
        files: ["**/*.ts", "**/*.tsx"],
        plugins: {
            import: importPlugin,
            jest: jestPlugin,
            "jsx-a11y": jsxA11yPlugin,
            react: reactPlugin,
            "react-hooks": reactHooksPlugin,
            "unused-imports": unusedImportsPlugin,
            "typescript-sort-keys": typescriptSortKeysPlugin,
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        rules: {
            "@typescript-eslint/consistent-type-imports": "error",
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
                    alphabetize: { order: "asc" },
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

            "jsx-a11y/label-has-associated-control": ["error", { assert: "either" }],

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

            // Use the TS rule instead of base no-unused-vars in TS files
            "no-unused-vars": "off",

            "react-hooks/exhaustive-deps": "error",
            "react-hooks/rules-of-hooks": "error",

            "react/jsx-curly-spacing": ["error", { when: "never" }],
            "react/jsx-equals-spacing": ["error", "never"],
            "react/jsx-no-bind": "off",
            "react/jsx-tag-spacing": "error",
            "react/jsx-wrap-multilines": "error",
            "react/no-array-index-key": "error",
            "react/prop-types": "off",
            "react/self-closing-comp": "error",

            "typescript-sort-keys/interface": ["error", "asc", { requiredFirst: true }],

            "unused-imports/no-unused-imports": "error",
        },
    },
    {
        files: ["**/*.test.*", "**/*.tests.*"],
        plugins: {
            jest: jestPlugin,
            react: reactPlugin,
        },
        rules: {
            "@typescript-eslint/no-unsafe-return": "off",
            "@typescript-eslint/no-non-null-assertion": "off",
            "react/display-name": "off",
        },
    },

    // Append Next config last so Next.js detects the plugin and defaults
    ...compat.config({ extends: ["next"] }),
];

export default eslintConfig;
