require('dotenv').config()
const path = require('path')
const webpack = require('webpack')

module.exports = {
  webpack(config) {
    config.resolve.extensions = ['.tsx', '.ts', '.js', '.json']
    config.module.rules[0].oneOf.push({
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
    })
    config.resolve.alias['@coveo'] = path.resolve(__dirname, './node_modules/@coveo')
    config.resolve.alias.react = path.resolve(__dirname, './node_modules/react')
    config.resolve.alias.dotenv = path.resolve(__dirname, './node_modules/dotenv')
    config.resolve.alias['react-dom'] = path.resolve(__dirname, './node_modules/react-dom')
    config.plugins.push(new webpack.DefinePlugin({
      'process.env.APIKEY': JSON.stringify(process.env.APIKEY),
      'process.env.ORGID': JSON.stringify(process.env.ORGID)
    }))
  },
}
