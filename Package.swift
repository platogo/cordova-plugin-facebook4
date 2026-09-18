// swift-tools-version:5.9

import PackageDescription

let FBSDKVersion: Version = "16.3.1"

let package = Package(
    name: "cordova-plugin-fbsdk",
    platforms: [.iOS(.v15)],
    products: [
        .library(
            name: "cordova-plugin-fbsdk",
            targets: ["cordova-plugin-fbsdk"]
        )
    ],
    dependencies: [
        .package(url: "https://github.com/apache/cordova-ios.git", branch: "master"),
        .package(url: "https://github.com/facebook/facebook-ios-sdk.git", exact: FBSDKVersion)
    ],
    targets: [
        .target(
            name: "cordova-plugin-fbsdk",
            dependencies: [
                .product(name: "Cordova", package: "cordova-ios"),
                .product(name: "FacebookCore", package: "facebook-ios-sdk"),
                .product(name: "FacebookLogin", package: "facebook-ios-sdk"),
                .product(name: "FacebookShare", package: "facebook-ios-sdk"),
                .product(name: "FacebookGamingServices", package: "facebook-ios-sdk")
            ],
            path: "src/ios",
            publicHeadersPath: "."
        )
    ]
)