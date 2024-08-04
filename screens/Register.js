import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput, SafeAreaView, ImageBackground, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth, db } from '../firebase';
import { set, ref } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Fontisto, Ionicons } from '@expo/vector-icons';

const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');

const Register = () => {
  const navigation = useNavigation();
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

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
          });
        };

        const writeLoggedUserData = () => {
          set(ref(db, `users/logged_users/${user.uid}`), {
            fullname: fullname,
            email: email,
            uid: user.uid,
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
      source={require("../assets/bg.jpg")}
    >
      <View style={styles.root} behavior="padding">
          <View style={styles.container}>

          <Text style={styles.title}>Welcome!</Text>
          <Text style={styles.title2}>Let's Create your Account</Text>

            <View style={styles.inputContainer}>
              <View style={styles.inputRoot}>
              <AntDesign name="user" size={24} color="black"/>
              <View style={styles.InputContainer}>
                <TextInput
                  value={fullname}
                  placeholder="Full Name"
                  onChangeText={text => setFullName(text)}
                  keyboardType="default"
                  autoCorrect={false}
                  clearButtonMode='always'
                  style={styles.inputStyle}
                />
              </View>
              </View>

              <View style={styles.inputRoot}>
              <Fontisto name="email" size={24} color="black" />
              <View style={styles.InputContainer}>
                <TextInput
                  value={email}
                  placeholder="Email"
                  onChangeText={text => setEmail(text)}
                  keyboardType="email-address"
                  clearButtonMode='always'
                  style={styles.inputStyle}
                />
              </View>
              </View>

              <View style={styles.inputRoot}>
              <AntDesign name="lock" size={24} color="black" />
              <View style={styles.InputContainer}>
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
                  {hidePassword ? (
                      <Ionicons name="eye-outline" size={24} color="black" />
                    ) : (
                      <Ionicons name="eye-off-outline" size={24} color="black" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputRoot}>
              <AntDesign name="lock" size={24} color="black" />
              <View style={styles.InputContainer}>        
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
                  {hidePassword ? (
                      <Ionicons name="eye-outline" size={24} color="black" />
                    ) : (
                      <Ionicons name="eye-off-outline" size={24} color="black" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              
              <View style={styles.btnContainer}>
                <TouchableOpacity style={ styles.btnStyles } onPress={() => handleSignup()}>
                  <Text style={{ fontSize: 18, fontWeight: '600', color: '#222831' }}>Register</Text>
                </TouchableOpacity>


                <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 30}}>
                  <Text style={{ color: '#222831', fontWeight: '500' }}>Already have an Account?</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={{ paddingLeft: 5, fontSize: 16, fontWeight: '600', color: '#00ADB5'}}>Sign In</Text>
                  </TouchableOpacity>
                </View>
                
              </View>
            </View>
          </View>
          </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  title: {
    fontWeight: '600',
    fontSize: 30,
    paddingBottom: 10,
    paddingLeft: 20,
    alignSelf: 'flex-start',
  },
  title2: {
    fontWeight: '600',
    fontSize: 25,
    paddingBottom: 50,
    paddingLeft: 20,
    alignSelf: 'flex-start',
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth,
  },
  inputRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#FAF9F6",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3
  },
  InputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
  },
  inputStyle: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    paddingLeft: 10,
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
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginTop: 20,
  },
  btnStyles: {
    backgroundColor: '#8BE8E5',
    padding: 15,
    width: '100%',
    paddingHorizontal: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 20,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3
  },
});

export default Register;