import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Dimensions, ImageBackground, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');

const Dashboard = ({ fullname }) => {
  const navigation = useNavigation();
  const API_KEY = 'aa930ce94cef5a23dd5c84062cf7aca0';
  const bibleVersionID = '55212e3cf5d04d49-01';
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState('');
  const [showLoad, setShowLoad] = useState(false);


  const getResults = async () => {
    if (!search) {
      Alert.alert('No Input');
      return;
    }
    setResults([]);
    console.log('fetching data...');
    setShowLoad(true);
    const response = await fetch(
      `https://api.scripture.api.bible/v1/bibles/${bibleVersionID}/search?query=${search}`,
      {
        headers: {
          'api-key': API_KEY,
        },
      }
    );

    if (response.status === 200) {
      setShowLoad(false);
      const data = await response.json();
      const verses = data.data.verses;
      console.log(verses);
      setResults(verses);
    }
  };

  const renderedItems = results.map((verse, index) => (
    <View style={styles.verseItem} key={index}>
      <View style={styles.verseContent}>
        <Text style={[styles.bold, styles.colorPrimary, { fontSize: 18, color: '#ededed' }]}>{verse.reference}</Text>
        <Text style={{ fontSize: 16, color: '#ededed' }}>{verse.text}</Text>
      </View>
    </View>
  ));

  const handleNavigateToTab = () => {
    navigation.navigate('Assessment');
  };

  return (
    <ImageBackground style={styles.backgroundImage} resizeMode="cover" source={require("../assets/bgMain.png")}>
      <View style={styles.root}>
        <Text style={styles.greeting}>Hello, {fullname} Welcome!</Text>
        <View style={styles.container}>
          <View style={styles.BibleVerseContainer}>
            <Text style={styles.BibleVerseText1}>Search Your</Text>
            <Text style={styles.BibleVerseText2}>Bible Verse</Text>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                clearButtonMode='always'
                value={search}
                onChangeText={setSearch}
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={getResults}>
                <Text style={styles.buttonText}>Search</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.renderedItemsContainer}>{renderedItems}</ScrollView>
          </View>

          <View style={styles.TakeSurveyContainer}>
            <Text style={styles.TakeSurveyText}>How are you feeling recently?</Text>
            <Text style={styles.TakeSurveyText}>Do you want to take a test?</Text>
            <TouchableOpacity style={styles.TakeSurveyButton} onPress={handleNavigateToTab}>
              <Text style={styles.buttonText}>Take Test</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Dashboard;

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
    paddingTop: 1,
  },
  greeting: {
    color: '#ededed',
    fontSize: 24,
    marginTop: 20,
    paddingLeft: 185,
  },
  BibleVerseText1: {
    color: '#ededed',
    fontSize: 20,
    marginBottom: 5,
    paddingRight: 190,
  },
  BibleVerseText2: {
    color: '#ededed',
    fontSize: 36,
    marginBottom: 5,
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
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
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
  buttonText: {
    color: '#ededed',
    fontSize: 18,
  },
  BibleVerseContainer: {
    height: '50%',
    width: '95%',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'rgba(27, 26, 69, 0.5)',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  TakeSurveyContainer: {
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'rgba(103, 95, 243, 0.5)',
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
    marginTop: 5,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
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