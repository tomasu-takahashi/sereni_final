import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import Logout from './screens/Logout';
import Register from './screens/Register';
import dashboard from './screens/dashboard';
import Assessment from './screens/Assessment';
import MyJournal from './screens/MyJournal';
import AddJournal from './screens/AddJournal';
import EditJournal from './screens/EditJournal';
import AssessmentAnxiety from './screens/AssessmentAnxiety';
import AssessmentDepression from './screens/AssessmentDepression';
import AssessmentStress from './screens/AssessmentStress';
import AssessmentResultAnxiety from './screens/AssessmentResultAnxiety';
import AssessmentResultDepression from './screens/AssessmentResultDepression';
import AssessmentResultStress from './screens/AssessmentResultStress';
import bibleVerse from './screens/bibleVerse';
import forgotPassword from './screens/forgotPassword';
import AssessmentGuideQuestions from './screens/AssessmentGuideQuestions';
import AssessmentGuideResults from './screens/AssessmentGuideResults';
import { Ionicons } from '@expo/vector-icons'; 
import { LogBox } from 'react-native';
import React, { useEffect } from 'react';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  useEffect(()=> {
    LogBox.ignoreAllLogs();
  }, [])    

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Logout' component={Logout} />
        <Stack.Screen name='forgotPassword' component={forgotPassword} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='dashboard' component={BottomTab} />
        <Stack.Screen name='Assessment' component={Assessment} />
        <Stack.Screen name='AssessmentGuideQuestions' component={AssessmentGuideQuestions} />
        <Stack.Screen name='AssessmentGuideResults' component={AssessmentGuideResults} />
        <Stack.Screen name='AssessmentResultAnxiety' component={AssessmentResultAnxiety} />
        <Stack.Screen name='AssessmentResultDepression' component={AssessmentResultDepression} />
        <Stack.Screen name='AssessmentResultStress' component={AssessmentResultStress} />
        <Stack.Screen name='AssessmentAnxiety' component={AssessmentAnxiety} />
        <Stack.Screen name='AssessmentDepression' component={AssessmentDepression} />
        <Stack.Screen name='AssessmentStress' component={AssessmentStress} />
        <Stack.Screen name='MyJournal' component={MyJournal} />
        <Stack.Screen name='AddJournal' component={AddJournal} />
        <Stack.Screen name='EditJournal' component={EditJournal} />
        <Stack.Screen name='bibleVerse' component={bibleVerse} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function BottomTab() {
  return (
    <>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Assessment') {
            iconName = focused ? 'bulb-sharp' : 'bulb-outline';
          } else if (route.name === 'My Journal') {
            iconName = focused ? 'bookmark' : 'bookmark-outline';
          } 
          return <Ionicons name={iconName} size={size} color={'rgba(115, 169, 173, 1)'} />;
        },
      })}
        tabBarOptions={{
          activeTintColor: 'rgba(115, 169, 173, 1)', // Change this to the color you want for active tabs
          inactiveTintColor: 'rgba(115, 169, 173, 1)', // Change this to the color you want for inactive tabs
        }}
        tabBarStyle={{
          backgroundColor: 'rgba(115, 169, 173, 1)', // Change this to the background color you want for the bottom tab
        }}
      >
        <Tab.Screen name='Home' component={dashboard} options={{headerShown: false, headerStyle: {backgroundColor:'#F4D03F', height: '4.8%',}}} />
        <Tab.Screen name='Assessment' component={Assessment} options={{headerShown: false}}/>
        <Tab.Screen name='My Journal' component={MyJournal} options={{headerShown: false}}/>
      </Tab.Navigator>
      <StatusBar style='' />
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
