// import React, { useState, useEffect } from "react";
// import {
//   View,
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

// import { useNavigation } from "@react-navigation/native";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { addProject } from "../services/projects_api";
// import { fetchUserById } from "../services/users_api";
// import SkillsAccordion from "../../Components/Skills_and_Domains/SkillsAccordion";
// import DomainAccordion from "../../Components/Skills_and_Domains/DomainAccordian";
// import Navbar2 from '../../Components/navbar2';

// const AddProjectScreen = ({ route }) => {
//   const { userId } = route.params;
//   const navigation = useNavigation();

//   const today = new Date();
//   const tomorrow = new Date(today);
//   tomorrow.setDate(today.getDate() + 1);

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [domain, setDomain] = useState("");
//   const [requiredSkills, setRequiredSkills] = useState([]);
//   const [isPublic, setIsPublic] = useState(true);
//   const [teamSize, setTeamSize] = useState(1);
//   const [deadline, setDeadline] = useState(tomorrow);
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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

//   const handleSkillsChange = (updatedSkills) => {
//     setRequiredSkills(updatedSkills);
//     console.log("Skills updated:", updatedSkills);
//   };

//   // Handle domain change from DomainAccordion
//   const handleDomainChange = (selectedDomain) => {
//     setDomain(selectedDomain);
//     console.log("Domain updated:", selectedDomain);
//   };

//   const handleSubmit = async () => {

//     console.log("DEBUG VALUES:", { title, description, domain, requiredSkills, teamSize });

//     const teamSizeNum = Number(teamSize);

//     if (
//       !title.trim() ||
//       !description.trim() ||
//       !domain.trim() ||
//       !requiredSkills.length ||
//       isNaN(Number(teamSize)) || Number(teamSize) <= 0
//     ) {
//       Alert.alert("Error", "Please fill in all fields before submitting.");
//       return;
//     }

//     try {
//       const projectData = {
//         title,
//         description,
//         domain,
//         requiredSkills,
//         isPublic,
//         teamSize: teamSizeNum,
//         deadline,
//       };
  
//       const response = await addProject(userId, projectData);
  
//       if (!response.error) {
//         navigation.navigate("Home", { userId, forceRefresh: Date.now() });
//         Alert.alert("Success", "Project Added successfully!");
//       } else {
//         Alert.alert("Add Project Failed", response.error);
//       }
//     } catch (error) {
//       console.error("Add Project Failed:", error);
//       Alert.alert("Add Project Failed", "An unexpected error occurred. Please try again.");
//     }
  
//     // Reset fields
//     setTitle("");
//     setDescription("");
//     setDomain("");
//     setRequiredSkills([]);
//     setIsPublic(true);
//     setTeamSize(1);
//     setDeadline(tomorrow);

//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={{ flex: 1 }}
//       >
//         <Navbar2 route={{ params: { title: "Add Project", userId } }} />
//         <ScrollView 
//           style={{ flex: 1, padding: 20 }} 
//           contentContainerStyle={{ paddingBottom: 50 }}
//           keyboardShouldPersistTaps="handled"
//         >
//           <Text style={{ fontSize: 24, fontWeight: "bold", color: "#7164B4", marginBottom: 20 }}>
//             Add a New Project
//           </Text>

//           <TextInput
//             placeholder="Project Name"
//             value={title}
//             onChangeText={setTitle}
//             style={styles.txtip}
//           />

//           <TextInput
//             placeholder="Project Description"
//             value={description}
//             onChangeText={setDescription}
//             multiline
//             style={[styles.txtip, { height: 100 }]}
//           />

//           {/* Replace the text input with DomainAccordion */}
//           <Text style={styles.sectionTitle}>Project Domain</Text>
//           <View style={styles.domainContainer}>
//             {/* <DomainAccordion 
//               initialDomain={domain}
//               onDomainChange={handleDomainChange} 
//             /> */}
//             <DomainAccordion
//               initialDomain={domain}
//               onDomainChange={(val) => {
//                 console.log("✅ Domain selected:", val);
//                 setDomain(val);
//               }}
//             />
//           </View>

//           <Text style={styles.sectionTitle}>Required Skills</Text>
//           <View style={styles.skillsContainer}>
//             {/* <SkillsAccordion 
//               initialSkills={[]}
//               onSkillsChange={handleSkillsChange} 
//             /> */}
//             <SkillsAccordion
//               initialSkills={requiredSkills}
//               onSkillsChange={(skills) => {
//                 console.log("✅ Skills selected:", skills);
//                 setRequiredSkills(skills);
//               }}
//             />
//           </View>

