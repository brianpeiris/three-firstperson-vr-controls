const path = require('path');

const common = {
  entry: './FirstPersonVRControls.js',
  output: { 
    path: path.resolve(__dirname, 'build'),
    libraryExport: "default"
  },
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  }
};

const threeGlobal = {
  ...common,
  ...{
    output: {
      ...common.output,
      filename: './FirstPersonVRControls.browser.min.js',
      library: "THREE.FirstPersonVRControls",
      libraryTarget: "assign",
    },
    externals: {
      three: 'THREE'
    }
  }
};

const umd = {
  ...common,
  ...{
    output: { 
      ...common.output,
      filename: './FirstPersonVRControls.umd.min.js',
      library: "FirstPersonVRControls",
      libraryTarget: "umd",
    },
    externals: {
      three: 'three'
    }
  }
};

module.exports = [threeGlobal, umd];
