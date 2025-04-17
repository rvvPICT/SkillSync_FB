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
import { fetchProjectMembers, acceptInvite } from '../services/projects_api';

const ViewProject = ({ route }) => {
  const navigation = useNavigation();
  const { projectType, project, userId, fromSearch=false, fromNotification=false } = route.params;

  const navBarText = projectType === 'myProjects' ? "My Project" : "Public Project";

  const [memberUsers, setMemberUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isApplying, setIsApplying] = useState(false);


  useEffect(() => {
    const loadMembers = async () => {
      if (project?._id) {
        setLoading(true);
        try {
          const fetchedMembers = await fetchProjectMembers(project._id);
          setMemberUsers(fetchedMembers);
        } catch (err) {
          console.error("Failed to load team members:", err);
        } finally {
          setLoading(false);
        }
      }
    };
    loadMembers();
  }, [project]);


  const handleApply = async () => {
    try {
      setIsApplying(true);
      const response = await apply(project._id, userId);
      Alert.alert("Success", response?.data?.msg || "Successfully applied for the project!");
    } catch (error) {
      console.error("Application error:", error);
      let errorMessage = "Failed to apply for the project";
      
      if (error.response) {
        errorMessage = error.response.data?.message || error.response.data || errorMessage;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      Alert.alert("Error", errorMessage);
    } finally {
      setIsApplying(false);
    }
  };
    

  const handleAccept = async () => {
    try {
      setIsApplying(true);
      console.log("Project Id:", project._id);
      console.log("User Id:", userId);
      
      const notificationId = route.params?.notificationId;
      
      if (!notificationId) {
        Alert.alert("Error", "Notification ID not found");
        return;
      }
      const response = await acceptInvite(project._id, userId, notificationId);
      
      const fetchedMembers = await fetchProjectMembers(project._id);
      setMemberUsers(fetchedMembers);
      
      Alert.alert("Success", response?.msg || "Successfully joined the project!");
      
      navigation.navigate("Notification", { userId });
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to accept invitation.");
    } finally {
      setIsApplying(false);
    }
  };

  const getUsername = async (userId) => {
    const ownerName = await fetchUserById(userId);
    return ownerName?.username || "Unknown User";
  }
  

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

          <Text style={styles.detailLabel}>Owner of the Project:</Text>
          <Text style={styles.details}>{getUsername(project.owner)}</Text>

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

          {(projectType === "publicProjects" && !project.members?.includes(userId)  && !fromNotification) && (
            <TouchableOpacity style={styles.applyBtn} onPress={handleApply} disabled={isApplying}>
              <Text style={styles.buttonTextLight}>
                {isApplying ? "Applying..." : "Apply"}
              </Text>
            </TouchableOpacity>
          )}

          {fromNotification && (
            <TouchableOpacity style={styles.applyBtn} onPress={handleAccept} disabled={isApplying}>
              <Text style={styles.buttonTextLight}>
                {isApplying ? "Accepting..." : "Accept Invite"}
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
