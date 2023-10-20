import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';

const AssessmentResultDepression = ({ route, navigation }) => {
  const { totalScore } = route.params;
  const [selectedButton, setSelectedButton] = useState({});
  const [showActivities, setShowActivities] = useState(false);

  let result = '';
  let message = '';
  let recommendedActivities = '';
  if (totalScore >= 0 && totalScore <= 16) {
    result = 'Mild Anxiety';
    message = 'A person with mild anxiety may come across as being shy, self-conscious, and even a little awkward. These symptoms are usually present since childhood and can progress into adulthood if left unaddressed. In addition to worsening symptoms, the development of unhealthy coping strategies – such as alcohol abuse – is a serious concern for people who do not receive counseling or therapy for mild anxiety.';
    recommendedActivities = 'Continue to practice healthy lifestyle habits, such as getting enough sleep, eating a healthy diet, and exercising regularly.\n\nSpend time with loved ones and engage in activities you enjoy.\n\nBe mindful of your thoughts and feelings, and learn to challenge negative thoughts and beliefs.\n\nPractice relaxation techniques such as deep breathing and meditation.\n\nYou may find it helpful to start journaling about your anxiety. This can help you identify and track your triggers, and develop coping strategies.';
  } else if (totalScore >= 17 && totalScore <= 24) {
    result = 'Moderate Anxiety';
    message = 'Moderate anxiety is anxiety level 2, which involves more frequent or persistent symptoms than those of mild anxiety, but still allows for daily functioning in comparison to severe anxiety or panic disorder. For instance, people with moderate anxiety may experience symptoms like jitteriness or feeling on edge, being unable to control their worrying, or being unable to relax for most days of the week.';
    recommendedActivities = 'You want to consider talking to a therapist or counselor. They can help you understand your anxiety and develop a treatment plan.\n\nContinue with the strategies, and seek professional help if your anxiety is interfering with your daily life.\n\nYour therapist may recommend cognitive-behavioral therapy (CBT), which is a type of therapy that can help you challenge negative thoughts and beliefs.\n\nThey may also recommend medication, such as anxiolytics or antidepressants.';
  } else if (totalScore >= 31) {
    result = 'Severe Anxiety';
    message = 'The third level of anxiety is where debilitating symptoms begin to emerge. Severe anxiety symptoms meet the diagnostic criteria for clinically-significant anxiety disorder or generalized anxiety disorder (GAD). There are physical symptoms of severe anxiety, including head and stomach aches, shaking, and frequent urination, and then there are behavioral symptoms, like the inability to control worrying, distress that’s disproportionate to the situation, inability to relax, difficulty concentrating, and more.';
    recommendedActivities = 'If you have severe anxiety, it is important to seek professional help immediately.\n\nYour therapist may recommend a combination of CBT, medication, and other treatments.\n\nIt is also important to have a support system in place, such as family, friends, or a support group for people with anxiety.\n\nIf you have very severe anxiety, you may need to be hospitalized. In the hospital, you will be monitored and treated by medical professionals.';
  }

  if (showActivities) {
    message = recommendedActivities;
  }

  const handleRetakeTest = () => {
    // Reset the selectedButton state to an empty object
    setSelectedButton({});
    // Navigate back to the assessment screen
    navigation.navigate('AssessmentAnxiety');
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

export default AssessmentResultDepression;

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