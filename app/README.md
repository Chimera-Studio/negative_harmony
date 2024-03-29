# Negative Harmony - Simplified

### Requirements

#### Node.js & yarn

Node version `>=20` and up needed to run the React scripts. And yarn to run the scripts and handle dependencies.

This project was bootstrapped with [Create React Native App](https://github.com/expo/create-react-native-app).

### Development

Install node dependencies:

    yarn (install)

Run dev server for development:

    yarn start

To build application for "android" simulator:

    yarn android

To build application for "ios" simulator:

    yarn ios

To build release:

    yarn release

Run test handled by [testing-library](https://testing-library.com/):

    yarn test

To create test coverage:

    yarn test-coverage

To deploy the app with codepush (*codepush-cli needed):

    yarn deploy

### Environment Variables

Add `env.json` file to root directory

#### A list of all used variables
```JSON
{
    "RELEASE_SECRETS": {
        "RELEASE_KEYSTORE_PASSWORD": "<secret>",
        "RELEASE_KEYSTORE_KEY_PASSWORD": "<secret>",
        "RELEASE_KEYSTORE_KEY_ALIAS": "<secret>"
    },
    "CONFIG": {
        "KEEP_REWARDS": 6, // hours
        "RESET_REWARDS": 24, // hours
        "ADS": true,
        "AD_IDS": {
            "BANNER": {
                "IOS": "<secret>",
                "ANDROID": "<secret>"
            },
            "REWARDED": {
                "IOS": "<secret>",
                "ANDROID": "<secret>"
            }
        }
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

### Deploying to CodePush (OTA updates)
!!! `codepush-cli` needed !!!

To deploy the app with CodePush

Arguments:
1. `--all` / `--android` / `--ios` (required)
2. `--production` / `--promote` (optional)

```sh
yarn deploy ARG_1 ARG_2
```
