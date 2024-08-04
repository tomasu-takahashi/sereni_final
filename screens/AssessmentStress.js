import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, ImageBackground } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const AssessmentStress = ({ navigation }) => {
  const [selectedButton, setSelectedButton] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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
    if (totalScore >= 0 && totalScore <= 7) {
      result = 'Normal';
    } else if (totalScore >= 8 && totalScore <= 9) {
      result = 'Mild';
    } else if (totalScore >= 10 && totalScore <= 12) {
      result = 'Moderate';
    } else if (totalScore >= 13 && totalScore <= 16) {
      result = 'Severe';
    } else if (totalScore >= 17) {
      result = 'Extremely Severe';
    }

    // Redirect to the AssessmentResult component and pass the result and totalScore as props
    navigation.navigate('AssessmentResultStress', { result, totalScore });
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionText.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleGoToQuestion = (questionIndex) => {
    setCurrentQuestionIndex(questionIndex);
  };


  const questionText = [
    'I found it hard to wind down',
    'I tender to over-react to situations',
    'I felt that I was using a lot of nervous energy',
    'I found myself getting agitated',
    'I found it difficult to relax',
    'I was intolerant of anything that kept me from getting on with what I was doing',
    'I felt that I was rather touchy'
  ];

  const currentQuestion = questionText[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questionText.length) * 100;

  return (
    <ImageBackground source={require('../assets/bgMain.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Stress Assessment</Text>
        <View style={styles.progressBar}>
          <View style={{ width: `${progress}%`, backgroundColor: '#00ADB5', height: 10, borderRadius: 5 }} />
        </View>

        <View style={styles.questionContainer}>
          <Text style={styles.question}>
            {currentQuestionIndex + 1}. {currentQuestion}
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
                onPress={() => handleAnswerChange(answer.value, currentQuestionIndex)}
                style={[
                  styles.answerButton,
                  selectedButton[currentQuestionIndex] === answer.value && styles.selectedAnswerButton,
                ]}
              >
                <Text style={styles.answerButtonText}>{answer.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.buttonGroup}>
          {currentQuestionIndex !== 0 && (
            <TouchableOpacity onPress={handlePreviousQuestion} style={styles.previousButton}>
              <AntDesign name="left" size={23} color="#00ADB5" />
              <Text style={styles.navigationText}>Previous</Text>
            </TouchableOpacity>
          )}
          {currentQuestionIndex < questionText.length - 1 ? (
            <TouchableOpacity onPress={handleNextQuestion} style={styles.nextButton}>
              <Text style={styles.navigationText}>Next</Text>
              <AntDesign name="right" size={23} color="#00ADB5" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
              <Text style={styles.navigationText}>Submit</Text>
              <AntDesign name="right" size={23} color="#00ADB5" />
            </TouchableOpacity>
          )}
        </View>
        
        <Text style={styles.title2}>Go to Question:</Text>
        <View style={styles.goToButtonContainer}>
          {questionText.map((answer, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.goToButton,
                index === currentQuestionIndex && styles.selectedGoToButton,
              ]}
              onPress={() => handleGoToQuestion(index)}
            >
              <Text style={styles.answerButtonText}>{index + 1}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </View>
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
    fontSize: 28,
    color: '#222831',
    paddingLeft: 15,
    paddingTop: 90,
    paddingBottom: 15, 
    fontWeight: '500'
  },
  questionContainer: {
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    height: '50%',
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
    color: '#222831',
    fontWeight: '500'
  },
  buttonContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
  },
  answerButton: {
    backgroundColor: '#FAF9F6',
    borderColor: '#8BE8E5',
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 5,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3
  },
  selectedAnswerButton: {
    backgroundColor: '#8BE8E5'
  },
  answerButtonText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#222831',
    fontWeight: '600',
  },
  buttonGroup: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  submitButton: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },
  nextButton: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },
  previousButton: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    paddingRight: 100
  },
  navigationText: {
    color: '#00ADB5',
    fontSize: 20,
    textAlign:'center',
    fontWeight: '600'
  },
  goToButtonContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  goToButton: {
    backgroundColor: '#FAF9F6',
    borderColor: '#8BE8E5',
    borderWidth: 2,
    padding: 8,
    borderRadius: 10,
    margin: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3
  },
  selectedGoToButton: {
  backgroundColor: '#8BE8E5',
},
  title2: {
    fontSize: 18,
    color: '#222831',
    paddingLeft: 15,
    paddingTop: 20,
    paddingBottom: 10, 
    fontWeight: '500'
  },
  progressBar: {
    alignSelf: 'center',
    width: '90%',
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
    marginBottom: 20,
  },
});