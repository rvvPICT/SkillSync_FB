import React, { useRef, useState } from 'react'
import { Dimensions } from 'react-native';

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


const Footer = ({ route }) => {
	const {page, userId, otherId=null} = route.params;
	const navigation = useNavigation();
	const [currentFooterIcon, setCurrentFooterIcon] = useState(page);
	const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);


	useFocusEffect(
		React.useCallback(() => {
			const routeName = route.name;
			if (routeName === "Home") setCurrentFooterIcon("home");
			else if (routeName === "Search") setCurrentFooterIcon("search");
			else if (routeName === "QnA") setCurrentFooterIcon("qna");
			else if (routeName === "ViewProfile") setCurrentFooterIcon("profile");
		}, [route.name])
	);

  return (
		<View style={[styles.footer, {height:0.07*screenHeight}]}>
			<Pressable
				onPress={() => {
					if (currentFooterIcon != "home") navigation.navigate("Home", { userId });
				}}
				style={({ pressed }) => [
					{opacity: pressed ? 0.5 : 1.0},
					{position: 'relative'}
				]}
			>
				{currentFooterIcon === "home" && <View style={[styles.ovalShadow,  { top: 0.06*screenHeight }]}/>}
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
					if (currentFooterIcon != "search") navigation.navigate("Search", { userId });
				}}
				style={({ pressed }) => [
					{opacity: pressed ? 0.5 : 1.0},
					{position: 'relative'}
				]}
			>
				{currentFooterIcon === "search" && <View style={[styles.ovalShadow,  { top: 0.06*screenHeight }]}/>}
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
					if (currentFooterIcon != "qna") navigation.navigate("QnA", {  userId });
				}}
				style={({ pressed }) => [
					{opacity: pressed ? 0.5 : 1.0},
					{position: 'relative'}
				]}
			>
				{currentFooterIcon === "qna" && <View style={[styles.ovalShadow,  { top: 0.06*screenHeight }]}/>}
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
					if (currentFooterIcon != "profile") navigation.navigate("ViewProfile", { userId, otherId });
				}}
				style={({ pressed }) => [
					{opacity: pressed ? 0.5 : 1.0},
					{position: 'relative'}
				]}
			>
				{currentFooterIcon === "profile" && <View style={[styles.ovalShadow,  { top: 0.06*screenHeight }]}/>}
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
		paddingHorizontal:15,
		// paddingBottom:15,
		flexDirection:'row',
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
		// bottom:'-35%',
		alignSelf: 'center',

		shadowColor: 'black',
		shadowOpacity: 0.5,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 1,
	
		elevation: 7, // Higher value for stronger blur effect
	},
})