const fs = require("fs");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

const packageObject = JSON.parse(fs.readFileSync("package.json"));
const version = packageObject.version;

module.exports = (env, options) => {
  console.log("env", env);
  console.log("options", options);
  const middleArea = options.mode === "development" ? "" : `.${version}`;
  const config = {
    entry: "./_temp/_output/exports.js", // Adjust this entry point as needed
    output: {
      filename: `BB${middleArea}.js`,
      path: path.resolve(__dirname, "dist"),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },
    optimization: {
      minimize: options.mode === "development" ? false : true, // Enable minimization
      minimizer: [new TerserPlugin()], // Use TerserPlugin for minimization
    },
    devtool: options.mode === "development" ? false : "source-map",
  };
  return [config];
};
