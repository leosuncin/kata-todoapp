import baseConfig from '../../.lintstagedrc.json' assert { type: 'json' };

// const baseConfig = require('../../.lintstagedrc.json');

export default {
  ...baseConfig,
  '*.{js,ts}': 'eslint --cache --fix',
};
