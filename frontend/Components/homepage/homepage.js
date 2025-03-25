import React, { useRef, useState } from 'react'

import ProjectBox from '../projectBox'
import Navbar from '../navbar/navbar'
import Footer from '../footer/footer'

import {
	SafeAreaView,
  View,
  Text,
	StyleSheet,
	ScrollView,
	Image,
	Pressable,
	Animated
} from 'react-native'



const Homepage = () => {

	const [activeTab, setActiveTab] = useState('myProjects');

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
				
				<Navbar/>

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

			<ProjectBox projectType={activeTab}/>

			<Footer/>

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
		width: 120, // Half width for two buttons
		height: 4,
		backgroundColor: '#7164b4',
		borderRadius: 2,
	},
	
	choose_list:{
		flexDirection:'row',
		justifyContent:'space-around',
		height:'10%',
		borderBottomLeftRadius:50,
		borderBottomRightRadius:50,
		// paddingBottom:20,
		// backgroundColor:'yellow',
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