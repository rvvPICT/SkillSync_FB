import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import Navbar2 from '../../Components/navbar2'

function NotificationPage() {
  const users = [
    { id: 1, name: "Anil", request: "Mentor", profilePicture: require('../../assets/img/notificationPage/manImg.jpg') },
    { id: 2, name: "Vedika", request: "Mentor", profilePicture: require('../../assets/img/notificationPage/manImg.jpg') },
    { id: 3, name: "Riddhi", request: "Member", profilePicture: require('../../assets/img/notificationPage/manImg.jpg') },
    { id: 4, name: "Appu", request: "Member", profilePicture: require('../../assets/img/notificationPage/manImg.jpg') },
    { id: 5, name: "Sanika", request: "Member", profilePicture: require('../../assets/img/notificationPage/manImg.jpg') },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F8" }}>
      {/* Navbar2 at the top */}
      <Navbar2 title="Notifications" />
      <SafeAreaView style={{ marginBottom: 40 }}>
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.box}>
              <View style={styles.row}>
                {/* Profile Picture */}
                <Image source={item.profilePicture} style={styles.profileImage} />
                <Text style={styles.item}>{item.name}</Text>
                <TouchableOpacity style={styles.viewButton} onPress={() => {}}>
                  <Text style={styles.viewButtonText}>View Project</Text>
                </TouchableOpacity>
              </View>
              {/* Request Text on Next Line */}
              <Text style={styles.requestText}>Requested you to be a {item.request} for their project.</Text>
              <View style={styles.buttonRow}>
                {/* Accept Request Button */}
                <TouchableOpacity style={styles.acceptButton} onPress={() => {}}>
                  <Text style={styles.viewButtonText}>Accept Request</Text>
                </TouchableOpacity>
                {/* Reject Request Button */}
                <TouchableOpacity style={styles.rejectButton} onPress={() => {}}>
                  <Text style={styles.rejectButtonText}>Reject Request</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
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