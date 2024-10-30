// RecycleBin.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase';
import { ref, onValue, set, remove } from 'firebase/database';
import { auth } from 'firebase/auth';
import { getAuth } from "firebase/auth";
import { AntDesign } from '@expo/vector-icons';

const recycleBin = () => {
  const [deletedNotes, setDeletedNotes] = useState([]);
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;

  useEffect(() => {
    const deletedNotesRef = ref(db, 'deletedNotes/' + uid);
    onValue(deletedNotesRef, (snapshot) => {
      const newDeletedNotes = [];
      snapshot.forEach((child) => {
        const note = child.val().note;
        const title = child.val().title;
        const userId = child.val().userId;
        const noteRefKey = child.val().noteRefKey;
        const deletedAt = child.val().deletedAt;

        newDeletedNotes.push({ note, title, userId, noteRefKey, deletedAt });
      });
      setDeletedNotes(newDeletedNotes);
    });
  }, []);

  const handleRestore = (note) => {
    const currentTime = new Date().getTime();
    set(ref(db, 'notes/' + uid + '/' + note.noteRefKey), {
      title: note.title,
      note: note.note,
      uid: note.userId,
      noteRefKey: note.noteRefKey,
      lastEdit: currentTime,
    })
    .then(() => {
      remove(ref(db, 'deletedNotes/' + uid + '/' + note.noteRefKey));
      navigation.navigate('MyJournal');
      Alert.alert('Note Restored');
    })
    .catch((error) => {
    });
  };

  const handleDeletePermanently = (note) => {
    remove(ref(db, 'deletedNotes/' + uid + '/' + note.noteRefKey))
    .then(() => {
      navigation.navigate('MyJournal');
      Alert.alert('Note Deleted Permanently');
    })
    .catch((error) => {
    });
  };

  return (
    <ImageBackground
      style={styles.backgroundImage}
      resizeMode="cover"
      source={require("../assets/bgMain.jpg")}
    >
    <View style={styles.topHeader}>
            <TouchableOpacity style={styles.backButtonStyle} onPress={() => navigation.navigate('dashboard')}>
                <AntDesign name="left" size={21} color="#222831" />
                <Text style={{ fontSize: 18, color: '#222831', fontWeight: '600', paddingRight: 5 }}>Back</Text>
            </TouchableOpacity>
    </View>
    <View style={styles.container}>
      <Text style={styles.title}>Recycle Bin</Text>
      {deletedNotes.length === 0 ? (
        <Text style={styles.noEntryText}>No Deleted Notes</Text>
      ) : (
        deletedNotes.map((note, index) => (
          <View key={index} style={styles.noteView}>
            <Text style={styles.noteTitle}>{note.title}</Text>
            <Text style={styles.noteDeletedAt}>Deleted At: {new Date(note.deletedAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</Text>
            <Pressable style={styles.restoreButton} onPress={() => handleRestore(note)}>
              <Text style={styles.restoreButtonText}>Restore</Text>
            </Pressable>
            <Pressable style={styles.deleteButton} onPress={() => handleDeletePermanently(note)}>
              <Text style={styles.deleteButtonText}>Delete Permanently</Text>
            </Pressable>
          </View>
        ))
      )}
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
  topHeader: {
    justifyContent: 'flex-start',
    paddingTop: '20%',
    paddingLeft: 10,
    flexDirection: 'row',
  },
  backButtonStyle: {
  position: 'relative',
  flexDirection: 'row',
  },
  container: {
    flex: 1,
    paddingTop: 10,
  },
  title: {
    color: '#222831',
    fontSize: 36,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 20,
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
    fontSize: 18,
    fontWeight: '600',
    color: '#222831',
  },
  noteDeletedAt: {
    color: '#222831',
    marginTop: 5,
    fontSize: 15,
  },
  restoreButton: {
    backgroundColor: '#8BE8E5',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  restoreButtonText: {
    fontSize: 16,
    color: '#222831',
  },
  deleteButton: {
    backgroundColor: '#FFEEBB',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  deleteButtonText: {
    fontSize: 16,
    color: '#222831',
  },
  noEntryText: {
    fontSize: 20,
    color: '#222831',
    textAlign: 'center',
    marginTop: 100,
    fontWeight: 600
  },
});

export default recycleBin;