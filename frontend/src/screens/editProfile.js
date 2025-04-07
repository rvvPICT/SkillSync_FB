// import React, { useState, useRef, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Image,
//   Switch,
//   TouchableOpacity,
//   Modal,
//   FlatList,
//   ScrollView,
//   SafeAreaView,
//   Dimensions,
//   ActivityIndicator,
//   StyleSheet,
//   Alert
// } from "react-native";

// import { useNavigation, useRoute } from "@react-navigation/native";
// import Carousel from "react-native-snap-carousel";
// import { Picker } from "@react-native-picker/picker";

// import Navbar2 from "../../Components/navbar2";
// import Footer from "../../Components/footer";
// import SkillsAccordion from "../../Components/Skills_and_Domains/SkillsAccordion.js";


// import { fetchUserById, editProf_post } from "../services/users_api"; // Import your API call

// const { width } = Dimensions.get("window");

// const skillsList = ["React", "Node.js", "MongoDB", "Express.js", "Python", "C++"];

// const avatarList = [
//   require("../../assets/img/avatars/avatar1.png"),
//   require("../../assets/img/avatars/avatar2.png"),
//   require("../../assets/img/avatars/avatar3.png"),
//   require("../../assets/img/avatars/avatar4.png"),
//   require("../../assets/img/avatars/avatar5.png"),
// ];

// const EditProfile = ({ route }) => {
//   const navigation = useNavigation();
//   const { userId } = route.params || {};

//   const [userData, setUserData] = useState(null);
//   const [profilePic, setProfilePic] = useState(avatarList[1]); // Default avatar
//   const [fullName, setFullName] = useState("");
//   const [username, setUsername] = useState("");
//   const [gender, setGender] = useState("");
//   const [avatar, setAvatar] = useState(1);
//   const [email, setEmail] = useState("user@example.com"); // Read-only
//   const [phone, setPhone] = useState("");
//   const [location, setLocation] = useState("");
//   const [experienceLevel, setExperienceLevel] = useState("");
//   const [skills, setSkills] = useState([]);
//   const [newSkill, setNewSkill] = useState(""); // Holds the input skill
//   const [linkedin, setLinkedin] = useState("");
//   const [lookingForTeammates, setLookingForTeammates] = useState(false);
//   const [availableForHackathons, setAvailableForHackathons] = useState(false);
//   const [bio, setBio] = useState("");
//   const [avatarModalVisible, setAvatarModalVisible] = useState(false);
//   const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const carouselRef = useRef(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (userId) {
//       setLoading(true);
//       fetchUserById(userId).then(user => {
//         if (user) {
//           setUserData(user);
//           setFullName(user.fullName);
//           setUsername(user.username);
//           setEmail(user.email);
//           setPhone(user.phone || "");
//           setGender(user.gender || "");
//           setLocation(user.location || "");
//           setSkills(user.skills || []);
//           setExperienceLevel(user.experienceLevel || "");
//           setLinkedin(user.linkedin || "");
//           setLookingForTeammates(user.lookingForTeammates || false);
//           setAvailableForHackathons(user.availableForHackathons || false);
//           setBio(user.bio || "");
//           setProfilePic(avatarList[user.avatar] || avatarList[1]); // Default fallback
//           setAvatar(user.avatar ?? 1);
//         }
//       }).catch(err => {
//         setError("Error fetching user data.");
//         console.error("Error fetching user:", err);
//       }).finally(() => setLoading(false));
//     }
//   }, [userId]);

//   const handleSaveChanges = async () => {
//     if (!username) {
//       Alert.alert("Please enter a username.");
//       return;
//     }

