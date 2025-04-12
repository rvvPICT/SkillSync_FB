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
    // if (!title.trim() || !description.trim() || !domain.trim() || !requiredSkills.length || !teamSize) {
    //   Alert.alert("Error", "Please fill in all fields before submitting.");
    //   return;
    // }

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
    

    // try {
    //   console.log("User ID in AddProjectScreen:", userId);

    //   const projectData = {
    //     title,
    //     description,
    //     domain,
    //     requiredSkills,
    //     isPublic,
    //     teamSize,
    //     deadline,
    //   };
      
    //   const response = await addProject(userId, projectData);
    //   console.log("Added a Project : ", response);
      
    //   if (!response.error) {
    //     console.log("Route params:", route.params);
    //     navigation.navigate("Home", { 
    //       userId, 
    //       forceRefresh: Date.now() // Add a timestamp to force re-fetch
    //     });
        
    //     Alert.alert("Success", "Project Added successfully!");
    //   } else {
    //     Alert.alert("Add Project Failed", response.error);
    //   }
    // } catch (error) {
    //   console.error("Add Project Failed:", error);
    //   Alert.alert("Add Project Failed", "An unexpected error occurred. Please try again.");
    // }
  
    // console.log({ title, description, domain, requiredSkills, isPublic, teamSize, deadline });
  
    // // Reset form fields
    // setTitle("");
    // setDescription("");
    // setDomain("");
    // setRequiredSkills([]);
    // setIsPublic(true);
    // setTeamSize(1);
    // setDeadline(tomorrow);

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
      } else {
        Alert.alert("Add Project Failed", response.error);
      }
    } catch (error) {
      console.error("Add Project Failed:", error);
      Alert.alert("Add Project Failed", "An unexpected error occurred. Please try again.");
    }
  
    // Reset fields
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
            {/* <DomainAccordion 
              initialDomain={domain}
              onDomainChange={handleDomainChange} 
            /> */}
            <DomainAccordion
              initialDomain={domain}
              onDomainChange={(val) => {
                console.log("✅ Domain selected:", val);
                setDomain(val);
              }}
            />
          </View>

          <Text style={styles.sectionTitle}>Required Skills</Text>
          <View style={styles.skillsContainer}>
            {/* <SkillsAccordion 
              initialSkills={[]}
              onSkillsChange={handleSkillsChange} 
            /> */}
            <SkillsAccordion
              initialSkills={requiredSkills}
              onSkillsChange={(skills) => {
                console.log("✅ Skills selected:", skills);
                setRequiredSkills(skills);
              }}
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
