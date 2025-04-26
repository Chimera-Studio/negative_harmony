# Negative Harmony - Simplified

### Requirements

#### Node.js & yarn

Node version `>=20` and up needed to run the React scripts. And yarn to run the scripts and handle dependencies.

This project was bootstrapped with [Create React Native App](https://github.com/expo/create-react-native-app).

### Development

Install node dependencies:
```sh
yarn (install)
```

Run dev server for development:
```sh
yarn start
```

To build application for "android" simulator:
```sh
yarn android
```

To build application for "ios" simulator:
```sh
yarn ios
```

To build release:
```sh
yarn release
```

Run tests
```sh
yarn test
```

To create test coverage:
```sh
yarn test:coverage
```

### Environment Variables

Add `env.json` file to root directory

#### A list of all used variables
```JSON
{
    "RELEASE_SECRETS": {
        "RELEASE_KEYSTORE_PASSWORD": "<secret>",
        "RELEASE_KEYSTORE_KEY_PASSWORD": "<secret>",
        "RELEASE_KEYSTORE_KEY_ALIAS": "<secret>"
    }
}
```

### Creating a release

**Android**
Add your `release.keystore` to `./android/app/` directory.
```sh
# AAB build
yarn release --android

# APK build
yarn release --android --apk
```

**iOS**
You have to build it using Xcode `archive` command

### Debug

- file path: `node_modules/react-native-sound/sound.js`
- line: `9`
```diff
- var resolveAssetSource = require("react-native/Libraries/Image/resolveAssetSource");
+ var resolveAssetSource = ReactNative.Image.resolveAssetSource
```
