// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   SafeAreaView,
//   ActivityIndicator
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import Navbar2 from '../../Components/navbar2';
// import Footer from '../../Components/footer';
// import { fetchQuestions } from '../services/qna_api.js'; // API call for fetching questions
// import { fetchUserById } from '../services/users_api.js'; // API call for fetching user details

// const avatarImages = [
//   require('../../assets/img/avatars/avatar1.png'),
//   require('../../assets/img/avatars/avatar2.png'),
//   require('../../assets/img/avatars/avatar3.png'),
//   require('../../assets/img/avatars/avatar4.png'),
//   require('../../assets/img/avatars/avatar5.png'),

// ]; // Predefined avatars

// const QnAPage = ({ route }) => {
//   const navigation = useNavigation();
//   const userId = route.params.userId;
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [userData, setUserData] = useState(null);


//   useEffect(() => {
//     const loadQuestions = async () => {
//       try {
//         const fetchedQuestions = await fetchQuestions(); // Fetch questions from backend
//         setQuestions(fetchedQuestions);
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     loadQuestions();
//   }, []);

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#7164b4" />
//       </SafeAreaView>
//     );
//   }


//     const loadUserData = async (item) => {
//       const getUserData = await fetchUserById(item.seeker);
//       if (getUserData) setUserData(getUserData);
//       return getUserData;
//     }


//   const renderItem = ({ item }) => {
//     return(
//     <View style={styles.box}>
//       <View style={styles.row}>
//         <Image 
//           source={avatarImages[loadUserData(item).avatar%5]|| avatarImages[0]} 
//           style={styles.profileImage} 
//         />
//                 {/* <Text style={styles.item}>{loadUserData(item).fullName || loadUserData(item).username}</Text> */}
//               <Text style={styles.item}>{loadUserData(item).username}</Text>
//               </View>
//               <Text style={styles.questionText}>{item.question}</Text>
//               <TouchableOpacity
//                 style={styles.answerButton}
//                 onPress={() => navigation.navigate("AnswerPage", { userId ,  question: item.question , questionId: item._id})}
//               >
//                 <Text style={styles.answerButtonText}>Answer</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.answerButton}
//                 onPress={() => navigation.navigate("ViewAnswersPage", { userId ,  question: item.question , questionId: item._id })}
//               >
//                 <Text style={styles.answerButtonText}>View Answers</Text>
//               </TouchableOpacity>
//             </View>
//     );
//   }

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       {/* <Navbar2 title="Q and A" /> */}
//       <Navbar2 route={{ 
//         params: { 
//           title: "Q and A", 
//           userId,
//         } 
//       }} />
//       <View style={{ flex: 1 }}>
//         <FlatList
//           data={questions}
//           keyExtractor={(item) => item._id}
//           renderItem={renderItem}
//         />
//       </View>

//       {/* Floating Plus Button to Ask Question */}
//       <TouchableOpacity
//         style={styles.fab}
//         onPress={() => navigation.navigate("AskQuestionPage", { userId })}
//       >
//         <Icon name="add" size={30} color="#7164b4" />
//       </TouchableOpacity>

//       {/* <Footer page={"qna"} /> */}
//       <Footer route={{ params: { page: "qna", userId } }} />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   loaderContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   item: {
//     fontSize: 20,
//     flex: 1,
//     color: "black",
//     fontWeight: "bold",
//   },
//   questionText: {
//     fontSize: 16,
//     color: "black",
//     marginVertical: 5,
//   },
//   box: {
//     borderWidth: 2,
//     margin: 5,
//     backgroundColor: "white",
//     borderColor: "#7164b4",
//     padding: 10,
//     borderRadius: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.5,
//     elevation: 5,
//   },
//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   profileImage: {
//     width: 50,
//     height: 50,
//     borderColor: "#7164b4",
//     borderWidth: 2,
//     borderRadius: 25,
//     marginRight: 10,
//   },
//   answerButton: {
//     backgroundColor: "#7164b4",
//     borderRadius: 5,
//     paddingVertical: 10,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 10,
//     height: 40,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   answerButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   fab: {
//     position: 'absolute',
//     bottom: 70,
//     right: 20,
//     backgroundColor: "white",
//     borderWidth: 2,
//     borderColor: "#7164b4",
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     alignItems: "center",
//     justifyContent: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//     elevation: 5,
//   },
// });

