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

const ViewProfile = ({ route }) => {
  const navigation = useNavigation();
  // const userId = route?.params?.userId || "YOUR_DEFAULT_USER_ID"; // Replace with actual user ID from params or authentication
  console.log("Received userId:", userId);
  const [error, setError] = useState(null);

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
	const [userId, setUserId] = useState(null);

	useEffect(() => {
		const getUserData = async () => {
			try {
				console.log("Fetching user with ID:", route?.params?.userId);
				const userData = await fetchUserById(route?.params?.userId); 
				if (!userData) throw new Error("User not found");
				setUserId(userData._id);
        setUserData(userData);

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

  // useEffect(() => {
  //   const loadUser = async () => {
  //     try {
  //       setLoading(true);
  //       setError(null); // Reset error state
  //       const user = await fetchUserById(userId);
  //       if (user) setUserData(user);
  //       else setError("User not found");
  //     } catch (error) {
  //       console.error("Error fetching user:", error);
  //       setError("Failed to load user data");
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   loadUser();
  // }, [userId, route.params?.forceRefresh]);

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Navbar2 title="Profile" userId={userId}/>
      
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

        <TouchableOpacity 
          style={styles.editProfileButton} 
          onPress={() => navigation.navigate("EditProfile", { userId })}
        >
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
      </ScrollView>

      <Footer page="profile" userId={userId}/>
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
    marginTop: 20,
  },
  editProfileText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  linkText: {
    color: "blue",
    textDecorationLine: "underline",
  },
};

export default ViewProfile;
