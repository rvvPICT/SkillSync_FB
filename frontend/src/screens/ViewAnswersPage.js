import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Navbar2 from "../../Components/navbar2";
import { fetchAnswers } from "../services/qna_api";

const ViewAnswersPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  
  // Extract all parameters from route
  const { userId, question: questionText, questionId } = route.params || {};
  
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      if (!questionId) {
        setError("No question ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const result = await fetchAnswers(questionId);
        
        if (result) {
          setQuestionData(result);
        } else {
          // If API call fails but we have question text from navigation,
          // we can still show that with empty answers
          if (questionText) {
            setQuestionData({
              question: questionText,
              answers: []
            });
          } else {
            setError("Question not found");
          }
        }
      } catch (err) {
        console.error("Failed to load question:", err);
        
        // Fallback to navigation params if API fails
        if (questionText) {
          setQuestionData({
            question: questionText,
            answers: []
          });
        } else {
          setError("Failed to load question details");
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [questionId, questionText]);

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F8F8" }}>
      <Navbar2 title="View Answers" />
      <View style={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#7164b4" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Display question details - use either API data or navigation params */}
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>
                {questionData?.question || questionText || "No question available"}
              </Text>
              
              {questionData?.domain && (
                <Text style={styles.domainText}>Domain: {questionData.domain}</Text>
              )}
              
              {questionData?.seeker && (
                <Text style={styles.questionMeta}>
                  Asked by: {questionData.seeker.name || "Anonymous"} • {formatDate(questionData.createdAt)}
                </Text>
              )}
            </View>
            
            {/* Counter for answers */}
            <Text style={styles.answerCount}>
              {questionData?.answers?.length || 0} {questionData?.answers?.length === 1 ? "Answer" : "Answers"}
            </Text>
            
            {/* Answer List */}
            <FlatList
              data={questionData?.answers || []}
              keyExtractor={(item, index) => item._id || index.toString()}
              renderItem={({ item }) => (
                <View style={styles.answerBox}>
                  <Text style={styles.answerUser}>
                    {item.responder?.name || "Anonymous"}:
                  </Text>
                  <Text style={styles.answerText}>{item.answer}</Text>
                  <Text style={styles.answerDate}>
                    {formatDate(item.createdAt)}
                  </Text>
                </View>
              )}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No answers available for this question yet.</Text>
              }
            />
            
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  questionContainer: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  domainText: {
    fontSize: 14,
    color: "#7164b4",
    fontWeight: "500",
    marginBottom: 5,
  },
  questionMeta: {
    fontSize: 14,
    color: "#777",
    fontStyle: "italic",
  },
  answerCount: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#555",
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
  answerDate: {
    fontSize: 12,
    color: "#999",
    marginTop: 5,
    textAlign: "right",
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
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 30,
    fontStyle: "italic",
  },
});

export default ViewAnswersPage;