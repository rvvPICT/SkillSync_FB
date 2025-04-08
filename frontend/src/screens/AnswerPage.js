import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Navbar2 from '../../Components/navbar2';

const AnswerPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { user } = route.params;
  const [answer, setAnswer] = useState("");
  const userId = route.params?.userId; // Retrieve userId from navigation params

  console.log("Received User ID:", userId); // Debugging

  const handleSubmit = async() => {
    if (!userId) {
      Alert.alert("Error", "User ID is missing. Please try again.");
      return;
    }
    if (answer.trim() === "") {
      alert("Please enter an answer.");
      return;
    }
    // alert("Answer submitted successfully!");
    // navigation.goBack(); // Go back to QnA page
    try {
      const response = await postAnswer(userId, answer);
      console.log("Added Question:", response);
      
      if (!response.error) {
        Alert.alert("Success",`Answer added successfully!`);
        navigation.navigate("QnA", { forceRefresh: Date.now() });
      } else {
        Alert.alert("Add answer Failed:", response.error);
      }
    } catch (error) {
      console.error("Add answer Failed:", error);
      Alert.alert("Add answer Failed:", "An unexpected error occurred. Please try again.");
    }
  };

  // const handleSubmit = async () => {
  //     if (!userId) {
  //       Alert.alert("Error", "User ID is missing. Please try again.");
  //       return;
  //     }
  //     if (question.trim() === "") {
  //       alert("Please enter a question.");
  //       return;
  //     }
  //     if (!domain) {
  //       alert("Please select a domain.");
  //       return;
  //     }
  //     try {
  //       const questionData = { question, domain };
  //       const response = await postQuestion(userId, questionData);
  //       console.log("Added Question:", response);
        
  //       if (!response.error) {
  //         Alert.alert("Success",`Question added successfully!\nDomain: ${domain}`);
  //         navigation.navigate("QnA", { forceRefresh: Date.now() });
  //       } else {
  //         Alert.alert("Add question Failed:", response.error);
  //       }
  //     } catch (error) {
  //       console.error("Add question Failed:", error);
  //       Alert.alert("Add question Failed:", "An unexpected error occurred. Please try again.");
  //     }
  //   };
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F8F8" }}>
      <Navbar2 title="Answer Question" />
      <View style={styles.container}>
        <Text style={styles.questionText}>{user.question}</Text>
        <TextInput
          style={styles.input}
          multiline
          placeholder="Write your answer here..."
          value={answer}
          onChangeText={setAnswer}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  input: {
    height: 120,
    borderColor: "#7164b4",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#F8F8F8",
    textAlignVertical: "top",
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: "#7164b4",
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AnswerPage;
