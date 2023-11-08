import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';

const AssessmentResultAnxiety = ({ route, navigation }) => {
  const { totalScore } = route.params;
  const [selectedButton, setSelectedButton] = useState({});
  const [showActivities, setShowActivities] = useState(false);
  const [showVerse, setShowVerse] = useState(false);

  let result = '';
  let message = '';
  let recommendedActivities = '';
  let bibleVerse = '';

  if (totalScore >= 0 && totalScore <= 16) {
    result = 'Mild Anxiety';
    message = 'A person with mild anxiety may come across as being shy, self-conscious, and even a little awkward. These symptoms are usually present since childhood and can progress into adulthood if left unaddressed. In addition to worsening symptoms, the development of unhealthy coping strategies – such as alcohol abuse – is a serious concern for people who do not receive counseling or therapy for mild anxiety.';
    recommendedActivities = '• Continue to practice healthy lifestyle habits, such as getting enough sleep, eating a healthy diet, and exercising regularly.\n\n• Spend time with loved ones and engage in activities you enjoy.\n\n• Be mindful of your thoughts and feelings, and learn to challenge negative thoughts and beliefs.\n\n• Practice relaxation techniques such as deep breathing and meditation.\n\n• You may find it helpful to start journaling about your anxiety. This can help you identify and track your triggers, and develop coping strategies.';
    bibleVerse = "\n\n• Proverbs 12:25\nWorry weighs a person down; an encouraging word cheers a person up.\n\n• Matthew 6:27\nCan all your worries add a single moment to your life?\n\n• Matthew 11:28\nThen Jesus said, Come to me, all of you who are weary and carry heavy burdens, and I will give you rest.\n\n• Matthew 6:25\nThat is why I tell you not to worry about everyday life—whether you have enough food and drink, or enough clothes to wear. Isn’t life more than food, and your body more than clothing?\n\n• 2 Thessalonians 3:16\nNow may the Lord of peace himself give you his peace at all times and in every situation. The Lord be with you all.";

  } else if (totalScore >= 17 && totalScore <= 24) {
    result = 'Moderate Anxiety';
    message = 'Moderate anxiety is anxiety level 2, which involves more frequent or persistent symptoms than those of mild anxiety, but still allows for daily functioning in comparison to severe anxiety or panic disorder. For instance, people with moderate anxiety may experience symptoms like jitteriness or feeling on edge, being unable to control their worrying, or being unable to relax for most days of the week.';
    recommendedActivities = '• You want to consider talking to a therapist or counselor. They can help you understand your anxiety and develop a treatment plan.\n\n• Continue with the strategies, and seek professional help if your anxiety is interfering with your daily life.\n\n• Your therapist may recommend cognitive-behavioral therapy (CBT), which is a type of therapy that can help you challenge negative thoughts and beliefs.\n\n• They may also recommend medication, such as anxiolytics or antidepressants.';
    bibleVerse = "\n\n• Psalm 55:22\nGive your burdens to the Lord, and he will take care of you. He will not permit the godly to slip and fall.\n\n• Psalm 37:5\nCommit everything you do to the Lord. Trust him, and he will help you.\n\n• Ephesians 3:17\nThen Christ will make his home in your hearts as you trust in him. Your roots will grow down into God’s love and keep you strong.\n\n• 2 Corinthians 5:17\nThis means that anyone who belongs to Christ has become a new person. The old life is gone; a new life has begun!\n\n• Matthew 11:29\nTake my yoke upon you. Let me teach you because I am humble and gentle at heart, and you will find rest for your souls.";
  
  } else if (totalScore >= 25) {
    result = 'Severe Anxiety';
    message = 'The third level of anxiety is where debilitating symptoms begin to emerge. Severe anxiety symptoms meet the diagnostic criteria for clinically-significant anxiety disorder or generalized anxiety disorder (GAD). There are physical symptoms of severe anxiety, including head and stomach aches, shaking, and frequent urination, and then there are behavioral symptoms, like the inability to control worrying, distress that’s disproportionate to the situation, inability to relax, difficulty concentrating, and more.';
    recommendedActivities = '• If you have severe anxiety, it is important to seek professional help immediately.\n\n• Your therapist may recommend a combination of CBT, medication, and other treatments.\n\n• It is also important to have a support system in place, such as family, friends, or a support group for people with anxiety.\n\n• If you have very severe anxiety, you may need to be hospitalized. In the hospital, you will be monitored and treated by medical professionals.';
    bibleVerse = "\n\n• Romans 8:38-39\nAnd I am convinced that nothing can ever separate us from God’s love. Neither death nor life, neither angels nor demons, neither our fears for today nor our worries about tomorrow—not even the powers of hell can separate us from God’s love.\n\n• Psalm 34:17\nThe Lord hears his people when they call to him for help. He rescues them from all their troubles.\n\n• Matthew 6:34\nSo don’t worry about tomorrow, for tomorrow will bring its own worries. Today’s trouble is enough for today.\n\n• Isaiah 41:10\nSo do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous hand.\n\n• John 16:33\nI have told you all this so that you may have peace in me. Here on earth, you will have many trials and sorrows. But take heart, because I have overcome the world.";
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

  const handleShowVerse = () => {
    // Toggle the showVerse state to show/hide the bible verse
    setShowVerse(!showVerse);
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
        {showVerse && (
          <View contentContainerStyle={styles.verseContainer}>
            <Text style={styles.messageText}>{bibleVerse}</Text>
          </View>
        )}
        </ScrollView>
        <TouchableOpacity style={styles.showButton} onPress={handleShowActivities}>
          <Text style={styles.buttonText}>
          {showActivities ? 'Show Results' : 'Show Recommended Activities'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.showButton} onPress={handleShowVerse}>
          <Text style={styles.buttonText}>
            {showVerse ? 'Hide Bible Verse' : 'Show Bible Verse'}
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

export default AssessmentResultAnxiety;

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
  verseContainer: {
    justifyContent: 'center',
    backgroundColor: 'rgba(21, 21, 21, 0.5)',
    padding: 10,
    borderRadius: 10,
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
  bibleVerseContainer: {
    justifyContent: 'center',
    backgroundColor: 'rgba(21, 21, 21, 0.5)',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
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