//           <View style={styles.switchCont}>
//             <Text style={{ fontSize: 16, color: "#7164B4", flex: 1 }}>
//               {isPublic ? "Public Project" : "Private Project"}
//             </Text>
//             <Switch value={isPublic} onValueChange={setIsPublic} />
//           </View>

//           <Text style={{ fontSize: 16, color: "#7164B4", flex: 1 }}>Number of Teammates Required</Text>
//           <TextInput
//             placeholder="Number of Teammates Required"
//             value={String(teamSize)}
//             // onChangeText={(text) => setTeamSize(parseInt(text))}
//             onChangeText={(text) => {
//               // Only update if text can be parsed as a valid number
//               const parsedValue = parseInt(text);
//               if (!isNaN(parsedValue)) {
//                 setTeamSize(parsedValue);
//               } else if (text === '') {
//                 // Handle empty input - could set to empty string, 0, or keep previous value
//                 setTeamSize(''); // or setTeamSize(0) depending on your preference
//               }
//               // If input is invalid (not a number and not empty), do nothing
//             }}
//             keyboardType="numeric"
//             style={styles.txtip}
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
//             style={styles.submitButton}>
//             <Text style={{ color: "white", fontWeight: "bold" }}>Submit Project</Text>
//           </TouchableOpacity>
          
//           {/* Add extra padding at the bottom to ensure the button is visible */}
//           <View style={{ height: 30 }} />
//         </ScrollView>
//       </KeyboardAvoidingView>
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
//   switchCont: {
//     flexDirection: "row",
//     paddingRight: "4%",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#7164B4",
//     marginBottom: 8,
//     marginTop: 8,
//   },
//   skillsContainer: {
//     marginBottom: 15,
//   },
//   domainContainer: {
//     marginBottom: 15,
//   },
//   submitButton: {
//     backgroundColor: "#7164B4", 
//     padding: 15, 
//     borderRadius: 10, 
//     alignItems: "center",
//     marginTop: 10,
//   }
// });

// export default AddProjectScreen;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
  StyleSheet,
  SafeAreaView,
  SectionList
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { addProject } from "../services/projects_api";
import Navbar2 from '../../Components/navbar2';

// Import your domain and skills data directly
import skillsList from "../../Components/Skills_and_Domains/skillsList";
import domainsList from "../../Components/Skills_and_Domains/domainsList";

