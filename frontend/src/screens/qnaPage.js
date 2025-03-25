// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   SafeAreaView
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Navbar2 from '../../Components/navbar2';
// import Footer from '../../Components/footer';

// const QnAPage = () => {
//   const navigation = useNavigation();

//   const users = [
//     { id: 1, name: "Veda", question: "If you could travel to any country for free, where would you go and why?", profilePicture: require('../../assets/img/notificationPage/manImg.jpg') },
//     { id: 2, name: "Vedika", question: "What’s a movie or TV show you can watch over and over without getting bored?", profilePicture: require('../../assets/img/notificationPage/manImg.jpg') },
//     { id: 3, name: "Riddhi", question: "If you had to compete in a reality show, which one would you pick?", profilePicture: require('../../assets/img/notificationPage/manImg.jpg') },
//     { id: 4, name: "Appu", question: "If you could only use one app on your phone for a week, which one would it be?", profilePicture: require('../../assets/img/notificationPage/manImg.jpg') },
//     { id: 5, name: "Sanika", question: "Would you rather be able to read minds or be invisible? Why?", profilePicture: require('../../assets/img/notificationPage/manImg.jpg') },
//   ];

//   return (
      
//       <SafeAreaView style={{ flex:1 }}>
//         <Navbar2 title="Q and A" />
//         <View style={{flex:1}}>
//           <FlatList
//             data={users}
//             keyExtractor={(item) => item.id.toString()}
//             renderItem={({ item }) => (
//               <View style={styles.box}>
//                 <View style={styles.row}>
//                   <Image source={item.profilePicture} style={styles.profileImage} />
//                   <Text style={styles.item}>{item.name}</Text>
//                 </View>
//                 <Text style={styles.questionText}>{item.question}</Text>
//                 <TouchableOpacity 
//                   style={styles.answerButton} 
//                   onPress={() => navigation.navigate("AnswerPage", { user: item })}
//                 >
//                   <Text style={styles.answerButtonText}>Answer</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity 
//                   style={styles.answerButton} 
//                   onPress={() => navigation.navigate("ViewAnswersPage", { user: item })}
//                 >
//                   <Text style={styles.answerButtonText}>View Answers</Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//           />
//         </View>
//         <Footer page={"qna"} />
//       </SafeAreaView>
      
//   );
// };

// const styles = StyleSheet.create({
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
// });

// export default QnAPage;



import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Navbar2 from '../../Components/navbar2';
import Footer from '../../Components/footer';

const QnAPage = () => {
  const navigation = useNavigation();

  const users = [
    { id: 1, name: "Veda", question: "If you could travel to any country for free, where would you go and why?", profilePicture: require('../../assets/img/notificationPage/manImg.jpg') },
    { id: 2, name: "Vedika", question: "What’s a movie or TV show you can watch over and over without getting bored?", profilePicture: require('../../assets/img/notificationPage/manImg.jpg') },
    { id: 3, name: "Riddhi", question: "If you had to compete in a reality show, which one would you pick?", profilePicture: require('../../assets/img/notificationPage/manImg.jpg') },
    { id: 4, name: "Appu", question: "If you could only use one app on your phone for a week, which one would it be?", profilePicture: require('../../assets/img/notificationPage/manImg.jpg') },
    { id: 5, name: "Sanika", question: "Would you rather be able to read minds or be invisible? Why?", profilePicture: require('../../assets/img/notificationPage/manImg.jpg') },
  ];

  return (
    <SafeAreaView style={{ flex:1 }}>
      <Navbar2 title="Q and A" />
      <View style={{ flex:1 }}>
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.box}>
              <View style={styles.row}>
                <Image source={item.profilePicture} style={styles.profileImage} />
                <Text style={styles.item}>{item.name}</Text>
              </View>
              <Text style={styles.questionText}>{item.question}</Text>
              <TouchableOpacity 
                style={styles.answerButton} 
                onPress={() => navigation.navigate("AnswerPage", { user: item })}
              >
                <Text style={styles.answerButtonText}>Answer</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.answerButton} 
                onPress={() => navigation.navigate("ViewAnswersPage", { user: item })}
              >
                <Text style={styles.answerButtonText}>View Answers</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      {/* Floating Plus Button with Purple Border and Purple + Sign */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate("AskQuestion")}
      >
        <Icon name="add" size={30} color="#7164b4" />  
      </TouchableOpacity>

      <Footer page={"qna"} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    bottom: 70,  // Positioned above the footer
    right: 20,
    backgroundColor: "white", // White background
    borderWidth: 2, // Border thickness
    borderColor: "#7164b4", // Purple border
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
