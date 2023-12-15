import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput, SafeAreaView, ImageBackground, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');

const Register = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      style={styles.backgroundImage}
      resizeMode="cover"
      source={require("../assets/bgLogin.png")}
    >
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
          <Text style={{ fontSize: 20, marginBottom: 20, color: '#ededed' }}>Register as</Text>
          <View style={styles.btnContainer2}>
                <TouchableOpacity
                  style={{ ...styles.btnStyles2, backgroundColor: '#444382' }}
                  onPress={() => navigation.navigate('RegisterUser')}
                >
                  <Text style={{ fontSize: 18, color: '#ededed' }}>Client</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ ...styles.btnStyles2, backgroundColor: '#444382' }}
                  onPress={() => navigation.navigate('RegisterVolunteer')}
                >
                  <Text style={{ fontSize: 18, color: '#ededed' }}>Volunteer</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.btnContainer2}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={{ marginTop: 20, color: '#ededed' }}>Already have an Account?</Text>
                </TouchableOpacity>
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 3
            },
        }),
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
  userTypeButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '40%',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: 'rgba(68, 67, 130, 0.4)',
    borderColor: '#444382',
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
  userTypeButtonSelected: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '40%',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#444382',
    backgroundColor: '#444382',
  },
  userTypeButtonText: {
    fontSize: 16,
    color: '#ededed',
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
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 3
            },
        }),
  },
});

export default Register;