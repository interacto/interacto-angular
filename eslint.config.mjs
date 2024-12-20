import tsParser from "@typescript-eslint/parser";
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from "@stylistic/eslint-plugin";
import importPlugin from 'eslint-plugin-import';
import globals from "globals";

export default [...[].concat(
    importPlugin.flatConfigs.recommended,
    importPlugin.flatConfigs.typescript,
    importPlugin.flatConfigs.errors,
    stylistic.configs["all-flat"],
    tseslint.configs.strictTypeChecked,
    tseslint.configs.eslintRecommended,
    tseslint.configs.recommendedTypeChecked,
    tseslint.configs.all,
    eslint.configs.all
    ),
    {
        files: ["projects/interacto-angular/src/**/*.ts"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                sourceType: "module",
                project: ["projects/interacto-angular/tsconfig.lib.prod.json"]
            },
            globals: {
                ...globals.browser,
                ...globals.node,
                "NodeJS": true
            }
        },
        plugins: {
        },
        rules: {
            "no-useless-constructor": "off",
            "no-warning-comments": "off",
            "no-new": "off",
            "no-underscore-dangle": "off",
            "id-length": ["error", {
                exceptions: ["x", "y", "i", "j", "c"],
            }],
            "require-await": "off",
            "no-use-before-define": "off",
            "default-case": "off",
            "accessor-pairs": "off",
            "no-console": "off",
            "new-cap": "off",
            "no-duplicate-imports": "off",
            "func-style": "off",
            "max-lines": "off",
            "prefer-destructuring": "off",
            "no-lonely-if": "off",
            "capitalized-comments": "off",
            "no-plusplus": "off",
            "no-extra-parens": "off",
            "dot-location": "off",
            "sort-keys": "off",
            "array-element-newline": "off",
            "function-paren-newline": "off",
            "max-params": "off",
            "no-ternary": "off",
            "multiline-ternary": "off",
            "max-classes-per-file": "off",
            "max-statements": "off",
            "init-declarations": "off",
            "keyword-spacing": "off",
            "space-before-function-paren": "off",
            "function-call-argument-newline": "off",
            "no-mixed-operators": "off",
            "lines-between-class-members": "off",
            "no-unused-expressions": "off",
            "no-undefined": "off",
            "padded-blocks": "off",
            "lines-around-comment": "off",
            "sort-imports": "off",
            "no-magic-numbers": "off",
            "indent": "off",
            "multiline-comment-style": ["error", "starred-block"],
            "arrow-parens": ["error", "as-needed"],
            "complexity": ["error", {
                max: 10,
            }],
            "eqeqeq": ["error", "smart"],
            "max-len": ["error", {
                code: 150,
            }],
            "no-multiple-empty-lines": ["error", {
                max: 1,
            }],
            "no-restricted-syntax": ["error", "ForInStatement"],
            "one-var": ["error", "never"],
            "class-methods-use-this": "off",
            "no-empty-function": "off",
            "no-shadow": "error",
            "no-unused-vars": ["error", {
                argsIgnorePattern: "^_",
            }],

            "@stylistic/block-spacing": "off",
            "@stylistic/padded-blocks": "off",
            "@stylistic/array-element-newline": "off",
            "@stylistic/function-call-argument-newline": "off",
            "@stylistic/arrow-parens": "off",
            "@stylistic/multiline-comment-style": "off",
            "@stylistic/object-property-newline": "off",
            "@stylistic/function-paren-newline": "off",
            "@stylistic/dot-location": "off",
            "@stylistic/space-before-function-paren": "off",
            "@stylistic/multiline-ternary": "off",
            "@stylistic/no-extra-parens": "off",
            "@stylistic/lines-around-comment": "off",
            "@stylistic/implicit-arrow-linebreak": "off",
            "@stylistic/quote-props": "off",
            "@stylistic/indent": ["error", 4, {
                FunctionDeclaration: {
                    parameters: "first",
                },

                FunctionExpression: {
                    parameters: "first",
                },

                SwitchCase: 1,
            }],
            "@stylistic/quotes": ["error", "double"],

            "@typescript-eslint/no-invalid-void-type": "off",
            "@typescript-eslint/consistent-type-imports": "off",
            "@typescript-eslint/parameter-properties": "off",
            "@typescript-eslint/no-extraneous-class": "off",
            "@typescript-eslint/no-unsafe-type-assertion": "off",
            "@typescript-eslint/consistent-type-exports": "off",
            "@typescript-eslint/prefer-readonly-parameter-types": "off",
            "@typescript-eslint/class-methods-use-this": "off",
            "@typescript-eslint/no-unnecessary-type-parameters": "off",
            "@typescript-eslint/prefer-optional-chain": "off",
            "@typescript-eslint/max-params": "off",
            "@typescript-eslint/block-spacing": "off",
            "@typescript-eslint/lines-around-comment": "off",
            "@typescript-eslint/no-type-alias": "off",
            "@typescript-eslint/no-magic-numbers": "off",
            "@typescript-eslint/init-declarations": "off",
            "@typescript-eslint/space-before-function-paren": "off",
            "@typescript-eslint/no-empty-interface": "off",
            "@typescript-eslint/no-empty-function": "off",
            "@typescript-eslint/member-ordering": "off",
            "@typescript-eslint/method-signature-style": "off",
            "@typescript-eslint/no-extra-parens": "off",
            "@typescript-eslint/no-invalid-this": "off",
            "@typescript-eslint/no-unused-expressions": "off",
            "@typescript-eslint/typedef": "off",
            "@typescript-eslint/array-type": ["error", {
                default: "generic",
            }],
            "@typescript-eslint/explicit-member-accessibility": ["error", {
                accessibility: "explicit",
            }],
            "@typescript-eslint/prefer-nullish-coalescing": ["error", {
                ignoreMixedLogicalExpressions: false,
                ignoreConditionalTests: false,
            }],
            "@typescript-eslint/no-unused-vars": "off",

            "import/no-deprecated": "error",
            "import/no-empty-named-blocks": "error",
            "import/no-extraneous-dependencies": "off",
            "import/no-mutable-exports": "error",
            "import/no-absolute-path": "error",
            "import/no-useless-path-segments": "error",
            "import/no-self-import": "error",
            "import/no-restricted-paths": ["error", {
                zones: [{
                    target: "./src/api",
                    from: "./src/impl",
                }],
            }],
            "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
            "import/exports-last": "error",
            "import/order": ["error", {
                "newlines-between": "never",

                alphabetize: {
                    order: "asc",
                    caseInsensitive: true,
                },

                groups: [
                    "index",
                    "sibling",
                    "parent",
                    "internal",
                    "external",
                    "builtin",
                    "object",
                    "type",
                ],
            }],
            "import/no-unassigned-import": "error",
            "import/newline-after-import": "error",
            "import/first": "error",
            "import/no-unresolved": "off",
            "import/named": "off"
        }
    },
    {
        files: ["projects/interacto-angular/src/**/*.spec.ts"],
        plugins: {
        },
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                sourceType: "module",
                project: ["projects/interacto-angular/tsconfig.spec.json"],
                tsconfigRootDir: import.meta.dirname,
            },
            globals: {
                ...globals.node,
                ...globals.browser,
                ...globals.jasmine
            }
        },
        rules: {
            "no-new": "off",
            "no-underscore-dangle": "off",
            "no-duplicate-imports": "off",
            "func-style": "off",
            "max-lines": "off",
            "prefer-destructuring": "off",
            "no-lonely-if": "off",
            "capitalized-comments": "off",
            "no-plusplus": "off",
            "no-extra-parens": "off",
            "dot-location": "off",
            "sort-keys": "off",
            "array-element-newline": "off",
            "function-paren-newline": "off",
            "max-params": "off",
            "no-ternary": "off",
            "multiline-ternary": "off",
            "max-classes-per-file": "off",
            "max-statements": "off",
            "init-declarations": "off",
            "keyword-spacing": "off",
            "space-before-function-paren": "off",
            "function-call-argument-newline": "off",
            "no-mixed-operators": "off",
            "lines-between-class-members": "off",
            "no-unused-expressions": "off",
            "no-undefined": "off",
            "padded-blocks": "off",
            "lines-around-comment": "off",
            "sort-imports": "off",
            "no-magic-numbers": "off",
            "indent": "off",
            "id-length": "off",
            "multiline-comment-style": "off",
            "max-lines-per-function": "off",
            "object-property-newline": "off",
            "complexity": "off",
            "class-methods-use-this": "off",
            "no-empty-function": "off",
            "no-unused-vars": "off",
            "one-var": "off",
            "no-array-constructor": "off",
            "no-throw-literal": "off",
            "default-param-last": "off",
            "require-await": "off",

            "@stylistic/block-spacing": "off",
            "@stylistic/padded-blocks": "off",
            "@stylistic/array-element-newline": "off",
            "@stylistic/function-call-argument-newline": "off",
            "@stylistic/arrow-parens": "off",
            "@stylistic/multiline-comment-style": "off",
            "@stylistic/object-property-newline": "off",
            "@stylistic/function-paren-newline": "off",
            "@stylistic/dot-location": "off",
            "@stylistic/space-before-function-paren": "off",
            "@stylistic/multiline-ternary": "off",
            "@stylistic/no-extra-parens": "off",
            "@stylistic/lines-around-comment": "off",
            "@stylistic/implicit-arrow-linebreak": "off",
            "@stylistic/quote-props": "off",
            "@stylistic/indent": ["error", 4, {
                FunctionDeclaration: {
                    parameters: "first",
                },

                FunctionExpression: {
                    parameters: "first",
                },

                SwitchCase: 1,
            }],

            "@typescript-eslint/no-unsafe-argument": "off",
            "@typescript-eslint/no-unsafe-type-assertion": "off",
            "@typescript-eslint/only-throw-error": "off",
            "@typescript-eslint/prefer-destructuring": "off",
            "@typescript-eslint/unbound-method": "off",
            "@typescript-eslint/no-unsafe-member-access": "off",
            "@typescript-eslint/no-unsafe-call": "off",
            "@typescript-eslint/non-nullable-type-assertion-style": "off",
            "@typescript-eslint/no-confusing-void-expression": "off",
            "@typescript-eslint/await-thenable": "off",
            "@typescript-eslint/consistent-type-exports": "off",
            "@typescript-eslint/prefer-readonly-parameter-types": "off",
            "@typescript-eslint/class-methods-use-this": "off",
            "@typescript-eslint/no-unnecessary-type-parameters": "off",
            "@typescript-eslint/prefer-optional-chain": "off",
            "@typescript-eslint/max-params": "off",
            "@typescript-eslint/block-spacing": "off",
            "@typescript-eslint/lines-around-comment": "off",
            "@typescript-eslint/no-type-alias": "off",
            "@typescript-eslint/no-magic-numbers": "off",
            "@typescript-eslint/init-declarations": "off",
            "@typescript-eslint/space-before-function-paren": "off",
            "@typescript-eslint/no-empty-interface": "off",
            "@typescript-eslint/no-empty-function": "off",
            "@typescript-eslint/member-ordering": "off",
            "@typescript-eslint/method-signature-style": "off",
            "@typescript-eslint/no-extra-parens": "off",
            "@typescript-eslint/no-invalid-this": "off",
            "@typescript-eslint/no-unused-expressions": "off",
            "@typescript-eslint/typedef": "off",
            "@typescript-eslint/array-type": ["error", {
                default: "generic",
            }],
            "@typescript-eslint/no-unused-vars": ["error", {
                argsIgnorePattern: "^_",
            }],
            "@typescript-eslint/restrict-template-expressions": "off"
        }
    }
]
