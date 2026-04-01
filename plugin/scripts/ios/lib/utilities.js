const fs = require("fs");
const path = require("path");
const Utilities = {};

Utilities.getPreferenceValueFromConfig = function (config, name) {
  const value = config.match(
    new RegExp('name="' + name + '" value="(.*?)"', "i"),
  );
  if (value && value[1]) {
    return value[1];
  } else {
    return null;
  }
};

Utilities.getPreferenceValueFromPackageJson = function (packageJson, name) {
  const value = packageJson.match(new RegExp('"' + name + '":\\s"(.*?)"', "i"));
  if (value && value[1]) {
    return value[1];
  } else {
    return null;
  }
};

Utilities.getPreferenceValue = function (name) {
  const config = fs.readFileSync("config.xml").toString();
  let preferenceValue = Utilities.getPreferenceValueFromConfig(config, name);
  if (!preferenceValue) {
    const packageJson = fs.readFileSync("package.json").toString();
    preferenceValue = Utilities.getPreferenceValueFromPackageJson(
      packageJson,
      name,
    );
  }
  return preferenceValue;
};

Utilities.getPlistPath = function (context) {
  const common = context.requireCordovaModule("cordova-common");
  const util = context.requireCordovaModule("cordova-lib/src/cordova/util");
  const projectRoot = util.isCordova();
  const platformPath = path.join(projectRoot, "platforms", "ios");

  // cordova-ios 8+: App/App-Info.plist under locations.xcodeCordovaProj (see cordova-ios lib/prepare.js)
  try {
    const IosPlatformApi = context.requireCordovaModule("cordova-ios");
    const api = new IosPlatformApi("ios", platformPath);
    const appInfoPlist = path.join(
      api.locations.xcodeCordovaProj,
      "App-Info.plist",
    );
    if (fs.existsSync(appInfoPlist)) {
      return appInfoPlist;
    }
    const infoPlist = path.join(api.locations.xcodeCordovaProj, "Info.plist");
    if (fs.existsSync(infoPlist)) {
      return infoPlist;
    }
  } catch (_e) {
    // Platform missing or pre–cordova-ios-7 layout — fall through to legacy resolution
  }

  const projectName = new common.ConfigParser(
    util.projectConfig(projectRoot),
  ).name();
  const legacyPlist = path.join(
    platformPath,
    projectName,
    projectName + "-Info.plist",
  );
  if (fs.existsSync(legacyPlist)) {
    return legacyPlist;
  }

  // Default for current cordova-ios so failures reference the path prepare.js uses
  return path.join(platformPath, "App", "App-Info.plist");
};

module.exports = Utilities;
