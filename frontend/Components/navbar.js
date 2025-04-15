import React, { useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native';


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

const Navbar = ({ route }) => {

	const { userId } = route.params;

	const navigation = useNavigation();

  return (
    <View style={[styles.navbar, {position:'relative'}]}>
			<Image
				source={require('../assets/img/s_logo1_dbg3.png')}
				style={[styles.logo]}
				resizeMode='contain'
			/>
			<View style={[styles.logos2]}>
				<Pressable 
					onPress={() => {
						navigation.navigate("AddProjectScreen", { userId });
					}}
					style={({ pressed }) => [
						{opacity: pressed ? 0.5 : 1.0},
					]}
				>
					<Image
						source={require('../assets/img/homepage/plus_icon2.png')}
						style={[styles.plus_icon]}
						resizeMode='contain'
					/>
				</Pressable>
				<Pressable
					onPress={() => {
						navigation.navigate("Notification" ,{userId});
					}}
					style={({ pressed }) => [
						{opacity: pressed ? 0.5 : 1.0},
					]}
				>
					<Image
						source={require('../assets/img/homepage/messenger_icon2.png')}
						style={[styles.messenger_icon]}
						resizeMode='contain'
					/>
				</Pressable>
			</View>
		</View>
  )
}

export default Navbar

const styles = StyleSheet.create({
	navbar:{
		backgroundColor:'#7164b4',
		padding:15,
		height:120,
		borderBottomLeftRadius:50,
		borderBottomRightRadius:50,
		flexDirection:'row',
		// alignItems:'center',
		justifyContent:'space-between',
		paddingTop:30,

		 // iOS shadow properties
		 shadowColor: 'rgba(0, 0, 0, 0.1)', // Shadow color
		 shadowOffset: { width: 0, height: 4 }, // Shadow offset
		 shadowOpacity: 1, // Shadow opacity
		 shadowRadius: 4, // Shadow blur radius
		 
		 // Android shadow
		 elevation: 10, // Shadow elevation for Android
	},
	logo:{
		width:100,
		height:60,
	},
	logos2:{
		paddingRight:15,
		flexDirection:'row',
		gap:25,
	},
	messenger_icon: {
		width:40,
		height:60,
	},
	plus_icon: {
		width:40,
		height:60,
	},
})