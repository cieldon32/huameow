const path = require('path');
const exec = require('./utils');

const cwd = process.cwd();

// Note: We don't currently have a build step for react-router-native.
// Instead, we use the source files directly.
['schematics', 'cli'].forEach((packageName) => {
  process.chdir(path.resolve(__dirname, '../packages/' + packageName));
  exec('pnpm build');
});
console.info('分割线');

process.chdir(cwd);
