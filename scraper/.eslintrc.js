module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb/base',
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['jest', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
  },
}
