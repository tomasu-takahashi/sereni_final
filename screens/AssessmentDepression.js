import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, ImageBackground } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const AssessmentDepression = ({ navigation }) => {
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
    if (totalScore >= 0 && totalScore <= 10) {
      result = 'No Depression';
    } else if (totalScore >= 11 && totalScore <= 16) {
      result = 'Mild';
    } else if (totalScore >= 17 && totalScore <= 20) {
      result = 'Moderate';
    } else if (totalScore >= 21 && totalScore <= 30) {
      result = 'High';
    } else if (totalScore >= 31) {
      result = 'Severe';
    }

    // Redirect to the AssessmentResult component and pass the result and totalScore as props
    navigation.navigate('AssessmentResultDepression', { result, totalScore });
  };

  const questionText = [
    'I feel overwhelmingly sad at times',
    'When I think of the future I feel hopeless',
    'I feel like a complete failure',
    'I get a lot of satisfaction/joy from doing things',
    'I feel guilty about something most of the time',
    'I feel like I am being punished',
    'I feel disappointed (even disgusted) with myself',
    'The bad things in my life aren’t all my fault',
    'I am often on the brink of tears or cry',
    'I feel irritated and annoyed by things in my life',
    'I am very interested in other people’s lives and like to listen to them',
    'I find it easy to make decisions, big and small',
    'I think I am unattractive or ugly',
    'I find it really hard to do anything, especially work',
    'My sleep patterns have been really disrupted',
    'I am so tired I don’t have the energy to do anything',
    'My appetite has changed a lot',
    'I have lost a lot of weight',
    'I am very concerned, even preoccupied, with my physical health',
    'I am not interested in sexual relations at all',
    'I have thought about ending my life',
  ];

  return (
    <ImageBackground source={require('../assets/bgMain.png')} style={styles.backgroundImage}>
      <Text style={styles.title}>Depression</Text>
      <ScrollView contentContainerStyle={styles.container}>
        {questionText.map((question, index) => (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.question}>
              {index + 1}. {question}
            </Text>
            <View style={styles.buttonContainer}>
              {[
                { label: 'Definitely Disagree', value: 0 },
                { label: 'Slightly Disagree', value: 1 },
                { label: 'Slightly Agree', value: 2 },
                { label: 'Definitely Agree', value: 3 },
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
export default AssessmentDepression;

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