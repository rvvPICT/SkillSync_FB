// import React, { useState } from "react";
// import { Alert } from "react-native";
// import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, SafeAreaView } from "react-native";

// import { signup_post } from "../services/users_api";
// import { useNavigation } from "@react-navigation/native";


// const Signup = ({ route }) => {
//   const navigation = useNavigation();
//   const [username, setUserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);

//   const togglePasswordVisibility = () => {
//     setIsPasswordVisible((prev) => !prev);
//   };

//   const handleSignUp = async () => {
//     if (!username || !email || !password) {
//         Alert.alert("Please fill all the details.");
//         return;
//     }

//     try {
//         const userData = { username, email, password };
//         const response = await signup_post(userData);

//         if (response.error) {
//             Alert.alert("Signup Failed", response.error);
//             console.log("Signup Failed", response.error);
//         } else {
//             Alert.alert("Signup Successful");
//             navigation.navigate("Home", { userId: response.user._id });
//           }
//     } catch (error) {
//         Alert.alert("Error", "Something went wrong. Please try again.");
//     }
// };


//   const goToSignIn = () => {
//     navigation.navigate("SignIn");
//   }

//   return (
//     <SafeAreaView>
// 			{/* <Wave width={40} height={40}/> */}
//       <View style={styles.cont1}>
//         <Image 
//           source={require('../../assets/img/s_logo1_lbg.png')} // Correct usage
//           style={styles.image} // Set appropriate width and height
//         />
//       </View>
//       <View>
//         <Text style={styles.tagline}>Where skills meet collaboration</Text>
//       </View>

//       <View>
//         <Text style={{ fontSize: 20, textAlign: "left", marginLeft: 30, marginTop: 40 }}>
//           Create your account!
//         </Text>

//         <View style={styles.box}>
//           <TextInput
//             style={styles.TextBoxes}
//             placeholder="Username"
//             onChangeText={(text) => setUserName(text)}
//             value={username}
//           />

//           <TextInput
//             style={styles.TextBoxes}
//             placeholder="Email"
//             onChangeText={(text) => setEmail(text)}
//             value={email}
//           />

//           <View style={styles.passwordContainer}>
//             <TextInput
//               style={styles.passwordInput}
//               placeholder="Password"
//               secureTextEntry={!isPasswordVisible}
//               onChangeText={(text) => setPassword(text)}
//               value={password}
//             />
//             <TouchableOpacity onPress={togglePasswordVisibility}>
//               <Image
//                 source={ 
//                   isPasswordVisible
//                     ? require('../../assets/img/Sign_in_up/open_eyelid_4.png')// Visible icon
//                     : require('../../assets/img/Sign_in_up/close_eyelid.png') // Hidden icon
//                 }
//                 style={styles.icon}
//               />
//             </TouchableOpacity>
//           </View>

//           <TouchableOpacity 
//             style={styles.button} 
//             onPress={handleSignUp}
//           >
//             <Text style={styles.buttonText}>Sign Up</Text>
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.line}>____________________________________________</Text>
//         {/* <Text style={styles.line2}>Or Sign Up with :</Text> */}
//       </View>

//       {/* <View style = {styles.gl_logo}>
              
//         <TouchableOpacity>
//           <Image style={styles.gg_logo}
//             source = {require('../../assets/img/Sign_in_up/google_logo.png')}
//           />
//         </TouchableOpacity>

//         <TouchableOpacity>
//           <Image style={styles.ll_logo}
//             source = {require('../../assets/img/Sign_in_up/linkedIn_logo.png')}
//           />
//         </TouchableOpacity>
//       </View> */}

//       {/* <View>
//         <Text style={styles.last}>Already have an account ? Sign In</Text>
//       </View> */}

//       <View style={styles.last}>
//               <Text>Already have an account ?</Text>
//               <TouchableOpacity onPress={goToSignIn}><Text> Sign In</Text></TouchableOpacity>
//             </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   cont1 : {
//     justifyContent: 'flex-start', // Align to top
//     alignItems: 'center', // Center horizontally
//     marginTop: 10, // Adjust top margin to remove excess space
//     // padding: 10,
//   } ,
//   image : {
//     height : 120 , 
//     width : 200 ,
//   } ,
//   tagline: {
//     textAlign: "center",
//     textAlignVertical: "center",
//     fontWeight : '400'
  
