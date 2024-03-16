const HtmlWebpackPlugin = require('html-webpack-plugin')
const LOADERS = [
  {
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    use: 'babel-loader'
  },
  {
    test: /\.(css|scss)$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
  },
]


const PLUGINS = [
  new HtmlWebpackPlugin({
    template: './src/index.html'
  })
]

module.exports = {
  entry: './src/index.tsx',
  output: {
    publicPath: '/'
  },
  module: {
    rules: LOADERS
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: PLUGINS,
  devServer: {
    port: 3002,
    historyApiFallback: true,
  },
}