

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * To run: npx expo start
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
import { NavigationContainer } from '@react-navigation/native';
import {  createNativeStackNavigator } from '@react-navigation/native-stack'

import { 
  View,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

// import Homepage from '../Components/homepage/homepage.js';
import Homepage from './screens/homepage.js';
import ViewProject from './screens/viewProject.js';
import Signin from './screens/signinpage.js';
import Signup from './screens/signupPage.js';
import SearchPage from './screens/searchPage.js';
import QnaPage from './screens/qnaPage.js';
import AskQuestionPage from './screens/AskQuestionPage.js';
import EditProfile from './screens/editProfile.js';
import ViewProfile from './screens/viewProfile.js';
import NotificationPage from './screens/notificationPage.js';
import AnswerPage from "./screens/AnswerPage.js";
import ViewAnswersPage from "./screens/ViewAnswersPage.js";
import SearchResultsScreen from "./screens/SearchResultsScreen.js";
import SearchFilters from "./screens/SearchFilters.js";
import AddProjectScreen from "./screens/AddProjectScreen.js";
const Stack = createNativeStackNavigator();


function App() {



  return (
    // <SafeAreaView style={{flex:1}}>
    //   {/* <Homepage/> */}
    //   <Signin/>
    // </SafeAreaView>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SignIn'>
        <Stack.Screen
          name='Home'
          component={Homepage}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name='ViewProject'
          component={ViewProject}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name='SignIn'
          component={Signin}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name='SignUp'
          component={Signup}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name='Search'
          component={SearchPage}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name='QnA'
          component={QnaPage}
          options={{headerShown:false}}
        />
         <Stack.Screen
          name='AskQuestionPage'
          component={AskQuestionPage}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name='EditProfile'
          component={EditProfile}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name='ViewProfile'
          component={ViewProfile}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="Notification"
          component={NotificationPage}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="AnswerPage"
          component={AnswerPage}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ViewAnswersPage" 
          component={ViewAnswersPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="SearchResults"
          component={SearchResultsScreen} 
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="SearchFilters"
          component={SearchFilters} 
          options={{headerShown: false}}
        />

        <Stack.Screen 
          name="AddProjectScreen"
          component={AddProjectScreen} 
          options={{headerShown: false}}
        />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
