import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Navbar2 from '../../Components/navbar2';
import { postQuestion } from '../services/qna_api';
import DomainAccordion from "../../Components/Skills_and_Domains/DomainAccordian";

const AskQuestionPage = ({route}) => {
  const navigation = useNavigation();
  const userId = route.params?.userId; // Retrieve userId from navigation params

  console.log("Received User ID:", userId); // Debugging

  const [question, setQuestion] = useState("");
  const [domain, setDomain] = useState("");

  const handleSubmit = async () => {
    if (!userId) {
      Alert.alert("Error", "User ID is missing. Please try again.");
      return;
    }
    
    if (question.trim() === "") {
      Alert.alert("Error", "Please enter a question.");
      return;
    }
    
    if (!domain.trim()) {
      Alert.alert("Error", "Please select a domain.");
      return;
    }
    
    try {
      const questionData = { userId, question, domain };
      const response = await postQuestion(questionData);
      console.log("Added Question:", response);
      
      if (!response.error) {
        Alert.alert("Success", `Question added successfully!\nDomain: ${domain}`);
        navigation.navigate("QnA", { forceRefresh: Date.now() });
      } else {
        Alert.alert("Add question Failed", response.error);
      }
    } catch (error) {
      console.error("Add question Failed:", error);
      Alert.alert("Add question Failed", "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F8F8" }}>
      <Navbar2 route={{ params: { title: "Ask a Question", userId } }} />
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.label}>Select a Domain:</Text>
          <View style={styles.domainContainer}>
            <DomainAccordion
              initialDomain={domain}
              onDomainChange={(val) => {
                console.log("✅ Domain selected:", val);
                setDomain(val);
              }}
            />
          </View>

          <Text style={styles.label}>Your Question:</Text>
          <TextInput
            style={styles.input}
            multiline
            placeholder="Write your question here..."
            value={question}
            onChangeText={setQuestion}
          />
          
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  domainContainer: {
    marginBottom: 15,
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

export default AskQuestionPage;