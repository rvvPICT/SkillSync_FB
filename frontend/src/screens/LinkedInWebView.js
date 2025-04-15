import React from "react";
import { WebView } from "react-native-webview";

const LinkedInWebView = ({ route, navigation }) => {
  return (
    <WebView
      source={{ uri: route.params.url }}
      onNavigationStateChange={(event) => {
        if (event.url.includes("token=")) {
          const token = event.url.split("token=")[1];
          console.log("Received Token:", token);
          navigation.replace("Home");
        }
      }}
    />
  );
};

export default LinkedInWebView;
