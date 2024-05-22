import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput, SafeAreaView, ImageBackground, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth, db } from '../firebase';
import { set, ref } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';

const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');

const RegisterUser = () => {
  const navigation = useNavigation();
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [userType, setUserType] = useState('user');

  const handleSignup = () => {
    if (fullname === '' || email === '' || password === '' || confirmPassword === '') {
      Alert.alert('Register Error', 'Please input all the fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;

        sendEmailVerification(user); // Send email verification

        const writeUserData = () => {
          set(ref(db, `users/logged_users/${user.uid}`), {
            fullname: fullname,
            email: email,
            uid: user.uid,
            userType: userType,
          });
        };

        const writeLoggedUserData = () => {
          set(ref(db, `users/logged_users/${user.uid}`), {
            fullname: fullname,
            email: email,
            uid: user.uid,
            userType: userType,
          });
        };

        writeUserData();
        writeLoggedUserData();

        Alert.alert('Email Verification Sent', 'The email verification has been sent. Please check your inbox.');

        navigation.navigate('Login');
      })
      .catch(error => alert(error.message));
  };

  return (
    <ImageBackground
      style={styles.backgroundImage}
      resizeMode="cover"
      source={require("../assets/bgLogin.png")}
    >
      <KeyboardAvoidingView style={styles.root} behavior="padding">
          <SafeAreaView>
          <View>
                    <ImageBackground
                        style={{
                            height: screenHeight / 2.5,
                            width: screenWidth,
                        }}
                        resizeMode="contain"
                        source={require("../assets/logo.png")}
                    />
                    </View>
          </SafeAreaView>
          <View style={styles.container}>
          
            <View style={styles.inputContainer}>
              <View style={styles.inputRoot}>
                <TextInput
                  value={fullname}
                  placeholder="Full Name"
                  onChangeText={text => setFullName(text)}
                  keyboardType="default"
                  autoCorrect={false}
                  style={styles.inputStyle}
                />
              </View>

              <View style={styles.inputRoot}>
                <TextInput
                  value={email}
                  placeholder="Email"
                  onChangeText={text => setEmail(text)}
                  keyboardType="email-address"
                  style={styles.inputStyle}
                />
              </View>

              <View style={styles.inputRoot}>
                <View style={styles.passwordInputContainer}>
                  <TextInput
                    value={password}
                    placeholder="Password"
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={hidePassword}
                    style={styles.inputStyle}
                  />
                  <TouchableOpacity
                    onPress={() => setHidePassword(!hidePassword)}
                    style={styles.hidePasswordButton}
                  >
                    <Text style={styles.hidePasswordButtonText}>
                      {hidePassword ? 'Show' : 'Hide'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputRoot}>
                <View style={styles.passwordInputContainer}>
                  <TextInput
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    onChangeText={text => setConfirmPassword(text)}
                    secureTextEntry={hidePassword}
                    style={styles.inputStyle}
                  />
                  <TouchableOpacity
                    onPress={() => setHidePassword(!hidePassword)}
                    style={styles.hidePasswordButton}
                  >
                    <Text style={styles.hidePasswordButtonText}>
                      {hidePassword ? 'Show' : 'Hide'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <SafeAreaView>
              <View style={styles.btnContainer2}>
                <TouchableOpacity
                  style={{ ...styles.btnStyles2, backgroundColor: '#444382' }}
                  onPress={() => handleSignup()}
                >
                  <Text style={{ fontSize: 18, color: '#ededed' }}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={{ marginTop: 20, color: '#ededed' }}>Already have an Account?</Text>
                </TouchableOpacity>
              </View>
              </SafeAreaView>
            </View>
          </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  root: {
    height: screenHeight,
    width: screenWidth
  },
  container: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
    bottom: screenHeight/10
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    elevation: 5,
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 3
  },
  inputRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  inputStyle: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  passwordInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hidePasswordButton: {
    paddingHorizontal: 10,
  },
  hidePasswordButtonText: {
    fontSize: 14,
    color: '#777',
  },
  userTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20,
  },
  btnContainer2: {
    width: '100%',
    alignItems: 'center',
  },
  btnStyles2: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
    elevation: 5,
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 3
  },
});

export default RegisterUser;