// import React, { useEffect, useState } from "react";

// import { 
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   SafeAreaView,
//   FlatList,
//   ActivityIndicator,
//   Linking,
//   Alert
// } from "react-native";

// import { useNavigation } from "@react-navigation/native";
// import Navbar2 from "../../Components/navbar2";
// import Footer from "../../Components/footer";

// import { fetchUserById } from "../services/users_api";
// import { fetchProjectMembers, fetchUserProjects, fetchUserPublicProjects , sendInvite as sendInviteAPI, acceptApplication } from "../services/projects_api";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const ViewProfile = ({ route }) => {
//   const navigation = useNavigation();
//   const loggedinId = route.params.userId;
//   const { otherId, fromSearch, fromSearchFilters=false, fromProject=false, projectId=null, fromNotification=false } = route.params;
//   const projectApplication = route.params?.project || null;
//   // const otherId = route.params.otherId;
//   // const fromSearch = route.params.fromSearch;
//   // const fromSearchFilters = route.params.fromSearchFilters;
//   // const fromProject = route.params.fromProject;
//   // const projectId = route.params.projectId;
//   console.log("Received userId:", loggedinId);
//   const [error, setError] = useState(null);

//   const [userData, setUserData] = useState(null);
// 	const [userProjects, setUserProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
// 	const [userId, setUserId] = useState(null);
//   const [isApplying, setIsApplying] = useState(false);

// 	useEffect(() => {
// 		const getUserData = async () => {
// 			try {
//         if (otherId) {
//           console.log("Fetching user with ID:", otherId);
//           const userData = await fetchUserById(otherId);
//           if (!userData) throw new Error("User not found");
//           setUserId(userData._id);
//           setUserData(userData);

//           const projectData = await fetchUserPublicProjects(otherId); // Fetch projects
//           console.log("Fetched projects:", projectData);
//           setUserProjects(projectData);
//         }
// 				else {
//           console.log("Fetching user with ID:", loggedinId);
//           const userData = await fetchUserById(loggedinId); 
//           if (!userData) throw new Error("User not found");
//           setUserId(userData._id);
//           setUserData(userData);

//           const projectData = await fetchUserProjects(loggedinId); // Fetch projects
//           console.log("Fetched projects:", projectData);
//           setUserProjects(projectData);
//         }

// 			} catch (error) {
// 					console.error("Error fetching user data:", error);
//           setError("Failed to load user data");
//       } finally {
//           setLoading(false);
//       }
// 		};
// 		getUserData();
// 	}, [userId, route.params?.forceRefresh, otherId]);

//   const avatarImages = {
//     0: require("../../assets/img/avatars/avatar1.png"),
//     1: require("../../assets/img/avatars/avatar2.png"),
//     2: require("../../assets/img/avatars/avatar3.png"),
//     3: require("../../assets/img/avatars/avatar4.png"),
//     4: require("../../assets/img/avatars/avatar5.png"),
//   };

//   const handleLinkPress = async () => {
//     const url = userData.linkedin;
//     const supported = await Linking.canOpenURL(url);

//     if (supported) await Linking.openURL(url);
//     else alert("Cannot open this link");
//   }

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#7164B4" />
//       </View>
//     );
//   }

//   if (!userData) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Text style={{ fontSize: 18, color: "#333" }}>User not found</Text>
//       </View>
//     );
//   }
//   const handleSendInvite =async() => {
//     try {
//       console.log("Invite sender (loggedinId):", loggedinId);
//       console.log("Invite receiver (otherId):", otherId);
//       console.log("Project ID:", projectId);

//       const token = await AsyncStorage.getItem('token') ;
//       console.log(`Token : ${token}`) ;
//       if(!token) return Alert.alert("Unauthorized!" , "Please log in") ;

//       console.log("Sending invites from frontend !") ;
//       await sendInviteAPI(projectId , otherId , token) ;
//       Alert.alert("Invite Sent !" , "User has been invited to this project")
//     }catch(error){
//       const errorMessage = error?.response?.data?.message || "Failed to send invite" ;
//       Alert.alert("Error" , errorMessage) ;
//     }
//   }
//   const gotoViewProject = (project) => {
//     if (otherId) {
//       navigation.navigate('ViewProject', { projectType: "publicProjects", project, userId: loggedinId, fromSearch: true });
//     } else {
//       navigation.navigate('ViewProject', { projectType: "publicProjects", project, userId: loggedinId, fromSearch: false });
//     }
//   }

//   // const handleAcceptApplication = async () => {
//   //   try {
//   //     setIsApplying(true);
//   //     const notificationId = route.params?.notificationId;
      
