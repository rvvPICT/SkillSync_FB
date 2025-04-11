// import { SafeAreaView, View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
// import Navbar2 from "../../Components/navbar2";
// import Footer from "../../Components/footer";
// import { useNavigation } from "@react-navigation/native";

// import { fetchAllUsers, fetchAllMentors, fetchAllUsersExceptLoggedIn } from "../services/users_api";
// import { fetchPublicProjects } from "../services/projects_api";

// const SearchFilters = ({ route }) => {
//   const navigation = useNavigation();
//   const [search, setSearch] = useState("");
//   const [selectedFilters, setSelectedFilters] = useState([]);
//   const [teamMembers, setTeamMembers] = useState([]);
//   const [mentors, setMentors] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // Safely extract parameters with fallbacks
//   const { 
//     type = "member", 
//     fromProject = false, 
//     projectId = null,
//     userId = null 
//   } = route.params || {};
  
//   // Get userId from route params
//   const loggedinId = userId;

//   // Debug logging
//   useEffect(() => {
//     console.log("📱 SearchFilters - Received route params:", route.params);
//     console.log("📱 SearchFilters - Using userId:", loggedinId);
    
//     if (!loggedinId) {
//       console.warn("⚠️ SearchFilters - No userId received!");
//     }
//   }, [route.params, loggedinId]);

//   // Determine what filter options to show based on type
//   const filterOptions = type === "project" ? 
//     ["Artificial Intelligence", "Retail", "Healthcare", "Blockchain", "Finance"] : 
//     ["AI", "ML", "Web Dev", "React", "Blockchain", "Python", "Django", "Cloud", "AWS", "Cybersecurity"];

//   useEffect(() => {
//     const getData = async () => {
//       setLoading(true);
//       try {
//         if (!loggedinId) {
//           console.warn("⚠️ Cannot fetch data without userId");
//           setLoading(false);
//           return;
//         }

//         if (type === "project") {
//           const projectData = await fetchPublicProjects();
//           setProjects(projectData);
//         } else if (type === "mentors") {
//           const mentorData = await fetchAllMentors();
//           setMentors(mentorData);
//         } else {
//           const teamData = await fetchAllUsersExceptLoggedIn(loggedinId);
//           setTeamMembers(teamData);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getData();
//   }, [type, loggedinId]);

//   const toggleFilter = (filter) => {
//     setSelectedFilters(prev =>
//       prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
//     );
//   };

//   // Get current data based on type
//   const getCurrentData = () => {
//     if (type === "project") return projects;
//     if (type === "mentors") return mentors;
//     return teamMembers;
//   };

//   // Filter the data based on search text and selected filters
//   const getFilteredData = () => {
//     const currentData = getCurrentData();
    
//     return currentData.filter(item => {
//       // First check if item matches search text
//       const nameMatch = 
//         (item.name?.toLowerCase() || "").includes(search.toLowerCase()) || 
//         (item.title?.toLowerCase() || "").includes(search.toLowerCase()) ||
//         (item.username?.toLowerCase() || "").includes(search.toLowerCase()) ||
//         (item.fullName?.toLowerCase() || "").includes(search.toLowerCase());
      
//       if (!nameMatch) return false;
      
//       // If no filters selected, return all items that match text search
//       if (selectedFilters.length === 0) return true;
      
//       // Check if item matches selected filters
//       if (type === "project") {
//         return selectedFilters.includes(item.domain);
//       } else {
//         // For users/mentors, check if they have any of the selected skills
//         return item.skills?.some(skill => selectedFilters.includes(skill));
//       }
//     });
//   };

//   const handleSendInvite = (otherId) => {
//     // Ensure userId is included in navigation params
//     navigation.navigate('ViewProfile', { 
//       userId: loggedinId, 
//       otherId, 
//       fromSearch: true, 
//       fromProject: true, 
//       projectId: projectId 
//     });
//   };

//   const renderItem = ({ item }) => {
//     const displayName = item.name || item.title || item.username || item.fullName || "Unknown";
    
//     return (
//       <View style={styles.card}>
//         <View style={styles.cardContent}>
//           <Text style={styles.cardText}>{displayName}</Text>
//           {type === "project" && item.domain && (
//             <Text style={styles.cardSubText}>Domain: {item.domain}</Text>
//           )}
//           {(type === "mentors" || type === "member") && item.skills && (
//             <Text style={styles.cardSubText}>Skills: {item.skills?.join(", ")}</Text>
//           )}
//         </View>
        
