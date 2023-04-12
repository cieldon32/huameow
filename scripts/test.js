const path = require('path');
const exec = require('./utils');

const cwd = process.cwd();

process.chdir(path.resolve(__dirname, '../packages/' + process.argv[2]));
exec('yarn test');

console.info('分割线');

process.chdir(cwd);
