const path = require("path")
const { version } = require('./package.json');
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
    filename: `simple-stl-viewer.${version}.min.js`,
  }
}