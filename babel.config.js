module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        // modules: false,
        corejs: 3,
      },
    ],
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-nullish-coalescing-operator",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-transform-runtime",
    "babel-plugin-transform-vue-jsx",
    /*    [
      "babel-plugin-component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk",
      },
    ],*/
  ],
};
