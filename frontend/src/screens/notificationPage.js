import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView, ActivityIndicator, Alert
} from 'react-native';
import Navbar2 from '../../Components/navbar2';
import { useNavigation } from '@react-navigation/native';
import { fetchUserNotifications, updateNotificationStatus } from '../services/notification_api.js';
import { acceptInvite, acceptApplication } from '../services/projects_api';

function NotificationPage({ route }) {
  const loggedinId = route.params?.userId;
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState([]);
  const navigation = useNavigation();
  
  const avatarImages = {
    0: require("../../assets/img/avatars/avatar1.png"),
    1: require("../../assets/img/avatars/avatar2.png"),
    2: require("../../assets/img/avatars/avatar3.png"),
    3: require("../../assets/img/avatars/avatar4.png"),
    4: require("../../assets/img/avatars/avatar5.png"),
  };
  
  const loadNotifications = async () => {
    if (!loggedinId) {
      console.error("Missing user ID");
      Alert.alert("Error", "User information is missing");
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      console.log("Fetching Notifications for user:", loggedinId);
      const data = await fetchUserNotifications(loggedinId);
      
      if (data && data.notifications) {
        // Sort notifications by createdAt date, newest first
        const sortedNotifications = [...data.notifications].sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setNotifications(sortedNotifications);
      } else {
        console.warn("Received invalid notification data:", data);
        setNotifications([]);
      }
    } catch (err) {
      console.error('Error fetching notifications:', err);
      Alert.alert("Error", "Failed to load notifications. Please try again later.");
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRespond = async (notificationId, response) => {
    try {
      // Add to processing state
      setProcessingIds(prev => [...prev, notificationId]);
      
      console.log("Updating Notification Status");
      await updateNotificationStatus(notificationId, response);
      
      // Update local state first for immediate UI feedback
      setNotifications(prevNotifications => 
        prevNotifications.map(item => 
          item._id === notificationId ? {...item, status: response} : item
        )
      );
      
      // Then reload to ensure data consistency
      loadNotifications(); 
    } catch (err) {
      console.error('Error updating notification:', err);
      Alert.alert("Error", "Failed to process your response. Please try again later.");
    } finally {
      // Remove from processing state
      setProcessingIds(prev => prev.filter(id => id !== notificationId));
    }
  };

  // Handle accepting a project invitation
  const handleAcceptInvite = async (notification) => {
    if (!notification || !notification.project || !notification.project._id) {
      throw new Error("Invalid project data in notification");
    }
    
    try {
      console.log("Accepting invitation for project:", notification.project._id);
      console.log("User ID:", loggedinId);
      console.log("Notification ID:", notification._id);
      
      const response = await acceptInvite(
        notification.project._id, 
        loggedinId, 
        notification._id
      );
      
      if (!response || response.error) {
        throw new Error(response?.error || "Failed to join project");
      }
      
      return response;
    } catch (error) {
      console.error("Error accepting invite:", error);
      throw error; // Re-throw to be caught by the main handler
    }
  };

  const handleAcceptApplication = async (notification) => {
    if (!notification || !notification.project || !notification.project._id || !notification.sender || !notification.sender._id) {
      throw new Error("Invalid application data in notification");
    }
    
    try {
      console.log("Accepting application details:");
      console.log("- Notification ID:", notification._id);
      console.log("- Project ID:", notification.project._id);
      console.log("- Sender ID:", notification.sender._id);
      
      const response = await acceptApplication(
        notification.project._id, 
        notification.sender._id, 
        notification._id
      );
      
      if (!response) {
        throw new Error("No response received from server");
      }
      if (response.error) {
        throw new Error(response.error);
      }
      
      return response;
    } catch (error) {
      console.error("Error accepting application:", error);
      // Log more details about the error
      if (error.response) {
        console.error("Server responded with:", error.response.status, error.response.data);
      }
      throw error;
    }
  };

  // Load notifications on component mount and when loggedinId changes
  useEffect(() => {
    if (loggedinId) {
      loadNotifications();
    }
  }, [loggedinId]);

  const isProcessing = (notificationId) => {
    return processingIds.includes(notificationId);
  };

  // If user ID is missing, show an error
  if (!loggedinId) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, color: 'red' }}>Error: User information is missing</Text>
        <TouchableOpacity 
          style={styles.goBackButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.viewButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Function to format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 30) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F8" }}>
      <Navbar2 route={{ params: { title: "Notifications", userId: loggedinId } }} />
      <SafeAreaView style={{ flex: 1, marginBottom: 40 }}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#7164b4" />
            <Text style={styles.loadingText}>Loading notifications...</Text>
          </View>
        ) : (
          <FlatList
            data={notifications}
            keyExtractor={(item) => item._id || `temp-${Math.random()}`}
            contentContainerStyle={notifications.length === 0 ? { flex: 1, justifyContent: 'center' } : {}}
            renderItem={({ item }) => (
              <View style={styles.box}>
                <View style={styles.row}>
                  <Image
                    source={item.sender && avatarImages[item.sender.avatar] || avatarImages[0]}
                    style={styles.profileImage}
                  />

                  <View style={styles.userInfoContainer}>
                    <Text style={styles.item}>{item.sender ? item.sender.username : "Unknown User"}</Text>
                    <Text style={styles.timeText}>{formatDate(item.createdAt)}</Text>
                  </View>
                  
                  {item.type === 'invite' && item.project && (
                    <TouchableOpacity
                      style={styles.viewButton}
                      onPress={() =>
                        navigation.navigate('ViewProject', {
                          projectType: 'publicProjects',
                          project: item.project,
                          userId: loggedinId,
                          fromSearch: false,
                          fromNotification: true,
                          notificationId: item._id
                        })
                      } 
                    >
                      <Text style={styles.viewButtonText}>View Project</Text>
                    </TouchableOpacity>
                  )}

                  {item.type === 'application' && item.sender && (
                    <TouchableOpacity
                      style={styles.viewButton}
                      onPress={() =>
                        navigation.navigate('ViewProfile', {
                          project: item.project,
                          userId: loggedinId,
                          otherId: item.sender._id,
                          fromSearch: false,
                          fromNotification: true,
                          notificationId: item._id
                        })
                      } 
                    >
                      <Text style={styles.viewButtonText}>View Profile</Text>
                    </TouchableOpacity>
                  )}
                </View>

                <Text style={styles.requestText}>
                  {item.type === 'invite' && item.project
                    ? `Invited you to join as a member of "${item.project.title}"`
                    : item.type === 'application' && item.project
                    ? `Applied to join your project "${item.project.title}"`
                    : "Notification details unavailable"}
                </Text>

                {item.status === 'pending' ? (
                  <View style={styles.buttonRow}>
                    <TouchableOpacity 
                      style={[styles.acceptButton, isProcessing(item._id) && styles.disabledButton]} 
                      onPress={() => handleRespond(item._id, 'accepted')}
                      disabled={isProcessing(item._id)}
                    >
                      <Text style={styles.viewButtonText}>
                        {isProcessing(item._id) ? "Processing..." : "Accept"}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      style={[styles.rejectButton, isProcessing(item._id) && styles.disabledButton]} 
                      onPress={() => handleRespond(item._id, 'rejected')}
                      disabled={isProcessing(item._id)}
                    >
                      <Text style={styles.rejectButtonText}>
                        {isProcessing(item._id) ? "Processing..." : "Reject"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Text style={[
                    styles.statusText, 
                    item.status === 'accepted' ? styles.acceptedStatus : styles.rejectedStatus
                  ]}>
                    Status: {item.status === 'accepted' ? 'Accepted' : 'Rejected'}
                  </Text>
                )}
              </View>
            )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No notifications yet</Text>
                <TouchableOpacity 
                  style={styles.refreshButton}
                  onPress={loadNotifications}>
                  <Text style={styles.viewButtonText}>Refresh</Text>
                </TouchableOpacity>
              </View>
            }
          />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },
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
  statusText: {
    marginTop: 5, 
    fontStyle: 'italic',
    fontSize: 14
  },
  acceptedStatus: {
    color: '#4CAF50',
  },
  rejectedStatus: {
    color: '#F44336',
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
  userInfoContainer: {
    flex: 1,
  },
  timeText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
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
  goBackButton: {
    backgroundColor: "#7164b4",
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    width: 150,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  refreshButton: {
    backgroundColor: "#7164b4",
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    width: 150,
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
  disabledButton: {
    opacity: 0.6,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
  }
});

export default NotificationPage;