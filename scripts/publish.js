const path = require('path');
const exec = require('./utils');

const rootDir = path.resolve(__dirname, '..');

async function run() {
  try {
    process.chdir(cwd);
    exec('lerna publish --skip-git');
    exec('lerna version --conventional-commits --skip-git');
    exec('git add .');
    exec('git commit -m "feat: 登陆加loading" --no-verify');
    exec('lerna publish --conventional-commits --skip-git');
  } catch (error) {
    console.log();
    console.error(`  ${error.message}`);
    console.log();
    return 1;
  }

  return 0;
}

run().then(code => {
  process.exit(code);
});
