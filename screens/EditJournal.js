import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { getDatabase, ref, set, remove } from "firebase/database";
import { getAuth } from "firebase/auth";

const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');

const EditJournal = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [note, setNote] = useState(route.params.item.note);
    const [title, setTitle] = useState(route.params.item.title);
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
            const dbRef = ref(getDatabase(), 'notes/' + uid + route.params.item.id);
            set(dbRef, {
                title,
                note,
                userId
            })
            .then(() => {
                navigation.navigate('dashboard');
            })
            .catch((error) => {
                alert(error);
            });
        }
    };
    
    const handleDelete = () => {
        const dbRef = ref(getDatabase(), 'notes/123/' + route.params.item.id);
        remove(dbRef)
        .then(() => {
            navigation.navigate('dashboard');
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
                placeholder='Title'
                placeholderTextColor="#ededed"
                value={title}
                onChangeText={(text) => setTitle(text)}
                style={styles.inputTitle}
            />
            <TextInput
                placeholder='Enter Journal'
                placeholderTextColor="#ededed"
                value={note}
                onChangeText={(text) => setNote(text)}
                style={styles.inputNote}
                multiline={true}
            />
            <View style={styles.buttonView}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleUpdate}
                >
                    <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleDelete}
                >
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
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
        color: '#ededed'
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
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#655FF3',
        paddingTop: 20,
        paddingBottom: 20,
        padding: 50,
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
    }
})