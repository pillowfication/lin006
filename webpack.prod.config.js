const path = require('path')
const webpack = require('webpack')
const incstr = require('incstr')
const getLocalIdent = require('css-loader/lib/getLocalIdent')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const UglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin')

const generateId = incstr.idGenerator({
  alphabet: 'abcefghijklmnopqrstuvwxyzABCEFGHIJKLMNOPQRSTUVWXYZ0123456789'
})
const ids = {}

function getId (name) {
  if (ids[name]) {
    return ids[name]
  }

  const id = 'pf-' + generateId()
  ids[name] = id
  return id
}

module.exports = {
  entry: {
    bundle: path.resolve(__dirname, './src/main.jsx')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      chunks: [ 'bundle' ],
      template: path.resolve(__dirname, './src/index.pug'),
      filename: 'index.html'
    }),
    new ExtractTextWebpackPlugin({
      filename: '[name].css',
      ignoreOrder: true
    }),
    new UglifyJSWebpackPlugin({
      parallel: true
    })
  ],
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [ '@babel/env', '@babel/react' ]
        }
      }]
    }, {
      test: /\.pug$/,
      use: [{
        loader: 'pug-loader'
      }]
    }, {
      test: /\.s?css$/,
      use: ExtractTextWebpackPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 2,
            localIdentName: '[path][name]__[local]--[hash:base64:5]',
            getLocalIdent: (context, localIdentName, localName, options) =>
              getId(getLocalIdent(context, localIdentName, localName, options)),
            camelCase: 'dashesOnly',
            minimize: {
              preset: 'advanced'
            }
          }
        }, {
          loader: 'sass-loader'
        }]
      })
    }, {
      test: /\.(eot|ttf|woff2?)(\?.*)?$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      }]
    }, {
      test: /\.(gif|png|jpe?g|svg)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'images/[name].[ext]'
        }
      }]
    }]
  }
}
