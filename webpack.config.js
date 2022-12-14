const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, 'assets', 'js', 'app.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public', 'js')
  },
  module: {
    rules: [
      { 
        test: /\.pug$/,
        use: ['pug-loader']
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, 'public', 'index.html'),
      template: path.join(__dirname, 'assets', 'views', 'index.pug')
    }),
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, 'public', 'other_error.html'),
      template: path.join(__dirname, 'assets', 'views', 'other_error.pug')
    }),
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, 'public', '404.html'),
      template: path.join(__dirname, 'assets', 'views', '404.pug')
    }),
    new CopyWebpackPlugin([
      { 
        from: path.join(__dirname, 'assets', 'css', '*'), 
        to: path.join(__dirname, 'public', 'css'),
        toType: 'dir',
        flatten: true
      },
      { 
        from: path.join(__dirname, 'assets', 'fonts', '*'), 
        to: path.join(__dirname, 'public', 'fonts'),
        toType: 'dir',
        flatten: true
      },
      { 
        from: path.join(__dirname, 'assets', 'images', '*'), 
        to: path.join(__dirname, 'public', 'images'),
        toType: 'dir',
        flatten: true
      },
      { 
        from: path.join(__dirname, 'assets', 'files', '*'), 
        to: path.join(__dirname, 'public'),
        toType: 'dir',
        flatten: true
      }
    ])
  ],
  devtool: 'source-map',
  node: {
    __dirname: true,
    __filename: true,
  },
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, 'public'),
    publicPath: '/'
  }
}