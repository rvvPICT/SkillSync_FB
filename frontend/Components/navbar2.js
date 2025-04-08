import React from 'react';
import { View, Text, Image, Pressable, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const Navbar2 = (props) => {  

  const { title, userId } = props;

  const navigation = useNavigation();
  const route = useRoute();

  const showConfirmationAlert = () => {
    Alert.alert(
      "Changes won't be saved",
      "Are you sure you want to proceed?",
      [
        {
          text: "No",
          onPress: () => console.log("User chose No"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => navigation.goBack(), // Navigate to a specific screen
        },
      ],
      { cancelable: false } // Prevent closing the alert by tapping outside
    );
  };

  const primaryScreens = ["Search", "QnA", "ViewProfile", "AddProjectScreen", "Notification"];

  const handleBackPress = () => {
    if (route.name === "EditProfile") showConfirmationAlert();
    else if (primaryScreens.includes(route.name)) {
      navigation.navigate("Home", { userId }); // Navigate to Home if in a special screen
    } else {
      navigation.goBack(); // Otherwise, go back
    }
  };

  return (
    <View style={styles.navbar}>
      {/* Back Arrow on the Left */}
      <Pressable onPress={handleBackPress} style={styles.backButton}>
        <Image 
          source={require('../assets/img/notificationPage/backarrow1_icon.png')} 
          style={styles.backIcon} 
          resizeMode='contain'
        />
      </Pressable>

      {/* Dynamic Title */}
      <Text style={styles.title}>{title}</Text>  
    </View>
  );
};

export default Navbar2;

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#7164b4',
    padding: 15,
    height: 120,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centers the text
    paddingTop: 30,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 10,
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 40,
    padding: 10,
    zIndex: 10, 
  },
  backIcon: {
    width: 30, 
    height:30,
    tintColor: "white", 
  },
  title: { 
    fontSize: 25, 
    fontWeight: 'bold', 
    color: 'white', 
    textAlign: 'center', 
  }, 
});


