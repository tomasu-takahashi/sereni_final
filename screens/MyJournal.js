import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable, Dimensions, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase'; // Import the database object from Firebase.js
import { FlashList } from '@shopify/flash-list';
import { ref, onValue } from 'firebase/database';
import { auth } from 'firebase/auth';
import { getAuth } from "firebase/auth";
import { EvilIcons, AntDesign, FontAwesome6 } from '@expo/vector-icons';

const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');


const MyJournal = () => {
  const [notes, setNotes] = useState([]);
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;
  const [counter, setCounter] = useState(0);
  const [noteKey, setNoteKey ]= useState();
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    const interval = setInterval(() => {
        // Update the count every second
        setCounter(prevCount => prevCount + 1);
    }, 500);

    console.log(counter)
    // Clean up the interval when the component unmounts
    return () => {
        clearInterval(interval);
    };
}, []);
  

  useEffect(() => {
    // Get the notes data from the database for the current user
    const notesRef = ref(db, 'notes/' + uid);
    onValue(notesRef, (snapshot) => {
      const newNotes = [];
      snapshot.forEach((child) => {
        
        const note = child.val().note;
        const title = child.val().title;
        const userId = child.val().userId;
        const noteRefKey = child.val().noteRefKey;
        const lastEdit = child.val().lastEdit || new Date().getTime();
        
  
        // Only display the note if the uid is not the same as the current user's uid
        if (!uid === auth?.currentUser?.uid) {
          return;
        }
        
        newNotes.push({ note, title, userId, noteRefKey, lastEdit });
      });
      setNotes(newNotes);
    });
  }, [counter]);

  const handleUpdate = () => {
    if (title && note.length > 0) {
      const currentTime = new Date().getTime();
      set(ref(db, 'notes/' + uid + '/' + noteRefKey), {
        title,
        note,
        uid,
        noteRefKey,
        lastEdit: currentTime,
      })
      .then(() => {
        // Update the note's lastEdit time in the local state
        const updatedNotes = notes.map(n => {
          if (n.noteRefKey === noteRefKey) {
            return { ...n, lastEdit: currentTime };
          }
          return n;
        });
        setNotes(updatedNotes);
  
        navigation.navigate('dashboard');
        Alert.alert('Saved');
      })
      .catch((error) => {
        alert(error);
      });
    }
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <ImageBackground
      style={styles.backgroundImage}
      resizeMode="cover"
      source={require("../assets/bgMain.jpg")}
    >
      
      <View style={styles.header}>
        <Text style={styles.title}>My Journal</Text>
        <TouchableOpacity style={styles.Button2} onPress={() => navigation.navigate('recycleBin')}>
        <FontAwesome6 name="trash" size={25} color="#00ADB5" />
        </TouchableOpacity>
        </View>
        <View style={styles.container}>
        <View style={styles.searchContainer}>
            <EvilIcons name="search" size={24} color="black" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                onChangeText={setSearchQuery}
                value={searchQuery}
              />
            </View>
        {filteredNotes.length === 0 ? (
          <View>
            <Text style={styles.noEntryText}>No Journal Entry</Text>
            <Text style={styles.noEntryText2}>Press + button to create new Journal</Text>
          </View>
          
        ) : (
          <FlashList
            data={filteredNotes.sort((a, b) => new Date(b.lastEdit) - new Date(a.lastEdit))}
            numColumns={1}
            estimatedItemSize={100}
            renderItem={({ item }) => (
              <View style={styles.noteView} key={item.userId}>
                <Pressable
                  onPress={() => navigation.navigate('EditJournal', { item })}
                >
                  <Text style={styles.noteTitle}>{item.title}</Text>
                  <Text style={styles.noteLastEdit}>Last Edited: {new Date(item.lastEdit).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</Text>
                </Pressable>
              </View>
            )}
          />
        )}
      </View>
      <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('AddJournal')}>
      <AntDesign name="plus" size={30} color="black" />
      </TouchableOpacity>

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  header: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
  title: {
    color: '#222831',
    fontSize: 36,
    fontWeight: '600',
    paddingTop: 60,
    paddingBottom: 20,
    paddingLeft: 20,
  },
  container: {
    flex: 1,
    height: screenHeight,
    width: screenWidth,
  },
  Button: {
    backgroundColor: '#8BE8E5',
    width: "18%",
    padding: 18,
    marginRight: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: "flex-end",
    borderRadius: 100,
    elevation: 5,
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 3
  },
  Button2: {
        justifyContent: 'center',
        alignItems: 'center',
        left: 120,
        top: 20,
    },
  noteView: {
    backgroundColor: '#FAF9F6',
    padding: 15,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  noteTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#222831',
  },
  noteLastEdit: {
    color: '#222831',
    marginTop: 5,
    fontSize: 15,
  },
  noEntryText: {
    fontSize: 20,
    color: '#222831',
    textAlign: 'center',
    marginTop: 100,
    fontWeight: 600
  },
  noEntryText2: {
    fontSize: 16,
    color: '#222831',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 600
  },
  searchContainer: {
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    width: '95%',
    backgroundColor: '#FAF9F6',
    flexDirection: 'row',
    alignSelf: 'center',
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
});

export default MyJournal;