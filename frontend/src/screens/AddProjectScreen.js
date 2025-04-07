// import React, { useState, useEffect } from "react";
// import { View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   Switch,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
//   StyleSheet,
//   SafeAreaView
// } from "react-native";

// // import DateTimePicker from "expo-datepicker"; // Use Expo Date Picker
// import { useNavigation } from "@react-navigation/native";

// import DateTimePickerModal from "react-native-modal-datetime-picker"; // Import the modal DateTimePicker
// import { addProject } from "../services/projects_api";
// import { fetchUserById } from "../services/users_api";
// import SkillsAccordion from "../../Components/Skills_and_Domains/SkillsAccordion"; // Import your SkillsAccordion component


// import Navbar2 from '../../Components/navbar2';

// const AddProjectScreen = ({ route }) => {

//   const { userId } = route.params;
//   const navigation = useNavigation();

//   const today = new Date(); // Get today's date
//   const tomorrow = new Date(today);
//   tomorrow.setDate(today.getDate() + 1); // Set minimum date to tomorrow

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [domain, setDomain] = useState("");
//   const [requiredSkills, setRequiredSkills] = useState([]);
//   const [newSkill, setNewSkill] = useState("");
//   const [isPublic, setIsPublic] = useState(true);
//   const [teamSize, setTeamSize] = useState(1);
//   const [deadline, setDeadline] = useState(tomorrow); // Default to current date
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

//   // const [userId, setUserId] = useState(null);


//   const showDatePicker = () => {
//     setDatePickerVisibility(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };

//   const handleConfirm = (date) => {
//     setDeadline(date);
//     hideDatePicker();
//   };

//   const handleAddSkill = () => {
//     if (newSkill.trim() && !requiredSkills.includes(newSkill.trim())) {
//       setRequiredSkills([...requiredSkills, newSkill.trim()]);
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
//     setRequiredSkills(requiredSkills.filter((s) => s !== skill));
//   };

//   const handleSkillsChange = (updatedSkills) => {
//     setRequiredSkills(updatedSkills);
//     console.log("Skills updated:", updatedSkills);
//   };


//   const handleSubmit = async () => {
//     if (!title.trim() || !description.trim() || !domain.trim() || !requiredSkills.length || !teamSize) {
//       Alert.alert("Error", "Please fill in all fields before submitting.");
//       return;
//     }

//     try {
//       console.log("User ID in AddProjectScreen:", userId);

//       const projectData = {
//         title,
//         description,
//         domain,
//         requiredSkills,
//         isPublic,
//         teamSize,
//         deadline,
//         // userId
//       };
//       const response = await addProject(userId, projectData);
//       console.log("Added a Project : ", response);
//       if (!response.error) {
//         console.log("Route params:", route.params);
//         navigation.navigate("Home", { 
//           userId, 
//           forceRefresh: Date.now() // Add a timestamp to force re-fetch
//         });
        
//         // navigation.navigate("Home", { 
//         //   userId: userId // Explicitly pass the userId
//         // });
//         Alert.alert("Success", "Project Added successfully!");
//       } else {
//         Alert.alert("Add Project Failed", response.error);
//       }
//     } catch (error) {
//         console.error("Add Project Failed:", error);
//         Alert.alert("Add Project Failed", "An unexpected error occurred. Please try again.");
//     }
  
//     console.log({ title, description, domain, requiredSkills, isPublic, teamSize, deadline });
  
//     // Show success alert
//     Alert.alert("Success", "Project submitted successfully!", [{ text: "OK" }]);
  
//     // Optionally, clear input fields after submission
//     setTitle("");
//     setDescription("");
//     setDomain("");
//     setRequiredSkills([]);
//     setIsPublic(true);
//     setTeamSize(1);
//     // setAvailableSlots(0);
//     setDeadline(tomorrow);
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>

//         <Navbar2 route={{ params: { title: "Add Project", userId } }} />
//         <ScrollView style={{ flex: 1, padding: 20 }} keyboardShouldPersistTaps="handled">
//           <Text style={{ fontSize: 24, fontWeight: "bold", color: "#7164B4", marginBottom: 20 }}>
//             Add a New Project
//           </Text>

//           <TextInput
//             placeholder="Project Name"
//             value={title}
//             onChangeText={setTitle}
//             style={[styles.txtip]}
//           />

