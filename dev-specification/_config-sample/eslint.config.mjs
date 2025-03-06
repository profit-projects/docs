import { readFileSync } from 'fs';

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
//
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
//
import importPlugin from 'eslint-plugin-import';

const OFF = 'off';
const WARN = 'warn';
const ERROR = 'error';


const ignoreList = readFileSync('.prettierignore', 'utf-8')
  .split('\n')
  .filter(line => line.trim() && !line.startsWith('#'));


export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.strictTypeChecked,
  prettierConfig,
  {
    plugins: {
      'import': importPlugin,
      '@typescript-eslint': tseslint.plugin,
      'prettier': prettierPlugin,
    },
  },
  {
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 'latest',
      parserOptions: {
        project: true,
        projectService: true,
      },
    },
  },
  {
    files: ['**/*.js', '**/*.mjs'],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    rules: {
      // common
      'no-console': OFF,
      'no-underscore-dangle': OFF,
      'arrow-body-style': OFF,
      'no-restricted-exports': OFF,
      'no-restricted-syntax': [
        ERROR,
        'ForInStatement',
        'LabeledStatement',
        'WithStatement',
      ],
      'max-len': [
        WARN,
        {
          code: 80, // (default 80) enforces a maximum line length
          ignoreComments: true, // ignores all trailing comments and comments on their own line
          ignoreTrailingComments: true, // ignores only trailing comments
          ignoreUrls: true, // ignores lines that contain a URL
          // tabWidth: 4, // (default 4) specifies the character width for tab characters
          // comments: 80, // enforces a maximum line length for comments; defaults to value of code
          // ignorePattern: true, // ignores lines matching a regular expression; can only internalMatch a single line and need to be double escaped when written in YAML or JSON
          ignorePattern:
          // "(^(import|export)\\s.+\\sfrom\\s.+;$)|('--props-.+':.+)|prettier-ignore",
          // "(^(import|export)\\s.+\\sfrom\\s.+)|.*prettier-ignore",
          // /pragma|ignore|prettier-ignore|webpack\w+:|c8/.source,
          // ignoreStrings: true, // ignores lines that contain a double-quoted or single-quoted string
            '^import [^,]+ from |' +
            '^export |' +
            'implements|' +
            '\\[styles\\[', // 用在 forCX
          ignoreTemplateLiterals: true, // ignores lines that contain a template literal
          ignoreRegExpLiterals: true, // ignores lines that contain a RegExp literal
        },
      ],
      'prefer-const': WARN,
      'no-shadow': ERROR,
      'object-shorthand': ERROR,
      'spaced-comment': OFF,
      'no-undef': OFF,
      'no-delete-var': OFF,
      'prefer-regex-literals': OFF,
      'no-unsafe-optional-chaining': OFF,
      'no-constant-binary-expression': OFF,
      //
      //
      // import
      'import/no-extraneous-dependencies': OFF,
      'import/named': OFF,
      'import/prefer-default-export': OFF,
      //
      //
      // typescript
      // '@typescript-eslint/dot-notation': OFF,
      // '@typescript-eslint/naming-convention': OFF,
      // '@typescript-eslint/lines-between-class-members': OFF,
      // '@typescript-eslint/no-empty-interface': OFF,
      // '@typescript-eslint/no-empty-function': OFF,
      // '@typescript-eslint/no-empty-object-type': OFF,
      //
      // typescript strict!!!
      // '@typescript-eslint/require-await': OFF,
      // '@typescript-eslint/use-unknown-in-catch-callback-variable': OFF,
      // '@typescript-eslint/await-thenable': OFF,
      '@typescript-eslint/restrict-template-expressions': OFF,
      // '@typescript-eslint/restrict-plus-operands': OFF,
      // '@typescript-eslint/prefer-nullish-coalescing': OFF,
      // '@typescript-eslint/prefer-promise-reject-errors': OFF,
      // //
      // '@typescript-eslint/no-non-null-assertion': OFF,
      '@typescript-eslint/no-unsafe-assignment': OFF,
      // '@typescript-eslint/no-misused-promises': OFF,
      // '@typescript-eslint/no-unsafe-argument': OFF,
      // '@typescript-eslint/no-unsafe-member-access': OFF,
      // '@typescript-eslint/no-floating-promises': OFF,
      // '@typescript-eslint/no-unnecessary-condition': OFF,
      // '@typescript-eslint/no-confusing-void-expression': OFF,
      // '@typescript-eslint/no-redundant-type-constituents': OFF,
      // '@typescript-eslint/no-unsafe-call': OFF,
      // '@typescript-eslint/no-unsafe-return': OFF,
      // '@typescript-eslint/no-unnecessary-type-parameters': OFF,
      // '@typescript-eslint/no-unsafe-enum-comparison': OFF,
      // '@typescript-eslint/no-unsafe-function-type': OFF, // 可以去掉
      // '@typescript-eslint/no-base-to-string': OFF,
      // '@typescript-eslint/no-invalid-void-type': OFF,
      // '@typescript-eslint/ban-ts-comment': OFF,
      // '@typescript-eslint/no-non-null-asserted-optional-chain': OFF,
      // //
      // '@typescript-eslint/no-require-imports': OFF,
      // '@typescript-eslint/unbound-method': OFF,
      // '@typescript-eslint/no-dynamic-delete': OFF,

      '@typescript-eslint/no-unnecessary-template-express': OFF,
      '@typescript-eslint/no-unused-vars': OFF,
    },
  },
  {
    ignores: ignoreList,
  },
);
