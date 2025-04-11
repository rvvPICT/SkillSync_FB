// import React, { useState, useEffect } from 'react';
// import Navbar2 from '../../Components/navbar2';
// import { 
//   View, 
//   Text, 
//   StyleSheet, 
//   ScrollView,
//   TouchableOpacity, 
//   SafeAreaView, 
//   Alert,
//   ActivityIndicator
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { fetchUserById } from '../services/users_api';
// import {apply} from '../services/projects_api' ;


// const ViewProject = ({ route }) => {
//   const navigation = useNavigation();
//   const { projectType, project,userId , fromSearch=false } = route.params;
//   const navBarText = projectType === 'myProjects' ? "My Project" : "Public Project";
//   const [memberUsers, setMemberUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isApplying, setIsApplying] = useState(false);
  

//   // Fetch member details
//   useEffect(() => {
//     const fetchMemberDetails = async () => {
//       if (project.members && project.members.length > 0) {
//         setLoading(true);
//         try {
//           const memberPromises = project.members.map(memberId => fetchUserById(memberId));
//           const memberData = await Promise.all(memberPromises);
//           setMemberUsers(memberData.filter(user => user !== null)); // Filter out any failed fetches
//         } catch (error) {
//           console.error("Error fetching member details:", error);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };
//     fetchMemberDetails();
//   }, [project.members]);

//   const handleApply = async () => {
//     if (!userId) {
//       Alert.alert("Error", "User not found! Please login again.");
//       return;
//     }
    
//     console.log(`In the view project file`);
//     setIsApplying(true);
    
//     try {
//       const response = await apply(project._id, userId);
//       Alert.alert("Success", response.message || "Successfully applied for the project!");
//     } catch (error) {
//       console.log("Application error detail:", error);
      
//       // Extract meaningful error message from the error object
//       let errorMessage;
      
//       if (typeof error === 'string') {
//         errorMessage = error;
//       } else if (error.message) {
//         errorMessage = error.message;
//       } else if (error.error) {
//         errorMessage = error.error;
//       } else {
//         errorMessage = "Failed to apply for the project. Please try again.";
//       }
      
//       Alert.alert(
//         "Application Failed", 
//         errorMessage,
//         [{ text: "OK" }]
//       );
//     } finally {
//       setIsApplying(false);
//     }
//   };

//   const navigateToMemberProfile = (memberId) => {
//     navigation.navigate("ViewProfile", { 
//       userId: userId, // Current logged-in user
//       otherId: memberId // The member whose profile to view
//     });
//   };

//   return (
//     <SafeAreaView style={{ flex:1 }}>
//       <Navbar2 route={{ params: { title: navBarText, userId, fromSearch } }} />
//       <View style={{flex:1}}>
//         <ScrollView contentContainerStyle={{ padding: 20 }}>
//           <Text style={styles.title}>{project.title}</Text>
//           <Text style={styles.description}>{project.description}</Text>
//           <Text style={styles.domain_title}>Project Domain:</Text>
//           <Text style={styles.details}>{project.domain}</Text>
//           <Text style={styles.detailLabel}>Skills Required:</Text>
//           <Text style={styles.details}>
//             {project.requiredSkills && project.requiredSkills.length > 0 ? (
//               project.requiredSkills.map((skill, index) => (
//                 <Text key={index}>
//                   {skill}{index < project.requiredSkills.length - 1 ? ", " : ""}
//                 </Text>
//               ))
//             ) : (
//               "No specific skills required"
//             )}
//           </Text>

//           <Text style={styles.detailLabel}>Total Members:</Text>
//           <Text style={styles.details}>{project.teamSize}</Text>

//           {/* Team Members Section */}
//           <Text style={styles.detailLabel}>Team Members:</Text>
//           {loading ? (
//             <ActivityIndicator size="small" color="#7164B4" />
//           ) : (
//             <View style={styles.membersContainer}>
//               {memberUsers.length > 0 ? (
//                 memberUsers.map((member) => (
//                   <TouchableOpacity 
//                     key={member._id}
//                     style={styles.memberItem}
//                     onPress={() => navigateToMemberProfile(member._id)}
//                   >
//                     <Text style={styles.memberUsername}>{member.username}</Text>
//                   </TouchableOpacity>
//                 ))
//               ) : (
//                 <Text style={styles.noMembersText}>No members have joined yet.</Text>
//               )}
//             </View>
//           )}

//           <Text style={styles.detailLabel}>Available Slots:</Text>
//           <Text style={styles.details}>{project.teamSize - (project.members ? project.members.length : 0)}</Text>

//           <Text style={styles.detailLabel}>Deadline for Project:</Text>
//           <Text style={styles.details}>{project.deadline}</Text>

