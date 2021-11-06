const path = require('path');

module.exports = {
  // to tell Webpack not to minify files so strictly, so programming
  // will be more convenient for development purposes
  mode: 'development',

  entry: './src/app.ts',
  output: {
    // use 'contenthash' for create a unique has for each build
    // useful with caching in the browser
    // filename: 'bundle.[contenthash].js',
    filename: 'bundle.js',

    // Webpack needs absolute path for /dist folder
    // so let's use node.js default methods
    path: path.resolve(__dirname, 'dist'),

    // Webpack build server builds bundle.js and put it to memory
    // so it's not visible inside /dist folder -> /dist is only for
    // builds (production, test, ...)
    publicPath: 'dist',
  },

  
  // tells that sourceMaps are there already (in tsconfig.json USE "sourceMap": true)
  devtool: 'inline-source-map',
  
  devServer: {
    open: true,
    static: {
      directory: path.join(__dirname, '/'),
    },
    historyApiFallback: true,
    // compress: true,
    // hot: false,
    // liveReload: true
  },

  // To tell Webpack how to work with files
  module: {
    // check the all files with *.ts
    rules: [{ test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ }],
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};
