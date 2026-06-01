import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import Carousel from './Carousel';
import { db } from '../firebase';
import { getAuth } from "firebase/auth";
import { ref, push, set } from 'firebase/database';
import { AntDesign } from '@expo/vector-icons';

const AssessmentResultDepression = ({ route, navigation }) => {
  const { totalScore } = route.params;
  // const [selectedButton, setSelectedButton] = useState({});
  // const [showActivities, setShowActivities] = useState(false);
  // const [showVerse, setShowVerse] = useState(false);

  let result = '';
  let message = '';
  let recommendedActivities = '';
  let bibleVerse = '';

  if (totalScore >= 0 && totalScore <= 4) {
    result = 'Low Depression';
    message = "Basking in the Sunshine: The Normal Range\n\nImagine a vibrant landscape bathed in golden sunlight, painted by a full spectrum of emotions – joy, sadness, anger, and fear – all in graceful balance. This represents the normal range, where you navigate daily life with ease, fulfilling responsibilities, nurturing relationships, and embracing the richness of experience. It's akin to smoothly gliding through life, appreciating the scenery as it unfolds like a captivating story (American Psychiatric Association, 2013).\n\nRemember, these interpretations are just a guide, and experiencing any level of depression warrants seeking professional help. Therapists and counselors can equip you with the tools and support to navigate even the roughest emotional weather. So, don't hesitate to reach out – a brighter horizon awaits beyond the storm clouds.";
    recommendedActivities = '• Engage in activities you enjoy:\n\nThis could be anything from spending time with loved ones to pursuing hobbies or listening to music. Focus on activities that bring you joy and a sense of fulfillment.\n\n\n• Maintain a healthy lifestyle:\n\n\nGet regular exercise, eat a balanced diet, and prioritize sleep. These practices can boost your mood and energy levels, contributing to overall well-being.\n\n\n• Practice gratitude:\n\n\nTake time each day to appreciate the good things in your life, no matter how small. This can shift your focus towards positivity and build resilience.\n\n\n• Connect with others:\n\nSocial support is important for mental health. Spend time with loved ones, join a club or group, or volunteer in your community. Social interaction can combat feelings of isolation and loneliness, which can be triggers for depression.';
    bibleVerse = "• Psalm 23:6:\n\n'Surely your goodness and love will follow me all the days of my life, and I will dwell in the house of the Lord forever.'\n(NIV) - Reminds us of God's constant presence and care.\n\n\n• Philippians 4:13\n\n‘I can do all things through him who strengthens me.’\n(NIV) - Provides strength and confidence to face challenges.\n\n\n• Proverbs 15:13\n\n'A cheerful heart finds delight in prosperity, and a sad heart finds trouble even in feasts.’\n(NIV) - Encourages gratitude and perspective to counter negativity.\n\n\n• James 1:2-3\n\n‘Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds, because you know that the testing of your faith produces perseverance.’\n(NIV) - Offers perspective on challenges as opportunities for growth.\n\n\n• Ecclesiastes 3:1-4\n\n‘For everything there is a season, a time for every activity under heaven: a time to be born and a time to die, a time to plant and a time to uproot, a time to weep and a time to laugh, a time to mourn and a time to dance.’\n(NIV) - Acknowledges the natural ebb and flow of emotions, including sadness.\n\n\n• Isaiah 43:19\n\n‘See, I am doing a new thing! Now it springs up; do you not perceive it? I am making a way in the wilderness and streams in the wasteland.’\n(NIV) - Offers hope for new beginnings and God's ongoing presence.\n\n\n• Matthew 11:28-30\n\n‘Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls. For my yoke is easy and my burden is light.’\n(NIV) - Invites us to find rest and comfort in Jesus' presence.";

  } else if (totalScore >= 5 && totalScore <= 6) {
    result = 'Mild Depression';
    message = "A Few Clouds Gather: The Mild Level\n\nPicture a few fluffy clouds drifting across an otherwise clear sky. This is the mild level of depression, where 2-3 symptoms might appear like fleeting shadows. You might feel a touch of low mood, lose interest in some activities for a while, or experience changes in appetite or sleep patterns (National Institute of Mental Health, n.d.). Think of it as a passing drizzle – uncomfortable, but manageable, and the sun usually peeks through again soon.\n\nRemember, these interpretations are just a guide, and experiencing any level of depression warrants seeking professional help. Therapists and counselors can equip you with the tools and support to navigate even the roughest emotional weather. So, don't hesitate to reach out – a brighter horizon awaits beyond the storm clouds.";
    recommendedActivities = '• Mindfulness and relaxation techniques:\n\nPractices like meditation, deep breathing, and yoga can help manage stress and improve mood.\n\n\n• Cognitive-behavioral therapy (CBT):\n\nThis therapy focuses on identifying and changing negative thought patterns that contribute to depression.\n\n\n• Light aerobic exercise:\n\nEngaging in regular physical activity, even for short periods, can significantly improve mood and energy levels.\n\n\n• Reach out to a therapist or counselor:\n\nThey can provide personalized guidance and support to manage your symptoms and develop coping mechanisms.';
    bibleVerse = "• Psalm 34:18\n\n‘The Lord is near to the brokenhearted and saves the crushed in spirit.’\n(NIV) - Emphasizes God's closeness to those struggling with sadness.\n\n\n• Isaiah 40:29\n\n‘He gives strength to the weary and increases the power of the weak.’\n(NIV) - Offers strength and hope for facing even the most daunting challenges.\n\n\n• Romans 8:28\n\n‘And we know that in all things God works for the good of those who love him, who have been called according to his purpose.’\n(NIV) - Offers assurance that even in difficulties, God is working for our good.\n\n\n• Psalm 55:22\n\n‘Cast your burden on the Lord, and he will sustain you; he will never let the righteous fall.’\n(NIV) - Encourages us to surrender our burdens to God.\n\n\n• Deuteronomy 31:8\n\n‘The Lord himself goes before you and will be with you; he will never leave you nor forsake you. Do not be afraid; do not be discouraged.’\n(NIV) - Provides assurance of God's constant presence and guidance.\n\n\n• 2 Corinthians 4:16-18\n\n’Therefore we do not lose heart. Though our outer self is wasting away, our inner self is being renewed day by day. For this light momentary affliction is producing for us an eternal weight of glory, far beyond comparison, as we do not look at the things that are seen but at the things that are unseen. For the things that are seen are transient, but the things that are unseen are eternal.’\n(NIV) - Offers a long-term perspective on our struggles, finding hope in what is eternal.\n\n\n• John 14:27\n\n’Peace I leave with you; my peace I give to you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.’\n(NIV) - Offers peace and solace even amidst challenges.";

  } else if (totalScore >= 7 && totalScore <= 10) {
    result = 'Moderate Depression';
    message = "The Clouds Thicken: The Moderate Level\n\nNow, imagine the clouds growing denser, casting longer shadows on the landscape. This represents the moderate level, where 4-5 symptoms become more pronounced, impacting daily life like an overcast day. You might struggle with concentration, feel weighed down by guilt or worthlessness, or experience fatigue that hinders your usual activities (American Academy of Family Physicians, 2019). It's like encountering a heavier downpour, making it trickier to navigate but with shelter and support readily available.\n\nRemember, these interpretations are just a guide, and experiencing any level of depression warrants seeking professional help. Therapists and counselors can equip you with the tools and support to navigate even the roughest emotional weather. So, don't hesitate to reach out – a brighter horizon awaits beyond the storm clouds.";
    recommendedActivities = '• Focus on maintaining basic self-care:\n\nPrioritize regular meals, sleep, and hygiene, even if they feel challenging.\n\n\n• Continue activities from the previous levels:\n\nKeep practicing mindfulness, engaging in light exercise, and connecting with supportive people.\n\n\n• Consider group therapy: \n\nThis can provide additional support and connection with others who understand what you are going through.\n\n\n• Seek medication from a healthcare professional:\n\nMedication can be an effective tool in managing moderate to severe depression, especially in combination with therapy.';
    bibleVerse = "• Psalm 139:17-18\n\n’How precious are your thoughts about me, God! They are countless as the grains of sand! If I count them, they are more than the number of stars. When I wake up, I am still with you.’\n(NIV) - Reminds us of God's constant love and awareness, even in darkness.\n\n\n• Mark 4:39\n\n’He awoke and rebuked the wind and said to the sea, 'Quiet! Be still!' Then the wind died down, and all was calm.’\n(NIV) - Offers hope for calming inner storms and finding peace even in challenging situations.\n\n\n• 1 Peter 5:7\n\n’Cast all your anxiety on him because he cares for you.’\n(NIV) - Encourages surrendering our worries to God's care.\n\n\n• Psalm 51:12\n\n’Restore to me the joy of your salvation and grant me a willing spirit, then I will teach transgressors your ways.’\n(NIV) - Pleads for restored joy and purpose amidst struggle.\n\n\n• Isaiah 61:3\n\n’to grant to those who mourn in Zion— to give them a beautiful headdress instead of ashes, the oil of gladness instead of mourning, the garment of praise instead of a faint spirit; that they may be called oaks of righteousness, the planting of the Lord, that he may be glorified.’\n(NIV) - Offers hope for transformation and new beginnings even in deep sorrow.\n\n\n• Lamentations 3:22-23\n\n’The steadfast love of the Lord never ceases, his mercies never come to an end; they are new every morning; great is your faithfulness.’\n(NIV) - Reminds us of God's constant love and unfailing faithfulness, even when we feel forgotten.\n\n\n• Hebrews 4:16\n\n’Let us then with confidence draw near to the throne of grace, that we may receive mercy and find grace to help in time of need.’\n(NIV) - Invites us to approach God with boldness and receive His grace and help in our hour of need.";

  } else if (totalScore >= 11 && totalScore <= 13) {
    result = 'High Depression';
    message = "The Storm Rages: The High Level\n\nEnvision a raging storm, with strong winds and torrential rain obscuring the horizon. This is the high level, marked by 6-8 symptoms significantly impacting your daily functioning. Basic tasks like eating, sleeping, or taking care of yourself become challenging. Suicidal thoughts or behaviors might also emerge (National Alliance on Mental Illness, 2019). Think of it as being caught in a fierce tempest, where immediate help and refuge are critical to weathering the storm.\n\nRemember, these interpretations are just a guide, and experiencing any level of depression warrants seeking professional help. Therapists and counselors can equip you with the tools and support to navigate even the roughest emotional weather. So, don't hesitate to reach out – a brighter horizon awaits beyond the storm clouds.";
    recommendedActivities = '• Hospitalization may be necessary:\n\nThis ensures you receive the necessary medical and mental health support to manage your symptoms and prevent harm.\n\n\n• Continue with all previous activities and treatments:\n\nMaintain self-care, therapy, and medication as tolerated.\n\n\n• Work with a crisis hotline or mental health professional:\n\nThey can provide immediate support and guidance in navigating critical situations.';
    bibleVerse = "• Psalm 42:5-6\n\n’Why are you downcast, O my soul? Why so troubled within me? Put your hope in God, for I will yet praise him, my Savior and my God.’\n(NIV) - Reminds us to cling to hope in God even amidst darkness and despair.\n\n\n• Psalm 130:1-5\n\n’Out of the depths I cry to you, Lord; O Lord, hear my voice! Let your ears be attentive to the voice of my pleas. If you, Lord, kept a record of sins, O Lord, who could stand? But with you there is forgiveness; therefore you are revered.’\n(NIV) - Offers hope for forgiveness and cleansing, even when feeling overwhelmed by guilt and despair.\n\n\n• Job 13:15-16\n\n’Though he slay me, yet will I hope in him; I will surely plead my cause before him.’\n(NIV) - Demonstrates radical faith and hope even in the face of tremendous suffering.\n\n\n• Isaiah 53:4-5\n\n’Surely he has borne our griefs and carried our sorrows; yet we esteemed him stricken, smitten by God, and afflicted. But he was pierced for our transgressions, he was crushed for our iniquities; the punishment that brought us peace was upon him, and by his wounds we are healed.’\n(NIV) - Offers comfort and healing through Christ's sacrifice for our sins.\n\n\n• Psalm 27:1\n\n’The Lord is my light and my salvation—whom shall I fear? The Lord is the stronghold of my life—of whom shall I be afraid?’\n(NIV) - Reminds us of God's strength and protection in our darkest moments.\n\n\n• John 14:6\n\n’Jesus answered, “I am the way and the truth and the life. No one comes to the Father except through me.”’\n(NIV) - Points to Jesus as the source of hope and the path to overcoming darkness.\n\n\n• 2 Corinthians 1:3-4\n\n’Blessed be the God and Father of our Lord Jesus Christ, the Father of mercies and God of all comfort, who comforts us in all our affliction, so that we may be able to comfort those who are in any affliction with the comfort that we ourselves have received from God.’\n(NIV) - Offers hope that our own suffering can be used to bring comfort and hope to others.";

  } else if (totalScore >= 14) {
    result = 'Severe Depression';
    message = "The Calm After the Storm: Severe Level\n\nPicture the storm subsiding, leaving behind a battered landscape. This represents the severe level, where nearly all depressive symptoms manifest, causing profound impairment in all areas of life. Independence becomes virtually impossible, and the risk of imminent suicide is high. Imagine being at the epicenter of a hurricane, requiring immediate and specialized assistance to navigate the devastation and rebuild your life.\n\nRemember, these interpretations are just a guide, and experiencing any level of depression warrants seeking professional help. Therapists and counselors can equip you with the tools and support to navigate even the roughest emotional weather. So, don't hesitate to reach out – a brighter horizon awaits beyond the storm clouds.";
    recommendedActivities = "• Immediate hospitalization is essential:\n\nThis ensures constant monitoring and access to specialized care for managing severe suicidal risk and other life-threatening symptoms.\n\n\n• Focus on safety and stabilization:\n\nWork closely with healthcare professionals to manage immediate risks and develop a plan for long-term recovery.\n\n\n• Continue with all previous treatments and support:\n\nMaintain self-care and therapy as possible while prioritizing immediate safety and stabilization.";
    bibleVerse = "• Psalm 34:18\n\n’The Lord is near to the brokenhearted and saves the crushed in spirit.’\n(NIV) - Emphasizes God's closeness to those struggling with immense sadness.\n\n\n• Psalm 57:1-3\n\n’Have mercy on me, my God, have mercy on me, for in you I take refuge. I will take refuge in the shadow of your wings until the storm has passed. I cry out to God Most High, to God who fulfills his purpose for me.’\n(NIV) - Offers a plea for mercy and refuge in God during a turbulent storm.\n\n\n• Jeremiah 29:11\n\n’For I know the plans I have for you,' declares the Lord, 'plans to prosper you and not to harm you, plans to give you hope and a future.’\n(NIV) - Offers assurance of God's ongoing plan and hope even in the midst of overwhelming darkness.\n\n\n• Psalm 121:1-2\n\n’I lift up my eyes to the mountains— where does my help come from? My help comes from the Lord, the Maker of heaven and earth.’\nNIV) - Reminds us to look to God as the ultimate source of help and strength.\n\n\n• 1 Peter 5:7\n\n’Cast all your anxiety on him because he cares for you.’\n(NIV) - Encourages surrendering all anxieties and burdens to God's care, especially when feeling overwhelmed.\n\n\n• Psalm 139:23-24\n\n’Search me, God, and know my heart; test me and know my anxious thoughts. See if there is any offensive way in me, and lead me in the way of everlasting life.’\n(NIV) - Offers a prayer for God's guidance and intervention in times of deep distress.\n\n\n• Matthew 11:28-30\n\n’Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls. For my yoke is easy and my burden is light.’\n(NIV) - Invites us to turn to Jesus for rest and comfort, even when the burdens seem unbearable.";
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
          <Text style={styles.title}>Depression Assessment Result</Text>
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

export default AssessmentResultDepression;

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