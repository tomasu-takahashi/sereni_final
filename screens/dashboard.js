import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Dimensions, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');

const Dashboard = ({ fullname }) => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleButtonPress = () => {
    // Perform data retrieval based on searchQuery
    if (searchQuery) {
      // Fetch data from API.Bible and display
      fetch(`https://api.scripture.api.bible/v1/bibles/search?query=${searchQuery}`, {
        headers: {
          'api-key': 'aa930ce94cef5a23dd5c84062cf7aca0',
        },
      })
      .then((response) => response.json())
      .then((data) => {
        // Store the search results in state
        setSearchResults(data.results);
        alert(data.results);
      })
        .catch((error) => {
          // Handle error
          console.error(error);
        });
    } else {
      Alert.alert('Error', 'Please enter a search query');
    }
  };

  const handleNavigateToTab = () => {
    // Logic to navigate to another tab
    navigation.navigate('Assessment');
  };

  return (
    <ImageBackground
        style={styles.backgroundImage}
        resizeMode="cover"
        source={require("../assets/bgMain.png")}
        >

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
          onChangeText={handleSearch}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
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
    paddingLeft: 185 
  },
  BibleVerseText1: {
    color: '#ededed',
    fontSize: 20,
    marginBottom: 5,
    paddingRight: 190
  },
  BibleVerseText2: {
    color: '#ededed',
    fontSize: 36,
    marginBottom: 5,
    paddingRight: 130
  },
  searchContainer: {
    borderRadius: 8,
    padding: 15,
    width: '90%',
    backgroundColor: "#E3E3E3"
  },
  searchInput: {
    padding: 2,
    width: 265,
    borderRadius: 15,
    backgroundColor: "#E3E3E3",
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
    color: '#ededed',
    fontSize: 18,
  },
  BibleVerseContainer: {
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'rgba(27, 26, 69, 0.5)',
    borderRadius: 10,
    padding: 20,
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
  TakeSurveyContainer: {
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'rgba(103, 95, 243, 0.5)',
    borderRadius: 10,
    padding: 20,
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
  TakeSurveyText: {
    color: '#ededed',
    fontSize: 18,
    marginBottom: 5,
  },
  TakeSurveyButton: {
    backgroundColor: '#655FF3',
    padding: 15,
    width: '100%',
    paddingHorizontal: 110,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 5,
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
});