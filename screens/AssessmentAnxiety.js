import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, ImageBackground } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const AssessmentAnxiety = ({ navigation }) => {
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
    if (totalScore >= 0 && totalScore <= 3) {
      result = 'Normal';
    } else if (totalScore >= 4 && totalScore <= 5) {
      result = 'Mild';
    } else if (totalScore >= 6 && totalScore <= 7) {
      result = 'Moderate';
    } else if (totalScore >= 8 && totalScore <= 9) {
      result = 'Severe';
    } else if (totalScore >= 10) {
      result = 'Extremely Severe';
    }

    // Redirect to the AssessmentResult component and pass the result and totalScore as props
    navigation.navigate('AssessmentResultAnxiety', { result, totalScore });
  };

  const questionText = [
    'I was aware of dryness of my mouth',
    'I experienced breathing difficulty (eg, excessively rapid breathing, breathlessness in the absence of physical exertion)',
    'I experienced trembling (eg, in the hands)',
    'I was worried about situation in which I might panic and make a fool of myself',
    'I felt I was close to panic',
    'I was aware of the action of my heart in the absence of physicalexertion (eg, sence of heart rate increase, heart missing a beat)',
    'I felt scared without any good reason'
  ];

  return (
    <ImageBackground source={require('../assets/bgMain.png')} style={styles.backgroundImage}>
      <Text style={styles.title}>Anxiety</Text>
      <ScrollView contentContainerStyle={styles.container}>
        {questionText.map((question, index) => (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.question}>
              {index + 1}. {question}
            </Text>
            <View style={styles.buttonContainer}>
              {[
                { label: 'Never', value: 0 },
                { label: 'Sometimes', value: 1 },
                { label: 'Often', value: 2 },
                { label: 'Almost Always', value: 3 },
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
export default AssessmentAnxiety;

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