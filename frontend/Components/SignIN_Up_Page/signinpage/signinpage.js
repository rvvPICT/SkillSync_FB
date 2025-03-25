import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
// import Icon from 'react-native-vector-icons/FontAwesome';
 // Or another icon set if preferred
// Or another icon set if preferred

const Signin = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleSignIn = () => {
    console.log("Sign In clicked!");
  };

  return (
    <View>
      <View style={styles.cont1}>
      <Image 
      source={require('../../../assets/img/Sign_in/s_logo1_lbg.png')} // Correct usage
      style={styles.image} // Set appropriate width and height
    />
      </View>
      <View>
      <Text style={styles.tagline}>Where skills meet collaboration</Text>
      </View>

      <View>
        <Text style={{ fontSize: 20, textAlign: "left", marginLeft: 30, marginTop: 40 }}>
          Create your account!
        </Text>

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
                    ? require('../../../assets/img/Sign_in/open_eyelid_4.png')// Visible icon
                    : require('../../../assets/img/Sign_in/close_eyelid.png') // Hidden icon
                }
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.line}>____________________________________________</Text>
        <Text style={styles.line2}>Or Sign In with :</Text>
      </View>

      <View style = {styles.gl_logo}>
              
         <TouchableOpacity>
          <Image style={styles.gg_logo}
            source = {require('../../../assets/img/Sign_in/google_logo.png')}
          />
          
         </TouchableOpacity>
         <TouchableOpacity>
          <Image style={styles.ll_logo}
            source = {require('../../../assets/img/Sign_in/linkedIn_logo.png')}
          />
          
         </TouchableOpacity>
       </View>

      <View>
        <Text style={styles.last}>Already have an account ? Sign Up</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cont1 : {
    justifyContent: 'flex-start', // Align to top
    alignItems: 'center', // Center horizontally
    marginTop: 10, // Adjust top margin to remove excess space
    padding: 10,
  } ,
  image : {
    height : 120 , 
    width : 200 ,
  } ,
  tagline: {
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight : '400'
  
  },
  TextBoxes: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#F1F1F6",
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 10,
  },
  box: {
    margin: 15,
    paddingLeft : 10,
    paddingRight : 10
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F1F6",
    borderRadius: 10,
    height: 50,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    height: "100%",
  },
  icon: {
    width: 30,  // Adjust width as needed
    height: 20, // Adjust height as needed
    marginLeft: 10,
    resizeMode: 'contain', // Ensures the image scales properly
  },
  
  button: {
    marginTop: 30,
    backgroundColor: "#7164B4",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  line: {
    textAlignVertical: "center",
    textAlign: "center",
  },
  line2: {
    textAlignVertical: "center",
    textAlign: "center",
    marginTop: 20,
    fontSize: 15,
    fontWeight: "500",
  },
  gg_logo : 
  {
    height : 50 ,
    width : 50 ,
    margin : 20
  },
  ll_logo : 
  {
    height : 50 ,
    width : 65 ,
    margin : 20

  },
  gl_logo: {
    flexDirection: "row",         // Arrange the logos in a row
    justifyContent: "center", // Distribute the logos evenly with space between them
   
                    // Add top margin to create some space from the previous section
    paddingVertical: 10,          // Add vertical padding to the container
    width: '100%',                // Use full width to allow the icons to be spaced out properly
    alignItems: 'center',         // Vertically center the icons
    alignContent: 'center',  
    marginTop : 15     // Ensure the content is aligned in the center (for flexbox)
  }
  , last : {
    marginLeft : 15 ,
    marginTop : 60 ,
    textAlign : 'center' ,
    textAlignVertical : 'center'

  }
  
  
});

export default Signin;


// import React, { useState } from "react";
// import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
// import Icon from 'react-native-vector-icons/FontAwesome';
//  // Or another icon set if preferred
// // Or another icon set if preferred

// const Signin = () => {
//   const [username, setUserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);

//   const togglePasswordVisibility = () => {
//     setIsPasswordVisible((prev) => !prev);
//   };

//   const handleSignIn = () => {
//     console.log("Sign In clicked!");
//   };

//   return (
//     <View>
//       <View>
//         <Text style={styles.logo}>SkillSync</Text>
//         <Text style={styles.tagline}>Where skills meet collaboration</Text>
//       </View>

//       <View>
//         <Text style={{ fontSize: 20, textAlign: "left", marginLeft: 15, marginTop: 40 }}>
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
//                     ? require('../../../assets/img/open_eyelid.png')// Visible icon
//                     : require('../../../assets/img/open_eyelid.png') // Hidden icon
//                 }
//                 style={styles.icon}
//               />
//             </TouchableOpacity>
//           </View>

//           <TouchableOpacity style={styles.button} onPress={handleSignIn}>
//             <Text style={styles.buttonText}>Sign In</Text>
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.line}>____________________________________________</Text>
//         <Text style={styles.line2}>Or Sign In with :</Text>
//       </View>

//       <View>
              
//          <Icon name="google" size={30} color="red" /> {/* Google icon */}

//          <Icon name="linkedin" size={24} color="blue" /> {/* LinkedIn icon */}

//        </View>

//       <View>
//         <Text>Already have an account ?Sign Up</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   logo: {
//     textAlign: "center",
//     textAlignVertical: "center",
//     paddingTop: 10,
//     fontSize: 50,
//     fontFamily: "cursive",
//     fontWeight: "900",
//     color: "#7164B4",
//   },
//   tagline: {
//     textAlign: "center",
//     textAlignVertical: "center",
//     fontWeight: "800",
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
//     width: 24,
//     height: 40,
//     marginLeft: 10,
//   },
//   button: {
//     marginTop: 30,
//     backgroundColor: "#7164B4",
//     borderRadius: 8,
//     paddingVertical: 10,
//     alignItems: "center",
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
// });

// export default Signin;