// export default QnAPage;



import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Navbar2 from '../../Components/navbar2';
import Footer from '../../Components/footer';
import { fetchQuestions } from '../services/qna_api.js';
import { fetchUserById } from '../services/users_api.js';

const avatarImages = [
  require('../../assets/img/avatars/avatar1.png'),
  require('../../assets/img/avatars/avatar2.png'),
  require('../../assets/img/avatars/avatar3.png'),
  require('../../assets/img/avatars/avatar4.png'),
  require('../../assets/img/avatars/avatar5.png'),
];

const QnAPage = ({ route }) => {
  const navigation = useNavigation();
  const userId = route.params.userId;
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usersData, setUsersData] = useState({}); // Store user data by ID

  // Load questions from API
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const fetchedQuestions = await fetchQuestions();
        setQuestions(fetchedQuestions);
        
        // After getting questions, load all user data for the question authors
        const userIds = [...new Set(fetchedQuestions.map(q => q.seeker))];
        const userDataPromises = userIds.map(async (id) => {
          try {
            const userData = await fetchUserById(id);
            return { id, userData };
          } catch (err) {
            console.error(`Error fetching user ${id}:`, err);
            return { id, userData: null };
          }
        });
        
        const usersDataArray = await Promise.all(userDataPromises);
        
        // Convert array to object with userId as keys
        const usersDataObj = {};
        usersDataArray.forEach(item => {
          if (item.userData) {
            usersDataObj[item.id] = item.userData;
          }
        });
        
        setUsersData(usersDataObj);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };
  
    loadQuestions();
  }, []);

  // Get user data for a question
  const getUserData = (seekerId) => {
    return usersData[seekerId] || { username: "Unknown User", avatar: 0 };
  };

  const renderItem = ({ item }) => {
    const user = getUserData(item.seeker);
    const avatarIndex = user.avatar !== undefined ? user.avatar % 5 : 0;
    
    return (
      <View style={styles.box}>
        <View style={styles.row}>
          <Image 
            source={avatarImages[avatarIndex]} 
            style={styles.profileImage} 
          />
          <Text style={styles.item}>
            {user.fullName || user.username || "Unknown User"}
          </Text>
        </View>
        <Text style={styles.questionText}>{item.question}</Text>
        <TouchableOpacity
          style={styles.answerButton}
          onPress={() => navigation.navigate("AnswerPage", { 
            userId, 
            question: item.question, 
            questionId: item._id
          })}
        >
          <Text style={styles.answerButtonText}>Answer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.answerButton}
          onPress={() => navigation.navigate("ViewAnswersPage", { 
            userId, 
            question: item.question, 
            questionId: item._id 
          })}
        >
          <Text style={styles.answerButtonText}>View Answers</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#7164b4" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Navbar2 route={{ 
        params: { 
          title: "Q and A", 
          userId,
        } 
      }} />
      <View style={{ flex: 1 }}>
        <FlatList
          data={questions}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No questions available</Text>
            </View>
          }
        />
      </View>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AskQuestionPage", { userId })}
      >
        <Icon name="add" size={30} color="#7164b4" />
      </TouchableOpacity>

      <Footer route={{ params: { page: "qna", userId } }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
  item: {
    fontSize: 20,
    flex: 1,
    color: "black",
    fontWeight: "bold",
  },
  questionText: {
    fontSize: 16,
    color: "black",
    marginVertical: 5,
  },
  box: {
    borderWidth: 2,
    margin: 5,
    backgroundColor: "white",
    borderColor: "#7164b4",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderColor: "#7164b4",
    borderWidth: 2,
    borderRadius: 25,
    marginRight: 10,
  },
  answerButton: {
    backgroundColor: "#7164b4",
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    height: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  answerButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  fab: {
    position: 'absolute',
    bottom: 70,
    right: 20,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#7164b4",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default QnAPage;