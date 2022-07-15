const path = require("path");

// Alias for WebStorm IDE
function resolve(dir) {
  return path.join(`${__dirname}/src`, dir);
}

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          indentedSyntax: true,
        },
        additionalData: `@import '@/assets/style/variables.sass';@import '@/assets/style/main.sass';;`,
      },
    },
  },

  chainWebpack: (config) => {
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();

    config.module
      .rule("svg")
      .oneOf("inline-svg")
      .resourceQuery(/inline/)
      .use("babel")
      .loader("babel-loader")
      .end()
      .use("vue-svg-loader")
      .loader("vue-svg-loader")
      .end()
      .end()
      .oneOf("file")
      .use("file-loader")
      .loader("file-loader")
      .end()
      .end();
  },

  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("/"),
      },
    },
  },
};
