import React, { useRef, useState } from 'react'

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

import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { fetchUserById } from '../src/services/users_api';


const Footer = (props) => {

	const {page, userId} = props;

	const navigation = useNavigation();
	const route = useRoute();

	const [currentFooterIcon, setCurrentFooterIcon] = useState(page);

	useFocusEffect(
		React.useCallback(() => {
			const routeName = route.name; // Get current route name
	
			if (routeName === "Home") setCurrentFooterIcon("home");
			else if (routeName === "Search") setCurrentFooterIcon("search");
			else if (routeName === "QnA") setCurrentFooterIcon("qna");
			else if (routeName === "ViewProfile") setCurrentFooterIcon("profile");
	
		}, [route.name])
	);


	

  return (
		<View style={[styles.footer]}>
			<Pressable
				onPress={() => {
					if (currentFooterIcon != "home") navigation.navigate("Home", { userId });
				}}
				style={({ pressed }) => [
					{opacity: pressed ? 0.5 : 1.0},
					{position: 'relative'}
				]}
			>
				{currentFooterIcon === "home" && <View style={styles.ovalShadow}/>}
				<Image
					source={require('../assets/img/homepage/homepage_icon.png')}
					style={[
						styles.homepage_icon,
					]}
					resizeMode='contain'
				/>
			</Pressable>
			<Pressable
				onPress={() => {
					if (currentFooterIcon != "search") navigation.navigate("Search");
				}}
				style={({ pressed }) => [
					{opacity: pressed ? 0.5 : 1.0},
					{position: 'relative'}
				]}
			>
				{currentFooterIcon === "search" && <View style={styles.ovalShadow}/>}
				<Image
					source={require('../assets/img/homepage/magnigier_icon.png')}
					style={[
						styles.homepage_icon,
					]}
					resizeMode='contain'
				/>
			</Pressable>
			<Pressable
				onPress={() => {
					if (currentFooterIcon != "qna") navigation.navigate("QnA");
				}}
				style={({ pressed }) => [
					{opacity: pressed ? 0.5 : 1.0},
					{position: 'relative'}
				]}
			>
				{currentFooterIcon === "qna" && <View style={styles.ovalShadow}/>}
				<Image
					source={require('../assets/img/homepage/QnA_icon.png')}
					style={[
						styles.homepage_icon,
					]}
					resizeMode='contain'
				/>
			</Pressable>
			<Pressable
				onPress={() => {
					if (currentFooterIcon != "profile") navigation.navigate("ViewProfile", { userId });
				}}
				style={({ pressed }) => [
					{opacity: pressed ? 0.5 : 1.0},
					{position: 'relative'}
				]}
			>
				{currentFooterIcon === "profile" && <View style={styles.ovalShadow}/>}
				<Image
					source={require('../assets/img/homepage/user_icon.png')}
					style={[
						styles.homepage_icon,
					]}
					resizeMode='contain'
				/>
			</Pressable>

		</View>
  )
}

export default Footer

const styles = StyleSheet.create({
	footer:{
		// backgroundColor:'#7164b4',
		paddingHorizontal:15,
		paddingBottom:15,
		height:64,
		flexDirection:'row',
		// alignItems:'center',
		justifyContent:'space-between',
	},
	homepage_icon:{
		width:40,
		height:60,
	},
	ovalShadow:{
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
		position: 'absolute',
		width:50,
		height:5,
		borderRadius:5,
		bottom:'-20%',
		alignSelf: 'center',

		// iOS Shadow
		shadowColor: 'black',
		shadowOpacity: 0.5,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 1,
	
		// Android Shadow
		elevation: 7, // Higher value for stronger blur effect
	},
})