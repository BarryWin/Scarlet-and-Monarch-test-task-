const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
};

module.exports = {
  // BASE config
  externals: {
    paths: PATHS
  },
  entry: {
    app: `${PATHS.src}/index.js`,
    // module: `${PATHS.src}/your-module.js`,
  },
  output: {
    filename: `js/bundle.js`,
    path: `${PATHS.dist}`,
    publicPath: ``
  },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       vendor: {
  //         name: 'vendors',
  //         test: /node_modules/,
  //         chunks: 'all',
  //         enforce: true
  //       }
  //     }
  //   }
  // },
  module: {
    rules: [{
      test: /\.js$/,
      // loader: 'babel-loader',
      // exclude: '/node_modules/'
    }, {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          }
        }
      ]
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      use:[
          {
            loader: "url-loader",
            options: {
              name: '[name].[ext]'
            }
          },
      ]
    }, {
      test: /\.(sass|scss)$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        },
        {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: `./postcss.config.js` } }
        }
        ,
        {
          loader: 'sass-loader',
          options: { sourceMap: true }
        }
      ]
    },
    //   {
    //   test: /\.css$/,
    //   use: [
    //     'style-loader',
    //     MiniCssExtractPlugin.loader,
    //     {
    //       loader: 'css-loader',
    //       options: { sourceMap: true }
    //     }, {
    //       loader: 'postcss-loader',
    //       options: { sourceMap: true, config: { path: `./postcss.config.js` } }
    //     }
    //   ]
    // }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `css/main.min.css`,
    }),
    // Copy HtmlWebpackPlugin and change index.html for another html page
    new HtmlWebpackPlugin({
      hash: false,
      template: `${PATHS.src}/index.html`,
      filename: './index.html',
      inject: true
    }),
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/img`, to: `${PATHS.dist}/img` },
      { from: `${PATHS.src}/fonts`, to: `${PATHS.dist}/fonts` }
    ])
  ],
};
