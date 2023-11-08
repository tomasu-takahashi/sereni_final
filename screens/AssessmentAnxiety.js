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
    if (totalScore >= 0 && totalScore <= 16) {
      result = 'Mild Anxiety';
    } else if (totalScore >= 17 && totalScore <= 24) {
      result = 'Moderate Anxiety';
    } else if (totalScore >= 25) {
      result = 'Severe Anxiety';
    }

    // Redirect to the AssessmentResult component and pass the result and totalScore as props
    navigation.navigate('AssessmentResultAnxiety', { result, totalScore });
  };

  const questionText = [
    'Anxious mood:\nWorries, anticipation of the worst, fearful anticipation, irritability',
    'Tension:\nFeelings of tension, fatigability, startle response, moved to tears easily, trembling, feelings of restlessness, inability to relax',
    'Fears:\nOf dark, of strangers, of being left alone, of animals, of traffic, of crowds',
    'Insomnia:\nDifficulty in falling asleep, broken sleep, unsatisfying sleep and fatigue on waking, dreams, nightmares, night terrors',
    'Intellectual:\nDifficulty in concentration, poor memory',
    'Depressed mood:\nLoss of interest, lack of pleasure in hobbies, depression, early waking, diurnal swing',
    'Somatic(muscular):\nPains and aches, twitching, stiffness, myoclonic jerks, grinding of teeth, unsteady voice, increased muscular tone',
    'Somatic(sensory):\nTinnitus, blurring of vision, hot and cold flushes, feelings of weakness, pricking sensation',
    'Cardiovascular symptoms:\nTachycardia, palpitations, pain in chest, throbbing of vessels, fainting feelings, missing beat',
    'Respiratory symptoms:\nPressure or constriction in chest, choking feelings, sighing, dyspnea',
    'Gastrointestinal symptoms:\nDifficulty in swallowing, wind abdominal pain, burning sensations, abdominal fullness, nausea, vomiting, borborygmi, looseness of bowels, loss of weight, constipation',
    'Genitourinary symptoms:\nFrequency of micturition, urgency of micturition, amenorrhea, menorrhagia, development of frigidity, premature ejaculation, loss of libido, impotence',
    'Autonomic symptoms:\nDry mouth, flushing, pallor, tendency to sweat, giddiness, tension headache, raising of hair',
    'Behavior at interview:\nFidgeting, restlessness or pacing, tremor of hands, furrowed brow, strained face, sighing or rapid respiration, facial pallor, swallowing, etc.'
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
                { label: 'Not present', value: 0 },
                { label: 'Mild', value: 1 },
                { label: 'Moderate', value: 2 },
                { label: 'Severe', value: 3 },
                { label: 'Very Severe', value: 4 },
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