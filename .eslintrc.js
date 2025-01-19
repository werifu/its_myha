module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended', // React specific linting rules
    'plugin:@typescript-eslint/recommended', // TypeScript specific linting rules
    'plugin:prettier/recommended', // Integrates Prettier with ESLint
  ],
  plugins: ['react', '@typescript-eslint', 'prettier'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // Enable parsing of JSX
    },
  },
  rules: {
    'prettier/prettier': 'error', // Show Prettier errors as ESLint errors
    // Add or customize your rules here
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the react version
    },
  },
}; 