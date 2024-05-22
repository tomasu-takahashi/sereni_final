import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput, SafeAreaView, ImageBackground, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth, db } from '../firebase';
import { set, ref } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';

const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');

const RegisterVolunteer = () => {
  const navigation = useNavigation();
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [userType, setUserType] = useState('volunteer');
  const [workName, setWorkName] = useState('');
  const [workRole, setWorkRole] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  const handleSignup = () => {
    if (fullname === '' || email === '' || password === '' || confirmPassword === '' || userType === '' || workName === '' || workRole === '') {
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
            workName: workName,
            workRole: workRole,
          });
        };

        const writeLoggedUserData = () => {
          set(ref(db, `users/logged_users/${user.uid}`), {
            fullname: fullname,
            email: email,
            uid: user.uid,
            userType: userType,
            workName: workName,
            workRole: workRole,
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
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          {isClicked ? (
            <View>
            <Text style={{ fontSize: 18, color: '#000000' }}>Upload Proof of work legitimacy</Text>
            <TouchableOpacity style={{...styles.imgRoot, alignSelf: 'center'}}>
                <Text style={{ fontSize: 64, color: 'grey'}}>+</Text>
            </TouchableOpacity>
            </View>
          ) : (
            <View>
            <Text style={{ fontSize: 18, color: '#000000', marginBottom: 10 }}>User Information</Text>
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

              <Text style={{ fontSize: 18, color: '#000000', marginBottom: 10 }}>Work Information</Text>
              <View style={styles.inputRoot}>
                <TextInput
                  value={workName}
                  placeholder="Name of Work"
                  onChangeText={text => setWorkName(text)}
                  keyboardType="default"
                  autoCorrect={false}
                  style={styles.inputStyle}
                />
              </View>

              <View style={styles.inputRoot}>
                <TextInput
                  value={workRole}
                  placeholder="Work Role"
                  onChangeText={text => setWorkRole(text)}
                  keyboardType="default"
                  autoCorrect={false}
                  style={styles.inputStyle}
                />
              </View>
            </View>
          )}

          <View style={styles.btnContainer2}>
            {isClicked ? (
              <>
                <TouchableOpacity 
                  onPress={handleSignup}
                  style={{ ...styles.btnStyles2, backgroundColor: '#444382' }}>
                  <Text style={{ fontSize: 18, color: '#ededed' }}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={() => setIsClicked(false)}
                  style={{ ...styles.btnStyles2, backgroundColor: '#444382' }}>
                  <Text style={{ fontSize: 18, color: '#ededed' }}>Back</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={{ ...styles.btnStyles2, backgroundColor: '#444382' }}
                onPress={() => setIsClicked(true)}
              >
                <Text style={{ fontSize: 18, color: '#ededed' }}>Next</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{ marginTop: 20, color: '#ededed' }}>Already have an Account?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  </ImageBackground>
);
};

const styles = StyleSheet.create({
    imgRoot: {
        borderWidth: 2,
        borderColor: 'black',
        height: 300,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 30,
        borderRadius: '10%'
    },
    // imgContainer: {
    //     borderWidth: 2,
    //     borderColor: 'red',
    //     borderRadius: '100%',
    //     height: 70,
    //     width: 70
    // },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  root: {
    height: screenHeight,
    width: screenWidth
  },
  title: {
    fontSize: 22
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    height: '130%',
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

export default RegisterVolunteer;