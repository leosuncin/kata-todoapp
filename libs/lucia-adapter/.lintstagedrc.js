import baseConfig from '../../.lintstagedrc.json' assert { type: 'json' };

export default {
  ...baseConfig,
  '*.{js,ts}': 'eslint --cache --fix',
};
