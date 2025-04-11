// import React from 'react';
// import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image, SafeAreaView ,useState } from 'react-native';
// import Navbar2 from '../../Components/navbar2'
// import { fetchUserNotifications } from '../services/notification_api';
// function NotificationPage({route}) {
//   const {userId} = route.params || {} ;
//   const [notifications , setNotifications] = useState([]) ;
//   const [loading , setLoading] = useState(true) ;

//   const loadNotifications = async () => {
//     try{
//       setLoading(true) ;
//       const data = await fetchUserNotifications(userId) ;
//       setNotifications(data);
//       setLoading(false) ;
//     }catch(err){
//       console.log("error fetching notifications :" , err) ;
//     }
//   };

//   const handleRespond = async (notificationId, response) => {
//     try {
//       await updateNotificationStatus(notificationId, response);
//       loadNotifications(); // reload to reflect new status
//     } catch (err) {
//       console.error('Error updating notification:', err);
//     }
//   };

//   useEffect(() => {
//     loadNotifications();
//   }, []);

//   return (
//     <View style={{ flex: 1, backgroundColor: "#F8F8F8" }}>
//       {/* Navbar2 at the top */}
//       <Navbar2 route={{ params: { title: "Notifications", userId } }} />
//       <SafeAreaView style={{ marginBottom: 40 }}>
//         <FlatList
//           data={users}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item }) => (
//             <View style={styles.box}>
//               <View style={styles.row}>
//                 {/* Profile Picture */}
//                 <Image source={item.profilePicture} style={styles.profileImage} />
//                 <Text style={styles.item}>{item.name}</Text>
//                 <TouchableOpacity style={styles.viewButton} onPress={() => {}}>
//                   <Text style={styles.viewButtonText}>View Project</Text>
//                 </TouchableOpacity>
//               </View>
//               {/* Request Text on Next Line */}
//               <Text style={styles.requestText}>Requested you to be a {item.request} for their project.</Text>
//               <View style={styles.buttonRow}>
//                 {/* Accept Request Button */}
//                 <TouchableOpacity style={styles.acceptButton} onPress={() => {}}>
//                   <Text style={styles.viewButtonText}>Accept Request</Text>
//                 </TouchableOpacity>
//                 {/* Reject Request Button */}
//                 <TouchableOpacity style={styles.rejectButton} onPress={() => {}}>
//                   <Text style={styles.rejectButtonText}>Reject Request</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           )}
//         />
//       </SafeAreaView>
//     </View>
//   );
// }

import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image, SafeAreaView, ActivityIndicator
} from 'react-native';
import Navbar2 from '../../Components/navbar2';
import { useNavigation } from '@react-navigation/native';
import { fetchUserNotifications, updateNotificationStatus } from '../services/notification_api.js';

function NotificationPage({ route }) {
  const { userId } = route.params || {};
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation() ;
  const avatarImages = {
    0: require("../../assets/img/avatars/avatar1.png"),
    1: require("../../assets/img/avatars/avatar2.png"),
    2: require("../../assets/img/avatars/avatar3.png"),
    3: require("../../assets/img/avatars/avatar4.png"),
    4: require("../../assets/img/avatars/avatar5.png"),
  };
  const loadNotifications = async () => {
    try {
      setLoading(true);
      console.log("Fetching Notifications !") ;
      console.log("User Id  :" , userId) ;
      const data = await fetchUserNotifications(userId);
      setNotifications(data.notifications);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  const handleRespond = async (notificationId, response) => {
    try {
      console.log("Updating Notifications")
      await updateNotificationStatus(notificationId, response);
      loadNotifications(); // reload to reflect new status
    } catch (err) {
      console.error('Error updating notification:', err);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F8" }}>
      <Navbar2 route={{ params: { title: "Notifications", userId } }} />
      <SafeAreaView style={{ marginBottom: 40 }}>

        {loading ? (
          <ActivityIndicator size="large" color="#7164b4" />
        ) : (
          <FlatList
            data={notifications}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.box}>
                <View style={styles.row}>
                <Image
                  source={avatarImages[item.sender.avatar] || avatarImages[0]}
                  style={styles.profileImage}
                />

                  <Text style={styles.item}>{item.sender.username}</Text>
                  {/* <TouchableOpacity style={styles.viewButton} onPress={handleViewProject(item.)}>
                    <Text style={styles.viewButtonText}>View Project</Text>
                  </TouchableOpacity> */}

                  <TouchableOpacity
                      style={styles.viewButton}
                      onPress={() =>
                        navigation.navigate('ViewProject', {
                          projectType: 'publicProjects', // or 'myProjects' depending on context
                          project: item.project,
                          userId: currentUserId, // pass the appropriate userId
                          fromSearch: true, // or false depending on source
                        })
                      } 
                  >
                  <Text style={styles.viewButtonText}>View Project</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.requestText}>
                  {item.type === 'invite'
                    ? `Invited you to join as a member of "${item.project.title}"`
                    : `Applied to join your project "${item.project.title}"`}
                </Text>

                {item.status === 'pending' ? (
                  <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.acceptButton} onPress={() => handleRespond(item._id, 'accepted')}>
                      <Text style={styles.viewButtonText}>Accept Request</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.rejectButton} onPress={() => handleRespond(item._id, 'rejected')}>
                      <Text style={styles.rejectButtonText}>Reject Request</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Text style={{ marginTop: 5, fontStyle: 'italic' }}>Status: {item.status}</Text>
                )}
              </View>
            )}
            ListEmptyComponent={
              <View style={{ alignItems: 'center', marginTop: 30 }}>
                <Text style={{ fontSize: 18, color: '#999' }}>No notifications yet</Text>
              </View>
            }
          />
        )}
      </SafeAreaView>
    </View>
  );
}


const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: "black",
  },
  item: {
    fontSize: 20,
    flex: 1,
    color: "black",
  },
  requestText: {
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
  viewButton: {
    backgroundColor: "#7164b4",
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    height: 40,
    width: 120,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  viewButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  acceptButton: {
    backgroundColor: "#7164b4",
    borderRadius: 5,
    paddingVertical: 10,
    width: 130,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  rejectButton: {
    backgroundColor: "white",
    borderColor: "#7164b4",
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  rejectButtonText: {
    color: "#7164b4",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NotificationPage;