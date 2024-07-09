import path from "node:path";
import { fileURLToPath } from "node:url";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import deprecation from "eslint-plugin-deprecation";
import prettier from "eslint-plugin-prettier";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: [
        "**/node_modules",
        "**/dist",
        "**/infra",
        "**/migrations",
        "**/*.md",
        "**/.eslintrc.js",
    ],
}, {
    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.jest,
            ...globals.browser,
            ...globals.shelljs,
        },

        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "module",

        parserOptions: {
            project: "tsconfig.json",
        },
    },
}, ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
).map(config => ({
    ...config,
    files: ["apps/api-gateway/**/*.ts"],
})), {
    files: ["apps/api-gateway/**/*.ts"],

    plugins: {
        "simple-import-sort": simpleImportSort,
        "@typescript-eslint": typescriptEslint,
        deprecation,
        prettier,
    },

    languageOptions: {
        ecmaVersion: 5,
        sourceType: "module",

        parserOptions: {
            project: ["apps/api-gateway/tsconfig.json"],
        },
    },

    rules: {
        "@typescript-eslint/interface-name-prefix": "off",

        "@typescript-eslint/explicit-function-return-type": ["error", {
            allowExpressions: true,
        }],

        "@typescript-eslint/explicit-module-boundary-types": "off",

        "@typescript-eslint/no-explicit-any": ["error", {
            ignoreRestArgs: false,
        }],

        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/explicit-member-accessibility": "error",
        "@typescript-eslint/no-floating-promises": "error",
        "object-shorthand": ["error", "always"],
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
        "eol-last": ["error", "always"],
        "no-debugger": "error",
        "no-console": "error",
        "no-process-env": "error",
        "require-await": ["error"],
        "no-return-await": "off",

        "arrow-parens": ["error", "as-needed", {
            requireForBlockBody: false,
        }],

        camelcase: "warn",

        "func-style": ["error", "declaration", {
            allowArrowFunctions: true,
        }],
    },
}];
