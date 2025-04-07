import React, { useEffect, useState } from "react";

import { 
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Linking
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import Navbar2 from "../../Components/navbar2";
import Footer from "../../Components/footer";

import { fetchUserById } from "../services/users_api";
import { fetchUserProjects, fetchUserPublicProjects } from "../services/projects_api";

const ViewProfile = ({ route }) => {
  const navigation = useNavigation();
  const loggedinId = route.params.userId;
  const { otherId, fromSearch, fromSearchFilters=false, fromProject, projectId } = route.params;
  // const otherId = route.params.otherId;
  // const fromSearch = route.params.fromSearch;
  // const fromSearchFilters = route.params.fromSearchFilters;
  // const fromProject = route.params.fromProject;
  // const projectId = route.params.projectId;
  console.log("Received userId:", loggedinId);
  const [error, setError] = useState(null);

  const [userData, setUserData] = useState(null);
	const [userProjects, setUserProjects] = useState([]);
  const [loading, setLoading] = useState(true);
	const [userId, setUserId] = useState(null);

	useEffect(() => {
		const getUserData = async () => {
			try {
        if (otherId) {
          console.log("Fetching user with ID:", otherId);
          const userData = await fetchUserById(otherId);
          if (!userData) throw new Error("User not found");
          setUserId(userData._id);
          setUserData(userData);

          const projectData = await fetchUserPublicProjects(otherId); // Fetch projects
          console.log("Fetched projects:", projectData);
          setUserProjects(projectData);
        }
				else {

          console.log("Fetching user with ID:", loggedinId);
          const userData = await fetchUserById(loggedinId); 
          if (!userData) throw new Error("User not found");
          setUserId(userData._id);
          setUserData(userData);

          const projectData = await fetchUserProjects(loggedinId); // Fetch projects
          console.log("Fetched projects:", projectData);
          setUserProjects(projectData);
        }

			} catch (error) {
					console.error("Error fetching user data:", error);
          setError("Failed to load user data");
      } finally {
          setLoading(false);
      }
		};
		getUserData();
	}, [userId, route.params?.forceRefresh]);

  const avatarImages = {
    0: require("../../assets/img/avatars/avatar1.png"),
    1: require("../../assets/img/avatars/avatar2.png"),
    2: require("../../assets/img/avatars/avatar3.png"),
    3: require("../../assets/img/avatars/avatar4.png"),
    4: require("../../assets/img/avatars/avatar5.png"),
  };

  const handleLinkPress = async () => {
    const url = userData.linkedin;
    const supported = await Linking.canOpenURL(url);

    if (supported) await Linking.openURL(url);
    else alert("Cannot open this link");
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7164B4" />
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ fontSize: 18, color: "#333" }}>User not found</Text>
      </View>
    );
  }

  const gotoViewProject = (project) => {
    if (otherId) {
      navigation.navigate('ViewProject', { projectType: "publicProjects", project, userId: loggedinId, fromSearch: true });
    } else {
      navigation.navigate('ViewProject', { projectType: "publicProjects", project, userId: loggedinId, fromSearch: false });
    }
  }

	const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => gotoViewProject(item)}
    >
			<Text style={styles.cardText}>{item.title}</Text>
			<Text style={styles.subText}>{item.domain}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* <Navbar2 title="Profile" userId={userId}/> */}
      <Navbar2 route={{ params: { title: "Profile", userId: loggedinId, otherId, fromSearch, fromProject, fromSearchFilters } }} />
      
      <ScrollView contentContainerStyle={{ padding: 15 }}>
        <View style={styles.headerContainer}>
          <View style={styles.userInfo}>
            <Text style={styles.username}>{userData.username}</Text>
            <Text style={styles.bio}>{userData.bio || "No bio available"}</Text>
            <Text style={styles.skills}>
              {userData.skills.length > 0 ? userData.skills.join(", ") : "No skills specified"}
            </Text>
            <TouchableOpacity onPress={handleLinkPress}>
              <Text style={styles.linkText}>{userData.linkedin}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.profilePicContainer}>
            <Image
              source={userData.profilePic ? { uri: userData.profilePic } : avatarImages[userData.avatar%5]}
              style={styles.profilePic}
            />
          </View>

        </View>

        { !otherId && (
          <TouchableOpacity 
            style={styles.editProfileButton} 
            onPress={() => navigation.navigate("EditProfile", { userId: loggedinId })}
          >
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        )}

        { (otherId && fromProject && projectId) && (
          <TouchableOpacity 
            style={styles.editProfileButton} 
            // onPress={() => navigation.navigate("EditProfile", { userId: loggedinId })}
          >
            <Text style={styles.editProfileText}>Send Invite</Text>
          </TouchableOpacity>
        )}

				<FlatList
          horizontal
          data={userProjects.sort(() => Math.random() - 0.5).slice(0, 6)}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()} // Ensure unique key
        />

      </ScrollView>

      {/* <Footer page="profile" userId={userId}/> */}
      {/* <Footer route={{ params: { page: "profile", userId: loggedinId, otherId: otherId } }} /> */}
      <Footer route={{ params: { page: otherId ? "search" : "profile", userId: loggedinId, otherId } }} />
    </SafeAreaView>
  );
};

const styles = {
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  userInfo: {
    flex: 1,
    paddingRight: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bio: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  skills: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
  profilePicContainer: {
    width: 86, // Slightly larger than the image to create spacing
    height: 86,
    borderRadius: 43, // Half of width/height to maintain circular shape
    borderWidth: 2,
    borderColor: "#7164B4",
    justifyContent: "center",
    alignItems: "center",
  },
  profilePic: {
    width: 75,
    height: 80,
    borderRadius: 40,
  },
  editProfileButton: {
    backgroundColor: "#7164B4",
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
    width: "50%",
    alignItems: "center",
    marginVertical: 20,
  },
  editProfileText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  linkText: {
    color: "blue",
    textDecorationLine: "underline",
  },
	card: {
    backgroundColor: "#E6E6FA",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    marginRight: 15,
    width: 160,
    height: 200,
    justifyContent: "center",
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
};

export default ViewProfile;
