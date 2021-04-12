const path = require("path")

module.exports = {
	entry : ["@babel/polyfill", "./src/main.js"],
	mode: "production",
	module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
			}
    ]
	},
  resolve: { extensions: ["*", ".js"] },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  }
}