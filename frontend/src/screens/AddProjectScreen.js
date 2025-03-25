import React, { useState } from "react";
import { View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  KeyboardAvoidingView,
  Platform,
  Alert
} from "react-native";

// import DateTimePicker from "expo-datepicker"; // Use Expo Date Picker
import DateTimePickerModal from "react-native-modal-datetime-picker"; // Import the modal DateTimePicker


import Navbar2 from '../../Components/navbar2';

const AddProjectScreen = ({ route, navigation }) => {

  const today = new Date(); // Get today's date
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1); // Set minimum date to tomorrow

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [collabType, setCollabType] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [teamSize, setTeamSize] = useState(0);
  const [deadline, setDeadline] = useState(tomorrow); // Default to current date
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


  const handleSubmit = () => {
    if (!projectName.trim() || !description.trim() || !skills.trim() || !collabType.trim() || !teamSize) {
      Alert.alert("Error", "Please fill in all fields before submitting.");
      return;
    }
  
    console.log({ projectName, description, skills, collabType, isPublic, teamSize, deadline });
  
    // Show success alert
    Alert.alert("Success", "Project submitted successfully!", [{ text: "OK" }]);
  
    // Optionally, clear input fields after submission
    setProjectName("");
    setDescription("");
    setSkills("");
    setCollabType("");
    setIsPublic(true);
    setTeamSize("");
    setDeadline(tomorrow);
    navigation.navigate("Home");
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <Navbar2 title="Add Project" />
        <ScrollView style={{ flex: 1, padding: 20 }} keyboardShouldPersistTaps="handled">
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#7164B4", marginBottom: 20 }}>
            Add a New Project
          </Text>

          <TextInput
            placeholder="Project Name"
            value={projectName}
            onChangeText={setProjectName}
            style={{ backgroundColor: "#E6E6FA", padding: 12, borderRadius: 10, marginBottom: 15 }}
          />

          <TextInput
            placeholder="Project Description"
            value={description}
            onChangeText={setDescription}
            multiline
            style={{ backgroundColor: "#E6E6FA", padding: 12, borderRadius: 10, marginBottom: 15, height: 100 }}
          />

          <TextInput
            placeholder="Required Skills (comma-separated)"
            value={skills}
            onChangeText={setSkills}
            style={{ backgroundColor: "#E6E6FA", padding: 12, borderRadius: 10, marginBottom: 15 }}
          />

          <TextInput
            placeholder="Collaboration Type (e.g., Mentor, Hackathon Partner)"
            value={collabType}
            onChangeText={setCollabType}
            style={{ backgroundColor: "#E6E6FA", padding: 12, borderRadius: 10, marginBottom: 15 }}
          />

          {/* Public or Private Switch */}
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 15 }}>
            <Text style={{ fontSize: 16, color: "#7164B4", flex: 1 }}>
              {isPublic ? "Public Project" : "Private Project"}
            </Text>
            <Switch value={isPublic} onValueChange={setIsPublic} />
          </View>

          <TextInput
            placeholder="Number of Teammates Required"
            value={teamSize}
            onChangeText={setTeamSize}
            keyboardType="numeric"
            style={{ backgroundColor: "#E6E6FA", padding: 12, borderRadius: 10, marginBottom: 15 }}
          />

          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontSize: 16, color: "#7164B4", marginBottom: 5 }}>Project Deadline:</Text>
            <TouchableOpacity onPress={showDatePicker} style={{ backgroundColor: "#E6E6FA", padding: 12, borderRadius: 10 }}>
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
            style={{ backgroundColor: "#7164B4", padding: 15, borderRadius: 10, alignItems: "center" }}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Submit Project</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddProjectScreen;
