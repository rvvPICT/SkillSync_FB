# SkillSyncExpo
Where skills meet collaboration

commands to initialize the project:
    npm install
    npm uninstall -g expo-cli  -> if CLI is installed
    npx expo install react-native

If getting any errors after installing dependencies:
    npm start --clean-cache


If getting message on android emulator: Something went wrong
    
cd /Users/riddhilahare/Downloads/PICT/SE_PBL/SkillSyncExpo
expo start -c

adb devices

npx expo start --android

// This worked for me

adb uninstall host.exp.exponent
adb install ~/.expo/android-apk-cache/ExpoGo.apk

adb shell am start -a android.intent.action.VIEW -d "https://expo.dev/client"

expo start -c


dependencies I installed:

npm install react-native-snap-carousel
npm install react-native-modal-datetime-picker
