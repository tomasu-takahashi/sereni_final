import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';

const AssessmentResultDepression = ({ route, navigation }) => {
  const { totalScore } = route.params;
  const [selectedButton, setSelectedButton] = useState({});
  const [showActivities, setShowActivities] = useState(false);
  const [showVerse, setShowVerse] = useState(false);

  let result = '';
  let message = '';
  let recommendedActivities = '';
  let bibleVerse = '';

  if (totalScore >= 0 && totalScore <= 10) {
    result = 'No Depression';
    message = 'The scores you have given suggest you are not suffering from depression – however this is a very quick test and people experience depression in many different ways – so if you are concerned we would always recommend seeking advise from your GP or a mental health professional, like a psychiatrist \n\nYou might want to consider a full assessment with a Consultant Psychiatrist would also assess for other common conditions such as anxiety or bipolar and can be great place to start – particularly if you have experienced low moods for a long time or have any other mental health concerns.';
    recommendedActivities = '• Stay active:\nExercise is a great way to improve your mood and reduce stress. Aim for at least 30 minutes of moderate-intensity exercise most days of the week.\n\n• Get enough sleep:\nWhen you are well-rested, you are better able to cope with stress and manage your mood. Aim for 7-8 hours of sleep per night.\n\n• Eat a healthy diet:\nEating nutritious foods gives your body the fuel it needs to function properly. Avoid processed foods and sugary drinks, and focus on eating plenty of fruits, vegetables, and whole grains.\n\n• Connect with others:\nSocial support is important for mental health. Spend time with loved ones, join a club or group, or volunteer in your community.\n\n• Practice mindfulness:\nMindfulness is the practice of paying attention to the present moment without judgment. There are many different ways to practice mindfulness, such as meditation, yoga, or simply taking a few minutes each day to focus on your breath.';
    bibleVerse = "\n\n• Deuteronomy 31:8\n“The Lord himself goes before you and will be with you; he will never leave you nor forsake you. Do not be afraid; do not be discouraged.”\n\n• Philippians 4:8\n“Finally, brothers and sisters, whatever is true, whatever is noble, whatever is right, whatever is pure, whatever is lovely, whatever is admirable—if anything is excellent or praiseworthy—think about such things.” \n\n• Philippians 4:13\n\“I can do all things through Christ who strengthens me.”\n\n• John 16:33\n“I have told you these things, so that in me you may have peace. In this world you will have trouble. But take heart! I have overcome the world.”\n\n• Jeremiah 29:11\n“For I know the plans I have for you, declares the Lord, plans for peace and not for evil, to give you a future and a hope.”";

  } else if (totalScore >= 11 && totalScore <= 16) {
    result = 'Mild Depression';
    message = 'The scores you have given suggest may be suffering from mild mood disturbances - however this is a very quick test and people experience depression in many different ways – so if you are concerned we would always recommend seeking advise from your GP or a mental health professional, like a psychiatrist\n\nYou might want to consider a full assessment with a Consultant Psychiatrist would also assess for other common conditions such as anxiety or bipolar and can be great place to start – particularly if you have experienced low moods for a long time or have any other mental health concerns.';
    recommendedActivities = '• Talking to a therapist:\nA therapist can help you to understand your depression and develop coping mechanisms.\n\n• Starting a journal:\nJournaling can be a helpful way to track your mood and identify triggers for your depression.\n\n• Trying relaxation techniques:\nRelaxation techniques such as deep breathing and meditation can help to reduce stress and improve your mood.';
    bibleVerse = '\n\n• Psalms 9:9\n“The Lord is a shelter for the oppressed, a refuge in times of trouble."\n\n• Psalms 23:4\n“Even when I walk through the darkest valley, I will not be afraid, for you are close beside me. Your rod and your staff protect and comfort me.”\n\n• 1 Corinthians 13:13\n“Three things will last forever—faith, hope, and love—and the greatest of these is love.”\n\n• 2 Corinthians 4:18\n“So we don’t look at the troubles we can see now; rather, we fix our gaze on things that cannot be seen. For the things we see now will soon be gone, but the things we cannot see will last forever.”\n\n• Psalms 23:3\n“He renews my strength. He guides me along the right paths, bringing honor to his name.”';

  } else if (totalScore >= 17 && totalScore <= 20) {
    result = 'Moderate Depression';
    message = 'The scores you have given suggest may be suffering from depression.\n\nWhilst feeling sad at times can be very normal, if you have experienced your symptoms for more than two weeks we would always urge you to seek help as soon as possible. There are very effective treatments for depression; often the sooner treatment is started, the more effective it can be.';
    recommendedActivities = '• If you have moderate depression, it is important to seek professional help. A therapist can teach you coping skills and help you develop a treatment plan.\n\n• You may also want to consider taking medication. Antidepressants can help to improve your mood and reduce the severity of your symptoms.';
    bibleVerse = '\n\n• Isaiah 40:31\n…but they who wait for the Lord shall renew their strength; they shall mount up with wings like eagles; they shall run and not be weary; they shall walk and not faint\n\n• Romans 8:26\n"Likewise the Spirit helps us in our weakness. For we do not know what to pray for as we ought, but the Spirit himself intercedes for us with groanings too deep for words."\n\n• Revelation 21:4\n"He will wipe away every tear from their eyes, and death shall be no more, neither shall there be mourning, nor crying, nor pain anymore, for the former things have passed away.”\n\n• Romans 15:13\n"May the God of hope fill you with all joy and peace in believing, so that by the power of the Holy Spirit you may abound in hope."\n\n• Psalm 145:14\n“The Lord upholds all who fall and lifts up all who are bowed down.”';

  } else if (totalScore >= 21 && totalScore <= 30) {
    result = 'High Depression';
    message = 'The scores you have given suggest are likely to be suffering with depression and report many of the common symptoms.\n\nThe symptoms you report can be debilitating, impacting on many areas of your life. It is common for people with depression to feel hopeless and unsure that there is anything that can be done for them. Whilst depression can be difficult to understand for those suffering and their families, it can be successfully treated, and many people go on to lead happy, fulfilled lives.';
    recommendedActivities = '• If you have high or severe depression, it is important to seek immediate professional help. You may need to be hospitalized to ensure your safety and well-being.\n\n• Art therapy to express emotions and reduce stress.\n\n• Establishing a daily routine to provide structure and stability.\n\n• Setting small, achievable goals to build a sense of accomplishment.\n\n• Involving friends and family for emotional support and assistance with daily tasks.';
    bibleVerse = '\n\n• Isaiah 41:10\n…fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, I will help you, I will uphold you with my righteous right hand\n\n• Psalm 40:1-3\nI waited patiently for the Lord; he inclined to me and heard my cry. He drew me up from the pit of destruction, out of the miry bog, and set my feet upon a rock, making my steps secure. He put a new song in my mouth, a song of praise to our God\n\n• Psalm 34:18-19\nThe Lord is near to the brokenhearted and saves the crushed in spirit. Many are the afflictions of the righteous, but the Lord delivers him out of them all';

  } else if (totalScore >= 31) {
    result = 'Severe Depression';
    message = 'The scores you have given suggest are very likely to be suffering with depression and report many of the common symptoms.\n\nThe symptoms you report can be very serious. Often sufferers with clinical depression struggle to lead ‘normal’ lives. It is very common for people with depression to feel hopeless and unsure that there is anything that can be done for them. Whilst depression can be difficult to understand for those suffering and their families, it can be successfully treated and many people go on to lead happy, fulfilled lives.';
    recommendedActivities = "• Seek Professional Psychiatrist.\n\n• Animal-assisted therapy with trained therapy animals.\n\n• Music therapy to enhance emotional expression and relaxation.\n\n• Progressive muscle relaxation techniques to reduce physical tension.\n\n• Cognitive-behavioral therapy (CBT) exercises to challenge and reframe negative thought patterns.";
    bibleVerse = '\n\n• Isaiah 41:10\n…fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, I will help you, I will uphold you with my righteous right hand\n\n• Psalm 40:1-3\nI waited patiently for the Lord; he inclined to me and heard my cry. He drew me up from the pit of destruction, out of the miry bog, and set my feet upon a rock, making my steps secure. He put a new song in my mouth, a song of praise to our God\n\n• Psalm 34:18-19\nThe Lord is near to the brokenhearted and saves the crushed in spirit. Many are the afflictions of the righteous, but the Lord delivers him out of them all';
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