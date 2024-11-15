# Cordova Plugin Facebook Connect Lab

A demo application for the [cordova-plugin-fbsdk](https://github.com/MaximBelov/cordova-plugin-fbsdk).

Useful if you want to try out the plugin or want to reproduce a bug or build errors.

## Note about native versions 
### iOS

- https://github.com/CocoaPods/Specs/tree/master/Specs/5/4/9/FBSDKCoreKit_Basics
- https://cdn.cocoapods.org/all_pods_versions_5_4_9.txt

### Android: 
- https://mvnrepository.com/artifact/com.facebook.android/facebook-android-sdk

## Note about IDs

This application is configured with a Facebook App ID linked to my personal Facebook account. Please be cool, don't use these information elsewhere than for testing purpose.

## Instructions

To get and install locally this project, run the following commands to clone it and install the dependencies.

```
git clone https://github.com/MaximBelov/cordova-plugin-fbsdk-lab
cd cordova-plugin-fbsdk-lab
npm install

set your CLIENT_TOKEN

```

### iOS

To compile the iOS platform, run:

```
ionic cordova build ios
```

Once the application's bundle ready, open `./platforms/ios/MyApp.xcworkspace` in Xcode and run the application in the simulator.

### Android

To compile the Android platform, run:

```
ionic cordova build android
```

Once the application's bundle ready, open `./platforms/android` in Android Studio and run the application in the simulator.

## Documentation

More documentation and information? Check out the [cordova-plugin-fbsdk](https://github.com/MaximBelov/cordova-plugin-facebook-connect) plugin repo.

## License

MIT © [David Dal Busco](mailto:david.dalbusco@outlook.com)
