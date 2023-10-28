import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';

const AssessmentResultStress = ({ route, navigation }) => {
  const { totalScore } = route.params;
  const [selectedButton, setSelectedButton] = useState({});
  const [showActivities, setShowActivities] = useState(false);
  const [showVerse, setShowVerse] = useState(false);

  let result = '';
  let message = '';
  let recommendedActivities = '';
  let bibleVerse = '';

  if (totalScore >= 0 && totalScore <= 18) {
    result = 'No Stress';
    message = 'No sign of stress here';
    recommendedActivities = 'Listen to Soothing Music: Put on calming music to relax and unwind.\n\nBreathe Mindfully: Practice slow, deep breathing exercises.\n\nShort Nature Walk: Take a leisurely walk in a nearby park or nature reserve.\n\nGentle Stretching: Perform light stretching exercises to relieve muscle tension.\n\nLaugh: Watch a funny video or spend time with someone who makes you laugh.';
    bibleVerse = "\n\n• Psalm 34:4\nI sought the Lord, and he answered me; he delivered me from all my fears.\n\n• Psalm 23:2\nHe makes me lie down in green pastures, he leads me beside quiet waters.\n\n• Exodus 33:14\nThe Lord replied, 'My Presence will go with you, and I will give you rest.\n\n• Joshua 1:9\nHave I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.\n\n• Proverbs 17:22\nA cheerful heart is good medicine, but a crushed spirit dries up the bones.";

  } else if (totalScore >= 19 && totalScore <= 32) {
    result = 'Mild Stress';
    message = 'Little sign of stress here, unless some factors are particularly severe.';
    recommendedActivities = 'Meditation: Set aside a few minutes for meditation to calm your mind.\n\nYoga Session: Follow a yoga routine to reduce stress and tension.\n\nJournaling: Write down your thoughts and feelings to gain clarity.\n\nTalk to a Friend: Share your concerns and feelings with a trusted friend or family member.\n\nUnplug and Disconnect: Take a break from digital devices to clear your mind.';
    bibleVerse = '\n\n• Matthew 28:20\nAnd teaching them to obey everything I have commanded you. And surely I am with you always, to the very end of the age.\n\n• Psalm 4:8\nIn peace I will lie down and sleep, for you alone, Lord, make me dwell in safety.\n\n• 2 Thessalonians 3:16\nNow may the Lord of peace himself give you peace at all times and in every way. The Lord be with all of you.\n\n• Psalm 34:17\nThe righteous cry out, and the Lord hears them; he delivers them from all their troubles.\n\n• 2 Peter 1:3\nHis divine power has given us everything we need for life and godliness through our knowledge of him who called us by his own glory and goodness.';

  } else if (totalScore >= 33 && totalScore <= 49) {
    result = 'Severe Stress';
    message = 'Be careful – you may be at risk of stress, particularly if several scores are high.';
    recommendedActivities = 'Important. Professional Counseling: Seek therapy or counseling from a mental health professional.\n\nDeep Muscle Relaxation: Practice progressive muscle relaxation techniques.\n\nNature Retreat: Spend a weekend in a peaceful natural environment to reset.\n\nMindfulness Retreat: Attend a mindfulness or meditation retreat for a few days.\n\nMental Health Consultation: Consult with a mental health expert for personalized guidance.';
    bibleVerse = "\n\n• James 1:2-4\nConsider it pure joy, my brothers and sisters, whenever you face trials of many kinds, because you know that the testing of your faith produces perseverance. Let perseverance finish its work so that you may be mature and complete, not lacking anything.\n\n• Psalm 118:5-6\nWhen hard pressed, I cried to the Lord; he brought me into a spacious place. The Lord is with me; I will not be afraid. What can mere mortals do to me?\n\n• Luke 6:48\nThey are like a man building a house, who dug down deep and laid the foundation on rock. When a flood came, the torrent struck that house but could not shake it because it was well built.\n\n• Luke 21:34\nBe careful, or your hearts will be weighed down with carousing, drunkenness, and the anxieties of life, and that day will close on you suddenly like a trap.\n\n• Isaiah 35:4\nSay to those with fearful hearts, Be strong, do not fear; your God will come, he will come with vengeance; with divine retribution, he will come to save you.\n";

  } else if (totalScore >= 50 && totalScore <= 59) {
    result = 'Dangerous';
    message = 'You are at severe risk of stress do something about this urgently.';
    recommendedActivities = 'Meditate: Taking just five minutes for meditation can significantly reduce stress and anxiety.\n\nCuddle With a Pet: Spending time with a pet can boost self-esteem and provide comfort when dealing with dangerous stress.\n\nChew Gum: Chewing gum for a few minutes can reduce anxiety and lower cortisol levels, offering a quick solution for high-stress situations.\n\nSip Green Tea: Green tea contains L-Theanine, which can help relieve anger and calm your nerves.\n\nLaugh: Laughter can increase blood flow and boost immunity, making it an effective way to combat stress and depression.';
    bibleVerse = '\n\n• 2 Corinthians 4:7-9\nBut we have this treasure in jars of clay to show that this all-surpassing power is from God and not from us. We are hard-pressed on every side, but not crushed; perplexed, but not in despair; persecuted, but not abandoned; struck down, but not destroyed.\n\n• Psalm 46:1-3\nGod is our refuge and strength, an ever-present help in trouble. Therefore we will not fear, though the earth gives way and the mountains fall into the heart of the sea, though its waters roar and foam and the mountains quake with their surging.\n\n• Proverbs 3:5-6\nTrust in the Lord with all your heart and lean not on your understanding; in all your ways submit to him, and he will make your paths straight.\n\n• Romans 12:1\nRejoice in hope, be patient in tribulation, be constant in prayer.\n\n• 1 Corinthians 16:13\nBe on your guard; stand firm in the faith; be courageous; be strong.';

  } else if (totalScore >= 60) {
    result = 'Extremely Dangerous';
    message = 'You are at very severe risk of stress do something about this urgently.';
    recommendedActivities = 'Drip Cold Water On Your Wrists: Applying cold water to your wrists and behind your earlobes can help calm your entire body during extremely high-stress moments.\n\nCreate a Zen Zone: Setting up a tranquil space for relaxation can be an essential tool for managing extreme stress.\n\nWrite It Down: Journaling your feelings can make them feel less overwhelming during moments of extreme stress.\n\nSlurp Some Honey: Consuming honey can reduce inflammation in the brain, helping to fight depression and anxiety.\n\nTalk to a Friend: Sharing your feelings with a friend can provide emotional support and relief during periods of extreme stress.';
    bibleVerse = '\n\n• Romans 16:20\nThe God of peace will soon crush Satan under your feet. The grace of our Lord Jesus be with you.\n\n• Romans 8:6\nThe mind governed by the flesh is death, but the mind governed by the Spirit is life and peace.\n\n• Luke 21:19\nStand firm, and you will win life.\n\n• Psalm 37:5\nCommit your way to the Lord; trust in him and he will do this.\n\n• Hebrews 13:6\nSo we say with confidence, "The Lord is my helper; I will not be afraid. What can mere mortals do to me?"';
  }

  if (showActivities) {
    message = recommendedActivities;
  } 


  const handleRetakeTest = () => {
    // Reset the selectedButton state to an empty object
    setSelectedButton({});
    // Navigate back to the assessment screen
    navigation.navigate('AssessmentStress');
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

export default AssessmentResultStress;

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