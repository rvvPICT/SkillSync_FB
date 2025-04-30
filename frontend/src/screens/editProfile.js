// import React, { useState, useRef, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Image,
//   Switch,
//   TouchableOpacity,
//   Modal,
//   ScrollView,
//   SafeAreaView,
//   Dimensions,
//   ActivityIndicator,
//   StyleSheet,
//   Alert,
//   Platform
// } from "react-native";

// import { useNavigation } from "@react-navigation/native";
// import Carousel from "react-native-snap-carousel";
// import { Picker } from "@react-native-picker/picker";


// import Navbar2 from "../../Components/navbar2";
// import SkillsAccordion from "../../Components/Skills_and_Domains/SkillsAccordion.js";

// import { fetchUserById, editProf_post } from "../services/users_api.js";

// const { width } = Dimensions.get("window");

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
//   const [profilePic, setProfilePic] = useState(avatarList[1]);
//   const [fullName, setFullName] = useState("");
//   const [username, setUsername] = useState("");
//   const [gender, setGender] = useState("");
//   const [avatar, setAvatar] = useState(1);
//   const [email, setEmail] = useState("user@example.com"); // Read-only
//   const [phone, setPhone] = useState("");
//   const [location, setLocation] = useState("");
//   const [experienceLevel, setExperienceLevel] = useState("");
//   const [skills, setSkills] = useState([]);
//   const [linkedin, setLinkedin] = useState("");
//   const [lookingForTeammates, setLookingForTeammates] = useState(false);
//   const [availableForHackathons, setAvailableForHackathons] = useState(false);
//   const [isMentor, setIsMentor] = useState(false);
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
//           setIsMentor(user.isMentor || false);
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
//         skills, // This will now contain the updated skills from SkillsAccordion
//         lookingForTeammates,
//         availableForHackathons,
//         isMentor,
//         bio,
//       };
      
//       console.log("Sending profile data with skills:", skills);
      
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
  
//   // Handler for receiving updated skills from SkillsAccordion
//   const handleSkillsChange = (updatedSkills) => {
//     setSkills(updatedSkills);
//     console.log("Skills updated:", updatedSkills);
//   };
  
//   const handleChooseAvatar = async () => {
//     setAvatar(selectedAvatarIndex);
//     setAvatarModalVisible(false);
//   };

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
//       <Navbar2 route={{ params: { title: "Edit Profile", userId } }} />
//       <View style={{ flex: 1 }}>
//         {loading ? (
//           <View style={styles.loadingContainer}>
//             <ActivityIndicator size="large" color="#7164B4" />
//           </View>
//         ) : (
//           <ScrollView nestedScrollEnabled={true}>
//             <View style={{ padding: 20, backgroundColor: "#F1F1F6", flex: 1 }}>
//               <View style={{ alignItems: "center", marginBottom: 20 }}>
//                 {/* Avatar Selection Modal */}
//                 <Modal visible={avatarModalVisible} transparent animationType="slide">
//                   <View style={styles.modalContainer}>
//                     <View style={styles.modalContent}>
//                       <Text style={styles.modalTitle}>Choose Avatar</Text>

//                       <Carousel
//                         ref={carouselRef}
//                         data={avatarList}
//                         renderItem={renderAvatarItem}
//                         sliderWidth={width}
//                         itemWidth={130}
//                         firstItem={selectedAvatarIndex}
//                         onSnapToItem={(index) => setSelectedAvatarIndex(index)}
//                       />

//                       <TouchableOpacity style={styles.Btn} onPress={handleChooseAvatar} disabled={loading}>
//                         {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>Choose</Text>}
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 </Modal>

//                 {/* Profile Picture */}
//                 <View style={styles.profilePicContainer}>
//                 <Image
//                   source={avatarList[avatar % 5]}
//                   style={styles.profilePic}
//                 />
//                 </View>
                
//                 <TouchableOpacity style={styles.Btn} onPress={() => setAvatarModalVisible(true)}>
//                   <Text style={styles.buttonText}>Change Profile Picture</Text>
//                 </TouchableOpacity>
//               </View>

//               {/* Other Profile Fields */}
//               <Text>Full Name</Text>
//               <TextInput style={styles.input} value={fullName} onChangeText={setFullName} />

//               <Text>Username</Text>
//               <TextInput style={styles.input} value={username} onChangeText={setUsername} />

//               <Text>Email (Read-Only)</Text>
//               <TextInput style={[styles.input, { backgroundColor: "#ddd" }]} value={email} editable={false} />

//               <Text>Phone Number</Text>
//               <TextInput style={styles.input} value={phone} onChangeText={setPhone} />

