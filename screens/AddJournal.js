import React, { useState, useEffect } from 'react';
import { View, Text, Keyboard, StyleSheet, TextInput, TouchableOpacity, Dimensions, ImageBackground, Alert } from 'react-native';
import { db } from '../firebase'; // Import the database object from Firebase.js
import { ref, push } from 'firebase/database';
import { useNavigation } from '@react-navigation/native'
import { getAuth } from "firebase/auth";

const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');

const AddJournal = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Get the userId from the logged-in user
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid);
    }
  }, []);

  const handleAdd = () => {
    // Add the journal entry to the database
    push(ref(db, 'notes'), {
      title,
      note,
      userId, // Add the userId to the note object
    })
      .then(() => {
        setTitle('');
        setNote('');
        Keyboard.dismiss();
        Alert.alert('Journal Added');
        navigation.navigate('dashboard')
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <ImageBackground
        style={styles.backgroundImage}
        resizeMode="cover"
        source={require("../assets/bgMain.png")}
        >
      <View style={styles.container}>
      <View style={styles.heading}></View>
      <TextInput
        style={styles.inputTitle}
        placeholder="Title"
        placeholderTextColor="#ededed"
        value={title}
        onChangeText={(Text) => setTitle(Text)}
      />
      <TextInput
        style={styles.inputNote}
        placeholder="Enter Journal"
        placeholderTextColor="#ededed"
        value={note}
        onChangeText={(Text) => setNote(Text)}
        multiline={true}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    height: screenHeight,
    width: screenWidth,
  },
  heading: {
    color: '#ededed',
    textAlign: 'center',
    padding: 30,
    paddingBottom: 20,
  },
  inputTitle: {
    backgroundColor: 'rgba(21, 21, 21, 0.5)',
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    height: 50,
    borderRadius: 10,
    color: '#ededed',
},
inputNote: {
    backgroundColor: 'rgba(21, 21, 21, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    fontSize: 18,
    margin: 10,
    padding: 10,
    paddingTop: 10,
    height: 570,
    borderRadius: 10,
    color: '#ededed',
},
  addButton: {
    backgroundColor: '#655FF3',
    padding: 15,
    margin: 20,
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
});

export default AddJournal;