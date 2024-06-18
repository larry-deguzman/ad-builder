const fs = require("fs");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

const package = fs.readFileSync("package.json");
const packageData = JSON.parse(package);

// This is the main configuration file for your project.
module.exports = (env, options) => {
  const config = {
    entry: {
      bb: "./src/_output/exports.js",
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      // if development mode does not have the verion attached to the file name
      filename: `[name].${packageData.version}.js`,
    },
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/i,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },

        // Add your rules for custom modules here
        // Learn more about loaders from https://webpack.js.org/loaders/
      ],
    },
    optimization: {
      minimize: options.mode === "production",
      minimizer: [new TerserPlugin()],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, "./public"),
      },
      compress: true,
      port: 9000,
    },
    // watch: options.mode === "development",
    // watchOptions: {
    //   ignored: /node_modules/,
    //   poll: 1000,
    // },
  };
  //   console.log("env", env);
  //   console.log("options", options);
  if (options.mode === "development") {
    config.devtool = "source-map"; // || false
    config.output.filename = `[name].js`;
  }
  config.mode = options.mode;
  return config;
};