//               {/* <Text>Gender</Text>
//               <View style={styles.pickerContainer}>
//                 <Picker
//                   selectedValue={gender}
//                   onValueChange={(itemValue) => setGender(itemValue)}
//                   style={styles.picker}
//                 >
//                   <Picker.Item label="Select Gender" value="" />
//                   <Picker.Item label="Male" value="Male" />
//                   <Picker.Item label="Female" value="Female" />
//                   <Picker.Item label="Other" value="Other" />
//                 </Picker>
//               </View> */}

//               <Text>Gender</Text>
//               <View style={[styles.pickerContainer, Platform.OS === 'ios' && { height: 150 }]}>
//                 <Picker
//                   selectedValue={gender}
//                   onValueChange={(itemValue) => setGender(itemValue)}
//                   style={styles.picker}
//                   itemStyle={{ height: 150 }}
//                 >
//                   <Picker.Item label="Select Gender" value="" />
//                   <Picker.Item label="Male" value="Male" />
//                   <Picker.Item label="Female" value="Female" />
//                   <Picker.Item label="Prefer not to say" value="Prefer not to say" />
//                 </Picker>
//               </View>


//               <Text>Location</Text>
//               <TextInput style={styles.input} value={location} onChangeText={setLocation} />

//               <Text>Experience Level</Text>
//               <TextInput style={styles.input} value={experienceLevel} onChangeText={setExperienceLevel} />

//               <Text style={styles.sectionTitle}>Skills</Text>
//               <View style={styles.skillsContainer}>
//                 <SkillsAccordion 
//                   initialSkills={skills} 
//                   onSkillsChange={handleSkillsChange} 
//                 />
//               </View>

//               <Text>LinkedIn Id</Text>
//               <TextInput style={styles.input} value={linkedin} onChangeText={setLinkedin} />

//               <View style={styles.switchCont}>
//                 <Text>Looking for Teammates?</Text>
//                 <Switch value={lookingForTeammates} onValueChange={setLookingForTeammates} />
//               </View>

//               <View style={styles.switchCont}>
//                 <Text>Available for Hackathons?</Text>
//                 <Switch value={availableForHackathons} onValueChange={setAvailableForHackathons} />
//               </View>

//               <View style={styles.switchCont}>
//                 <Text>Ready for Mentorship?</Text>
//                 <Switch value={isMentor} onValueChange={setIsMentor} />
//               </View>

//               <Text style={{marginTop:"5%"}}>Bio</Text>
//               <TextInput style={[styles.input, { height: 80 }]} value={bio} onChangeText={setBio} multiline />

//               <TouchableOpacity style={styles.Btn} onPress={handleSaveChanges}>
//                 <Text style={styles.buttonText}>SAVE CHANGES</Text>
//               </TouchableOpacity>
//             </View>
//           </ScrollView>
//         )}
//       </View>
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
//     width: 86,
//     height: 86,
//     borderRadius: 43,
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
//     paddingRight: "4%",
//     justifyContent: "space-between",
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
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "500",
//     marginBottom: 8,
//     marginTop: 8,
//   },
//   skillsContainer: {
//     marginBottom: 15,
//   }
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
  SectionList,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Platform
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-snap-carousel";
import { Picker } from "@react-native-picker/picker";

