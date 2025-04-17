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

// import React, { useEffect, useState } from 'react'
// import { useNavigation } from '@react-navigation/native';
// import { fetchUserNotifications } from '../src/services/notification_api.js'; // Update this path

// import {
//   SafeAreaView,
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   Pressable,
//   Animated
// } from 'react-native'

// const Navbar = ({ route }) => {
//   const { userId } = route.params;
//   const navigation = useNavigation();
//   const [notificationCount, setNotificationCount] = useState(0);
  
//   // Fetch notification count when component mounts
//   useEffect(() => {
//     const getNotifications = async () => {
//       try {
//         console.log(`🔍 Navbar2 - Fetching notifications for user: ${userId}`);
//         const response = await fetchUserNotifications(userId);
        
//         // Debug the response
//         console.log('Notification response:', response);
        
//         // Check if response has the expected structure
//         if (response && response.notifications && Array.isArray(response.notifications)) {
//           // If notifications are in a 'notifications' property
//           const unreadCount = response.notifications.filter(
//             notification => notification.status === 'unread'
//           ).length;
//           setNotificationCount(unreadCount);
//         } else if (response && Array.isArray(response)) {
//           // If response itself is the array of notifications
//           const unreadCount = response.filter(
//             notification => notification.status === 'unread'
//           ).length;
//           setNotificationCount(unreadCount);
//         } else if (response && typeof response === 'object' && response.unreadCount !== undefined) {
//           // If the API directly returns an unread count
//           setNotificationCount(response.unreadCount);
//         } else {
//           console.log('Unexpected notification response format:', response);
//           setNotificationCount(0); // Default to 0 if format is unexpected
//         }
//       } catch (error) {
//         console.error('Error fetching notifications:', error);
//         setNotificationCount(0); // Default to 0 on error
//       }
//     };
    
//     if (userId) {
//       getNotifications();
//     }
    
//     // You could add an interval to periodically check for new notifications
//     // const interval = setInterval(getNotifications, 30000); // every 30 seconds
//     // return () => clearInterval(interval);
//   }, [userId]);

//   return (
//     <View style={[styles.navbar, {position:'relative'}]}>
//       <Image
//         source={require('../assets/img/s_logo1_dbg3.png')}
//         style={[styles.logo]}
//         resizeMode='contain'
//       />
//       <View style={[styles.logos2]}>
//         <Pressable 
//           onPress={() => {
//             navigation.navigate("AddProjectScreen", { userId });
//           }}
//           style={({ pressed }) => [
//             {opacity: pressed ? 0.5 : 1.0},
//           ]}
//         >
//           <Image
//             source={require('../assets/img/homepage/plus_icon2.png')}
//             style={[styles.plus_icon]}
//             resizeMode='contain'
//           />
//         </Pressable>
//         <Pressable
//           onPress={() => {
//             navigation.navigate("Notification", {userId});
//           }}
//           style={({ pressed }) => [
//             {opacity: pressed ? 0.5 : 1.0},
//             styles.notificationContainer
//           ]}
//         >
//           <Image
//             source={require('../assets/img/homepage/messenger_icon2.png')}
//             style={[styles.messenger_icon]}
//             resizeMode='contain'
//           />
//           {notificationCount > 0 && (
//             <View style={styles.notificationBadge}>
//               <Text style={styles.notificationText}>
//                 {notificationCount > 99 ? '99+' : notificationCount}
//               </Text>
//             </View>
//           )}
//         </Pressable>
//       </View>
//     </View>
//   )
// }

// export default Navbar

// const styles = StyleSheet.create({
//   navbar:{
//     backgroundColor:'#7164b4',
//     padding:15,
//     height:120,
//     borderBottomLeftRadius:50,
//     borderBottomRightRadius:50,
//     flexDirection:'row',
//     // alignItems:'center',
//     justifyContent:'space-between',
//     paddingTop:30,

//     // iOS shadow properties
//     shadowColor: 'rgba(0, 0, 0, 0.1)', // Shadow color
//     shadowOffset: { width: 0, height: 4 }, // Shadow offset
//     shadowOpacity: 1, // Shadow opacity
//     shadowRadius: 4, // Shadow blur radius
    
