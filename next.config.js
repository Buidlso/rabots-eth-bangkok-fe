module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.js$/,
      include: /node_modules\/undici/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
          plugins: [
            ["@babel/plugin-proposal-class-properties", { loose: true }],
            ["@babel/plugin-proposal-private-methods", { loose: true }],
          ],
        },
      },
    });
    return config;
  },
};
