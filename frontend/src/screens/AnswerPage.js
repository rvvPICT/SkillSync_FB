import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Navbar2 from '../../Components/navbar2';
import { postAnswer } from '../services/qna_api';  // Update the path if needed

const AnswerPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { question, questionId, userId } = route.params;
  // const { question, userId } = route.params;
  const [answer, setAnswer] = useState("");
  //const userId = route.params?.userId; // Retrieve userId from navigation params

  
  console.log("Received User ID:", userId);
  console.log("Received Question ID:", questionId); // Debugging
  const handleSubmit = async () => {
    // Input validation
    if (!userId) {
      Alert.alert("Error", "User ID is missing. Please try again.");
      return;
    }
    
    if (!questionId) {
      Alert.alert("Error", "Question ID is missing. Please try again.");
      return;
    }
    
    if (answer.trim() === "") {
      Alert.alert("Error", "Please enter an answer.");
      return;
    }

    try {
      // Prepare data for API call
      const answerData = {
        responder: userId,
        answer: answer.trim()
      };
      
      console.log("Submitting answer for questionId:", questionId);
      console.log("Answer data being sent:", answerData);
      
      // Send to API
      const response = await postAnswer(questionId, answerData);
      console.log("API Response:", response);
      
      if (response && !response.error) {
        Alert.alert("Success", "Answer added successfully!");
        navigation.navigate("QnA", { forceRefresh: Date.now(), userId });
      } else {
        const errorMsg = response?.error || "Failed to add answer";
        Alert.alert("Error", errorMsg);
      }
    } catch (error) {
      console.error("Add answer Failed:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F8F8" }}>
      {/* <Navbar2 title="Answer Question" /> */}
      <Navbar2 route={{ params: { title: "Answer Question", userId } }} />

      <View style={styles.container}>
        {/* <Text style={styles.questionText}>{user.question}</Text> */}
        <Text style={styles.questionText}>{question}</Text>
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