# APP MVP

#### How to contribute

- We use a simple version of git-flow where every new feature or bugfix goes through a pull request to master branch.
- Which means your feature/bugfix branch should have meaningful naming.
- Each PR should start with a word: `feature`, `fix`, `chore`, `doc`.
- Admin to cross check PR and approve to merge.
- You merge it with squash action to have a clear master history.

Please have only one ticket in `In Progress` column of the Trello.

#### How setup environment

Make sure that you could reach the server by `curl` from your region.

```
curl 'http://162.246.23.230/api/v1/manifest' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) ReactNativeDebugger/0.8.2 Chrome/58.0.3029.110 Electron/1.7.15 Safari/537.36' --compressed
```

If yes then all right. If not then the IP may be blocked in your country, or the above IP is outdated (see source files for latest IP):

1. Registrate a new account in [vultr](https://www.vultr.com/).
2. Deploy a new server in
   1. Server Location = `Frankfurt`,
   2. Server Type `Application` = `OpenVpn`.
   3. Server Size = \$5/month
3. Connect to the server with provided credentials.
4. Download .ovpn file.
5. Install `Tunnelblick` for MacOS and drop this config there.
6. Install `OpenVpn for android` app from Google Play and drop this config there.
7. Install `OpenVpn` app for App Store and drop config by Air Drop to your iPhone.
8. That's it.

#### How to run the project

```
yarn install
```

```
react-native run-ios
```

```
react-native run-android
```

You could also run android app, debugger and bundle in one terminal window by running command `yarn android`.

#### How to run on real iOS device.

1. Open the project with `./ios/app.xcodeproj` file.
2. Check `Automatically manage signing` and add your Apple ID.
3. Select connected device.

![Alt text](docs/images/select-device.png?raw=true 'Title')

4. Run `Play`.

The flow will be changed as we'll have different environment builds / push notifications / build automation.

#### How to build production version for Android

- Add local.properties file to ./android and add below line.

```
sdk.dir=/Users/username/Library/Android/SDK
```

- Run npm script

```
npm run android-build-prod
```

#### How to setup VS Code

1. Install plugin [flow-for-vscode](https://github.com/flowtype/flow-for-vscode).
2. Set `javascript.validate.enable` option to false or completely disable the built-in TypeScript extension for your project

#### Running issues

- `yarn android` doesn't works sometime.

![Alt text](docs/images/yarn-issue.png)

To fix this issue and run the app on android device, run the common script for react-native.

```
react-native run-android
```

Open the web browser and type address for debugger. http://your_ip:8081/debugger-ui

- If you had bundle script load issue, please check this solution from git issues.

https://github.com/react-native-community/lottie-react-native/issues/269

https://medium.com/@adityasingh_32512/solved-unable-to-load-script-from-assets-index-android-bundle-bdc5e3a3d5ff
