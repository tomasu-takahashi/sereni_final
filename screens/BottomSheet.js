import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Pressable, ScrollView, TextInput, Alert } from 'react-native';


const BottomSheet = ({ setStatus }) => {
    const slide = React.useRef(new Animated.Value(700)).current;
    const navigation = useNavigation();

    const slideUp = () => {
        Animated.timing(slide, {
            toValue: 0,
            duration: 900,
            useNativeDriver: true,
        }).start();
    };

    const slideDown = () => {
        Animated.timing(slide, {
            toValue: 1500,
            duration: 900,
            useNativeDriver: true,
        }).start();
    };

    React.useEffect(() => {
        slideUp();
    }, []);

    const closeModal = () => {
        slideDown();

        setTimeout(() => {
            setStatus(false);
        }, 800);
    };

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

    return (
        <Pressable onPress={closeModal} style={styles.backdrop}>
        <Pressable style={{ width: '100%', height: '90%'}}>
        <Animated.View style={[styles.bottomSheet, { transform: [{ translateY: slide }]}]}>
          <View style={styles.BibleVerseContainer}>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                clearButtonMode='always'
                value={search}
                onChangeText={setSearch}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={getResults}>
              <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>

            
            <ScrollView 
                style={styles.renderedItemsContainer}>
                {renderedItems}
            </ScrollView>
            
            
          </View>
            </Animated.View>
            </Pressable>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        flex: 1,
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    },
    bottomSheet: {
        width: '100%',
        height: '90%',
        backgroundColor: 'white',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    searchContainer: {
        borderRadius: 8,
        padding: 15,
        width: '100%',
        backgroundColor: '#E3E3E3',
      },
      searchInput: {
        width: '100%',
        borderRadius: 15,
        backgroundColor: '#E3E3E3',
      },
      button: {
        backgroundColor: '#655FF3',
        padding: 10,
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
        height: '100%',
        width: '100%',
        alignItems: 'center',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
      verseItem: {
        marginBottom: 10,
        padding: 20,
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

export default BottomSheet;