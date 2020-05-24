module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb/base',
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
  },
}