//     // Android shadow
//     elevation: 10, // Shadow elevation for Android
//   },
//   logo:{
//     width:100,
//     height:60,
//   },
//   logos2:{
//     paddingRight:15,
//     flexDirection:'row',
//     gap:25,
//   },
//   messenger_icon: {
//     width:40,
//     height:60,
//   },
//   plus_icon: {
//     width:40,
//     height:60,
//   },
//   notificationContainer: {
//     position: 'relative',
//   },
//   notificationBadge: {
//     position: 'absolute',
//     right: -5,
//     top: 5,
//     backgroundColor: 'red',
//     borderRadius: 10,
//     minWidth: 20,
//     height: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 4,
//   },
//   notificationText: {
//     color: 'white',
//     fontSize: 10,
//     fontWeight: 'bold',
//   }
// })

// // const Navbar = ({ route }) => {
// //   const { userId } = route.params;
// //   const navigation = useNavigation();
// //   const [notificationCount, setNotificationCount] = useState(0);
  
// //   // Fetch notification count when component mounts
// //   useEffect(() => {
// //     const getNotifications = async () => {
// //       try {
// //         const notifications = await fetchUserNotifications(userId);
// //         // Filter for unread notifications
// //         const unreadCount = notifications.filter(
// //           notification => notification.status === 'unread'
// //         ).length;
// //         setNotificationCount(unreadCount);
// //       } catch (error) {
// //         console.error('Error fetching notifications:', error);
// //       }
// //     };
    
// //     getNotifications();
    
// //     // You could add an interval to periodically check for new notifications
// //     // const interval = setInterval(getNotifications, 30000); // every 30 seconds
// //     // return () => clearInterval(interval);
// //   }, [userId]);

// //   return (
// //     <View style={[styles.navbar, {position:'relative'}]}>
// //       <Image
// //         source={require('../assets/img/s_logo1_dbg3.png')}
// //         style={[styles.logo]}
// //         resizeMode='contain'
// //       />
// //       <View style={[styles.logos2]}>
// //         <Pressable 
// //           onPress={() => {
// //             navigation.navigate("AddProjectScreen", { userId });
// //           }}
// //           style={({ pressed }) => [
// //             {opacity: pressed ? 0.5 : 1.0},
// //           ]}
// //         >
// //           <Image
// //             source={require('../assets/img/homepage/plus_icon2.png')}
// //             style={[styles.plus_icon]}
// //             resizeMode='contain'
// //           />
// //         </Pressable>
// //         <Pressable
// //           onPress={() => {
// //             navigation.navigate("Notification", {userId});
// //           }}
// //           style={({ pressed }) => [
// //             {opacity: pressed ? 0.5 : 1.0},
// //             styles.notificationContainer
// //           ]}
// //         >
// //           <Image
// //             source={require('../assets/img/homepage/messenger_icon2.png')}
// //             style={[styles.messenger_icon]}
// //             resizeMode='contain'
// //           />
// //           {notificationCount > 0 && (
// //             <View style={styles.notificationBadge}>
// //               <Text style={styles.notificationText}>
// //                 {notificationCount > 99 ? '99+' : notificationCount}
// //               </Text>
// //             </View>
// //           )}
// //         </Pressable>
// //       </View>
// //     </View>
// //   )
// // }

// // export default Navbar

// // const styles = StyleSheet.create({
// //   navbar:{
// //     backgroundColor:'#7164b4',
// //     padding:15,
// //     height:120,
// //     borderBottomLeftRadius:50,
// //     borderBottomRightRadius:50,
// //     flexDirection:'row',
// //     // alignItems:'center',
// //     justifyContent:'space-between',
// //     paddingTop:30,

// //     // iOS shadow properties
// //     shadowColor: 'rgba(0, 0, 0, 0.1)', // Shadow color
// //     shadowOffset: { width: 0, height: 4 }, // Shadow offset
// //     shadowOpacity: 1, // Shadow opacity
// //     shadowRadius: 4, // Shadow blur radius
    
// //     // Android shadow
// //     elevation: 10, // Shadow elevation for Android
// //   },
// //   logo:{
// //     width:100,
// //     height:60,
// //   },
// //   logos2:{
// //     paddingRight:15,
// //     flexDirection:'row',
// //     gap:25,
// //   },
// //   messenger_icon: {
// //     width:40,
// //     height:60,
// //   },
// //   plus_icon: {
// //     width:40,
// //     height:60,
// //   },
// //   notificationContainer: {
// //     position: 'relative',
// //   },
// //   notificationBadge: {
// //     position: 'absolute',
// //     right: -5,
// //     top: 5,
// //     backgroundColor: 'red',
// //     borderRadius: 10,
// //     minWidth: 20,
// //     height: 20,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     paddingHorizontal: 4,
// //   },
// //   notificationText: {
// //     color: 'white',
// //     fontSize: 10,
// //     fontWeight: 'bold',
// //   }
// // })