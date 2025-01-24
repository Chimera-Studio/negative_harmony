module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      "module-resolver",
      {
        // mirror tsconfig.json
        alias: {
          "@assets": "./app/assets",
          "@components": "./app/components",
          "@context": "./app/context",
          "@locales": "./app/locales",
          "@store": "./app/store",
          "@styles": "./app/styles",
          "@tokens": "./app/tokens",
          "@types": "./app/types",
          "@utils": "./app/utils",
        },
      },
    ],
  ],
};
