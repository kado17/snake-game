module.exports = {
  extends: ['stylelint-config-recess-order', 'stylelint-config-standard'],
  rules: {
    'selector-class-pattern': ['^([a-z][a-z0-9]*)(__[a-z0-9]+)*$'],
  },
  ignoreFiles: ['**/node_modules/**'],
};
