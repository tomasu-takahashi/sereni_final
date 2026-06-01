import React, { useState, useEffect } from 'react';
import { View, Text, Keyboard, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { db } from '../firebase'; // Import the database object from Firebase.js
import { ref, push, set } from 'firebase/database';
import { useNavigation } from '@react-navigation/native'
import { getAuth } from "firebase/auth";
import { AntDesign } from '@expo/vector-icons';

const AddJournal = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [userId, setUserId] = useState('');
  const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;

  useEffect(() => {
    // Get the userId from the logged-in user
    // const auth = getAuth();
    // const user = auth.currentUser;
    // const uid = user.uid;
    if (user) {
      setUserId(user.uid);
    }
  }, []);

  const handleAdd = () => {
    // Add the journal entry to the database
    const noteRef = ref(db, 'notes/' + uid);
    const noteRefKey = push(noteRef).key;
    const currentTime = new Date().getTime();
    const newNoteRef = ref(db, 'notes/' + uid +'/'+ noteRefKey);

    set(newNoteRef, {
      title,
      note,
      userId,
      noteRefKey,
      lastEdit: currentTime,
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
        source={require("../assets/bgMain.jpg")}
        >

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButtonStyle} onPress={() => navigation.navigate('dashboard')}>
            <AntDesign name="left" size={21} color="#222831" />
            <Text style={{ fontSize: 18, color: '#222831', fontWeight: '600', paddingRight: 5 }}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButtonStyle} onPress={handleAdd}>
          <Text style={{ fontSize: 18, color: '#00ADB5', fontWeight: '600', paddingRight: 5 }}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
      <TextInput
        style={styles.inputTitle}
        placeholder="Title"
        placeholderTextColor="#B4B4B8"
        value={title}
        returnKeyType='done'
        onChangeText={(Text) => setTitle(Text)}
      />
      <TextInput
        style={styles.inputNote}
        placeholder="Enter Journal"
        placeholderTextColor="#B4B4B8"
        value={note}
        onChangeText={(Text) => setNote(Text)}
        multiline={true}
        returnKeyType='done'
        blurOnSubmit={true}
      />
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#EEEEEE'
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '20%',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    flexDirection: 'row',
  },
  backButtonStyle: {
    position: 'relative',
    flexDirection: 'row',
  },
  saveButtonStyle: {
    position: 'relative',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    width: '100%',
  },
  inputTitle: {
    marginTop: 5,
    paddingLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 32,
    fontWeight: '600',
    color: '#222831',
    backgroundColor: '#FAF9F6',
    borderRadius: 15,
    margin: 10,
    padding: 7,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3
  },
  inputNote: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 3,
    paddingLeft: 20,
    flex: 1,
    minHeight: 320,
    color: '#222831',
    backgroundColor: '#FAF9F6',
    borderRadius: 15,
    margin: 10,
    paddingTop: 15,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3
},
  addButton: {
    backgroundColor: '#8BE8E5',
    padding: 15,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3
  },
  buttonText: {
    color: '#222831',
    fontSize: 18,
    fontWeight: '600'
  },
});

export default AddJournal;
