# React Native using Expo and Typescript with Tailwind CSS

This is a [React Native](https://facebook.github.io/react-native/) Web3 app using the [Expo framework](https://expo.io) and written in [TypeScript](http://www.typescriptlang.org). It uses the [managed workflow](https://docs.expo.io/introduction/managed-vs-bare/) and uses [Tailwind](https://github.com/jaredh159/tailwind-react-native-classnames) for some styling and utilizes sanity.io for backend.

## Warning

THIS APP NEEDS react-native-svg@9.6.4 due to @walletconnect/react-native-dapp and expo-svg-uri needing to cooperate, please check in Node_Modules folder for versioning if:
 `Invariant Violation: Tried to register two views with the same name RNSVGSvgView`

## Goals

- Create a React Native Template using Typescript
- Combine Web3 (Wallet Connect) with standardized backend (Sanity.io)
- Use Alchemy API for Reading API data from Wallet Address
- Storing Wallet and NFT Data in the useContext Provider for easy access and manageability

## Prerequisites

- [Node.js](https://nodejs.org/).
- [Yarn](https://yarnpkg.com/).
- Optional: [XCode](https://developer.apple.com/xcode/), since it includes the iOS Simulator. XCode only runs on Macs.
- Optional: [Android Studio](https://developer.android.com/studio), since it includes the Android Virtual Device Manager.

You don't need to install any global npm packages for this repo. `expo-cli` is included as a dev dependency.

## Warnings When Installing Packages

There are a surprising amount of of warnings when installing Node packages, because of peer dependencies not being correct. My guess is that the Expo team has a tough time getting all the added React Native libraries to play well together. This app seems to run fine, so I believe it's safe to ignore the warnings.

## Running the App

Start the local server. This will give you a QR code that you can scan using the Expo Client app on your mobile device.

```shell
yarn start
```

If you're on a Mac and have Xcode installed, you can run the app using the iOS Simulator with the following command. I am sure you can do something similar with Android.

```shell
yarn ios
```

## Automated Tests

This project hasn't been set up with automated tests. The blog post [setting up tests for React-Native-Expo-Typescript] can probably help.

## Similar Projects

- [expo-ts-example](https://github.com/dalcib/expo-ts-example), the basis for this project
- [TypeScript-React-Native-Starter](https://github.com/Microsoft/TypeScript-React-Native-Starter)
- [react-native-typescript-starter](https://github.com/cbrevik/react-native-typescript-starter)
