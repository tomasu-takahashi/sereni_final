import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, ImageBackground } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const AssessmentGuideQuestions = ({ navigation }) => {
  const [selectedButton, setSelectedButton] = useState({});
   
  useFocusEffect(
    React.useCallback(() => {
      setSelectedButton({});
    }, [])
  );

  const handleAnswerChange = (value, questionIndex, topicIndex) => {
    setSelectedButton((prevState) => {
      const updatedSelectedButton = { ...prevState };
      updatedSelectedButton[topicIndex] = {
        ...(prevState[topicIndex] ?? {}),
        [questionIndex]: value,
      };
      console.log(updatedSelectedButton);
      return updatedSelectedButton;
    });
  };

  const handleSubmit = () => {
    // Calculate the total scores for each category
    
    let anxietyScore = 0;
    let depressionScore = 0;
    let stressScore = 0;

  
    Object.entries(selectedButton).forEach(([topicIndex, answers]) => {
      Object.values(answers).forEach((answer, questionIndex) => {
        console.log('topic: ',topicIndex,' score: ',answer);
        if (topicIndex === '0') {
          anxietyScore += answer;
        } else if (topicIndex === '1') {
          depressionScore += answer;
        } else if (topicIndex === '2') {
          stressScore += answer;
        }
      });
    });

    let result = '';
    let highestScore = Math.max(anxietyScore, depressionScore, stressScore);
    console.log('HIGHESTTT',highestScore)
    if (highestScore === anxietyScore) {
      result = 'Anxiety';
    } else if (highestScore === depressionScore) {
      result = 'Depression';
    } else if (highestScore === stressScore) {
      result = 'Stress';
    }
    console.log(result);
  
    // Redirect to the AssessmentResult component and pass the result
    navigation.navigate('AssessmentGuideResults', { result });
  };

  const anxietyQuestions = [
    'I felt dizzy, like I was about to faint',
    'I had trouble breathing (e.g. fast breathing), even though I was not exercising and I was not sick.',
    'My hands felt shaky',
    'I felt terrified',
    'I felt like I was about to panic',
    'I could feel my heart beating really fast, even though I had not done any hard exercise',
    'I felt scared for no good reason'
  ];

  const depressionQuestions = [
    'I did not enjoy anything',
    'I hated my life',
    'There was nothing nice I could look forward to',
    'I could not stop feeling sad',
    'I hated myself',
    'I felt like I was no good',
    'I felt that life was terrible'
  ];

  const stressQuestions = [
    'I got upset about little things',
    'I found myself over-reacting to situations',
    'I was stressing about lots of things',
    'I was easily irritated',
    'I found it difficult to relax',
    'I got annoyed when people interrupted me',
    'I was easily annoyed'
  ];

  const questionText = [
    anxietyQuestions,
    depressionQuestions,
    stressQuestions
  ];

  return (
    <ImageBackground source={require('../assets/bgMain.png')} style={styles.backgroundImage}>
      <Text style={styles.title}>Guide Questions</Text>
      <ScrollView contentContainerStyle={styles.container}>
        {questionText.map((questionArray, topicIndex) => (
          <View key={topicIndex} style={styles.topicContainer}>
            {questionArray.map((question, questionIndex) => (
              <View key={questionIndex} style={styles.questionContainer}>
                <Text style={styles.question}>{question}</Text>
                <View style={styles.buttonContainer}>
                  {[
                    { label: 'Not true', value: 0 },
                    { label: 'A little true', value: 1 },
                    { label: 'Fairly true', value: 2 },
                    { label: 'Very true', value: 3 }
                  ].map((answer, buttonIndex) => (
                    <TouchableOpacity
                      key={buttonIndex}
                      onPress={() => handleAnswerChange(answer.value, questionIndex, topicIndex)}
                      style={[
                        styles.answerButton,
                        selectedButton[topicIndex]?.[questionIndex] === answer.value && styles.selectedAnswerButton,
                      ]}
                    >
                      <Text style={styles.answerText}>{answer.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>
        ))}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};       
export default AssessmentGuideQuestions;

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