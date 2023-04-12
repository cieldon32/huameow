const path = require('path');
const exec = require('./utils');

const cwd = process.cwd();

process.chdir(path.resolve(__dirname, '../packages/' + process.argv[2]));
if(process.argv[3] && process.argv[3] === '-dev'){
  exec('pnpm build:dev');
} else if (process.argv[3] && process.argv[3] === '-test') {
  exec('pnpm build:test');
}  else if (process.argv[3] && process.argv[3] === '-test2') {
  exec('pnpm build:test2');
} else if (process.argv[3] && process.argv[3] === '-pre') {
  exec('pnpm build:pre');
} else if (process.argv[3] && process.argv[3] === '-prod') {
  exec('pnpm build:prod');
} else {
  exec('pnpm build');
}
exec('pnpm build:type');

console.info('分割线');

process.chdir(cwd);
