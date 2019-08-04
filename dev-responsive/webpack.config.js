module.exports = {
  mode: 'development',
  entry: [
    'babel-polyfill',
    './src/app.js',
  ],
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/dist`,
  },
  devServer: {
    contentBase: 'dist',
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
            ],
          },
        },
      },
    ],
  },
};
