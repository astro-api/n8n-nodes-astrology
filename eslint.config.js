const tseslint = require('@typescript-eslint/eslint-plugin');
const tsparser = require('@typescript-eslint/parser');
const n8nNodesBase = require('eslint-plugin-n8n-nodes-base');

module.exports = [
  {
    ignores: ['dist/**'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'n8n-nodes-base': n8nNodesBase,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      'prefer-const': 'error',
      'no-var': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
  // n8n credential file rules
  {
    files: ['credentials/**/*.ts'],
    plugins: {
      'n8n-nodes-base': n8nNodesBase,
    },
    rules: {
      ...n8nNodesBase.configs.credentials.rules,
      // Disable miscased rule — it's for built-in n8n nodes, not community nodes
      'n8n-nodes-base/cred-class-field-documentation-url-miscased': 'off',
    },
  },
  // n8n node file rules
  {
    files: ['nodes/**/*.ts'],
    plugins: {
      'n8n-nodes-base': n8nNodesBase,
    },
    rules: {
      ...n8nNodesBase.configs.nodes.rules,
    },
  },
];
