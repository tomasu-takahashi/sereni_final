import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ImageBackground, SafeAreaView } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth } from "../firebase";
import LogOut from './LogOut';
import { FontAwesome } from '@expo/vector-icons';

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
    <ImageBackground style={styles.backgroundImage} resizeMode="cover" source={require("../assets/bgMain.jpg")}>
      <View style={styles.root}>
        <View style={styles.container}>

          <View style={styles.titleContainer}>
          <Text style={styles.title}>Sereni</Text>
          
          <TouchableOpacity onPress={() => setStatus(true)}>
            <FontAwesome 
              name="sign-out" 
              size={30} 
              color='rgba(115, 169, 173, 1)'
              style={{
                bottom: 6,
                left: '93%',
                position: 'absolute',
                
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.bibleContainer} onPress={handleNavigateToResult}>
          
          <SafeAreaView>
            <ImageBackground
                style={{
                  height: "100%",
                  width: "80%",
                  left: '50%',
                  elevation: 5,
                  shadowColor: 'black',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 3,
                }}
              resizeMode="contain"
              source={require("../assets/bibleVerseIcon.png")}
            />
          </SafeAreaView>

            <Text style={styles.BibleVerseText1}>Search Your</Text>
            <Text style={styles.BibleVerseText2}>Bible Verse</Text>
          </TouchableOpacity>
            
          </View>
          
          <TouchableOpacity style={styles.TakeSurveyContainer} onPress={handleNavigateToTabAssessment}>
          <SafeAreaView>
            <ImageBackground
                style={{
                  height: "100%",
                  width: "60%",
                  left: 5,
                  elevation: 5,
                  shadowColor: 'black',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 3,
                }}
              resizeMode="contain"
              source={require("../assets/assessmentIcon.png")}
            />
          </SafeAreaView>
          <Text style={styles.SurveyText}>Assessment</Text>
            <Text style={styles.TakeSurveyText}>How are you feeling recently?</Text>
            <Text style={styles.TakeSurveyText2}>Go to Assessment</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.myJournalContainer} onPress={handleNavigateToTabJournal}>
          <SafeAreaView>
            <ImageBackground
                style={{
                  height: "100%",
                  width: "70%",
                  right: 10,
                  elevation: 5,
                  shadowColor: 'black',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 3,
                }}
              resizeMode="contain"
              source={require("../assets/journalIcon.png")}
            />
          </SafeAreaView>
            
          <Text style={styles.myJournalTitleText}>Journal</Text>
            <Text style={styles.myJournalText}>Note how you feel?</Text>
            <Text style={styles.myJournalText2}>Go to My Journal</Text>
          </TouchableOpacity>
          
        {status && <LogOut setStatus={setStatus}/>}
        </View>
      </View>
     </ImageBackground>
  );
};

export default dashboard;

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
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  BibleVerseText1: {
    position: 'absolute',
    top: '10%',
    right: '68%',
    color: '#222831',
    fontSize: 20,
    paddingTop: 12,
  },
  BibleVerseText2: {
    position: 'absolute',
    top: '40%',
    right: '46%',
    color: '#222831',
    fontSize: 36,
    fontWeight: '500',
  },
  title: {
    color: 'rgba(115, 169, 173, 1)',
    fontSize: 45,
    fontWeight: '600',
    paddingTop: 45
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
    backgroundColor: '#8BE8E5',
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
    color: '#222831',
    fontSize: 18,
    fontWeight: '600',
  },
  bibleContainer: {
    width: '103%',
    height: '55%',
    position: 'relative',
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#C7F6FF',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  titleContainer: {
    width: '100%',
    height: '35%',
    alignSelf: 'center',
    backgroundColor: '#FAF9F6',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  TakeSurveyContainer: {
    position: 'relative',
    width: '95%',
    height: '24%',
    alignSelf: 'center',
    marginTop: 22,
    backgroundColor: '#B9EDDD',
    borderRadius: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  SurveyText: {
    position: 'absolute',
    top: '5%',
    left: '41%',
    color: '#222831',
    fontSize: 36,
    fontWeight: '600',
    paddingTop: 10
  },
  TakeSurveyText: {
    color: '#222831',
    position: 'absolute',
    top: '35%',
    left: '37%',
    fontSize: 16,
    marginBottom: 2,
  },
  TakeSurveyText2: {
    color: '#222831',
    position: 'absolute',
    top: '80%',
    left: '54%',
    fontSize: 18,
    fontWeight: '500',
  },
  myJournalContainer: {
    position: 'relative',
    width: '95%',
    height: '24%',
    alignSelf: 'center',
    marginTop: 22,
    backgroundColor: '#FFEEBB',
    borderRadius: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  myJournalText: {
    color: '#222831',
    position: 'absolute',
    top: '35%',
    left: '57%',
    fontSize: 16,
    marginBottom: 2,
  },
  myJournalText2: {
    color: '#222831',
    position: 'absolute',
    top: '80%',
    left: '57%',
    fontSize: 18,
    fontWeight: '500',
  },
  myJournalTitleText: {
    position: 'absolute',
    top: '5%',
    left: '62%',
    color: '#222831',
    fontSize: 36,
    fontWeight: '600',
    paddingTop: 10
  },
  myJournalButton: {
    backgroundColor: '#8BE8E5',
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