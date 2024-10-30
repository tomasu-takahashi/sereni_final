import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import { db } from '../firebase';
import { getAuth } from "firebase/auth";
import { ref, get } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const AssessmentHistory = () => {
const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [result, setResult] = useState('');
  const [assessmentResults, setAssessmentResults] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    setUser(user);
  }, []);

  useEffect(() => {
    if (user) {
      setUserId(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (userId) {
      const resultsRef = ref(db, `users/${userId}/assessmentResults`);
      get(resultsRef).then((snapshot) => {
        if (snapshot.exists()) {
          const resultsData = snapshot.val();
          const resultsArray = Object.values(resultsData);
          // Sort the resultsArray by the assessmentTaken property in ascending order
          const sortedArray = resultsArray.sort((a, b) => a.assessmentTaken - b.assessmentTaken);
          // Reverse the order of the array
          setAssessmentResults(sortedArray.reverse());
        } else {
          console.log('No data available');
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  }, [userId]);

  const renderItem = ({ item, index }) => (
    <View style={styles.result}>
      <Text style={styles.resultText}>Result: {item.result}</Text>
      <Text style={styles.resultText}>Assessment Taken: {new Date(item.assessmentTaken).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
    </View>
  );

  return (
    <ImageBackground source={require('../assets/bgMain.jpg')} style={styles.backgroundImage}>
    <View style={styles.topHeader}>
            <TouchableOpacity style={styles.backButtonStyle} onPress={() => navigation.navigate('dashboard')}>
                <AntDesign name="left" size={21} color="#222831" />
                <Text style={{ fontSize: 18, color: '#222831', fontWeight: '600', paddingRight: 5 }}>Back</Text>
            </TouchableOpacity>
    </View>
    <View style={styles.container}>
      <Text style={styles.title}>Assessment History</Text>
      <FlatList
        data={assessmentResults}
        renderItem={({ item, index }) => (
          <View style={styles.listItemContainer}>
            {renderItem({ item, index })}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
    backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    },
    topHeader: {
    justifyContent: 'flex-start',
    paddingTop: '20%',
    paddingLeft: 10,
    flexDirection: 'row',
    },
    backButtonStyle: {
    position: 'relative',
    flexDirection: 'row',
    },
    container: {
      flex: 1,
      padding: 10,
    },
    title: {
        color: '#222831',
        fontSize: 32,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 20,
        paddingLeft: 10
    },
    listItemContainer: {
      backgroundColor: '#f9f9f9',
      padding: 10,
      borderRadius: 10,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
    shadowRadius: 2,
    },
    result: {
      padding: 1,
    },
    resultText: {
      fontSize: 20,
      padding: 5,
    
    },
  });
export default AssessmentHistory;