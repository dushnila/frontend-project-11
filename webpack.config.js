import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { fileURLToPath } from 'url';

const isProduction = process.env.NODE_ENV === 'production';
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const outputPath = path.resolve(dirname, 'dist');

const config = {
  entry: './src/index.js',
  output: {
    clean: true,
  },
  devServer: {
    open: true,
    host: 'localhost',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),

    // Добавьте свои плагины здесь
    // Узнайте больше о плагинах по адресу https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset/resource',
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      },
      // Добавьте свои правила для пользовательских модулей здесь
      // Узнайте больше о загрузчиках по адресу https://webpack.js.org/loaders/
    ],
  },
  mode: isProduction ? 'production' : 'development',
};

export default config;
