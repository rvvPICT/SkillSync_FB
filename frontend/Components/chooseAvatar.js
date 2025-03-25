// import React, { useEffect, useState } from "react";
// import { View, Text, Image, TouchableOpacity, SafeAreaView, ActivityIndicator } from "react-native";
// import Carousel from "react-native-snap-carousel";
// import { useNavigation } from '@react-navigation/native';
// import Navbar2 from './navbar2';
// import Footer from './footer';
// import { fetchUserById, updateUserAvatar } from "../src/services/users_api";

// const ChooseAvatar = ({ route }) => {
//   const navigation = useNavigation();
//   const userId = route?.params?.userId || "YOUR_DEFAULT_USER_ID"; // Replace with actual user ID
//   console.log("Received userId:", userId);
  
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedAvatar, setSelectedAvatar] = useState(null);

//   const avatarImages = [
//     require("../assets/img/avatars/avatar1.png"),
//     require("../assets/img/avatars/avatar2.png"),
//     require("../assets/img/avatars/avatar3.png"),
//     require("../assets/img/avatars/avatar4.png"),
//   ];

//   useEffect(() => {
//     const loadUser = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const user = await fetchUserById(userId);
//         if (user) {
//           setUserData(user);
//           setSelectedAvatar(user.avatar); // Set current avatar
//         } else {
//           setError("User not found");
//         }
//       } catch (error) {
//         console.error("Error fetching user:", error);
//         setError("Failed to load user data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadUser();
//   }, [userId]);

//   const handleAvatarChange = (index) => {
//     setSelectedAvatar(index);
//   };

//   const saveAvatarSelection = async () => {
//     try {
//       await updateUserAvatar(userId, selectedAvatar);
//       alert("Avatar updated successfully!");
//       navigation.goBack(); // Navigate back after saving
//     } catch (error) {
//       console.error("Error updating avatar:", error);
//       alert("Failed to update avatar. Try again.");
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#7164B4" />
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <Navbar2 title="Choose Avatar" />
      
//       <View style={styles.container}>
//         <Text style={styles.headerText}>Select Your Avatar</Text>

//         <Carousel
//           data={avatarImages}
//           renderItem={({ item, index }) => (
//             <TouchableOpacity onPress={() => handleAvatarChange(index)} style={styles.avatarWrapper}>
//               <Image source={item} style={[styles.avatar, selectedAvatar === index && styles.selectedAvatar]} />
//             </TouchableOpacity>
//           )}
//           sliderWidth={300}
//           itemWidth={100}
//           layout="default"
//           firstItem={selectedAvatar}
//           inactiveSlideOpacity={0.5}
//         />

//         <TouchableOpacity style={styles.saveButton} onPress={saveAvatarSelection}>
//           <Text style={styles.saveButtonText}>Save Avatar</Text>
//         </TouchableOpacity>
//       </View>

//       <Footer page={"profile"} />
//     </SafeAreaView>
//   );
// };

// const styles = {
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 20,
//   },
//   headerText: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   avatarWrapper: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   avatar: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     borderWidth: 2,
//     borderColor: "#ddd",
//   },
//   selectedAvatar: {
//     borderColor: "#7164B4",
//     borderWidth: 3,
//   },
//   saveButton: {
//     marginTop: 20,
//     backgroundColor: "#7164B4",
//     padding: 10,
//     borderRadius: 8,
//   },
//   saveButtonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// };

// export default ChooseAvatar;
