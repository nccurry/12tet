module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  "rules": {
    "semi": [1, "never"],
    "object-curly-spacing": [1, "always"],
    "@typescript-eslint/no-explicit-any": "off"
  }
}