//           {(projectType === "publicProjects" && project.members && !project.members.includes(userId)) && (
//             <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
//               <Text style={styles.buttonTextLight}>Apply</Text>
//             </TouchableOpacity>
//           )}

//           {projectType === "myProjects" && (
//             <View style={styles.buttonsContainer}>
//               <TouchableOpacity 
//                 style={styles.searchBtn}
//                 onPress={() => navigation.navigate('SearchFilters', { 
//                   type: 'mentors', 
//                   userId: userId,
//                   fromProject: true,
//                   projectId: project._id,
//                 })}
//               >
//                 <Text style={styles.buttonText}>Find Mentors</Text>
//               </TouchableOpacity>
              
//               <TouchableOpacity 
//                 style={styles.searchBtn}
//                 onPress={() => navigation.navigate('SearchFilters', { 
//                   type: 'member', 
//                   userId: userId,
//                   fromProject: true,
//                   projectId: project._id,
//                 })}
//               >
//                 <Text style={styles.buttonText}>Find Team Members</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#7164B4',
//     marginBottom: 10,
//   },
//   domain_title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#7164B4',
//     marginBottom: 10,
//   },
//   description: {
//     fontSize: 18,
//     marginBottom: 20,
//   },
//   detailLabel: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginVertical: 10,
//   },
//   details: {
//     fontSize: 18,
//     marginBottom: 20,
//   },
//   backButton: {
//     marginTop: 20,
//     backgroundColor: '#7164B4',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   backButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   applyBtn: {
//     marginTop: 15,
//     backgroundColor: "#7164B4",
//     borderRadius: 8,
//     paddingVertical: 15,
//     alignItems: "center",
//     justifyContent: "center",
//     width: "90%", // Adjust width
//     alignSelf: "center", // Centers the button
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   membersContainer: {
//     marginBottom: 20,
//   },
//   memberItem: {
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     backgroundColor: '#E6E6FA',
//     borderRadius: 8,
//     marginBottom: 8,
//   },
//   memberUsername: {
//     fontSize: 16,
//     color: '#7164B4',
//     fontWeight: '500',
//   },
//   noMembersText: {
//     fontSize: 16,
//     fontStyle: 'italic',
//     color: '#666',
//   },
//   buttonsContainer: {
//     marginTop: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '90%',
//     alignSelf: 'center',
//   },
//   searchBtn: {
//     backgroundColor: "#E6E6FA",
//     borderRadius: 8,
//     paddingVertical: 15,
//     paddingHorizontal: 10,
//     alignItems: "center",
//     justifyContent: "center",
//     width: "48%", // Slightly less than half to create space between buttons
//   },
//   buttonText: {
//     color: "#7164B4",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   buttonTextLight: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default ViewProject;


import React, { useState, useEffect } from 'react';
import Navbar2 from '../../Components/navbar2';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity, 
  SafeAreaView, 
  Alert,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchUserById } from '../services/users_api';
import { apply } from '../services/projects_api';
import { createNotification } from '../services/notification_api';

