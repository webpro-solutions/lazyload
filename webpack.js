const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');

module.exports = {
  stats: 'errors-warnings',
  target: 'web',
  entry: {
    loader: './app/loader.js',
    lazyload: './app/Lazyload.js',
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: 100000,
    maxAssetSize: 100000,
    assetFilter: (assetFilename) => assetFilename.endsWith('.js')
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    client: {
      overlay: false,
    },
    compress: true,
    port: 0
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: [
          /node_modules/
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.md$/i,
        loader: 'ignore-loader'
      }
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: path.resolve('./dev/index.html'),
    })
  ]
};
