// ViewProject.js
import React from 'react';

import Navbar2 from '../../Components/navbar2';

import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  Alert
} from 'react-native';


const ViewProject = ({ route, navigation }) => {
  const { projectType, project, userId } = route.params; // Getting the project data passed from the previous screen
  const navBarText = projectType === 'myProjects' ? "My Project" : "Public Project";


  const applied = () => {
    Alert.alert("Applied!");
    navigation.navigate("Home", { userId });
  };

  return (

  <SafeAreaView style={{ flex:1 }}>
    <Navbar2 title={navBarText} />
    <View style={{flex:1}}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.title}>{project.title}</Text>
        <Text style={styles.description}>{project.description}</Text>

        <Text style={styles.detailLabel}>Skills Required:</Text>
        {/* <Text style={styles.details}>{project.requiredskills.join(", ")}</Text> */}

        <Text style={styles.details}>
          {project.requiredSkills.map((skill, index) => (
            <Text key={index}>
              {skill}{index < project.requiredSkills.length - 1 ? ", " : ""}
            </Text>
          ))}
        </Text>

        <Text style={styles.detailLabel}>Total Members:</Text>
        <Text style={styles.details}>{project.teamSize}</Text>

        <Text style={styles.detailLabel}>Available Slots:</Text>
        <Text style={styles.details}>{project.teamSize - project.members.length}</Text>

        <Text style={styles.detailLabel}>Deadline for Project:</Text>
        <Text style={styles.details}>{project.deadline}</Text>

        {projectType === "publicProjects" && (
          <TouchableOpacity style={styles.applyBtn} onPress={applied}>
            <Text style={styles.buttonText}>Apply</Text>
          </TouchableOpacity>
        )}

      </ScrollView>
    </View>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#7164B4',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 20,
  },
  detailLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  details: {
    fontSize: 18,
    marginBottom: 20,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#7164B4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  applyBtn: {
    marginTop: 15,
    backgroundColor: "#7164B4",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "90%", // Adjust width
    alignSelf: "center", // Centers the button
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ViewProject;