//     try {
//       const profileData = {
//         fullName,
//         username,
//         avatar,
//         phone,
//         gender,
//         location,
//         experienceLevel,
//         linkedin,
//         skills, // Ensure correct property name
//         lookingForTeammates,
//         availableForHackathons,
//         bio,
//       };
//       const response = await editProf_post(userId, profileData);
//       console.log("Edited information: ", response);
//       if (!response.error) {
//         Alert.alert("Success", "Profile updated successfully!");
//         navigation.navigate("ViewProfile", { 
//           userId, 
//           forceRefresh: Date.now() // Add a timestamp to force re-fetch
//         });
//       } else {
//         Alert.alert("Edit Profile Failed", response.error);
//       }
//     } catch (error) {
//         console.error("Edit Profile Failed:", error);
//         Alert.alert("Edit Profile Failed", "An unexpected error occurred. Please try again.");
//     }
//   };
  
  
//   const handleAddSkill = () => {
//     if (newSkill.trim() && !skills.includes(newSkill.trim())) {
//       setSkills([...skills, newSkill.trim()]);
//       setNewSkill(""); // Clear input after adding
//     } else {
//       if (!newSkill.trim()) Alert.alert("Empty skill cannot be added!");
//       else {
//         Alert.alert("Skill already added!");
//         setNewSkill("");
//       }
//     }
//   };
  
//   const handleRemoveSkill = (skill) => {
//     setSkills(skills.filter((s) => s !== skill));
//   };
  
//   const handleChooseAvatar = async () => {
//     setAvatar(selectedAvatarIndex);
//     setAvatarModalVisible(false);
//   };
//   {loading && <ActivityIndicator size="large" color="#7164B4" />}

//   const renderAvatarItem = ({ item, index }) => {
//     const isSelected = index === selectedAvatarIndex;
//     return (
//       <TouchableOpacity onPress={() => setSelectedAvatarIndex(index)}>
//         <Image
//           source={item}
//           style={{
//             width: isSelected ? 120 : 80,
//             height: isSelected ? 120 : 80,
//             borderRadius: 60,
//             marginHorizontal: 10,
//             borderWidth: isSelected ? 3 : 0,
//             borderColor: "#7164B4",
//           }}
//         />
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       {/* <Navbar2 title="Edit Profile" /> */}
//       <Navbar2 route={{ params: { title: "Edit Profile", userId } }} />
//       <View style={{ flex: 1 }}>
//         <ScrollView>
//           <View style={{ padding: 20, backgroundColor: "#F1F1F6", flex: 1 }}>
//             <View style={{ alignItems: "center", marginBottom: 20 }}>
//               {/* Avatar Selection Modal */}
//               <Modal visible={avatarModalVisible} transparent animationType="slide">
//                 <View style={styles.modalContainer}>
//                   <View style={styles.modalContent}>
//                     <Text style={styles.modalTitle}>Choose Avatar</Text>

//                     <Carousel
//                       ref={carouselRef}
//                       data={avatarList}
//                       renderItem={renderAvatarItem}
//                       sliderWidth={width}
//                       itemWidth={130}
//                       firstItem={selectedAvatarIndex}
//                       onSnapToItem={(index) => setSelectedAvatarIndex(index)}
//                     />

//                     <TouchableOpacity style={styles.Btn} onPress={handleChooseAvatar} disabled={loading}>
//                       {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>Choose</Text>}
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </Modal>

//               {/* Profile Picture */}
//               <View style={styles.profilePicContainer}>
//               <Image
//                 source={avatarList[avatar % 5]}
//                 style={styles.profilePic}
//               />
//               </View>
              
//               <TouchableOpacity style={styles.Btn} onPress={() => setAvatarModalVisible(true)}>
//                 <Text style={styles.buttonText}>Change Profile Picture</Text>
//               </TouchableOpacity>
//             </View>

//             {/* Other Profile Fields */}
//             <Text>Full Name</Text>
//             <TextInput style={styles.input} value={fullName} onChangeText={setFullName} />

//             <Text>Username</Text>
//             <TextInput style={styles.input} value={username} onChangeText={setUsername} />

//             <Text>Email (Read-Only)</Text>
//             <TextInput style={[styles.input, { backgroundColor: "#ddd" }]} value={email} editable={false} />

//             <Text>Phone Number</Text>
//             <TextInput style={styles.input} value={phone} onChangeText={setPhone} />

