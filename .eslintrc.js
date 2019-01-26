module.exports = {
  extends: ['airbnb-base', 'prettier'],
  parser: 'babel-eslint',
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'linebreak-style': 0,
  },
};
