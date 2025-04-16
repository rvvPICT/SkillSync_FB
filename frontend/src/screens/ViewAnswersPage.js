import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Navbar2 from "../../Components/navbar2";
import { fetchAnswers } from "../services/qna_api";

// Import avatar images same as in QnAPage
const avatarImages = [
  require('../../assets/img/avatars/avatar1.png'),
  require('../../assets/img/avatars/avatar2.png'),
  require('../../assets/img/avatars/avatar3.png'),
  require('../../assets/img/avatars/avatar4.png'),
  require('../../assets/img/avatars/avatar5.png'),
];

const ViewAnswersPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  
  // Extract all parameters from route
  const { userId, question: questionText, questionId } = route.params || {};
  
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Debug function to inspect answer structure
  const inspectAnswer = (answer) => {
    const debugInfo = {
      hasResponder: !!answer.responder,
      responderType: typeof answer.responder,
      responderValue: answer.responder,
      responderKeys: typeof answer.responder === 'object' && answer.responder !== null ? 
        Object.keys(answer.responder) : []
    };
    
    console.log("Answer debug info:", debugInfo);
    
    // Show alert with debug info
    Alert.alert(
      "Answer Debug Info",
      JSON.stringify(debugInfo, null, 2),
      [{ text: "OK" }]
    );
    
    return debugInfo;
  };

  useEffect(() => {
    const loadData = async () => {
      if (!questionId) {
        setError("No question ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log("Fetching answers for question ID:", questionId);
        const result = await fetchAnswers(questionId);
        
        if (result) {
          console.log("Question data loaded successfully");
          console.log("Question has seeker:", !!result.seeker);
          console.log("Seeker type:", typeof result.seeker);
          
          if (result.answers && result.answers.length > 0) {
            console.log("Sample answer:", result.answers[0]);
            console.log("Answer has responder:", !!result.answers[0].responder);
            console.log("Responder type:", typeof result.answers[0].responder);
            
            if (typeof result.answers[0].responder === 'object' && result.answers[0].responder !== null) {
              console.log("Responder keys:", Object.keys(result.answers[0].responder));
            }
          }
          
          setQuestionData(result);
        } else {
          console.log("No result returned from fetchAnswers");
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

  // Get the avatar index safely, checking all possible avatar paths in the data
  const getAvatarIndex = (item) => {
    // Check if the avatar is directly on the item
    if (item.avatar !== undefined) {
      return item.avatar % 5;
    }
    
    // Check if the avatar is in the responder object
    if (item.responder && typeof item.responder === 'object') {
      if (item.responder.avatar !== undefined) {
        return item.responder.avatar % 5;
      }
    }
    
    // Generate a consistent avatar based on the username or ID if available
    if (item.responder && typeof item.responder === 'object' && item.responder.username) {
      let hash = 0;
      for (let i = 0; i < item.responder.username.length; i++) {
        hash = (hash + item.responder.username.charCodeAt(i)) % 5;
      }
      return hash;
    }
    
    // If no avatar index can be determined, use a fallback based on the item's ID
    if (item._id) {
      return item._id.toString().charCodeAt(0) % 5;
    }
    
    // Default fallback
    return 0;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F8F8" }}>
      <Navbar2 route={{ 
        params: { 
          title: "View Answers", 
          userId,
        } 
      }} />
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
            {/* Display question details */}
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>
                {questionData?.question || questionText || "No question available"}
              </Text>
              
              {questionData?.domain && (
                <Text style={styles.domainText}>Domain: {questionData.domain}</Text>
              )}
              
              {/* Question metadata with seeker info */}
              <View style={styles.userRow}>
                {questionData?.seeker && (
                  <Image 
                    source={avatarImages[
                      questionData.seeker.avatar !== undefined 
                        ? questionData.seeker.avatar % 5 
                        : 0
                    ]} 
                    style={styles.profileImage} 
                  />
                )}
                <Text style={styles.questionMeta}>
                  Asked by: {questionData?.seeker ? 
                    (questionData.seeker.username || questionData.seeker.fullName || "Unknown") 
                    : "Unknown"} • {formatDate(questionData?.createdAt)}
                </Text>
              </View>
            </View>
            
            {/* Counter for answers */}
            <Text style={styles.answerCount}>
              {questionData?.answers?.length || 0} {questionData?.answers?.length === 1 ? "Answer" : "Answers"}
            </Text>
            
            {/* Answer List */}
            <FlatList
              data={questionData?.answers || []}
              keyExtractor={(item, index) => item._id || index.toString()}
              renderItem={({ item }) => {
                // Get avatar index using our utility function
                const avatarIndex = getAvatarIndex(item);
                
                // Extract responder name, prioritizing username, then email, then fallback
                const responderName = item.responder && typeof item.responder === 'object'
                  ? (item.responder.username || item.responder.fullName || item.responder.email || "Anonymous")
                  : "Anonymous";
                
                return (
                  <View style={styles.answerBox}>
                    <View style={styles.userHeaderRow}>
                      <View style={styles.userRow}>
                        <Image 
                          source={avatarImages[avatarIndex]} 
                          style={styles.profileImage} 
                        />
                        <Text style={styles.answerUser}>
                          {responderName}
                        </Text>
                      </View>
                      
                      <TouchableOpacity 
                        style={styles.debugButton}
                        onPress={() => inspectAnswer(item)}
                      >
                        <Text style={styles.debugButtonText}>Inspect</Text>
                      </TouchableOpacity>
                    </View>
                    
                    <Text style={styles.answerText}>{item.answer}</Text>
                    <Text style={styles.answerDate}>
                      {formatDate(item.createdAt)}
                    </Text>
                  </View>
                );
              }}
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
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  userHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderColor: "#7164b4",
    borderWidth: 1.5,
    borderRadius: 20,
    marginRight: 10,
  },
  questionMeta: {
    fontSize: 14,
    color: "#777",
    flex: 1,
  },
  answerCount: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#555",
  },
  debugButton: {
    backgroundColor: "#efefef",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  debugButtonText: {
    fontSize: 12,
    color: "#333",
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
    flex: 1,
  },
  answerText: {
    fontSize: 14,
    color: "#555",
    marginTop: 10,
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