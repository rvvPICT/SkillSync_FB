import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import Navbar2 from "../../Components/navbar2";
import Footer from "../../Components/footer";

import { fetchAllUsers, fetchAllMentors } from "../services/users_api";
import { fetchPublicProjects } from "../services/projects_api";

const manImg = require('../../assets/img/notificationPage/manImg.jpg');
const avatarImages = {
  0: require("../../assets/img/avatars/avatar1.png"),
  1: require("../../assets/img/avatars/avatar2.png"),
  2: require("../../assets/img/avatars/avatar3.png"),
  3: require("../../assets/img/avatars/avatar4.png"),
  4: require("../../assets/img/avatars/avatar5.png"),
};

// const mentors = [
//   { id: "1", name: "Vedika", image: require('../../assets/img/notificationPage/manImg.jpg'), rating: 4.5, skills: ["AI", "ML"] },
//   { id: "2", name: "Sanika", image: require('../../assets/img/notificationPage/manImg.jpg'), rating: 4.7, skills: ["Web Dev", "React"] },
//   { id: "3", name: "Rahul", image: require('../../assets/img/notificationPage/manImg.jpg'), rating: 4.2, skills: ["Blockchain", "Web3"] },
//   { id: "4", name: "Ananya", image: require('../../assets/img/notificationPage/manImg.jpg'), rating: 4.8, skills: ["Python", "Django"] },
//   { id: "5", name: "Sarthak", image: require('../../assets/img/notificationPage/manImg.jpg'), rating: 4.3, skills: ["Cloud", "AWS"] },
//   { id: "6", name: "Aryan", image: require('../../assets/img/notificationPage/manImg.jpg'), rating: 4.6, skills: ["Cybersecurity", "Ethical Hacking"] },
// ];

// const teamMembers = [
//   { id: "1", name: "Riddhi", image: require('../../assets/img/notificationPage/manImg.jpg'), rating: 4.6, skills: ["AI", "Python"] },
//   { id: "2", name: "Veda", image: require('../../assets/img/notificationPage/manImg.jpg'), rating: 4.4, skills: ["Web Dev", "Node.js"] },
//   { id: "3", name: "Kunal", image: require('../../assets/img/notificationPage/manImg.jpg'), rating: 4.7, skills: ["Mobile Dev", "Flutter"] },
// ];

// const projects = [
//   { id: "1", name: "AI Chatbot", domain: "Artificial Intelligence" },
//   { id: "2", name: "E-commerce App", domain: "Retail" },
//   { id: "3", name: "Health Tracker", domain: "Healthcare" },
//   { id: "4", name: "Crypto Wallet", domain: "Blockchain" },
// ];


// const renderItem = ({ item }) => (
//   <View style={styles.card}>
//     {item.image && <Image source={item.image} style={styles.image} />}
//     <Text style={styles.cardText}>{item.name}</Text>
//     {item.domain && <Text style={styles.subText}>{item.domain}</Text>}
//     {item.rating && (
//       <View style={styles.ratingContainer}>
//         <FontAwesome name="star" size={16} color="gold" />
//         <Text style={styles.ratingText}>{item.rating}</Text>
//       </View>
//     )}
//   </View>
// );

const SearchPage = ({ navigation }) => {

  const [teamMembers, setTeamMembers] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const teamData = await fetchAllUsers(); // Fetch team members
        const mentorData = await fetchAllMentors(); // Fetch mentors
        const projectData = await fetchPublicProjects(); // Fetch projects

        console.log("Fetched team members:", teamData);
        console.log("Fetched mentors:", mentorData);
        console.log("Fetched projects:", projectData);

        setTeamMembers(teamData);
        setMentors(mentorData);
        setProjects(projectData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {(teamMembers.includes(item) || mentors.includes(item)) && 
        <View style={styles.profilePicContainer}>
          <Image
            source={avatarImages[item.avatar % 5]}
            style={styles.profilePic}
          />
        </View>
      }
      {
        (teamMembers.includes(item) || mentors.includes(item)) && 
        <Text style={styles.cardText}>{item.username}</Text>
      }
      {
        projects.includes(item) && 
        <Text style={styles.cardText}>{item.title}</Text>
      }
      {
        projects.includes(item) && 
        <Text style={styles.subText}>{item.domain}</Text>
      }
      {
        (teamMembers.includes(item) || mentors.includes(item)) && 
        <View style={styles.ratingContainer}>
          <FontAwesome name="star" size={16} color="gold" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      }
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#7164b4" />
      </SafeAreaView>
    );
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Navbar2 title="Search" />
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('SearchFilters', { type: 'mentor' })}>
          <Text style={styles.heading}>Search for Mentor</Text>
        </TouchableOpacity>
        {/* <FlatList horizontal data={mentors} renderItem={renderItem} keyExtractor={(item) => item.id} /> */}
        <FlatList
          horizontal
          data={mentors.sort(() => Math.random() - 0.5).slice(0, 6)}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()} // Ensure unique key
        />

        <TouchableOpacity onPress={() => navigation.navigate('SearchFilters', { type: 'member' })}>
          <Text style={styles.heading}>Search for Team Member</Text>
        </TouchableOpacity>
        {/* <FlatList horizontal data={teamMembers} renderItem={renderItem} keyExtractor={(item) => item.id} /> */}
        <FlatList
          horizontal
          data={teamMembers.sort(() => Math.random() - 0.5).slice(0, 6)}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()} // Ensure unique key
        />

        <TouchableOpacity onPress={() => navigation.navigate('SearchFilters', { type: 'project' })}>
          <Text style={styles.heading}>Search for Project</Text>
        </TouchableOpacity>
        {/* <FlatList horizontal data={projects} renderItem={renderItem} keyExtractor={(item) => item.id} /> */}
        <FlatList
          horizontal
          data={projects.sort(() => Math.random() - 0.5).slice(0, 6)}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()} // Ensure unique key
        />

      </View>
      <Footer page={"search"} />
    </SafeAreaView>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color:"#7164b4", // Lavender color
  },
  card: {
    backgroundColor: "#E6E6FA", // Light lavender background for cards
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    marginRight: 15,
    width: 160,
    height: 200,
    justifyContent: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  subText: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginTop: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
  profilePicContainer: {
    width: 86, // Slightly larger than the image to create spacing
    height: 86,
    borderRadius: 43, // Half of width/height to maintain circular shape
    borderWidth: 2,
    borderColor: "#7164B4",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  profilePic: {
    width: 75,
    height: 80,
    borderRadius: 40,
  },
});
