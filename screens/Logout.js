import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Pressable, Alert } from 'react-native';
import { auth } from "../firebase";

const LogOut = ({ setStatus }) => {
    const slide = React.useRef(new Animated.Value(300)).current;
    const navigation = useNavigation();
    const [user, setUser] = useState(auth.currentUser);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user);
      });
  
      return unsubscribe;
    }, []);

    const slideUp = () => {
        Animated.timing(slide, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const slideDown = () => {
        Animated.timing(slide, {
            toValue: 300,
            duration: 300,
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
        }, 400);
    };

    const handleLogout = () => {
      Alert.alert(
        'Are you sure you want to log out?',
        '',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => {
            auth.signOut()
              .then(() => navigation.navigate("Login"))
              .catch((error) => alert(error.message));
          }},
        ],
        { cancelable: false }
      );
    };

    return (
        <Pressable onPress={closeModal} style={styles.backdrop}>
        <Pressable style={{ width: '100%', height: '35%'}}>
        <Animated.View style={[styles.bottomSheet, { transform: [{ translateY: slide }]}]}>
        <View style={styles.container}>
          <Text style={styles.AssessmentText}>Do you want to Log out your Account?</Text>
              <View style={styles.wrapper}>
                <Text style={styles.email}>{user?.email || ''}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleLogout}>
                  <Text style={styles.buttonText}>Log out</Text>
                </TouchableOpacity>
              </View>
            </View>

            </Animated.View>
            </Pressable>
        </Pressable>
    );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end'
  },
  bottomSheet: {
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 10,
    width: '100%',
    height: '30%',
    padding: 10,
    borderRadius: 10,
    marginBottom: '10%',
  },
  AssessmentText: { 
    justifyContent: 'center',
    margin: 10,
    color: '#222831',
    fontSize: 19,
    wordWrap: 'break-word',
    fontWeight: '500'
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  email: {
    fontSize: 18,
    color: '#222831',
    fontWeight: '500',
    paddingBottom: 20
  },
  button: {
    backgroundColor: '#8BE8E5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 7,
    width: '100%',
    marginBottom: 10,
    elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3
  },
  buttonText: {
    color: '#222831',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
  text: {
    color: '#222831',
    fontSize: 18,
    margin: 10
  }
});

export default LogOut;