import Navbar2 from "../../Components/navbar2";
import skillsList from "../../Components/Skills_and_Domains/skillsList";

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
  const [isMentor, setIsMentor] = useState(false);
  const [bio, setBio] = useState("");
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const carouselRef = useRef(null);
  const [error, setError] = useState(null);
  
  // State for skills accordion
  const [expandedSkillIndex, setExpandedSkillIndex] = useState(null);

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
          setIsMentor(user.isMentor || false);
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
        skills,
        lookingForTeammates,
        availableForHackathons,
        isMentor,
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
  
  // Toggle skill accordion
  const toggleSkillExpand = (index) => {
    setExpandedSkillIndex(index === expandedSkillIndex ? null : index);
  };

  // Toggle skill selection
  const toggleSkill = (skill) => {
    const updatedSkills = skills.includes(skill)
      ? skills.filter((s) => s !== skill)
      : [...skills, skill];
    
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

  // Prepare data for SectionList
  const sections = [
    {
      title: "Profile Picture",
      data: ["avatar"],
      renderItem: () => (
        <View style={{ alignItems: "center", marginBottom: 20 }}>
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
      )
    },
    {
      title: "Basic Information",
      data: ["basic"],
      renderItem: () => (
        <View>
          <Text>Full Name</Text>
          <TextInput style={styles.input} value={fullName} onChangeText={setFullName} />

          <Text>Username</Text>
          <TextInput style={styles.input} value={username} onChangeText={setUsername} />

          <Text>Email (Read-Only)</Text>
          <TextInput style={[styles.input, { backgroundColor: "#ddd" }]} value={email} editable={false} />

          <Text>Phone Number</Text>
          <TextInput style={styles.input} value={phone} onChangeText={setPhone} />

          <Text>Gender</Text>
          <View style={[styles.pickerContainer, Platform.OS === 'ios' && { height: 150 }]}>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
              style={styles.picker}
              itemStyle={{ height: 150 }}
            >
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Prefer not to say" value="Prefer not to say" />
            </Picker>
          </View>

          <Text>Location</Text>
          <TextInput style={styles.input} value={location} onChangeText={setLocation} />

          <Text>Experience Level</Text>
          <TextInput style={styles.input} value={experienceLevel} onChangeText={setExperienceLevel} />
        </View>
      )
    },
    {
      title: "Skills",
      data: ["skills"],
      renderItem: () => (
        <View style={styles.skillsContainer}>
          {skills.length > 0 && (
            <View style={styles.selectedSkillsContainer}>
              <Text style={styles.selectedSkillsLabel}>Selected Skills:</Text>
              <View style={styles.selectedSkillsList}>
                {skills.map((skill, idx) => (
                  <View key={idx} style={styles.selectedSkillBadge}>
                    <Text style={styles.selectedSkillText}>{skill}</Text>
                    <TouchableOpacity onPress={() => toggleSkill(skill)}>
                      <Text style={styles.removeButton}>×</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          )}
          
          {skillsList.map((skillItem, index) => (
            <View key={`skill-${index}`} style={styles.card}>
              <TouchableOpacity onPress={() => toggleSkillExpand(index)} style={styles.header}>
                <Text style={styles.skillType}>{skillItem.type}</Text>
              </TouchableOpacity>

              {expandedSkillIndex === index && (
                <View style={styles.subtypesContainer}>
                  {skillItem.subtypes.map((sub, i) => {
                    const isSelected = skills.includes(sub);
                    return (
                      <TouchableOpacity
                        key={i}
                        onPress={() => toggleSkill(sub)}
                        style={[
                          styles.filterButton,
                          isSelected && styles.selectedFilter,
                        ]}
                      >
                        <Text
                          style={[
                            styles.filterText,
                            isSelected && styles.selectedFilterText,
                          ]}
                        >
                          {sub}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          ))}
        </View>
      )
    },
    {
      title: "Professional Info",
      data: ["professional"],
      renderItem: () => (
        <View>
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

          <View style={styles.switchCont}>
            <Text>Ready for Mentorship?</Text>
            <Switch value={isMentor} onValueChange={setIsMentor} />
          </View>

          <Text style={{marginTop:"5%"}}>Bio</Text>
          <TextInput 
            style={[styles.input, { height: 80, textAlignVertical: 'top' }]} 
            value={bio} 
            onChangeText={setBio} 
            multiline 
          />

          <TouchableOpacity style={styles.Btn} onPress={handleSaveChanges}>
            <Text style={styles.buttonText}>SAVE CHANGES</Text>
          </TouchableOpacity>
          <View style={{ height: 30 }} />
        </View>
      )
    }
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Navbar2 route={{ params: { title: "Edit Profile", userId } }} />
      <View style={{ flex: 1, backgroundColor: "#F1F1F6" }}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#7164B4" />
          </View>
        ) : (
          <SectionList
            sections={sections}
            keyExtractor={(item, index) => item + index}
            renderSectionHeader={({ section: { title } }) => (
              title !== "Profile Picture" && (
                <Text style={styles.sectionTitle}>{title}</Text>
              )
            )}
            contentContainerStyle={{ padding: 20 }}
            stickySectionHeadersEnabled={false}
          />
        )}
      </View>

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
    marginBottom: 10,
    marginTop: 5,
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#7164B4",
    marginBottom: 15,
    marginTop: 10,
  },
  skillsContainer: {
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#F0F0FF",
    borderRadius: 12,
    paddingVertical: 12,
    marginBottom: 12,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    paddingVertical: 4,
  },
  skillType: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4B3D96",
  },
  subtypesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 12,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#9370DB",
    marginRight: 10,
    marginBottom: 10,
  },
  selectedFilter: {
    backgroundColor: "#9370DB",
  },
  filterText: {
    color: "#7164b4",
    fontWeight: "500",
  },
  selectedFilterText: {
    color: "white",
  },
  selectedSkillsContainer: {
    marginBottom: 15,
  },
  selectedSkillsLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4B3D96",
    marginBottom: 8,
  },
  selectedSkillsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  selectedSkillBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6E6FA",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#7164B4",
    marginBottom: 8,
  },
  selectedSkillText: {
    color: "#4B3D96",
    fontWeight: "500",
  },
  removeButton: {
    color: "#4B3D96",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
});

export default EditProfile;