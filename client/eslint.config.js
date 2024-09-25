import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tailwindCssPlugin from 'eslint-plugin-tailwindcss';
import unusedImports from 'eslint-plugin-unused-imports';
import sortKeysFix from 'eslint-plugin-sort-keys-fix';
import { includeIgnoreFile } from '@eslint/compat';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

export default [
  includeIgnoreFile(gitignorePath),
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  eslintPluginPrettierRecommended,
  {
    plugins: {
      'sort-keys-fix': sortKeysFix,
      tailwindcss: tailwindCssPlugin,
      'unused-imports': unusedImports,
    },
  },
  {
    rules: {
      'no-unused-vars': 0,
      'prettier/prettier': [
        2,
        {
          alignTernaryLines: false,
          eslintIntegration: true,
          printWidth: 120,
          semi: true,
          singleQuote: true,
          tabWidth: 2,
          trailingComma: 'all',
        },
      ],
      'react/jsx-sort-props': [
        2,
        {
          callbacksLast: true,
          shorthandFirst: true,
          shorthandLast: false,
        },
      ],
      'react/react-in-jsx-scope': 0,
      'require-jsdoc': 0,
      'sort-keys-fix/sort-keys-fix': 'warn',
      'tailwindcss/classnames-order': 'error',
      'tailwindcss/enforces-shorthand': 'error',
      'tailwindcss/no-contradicting-classname': 'error',
      'unused-imports/no-unused-imports': 2,
      'valid-jsdoc': 0,
    },
  },
];
