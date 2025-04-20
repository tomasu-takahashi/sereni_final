import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { db } from '../firebase';
import { getAuth } from "firebase/auth";
import { ref, push, set } from 'firebase/database';

const AssessmentGuideResults = ({ route, navigation }) => {
    const [selectedButton, setSelectedButton] = useState({});
    const { result } = route.params;
    console.log(result);
    
    const topicAssessment = (imageSource) => {
      console.log('REDIRECTTT',result);
      switch (result) {
        case 'Anxiety':
          navigation.navigate('AssessmentAnxiety', { imageSource: require('../assets/anxiety.png') });
          break;
        case 'Depression':
          navigation.navigate('AssessmentDepression', { imageSource: require('../assets/depression.png') });
          break;
        case 'Stress':
          navigation.navigate('AssessmentStress', { imageSource: require('../assets/stress.png') });
          break;
        case 'Healthy':
          navigation.navigate('dashboard', { imageSource: require('../assets/healthy.png') });
          break;
      }
    }

    const auth = getAuth();
    const user = auth.currentUser;

    const [userId, setUserId] = useState('');

    useEffect(() => {
      if (user) {
        setUserId(user.uid);
      }
    }, [user]);

    useEffect(() => {
      if (userId && result === 'Healthy') {
        const resultRef = ref(db, `users/${userId}/assessmentResults`);
        const newResultRef = push(resultRef);
        const resultData = {
          result: result,
          assessmentTaken: new Date().getTime()
        };

        set(newResultRef, resultData).then(() => {
          console.log('Data saved successfully!');
        }).catch((error) => {
          console.error('Error saving data:', error);
        });
      }
    }, [userId, result]);

  return (
    <ImageBackground source={require('../assets/bgMain.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        
        {result === 'Anxiety' && <Image source={require('../assets/anxiety.png')} style={styles.resultImage} />}
        {result === 'Depression' && <Image source={require('../assets/depression.png')} style={styles.resultImage} />}
        {result === 'Stress' && <Image source={require('../assets/stress.png')} style={styles.resultImage} />}
        {result === 'Healthy' && <Image source={require('../assets/healthy.png')} style={styles.healthyResultImage} />}

        <Text style={result === 'Healthy' ? {...styles.title, display: 'flex'} : styles.title}>
          {result === 'Healthy' ? 'You are' : 'You are experiencing'}
        </Text>

        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{result}</Text>
        </View>

      </View>
      <View style={styles.buttonContainer}>
        {result === 'Healthy' ? (
          <TouchableOpacity style={styles.exitButton} onPress={() => navigation.navigate('dashboard')}>
            <Text style={styles.buttonText}>Exit</Text>
            <AntDesign name="right" size={23} color="#00ADB5" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={topicAssessment}>
            <Text style={styles.buttonText}>Proceed to Next Test</Text>
            <AntDesign name="right" size={23} color="#00ADB5" />
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
};

export default AssessmentGuideResults;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    padding: 10,
  },
  title: {
    fontSize: 28,
    color: '#222831',
    textAlign: 'flex-start',
    paddingTop: 20,
    color: '#222831',
    marginLeft: 20
  },
  resultContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  resultText: {
    fontSize: 45,
    color: '#222831',
    textAlign: 'center',
    fontWeight: '500',
    marginLeft: 20
  },
  healthyResultImage: {
    alignSelf: 'center',
    position: 'relative',
    top: 40,
    width: 380,
    height: 500,
    resizeMode: 'contain',
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  resultImage: {
    alignSelf: 'center',
    position: 'relative',
    top: 40,
    width: 500,
    height: 500,
    resizeMode: 'contain',
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exitButton: {
    position: 'relative',
    top: 120,
    left: 130,
    borderRadius: 7,
    flexDirection: 'row',
  },
  button: {
    position: 'relative',
    top: 120,
    left: 55,
    borderRadius: 7,
    flexDirection: 'row',
  },
  buttonText: {
    color: '#00ADB5',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
    paddingRight: 2
  },
});