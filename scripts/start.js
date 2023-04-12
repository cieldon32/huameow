const path = require('path');
const exec = require('./utils');

const cwd = process.cwd();

process.chdir(path.resolve(__dirname, '../packages/' + process.argv[2]));
exec('pnpm start ' + process.argv[3]);
process.chdir(cwd);
