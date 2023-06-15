const resolve = require('resolve');

module.exports = function (path) {
  return resolve.sync(path, { extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx'] });
};