//           <TextInput
//             placeholder="Project Description"
//             value={description}
//             onChangeText={setDescription}
//             multiline
//             style={[styles.txtip, { height: 100 }]}
//           />

//           <TextInput
//             placeholder="Project Domain"
//             value={domain}
//             onChangeText={setDomain}
//             style={{ backgroundColor: "#E6E6FA", padding: 12, borderRadius: 10, marginBottom: 15 }}
//           />

//           {/* <Text>Skills</Text> */}
//           {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
//             <TextInput
//               style={[styles.skillsTxtip, { flex: 1 }]}
//               value={newSkill}
//               onChangeText={setNewSkill}
//               placeholder="Required Skills"
//             />
//             <TouchableOpacity style={styles.addSkillBtn} onPress={handleAddSkill}>
//               <Text style={{ color: "white", fontWeight: "bold" }}>+ Add</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={styles.skillTagsContainer}>
//             {requiredSkills.map((skill, index) => (
//               <View key={index} style={styles.skillTag}>
//                 <Text style={{ color: "#7164B4", fontWeight: "bold" }}>{skill}</Text>
//                 <TouchableOpacity onPress={() => handleRemoveSkill(skill)}>
//                   <Text style={{ marginLeft: 5, color: "#7164B4", fontWeight: "bold" }}>x</Text>
//                 </TouchableOpacity>
//               </View>
//             ))}
//           </View> */}

//               <Text style={styles.sectionTitle}>Skills</Text>
//               <View style={styles.skillsContainer}>
//                 <SkillsAccordion 
//                   initialSkills={[]}
//                   onSkillsChange={handleSkillsChange} 
//                 />
//               </View>

//           {/* <TextInput
//             placeholder="Required Skills (comma-separated)"
//             value={requiredSkills}
//             onChangeText={setRequiredSkills}
//             style={{ backgroundColor: "#E6E6FA", padding: 12, borderRadius: 10, marginBottom: 15 }}
//           /> */}

//           {/* Public or Private Switch */}
//           <View style={styles.switchCont}>
//             <Text style={{ fontSize: 16, color: "#7164B4", flex: 1 }}>
//               {isPublic ? "Public Project" : "Private Project"}
//             </Text>
//             <Switch value={isPublic} onValueChange={setIsPublic} />
//           </View>

//           <TextInput
//             placeholder="Number of Teammates Required"
//             value={teamSize}
//             onChangeText={setTeamSize}
//             keyboardType="numeric"
//             style={{ backgroundColor: "#E6E6FA", padding: 12, borderRadius: 10, marginBottom: 15 }}
//           />

//           <View style={{ marginBottom: 15 }}>
//             <Text style={{ fontSize: 16, color: "#7164B4", marginBottom: 5 }}>Project Deadline:</Text>
//             <TouchableOpacity onPress={showDatePicker} style={styles.txtip}>
//               <Text>{deadline.toDateString()}</Text>
//             </TouchableOpacity>

//             <DateTimePickerModal
//               isVisible={isDatePickerVisible}
//               mode="date"
//               minimumDate={tomorrow}
//               onConfirm={handleConfirm}
//               onCancel={hideDatePicker}
//             />
//           </View>

//           <TouchableOpacity
//             onPress={handleSubmit}
//             style={{ backgroundColor: "#7164B4", padding: 15, borderRadius: 10, alignItems: "center" }}>
//             <Text style={{ color: "white", fontWeight: "bold" }}>Submit Project</Text>
//           </TouchableOpacity>
//         </ScrollView>
//     </SafeAreaView>
//   );
// };
// const styles = StyleSheet.create({
//   txtip: {
//     backgroundColor: "#E6E6FA",
//     padding: 12,
//     borderRadius: 10,
//     marginBottom: 15,
//   },
//   skillsTxtip: {
//     backgroundColor: "#E6E6FA",
//     padding: 12,
//     borderRadius: 10,
//     // marginBottom: 15,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#7164B4",
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 10,
//     backgroundColor: "#FFF",
//   },
//   addSkillBtn: {
//     backgroundColor: "#7164B4",
//     paddingVertical: 10,
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
//     backgroundColor: "#ffffff",
//     borderColor: "#7164B4",
//     borderWidth: 2,
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     borderRadius: 20,
//     marginRight: 5,
//     marginBottom: 5,
//     alignItems: "center",
//   },  
//   switchCont: {
//     flexDirection: "row",
//     // width: "60%",
//     paddingRight: "4%",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 10,
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


