const fs = require('fs');
const path = require('path');
module.exports = {
  entry: './es-module-demo.js',
  output: { 
    filename: 'bundle.js',
    path: path.resolve(__dirname)
  },
  devtool: 'source-map',
  resolve: {
    symlinks: false
  },
  module: {
    rules: [
      { 
	test: /\.js$/, 
	loader: 'babel-loader'
      }
    ]
  }
}