//   },
//   TextBoxes: {
//     marginTop: 10,
//     marginBottom: 10,
//     backgroundColor: "#F1F1F6",
//     borderRadius: 10,
//     height: 50,
//     paddingHorizontal: 10,
//   },
//   box: {
//     margin: 15,
//     paddingLeft : 10,
//     paddingRight : 10
//   },
//   passwordContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F1F1F6",
//     borderRadius: 10,
//     height: 50,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
//   passwordInput: {
//     flex: 1,
//     height: "100%",
//   },
//   icon: {
//     width: 30,  // Adjust width as needed
//     height: 20, // Adjust height as needed
//     marginLeft: 10,
//     resizeMode: 'contain', // Ensures the image scales properly
//   },
  
//   button: {
//     marginTop: 15,
//     backgroundColor: "#7164B4",
//     borderRadius: 8,
//     paddingVertical: 15,
//     alignItems: "center",
//     justifyContent: "center",
//     width: "90%", // Adjust width
//     alignSelf: "center", // Centers the button
//   },
  
//   buttonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   line: {
//     textAlignVertical: "center",
//     textAlign: "center",
//   },
//   line2: {
//     textAlignVertical: "center",
//     textAlign: "center",
//     marginTop: 20,
//     fontSize: 15,
//     fontWeight: "500",
//   },
//   gg_logo : 
//   {
//     height : 50 ,
//     width : 50 ,
//     margin : 20
//   },
//   ll_logo : 
//   {
//     height : 50 ,
//     width : 65 ,
//     margin : 20

//   },
//   gl_logo: {
//     flexDirection: "row",         
//     justifyContent: "center", 
//     paddingVertical: 10,
//     width: '100%',
//     alignItems: 'center',
//     alignContent: 'center',  
//     marginTop : 15
//   },
//   last : {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop : 10 ,
//     textAlignVertical : 'center'
//   }
// });

// export default Signup;


import React, { useState } from "react";
import { Alert, Platform } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { signup_post } from "../services/users_api";
import { useNavigation } from "@react-navigation/native";

const Signup = () => {
  const navigation = useNavigation();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleSignUp = async () => {
    if (!username || !email || !password) {
      Alert.alert("Please fill all the details.");
      return;
    }

    try {
      const userData = { username, email, password };
      const response = await signup_post(userData);

      if (response.error) {
        Alert.alert("Signup Failed", response.error);
        console.log("Signup Failed", response.error);
      } else {
        Alert.alert("Signup Successful");
        navigation.navigate("Home", { userId: response.user._id });
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  const goToSignIn = () => {
    navigation.navigate("SignIn");
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.upperPart}>
        <View>
          <Image
            source={require('../../assets/img/s_logo1_lbg.png')}
            style={styles.image}
          />
          <Text style={styles.tagline}>Where Skills meets colloboration!</Text>
        </View>

        <View>
          <Text style={{ fontSize: 18, marginTop: 50 }}>
            Create your account!
          </Text>
        </View>
      </View>

     

      <View style={styles.box}>
        <TextInput
          style={styles.TextBoxes}
          placeholder="Username"
          onChangeText={(text) => setUserName(text)}
          value={username}
        />

        <TextInput
          style={styles.TextBoxes}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            secureTextEntry={!isPasswordVisible}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Image
              source={
                isPasswordVisible
                  ? require("../../assets/img/Sign_in_up/open_eyelid_4.png")
                  : require("../../assets/img/Sign_in_up/close_eyelid.png")
              }
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.last}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={goToSignIn}>
          <Text> Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  upperPart: {
    justifyContent: "center",
    alignItems: "center"
  },
  bg_image: {
    position: "absolute",
    width: "100%",
    height: 600,
    resizeMode: "cover",
  },
  image: {
    height: 120,
    width: 200,
    marginTop: Platform.OS === "ios" ? 5 : 30,
    alignSelf: "center",
  },
  tagline: {
    margin: 10,
    textAlign: "center",
    color: "#9586e3",
    fontWeight: "bold",
    marginTop: Platform.OS === "ios" ? 0 : 10,
  },
  box: {
    margin: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  TextBoxes: {
    marginTop: 20,
    backgroundColor: "#F1F1F6",
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F1F6",
    borderRadius: 10,
    height: 50,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    height: "100%",
  },
  icon: {
    width: 30,
    height: 20,
    marginLeft: 10,
    resizeMode: "contain",
  },
  loginButton: {
    marginTop: 15,
    backgroundColor: "#7164B4",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  last: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    textAlignVertical: "center",
  },
});

export default Signup;
