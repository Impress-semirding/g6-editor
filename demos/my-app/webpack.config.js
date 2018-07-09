/* eslint-disable */
import webpack from 'webpack';

const process = require('process');

export default (webpackConfig, env) => {
  webpackConfig.resolve.extensions = ['.ts','.js', '.jsx', '.json'];
  // webpackConfig.resolve.alias = {};
  webpackConfig.resolve.alias['g6-editor'] = '/Users/zhongan/Documents/zhongan/g6Editor/src'
  return webpackConfig;
};