//         {/* Show different actions based on context */}
//         <View style={styles.cardActions}>
//           {/* View profile button */}
//           <TouchableOpacity 
//             style={styles.viewProfileBtn}
//             onPress={() => {
//               if (type === "project") {
//                 navigation.navigate("ViewProject", { 
//                   projectType: "publicProjects", 
//                   project: item, 
//                   userId: loggedinId,
//                   fromSearch: true,
//                   fromSearchFilters: true,
//                 });
//               } else {
//                 navigation.navigate("ViewProfile", { 
//                   userId: loggedinId, 
//                   otherId: item._id,
//                   fromSearch: true,
//                   fromSearchFilters: true,
//                 });
//               }
//             }}
//           >
//             <Text style={styles.btnText}>View {type === "project" ? "Project" : "Profile"}</Text>
//           </TouchableOpacity>
          
//           {/* Send invite button - only show for users when fromProject is true */}
//           {fromProject && projectId && (
//             <TouchableOpacity 
//               style={styles.inviteBtn}
//               onPress={() => handleSendInvite(item._id)}
//             >
//               <Text style={styles.btnText}>Send Invite</Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>
//     );
//   };

//   const searchTitle = `Search for ${type === "project" ? "Projects" : type === "mentors" ? "Mentors" : "Team Members"}`;

//   // If we don't have a userId, show an error state
//   if (!loggedinId) {
//     return (
//       <SafeAreaView style={{ flex: 1 }}>
//         <View style={styles.errorContainer}>
//           <Text style={styles.errorText}>Missing user ID. Please try again.</Text>
//           <TouchableOpacity 
//             style={styles.errorButton}
//             onPress={() => navigation.navigate("Search")}
//           >
//             <Text style={styles.errorButtonText}>Go to Search</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <Navbar2 route={{ 
//         params: { 
//           title: searchTitle, 
//           userId: loggedinId,
//           type: type
//         } 
//       }} />
      
//       <View style={styles.container}>
//         <TextInput
//           style={styles.searchBar}
//           placeholder="Search by name..."
//           value={search}
//           onChangeText={setSearch}
//         />
        
//         <Text style={styles.filterLabel}>
//           Filter by {type === "project" ? "Domain" : "Skills"}:
//         </Text>
        
//         <View style={styles.filterContainer}>
//           {filterOptions.map((filter, index) => (
//             <TouchableOpacity
//               key={index}
//               style={[
//                 styles.filterButton, 
//                 selectedFilters.includes(filter) && styles.selectedFilter
//               ]}
//               onPress={() => toggleFilter(filter)}
//             >
//               <Text style={[
//                 styles.filterText,
//                 selectedFilters.includes(filter) && styles.selectedFilterText
//               ]}>
//                 {filter}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
        
//         {loading ? (
//           <View style={styles.loaderContainer}>
//             <ActivityIndicator size="large" color="#9370DB" />
//             <Text style={styles.loaderText}>Loading data...</Text>
//           </View>
//         ) : (
//           <FlatList
//             data={getFilteredData()}
//             keyExtractor={(item, index) => item._id?.toString() || item.id?.toString() || index.toString()}
//             renderItem={renderItem}
//             ListEmptyComponent={
//               <View style={styles.emptyContainer}>
//                 <Text style={styles.emptyText}>
//                   No {type === "project" ? "projects" : type === "mentors" ? "mentors" : "team members"} found matching your criteria.
//                 </Text>
//               </View>
//             }
//           />
//         )}
//       </View>
      
