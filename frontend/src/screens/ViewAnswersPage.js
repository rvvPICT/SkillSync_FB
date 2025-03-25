import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Navbar2 from "../../Components/navbar2";

const ViewAnswersPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { user } = route.params || {}; // Ensure it doesn't break if undefined

  console.log("Received user data:", user); // Debugging

  const [answers, setAnswers] = useState([
    { id: 1, name: "John", answer: "I would go to Japan because of its rich culture and amazing food!" },
    { id: 2, name: "Emily", answer: "Paris! I’ve always wanted to see the Eiffel Tower at night." },
    { id: 3, name: "Michael", answer: "Italy, for the history, art, and pizza!" },
  ]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F8F8" }}>
      <Navbar2 title="View Answers" />
      <View style={styles.container}>
        {/* Display the original question */}
        <Text style={styles.questionText}>{user?.question || "No question available"}</Text>

        {/* Answer List */}
        <FlatList
          data={answers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.answerBox}>
              <Text style={styles.answerUser}>{item.name}:</Text>
              <Text style={styles.answerText}>{item.answer}</Text>
            </View>
          )}
        />

        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
    textAlign: "center",
  },
  answerBox: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  answerUser: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  answerText: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: "#7164b4",
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: "center",
  },
  backButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ViewAnswersPage;
