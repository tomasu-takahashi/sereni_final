import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, ImageBackground, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ref, set, remove } from "firebase/database";
import { getAuth } from "firebase/auth";
import { db } from '../firebase';
import { AntDesign } from '@expo/vector-icons';

const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');

const EditJournal = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [note, setNote] = useState(route.params.item.note);
    const [title, setTitle] = useState(route.params.item.title);
    const [noteRefKey, setNoteRefKey] = useState(route.params.item.noteRefKey);
    const [userId, setUserId] = useState('');
    const auth = getAuth();
        const user = auth.currentUser;
        const uid = user.uid;

    useEffect(() => {
        // Get the userId from the logged-in user
        // const auth = getAuth();
        // const user = auth.currentUser;
        if (user) {
            setUserId(user.uid);
        }
    }, []);

    const handleUpdate = () => {
        if (title && note.length > 0) {
            const currentTime = new Date().getTime();
            set(ref(db, 'notes/' + uid + '/' + noteRefKey),{
                title,
                note,
                userId,
                noteRefKey,
                lastEdit: currentTime,
            })
            .then(() => {
                navigation.navigate('dashboard');
                Alert.alert('Saved');
            })
            .catch((error) => {
                alert(error);
            });
        }
    };
    
    const handleDelete = async () => {
        const noteRef = ref(db, 'notes/' + uid + '/' + noteRefKey);

        console.log(noteRefKey);
        try {
            await remove(noteRef);
            Alert.alert('Note Deleted');
            navigation.navigate('dashboard');
        } catch (error) {
            console.error('Error deleting note:', error);
            alert(error.message);
        }  
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

            <TouchableOpacity style={styles.saveButtonStyle} onPress={handleUpdate}>
            <Text style={{ fontSize: 18, color: '#00ADB5', fontWeight: '600', paddingRight: 5 }}>Save</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.container}>
            <TextInput
                placeholder='Title'
                placeholderTextColor="#B4B4B8"
                value={title}
                returnKeyType='done'
                onChangeText={(text) => setTitle(text)}
                style={styles.inputTitle}
            />
            <TextInput
                placeholder='Enter Journal'
                placeholderTextColor="#B4B4B8"
                value={note}
                onChangeText={(text) => setNote(text)}
                style={styles.inputNote}
                multiline={true}
                returnKeyType='done'
                blurOnSubmit={true}
            />
            
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleDelete()}
                >
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        
        </ImageBackground>
    );
}

export default EditJournal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: screenHeight,
        width: screenWidth,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#EEEEEE'
    },
    header: {
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
    saveButtonStyle: {
        position: 'relative',
        left: '65%',
        flexDirection: 'row',
    },
    inputTitle: {
        marginTop: 20,
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
        marginTop: 10,
        paddingLeft: 20,
        height: 510,
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
    
    button: {
        backgroundColor: '#8BE8E5',
        padding: 15,
        margin: 15,
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
        fontWeight: '600',
    }
})