const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const path = require('path');
const isProd = process.env.NODE_ENV === 'production';
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: {
    app: [
      'babel-polyfill',
      path.resolve(__dirname, 'src/index.js'),
    ],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'template.html',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ].concat(isProd ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ] : []),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        include: [
          path.resolve(__dirname, 'src'),
        ],
      }, {
        test: /\.json$/,
        use: 'json-loader',
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }, {
        test: /\.(woff2?|eot|ttf)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            prefix: 'font/',
            limit: 10000,
          },
        }],
      }, {
        test: /\.less$/,
        use: [{
          loader: 'style-loader',
          options: {
            plugins() {
              return [autoprefixer];
            },
          },
        }, {
          loader: 'css-loader',
        }, {
          loader: 'less-loader',
        }],
      }, {
        test: /\.(gif|png|svg)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            hash: 'sha512',
            digest: 'hex',
            name: '[hash].[ext]',
          },
        }, {
          loader: 'image-webpack-loader',
          options: {
            progressive: true,
            optipng: {
              optimizationLevel: 7,
            },
            gifsicle: {
              interlaced: false,
            },
          },
        }],
      }, {
        test: /\.jpg$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 25000,
          },
        }],
      }, {
        test: /\.xml$/,
        use: 'file-loader?hash=sha512&digest=hex&name=[name]-[hash].[ext]',
      }, {
        test: /\.mp3$/,
        use: 'file-loader?hash=sha512&digest=hex&name=[name]-[hash].[ext]',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules'],
    alias: {
      src: path.join(__dirname, 'src'),
    },
  },
  externals: {
    phaser: 'Phaser',
  },
};
