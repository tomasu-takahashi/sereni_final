import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');

const Assessment = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    // Define what happens when the button is pressed
    console.log('Button pressed!');
    // Add your logic here
  };
  const handleCategoryPress = (category) => {
    // Redirect to the respective JS file based on the selected category
    switch (category) {
      case 'guideQuestions':
        navigation.navigate('AssessmentGuideQuestions');
        break;
      case 'selectTopic':
        navigation.navigate('AssessmentTopic');
        break;
      default:
        break;
    }
  };

  return (
    <ImageBackground
      style={styles.backgroundImage}
      resizeMode="cover"
      source={require("../assets/bgMain.png")}
    >
        <View style={styles.root}>
          <View style={styles.container}>
          <Text style={styles.AssessmentText}>Assessment Guide</Text>

            <View style={styles.categoryButton}>
            <Text style={styles.text}>Selecting this option will redirect you to our guide questions to know what are you feeling. Is it either Anxiety, Depression, or Stress.</Text>
              <View style={styles.wrapper}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleCategoryPress('guideQuestions')}>
                  <Text style={styles.text}>Proceed</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.categoryButton}>
            <Text style={styles.text}>Selecting this option will redirect you to where you select your own topic </Text>
              <View style={styles.wrapper}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleCategoryPress('selectTopic')}>
                  <Text style={styles.text}>Proceed</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </View>
    </ImageBackground>
  );
};

export default Assessment;

const styles = StyleSheet.create({
  root: {
    height: screenHeight,
    width: screenWidth,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    paddingBottom: '50%',
  },
  AssessmentText: {
    marginTop: 20,
    marginBottom: '15%',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    wordWrap: 'break-word',
  },
  categoryButton: {
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(21, 21, 21, 0.5)',
    padding: 10,
    borderRadius: 10,
    marginBottom: '10%',
    elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3
  },
  categoryButtonText: {
    fontSize: 24,
    color: '#FFF',
    backgroundColor: '#655FF3',
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#655FF3',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 7,
    width: '100%',
    minWidth: 260,
  },
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  headerContainer: {
    flex: 1,
    height: screenHeight,
    width: screenWidth,
  },
  heading: {
    fontSize: 24,
    color: '#ededed',
    textAlign: 'center',
    backgroundColor: '#2C2B56',
    padding: 50,
    paddingBottom: 20,
  },
});