//   //     if (!notificationId) {
//   //       Alert.alert("Error", "Notification ID not found");
//   //       return;
//   //     }
//   //     const response = await acceptApplication(projectApplication._id, userId, notificationId);
      
//   //     const fetchedMembers = await fetchProjectMembers(projectApplication._id);
//   //     setMemberUsers(fetchedMembers);
      
//   //     Alert.alert("Success", response?.msg || "Successfully joined the project!");
      
//   //     navigation.navigate("Notification", { userId });
//   //   } catch (error) {
//   //     Alert.alert("Error", error.message || "Failed to accept invitation.");
//   //   } finally {
//   //     setIsApplying(false);
//   //   }
//   // };

//   const handleAcceptApplication = async () => {
//     try {
//       setIsApplying(true);
//       const notificationId = route.params?.notificationId;
//       if (!notificationId) {
//         Alert.alert("Error", "Notification ID not found");
//         return;
//       }
//       const response = await acceptApplication(projectApplication._id, otherId, notificationId);
//       Alert.alert("Success", response?.msg || "Successfully accepted application!");
//       navigation.navigate("Notification", { userId: loggedinId });
//     } catch (error) {
//       Alert.alert("Error", error.message || "Failed to accept application.");
//     } finally {
//       setIsApplying(false);
//     }
//   };

// 	const renderItem = ({ item }) => (
//     <TouchableOpacity 
//       style={styles.card}
//       onPress={() => gotoViewProject(item)}
//     >
// 			<Text style={styles.cardText}>{item.title}</Text>
// 			<Text style={styles.subText}>{item.domain}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
//       {/* <Navbar2 title="Profile" userId={userId}/> */}
//       <Navbar2 route={{ params: { title: "Profile", userId: loggedinId, otherId, fromSearch, fromProject, projectId, fromSearchFilters } }} />
      
//       <ScrollView contentContainerStyle={{ padding: 15 }}>
//         <View style={styles.headerContainer}>
//           <View style={styles.userInfo}>
//             <Text style={styles.username}>{userData.username}</Text>
//             <Text style={styles.bio}>{userData.bio || "No bio available"}</Text>
//             <Text style={styles.skills}>
//               {userData.skills.length > 0 ? userData.skills.join(", ") : "No skills specified"}
//             </Text>
//             <TouchableOpacity onPress={handleLinkPress}>
//               <Text style={styles.linkText}>{userData.linkedin}</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.profilePicContainer}>
//             <Image
//               source={userData.profilePic ? { uri: userData.profilePic } : avatarImages[userData.avatar%5]}
//               style={styles.profilePic}
//             />
//           </View>

//         </View>

//         { !otherId && (
//           <TouchableOpacity 
//             style={styles.editProfileButton} 
//             onPress={() => navigation.navigate("EditProfile", { userId: loggedinId })}
//           >
//             <Text style={styles.editProfileText}>Edit Profile</Text>
//           </TouchableOpacity>
//         )}

//         { (otherId && fromProject && projectId && !fromNotification) && (
//           <TouchableOpacity 
//             style={styles.editProfileButton} onPress={() => handleSendInvite()}
//             // onPress={() => navigation.navigate("EditProfile", { userId: loggedinId })}
//           >
//             <Text style={styles.editProfileText}>Send Invite</Text>
//           </TouchableOpacity>
//         )}

//         { (fromNotification) && (
//           <TouchableOpacity 
//             style={styles.editProfileButton} onPress={handleAcceptApplication}
//             // onPress={() => navigation.navigate("EditProfile", { userId: loggedinId })}
//           >
//             <Text style={styles.editProfileText}>Accept Application</Text>
//           </TouchableOpacity>
//         )}

// 				<FlatList
//           horizontal
//           data={userProjects.sort(() => Math.random() - 0.5).slice(0, 6)}
//           renderItem={renderItem}
//           keyExtractor={(item) => item._id.toString()} // Ensure unique key
//         />

//       </ScrollView>

//       {/* <Footer page="profile" userId={userId}/> */}
//       {/* <Footer route={{ params: { page: "profile", userId: loggedinId, otherId: otherId } }} /> */}
//       <Footer route={{ params: { page: otherId ? "search" : "profile", userId: loggedinId, otherId } }} />
//     </SafeAreaView>
//   );
// };

