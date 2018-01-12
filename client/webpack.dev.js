const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const _env = require('./_env');


module.exports = {
  entry: {
    main: './src/index.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
    alias: {
      normalize: path.join(__dirname, 'node_modules/normalize.css'),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'style-loader',
            options: {
              modules: true,
              importLoaders: 1,
            },
          },
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'style-loader',
            options: {
              modules: true,
              importLoaders: 1,
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `hash:[hash],
      chunkhash:[chunkhash],
      name:[name],
      filebase:[filebase],
      query:[query],
      file:[file]`,
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
      },
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true,
    }),
  ],
  output: {
    filename: '[name].[hash].js',
    path: path.resolve('/usr/share/nginx/html/static/dist'),
    publicPath: '/blog/',
  },
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    proxy: {
      '/api': {
        target: {
          protocol: 'http',
          host: _env.backend_host,
          port: _env.backend_port,
        },
      },
    },
  },
};