// export default AddProjectScreen;


// import React, { useState, useEffect } from "react";
// import { View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   Switch,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
//   StyleSheet,
//   SafeAreaView
// } from "react-native";

// // import DateTimePicker from "expo-datepicker"; // Use Expo Date Picker
// import { useNavigation } from "@react-navigation/native";

// import DateTimePickerModal from "react-native-modal-datetime-picker"; // Import the modal DateTimePicker
// import { addProject } from "../services/projects_api";
// import { fetchUserById } from "../services/users_api";
// import SkillsAccordion from "../../Components/Skills_and_Domains/SkillsAccordion"; // Import your SkillsAccordion component


// import Navbar2 from '../../Components/navbar2';

// const AddProjectScreen = ({ route }) => {

//   const { userId } = route.params;
//   const navigation = useNavigation();

//   const today = new Date(); // Get today's date
//   const tomorrow = new Date(today);
//   tomorrow.setDate(today.getDate() + 1); // Set minimum date to tomorrow

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [domain, setDomain] = useState("");
//   const [requiredSkills, setRequiredSkills] = useState([]);
//   const [newSkill, setNewSkill] = useState("");
//   const [isPublic, setIsPublic] = useState(true);
//   const [teamSize, setTeamSize] = useState(1);
//   const [deadline, setDeadline] = useState(tomorrow); // Default to current date
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

//   // const [userId, setUserId] = useState(null);


//   const showDatePicker = () => {
//     setDatePickerVisibility(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };

//   const handleConfirm = (date) => {
//     setDeadline(date);
//     hideDatePicker();
//   };

//   const handleAddSkill = () => {
//     if (newSkill.trim() && !requiredSkills.includes(newSkill.trim())) {
//       setRequiredSkills([...requiredSkills, newSkill.trim()]);
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
//     setRequiredSkills(requiredSkills.filter((s) => s !== skill));
//   };

//   const handleSkillsChange = (updatedSkills) => {
//     setRequiredSkills(updatedSkills);
//     console.log("Skills updated:", updatedSkills);
//   };


//   const handleSubmit = async () => {
//     if (!title.trim() || !description.trim() || !domain.trim() || !requiredSkills.length || !teamSize) {
//       Alert.alert("Error", "Please fill in all fields before submitting.");
//       return;
//     }

//     try {
//       console.log("User ID in AddProjectScreen:", userId);

//       const projectData = {
//         title,
//         description,
//         domain,
//         requiredSkills,
//         isPublic,
//         teamSize,
//         deadline,
//         // userId
//       };
//       const response = await addProject(userId, projectData);
//       console.log("Added a Project : ", response);
//       if (!response.error) {
//         console.log("Route params:", route.params);
//         navigation.navigate("Home", { 
//           userId, 
//           forceRefresh: Date.now() // Add a timestamp to force re-fetch
//         });
        
//         // navigation.navigate("Home", { 
//         //   userId: userId // Explicitly pass the userId
//         // });
//         Alert.alert("Success", "Project Added successfully!");
//       } else {
//         Alert.alert("Add Project Failed", response.error);
//       }
//     } catch (error) {
//         console.error("Add Project Failed:", error);
//         Alert.alert("Add Project Failed", "An unexpected error occurred. Please try again.");
//     }
  
//     console.log({ title, description, domain, requiredSkills, isPublic, teamSize, deadline });
  
//     // Show success alert
//     Alert.alert("Success", "Project submitted successfully!", [{ text: "OK" }]);
  
//     // Optionally, clear input fields after submission
//     setTitle("");
//     setDescription("");
//     setDomain("");
//     setRequiredSkills([]);
//     setIsPublic(true);
//     setTeamSize(1);
//     // setAvailableSlots(0);
//     setDeadline(tomorrow);
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
//         <Navbar2 route={{ params: { title: "Add Project", userId } }} />
//         <ScrollView 
//           style={{ flex: 1, padding: 20 }} 
//           contentContainerStyle={{ paddingBottom: 30 }}
//         >
//           <Text style={{ fontSize: 24, fontWeight: "bold", color: "#7164B4", marginBottom: 20 }}>
//             Add a New Project
//           </Text>

//           <TextInput
//             placeholder="Project Name"
//             value={title}
//             onChangeText={setTitle}
//             style={[styles.txtip]}
//           />

