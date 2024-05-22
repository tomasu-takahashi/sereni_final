import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ImageBackground, Alert } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth } from "../firebase";
import BottomSheet from './BottomSheet';

const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');

const dashboard = ({ fullname }) => {
  const navigation = useNavigation();
  const [status, setStatus] = React.useState(false);

  const handleNavigateToResult = () => {
    navigation.navigate('bibleVerse');
  };

  const handleNavigateToTabAssessment = () => {
    navigation.navigate('Assessment');
  };

  const handleNavigateToTabJournal = () => {
    navigation.navigate('My Journal');
  };

  return (
    // <ImageBackground style={styles.backgroundImage} resizeMode="cover" source={require("../assets/bgMain.png")}>
      <View style={styles.root}>
        <View style={styles.container}>
          <View style={styles.BibleVerseContainer}>
            <Text style={styles.BibleVerseText1}>Search Your</Text>
            <Text style={styles.BibleVerseText2}>Bible Verse</Text>
              <TouchableOpacity style={styles.button} onPress={() => setStatus(true)}>
                <Text style={styles.buttonText}>Search</Text>
              </TouchableOpacity>
              
          </View>

          <View style={styles.TakeSurveyContainer}>
            <Text style={styles.TakeSurveyText}>How are you feeling recently?</Text>
            <Text style={styles.TakeSurveyText}>Do you want to take a test?</Text>
            <TouchableOpacity style={styles.TakeSurveyButton} onPress={handleNavigateToTabAssessment}>
              <Text style={styles.buttonText}>Take Test</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.myJournalContainer}>
            <Text style={styles.myJournalText}>Do you want to create your Journal?</Text>
            <TouchableOpacity style={styles.myJournalButton} onPress={handleNavigateToTabJournal}>
              <Text style={styles.buttonText}>My Journal</Text>
            </TouchableOpacity>
          </View>
          
        </View>
        {status && <BottomSheet setStatus={setStatus}/>}
      </View>
    // </ImageBackground>
  );
};

export default dashboard;

const styles = StyleSheet.create({
  root: {
    height: screenHeight,
    width: screenWidth,
    backgroundColor: '#FFFFFF',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  BibleVerseText1: {
    color: '#ededed',
    fontSize: 20,
    paddingTop: 27,
    paddingRight: 190,
  },
  BibleVerseText2: {
    color: '#ededed',
    fontSize: 36,
    paddingRight: 130,
  },
  searchContainer: {
    borderRadius: 8,
    padding: 15,
    width: '100%',
    backgroundColor: '#E3E3E3',
  },
  searchInput: {
    padding: 2,
    width: 265,
    borderRadius: 15,
    backgroundColor: '#E3E3E3',
  },
  button: {
    backgroundColor: '#90C8AC',
    padding: 15,
    width: '100%',
    paddingHorizontal: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#ededed',
    fontSize: 18,
  },
  BibleVerseContainer: {
    width: '100%',
    height: '24%',
    alignItems: 'center',
    backgroundColor: 'rgba(115, 169, 173, 0.5)',
    borderRadius: 25,
    padding: 20,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  TakeSurveyContainer: {
    alignItems: 'center',
    marginTop: 15,
    backgroundColor: 'rgba(103, 95, 243, 0.2)',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  TakeSurveyText: {
    color: '#ededed',
    fontSize: 18,
    marginBottom: 5,
  },
  TakeSurveyButton: {
    backgroundColor: '#655FF3',
    padding: 15,
    width: '100%',
    paddingHorizontal: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  myJournalContainer: {
    width: '95%',
    alignItems: 'center',
    marginTop: 15,
    backgroundColor: 'rgba(103, 95, 243, 0.5)',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  myJournalText: {
    color: '#ededed',
    fontSize: 18,
    marginBottom: 5,
  },
  myJournalButton: {
    backgroundColor: '#655FF3',
    padding: 15,
    width: '100%',
    paddingHorizontal: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  btnContainer: {
    marginBottom: 10,
    padding: 20,
    width: '95%'
  },
  btnStyles: {
    backgroundColor: '#655FF3',
    padding: 15,
    width: '100%',
    paddingHorizontal: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3
  },
  btnText: {
    color: "white",
    fontSize: 18,
  },
  verseItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'rgb(27, 26, 69)',
    borderRadius: 10,
  },
  verseContent: {
    marginBottom: 10,
  },
  renderedItemsContainer: {
    flex: 1,
    marginTop: 10,
  },
});