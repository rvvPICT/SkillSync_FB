import React, { useEffect, useId, useRef, useState } from 'react';

import ProjectBox from '../../Components/projectBox'
import Navbar from '../../Components/navbar'
import Footer from '../../Components/footer'

import { fetchProjects, fetchPublicProjects, fetchUserProjects } from '../services/projects_api';
import { fetchUserById } from '../services/users_api';

import {
	SafeAreaView,
  View,
  Text,
	StyleSheet,
	ScrollView,
	Image,
	Pressable,
	Animated,
	Button
} from 'react-native'

const Homepage = ({ route }) => {

	const { userId } = route.params || {};

  // Add a check to prevent errors if userId is undefined
  useEffect(() => {
    const getProjects = async () => {
      if (!userId) {
        console.error("No userId provided");
        return;
      }
      // Rest of the existing code...
    };
    getProjects();
  }, [activeTab, userId]);


	const [activeTab, setActiveTab] = useState("myProjects");
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);


	useEffect(() => {
		const getProjects = async () => {
			if (!userId) return;
			setLoading(true);
			try {
				let data;
				if (activeTab === "myProjects") data = await fetchUserProjects(userId);
				else data = await fetchPublicProjects();
				console.log("Fetched projects:", data);  // Debugging
				setProjects(data);
			} catch (error) {
				console.error("Error fetching projects : ", error);
			} finally {
				setLoading(false);
			}
		};
		getProjects();
	}, [activeTab, userId]);

	const underlinePosition = useRef(new Animated.Value(0)).current;

	const moveUnderline = (index) => {
		const buttonWidth = 150;
		Animated.timing(underlinePosition, {
			toValue: index * buttonWidth,
			duration: 300,
			useNativeDriver: false,
		}).start();
	};
	

  return (
    <SafeAreaView style={[styles.container]}>

      <View style={[styles.upperbar]}>
				
				<Navbar userId={userId}/>

				{/* <View>	// testing navigation
					<Text>Heyy, {username}</Text>
					<Button onPress={() => props.navigation.navigate("SignIn")} title='Back to Sign In'/>
				</View> */}

				<View style={[styles.choose_list]}>
					<Pressable style={[styles.choose]}
						onPress={() => {
							setActiveTab('myProjects');
							moveUnderline(0);
            }}	
					>
						<Text style={{fontSize:20}}>My Projects</Text>
					</Pressable>
					<Pressable style={[styles.choose]}
						onPress={() => {
							setActiveTab('publicProjects');
							moveUnderline(1.36);
            }}	
					>
						<Text style={{fontSize:20}}>Public Projects</Text>
					</Pressable>

					<Animated.View
						style={[
							styles.underline,
							{ transform: [{ translateX: underlinePosition }] }
						]}
					/>
				</View>
			</View>

			{/* <ProjectBox projectType={activeTab} projects={projects} userId={userId}/> */}
			<ProjectBox route={{ params: { projectType: activeTab, projects, userId } }} />

			{/* <Footer page={"home"} userId={userId}/> */}
			<Footer route={{ params: { page: "home", userId } }} />

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
	container:{
		flex:1,
	},
	upperbar:{
		height:200,
		borderBottomLeftRadius:50,
		borderBottomRightRadius:50,

		// // iOS Shadow
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.3,
    // shadowRadius: 4,

    // // Android Shadow
    // elevation: 8,

	},

	underline: {
		position: 'absolute',
		top:65,
		left:36,
		bottom: 0,
		width: 120, // Half width for two buttons
		height: 4,
		backgroundColor: '#7164b4',
		borderRadius: 2,
	},
	
	choose_list:{
		flexDirection:'row',
		justifyContent:'space-around',
		height:'10%',
		width:"100%",
		borderBottomLeftRadius:50,
		borderBottomRightRadius:50,
		// paddingBottom:20,
		paddingVertical:10,

		
	},
	choose:{
		// backgroundColor: '#f0f0f0',
		// borderWidth:2,
		// borderColor:'#7164b4',
		height:50,
		borderRadius:25,
		flexDirection:'row',
		alignItems:'center',
		padding:10,

		
	},
	scrollcontent:{
		padding:10,
		flexGrow: 1, // Ensures content expands if needed
	},
	// item:{
	// 	marginVertical:10,
	// 	fontSize:20,
	// },
})
export default Homepage