//           <TextInput
//             placeholder="Project Description"
//             value={description}
//             onChangeText={setDescription}
//             multiline
//             style={[styles.txtip, { height: 100 }]}
//           />

//           <TextInput
//             placeholder="Project Domain"
//             value={domain}
//             onChangeText={setDomain}
//             style={{ backgroundColor: "#E6E6FA", padding: 12, borderRadius: 10, marginBottom: 15 }}
//           />
//               <Text style={styles.sectionTitle}>Skills</Text>
//               <View style={styles.skillsContainer}>
//                 <SkillsAccordion 
//                   initialSkills={[]}
//                   onSkillsChange={handleSkillsChange} 
//                 />
//               </View>
//           <View style={styles.switchCont}>
//             <Text style={{ fontSize: 16, color: "#7164B4", flex: 1 }}>
//               {isPublic ? "Public Project" : "Private Project"}
//             </Text>
//             <Switch value={isPublic} onValueChange={setIsPublic} />
//           </View>

//           <TextInput
//             placeholder="Number of Teammates Required"
//             value={teamSize}
//             onChangeText={setTeamSize}
//             keyboardType="numeric"
//             style={{ backgroundColor: "#E6E6FA", padding: 12, borderRadius: 10, marginBottom: 15 }}
//           />

//           <View style={{ marginBottom: 15 }}>
//             <Text style={{ fontSize: 16, color: "#7164B4", marginBottom: 5 }}>Project Deadline:</Text>
//             <TouchableOpacity onPress={showDatePicker} style={styles.txtip}>
//               <Text>{deadline.toDateString()}</Text>
//             </TouchableOpacity>

//             <DateTimePickerModal
//               isVisible={isDatePickerVisible}
//               mode="date"
//               minimumDate={tomorrow}
//               onConfirm={handleConfirm}
//               onCancel={hideDatePicker}
//             />
//           </View>

//           <TouchableOpacity
//             onPress={handleSubmit}
//             style={{ backgroundColor: "#7164B4", padding: 15, borderRadius: 10, alignItems: "center" }}>
//             <Text style={{ color: "white", fontWeight: "bold" }}>Submit Project</Text>
//           </TouchableOpacity>
//         </ScrollView>
//     </SafeAreaView>
//   );
// };
// const styles = StyleSheet.create({
//   txtip: {
//     backgroundColor: "#E6E6FA",
//     padding: 12,
//     borderRadius: 10,
//     marginBottom: 15,
//   },
//   skillsTxtip: {
//     backgroundColor: "#E6E6FA",
//     padding: 12,
//     borderRadius: 10,
//     // marginBottom: 15,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#7164B4",
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 10,
//     backgroundColor: "#FFF",
//   },
//   addSkillBtn: {
//     backgroundColor: "#7164B4",
//     paddingVertical: 10,
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
//     backgroundColor: "#ffffff",
//     borderColor: "#7164B4",
//     borderWidth: 2,
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     borderRadius: 20,
//     marginRight: 5,
//     marginBottom: 5,
//     alignItems: "center",
//   },  
//   switchCont: {
//     flexDirection: "row",
//     // width: "60%",
//     paddingRight: "4%",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 10,
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


// export default AddProjectScreen;



import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StyleSheet,
  SafeAreaView
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { addProject } from "../services/projects_api";
import { fetchUserById } from "../services/users_api";
import SkillsAccordion from "../../Components/Skills_and_Domains/SkillsAccordion";
import DomainAccordion from "../../Components/Skills_and_Domains/DomainAccordian";
import Navbar2 from '../../Components/navbar2';