//       <Footer route={{ params: { page: "search", userId: loggedinId } }} />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 15,
//   },
//   searchBar: {
//     height: 50,
//     borderColor: "#9370DB",
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingLeft: 15,
//     marginBottom: 15,
//     fontSize: 16,
//   },
//   filterLabel: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   filterContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     marginBottom: 15,
//   },
//   filterButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: "#9370DB",
//     marginRight: 10,
//     marginBottom: 10,
//   },
//   selectedFilter: {
//     backgroundColor: "#9370DB",
//   },
//   filterText: {
//     color: "#7164b4",
//     fontWeight: "500",
//   },
//   selectedFilterText: {
//     color: "white",
//   },
//   card: {
//     padding: 20,
//     backgroundColor: "#F0F0FF",
//     borderRadius: 10,
//     marginBottom: 12,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.22,
//     shadowRadius: 2.22,
//   },
//   cardContent: {
//     marginBottom: 10,
//   },
//   cardActions: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
//   viewProfileBtn: {
//     backgroundColor: "#7164b4",
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     flex: 1,
//     marginRight: 5,
//     alignItems: "center",
//   },
//   inviteBtn: {
//     backgroundColor: "#4CAF50",
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     flex: 1,
//     marginLeft: 5,
//     alignItems: "center",
//   },
//   btnText: {
//     color: "white",
//     fontWeight: "500",
//   },
//   cardText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   cardSubText: {
//     fontSize: 14,
//     color: "#666",
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   loaderText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: "#666",
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   errorText: {
//     fontSize: 18,
//     color: "#e53935",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   errorButton: {
//     backgroundColor: "#7164b4",
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//   },
//   errorButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "500",
//   },
//   emptyContainer: {
//     padding: 20,
//     alignItems: "center",
//   },
//   emptyText: {
//     fontSize: 16,
//     color: "#666",
//     textAlign: "center",
//   },
// });

// export default SearchFilters;


import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import Navbar2 from "../../Components/navbar2";
import Footer from "../../Components/footer";
import { useNavigation } from "@react-navigation/native";
import SkillsAccordion from "../../Components/Skills_and_Domains/SkillsAccordion.js";
import DomainAccordion from "../../Components/Skills_and_Domains/DomainAccordian.js";

import { fetchAllUsers, fetchAllMentors, fetchAllUsersExceptLoggedIn } from "../services/users_api";
import { fetchPublicProjects } from "../services/projects_api";

const SearchFilters = ({ route }) => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Safely extract parameters with fallbacks
  const { 
    type = "member", 
    fromProject = false, 
    projectId = null,
    userId = null 
  } = route.params || {};
  
  // Get userId from route params
  const loggedinId = userId;

  // Debug logging
  useEffect(() => {
    console.log("📱 SearchFilters - Received route params:", route.params);
    console.log("📱 SearchFilters - Using userId:", loggedinId);
    
    if (!loggedinId) {
      console.warn("⚠️ SearchFilters - No userId received!");
    }
  }, [route.params, loggedinId]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        if (!loggedinId) {
          console.warn("⚠️ Cannot fetch data without userId");
          setLoading(false);
          return;
        }

        if (type === "project") {
          const projectData = await fetchPublicProjects();
          setProjects(projectData);
        } else if (type === "mentors") {
          const mentorData = await fetchAllMentors();
          setMentors(mentorData);
        } else {
          const teamData = await fetchAllUsersExceptLoggedIn(loggedinId);
          setTeamMembers(teamData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [type, loggedinId]);

  // Handle skills selection from SkillsAccordion
  const handleSkillsChange = (skills) => {
    setSelectedFilters(skills);
  };

  // Handle domain selection from DomainAccordion
  const handleDomainChange = (domain) => {
    setSelectedDomain(domain);
  };

  // Get current data based on type
  const getCurrentData = () => {
    if (type === "project") return projects;
    if (type === "mentors") return mentors;
    return teamMembers;
  };

  // Filter the data based on search text and selected filters
  const getFilteredData = () => {
    const currentData = getCurrentData();
    
    return currentData.filter(item => {
      // First check if item matches search text
      const nameMatch = 
        (item.name?.toLowerCase() || "").includes(search.toLowerCase()) || 
        (item.title?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (item.username?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (item.fullName?.toLowerCase() || "").includes(search.toLowerCase());
      
      if (!nameMatch) return false;
      
      // If no filters selected, return all items that match text search
      if (type === "project") {
        if (!selectedDomain) return true;
        return item.domain === selectedDomain;
      } else {
        // For users/mentors, check if they have any of the selected skills
        if (selectedFilters.length === 0) return true;
        return item.skills?.some(skill => selectedFilters.includes(skill));
      }
    });
  };

  const handleSendInvite = (otherId) => {
    // Ensure userId is included in navigation params
    navigation.navigate('ViewProfile', { 
      userId: loggedinId, 
      otherId, 
      fromSearch: true, 
      fromProject: true, 
      projectId: projectId 
    });
  };

  const renderItem = ({ item }) => {
    const displayName = item.name || item.title || item.username || item.fullName || "Unknown";
    
    return (
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.cardText}>{displayName}</Text>
          {type === "project" && item.domain && (
            <Text style={styles.cardSubText}>Domain: {item.domain}</Text>
          )}
          {(type === "mentors" || type === "member") && item.skills && (
            <Text style={styles.cardSubText}>Skills: {item.skills?.join(", ")}</Text>
          )}
        </View>
        
        {/* Show different actions based on context */}
        <View style={styles.cardActions}>
          {/* View profile button */}
          <TouchableOpacity 
            style={styles.viewProfileBtn}
            onPress={() => {
              if (type === "project") {
                navigation.navigate("ViewProject", { 
                  projectType: "publicProjects", 
                  project: item, 
                  userId: loggedinId,
                  fromSearch: true,
                  fromSearchFilters: true,
                });
              } else {
                navigation.navigate("ViewProfile", { 
                  userId: loggedinId, 
                  otherId: item._id,
                  fromSearch: true,
                  fromSearchFilters: true,
                });
              }
            }}
          >
            <Text style={styles.btnText}>View {type === "project" ? "Project" : "Profile"}</Text>
          </TouchableOpacity>
          
          {/* Send invite button - only show for users when fromProject is true */}
          {fromProject && projectId && (
            <TouchableOpacity 
              style={styles.inviteBtn}
              onPress={() => handleSendInvite(item._id)}
            >
              <Text style={styles.btnText}>Send Invite</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const searchTitle = `Search for ${type === "project" ? "Projects" : type === "mentors" ? "Mentors" : "Team Members"}`;

  // If we don't have a userId, show an error state
  if (!loggedinId) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Missing user ID. Please try again.</Text>
          <TouchableOpacity 
            style={styles.errorButton}
            onPress={() => navigation.navigate("Search")}
          >
            <Text style={styles.errorButtonText}>Go to Search</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Navbar2 route={{ 
        params: { 
          title: searchTitle, 
          userId: loggedinId,
          type: type
        } 
      }} />
      
      <View style={styles.container}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search by name..."
          value={search}
          onChangeText={setSearch}
        />
        
        <Text style={styles.filterLabel}>
          {type === "project" ? "Filter by Domain:" : "Filter by Skills:"}
        </Text>
        
        <View style={styles.accordionContainer}>
          {type === "project" ? (
            <DomainAccordion 
              initialDomain={selectedDomain}
              onDomainChange={handleDomainChange}
            />
          ) : (
            <SkillsAccordion 
              initialSkills={selectedFilters}
              onSkillsChange={handleSkillsChange}
            />
          )}
        </View>
        
        <Text style={styles.resultLabel}>Results:</Text>
        
        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#9370DB" />
            <Text style={styles.loaderText}>Loading data...</Text>
          </View>
        ) : (
          <FlatList
            data={getFilteredData()}
            keyExtractor={(item, index) => item._id?.toString() || item.id?.toString() || index.toString()}
            renderItem={renderItem}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  No {type === "project" ? "projects" : type === "mentors" ? "mentors" : "team members"} found matching your criteria.
                </Text>
              </View>
            }
          />
        )}
      </View>
      
      <Footer route={{ params: { page: "search", userId: loggedinId } }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  searchBar: {
    height: 50,
    borderColor: "#9370DB",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
  },
  accordionContainer: {
    marginBottom: 10,
    maxHeight: 300, // Limit height to prevent taking too much space
  },
  card: {
    padding: 20,
    backgroundColor: "#F0F0FF",
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  cardContent: {
    marginBottom: 10,
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  viewProfileBtn: {
    backgroundColor: "#7164b4",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
    alignItems: "center",
  },
  inviteBtn: {
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontWeight: "500",
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardSubText: {
    fontSize: 14,
    color: "#666",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "#e53935",
    marginBottom: 20,
    textAlign: "center",
  },
  errorButton: {
    backgroundColor: "#7164b4",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  errorButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});

export default SearchFilters;