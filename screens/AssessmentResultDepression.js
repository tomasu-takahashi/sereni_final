import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';

const AssessmentResultDepression = ({ route, navigation }) => {
  const { totalScore } = route.params;
  const [selectedButton, setSelectedButton] = useState({});
  const [showActivities, setShowActivities] = useState(false);

  let result = '';
  let message = '';
  let recommendedActivities = '';

  if (totalScore >= 0 && totalScore <= 10) {
    result = 'No Depression';
    message = 'The scores you have given suggest you are not suffering from depression – however this is a very quick test and people experience depression in many different ways – so if you are concerned we would always recommend seeking advise from your GP or a mental health professional, like a psychiatrist \n\nYou might want to consider a full assessment with a Consultant Psychiatrist would also assess for other common conditions such as anxiety or bipolar and can be great place to start – particularly if you have experienced low moods for a long time or have any other mental health concerns.';
    recommendedActivities = 'Stay active: Exercise is a great way to improve your mood and reduce stress. Aim for at least 30 minutes of moderate-intensity exercise most days of the week.\n\nGet enough sleep: When you are well-rested, you are better able to cope with stress and manage your mood. Aim for 7-8 hours of sleep per night.\n\nEat a healthy diet: Eating nutritious foods gives your body the fuel it needs to function properly. Avoid processed foods and sugary drinks, and focus on eating plenty of fruits, vegetables, and whole grains.\n\nConnect with others: Social support is important for mental health. Spend time with loved ones, join a club or group, or volunteer in your community.\n\nPractice mindfulness: Mindfulness is the practice of paying attention to the present moment without judgment. There are many different ways to practice mindfulness, such as meditation, yoga, or simply taking a few minutes each day to focus on your breath.';
 
  } else if (totalScore >= 11 && totalScore <= 16) {
    result = 'Mild Depression';
    message = 'The scores you have given suggest may be suffering from mild mood disturbances - however this is a very quick test and people experience depression in many different ways – so if you are concerned we would always recommend seeking advise from your GP or a mental health professional, like a psychiatrist\n\nYou might want to consider a full assessment with a Consultant Psychiatrist would also assess for other common conditions such as anxiety or bipolar and can be great place to start – particularly if you have experienced low moods for a long time or have any other mental health concerns.';
    recommendedActivities = 'Talking to a therapist: A therapist can help you to understand your depression and develop coping mechanisms.\n\nStarting a journal: Journaling can be a helpful way to track your mood and identify triggers for your depression.\n\nTrying relaxation techniques: Relaxation techniques such as deep breathing and meditation can help to reduce stress and improve your mood.';
 
  } else if (totalScore >= 17 && totalScore <= 20) {
    result = 'Moderate Depression';
    message = 'The scores you have given suggest may be suffering from depression.\n\nWhilst feeling sad at times can be very normal, if you have experienced your symptoms for more than two weeks we would always urge you to seek help as soon as possible. There are very effective treatments for depression; often the sooner treatment is started, the more effective it can be.';
    recommendedActivities = 'If you have moderate depression, it is important to seek professional help. A therapist can teach you coping skills and help you develop a treatment plan.\n\nYou may also want to consider taking medication. Antidepressants can help to improve your mood and reduce the severity of your symptoms.';

  } else if (totalScore >= 21 && totalScore <= 30) {
    result = 'High Depression';
    message = 'The scores you have given suggest are likely to be suffering with depression and report many of the common symptoms.\n\nThe symptoms you report can be debilitating, impacting on many areas of your life. It is common for people with depression to feel hopeless and unsure that there is anything that can be done for them. Whilst depression can be difficult to understand for those suffering and their families, it can be successfully treated, and many people go on to lead happy, fulfilled lives.';
    recommendedActivities = 'If you have high or severe depression, it is important to seek immediate professional help. You may need to be hospitalized to ensure your safety and well-being.\n\nArt therapy to express emotions and reduce stress.\n\nEstablishing a daily routine to provide structure and stability.\n\nSetting small, achievable goals to build a sense of accomplishment.\n\nInvolving friends and family for emotional support and assistance with daily tasks.';
  
  } else if (totalScore >= 31) {
    result = 'Severe Depression';
    message = 'The scores you have given suggest are very likely to be suffering with depression and report many of the common symptoms.\n\nThe symptoms you report can be very serious. Often sufferers with clinical depression struggle to lead ‘normal’ lives. It is very common for people with depression to feel hopeless and unsure that there is anything that can be done for them. Whilst depression can be difficult to understand for those suffering and their families, it can be successfully treated and many people go on to lead happy, fulfilled lives.';
    recommendedActivities = "Seek Professional Psychiatrist.\n\nAnimal-assisted therapy with trained therapy animals.\n\nMusic therapy to enhance emotional expression and relaxation.\n\nProgressive muscle relaxation techniques to reduce physical tension.\n\nCognitive-behavioral therapy (CBT) exercises to challenge and reframe negative thought patterns.";
  }

  if (showActivities) {
    message = recommendedActivities;
  }

  const handleRetakeTest = () => {
    // Reset the selectedButton state to an empty object
    setSelectedButton({});
    // Navigate back to the assessment screen
    navigation.navigate('AssessmentDepression');
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