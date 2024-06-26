module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended', 'plugin:import/typescript', 'plugin:storybook/recommended'],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/no-unused-prop-types": "off",
    "react/prop-types": "off",
    "react/no-unescaped-entities": "off",
  },
  ignorePatterns: [
    'public',
    'build'
  ],
};
