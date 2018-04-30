const path = require('path');

module.exports = {
  devtool: "eval",
  mode: 'development',
  entry: [
    'regenerator-runtime/runtime',
    path.join( __dirname, 'src/index.tsx' )
  ],
  output: {
    filename: 'app.js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          'ts-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      app: path.join( __dirname, 'src' )
    }
  }
};