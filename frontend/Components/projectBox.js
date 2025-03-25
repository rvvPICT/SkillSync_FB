import React from 'react';

import { 
  StyleSheet,
	Text,
	SafeAreaView,
	View,
	Image,
	FlatList,
	TouchableOpacity,
	ScrollView
} from 'react-native'

// import your_projectList from './ProjectsList/yourProjectList';
// import public_projectList from './ProjectsList/publicProjectList';

import { useNavigation } from '@react-navigation/native';

const ProjectBox = ({ projectType, projects }) => {

	const navigation = useNavigation(); // Get navigation object

	const truncateText = (text, wordlimit) => {
		const words = text.split(" ");
		if (words.length > wordlimit) {
			return words.slice(0, wordlimit).join(" ") + "...";
		}
		return text;
	}

	const projectList = projects || [];	
	const emptyList = projectList.length === 0;


	const renderItem = ({item}) => {
		return(
			<View style={[styles.box]}>
				<View style={[styles.titlebox]}>
					<Text style={[styles.titleText]}>{item.title}</Text>
					<TouchableOpacity onPress={() => navigation.navigate("ViewProject", { projectType, project: item})}>
						<Text style={[styles.rendermoreiconText]}>{'>'}</Text>
					</TouchableOpacity>
				</View>

				<View style={[styles.descbox]}>
					<Text style={[styles.descText]}>{truncateText(item.description, 20)}</Text>
				</View>
			
			</View>	
		)
	}

  return (
		<>
			{ projectList.length !== 0 && (
				<FlatList
					style={[{paddingHorizontal:10}]}
					data={projectList}
					renderItem={renderItem}
					keyExtractor={(item) => item._id.toString()}
					contentContainerStyle={{flexGrow: 1,}}
				/>
			)}

			{ projectList.length === 0 && (
				<SafeAreaView style={{ flex:1 }}>
					<View style={styles.noProContainer}>
						<Text style={styles.noProText}>Looks like you haven’t added any projects yet.</Text>
						<TouchableOpacity style={styles.addBtn} onPress={() => {navigation.navigate("AddProjectScreen");}}>
							<Text style={styles.buttonText}>Get started now!</Text>
						</TouchableOpacity>
					</View>
				</SafeAreaView>
			)}
		</>
		

		
		
  )
}

export default ProjectBox

const styles = StyleSheet.create({
	box:{
		backgroundColor: '#f0f0f0',
		borderColor:'#7164b4',
		borderWidth:2,
		borderRadius:20,
		margin:10,
		// overflow:'hidden',

		// iOS shadow properties
		shadowColor: 'rgba(0, 0, 0, 0.4)', // Shadow color
		shadowOffset: { width: 1, height: 4 }, // Shadow offset
		shadowOpacity: 0.5, // Shadow opacity
		shadowRadius: 4, // Shadow blur radius
		
		// Android shadow
		elevation: 5, // Shadow elevation for Android
	},
	titlebox:{
		backgroundColor:'#7164b4',
		borderTopRightRadius:18,
		borderTopLeftRadius:18,
		borderBottomLeftRadius:10,
		borderBottomRightRadius:10,
		padding:20,
		flexDirection:'row',
		// width:'100%',
		justifyContent:'space-between',
		// position:'relative',
		margin:5,
	},
	titleText:{
		fontSize:25,
		color:'#ffffff',
		fontWeight:'bold',
		textShadowColor:'rgba(0, 0, 0, 0.5)',
		textShadowOffset: { width: 3, height: 3 },
		textShadowRadius: 4,
	},
	descbox:{
		padding:10,
	},
	descText:{
		fontSize:20,
	},
	rendermoreiconText:{
		fontSize: 25,
		fontFamily: 'Beach Sunshine',
		color: '#ffffff',
		fontWeight:'bold',
		textShadowColor: 'rgba(0, 0, 0, 0.5)',
		textShadowOffset: { width: 3, height: 3 },
		textShadowRadius: 4,
	},
	readmoreIcon:{
		width:20,
		height:20,
		marginRight:10,
	},
	noProText:{
		fontSize: 32,
    fontWeight: 'bold',
    // color: '#7164B4',
		textAlign: "center",
		opacity: 0.7,
		marginBottom: 30,
	},
	noProContainer:{
		flex: 1,
		justifyContent: "center",
		alignContent: "center",
		paddingHorizontal: 30
	},
	addBtn: {
    marginTop: 15,
    backgroundColor: "#7164B4",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "90%", // Adjust width
    alignSelf: "center", // Centers the button
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
})