// const styles = {
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingVertical: 15,
//   },
//   userInfo: {
//     flex: 1,
//     paddingRight: 10,
//   },
//   username: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   bio: {
//     fontSize: 14,
//     color: "#666",
//     marginTop: 5,
//   },
//   skills: {
//     fontSize: 14,
//     color: "#333",
//     marginTop: 5,
//   },
//   profilePicContainer: {
//     width: 86, // Slightly larger than the image to create spacing
//     height: 86,
//     borderRadius: 43, // Half of width/height to maintain circular shape
//     borderWidth: 2,
//     borderColor: "#7164B4",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   profilePic: {
//     width: 75,
//     height: 80,
//     borderRadius: 40,
//   },
//   editProfileButton: {
//     backgroundColor: "#7164B4",
//     padding: 10,
//     borderRadius: 5,
//     alignSelf: "center",
//     width: "50%",
//     alignItems: "center",
//     marginVertical: 20,
//   },
//   editProfileText: {
//     color: "#FFF",
//     fontWeight: "bold",
//   },
//   linkText: {
//     color: "blue",
//     textDecorationLine: "underline",
//   },
// 	card: {
//     backgroundColor: "#E6E6FA",
//     padding: 20,
//     borderRadius: 15,
//     alignItems: "center",
//     marginRight: 15,
//     width: 160,
//     height: 200,
//     justifyContent: "center",
// 	},
//   cardText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   subText: {
//     fontSize: 14,
//     color: "gray",
//     textAlign: "center",
//     marginTop: 10,
//   },
// };

// export default ViewProfile;


import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Linking,
  Alert
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import Navbar2 from "../../Components/navbar2";
import Footer from "../../Components/footer";

import {
  fetchProjectMembers,
  fetchUserProjects,
  fetchUserPublicProjects,
  sendInvite as sendInviteAPI,
  acceptApplication,
} from "../services/projects_api.js";
import { fetchUserById } from "../services/users_api.js";
import { updateNotificationStatus } from "../services/notification_api.js";

import AsyncStorage from "@react-native-async-storage/async-storage";

