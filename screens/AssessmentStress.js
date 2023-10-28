import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, ImageBackground } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const AssessmentStress = ({ navigation }) => {
  const [selectedButton, setSelectedButton] = useState({});

  useFocusEffect(
    React.useCallback(() => {
      setSelectedButton({});
    }, [])
  );

  const handleAnswerChange = (buttonValue, questionIndex) => {
    setSelectedButton({ ...selectedButton, [questionIndex]: buttonValue });
  };

  const handleSubmit = () => {
    // Calculate the total score
    let totalScore = 0;
    Object.values(selectedButton).forEach((answer) => {
      totalScore += answer;
    });

    let result = '';
    if (totalScore >= 0 && totalScore <= 18) {
      result = 'No Stress';
    } else if (totalScore >= 19 && totalScore <= 32) {
      result = 'Mild Stress';
    } else if (totalScore >= 33 && totalScore <= 49) {
      result = 'Severe Stress';
    } else if (totalScore >= 50 && totalScore <= 59) {
      result = 'Dangerous';
    } else if (totalScore >= 60) {
      result = 'Extremely Dangerous';
    }

    // Redirect to the AssessmentResult component and pass the result and totalScore as props
    navigation.navigate('AssessmentResultStress', { result, totalScore });
  };

  const questionText = [
    'I feel run down and drained of physical or emotional energy.',
    'I have negative thoughts about my job.',
    'I am harder and less sympathetic with people than perhaps they deserve.',
    'I am easily irritated by small problems, or by my co-workers and team.',
    'I feel misunderstood or unappreciated by my co-workers.',
    'I feel that I have no one to talk to.',
    'I feel that I am achieving less than I should.',
    'I feel under an unpleasant level of pressure to succeed.',
    'I feel I am not getting what I want out of my job.',
    'I feel that I am in the wrong organization or the wrong profession.',
    'I am frustrated with parts of my job.',
    'I feel that organizational politics or bureaucracy frustrate my ability to do a good job.',
    'I feel that there is more work to do than I practically have the ability to do.',
    'I feel that I do not have time to do many of the things that are important to doing a good quality job.',
    'I find that I do not have time to plan as much as I would like to.',
  ];

  return (
    <ImageBackground source={require('../assets/bgMain.png')} style={styles.backgroundImage}>
      <Text style={styles.title}>Stress</Text>
      <ScrollView contentContainerStyle={styles.container}>
        {questionText.map((question, index) => (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.question}>
              {index + 1}. {question}
            </Text>
            <View style={styles.buttonContainer}>
              {[
                { label: 'Not at All', value: 1 },
                { label: 'Rarely', value: 2 },
                { label: 'Sometimes', value: 3 },
                { label: 'Often', value: 4 },
                { label: 'Very Often', value: 5 }
              ].map((answer, buttonIndex) => (
                <TouchableOpacity
                  key={buttonIndex}
                  onPress={() => handleAnswerChange(answer.value, index + 1)}
                  style={[
                    styles.answerButton,
                    selectedButton[index + 1] === answer.value && styles.selectedAnswerButton,
                  ]}
                >
                  <Text style={styles.answerText}>{answer.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};       
export default AssessmentStress;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    color: '#ededed',
    textAlign: 'center',
    backgroundColor: '#2C2B56',
    padding: 50,
    paddingBottom: 20,
  },
  questionContainer: {
    justifyContent: 'center',
    backgroundColor: 'rgba(21, 21, 21, 0.5)',
    padding: 20,
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
  question: {
    fontSize: 18,
    marginBottom: 10,
    color: '#ededed',
  },
  buttonContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
  },
  answerButton: {
    backgroundColor: '#444382',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
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
  selectedAnswerButton: {
    backgroundColor: '#655FF3', // Change the color of the selected button
  },
  answerText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#ededed',
  },
  submitButton: {
    backgroundColor: '#655FF3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign:'center'
  },
});