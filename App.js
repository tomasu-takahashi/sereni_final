import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import Logout from './screens/Logout';
import Register from './screens/Register';
import dashboard from './screens/dashboard';
import goals from './screens/goals';
import goalsAnxiety from './screens/goalsAnxiety';
import goalsDepression from './screens/goalsDepression';
import goalsStress from './screens/goalsStress';
import Assessment from './screens/Assessment';
import MyJournal from './screens/MyJournal';
import recycleBin from './screens/recycleBin';
import AddJournal from './screens/AddJournal';
import EditJournal from './screens/EditJournal';
import professionalInformation from './screens/professionalInformation';
import professional0 from './screens/professional0';
import professional1 from './screens/professional1';
import professional2 from './screens/professional2';
import professional3 from './screens/professional3';
import professional4 from './screens/professional4';
import professional5 from './screens/professional5';
import professional6 from './screens/professional6';
import professional7 from './screens/professional7';
import professional8 from './screens/professional8';
import professional9 from './screens/professional9';
import professional10 from './screens/professional10';
import professional11 from './screens/professional11';
import professional12 from './screens/professional12';
import professional13 from './screens/professional13';
import professional14 from './screens/professional14';
import AssessmentGuide from './screens/AssessmentGuide';
import AssessmentHistory from './screens/AssessmentHistory';
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

const App = () => {

  useEffect(()=> {
    LogBox.ignoreAllLogs();
  }, [])    

  return (
    <View style={styles.appShell}>
      <View style={styles.mobileFrame}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='LogOut' component={Logout} />
            <Stack.Screen name='forgotPassword' component={forgotPassword} />
            <Stack.Screen name='Register' component={Register} />
            <Stack.Screen name='dashboard' component={BottomTab} />
            <Stack.Screen name='goals' component={goals} />
            <Stack.Screen name='goalsAnxiety' component={goalsAnxiety} />
            <Stack.Screen name='goalsDepression' component={goalsDepression} />
            <Stack.Screen name='goalsStress' component={goalsStress} />
            <Stack.Screen name='professionalInformation' component={professionalInformation} />
            <Stack.Screen name='professional0' component={professional0} />
            <Stack.Screen name='professional1' component={professional1} />
            <Stack.Screen name='professional2' component={professional2} />
            <Stack.Screen name='professional3' component={professional3} />
            <Stack.Screen name='professional4' component={professional4} />
            <Stack.Screen name='professional5' component={professional5} />
            <Stack.Screen name='professional6' component={professional6} />
            <Stack.Screen name='professional7' component={professional7} />
            <Stack.Screen name='professional8' component={professional8} />
            <Stack.Screen name='professional9' component={professional9} />
            <Stack.Screen name='professional10' component={professional10} />
            <Stack.Screen name='professional11' component={professional11} />
            <Stack.Screen name='professional12' component={professional12} />
            <Stack.Screen name='professional13' component={professional13} />
            <Stack.Screen name='professional14' component={professional14} />
            <Stack.Screen name='Assessment' component={Assessment} />
            <Stack.Screen name='AssessmentGuide' component={AssessmentGuide} />
            <Stack.Screen name='AssessmentHistory' component={AssessmentHistory} />
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
            <Stack.Screen name='recycleBin' component={recycleBin} />
            <Stack.Screen name='bibleVerse' component={bibleVerse} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </View>
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
          } else if (route.name === 'Goals') {
            iconName = focused ? 'trophy' : 'trophy-outline';
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
        <Tab.Screen name='Goals' component={goals} options={{headerShown: false}}/>
        <Tab.Screen name='My Journal' component={MyJournal} options={{headerShown: false}}/>
      </Tab.Navigator>
      <StatusBar style='' />
    </>
  )
}

const styles = StyleSheet.create({
  appShell: {
    flex: 1,
    alignItems: Platform.OS === 'web' ? 'center' : 'stretch',
    backgroundColor: Platform.OS === 'web' ? '#eef5f4' : '#fff',
  },
  mobileFrame: {
    flex: 1,
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 430 : undefined,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
