module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      "module-resolver",
      {
        // mirror tsconfig.json
        root: ['./app'],
        alias: {
          "@assets": "./assets",
          "@components": "./components",
          "@context": "./context",
          "@locales": "./locales",
          "@store": "./store",
          "@styles": "./styles",
          "@tokens": "./tokens",
          "@types": "./types",
          "@utils": "./utils",
        },
      },
    ],
  ],
};
