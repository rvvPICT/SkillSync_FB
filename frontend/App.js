

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * To run: npx react-native run-android
 * 
 * On adding a new asset: npx react-native-asset  
 * 
 * Color palette : {
 *    #efe2fa,
 *    #bca5d4,
 *    #bacbfe,
 *    #8f9fe4,
 *    #7164b4
 * }
 * 
 * @format
 */




import React, { useState } from 'react';
import { 
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import Homepage from './Components/homepage/homepage';
import Signin from './src/screens/signinpage.js';


function App() {
  return (
    <View style={{flex:1}}>
      <Homepage></Homepage>
      {/* <Signin/> */}
    </View>
  );
};

export default App;
