import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import baseConfig from './base.mjs';

export default [
  ...baseConfig,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },
];
