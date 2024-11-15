const Dotenv = require('dotenv-webpack');

module.exports = function (config) {
  config.plugins = [
    ...config.plugins,
    new Dotenv(),
  ];
  return config;
}
