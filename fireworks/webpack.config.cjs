const path = require("path");

module.exports = {
  mode: "development",
  entry: "./index.ts",
  mode: "production",
  output: {
    path: path.resolve(__dirname),
    filename: "index.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    port: 9000,
  },
};
