import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Navbar2 from '../../Components/navbar2';

const AskQuestionPage = () => {
  const navigation = useNavigation();
  const [question, setQuestion] = useState("");
  const [selectedDomain, setSelectedDomain] = useState(null);

  // List of domains
  const domains = ["Artificial Intelligence", "Blockchain", "Finance", "Retail", "Healthcare"];

  const handleSubmit = () => {
    if (question.trim() === "") {
      alert("Please enter a question.");
      return;
    }
    if (!selectedDomain) {
      alert("Please select a domain.");
      return;
    }
    
    Alert.alert(`Question submitted successfully!\nDomain: ${selectedDomain}`);
    navigation.goBack(); // Go back to QnA page
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F8F8" }}>
      <Navbar2 title="Ask a Question" />
      <View style={styles.container}>
        <Text style={styles.label}>Select a Domain:</Text>
        <View style={styles.domainContainer}>
          {domains.map((domain, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.domainButton,
                selectedDomain === domain && styles.selectedDomain
              ]}
              onPress={() => setSelectedDomain(domain)}
            >
              <Text style={[
                styles.domainText,
                selectedDomain === domain && styles.selectedDomainText
              ]}>
                {domain}
              </Text>
            </TouchableOpacity>
          ))}
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
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  domainButton: {
    borderWidth: 2,
    borderColor: "#7164b4",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedDomain: {
    backgroundColor: "#7164b4",
  },
  domainText: {
    color: "#7164b4",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedDomainText: {
    color: "white",
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