const AddProjectScreen = ({ route }) => {
  const { userId } = route.params;
  const navigation = useNavigation();

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [domain, setDomain] = useState("");
  const [requiredSkills, setRequiredSkills] = useState([]);
  const [isPublic, setIsPublic] = useState(true);
  const [teamSize, setTeamSize] = useState(1);
  const [deadline, setDeadline] = useState(tomorrow);
  
  // UI state
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [expandedSkillIndex, setExpandedSkillIndex] = useState(null);
  const [expandedDomainIndex, setExpandedDomainIndex] = useState(null);

  // Date picker functions
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleConfirm = (date) => {
    setDeadline(date);
    hideDatePicker();
  };

  // Toggle skill accordion
  const toggleSkillExpand = (index) => {
    setExpandedSkillIndex(index === expandedSkillIndex ? null : index);
  };

  // Toggle domain accordion
  const toggleDomainExpand = (index) => {
    setExpandedDomainIndex(index === expandedDomainIndex ? null : index);
  };

  // Toggle skill selection
  const toggleSkill = (skill) => {
    const updatedSkills = requiredSkills.includes(skill)
      ? requiredSkills.filter((s) => s !== skill)
      : [...requiredSkills, skill];
    
    setRequiredSkills(updatedSkills);
    console.log("✅ Skills selected:", updatedSkills);
  };

  // Set selected domain
  const selectDomain = (selectedDomain) => {
    setDomain(selectedDomain);
    console.log("✅ Domain selected:", selectedDomain);
  };

  // Form submission
  const handleSubmit = async () => {
    console.log("DEBUG VALUES:", { title, description, domain, requiredSkills, teamSize });

    const teamSizeNum = Number(teamSize);

    if (
      !title.trim() ||
      !description.trim() ||
      !domain.trim() ||
      !requiredSkills.length ||
      isNaN(Number(teamSize)) || Number(teamSize) <= 0
    ) {
      Alert.alert("Error", "Please fill in all fields before submitting.");
      return;
    }

    try {
      const projectData = {
        title,
        description,
        domain,
        requiredSkills,
        isPublic,
        teamSize: teamSizeNum,
        deadline,
      };
  
      const response = await addProject(userId, projectData);
  
      if (!response.error) {
        navigation.navigate("Home", { userId, forceRefresh: Date.now() });
        Alert.alert("Success", "Project Added successfully!");
        
        // Reset fields
        setTitle("");
        setDescription("");
        setDomain("");
        setRequiredSkills([]);
        setIsPublic(true);
        setTeamSize(1);
        setDeadline(tomorrow);
      } else {
        Alert.alert("Add Project Failed", response.error);
      }
    } catch (error) {
      console.error("Add Project Failed:", error);
      Alert.alert("Add Project Failed", "An unexpected error occurred. Please try again.");
    }
  };

  // Prepare the data for SectionList
  const sections = [
    {
      title: "Project Details",
      data: ["details"],
      renderItem: () => (
        <View>
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
            style={[styles.txtip, { height: 100, textAlignVertical: 'top' }]}
          />
        </View>
      )
    },
    {
      title: "Domain",
      data: ["domain"],
      renderItem: () => (
        <View>
          {domain ? (
            <View style={styles.selectedDomainContainer}>
              <Text style={styles.selectedDomainLabel}>Selected Domain:</Text>
              <View style={styles.selectedDomainBadge}>
                <Text style={styles.selectedDomainText}>{domain}</Text>
                <TouchableOpacity onPress={() => selectDomain("")}>
                  <Text style={styles.removeButton}>×</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
          
          <View style={styles.domainGrid}>
            {domainsList.map((domainItem, index) => (
              <View key={`domain-${index}`} style={styles.domainCard}>
                <TouchableOpacity 
                  onPress={() => toggleDomainExpand(index)} 
                  style={styles.header}
                >
                  <Text style={styles.domainType}>{domainItem.type}</Text>
                </TouchableOpacity>

                {expandedDomainIndex === index && (
                  <View style={styles.subtypesContainer}>
                    {domainItem.subtypes.map((sub, i) => {
                      const isSelected = domain === sub;
                      return (
                        <TouchableOpacity
                          key={i}
                          onPress={() => selectDomain(sub)}
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
        </View>
      )
    },
    {
      title: "Required Skills",
      data: ["skills"],
      renderItem: () => (
        <View>
          {requiredSkills.length > 0 && (
            <View style={styles.selectedSkillsContainer}>
              <Text style={styles.selectedSkillsLabel}>Selected Skills:</Text>
              <View style={styles.selectedSkillsList}>
                {requiredSkills.map((skill, idx) => (
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
                    const isSelected = requiredSkills.includes(sub);
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
      title: "Project Settings",
      data: ["settings"],
      renderItem: () => (
        <View>
          <View style={styles.switchCont}>
            <Text style={{ fontSize: 16, color: "#7164B4", flex: 1 }}>
              {isPublic ? "Public Project" : "Private Project"}
            </Text>
            <Switch value={isPublic} onValueChange={setIsPublic} />
          </View>

          <Text style={{ fontSize: 16, color: "#7164B4", marginBottom: 5 }}>Number of Teammates Required</Text>
          <TextInput
            placeholder="Number of Teammates Required"
            value={String(teamSize)}
            onChangeText={(text) => {
              const parsedValue = parseInt(text);
              if (!isNaN(parsedValue)) {
                setTeamSize(parsedValue);
              } else if (text === '') {
                setTeamSize(''); 
              }
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
          
          {/* Add extra padding at the bottom */}
          <View style={{ height: 30 }} />
        </View>
      )
    }
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Navbar2 route={{ params: { title: "Add Project", userId } }} />
      
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item + index}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionTitle}>{title}</Text>
        )}
        contentContainerStyle={{ padding: 20 }}
        stickySectionHeadersEnabled={false}
      />
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#7164B4",
    marginBottom: 15,
    marginTop: 10,
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
  domainType: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4B3D96",
    textAlign: 'center',
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
  domainGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  domainCard: {
    width: "48%",
    backgroundColor: "#F0F0FF",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  selectedDomainContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    flexWrap: "wrap",
  },
  selectedDomainLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4B3D96",
    marginRight: 10,
  },
  selectedDomainBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6E6FA",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#7164B4",
  },
  selectedDomainText: {
    color: "#4B3D96",
    fontWeight: "500",
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
  submitButton: {
    backgroundColor: "#7164B4", 
    padding: 15, 
    borderRadius: 10, 
    alignItems: "center",
    marginTop: 10,
  }
});

export default AddProjectScreen;