const execSync = require('child_process').execSync;

function exec(cmd) {
  execSync(cmd, { stdio: 'inherit', env: process.env });
}

module.exports = exec;
