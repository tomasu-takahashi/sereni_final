import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';

const AssessmentResultStressRelationship = ({ route, navigation }) => {
  const { totalScore } = route.params;
  const [selectedButton, setSelectedButton] = useState({});
  const [showActivities, setShowActivities] = useState(false);

  let result = '';
  let message = '';
  let recommendedActivities = '';
  if (totalScore >= 0 && totalScore <= 35) {
    result = 'Low Stress';
    message = 'You are fortunate to be successful at building and maintaining happy and productive relationships with those around you.';
    recommendedActivities = 'Spend time together: Make time to do things you enjoy together, whether it is going on dates, taking walks, or just talking.\n\nCommunicate openly and honestly: Talk to each other about your feelings, needs, and expectations.\n\nBe supportive of each other: Be there for each other through good times and bad.\n\nAppreciate each other: Express your gratitude for each other and the things you love about each other.\n\nRead the Bible together: Studying the Bible together can help you to grow closer to each other and to God.';
  } else if (totalScore >= 36 && totalScore <= 55) {
    result = 'Moderate Stress';
    message = 'While you will be able to form happy and productive relationships, please revisit this questionnaire and trace items to which you have awarded 3 or more marks. These are the elements that might be roadblocks in your relationship management.';
    recommendedActivities = "Set common goals: Having common goals can give you something to work towards together and help you to stay motivated.\n\nWork together to achieve your goals: Support each other's efforts and celebrate each other's successes.\n\nDivide and conquer: Break down tasks into smaller, more manageable pieces and assign them to each other based on your strengths and interests.\n\nCommunicate regularly: Keep each other updated on your progress and discuss any challenges you are facing.\n\nCelebrate your successes: Take the time to celebrate your accomplishments together, big or small.";
  } else if (totalScore >= 56) {
    result = 'High Stress';
    message = 'It appears that a lot of your experiences with self and others are negative and dysfunctional. It may be beneficial to seek therapy or counseling to negotiate them and minimize them in the future.';
    recommendedActivities = 'Seek professional help: If you are in a dysfunctional relationship, it is important to seek professional help. A therapist can help you to identify the problems in your relationship and develop strategies for coping with them.\n\nSet boundaries: It is important to set boundaries with people in dysfunctional relationships. This means communicating your needs and expectations and being firm in upholding them.\n\nTake care of yourself: It is important to take care of yourself, both physically and emotionally, when you are in a dysfunctional relationship. Make sure to get enough sleep, eat healthy foods, and exercise regularly.\n\nPray for your relationship: Pray for your relationship and for the other person. Pray that God will give you wisdom and guidance on how to handle the situation.';
  }

  if (showActivities) {
    message = recommendedActivities;
  }

  const handleRetakeTest = () => {
    // Reset the selectedButton state to an empty object
    setSelectedButton({});
    // Navigate back to the assessment screen
    navigation.navigate('AssessmentStressRelationship');
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

export default AssessmentResultStressRelationship;

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