const AddProjectScreen = ({ route }) => {
  const { userId } = route.params;
  const navigation = useNavigation();

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [domain, setDomain] = useState("");
  const [requiredSkills, setRequiredSkills] = useState([]);
  const [isPublic, setIsPublic] = useState(true);
  const [teamSize, setTeamSize] = useState(1);
  const [deadline, setDeadline] = useState(tomorrow);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDeadline(date);
    hideDatePicker();
  };

  const handleSkillsChange = (updatedSkills) => {
    setRequiredSkills(updatedSkills);
    console.log("Skills updated:", updatedSkills);
  };

  // Handle domain change from DomainAccordion
  const handleDomainChange = (selectedDomain) => {
    setDomain(selectedDomain);
    console.log("Domain updated:", selectedDomain);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim() || !domain.trim() || !requiredSkills.length || !teamSize) {
      Alert.alert("Error", "Please fill in all fields before submitting.");
      return;
    }

    try {
      console.log("User ID in AddProjectScreen:", userId);

      const projectData = {
        title,
        description,
        domain,
        requiredSkills,
        isPublic,
        teamSize,
        deadline,
      };
      
      const response = await addProject(userId, projectData);
      console.log("Added a Project : ", response);
      
      if (!response.error) {
        console.log("Route params:", route.params);
        navigation.navigate("Home", { 
          userId, 
          forceRefresh: Date.now() // Add a timestamp to force re-fetch
        });
        
        Alert.alert("Success", "Project Added successfully!");
      } else {
        Alert.alert("Add Project Failed", response.error);
      }
    } catch (error) {
      console.error("Add Project Failed:", error);
      Alert.alert("Add Project Failed", "An unexpected error occurred. Please try again.");
    }
  
    console.log({ title, description, domain, requiredSkills, isPublic, teamSize, deadline });
  
    // Reset form fields
    setTitle("");
    setDescription("");
    setDomain("");
    setRequiredSkills([]);
    setIsPublic(true);
    setTeamSize(1);
    setDeadline(tomorrow);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Navbar2 route={{ params: { title: "Add Project", userId } }} />
        <ScrollView 
          style={{ flex: 1, padding: 20 }} 
          contentContainerStyle={{ paddingBottom: 50 }}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#7164B4", marginBottom: 20 }}>
            Add a New Project
          </Text>

          <TextInput
            placeholder="Project Name"
            value={title}
            onChangeText={setTitle}
            style={styles.txtip}
          />

          <TextInput
            placeholder="Project Description"
            value={description}
            onChangeText={setDescription}
            multiline
            style={[styles.txtip, { height: 100 }]}
          />

          {/* Replace the text input with DomainAccordion */}
          <Text style={styles.sectionTitle}>Project Domain</Text>
          <View style={styles.domainContainer}>
            <DomainAccordion 
              initialDomain={domain}
              onDomainChange={handleDomainChange} 
            />
          </View>

          <Text style={styles.sectionTitle}>Required Skills</Text>
          <View style={styles.skillsContainer}>
            <SkillsAccordion 
              initialSkills={[]}
              onSkillsChange={handleSkillsChange} 
            />
          </View>

          <View style={styles.switchCont}>
            <Text style={{ fontSize: 16, color: "#7164B4", flex: 1 }}>
              {isPublic ? "Public Project" : "Private Project"}
            </Text>
            <Switch value={isPublic} onValueChange={setIsPublic} />
          </View>

          <Text style={{ fontSize: 16, color: "#7164B4", flex: 1 }}>Number of Teammates Required</Text>
          <TextInput
            placeholder="Number of Teammates Required"
            value={String(teamSize)}
            // onChangeText={(text) => setTeamSize(parseInt(text))}
            onChangeText={(text) => {
              // Only update if text can be parsed as a valid number
              const parsedValue = parseInt(text);
              if (!isNaN(parsedValue)) {
                setTeamSize(parsedValue);
              } else if (text === '') {
                // Handle empty input - could set to empty string, 0, or keep previous value
                setTeamSize(''); // or setTeamSize(0) depending on your preference
              }
              // If input is invalid (not a number and not empty), do nothing
            }}
            keyboardType="numeric"
            style={styles.txtip}
          />

          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontSize: 16, color: "#7164B4", marginBottom: 5 }}>Project Deadline:</Text>
            <TouchableOpacity onPress={showDatePicker} style={styles.txtip}>
              <Text>{deadline.toDateString()}</Text>
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              minimumDate={tomorrow}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>

          <TouchableOpacity
            onPress={handleSubmit}
            style={styles.submitButton}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Submit Project</Text>
          </TouchableOpacity>
          
          {/* Add extra padding at the bottom to ensure the button is visible */}
          <View style={{ height: 30 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  txtip: {
    backgroundColor: "#E6E6FA",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  switchCont: {
    flexDirection: "row",
    paddingRight: "4%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#7164B4",
    marginBottom: 8,
    marginTop: 8,
  },
  skillsContainer: {
    marginBottom: 15,
  },
  domainContainer: {
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: "#7164B4", 
    padding: 15, 
    borderRadius: 10, 
    alignItems: "center",
    marginTop: 10,
  }
});

export default AddProjectScreen;