const ViewProfile = ({ route }) => {
  const navigation = useNavigation();
  const loggedinId = route.params.userId;
  const {
    otherId,
    fromSearch,
    fromSearchFilters = false,
    fromProject = false,
    projectId = null,
    fromNotification = false,
  } = route.params;
  const projectApplication = route.params?.project || null;

  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userProjects, setUserProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const targetId = otherId || loggedinId;
        const user = await fetchUserById(targetId);
        if (!user) throw new Error("User not found");
        setUserId(user._id);
        setUserData(user);

        // Fetch projects - both API calls now handle "no projects" gracefully
        const projects = otherId
          ? await fetchUserPublicProjects(otherId)
          : await fetchUserProjects(loggedinId);
        setUserProjects(projects || []); // Ensure it's always an array
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };
    getUserData();
  }, [userId, route.params?.forceRefresh, otherId]);

  const avatarImages = {
    0: require("../../assets/img/avatars/avatar1.png"),
    1: require("../../assets/img/avatars/avatar2.png"),
    2: require("../../assets/img/avatars/avatar3.png"),
    3: require("../../assets/img/avatars/avatar4.png"),
    4: require("../../assets/img/avatars/avatar5.png"),
  };

  const handleLinkPress = async () => {
    const url = userData.linkedin;
    const supported = await Linking.canOpenURL(url);
    if (supported) await Linking.openURL(url);
    else alert("Cannot open this link");
  };

  const handleSendInvite = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return Alert.alert("Unauthorized!", "Please log in");

      await sendInviteAPI(projectId, otherId);
      Alert.alert("Invite Sent!", "User has been invited to this project");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to send invite";
      Alert.alert("Error", errorMessage);
    }
  };

  const handleAcceptApplication = async () => {
    try {
      setIsApplying(true);
      const notificationId = route.params?.notificationId;
      
      if (!notificationId) {
        Alert.alert("Error", "Notification ID not found");
        return;
      }
      
      // Log the operation details for debugging
      console.log("Accepting application details:");
      console.log("- Notification ID:", notificationId);
      console.log("- Project ID:", projectApplication._id);
      console.log("- Applicant ID:", otherId);
      
      // Call the acceptApplication API function
      const response = await acceptApplication(
        projectApplication._id, 
        otherId, 
        notificationId
      );
      
      if (!response) {
        throw new Error("No response received from server");
      }
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      // Update notification status as well
      await updateNotificationStatus(notificationId, 'accepted');
      
      Alert.alert(
        "Success", 
        response?.msg || "Successfully accepted application!"
      );
      
      // Navigate back to notifications
      navigation.navigate("Notification", { userId: loggedinId });
    } catch (error) {
      console.error("Error accepting application:", error);
      // Log more details about the error
      if (error.response) {
        console.error("Server responded with:", error.response.status, error.response.data);
      }
      Alert.alert("Error", error.message || "Failed to accept application.");
    } finally {
      setIsApplying(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert("Logout", "You have been logged out successfully.");
    navigation.navigate("SignIn");
  };

  const gotoViewProject = (project) => {
    navigation.navigate("ViewProject", {
      projectType: "publicProjects",
      project,
      userId: loggedinId,
      fromSearch: !!otherId,
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => gotoViewProject(item)}>
      <Text style={styles.cardText}>{item.title}</Text>
      <Text style={styles.subText}>{item.domain}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7164B4" />
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ fontSize: 18, color: "#333" }}>User not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Cute Logout button */}
      {/* {!otherId && (
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      )} */}

      <Navbar2
        route={{
          params: {
            title: "Profile",
            userId: loggedinId,
            otherId,
            fromSearch,
            fromProject,
            projectId,
            fromSearchFilters,
          },
        }}
      />

      <ScrollView contentContainerStyle={{ padding: 15 }}>
        <View style={styles.headerContainer}>
          <View style={styles.userInfo}>
            <Text style={styles.username}>{userData.username}</Text>
            {userData.gender && userData.gender !== "Prefer not to say" && (
              <Text style={styles.bio}>{userData.gender}</Text>
            )}
            <Text style={styles.bio}>{userData.bio || "No bio available"}</Text>
            <Text style={styles.skills}>
              {userData.skills.length > 0
                ? userData.skills.join(", ")
                : "No skills specified"}
            </Text>
            <TouchableOpacity onPress={handleLinkPress}>
              <Text style={styles.linkText}>{userData.linkedin}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.profilePicContainer}>
            <Image
              source={
                userData.profilePic
                  ? { uri: userData.profilePic }
                  : avatarImages[userData.avatar % 5]
              }
              style={styles.profilePic}
            />
          </View>
        </View>

        {!otherId && (

          <View style={styles.buttonContainer}>

            <TouchableOpacity
              style={styles.editProfileButton}
              onPress={() => navigation.navigate("EditProfile", { userId: loggedinId })}
            >
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>

            
          </View>

          // <View>
          //   {!otherId && (
          //     <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          //       <Text style={styles.logoutText}>Logout</Text>
          //     </TouchableOpacity>
          //   )}
          //   <TouchableOpacity
          //   style={styles.editProfileButton}
          //   onPress={() => navigation.navigate("EditProfile", { userId: loggedinId })}
          // >
          //   <Text style={styles.editProfileText}>Edit Profile</Text>
          // </TouchableOpacity>
          // </View>
          
        )}

        {otherId && fromProject && projectId && !fromNotification && (
          <TouchableOpacity style={styles.editProfileButton} onPress={handleSendInvite}>
            <Text style={styles.editProfileText}>Send Invite</Text>
          </TouchableOpacity>
        )}

        {fromNotification && (
          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={handleAcceptApplication}
          >
            <Text style={styles.editProfileText}>Accept Application</Text>
          </TouchableOpacity>
        )}

        <FlatList
          horizontal
          data={userProjects.sort(() => Math.random() - 0.5).slice(0, 6)}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
        />
      </ScrollView>

      <Footer
        route={{
          params: { page: otherId ? "search" : "profile", userId: loggedinId, otherId },
        }}
      />
    </SafeAreaView>
  );
};

const styles = {
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  logoutButton: {
    backgroundColor: "#F3F0FF",
    width: 50, // Adjust the size as needed
    height: 50, // Keep width and height the same to make it circular
    borderRadius: 25, // Half of the width/height value
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center', // To center the logout text/icon
  },
  
  logoutText: {
    fontSize: 14,
    color: "#7164B4",
    fontWeight: "600",
  },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  userInfo: {
    flex: 1,
    paddingRight: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bio: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  skills: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
  profilePicContainer: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 2,
    borderColor: "#7164B4",
    justifyContent: "center",
    alignItems: "center",
  },
  profilePic: {
    width: 75,
    height: 80,
    borderRadius: 40,
  },

  // New container for both buttons aligned horizontally
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 15,
  },

  editProfileButton: {
    backgroundColor: "#7164B4",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "48%", // Adjust width as needed to fit within the container
  },
  
  editProfileText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  
  linkText: {
    color: "blue",
    textDecorationLine: "underline",
  },
  
  card: {
    backgroundColor: "#E6E6FA",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    marginRight: 15,
    width: 160,
    height: 200,
    justifyContent: "center",
  },
  
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  
  subText: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginTop: 10,
  },
};

export default ViewProfile;

