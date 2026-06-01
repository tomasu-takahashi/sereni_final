import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, ImageBackground, Alert, ActivityIndicator, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { EvilIcons, AntDesign } from '@expo/vector-icons';

const bibleVerse = () => {
  const navigation = useNavigation();

  const API_KEY = 'aa930ce94cef5a23dd5c84062cf7aca0';
  const bibleVersionID = '55212e3cf5d04d49-01';
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const getResults = async () => {
    if (!search) {
      Alert.alert('Enter a Text');
      return;
    }

    setResults([]);
    setLoading(true);
    console.log('fetching data...');
    const response = await fetch(
      `https://api.scripture.api.bible/v1/bibles/${bibleVersionID}/search?query=${search}`,
      {
        headers: {
          'api-key': API_KEY,
        },
      }
    );

    if (response.status === 200) {
      setLoading(false);
      const data = await response.json();
      const verses = data.data.verses;
      console.log(verses);
      setResults(verses);
    }
  };
  
  const renderedItems = results.map((verse, index) => (
    <View style={styles.verseItem} key={index}>
      <View style={styles.verseContent}>
        <Text style={[styles.bold, styles.colorPrimary, { fontSize: 18, color: '#222831', fontWeight:'700', paddingBottom: 5 }]}>{verse.reference}</Text>
        <Text style={{ fontSize: 16, color: '#222831', fontWeight: '500' }}>{verse.text}</Text>
      </View>
    </View>
  ));

  return (
    <ImageBackground style={styles.backgroundImage} resizeMode="cover" source={require("../assets/bgMain.jpg")}>
      <View style={styles.root}>
      <View style={styles.topHeader}>
            <TouchableOpacity style={styles.backButtonStyle} onPress={() => navigation.navigate('dashboard')}>
                <AntDesign name="left" size={21} color="#222831" />
                <Text style={{ fontSize: 18, color: '#222831', fontWeight: '600', paddingRight: 5 }}>Back</Text>
            </TouchableOpacity>
      </View>

          <View style={styles.BibleVerseContainer}>
            <View style={styles.searchContainer}>
            <EvilIcons name="search" size={24} color="black" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                clearButtonMode='always'
                value={search}
                onChangeText={setSearch}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={() => {
              Keyboard.dismiss();
              getResults();
            }}>
              <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>

            {loading && <ActivityIndicator size="small" color="#000" style={styles.loading}/>}

            <ScrollView style={styles.renderedItemsContainer}>{renderedItems}</ScrollView>
          </View>
      </View>
    </ImageBackground>
  );
};

export default bibleVerse;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  topHeader: {
    justifyContent: 'flex-start',
    paddingTop: '20%',
    paddingLeft: 10,
    paddingBottom: 10,
    flexDirection: 'row',
  },
  backButtonStyle: {
    position: 'relative',
    flexDirection: 'row',
  },
  searchContainer: {
    borderRadius: 8,
    padding: 15,
    width: '100%',
    backgroundColor: '#FAF9F6',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  searchInput: {
    width: '94%',
    borderRadius: 15,
    paddingLeft: 5,
    backgroundColor: '#FAF9F6',
  },
  button: {
    backgroundColor: '#8BE8E5',
    padding: 10,
    width: '100%',
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
    fontWeight: '600'
  },
  BibleVerseContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  verseItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#CDF0EA',
    borderRadius: 10,
  },
  verseContent: {
    marginBottom: 10,
  },
  renderedItemsContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 140,
  },
  loading: {
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 20,
  }
});
