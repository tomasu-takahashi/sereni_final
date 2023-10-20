import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');

const Assessment = () => {
  const navigation = useNavigation();

  const handleCategoryPress = (category) => {
    // Redirect to the respective JS file based on the selected category
    switch (category) {
      case 'AcademicStress':
        navigation.navigate('AssessmentStressAcademic');
        break;
      case 'RelationshipStress':
        navigation.navigate('AssessmentStressRelationship');
        break;
      case 'WorkStress':
        navigation.navigate('AssessmentStressWork');
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
    <Text style={styles.AssessmentText}>You have selected the "Stress" Topic. In this topic there are 3 sub-topics. Select your sub-topic for Sereni will provide results based on the survey.</Text>
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
    <View style={styles.root}>
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => handleCategoryPress('AcademicStress')}
      >
      <Image
              source={require("../assets/StressAcademicIcon.jpg")}
              style={styles.categoryButtonImage}
      />

        <Text style={styles.categoryButtonText}>Academic Stress</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => handleCategoryPress('RelationshipStress')}
      >
      <Image
              source={require("../assets/StressRelationshipIcon.jpg")}
              style={styles.categoryButtonImage}
      />
        <Text style={styles.categoryButtonText}>Relationship Stress</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => handleCategoryPress('WorkStress')}
      >
      <Image
              source={require("../assets/StressWorkIcon.jpg")}
              style={styles.categoryButtonImage}
      />
        <Text style={styles.categoryButtonText}>Work Stress</Text>
      </TouchableOpacity>
    </View>
    </View>
    </ScrollView>
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
    color: '#ededed',
    fontSize: 18,
    height: screenHeight/5,
    width: screenWidth,
    backgroundColor: 'rgba(21, 21, 21, 0.8)',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 10,
    paddingTop: '15%',
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
    width: '90%',
    height: '70%',
    marginBottom: 20,
    borderRadius: 10
  },
  categoryButtonText: {
    fontSize: 24,
    color: '#ededed',
  },
});