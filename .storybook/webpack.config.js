'use strict';
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /.(js|jsx|ts|tsx)$/,
        use: [
          {loader: 'babel-loader'}
        ],
        exclude: /node_modules/
      },
      {
        test: /.(woff|woff2|eot|ttf|svg|jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'assets/[name].[ext]'
            }
          }
        ]
      },
      
      {
        test: /.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },

      {
        test: /.sass$/,
        use: ['style-loader', 'css-loader', {
          loader: 'sass-loader',
          options: {
            implementation: require('sass'),
            sassOptions: {
              indentedSyntax: true
            },
          }
        }]
      }

    ],
  },
  plugins: [],
  mode: 'development',
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, '../src/assets'),
      '@locale': path.resolve(__dirname, '../src/locale'),
      '@utils': path.resolve(__dirname, '../src/utils')
    },
    extensions: [".ts", ".tsx", ".js", ".jsx", ".md", ".scss", ".css", ".sass"]
  }
};
