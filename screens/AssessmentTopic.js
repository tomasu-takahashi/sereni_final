import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');

const AssessmentTopic = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    // Define what happens when the button is pressed
    console.log('Button pressed!');
    // Add your logic here
  };
  const handleCategoryPress = (category) => {
    // Redirect to the respective JS file based on the selected category
    switch (category) {
      case 'Anxiety':
        navigation.navigate('AssessmentAnxiety');
        break;
      case 'Depression':
        navigation.navigate('AssessmentDepression');
        break;
      case 'Stress':
        navigation.navigate('AssessmentStress');
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

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.root}>
          <View style={styles.container}>

            <View style={styles.categoryButton}>
              <ImageBackground source={require("../assets/anxiety-image.png")} style={styles.categoryButtonImage} resizeMode="contain" />
              <View style={styles.wrapper}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleCategoryPress('Anxiety')}>
                  <Text style={styles.text}>Anxiety</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.categoryButton}>
              <ImageBackground source={require("../assets/depression-image.png")} style={styles.categoryButtonImage} resizeMode="contain" />
              <View style={styles.wrapper}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleCategoryPress('Depression')}>
                  <Text style={styles.text}>Depression</Text>
                </TouchableOpacity>
              </View>
            </View>


            <View style={styles.categoryButton}>
              <ImageBackground source={require("../assets/stress-image.png")} style={styles.categoryButtonImage} resizeMode="contain" />
              <View style={styles.wrapper}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleCategoryPress('Stress')}>
                  <Text style={styles.text}>Stress</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default AssessmentTopic;

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
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '60%'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    paddingBottom: '65%',
    paddingTop: '5%',
  },
  AssessmentText: {
    padding: 10,
    color: 'white',
    fontSize: 18,
    fontWeight: '400',
    wordWrap: 'break-word',
  },
  categoryButton: {
    width: '100%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(21, 21, 21, 0.5)',
    padding: 10,
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
  categoryButtonImage: {
    width: '100%',
    maxWidth: 205,
    height: 236,
    marginBottom: 20,
    borderRadius: '50%',
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
    fontSize: 16,
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