const ViewProject = ({ route }) => {
  const navigation = useNavigation();
  const { projectType, project, userId, fromSearch = false } = route.params;

  const navBarText = projectType === 'myProjects' ? "My Project" : "Public Project";

  const [memberUsers, setMemberUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  

  useEffect(() => {
    const fetchMemberDetails = async () => {
      if (project?.members?.length > 0) {
        setLoading(true);
        try {
          const memberPromises = project.members.map(memberId => fetchUserById(memberId));
          const memberData = await Promise.all(memberPromises);
          setMemberUsers(memberData.filter(user => user !== null));
        } catch (error) {
          console.error("Error fetching member details:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchMemberDetails();
  }, [project]);
  // ✅ Show loading screen if project is undefined
 
  // const handleApply = async () => {
  //   if (!userId) {
  //     Alert.alert("Error", "User not found! Please login again.");
  //     return;
  //   }

  //   setIsApplying(true);
  //   try {
  //     console.log("Applied for project SuccesFully !") ;
  //     console.log("Project Id :" , project._id) ;
  //     console.log("Owner Id :" , project.ownerId) ;
  //     console.log("Sender Id :" , userId) ;

  //     const response = await apply(project._id, userId);
      

  //     console.log("Notification created sucessfully !") ;

  //     //Alert.alert("Success", response.message || "Successfully applied for the project!");
  //     Alert.alert("Success", response?.data?.msg || "Successfully applied for the project!");

  //   } catch (error) {
  //     console.log("Application error detail:", error);
  //     let errorMessage =
  //       typeof error === 'string' ? error :
  //       error?.message ? error.message :
  //       error?.error ? error.error :
  //       "Failed to apply for the project. Please try again.";
        
  //     Alert.alert("Application Failed", errorMessage, [{ text: "OK" }]);
  //   } finally {
  //     setIsApplying(false);
  //   }
  // };

  // const handleApply = async () => {
  //   try {
  //     const response = await apply(project._id, userId); // API call
  
  //     console.log("📦 apply() API response:", response);
  
  //     // ✅ Correctly access the backend message
  //     Alert.alert("Success", response?.data?.msg || "Successfully applied for the project!");
  //   } catch (error) {
  //     console.log("❌ Application error detail:", error);
  
  //     // ✅ Better error message extraction
  //     let errorMessage =
  //       error?.response?.data?.msg ||
  //       error?.response?.data?.message ||
  //       error?.message ||
  //       "Failed to apply for the project. Please try again.";
  
  //     Alert.alert("Error", errorMessage);
  //   }
  // };

  const handleApply = async () => {
    try {
      console.log("Project Id :" ,project._id ) ;
      console.log("Owner Id :" , project.owner) ;
      console.log("Sender Id :" , userId) ;

      const response = await apply(project._id, userId);
      Alert.alert("Success", response?.data?.msg || "Successfully applied for the project!");
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to apply.");
    }
  };
  
  

  const navigateToMemberProfile = (memberId) => {
    navigation.navigate("ViewProfile", { 
      userId: userId,
      otherId: memberId
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Navbar2 route={{ params: { title: navBarText, userId, fromSearch } }} />
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <Text style={styles.title}>{project.title}</Text>
          <Text style={styles.description}>{project.description}</Text>
          <Text style={styles.domain_title}>Project Domain:</Text>
          <Text style={styles.details}>{project.domain}</Text>

          <Text style={styles.detailLabel}>Skills Required:</Text>
          <Text style={styles.details}>
            {project.requiredSkills?.length > 0 ? (
              project.requiredSkills.map((skill, index) => (
                <Text key={index}>
                  {skill}{index < project.requiredSkills.length - 1 ? ", " : ""}
                </Text>
              ))
            ) : (
              "No specific skills required"
            )}
          </Text>

          <Text style={styles.detailLabel}>Total Members:</Text>
          <Text style={styles.details}>{project.teamSize}</Text>

          {/* Team Members Section */}
          <Text style={styles.detailLabel}>Team Members:</Text>
          {loading ? (
            <ActivityIndicator size="small" color="#7164B4" />
          ) : (
            <View style={styles.membersContainer}>
              {memberUsers.length > 0 ? (
                memberUsers.map((member) => (
                  <TouchableOpacity 
                    key={member._id}
                    style={styles.memberItem}
                    onPress={() => navigateToMemberProfile(member._id)}
                  >
                    <Text style={styles.memberUsername}>{member.username}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.noMembersText}>No members have joined yet.</Text>
              )}
            </View>
          )}

          <Text style={styles.detailLabel}>Available Slots:</Text>
          <Text style={styles.details}>{project.teamSize - (project.members?.length || 0)}</Text>

          <Text style={styles.detailLabel}>Deadline for Project:</Text>
          <Text style={styles.details}>{project.deadline}</Text>

          {(projectType === "publicProjects" && !project.members?.includes(userId)) && (
            <TouchableOpacity style={styles.applyBtn} onPress={handleApply} disabled={isApplying}>
              <Text style={styles.buttonTextLight}>
                {isApplying ? "Applying..." : "Apply"}
              </Text>
            </TouchableOpacity>
          )}

          {projectType === "myProjects" && (
            <View style={styles.buttonsContainer}>
              <TouchableOpacity 
                style={styles.searchBtn}
                onPress={() => navigation.navigate('SearchFilters', { 
                  type: 'mentors', 
                  userId: userId,
                  fromProject: true,
                  projectId: project._id,
                })}
              >
                <Text style={styles.buttonText}>Find Mentors</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.searchBtn}
                onPress={() => navigation.navigate('SearchFilters', { 
                  type: 'member', 
                  userId: userId,
                  fromProject: true,
                  projectId: project._id,
                })}
              >
                <Text style={styles.buttonText}>Find Team Members</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#7164B4',
    marginBottom: 10,
  },
  domain_title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7164B4',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 20,
  },
  detailLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  details: {
    fontSize: 18,
    marginBottom: 20,
  },
  applyBtn: {
    marginTop: 15,
    backgroundColor: "#7164B4",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    alignSelf: "center",
  },
  buttonText: {
    color: "#7164B4",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonTextLight: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  membersContainer: {
    marginBottom: 20,
  },
  memberItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#E6E6FA',
    borderRadius: 8,
    marginBottom: 8,
  },
  memberUsername: {
    fontSize: 16,
    color: '#7164B4',
    fontWeight: '500',
  },
  noMembersText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666',
  },
  buttonsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },
  searchBtn: {
    backgroundColor: "#E6E6FA",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "48%",
  },
});

export default ViewProject;