//             <Text>Gender</Text>
//             <View style={styles.pickerContainer}>
//               <Picker
//                 selectedValue={gender}
//                 onValueChange={(itemValue) => setGender(itemValue)}
//                 style={styles.picker}
//               >
//                 <Picker.Item label="Select Gender" value="" />
//                 <Picker.Item label="Male" value="Male" />
//                 <Picker.Item label="Female" value="Female" />
//                 <Picker.Item label="Other" value="Other" />
//               </Picker>
//             </View>


//             <Text>Location</Text>
//             <TextInput style={styles.input} value={location} onChangeText={setLocation} />

//             <Text>Experience Level</Text>
//             <TextInput style={styles.input} value={experienceLevel} onChangeText={setExperienceLevel} />

//             <Text>Skills</Text>
//             {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <TextInput
//                 style={[styles.input, { flex: 1 }]}
//                 value={newSkill}
//                 onChangeText={setNewSkill}
//                 placeholder="Type a skill"
//               />
//               <TouchableOpacity style={styles.addSkillBtn} onPress={handleAddSkill}>
//                 <Text style={{ color: "white", fontWeight: "bold" }}>+ Add</Text>
//               </TouchableOpacity>
//             </View> */}

//             {/* Display Selected Skills as Tags */}
//             {/* <View style={styles.skillTagsContainer}>
//               {skills.map((skill, index) => (
//                 <View key={index} style={styles.skillTag}>
//                   <Text style={{ color: "#FFF" }}>{skill}</Text>
//                   <TouchableOpacity onPress={() => handleRemoveSkill(skill)}>
//                     <Text style={{ marginLeft: 5, color: "#FFF", fontWeight: "bold" }}>x</Text>
//                   </TouchableOpacity>
//                 </View>
//               ))}
//             </View> */}

//             <SkillsAccordion/>

//             <Text>LinkedIn Id</Text>
//             <TextInput style={styles.input} value={linkedin} onChangeText={setLinkedin} />


//             <View style={styles.switchCont}>
//               <Text>Looking for Teammates?</Text>
//               <Switch value={lookingForTeammates} onValueChange={setLookingForTeammates} />
//             </View>

//             <View style={styles.switchCont}>
//               <Text>Available for Hackathons?</Text>
//               <Switch value={availableForHackathons} onValueChange={setAvailableForHackathons} />
//             </View>

//             <Text style={{marginTop:"5%"}}>Bio</Text>
//             <TextInput style={[styles.input, { height: 80 }]} value={bio} onChangeText={setBio} multiline />

