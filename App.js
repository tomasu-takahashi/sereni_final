// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
// import Login from './screens/Login';
// import Register from './screens/Register';
// import dashboard from './screens/dashboard';
// import Chat from './screens/Chat';
// import ChatScreen from './screens/ChatScreen';
// import Assessment from './screens/Assessment';
// import BibleVerse from './screens/BibleVerse';
// import profile from './screens/profile';


// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// function App(){
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name='Login' component={Login}/>
//         <Stack.Screen name='Register' component={Register}/>
//         <Stack.Screen name='dashboard' component={dashboard}/>
//         <Stack.Screen name='Chat' component={Chat}/>
//         <Stack.Screen name='ChatScreen' component={ChatScreen}/>
//         <Stack.Screen name='Assessment' component={Assessment}/>
//         <Stack.Screen name='Bible Verse' component={BibleVerse}/>
//         <Stack.Screen name='Profile' component={profile}/>
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
// export default () => {
// //   return (
// //     <NavigationContainer>
// //       <Stack.Navigator>
// //         <Stack.Screen name='Login' component={Login}/>
// //         <Stack.Screen name='Register' component={Register}/>
// //         <Stack.Screen name='dashboard' component={BottomTab}/>
// //         <Stack.Screen name='Chat' component={Chat}/>
// //         <Stack.Screen name='ChatScreen' component={ChatScreen}/>
// //         <Stack.Screen name='Assessment' component={Assessment}/>
// //         <Stack.Screen name='Bible Verse' component={BibleVerse}/>
// //         <Stack.Screen name='Profile' component={profile}/>
// //       </Stack.Navigator>
// //     </NavigationContainer>
// //   );
// // }

// // function BottomTab() {
//   return (
//     <NavigationContainer>
//     <App />
//       <Tab.Navigator screenOptions={{ headerShown: false }}>
//         <Tab.Screen name='Home' component={dashboard} />
//         <Tab.Screen name='Assessment' component={Assessment} />
//         <Tab.Screen name='Chat' component={Chat} />
//         <Tab.Screen name='Bible Verse' component={BibleVerse} />
//         <Tab.Screen name='Profile' component={profile} />
//       </Tab.Navigator>
//       <StatusBar style='light' />
//     </NavigationContainer>
//   )
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import Register from './screens/Register';
import dashboard from './screens/dashboard';
import Chat from './screens/Chat';
import ChatScreen from './screens/ChatScreen';
import Assessment from './screens/Assessment';
import profile from './screens/profile';
import MyJournal from './screens/MyJournal';
import AddJournal from './screens/AddJournal';
import EditJournal from './screens/EditJournal';
import VolunteersList from './screens/VolunteersList';
import AssessmentAnxiety from './screens/AssessmentAnxiety';
import AssessmentDepression from './screens/AssessmentDepression';
import AssessmentStress from './screens/AssessmentStress';
import AssessmentStressAcademic from './screens/AssessmentStressAcademic';
import AssessmentStressRelationship from './screens/AssessmentStressRelationship';
import AssessmentStressWork from './screens/AssessmentStressWork';
import AssessmentResultAnxiety from './screens/AssessmentResultAnxiety';
import AssessmentResultDepression from './screens/AssessmentResultDepression';
import AssessmentResultStressAcademic from './screens/AssessmentResultStressAcademic';
import AssessmentResultStressRelationship from './screens/AssessmentResultStressRelationship';
import AssessmentResultStressWork from './screens/AssessmentResultStressWork';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Register' component={Register}/>
        <Stack.Screen name='dashboard' component={BottomTab}/>
        <Stack.Screen name='Chat' component={Chat}/>
        <Stack.Screen name='ChatScreen' component={ChatScreen}/>
        <Stack.Screen name='Assessment' component={Assessment}/>
        <Stack.Screen name='AssessmentResultAnxiety' component={AssessmentResultAnxiety}/>
        <Stack.Screen name='AssessmentResultDepression' component={AssessmentResultDepression}/>
        <Stack.Screen name='AssessmentResultStressAcademic' component={AssessmentResultStressAcademic}/>
        <Stack.Screen name='AssessmentResultStressRelationship' component={AssessmentResultStressRelationship}/>
        <Stack.Screen name='AssessmentResultStressWork' component={AssessmentResultStressWork}/>
        <Stack.Screen name='AssessmentAnxiety' component={AssessmentAnxiety}/>
        <Stack.Screen name='AssessmentDepression' component={AssessmentDepression}/>
        <Stack.Screen name='AssessmentStress' component={AssessmentStress}/>
        <Stack.Screen name='AssessmentStressAcademic' component={AssessmentStressAcademic}/>
        <Stack.Screen name='AssessmentStressRelationship' component={AssessmentStressRelationship}/>
        <Stack.Screen name='AssessmentStressWork' component={AssessmentStressWork}/>
        <Stack.Screen name='MyJournal' component={MyJournal}/>
        <Stack.Screen name='profile' component={profile}/>
        <Stack.Screen name='AddJournal' component={AddJournal}/>
        <Stack.Screen name='EditJournal' component={EditJournal}/>
        <Stack.Screen name='VolunteersList' component={VolunteersList}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function BottomTab() {
  return (
    <>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name='Home' component={dashboard} />
        <Tab.Screen name='Assessment' component={Assessment} />
        <Tab.Screen name='My Journal' component={MyJournal} />
        <Tab.Screen name='Volunteers' component={VolunteersList} />
        <Tab.Screen name='Chat' component={Chat} />
        <Tab.Screen name='Profile' component={profile} />
      </Tab.Navigator>
      <StatusBar style='light' />
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});