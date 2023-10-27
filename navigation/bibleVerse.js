import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');

const bibleVerse = () => {
  const API_KEY = 'aa930ce94cef5a23dd5c84062cf7aca0';
  const bibleVersionID = '55212e3cf5d04d49-01';
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState('')
  const [showLoad, setShowLoad] = useState(false)

  const callToast = (type, text1, text2) => {
    // call toast here
    Toast.show({
        type: type,
        text1: text1,
        text2: text2,
        onPress: ()=>{
            setAvatarVisible(true)
        }
        // position: 
  })};

  const getResults = async () => {
    if (!search) {
      callToast('error','Invalid Input',`no results`)
      return
    }
    setResults([])
    console.log('fetching data...');
    setShowLoad(true)
    const response = await fetch(
      `https://api.scripture.api.bible/v1/bibles/${bibleVersionID}/search?query=${search}`,
      {
        headers: {
          'api-key': API_KEY,
        },
      }
    );

  if (response.status === 200) {
    setShowLoad(false)
    const data = await response.json();
    const verses = data.data.verses;
    console.log(verses);
    setResults(verses);
  }
};


  const renderedItems = results.map((verse) => (
    <>
      <View style={[styles.verseItem, styles.dropShadow]}>
        <View style={styles.verseContent}>
          <Text style={[styles.bold, styles.colorPrimary, { fontSize: RFPercentage(2) }]}>{verse.reference}</Text>
          <Text style={{ fontSize: RFPercentage(1.8) }}>{verse.text}</Text>
        </View>
      </View>
    </>
  ));

  
  
  return (
    <View style={[styles.bibleContainer2]}>
    {/* <View> */}
      <View style={[styles.dropShadow, styles.passwordInputContainer, { borderWidth: 0, paddingHorizontal: 2 }, styles.bibleSearch]}>
        <TextInput
          style={[styles.dropShadow, styles.passwordInput, { paddingHorizontal: 3 }]}
          placeholder="Search for a Bible verse or passage"
          onChangeText={(text) => {setSearch(text)}}
          />
        <TouchableOpacity 
          onPress={getResults} 
          style={[styles.dropShadow, styles.bibleSearchBtn]}>
        </TouchableOpacity>
      </View>

      <View style={styles.bibleResultsContainer}>
        <ActivityIndicator style={[{ marginVertical: 120, display: 'none' }, showLoad && { display: 'flex' }]} size="large" />
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderedItems}
        </ScrollView>
      </View>

      <Toast topOffset={80}/>
    </View>
  );
};

const styles = StyleSheet.create({
  bibleContainer: {
    width: '90%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bibleSearchContainer:{
    width: '85%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    zIndex: 2,
  },

  bibleSearch:{
    width: '85%',
    height: '5%',
    alignSelf: 'center',
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#FFBF69',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    fontSize: RFPercentage(1.8),
    marginBottom:10,
  },

  bibleSearchBtn: {
    backgroundColor: '#2EC4B6',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
    right: 8,
    position: 'absolute',
  },

  bibleContainer2: {
    width: '90%',
    minHeight: '51%',
    alignItems: 'center',
    // backgroundColor:'#ffffff',
    borderRadius: 20,
    marginVertical: 10,
    paddingVertical: 10,
  },

  bibleResultsContainer: {
    width: '90%',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 0,
    // paddingVertical: 10,
    height: '80%',
  },

  verseItem: {
    flexDirection: 'row',
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%'
  },

  verseContent: {
    flex: 1,
  },
});

export default bibleVerse;