//             <TouchableOpacity style={styles.Btn} onPress={handleSaveChanges}>
//               <Text style={styles.buttonText}>SAVE CHANGES</Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       </View>
//       {/* <Footer page={"profile"} /> */}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   input: {
//     borderWidth: 1,
//     borderColor: "#7164B4",
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 10,
//     backgroundColor: "#FFF",
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },
//   modalContent: {
//     backgroundColor: "#FFF",
//     padding: 20,
//     borderRadius: 10,
//     width: "90%",
//     alignItems: "center",
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   Btn: {
//     backgroundColor: "#7164B4",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 10,
//   },
//   buttonText: {
//     color: "#FFF",
//     fontSize: 16,
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
//   switchCont: {
//     flexDirection: "row",
//     // width: "60%",
//     paddingRight: "4%",
//     justifyContent: "space-between",
//     alignItems: "center",
//     // gap: 30,
//   },
//   addSkillBtn: {
//     backgroundColor: "#7164B4",
//     paddingVertical: 8,
//     paddingHorizontal: 15,
//     borderRadius: 8,
//     marginLeft: 10,
//     alignItems: "center",
//   },
//   skillTagsContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     marginTop: 10,
//   },
//   skillTag: {
//     flexDirection: "row",
//     backgroundColor: "#7164B4",
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     borderRadius: 20,
//     marginRight: 5,
//     marginBottom: 5,
//     alignItems: "center",
//   }, 
//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: "#7164B4",
//     borderRadius: 8,
//     marginBottom: 10,
//     backgroundColor: "#FFF",
//   },
//   picker: {
//     height: 50,
//     width: "100%",
//   },
  
// });

// export default EditProfile;


import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Switch,
  TouchableOpacity,
  Modal,
  ScrollView,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
  Alert
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-snap-carousel";
import { Picker } from "@react-native-picker/picker";

import Navbar2 from "../../Components/navbar2";
import SkillsAccordion from "../../Components/Skills_and_Domains/SkillsAccordion.js";

import { fetchUserById, editProf_post } from "../services/users_api.js";

const { width } = Dimensions.get("window");

const avatarList = [
  require("../../assets/img/avatars/avatar1.png"),
  require("../../assets/img/avatars/avatar2.png"),
  require("../../assets/img/avatars/avatar3.png"),
  require("../../assets/img/avatars/avatar4.png"),
  require("../../assets/img/avatars/avatar5.png"),
];

const EditProfile = ({ route }) => {
  const navigation = useNavigation();
  const { userId } = route.params || {};

  const [userData, setUserData] = useState(null);
  const [profilePic, setProfilePic] = useState(avatarList[1]);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [avatar, setAvatar] = useState(1);
  const [email, setEmail] = useState("user@example.com"); // Read-only
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [skills, setSkills] = useState([]);
  const [linkedin, setLinkedin] = useState("");
  const [lookingForTeammates, setLookingForTeammates] = useState(false);
  const [availableForHackathons, setAvailableForHackathons] = useState(false);
  const [bio, setBio] = useState("");
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const carouselRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      fetchUserById(userId).then(user => {
        if (user) {
          setUserData(user);
          setFullName(user.fullName);
          setUsername(user.username);
          setEmail(user.email);
          setPhone(user.phone || "");
          setGender(user.gender || "");
          setLocation(user.location || "");
          setSkills(user.skills || []);
          setExperienceLevel(user.experienceLevel || "");
          setLinkedin(user.linkedin || "");
          setLookingForTeammates(user.lookingForTeammates || false);
          setAvailableForHackathons(user.availableForHackathons || false);
          setBio(user.bio || "");
          setProfilePic(avatarList[user.avatar] || avatarList[1]); // Default fallback
          setAvatar(user.avatar ?? 1);
        }
      }).catch(err => {
        setError("Error fetching user data.");
        console.error("Error fetching user:", err);
      }).finally(() => setLoading(false));
    }
  }, [userId]);

  const handleSaveChanges = async () => {
    if (!username) {
      Alert.alert("Please enter a username.");
      return;
    }

    try {
      const profileData = {
        fullName,
        username,
        avatar,
        phone,
        gender,
        location,
        experienceLevel,
        linkedin,
        skills, // This will now contain the updated skills from SkillsAccordion
        lookingForTeammates,
        availableForHackathons,
        bio,
      };
      
      console.log("Sending profile data with skills:", skills);
      
      const response = await editProf_post(userId, profileData);
      console.log("Edited information: ", response);
      if (!response.error) {
        Alert.alert("Success", "Profile updated successfully!");
        navigation.navigate("ViewProfile", { 
          userId, 
          forceRefresh: Date.now() // Add a timestamp to force re-fetch
        });
      } else {
        Alert.alert("Edit Profile Failed", response.error);
      }
    } catch (error) {
        console.error("Edit Profile Failed:", error);
        Alert.alert("Edit Profile Failed", "An unexpected error occurred. Please try again.");
    }
  };
  
  // Handler for receiving updated skills from SkillsAccordion
  const handleSkillsChange = (updatedSkills) => {
    setSkills(updatedSkills);
    console.log("Skills updated:", updatedSkills);
  };
  
  const handleChooseAvatar = async () => {
    setAvatar(selectedAvatarIndex);
    setAvatarModalVisible(false);
  };

  const renderAvatarItem = ({ item, index }) => {
    const isSelected = index === selectedAvatarIndex;
    return (
      <TouchableOpacity onPress={() => setSelectedAvatarIndex(index)}>
        <Image
          source={item}
          style={{
            width: isSelected ? 120 : 80,
            height: isSelected ? 120 : 80,
            borderRadius: 60,
            marginHorizontal: 10,
            borderWidth: isSelected ? 3 : 0,
            borderColor: "#7164B4",
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Navbar2 route={{ params: { title: "Edit Profile", userId } }} />
      <View style={{ flex: 1 }}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#7164B4" />
          </View>
        ) : (
          <ScrollView>
            <View style={{ padding: 20, backgroundColor: "#F1F1F6", flex: 1 }}>
              <View style={{ alignItems: "center", marginBottom: 20 }}>
                {/* Avatar Selection Modal */}
                <Modal visible={avatarModalVisible} transparent animationType="slide">
                  <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                      <Text style={styles.modalTitle}>Choose Avatar</Text>

                      <Carousel
                        ref={carouselRef}
                        data={avatarList}
                        renderItem={renderAvatarItem}
                        sliderWidth={width}
                        itemWidth={130}
                        firstItem={selectedAvatarIndex}
                        onSnapToItem={(index) => setSelectedAvatarIndex(index)}
                      />

                      <TouchableOpacity style={styles.Btn} onPress={handleChooseAvatar} disabled={loading}>
                        {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>Choose</Text>}
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>

                {/* Profile Picture */}
                <View style={styles.profilePicContainer}>
                <Image
                  source={avatarList[avatar % 5]}
                  style={styles.profilePic}
                />
                </View>
                
                <TouchableOpacity style={styles.Btn} onPress={() => setAvatarModalVisible(true)}>
                  <Text style={styles.buttonText}>Change Profile Picture</Text>
                </TouchableOpacity>
              </View>

              {/* Other Profile Fields */}
              <Text>Full Name</Text>
              <TextInput style={styles.input} value={fullName} onChangeText={setFullName} />

              <Text>Username</Text>
              <TextInput style={styles.input} value={username} onChangeText={setUsername} />

              <Text>Email (Read-Only)</Text>
              <TextInput style={[styles.input, { backgroundColor: "#ddd" }]} value={email} editable={false} />

              <Text>Phone Number</Text>
              <TextInput style={styles.input} value={phone} onChangeText={setPhone} />

              <Text>Gender</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={gender}
                  onValueChange={(itemValue) => setGender(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Select Gender" value="" />
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>

              <Text>Location</Text>
              <TextInput style={styles.input} value={location} onChangeText={setLocation} />

              <Text>Experience Level</Text>
              <TextInput style={styles.input} value={experienceLevel} onChangeText={setExperienceLevel} />

              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={styles.skillsContainer}>
                <SkillsAccordion 
                  initialSkills={skills} 
                  onSkillsChange={handleSkillsChange} 
                />
              </View>

              <Text>LinkedIn Id</Text>
              <TextInput style={styles.input} value={linkedin} onChangeText={setLinkedin} />

              <View style={styles.switchCont}>
                <Text>Looking for Teammates?</Text>
                <Switch value={lookingForTeammates} onValueChange={setLookingForTeammates} />
              </View>

              <View style={styles.switchCont}>
                <Text>Available for Hackathons?</Text>
                <Switch value={availableForHackathons} onValueChange={setAvailableForHackathons} />
              </View>

              <Text style={{marginTop:"5%"}}>Bio</Text>
              <TextInput style={[styles.input, { height: 80 }]} value={bio} onChangeText={setBio} multiline />

              <TouchableOpacity style={styles.Btn} onPress={handleSaveChanges}>
                <Text style={styles.buttonText}>SAVE CHANGES</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#7164B4",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#FFF",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  Btn: {
    backgroundColor: "#7164B4",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
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
  switchCont: {
    flexDirection: "row",
    paddingRight: "4%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#7164B4",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#FFF",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    marginTop: 8,
  },
  skillsContainer: {
    marginBottom: 15,
  }
});

export default EditProfile;