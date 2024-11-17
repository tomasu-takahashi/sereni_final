import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import Carousel from './Carousel';
import { db } from '../firebase';
import { getAuth } from "firebase/auth";
import { ref, push, set } from 'firebase/database';
import { AntDesign } from '@expo/vector-icons';

const AssessmentResultStress = ({ route, navigation }) => {
  const { totalScore } = route.params;
  // const [selectedButton, setSelectedButton] = useState({});
  // const [showActivities, setShowActivities] = useState(false);
  // const [showVerse, setShowVerse] = useState(false);

  let result = '';
  let message = '';
  let recommendedActivities = '';
  let bibleVerse = '';

  if (totalScore >= 0 && totalScore <= 7) {
    result = 'Low Stress';
    message = "Serene Seas: The Normal Range\n\nImagine a tranquil ocean scene, sunlight glinting off gentle waves lapping against a pristine beach. This represents the normal range of stress, where you experience occasional pressure or challenges but can manage them effectively. It's like the ebb and flow of the tide, adding a natural rhythm to life without disrupting its overall serenity.\n\nRemember, even the calmest seas can experience occasional storms, and even the most turbulent waters can eventually calm. If you're struggling with stress at any level, don't hesitate to reach out for help. Therapists and counselors can equip you with the tools and strategies to navigate the waves of stress, guiding you towards a healthier and more peaceful shore.";
    recommendedActivities = "• Maintain healthy lifestyle habits:\n\nPrioritize regular exercise, healthy sleep, and a balanced diet. These practices can build your body's resilience to stress.\n\n\n• Engage in relaxation techniques:\n\nPractice deep breathing, mindfulness meditation, or yoga to calm your mind and body.\n\n\n• Connect with loved ones:\n\nSpend quality time with friends and family. Social support can be a powerful buffer against stress.\n\n\n• Pursue hobbies and interests:\n\nEngaging in activities you enjoy can provide a sense of accomplishment and reduce stress levels.\n\n\n• Schedule time for self-care:\n\nMake time for activities that bring you joy and relaxation, like reading, taking a bath, or listening to music.";
    bibleVerse = "• Matthew 6:34\n\n’Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own.’\n(NIV) - Encourages focusing on the present moment and avoiding unnecessary worry.\n\n\n• Proverbs 16:23\n\n’The heart of man plans his way, but the Lord establishes his steps.’\n(NIV) - Reminds us that ultimately, God guides our paths even amidst our plans.\n\n\n• Psalm 127:2\n\n’In vain you rise early and go late to bed, working to feed yourselves; for he gives sleep to his loved ones.’\n(NIV) - Offers reassurance that God provides for our needs and encourages healthy rest.\n\n\n• Philippians 4:8\n\n’Finally, brothers and sisters, whatever is true, whatever is noble, whatever is right, whatever is pure, whatever is lovely, whatever is commendable, if there is any excellence, if there is anything worthy of praise, think about these things.’\n(NIV) - Guides our thoughts towards positivity and gratitude, promoting mental well-being.\n\n\n• Proverbs 3:5-6\n\n’Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.’\n(NIV) - Encourages surrender to God's guidance and trusting His plan amidst life's uncertainties.\n\n\n• Ecclesiastes 3:1\n\n’There is a time for everything, and a season for every activity under heaven.’\n(NIV) - Acknowledges the natural ebb and flow of life, encouraging acceptance and finding balance amidst stressful times.\n\n\n• Psalm 121:1-2\n\n’I lift up my eyes to the mountains— where does my help come from? My help comes from the Lord, the Maker of heaven and earth.’\n(NIV) - Reminds us that our ultimate source of strength and help comes from God.";

  } else if (totalScore >= 8 && totalScore <= 9) {
    result = 'Mild Stress';
    message = "A Few Ripples: The Mild Level\n\nPicture a few ripples disturbing the otherwise smooth ocean surface. This is the mild level of stress, where you might encounter 2-3 symptoms like occasional worry, mild irritation, or difficulty concentrating. It's like a light breeze stirring the water, causing some momentary discomfort but not enough to capsize your boat.";
    recommendedActivities = '• Meditation:\n\nSet aside a few minutes for meditation to calm your mind.\n\n\n• Yoga Session:\n\nFollow a yoga routine to reduce stress and tension.\n\n\n• Journaling:\n\nWrite down your thoughts and feelings to gain clarity.\n\n\n• Talk to a Friend:\n\nShare your concerns and feelings with a trusted friend or family member.\n\n\n• Unplug and Disconnect:\n\nTake a break from digital devices to clear your mind.';
    bibleVerse = "• Psalm 55:22\n\n’Cast your burden on the Lord, and he will sustain you; he will never let the righteous fall.’\n(NIV) - Encourages surrendering our burdens to God for support and strength.\n\n\n• Proverbs 15:15\n\n’All the days of the oppressed are miserable, but whoever has a joyful heart has a continual feast.’\n(NIV) - Encourages cultivating a joyful heart even amidst challenging circumstances.\n\n\n• Isaiah 26:3\n\n’You will keep in perfect peace him whose mind is steadfast, because he trusts in you.\n(NIV) - Offers assurance of inner peace when we trust in God.\n\n\n• Matthew 11:28-30\n\n’Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls. For my yoke is easy and my burden is light.’\n(NIV) - Invites us to find rest and relief in Jesus' presence, even when feeling stressed.\n\n\n• 1 Thessalonians 5:16-18\n\n’Rejoice always, pray continually, give thanks in all circumstances; for this is God’s will for you in Christ Jesus.’\n(NIV) - Encourages maintaining joy, prayer, and gratitude, even during stressful times.\n\n\n• James 1:2-4\n\n’Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds, because you know that the testing of your faith produces perseverance. Let perseverance finish its work so that you may be mature and complete, not lacking anything.’\n(NIV) - Offers perspective on challenges as opportunities for growth and development.\n\n\n• Proverbs 16:24\n\n’Pleasant words are a honeycomb, sweet to the soul and healing to the bones.’\n(NIV) - Encourages seeking out positive and encouraging words and interactions to combat stress.";

  } else if (totalScore >= 10 && totalScore <= 12) {
    result = 'Moderate Stress';
    message = "Choppy Waters: The Moderate Level\n\nNow, imagine choppier waves rising across the ocean, whitecaps forming on their crests. This represents the moderate level of stress, where 4-5 symptoms become more pronounced. You might experience frequent worry, tension headaches, or difficulty sleeping. It's like encountering a stronger wind, making sailing a bit more challenging but still manageable with proper navigation skills.";
    recommendedActivities = '• Professional Counseling:\n\nSeek therapy or counseling from a mental health professional.\n\n\n• Deep Muscle Relaxation:\n\nPractice progressive muscle relaxation techniques.\n\n\n• Nature Retreat:\n\nSpend a weekend in a peaceful natural environment to reset.\n\n\n• Mindfulness Retreat:\n\nAttend a mindfulness or meditation retreat for a few days.\n\n\n• Mental Health Consultation:\n\nConsult with a mental health expert for personalized guidance.';
    bibleVerse = "• Psalm 31:15:\n\n’My times are in your hands; I will trust in you.’\n(NIV) - Offers surrender and trust in God's sovereign timing amidst stressful situations.\n\n\n• Isaiah 43:19\n\n’See, I am doing a new thing! Now it springs up; do you not perceive it? I am making a way in the wilderness and streams in the wasteland.’\n(NIV) - Provides hope for God's ongoing presence and renewal, even when feeling overwhelmed by stress.\n\n\n• Galatians 6:9\n\n’Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.’\n(NIV) - Offers encouragement to persevere through stressful challenges, reminding us of the future reward.\n\n\n• Ecclesiastes 7:9\n\n’Do not be quick to anger, for anger settles in the fool’s heart. Do not say, 'Why are things now worse than they were in the past?' For such a question is foolish.’\n(NIV) - Encourages maintaining self-control and refraining from negative comparison amidst stressful situations.\n\n\n• Nehemiah 8:10\n\n’Do not grieve, for the joy of the Lord is your strength.’\n(NIV) - Reminds us that inner joy, even amidst stress, can be a source of strength and resilience.\n\n\n• Proverbs 12:25\n\n’Anxiety weighs down the heart, but a kind word cheers it up.’\n(NIV) - Encourages seeking positive interactions and support systems to overcome stressful burdens.\n\n\n• Psalm 91:4\n\n’He will cover you with his feathers, and under his wings you will find refuge; his faithfulness is a shield and buckler.’\n(NIV) - Offers a sense of safety and protection under God's care, even during stressful times.";

  } else if (totalScore >= 13 && totalScore <= 16) {
    result = 'High Stress';
    message = "Stormy Seas: The High Level\n\nEnvision a raging storm, with towering waves crashing against the shore and dark clouds obscuring the horizon. This is the high level of stress, marked by 6-8 symptoms significantly impacting your daily life. You might experience intense anxiety, panic attacks, or even physical symptoms like chronic fatigue or digestive issues. It's like being caught in a fierce hurricane, requiring immediate shelter and guidance to weather the storm.";
    recommendedActivities = '• Meditate:\n\nTaking just five minutes for meditation can significantly reduce stress and anxiety.\n\n\n• Cuddle With a Pet:\n\nSpending time with a pet can boost self-esteem and provide comfort when dealing with dangerous stress.\n\n\n• Chew Gum:\n\nChewing gum for a few minutes can reduce anxiety and lower cortisol levels, offering a quick solution for high-stress situations.\n\n\n• Sip Green Tea:\nGreen tea contains L-Theanine, which can help relieve anger and calm your nerves.\n\n\n• Laugh:\n\nLaughter can increase blood flow and boost immunity, making it an effective way to combat stress and depression.';
    bibleVerse = "• Psalm 88:1-5\n\n’O Lord, the God of my salvation, I cry out to you day and night. Let my prayer come before you; turn your ear to my cry. For my soul is full of troubles, and my life draws near to the grave. I am counted among those who go down to the pit; I am like a man without strength. I am laid in the lowest pit, in darkness and the depths. Your wrath lies heavily upon me, and all your waves have rolled over me.’\n(NIV) - Offers raw expression of pain and desperation, acknowledging the intensity of severe stress.\n\n\n• Job 3:23-26\n\n’Why was I not given rest at birth? Why was I not allowed to sleep when I came from the womb? Now I would be lying down in peace; I would be asleep and at rest. With kings and counselors of the earth, who built towers for themselves, or with princes who had gold, who filled their houses with silver. Or why was I not hidden in the womb and buried there, like stillborn babies that never see the light?’\n(NIV) - Expresses the depths of despair and questioning that can accompany severe stress.\n\n\n• Mark 4:39\n\n’He awoke and rebuked the wind and said to the sea, 'Quiet! Be still!' Then the wind died down, and all was calm.’\n(NIV) - Provides hope for finding God's calming presence and power even in the midst of the severest storms of stress.\n\n\n• Psalm 34:18\n\n’The Lord is near to the brokenhearted and saves the crushed in spirit.’\n(NIV) - Reminds us that God's closeness and care extend even to those experiencing severe stress and emotional breakdown.\n\n\n• Psalm 139:24\n\n’Search me, God, and know my heart; test me and know my anxious thoughts. See if there is any offensive way in me, and lead me in the way of everlasting life.’\n(NIV) - Offers a plea for God's guidance and healing amidst overwhelming stress and anxieties.\n\n\n• 2 Corinthians 1:8-9\n\n’We were in great danger, beyond our ability to endure, so that we doubted we would survive. In fact, we expected to die; but this happened that we might not rely on ourselves but on God, who raises the dead. He has delivered us from such a deadly peril, and he will deliver us again. On him we have set our hope that he will continue to deliver us,’\n(NIV) - Reminds us of God's ability to deliver us through even the most severe challenges, encouraging dependence on His strength.";

  } else if (totalScore >= 17) {
    result = 'Severe Stress';
    message = "The Calm After the Storm: The Severe Level\n\nPicture the storm subsiding, leaving behind a battered coastline. This represents the severe level of stress, where nearly all symptoms manifest, causing profound impairment in all areas of life. You might experience burnout, complete withdrawal from activities, or even suicidal thoughts. It's like being at the epicenter of a tsunami, requiring immediate and specialized help to rebuild your life and regain your inner balance.\n\nRemember, even the calmest seas can experience occasional storms, and even the most turbulent waters can eventually calm. If you're struggling with stress at any level, don't hesitate to reach out for help. Therapists and counselors can equip you with the tools and strategies to navigate the waves of stress, guiding you towards a healthier and more peaceful shore.";
    recommendedActivities = '• Immediate hospitalization is essential:\n\nThis ensures constant monitoring and access to specialized care for managing severe physical and psychological symptoms (e.g., heart attack, stroke, psychosis).\n\n\n• Focus on safety and stabilization:\n\nWork closely with healthcare professionals to manage immediate risks and develop a plan for long-term recovery. This may involve medication, intensive therapy, and addressing underlying medical conditions.\n\n\n• Limited activity options:\n\nDue to the severity of symptoms, engaging in activities will be impossible. The focus will be on maintaining vital functions and ensuring patient safety.';
    bibleVerse = "• Psalm 13:5-6\n\n‘But I trust in your steadfast love; your salvation brings joy to my heart. I will sing to the Lord, for he has been good to me.’\n(NIV) - Even in the depths of despair, clinging to God's constant love and past kindness can offer a glimmer of hope.\n\n\n• Psalm 31:14-15\n\n‘I wait for the Lord, my soul waits, and in his word I put my hope. My soul waits for the Lord more than the watchmen wait for the morning, more than the watchmen wait for the morning.’\n(NIV) - When everything feels overwhelming, waiting on God's word and timing with unwavering hope can bring a sense of stability.\n\n\n• Job 19:25-27\n\n’ know that my Redeemer lives, and that in the end he will stand on the earth. And after my skin has been destroyed, yet in my flesh I will see God; I will see him for myself, and my eyes will behold him, no longer a stranger. My heart yearns within me!’\n(NIV) - Job's unwavering faith in his Redeemer amidst immense suffering offers a powerful testament to the strength that can be found in believing in God's ultimate presence and deliverance.\n\n\n• Lamentations 3:23-24\n\n‘The steadfast love of the Lord never ceases, his mercies never come to an end; they are new every morning; great is your faithfulness. I say to the Lord, “He is my portion; therefore I will wait for him.” ‘\n(NIV) - Choosing to wait on God's unfailing love and faithfulness, even when the darkness seems endless, can be a source of strength and renewal during extreme stress.\n\n\n• Romans 8:38-39\n\n’For I am convinced that neither death nor life nor angels nor demons nor the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord.’\n(NIV) - This powerful verse reminds us that no matter how severe the hardship, God's love for us remains constant and unyielding.";
  }

  const auth = getAuth();
  const user = auth.currentUser;

  const [userId, setUserId] = useState('');

  useEffect(() => {
    if (user) {
      setUserId(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (userId) {
      const resultRef = ref(db, `users/${userId}/assessmentResults`);
      const newResultRef = push(resultRef);
      const resultData = {
        result: result,
        assessmentTaken: new Date().getTime()
      };
  
      set(newResultRef, resultData).then(() => {
        console.log('Data saved successfully!');
      }).catch((error) => {
        console.error('Error saving data:', error);
      });
    }
  }, [userId]);

  // if (showActivities) {
  //   message = recommendedActivities;
  // } 


  // const handleRetakeTest = () => {
  //   // Reset the selectedButton state to an empty object
  //   setSelectedButton({});
  //   // Navigate back to the assessment screen
  //   navigation.navigate('AssessmentGuideQuestions');
  // };

  const handleClose = () => {
    // Navigate to the home screen
    navigation.navigate('dashboard');
  };

  const [showBibleVerse, setShowBibleVerse] = useState(false);

  const handleShowBibleVerse = () => {
    setShowBibleVerse(!showBibleVerse);
  };

  return (
    <ImageBackground source={require('../assets/bgMain.jpg')} style={styles.backgroundImage}>
      
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.backButtonStyle} onPress={() => navigation.navigate('dashboard')}>
                <AntDesign name="left" size={21} color="#222831" />
                <Text style={{ fontSize: 18, color: '#222831', fontWeight: '600', paddingRight: 5 }}>Exit</Text>
            </TouchableOpacity>
      </View>
      
        <ScrollView style={styles.container}>    
          <Text style={styles.title}>Stress Assessment Result</Text>
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>{result}</Text>
          </View>

          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{message}</Text>
          </View>

          <TouchableOpacity style={[styles.showBibleVerseButtonStyle, showBibleVerse && styles.showBibleVerseButtonActiveStyle]} onPress={handleShowBibleVerse}>
              <Text style={styles.showBibleVerseButtonText}>
                {showBibleVerse ? 'Hide Bible Verse' : 'Show Bible Verse'}
              </Text>
          </TouchableOpacity>

          {showBibleVerse && (
            <View style={styles.bibleVerseContainer}>
              <Text style={styles.bibleVerseText}>{bibleVerse}</Text>
            </View>
          )}
        </ScrollView>
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
    flexGrow: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    color: '#ededed',
    textAlign: 'flex-start',
    color: '#222831'
  },
  resultContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  resultText: {
    fontSize: 37,
    color: '#222831',
    textAlign: 'center',
    fontWeight: '500',
    right: 1
  },
  verseContainer: {
    justifyContent: 'center',
    backgroundColor: 'rgba(21, 21, 21, 0.5)',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 3
  },
  messageContainer: {
    justifyContent: 'center',
    backgroundColor: '#CDF0EA',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 5,
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 3
  },
  messageText: {
    color: '#222831',
    fontSize: 18,
  },
  bibleVerseContainer: {
    justifyContent: 'center',
    backgroundColor: '#CDF0EA',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  bibleVerseText: {
    color: '#222831',
    fontSize: 18,
  },
  buttonContainer: {
    justifyContent: 'flex-start',
        paddingTop: '20%',
        paddingLeft: 10,
        paddingBottom: 10,
        flexDirection: 'row',
  },
  button: {
    backgroundColor: '#655FF3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 10,
    elevation: 5,
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 3
  },
  showButton: {
    backgroundColor: '#C1A9CF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 10,
    elevation: 5,
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 3
  },
  backButtonStyle: {
        position: 'relative',
        flexDirection: 'row',
  },
  buttonText: {
    color: '#222831',
    fontSize: 18,
    textAlign:'center',
    fontWeight: '600'
  },
  showBibleVerseButtonStyle: {
    backgroundColor: '#8BE8E5',
    padding: 10,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3
  },
  showBibleVerseButtonActiveStyle: {
    backgroundColor: '#8BE8E5',
  },
  showBibleVerseButtonText: {
    color: '#222831',
    fontSize: 18,
    textAlign:'center',
    fontWeight: '600'
  },
});