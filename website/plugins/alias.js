const path = require('path');

module.exports = function () {
  return {
    name: 'alias-docusaurus-plugin',
    configureWebpack() {
      return {
        resolve: {
          alias: {
            $demo: path.resolve(__dirname, '../demo'), // 用于缩短文档路径
          },
        },
      };
    },
  };
};
