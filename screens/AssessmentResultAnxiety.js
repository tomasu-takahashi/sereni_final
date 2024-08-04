import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import Carousel from './Carousel';

const AssessmentResultAnxiety = ({ route, navigation }) => {
  const { totalScore } = route.params;
  // const [selectedButton, setSelectedButton] = useState({});
  // const [showActivities, setShowActivities] = useState(false);
  // const [showVerse, setShowVerse] = useState(false);

  let result = '';
  let message = '';
  let recommendedActivities = '';
  let bibleVerse = '';

  if (totalScore >= 0 && totalScore <= 3) {
    result = 'Normal';
    message = "Sun-Kissed Peaks: The Normal Range\n\nImagine standing atop a sun-drenched mountain peak, the world stretching out below you in a breathtaking panorama. This represents the normal range of anxiety, where you experience occasional worry or nervousness in response to life's challenges. These feelings are like passing clouds, adding a touch of spice to the journey without obscuring the view.\n\nRemember, even the sunniest peaks can experience occasional clouds, and storms can eventually pass. If you're struggling with anxiety at any level, don't hesitate to reach out for help. Therapists and counselors can equip you with the tools and strategies to navigate even the most challenging emotional terrain, guiding you towards a brighter horizon.";
    recommendedActivities = '• Practice relaxation techniques:\n\nDeep breathing, mindfulness meditation, progressive muscle relaxation, and yoga can help manage occasional worry and nervousness.\n\n\n• Engage in enjoyable activities:\n\nPursue hobbies, spend time in nature, exercise, or connect with loved ones to boost your mood and combat stress.\n\n\n• Maintain a healthy lifestyle:\n\nRegular sleep, balanced diet, and physical activity contribute to overall well-being and resilience against anxiety.\n\n\n• Challenge negative thoughts:\n\nIdentify and replace unhelpful thought patterns with more realistic and positive ones.';
    bibleVerse = "• Philippians 4:6-7\n\n’Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.’\n (NIV) - Encourages prayer and gratitude as ways to combat worry and find peace.\n\n\n• Romans 8:28\n\n’And we know that in all things God works for the good of those who love him, who have been called according to his purpose.’\n(NIV) - Provides a long-term perspective on challenges, affirming God's work even amidst anxiety.\n\n\n• Proverbs 12:25\n\n’Anxiety weighs down the heart, but a kind word cheers it up.’\n(NIV) - Encourages seeking positive interactions and support to uplift our spirits.\n\n\n• Isaiah 43:19\n\n’See, I am doing a new thing! Now it springs up; do you not perceive it? I am making a way in the wilderness and streams in the wasteland.’\n(NIV) - Offers hope for renewal and God's ongoing presence amidst anxiety's complexities.\n\n\n• Psalm 55:22\n\n’Cast your burden on the Lord, and he will sustain you; he will never let the righteous fall.’\n(NIV) - Encourages surrendering our anxieties and burdens to God for support.\n\n\n• Matthew 11:28-30\n\n’Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls. For my yoke is easy and my burden is light.’\n(NIV) - Invites us to find rest and relief in Jesus' presence, even amidst anxious thoughts.";

  } else if (totalScore >= 4 && totalScore <= 5) {
    result = 'Mild';
    message = "A Few Clouds Roll In: The Mild Level\n\nPicture fluffy clouds drifting across the clear blue sky, casting fleeting shadows on the landscape. This is the mild level of anxiety, where you might encounter 2-3 symptoms like occasional worry, tension, or difficulty concentrating. It's like a light breeze rustling the leaves, causing a momentary stir but not disrupting the overall serenity.\n\nRemember, even the sunniest peaks can experience occasional clouds, and storms can eventually pass. If you're struggling with anxiety at any level, don't hesitate to reach out for help. Therapists and counselors can equip you with the tools and strategies to navigate even the most challenging emotional terrain, guiding you towards a brighter horizon.";
    recommendedActivities = '• Exposure therapy:\n\nGradually exposing yourself to anxiety-provoking situations in a safe and controlled environment can help reduce fear and build coping skills.\n\n\n• Cognitive-behavioral therapy (CBT):\n\nThis therapy focuses on identifying and changing negative thought patterns that contribute to anxiety.\n\n\n• Group therapy:\n\nConnecting with others who understand your experiences can provide support and helpful coping strategies.\n\n\n• Journaling: \n\nWriting down your thoughts and feelings can help you process and manage anxiety symptoms.';
    bibleVerse = "• Psalm 34:4\n\n’I sought the Lord, and he answered me; he delivered me from all my fears.’\n(NIV) - Offers hope and assurance through prayer and seeking God's help.\n\n\n• John 14:27\n\n’Peace I leave with you; my peace I give to you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.’\n(NIV) - Provides God's peace as a source of comfort amidst anxious feelings.\n\n\n• Psalm 91:2\n\n’I say to the Lord, 'My refuge and my fortress, my God in whom I trust.'’\n(NIV) - Reminds us of God's strength and protection as a refuge against anxiety's storms.\n\n\n• Isaiah 30:15\n\n’For thus says the Lord God, the Holy One of Israel, 'In returning and rest you shall be saved; in quietness and in trust is your strength.'’\n(NIV) - Encourages finding strength in surrender, trust, and quietness for managing anxiety.\n\n\n• Philippians 4:8\n\n‘Finally, brothers and sisters, whatever is true, whatever is noble, whatever is right, whatever is pure, whatever is lovely, whatever is commendable, if there is any excellence, if there is anything worthy of praise, think about these things.’\n(NIV) - Offers guidance on focusing on positive thoughts and practices to counter anxious thoughts.\n\n\n• 2 Corinthians 5:17\n\n’Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!’\n(NIV) - Provides hope for renewed strength and transformation in times of anxiety.\n\n\n• 1 Peter 5:6-7\n\n’Humble yourselves, therefore, under the mighty hand of God, that he may exalt you in due time. Cast all your anxiety on him because he cares for you.’\n(NIV) - Encourages humility and surrendering all anxieties to God's care.";
  
  } else if (totalScore >= 6 && totalScore <= 7) {
    result = 'Moderate';
    message = "The Storm Gathers: The Moderate Level\n\nNow, imagine the clouds gathering, forming darker patches on the horizon. This represents the moderate level of anxiety, where 4-5 symptoms become more pronounced. You might experience more frequent worry, restlessness, or physical symptoms like muscle tension or rapid heartbeat. It's like encountering a heavier wind, making the journey a bit more challenging but still manageable with proper tools and support.\n\nRemember, even the sunniest peaks can experience occasional clouds, and storms can eventually pass. If you're struggling with anxiety at any level, don't hesitate to reach out for help. Therapists and counselors can equip you with the tools and strategies to navigate even the most challenging emotional terrain, guiding you towards a brighter horizon.";
    recommendedActivities = '• Focus on maintaining basic self-care:\n\nPrioritize regular meals, sleep, and hygiene even if they feel challenging.\n\n\n• Continue with activities from previous levels:\n\nMaintain relaxation techniques, exposure therapy, and CBT practice.\n\n\n• Limit caffeine and alcohol:\n\nThese substances can exacerbate anxiety symptoms.\n\n\n• Consider medication:\n\nMedication can be an effective tool in managing moderate to severe anxiety, especially in combination with therapy.';
    bibleVerse = "• Psalm 139:1-4\n\n’O Lord, you have searched me and you know me. You know when I sit and when I rise; you perceive my thoughts from afar. You discern my going out and my lying down; you are familiar with all my ways. Before a word is on my tongue you know it completely, O Lord.’\n(NIV) - Reminds us of God's intimate knowledge and understanding of our anxieties.\n\n\n• Psalm 51:10-12\n\n’Create in me a clean heart, O God, and renew a right spirit within me. Do not cast me from your presence or take your Holy Spirit from me. Restore to me the joy of your salvation and grant me a willing spirit, then I will teach transgressors your ways.’\n(NIV) - Pleads for cleansing and renewal to overcome anxiety's grip.\n\n\n• Isaiah 40:29-31\n\n’He gives strength to the weary and increases the power of the weak. Even youths grow tired and weary, and young men stumble and fall; but those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.’\n(NIV) - Offers hope for renewed strength and resilience in the face of anxiety's challenges.\n\n\n• Hebrews 4:16\n\n’Let us then with confidence draw near to the throne of grace, that we may receive mercy and find grace to help in time of need.’\n(NIV) - Invites us to approach God with boldness for mercy and strength to overcome anxiety.\n\n\n• Romans 8:31-39\n\n’If God is for us, who can be against us? He who did not spare his own Son but gave him up for us all, how will he not also with him graciously give us all things? Who will bring any charge against God’s elect? It is God who justifies. Who is to condemn? Christ Jesus, who died--more than that, who was raised to life--is at the right hand of God and is interceding for us. Who shall separate us from the love of Christ? Shall trouble or hardship or persecution or famine or nakedness or danger or sword? No, in all these things we are more than conquerors through him who loved us. For I am convinced that neither death nor life nor angels nor demons nor the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord.’\n(NIV) - Offers assurance of God's unwavering love and our ultimate victory through Christ, even in the midst of intense anxiety.\n\n\n• Mark 4:39\n\n’He awoke and rebuked the wind and said to the sea, 'Quiet! Be still!' Then the wind died down, and all was calm.’\n(NIV) - Provides a metaphor for seeking God's calming presence and power to quell the anxieties storms.\n\n\n• 2 Corinthians 1:3-4\n\n’Blessed be the God and Father of our Lord Jesus Christ, the Father of mercies and God of all comfort, who comforts us in all our affliction, so that we may be able to comfort those who are in any affliction with the comfort that we ourselves have received from God.’\n(NIV) - Offers hope that experiencing and finding comfort in God equips us to comfort others struggling with anxiety.";
  
  } else if (totalScore >= 8 && totalScore <= 9) {
    result = 'Severe';
    message = "The Tempest Rages: The Severe Level\n\nEnvision a raging storm, with strong winds and driving rain obscuring the path ahead. This is the severe level of anxiety, marked by 6-8 symptoms significantly impacting your daily life. You might experience intense worry, panic attacks, or even phobias that limit your activities. It's like being caught in a fierce blizzard, requiring immediate shelter and guidance to navigate the treacherous terrain.\n\nRemember, even the sunniest peaks can experience occasional clouds, and storms can eventually pass. If you're struggling with anxiety at any level, don't hesitate to reach out for help. Therapists and counselors can equip you with the tools and strategies to navigate even the most challenging emotional terrain, guiding you towards a brighter horizon.";
    recommendedActivities = '• Seek professional medical and psychological help:\n\nThis level requires immediate support to manage symptoms and prevent harm.\n\n\n• Hospitalization may be necessary:\n\nThis ensures constant monitoring and access to specialized care for managing severe anxiety and potential co-occurring conditions.\n\n\n• Focus on safety and stabilization:\n\nWork closely with healthcare professionals to manage immediate risks and develop a plan for long-term recovery.';
    bibleVerse = "• Psalm 22:1-3\n\n’My God, my God, why have you forsaken me? Why are you so far from helping me, from the words of my groaning? O my God, I cry out by day, but you do not answer, by night, but I find no rest.’\n(NIV) - Offers a raw expression of pain and questioning, acknowledging the darkness anxiety can bring.\n\n\n• Psalm 77:6-11\n\n’I will remember the deeds of the Lord; I will remember your wonders of old. I will ponder all your work, and meditate on your mighty deeds. Your ways, O God, are holy. What god is as great as you are? You are the God who does wonders; you have declared your strength among the nations. You redeemed your people with your powerful arm, the descendants of Jacob and Joseph.’\n(NIV) - Recounts God's past faithfulness, seeking hope and strength in His past promises.\n\n\n• Job 13:15-16\n\n’Though he slay me, yet will I hope in him; I will surely plead my cause before him.’\n(NIV) - Demonstrates radical faith and hope, clinging to God even in the face of immense anxiety.";
  
  } else if (totalScore >= 10) {
    result = 'Extremely Severe';
    message = "The Calm After the Storm: The Extremely Severe Level\n\nPicture the storm subsiding, leaving behind a battered landscape. This represents the extremely severe level of anxiety, where nearly all symptoms manifest, causing profound impairment in all areas of life. You might experience constant fear, debilitating panic attacks, or even suicidal thoughts. It's like being at the epicenter of a hurricane, requiring immediate and specialized help to rebuild your life.\n\nRemember, even the sunniest peaks can experience occasional clouds, and storms can eventually pass. If you're struggling with anxiety at any level, don't hesitate to reach out for help. Therapists and counselors can equip you with the tools and strategies to navigate even the most challenging emotional terrain, guiding you towards a brighter horizon.";
    recommendedActivities = '• Immediate hospitalization is essential:\n\nThis ensures constant monitoring and access to specialized care for managing severe panic attacks, phobias, and potential self-harm risk.\n\n\n• Focus on safety and stabilization:\n\nWork closely with healthcare professionals to manage immediate risks and develop a plan for long-term recovery. This may involve medication, cognitive-behavioral therapy (CBT), and intensive exposure therapy.\n\n\n• Limited activity options:\n\nDue to the severity of symptoms, engaging in activities will be challenging. Focusing on relaxation techniques like deep breathing or guided imagery with assistance may be possible in safe environments.';
    bibleVerse = "• Psalm 139:1-4\n\n’O Lord, you have searched me and you know me. You know when I sit and when I rise; you perceive my thoughts from afar. You discern my going out and my lying down; you are familiar with all my ways. Before a word is on my tongue you know it completely, O Lord.’\n(NIV) - This verse offers a sense of God's intimate knowledge and understanding of our anxieties, even the deepest and most unspoken ones.\n\n\n• Psalm 88:1-5\n\n’O Lord, the God of my salvation, I cry out to you day and night. Let my prayer come before you; turn your ear to my cry. For my soul is full of troubles, and my life draws near to the grave. I am counted among those who go down to the pit; I am like a man without strength. I am laid in the lowest pit, in darkness and the depths. Your wrath lies heavily upon me, and all your waves have rolled over me.’\n(NIV) - This raw expression of despair and feeling overwhelmed acknowledges the intensity of severe anxiety and its grip on our lives.\n\n\n• Psalm 91:4\n\n’He will cover you with his feathers, and under his wings you will find refuge; his faithfulness is a shield and buckler.’\n(NIV) - This imagery offers a sense of safety and protection under God's care, even amidst the storms of anxiety.\n\n\n• Isaiah 40:29-31\n\n’He gives strength to the weary and increases the power of the weak. Even youths grow tired and weary, and young men stumble and fall; but those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.’\n(NIV) - This promise of renewed strength and resilience can offer hope even when feeling utterly drained by anxiety.\n\n\n• Philippians 4:6-7\n\n’Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.’\n(NIV) - This well-known verse encourages surrendering our anxieties to God in prayer and trusting His peace to guide us through challenging times.";
  }

  

  // if (showActivities) {
  //   message = recommendedActivities;
  // }

  const handleClose = () => {
    // Navigate to the home screen
    navigation.navigate('dashboard');
  };

  // const handleShowActivities = () => {
  //   // Toggle the showActivities state to show/hide the activities
  //   setShowActivities(!showActivities);
  // };

  // const handleShowVerse = () => {
  //   // Toggle the showVerse state to show/hide the bible verse
  //   setShowVerse(!showVerse);
  // };


  return (
    <ImageBackground source={require('../assets/bgMain.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
      <Text style={styles.title}>Anxiety Assessment Result</Text>
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{result}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Carousel
            message={message}
            recommendedActivities={recommendedActivities}
            bibleVerse={bibleVerse}
          />
        </View>

        {/* <ScrollView contentContainerStyle={styles.messageContainer}>
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
        </TouchableOpacity> */}

      </View>

      <View style={styles.buttonContainer}>
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
    fontSize: 26,
    color: '#ededed',
    textAlign: 'flex-start',
    paddingTop: 50,
    color: '#222831'
  },
  resultContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  resultText: {
    fontSize: 45,
    color: '#222831',
    textAlign: 'center',
    fontWeight: '500'
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
    backgroundColor: 'rgba(21, 21, 21, 0.5)',
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
  exitButton: {
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
  buttonText: {
    color: '#222831',
    fontSize: 18,
    textAlign:'center',
    fontWeight: '600'
  },
});