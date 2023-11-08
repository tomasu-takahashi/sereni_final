import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable, Dimensions, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase'; // Import the database object from Firebase.js
import { FlashList } from '@shopify/flash-list';
import { ref, onValue } from 'firebase/database';
import { auth } from 'firebase/auth';

const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');

const MyJournal = () => {
  const [notes, setNotes] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Get the notes data from the database for the current user
    const notesRef = ref(db, 'notes/123');
    onValue(notesRef, (snapshot) => {
      const newNotes = [];
      snapshot.forEach((child) => {
        const { note, title, uid } = child.val();
  
        // Only display the note if the uid is not the same as the current user's uid
        if (!uid === auth?.currentUser?.uid) {
          return;
        }
        newNotes.push({ note, title, id: child.key });
      });
      setNotes(newNotes);
    });
  }, []);

  return (
    <ImageBackground
        style={styles.backgroundImage}
        resizeMode="cover"
        source={require("../assets/bgMain.png")}
        >
        
    <View style={styles.container}>
      <FlashList
        data={notes}
        numColumns={1}
        estimatedItemSize={100}
        renderItem={({ item }) => (
          <View style={styles.noteView} key={item.id}>
          <Pressable
            onPress={() => navigation.navigate('EditJournal', {item})}
          >
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.noteDescription}>{item.note}</Text>
          </Pressable>
          </View>
        )}
      />
      <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('AddJournal')}>
        <Text style={styles.buttonText}>Add Journal</Text>
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
  Button: {
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
  noteView: {
    backgroundColor: 'rgba(21, 21, 21, 0.5)',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 7,
  },
  noteTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ededed',
  },
  noteDescription: {
    color: '#ededed',
    fontSize: 16,
    marginTop: 5,
  },
});

export default MyJournal;