import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';

const AssessmentResultStressWork = ({ route, navigation }) => {
  const { totalScore } = route.params;
  const [selectedButton, setSelectedButton] = useState({});
  const [showActivities, setShowActivities] = useState(false);

  let result = '';
  let message = '';
  let recommendedActivities = '';

  if (totalScore >= 0 && totalScore <= 15) {
    result = 'No Stress';
    message = 'Chilled out and relatively calm. Stress isn’t much of an issue.';
    recommendedActivities = 'Take a break: Get up and move around, go for a walk, or listen to calming music.\n\nMeditate or practice deep breathing: This can help to center your mind and reduce stress levels.\n\nConnect with nature: Spend some time outdoors, go for a hike, or sit by a river or lake.\n\nSpend time with loved ones: Social support can help to reduce stress and improve overall well-being.\n\nRead the Bible: Reading passages from the Bible that bring you peace andcomfort can be a helpful way to reduce stress.';
 
  } else if (totalScore >= 16 && totalScore <= 20) {
    result = 'Mild Stress';
    message = 'Fairly low. Coping should be a breeze, but you probably have a tough day now and then. Still, count your blessings.';
    recommendedActivities = "Set realistic goals and expectations: Don't try to do too much at once, and break down large tasks into smaller, more manageable ones.\n\nTake breaks throughout the day: Get up and move around, or step outside for some fresh air.\n\nDelegate tasks when possible: Don't be afraid to ask for help from colleagues or supervisors.\n\nTake care of yourself: Make sure to get enough sleep, eat healthy foods, and exercise regularly.\n\nRead the Bible: Reading passages from the Bible that remind you of God's love and care for you can help to reduce stress and improve your overall mood.";
 
  } else if (totalScore >= 21 && totalScore <= 25) {
    result = 'Moderate Stress';
    message = 'Moderate stress. Some things about your job are likely to be pretty stressful, but probably not much more than most people experience and are able to cope with. Concentrate on seeing what can be done to reduce items with the worst scores.';
    recommendedActivities = "Identify your stressors: Once you know what's causing you stress, you can start to develop strategies for coping with it.\n\nTalk to someone you trust: Talking to a friend, family member, therapist, or other trusted person can help you to process your stress and find healthy ways to cope.\n\nLearn relaxation techniques: There are a number of relaxation techniques that can help to reduce stress, such as deep breathing, meditation, and yoga.\n\nMake lifestyle changes: Eating a healthy diet, getting enough sleep, and exercising regularly can all help to reduce stress levels.\n\nRead the Bible: Reading passages from the Bible that offer hope and encouragement can help you to cope with stress and difficult times.";

  } else if (totalScore >= 26 && totalScore <= 30) {
    result = 'High Stress';
    message = 'You may still be able to cope, but life at work can sometimes be miserable. Several of your scores are probably extreme. You could be in the wrong job, or even in the right job but at the wrong time, and might benefit from counseling.';
    recommendedActivities = "Seek professional help: If your work stress is severe and interfering with your daily life, it's important to seek professional help. A therapist can teach you coping skills and help you develop a stress management plan.\n\nTake a break from work: If possible, take some time off from work to relax and recharge.\n\nMake significant lifestyle changes: If your work stress is being caused by unhealthy lifestyle habits, such as poor sleep habits, a poor diet, or lack of exercise, making significant lifestyle changes can help to reduce stress levels.\n\nRead the Bible: Reading passages from the Bible that remind you of God's promises and love can be a source of strength and comfort during difficult times.";
  
  } else if (totalScore >= 31) {
    result = 'Severe Stress';
    message = 'Stress level is potentially dangerous – the more so the higher your score. You should seek professional assistance, especially if you feel your health is affected, or you might need to consider a job change.';
    recommendedActivities = "Seek professional help immediately: If your work stress is potentially dangerous, it's important to seek professional help immediately. A therapist can assess your situation and develop a treatment plan to help you manage your stress and prevent serious health problems.\n\nTake a break from work: It's important to take a break from work if your stress is causing you to experience physical or mental health problems.\n\nMake significant lifestyle changes: Making significant lifestyle changes, such as eating a healthy diet, getting enough sleep, and exercising regularly, can help to reduce stress levels and improve overall health.\n\nRead the Bible: Reading passages from the Bible that offer hope and encouragement can help you to cope with stress and difficult times.";
  }

  if (showActivities) {
    message = recommendedActivities;
  }

  const handleRetakeTest = () => {
    // Reset the selectedButton state to an empty object
    setSelectedButton({});
    // Navigate back to the assessment screen
    navigation.navigate('AssessmentStressWork');
  };

  const handleClose = () => {
    // Navigate to the home screen
    navigation.navigate('dashboard');
  };

  const handleShowActivities = () => {
    // Toggle the showActivities state to show/hide the activities
    setShowActivities(!showActivities);
  };

  return (
    <ImageBackground source={require('../assets/bgMain.png')} style={styles.backgroundImage}>
      <Text style={styles.title}>Your Assessment Result</Text>
      <View style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{result}</Text>
        </View>
        <ScrollView contentContainerStyle={styles.messageContainer}>
          <Text style={styles.messageText}>{message}</Text>
        </ScrollView>
        <TouchableOpacity style={styles.showButton} onPress={handleShowActivities}>
          <Text style={styles.buttonText}>
            {showActivities ? 'Show Results' : 'Show Recommended Activities'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRetakeTest}>
          <Text style={styles.buttonText}>Take Test Again</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.exitButton} onPress={handleClose}>
          <Text style={styles.buttonText}>Exit</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default AssessmentResultStressWork;

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
    fontSize: 24,
    color: '#ededed',
    textAlign: 'center',
    backgroundColor: '#2C2B56',
    padding: 50,
    paddingBottom: 20,
  },
  resultContainer: {
    justifyContent: 'center',
    backgroundColor: 'rgba(21, 21, 21, 0.5)',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 5,
    ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 3
        },
      }),
  },
  resultText: {
    fontSize: 26,
    color: '#ededed',
    textAlign: 'center'
  },
  messageContainer: {
    justifyContent: 'center',
    backgroundColor: 'rgba(21, 21, 21, 0.5)',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 5,
    ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 3
        },
      }),
  },
  messageText: {
    color: '#ededed',
    fontSize: 18,
  },
  buttonContainer: {
    padding: 10,
    paddingBottom: 20
  },
  button: {
    backgroundColor: '#655FF3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 10,
    elevation: 5,
    ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 3
        },
      }),
  },
  showButton: {
    backgroundColor: '#C1A9CF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 10,
    elevation: 5,
    ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 3
        },
      }),
  },
  exitButton: {
    backgroundColor: '#444382',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 10,
    elevation: 5,
    ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 3
        },
      }),
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});