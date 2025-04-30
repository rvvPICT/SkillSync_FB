import React, { useEffect, useId, useRef, useState } from 'react';
import { Dimensions } from 'react-native';


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
	const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

	useEffect(() => {
		const subscription = Dimensions.addEventListener('change', ({ window }) => {
			setScreenWidth(window.width);
		});
	
		return () => subscription?.remove();
	}, []);	

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

	const buttonWidth = screenWidth / 2;

	const moveUnderline = (index) => {
		Animated.timing(underlinePosition, {
			toValue: index * buttonWidth,
			duration: 300,
			useNativeDriver: false,
		}).start();
	};

	// const moveUnderline = (index) => {
	// 	const buttonWidth = 150;
	// 	Animated.timing(underlinePosition, {
	// 		toValue: index * buttonWidth,
	// 		duration: 300,
	// 		useNativeDriver: false,
	// 	}).start();
	// };
	

  return (
    <SafeAreaView style={[styles.container]}>

      <View style={[styles.upperbar]}>
				<Navbar route={{ params: { userId } }} />

				<View style={[styles.choose_list]}>
					<Pressable style={[styles.choose]}
						onPress={() => {
							setActiveTab('myProjects');
							moveUnderline(0.1);
            }}	
					>
						<Text style={{fontSize:20}}>My Projects</Text>
					</Pressable>
					<Pressable style={[styles.choose]}
						onPress={() => {
							setActiveTab('publicProjects');
							moveUnderline(1.1);
            }}	
					>
						<Text style={{fontSize:20}}>Public Projects</Text>
					</Pressable>

					<Animated.View
						style={[
							styles.underline,
							{ width: screenWidth/2.5, left: 0 },
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
	},

	underline: {
		position: 'absolute',
		top:65,
		left:36,
		bottom: 0,
		// width: 120, // Half width for two buttons
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
		height:50,
		borderRadius:25,
		flexDirection:'row',
		alignItems:'center',
		padding:10,

		
	},
	scrollcontent:{
		padding:10,
		flexGrow: 1,
	},
})
export default Homepage


// import React, { useEffect, useRef, useState } from 'react';
// import {
//   SafeAreaView,
//   View,
//   Text,
//   StyleSheet,
//   Pressable,
//   Animated,
//   findNodeHandle,
// } from 'react-native';

// import ProjectBox from '../../Components/projectBox';
// import Navbar from '../../Components/navbar';
// import Footer from '../../Components/footer';

// import {
//   fetchPublicProjects,
//   fetchUserProjects,
// } from '../services/projects_api';

// const Homepage = ({ route }) => {
//   const { userId } = route.params || {};

//   const [activeTab, setActiveTab] = useState("myProjects");
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const underlineX = useRef(new Animated.Value(0)).current;
//   const [underlineWidth, setUnderlineWidth] = useState(0);

//   const myProjectsRef = useRef(null);
//   const publicProjectsRef = useRef(null);
//   const chooseListRef = useRef(null);

//   useEffect(() => {
//     const getProjects = async () => {
//       if (!userId) return;
//       setLoading(true);
//       try {
//         let data;
//         if (activeTab === "myProjects") data = await fetchUserProjects(userId);
//         else data = await fetchPublicProjects();
//         setProjects(data);
//       } catch (error) {
//         console.error("Error fetching projects: ", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getProjects();
//   }, [activeTab, userId]);

// 	const moveUnderlineTo = (ref) => {
// 		const refNode = findNodeHandle(ref.current);
// 		const containerNode = findNodeHandle(chooseListRef.current);
	
// 		if (refNode && containerNode) {
// 			ref.current?.measureLayout(
// 				containerNode,
// 				(x, y, width, height) => {
// 					Animated.timing(underlineX, {
// 						toValue: x,
// 						duration: 300,
// 						useNativeDriver: false,
// 					}).start();
// 					setUnderlineWidth(width);
// 				},
// 				(error) => {
// 					console.error("measureLayout error", error);
// 				}
// 			);
// 		}
// 	};
	

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.upperbar}>
//         <Navbar route={{ params: { userId } }} />

//         <View ref={chooseListRef} style={styles.choose_list}>
//           <Pressable
//             ref={myProjectsRef}
//             style={styles.choose}
//             onLayout={(event) => {
//               const { x, width } = event.nativeEvent.layout;
//               if (activeTab === "myProjects") {
//                 underlineX.setValue(x);
//                 setUnderlineWidth(width);
//               }
//             }}
//             onPress={() => {
//               setActiveTab("myProjects");
//               moveUnderlineTo(myProjectsRef);
//             }}
//           >
//             <Text style={styles.tabText}>My Projects</Text>
//           </Pressable>

//           <Pressable
//             ref={publicProjectsRef}
//             style={styles.choose}
//             onLayout={(event) => {
//               const { x, width } = event.nativeEvent.layout;
//               if (activeTab === "publicProjects") {
//                 underlineX.setValue(x);
//                 setUnderlineWidth(width);
//               }
//             }}
//             onPress={() => {
//               setActiveTab("publicProjects");
//               moveUnderlineTo(publicProjectsRef);
//             }}
//           >
//             <Text style={styles.tabText}>Public Projects</Text>
//           </Pressable>

//           <Animated.View
//             style={[
//               styles.underline,
//               {
//                 transform: [{ translateX: underlineX }],
//                 width: underlineWidth,
//               },
//             ]}
//           />
//         </View>
//       </View>

//       <ProjectBox
//         route={{ params: { projectType: activeTab, projects, userId } }}
//       />
//       <Footer route={{ params: { page: "home", userId } }} />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   upperbar: {
//     height: 200,
//     borderBottomLeftRadius: 50,
//     borderBottomRightRadius: 50,
//   },
//   underline: {
//     position: 'absolute',
//     bottom: 0,
//     height: 4,
//     backgroundColor: '#7164b4',
//     borderRadius: 2,
//   },
//   choose_list: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'flex-end',
//     height: 80,
//     width: "100%",
//     paddingHorizontal: 20,
//     position: 'relative',
//   },
//   choose: {
//     height: 50,
//     borderRadius: 25,
//     justifyContent: 'center',
//     paddingHorizontal: 10,
//   },
//   tabText: {
//     fontSize: 20,
//     fontWeight: '500',
//   },
// });

// export default Homepage;
