import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions, SafeAreaView, ImageBackground, Linking, Alert } from 'react-native';
import React, { useState } from 'react';
import {  sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');

const forgotPassword = () => {

    const [email, setEmail] = useState('');

    const handleForgotPassword = () => {
        if (email === '') {
            Alert.alert('Please enter your email to reset your password');
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                Alert.alert('Password Reset', 'Password reset email sent. Please check your email.');
            })
            .catch(error => {
                Alert.alert('Password Reset Error', 'User not registered');
            });
    }

    return (
        <ImageBackground
        style={styles.backgroundImage}
        resizeMode="cover"
        source={require("../assets/bgLogin.png")}
        >
        <View style={styles.root}>
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
            <Text style={{ fontSize: 16, color: '#ededed' }}>Confirm your Email to Reset your password</Text>
                <View style={styles.inputContainer}>
                    <View style={styles.inputRoot}>
                        <TextInput
                            value={email}
                            placeholder="Email"
                            onChangeText={text => setEmail(text)}
                            keyboardType="email-address"
                            style={styles.inputStyle}
                        />
                        </View>

                    <View style={styles.btnContainer}>
                    <TouchableOpacity style={{ ...styles.btnStyles, backgroundColor: '#444382' }} onPress={() => handleForgotPassword()}>
                        <Text style={{ fontSize: 16, color: '#ededed' }}>Confirm Email</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
        </ImageBackground>
    )
}

export default forgotPassword

const styles = StyleSheet.create({
    root: {
        height: screenHeight,
        width: screenWidth,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '40%',
        width: '100%',
        bottom: screenHeight/10
    },
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: screenWidth,
        elevation: 5,
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 3
    },
    btnStyles: {
        padding: 15,
        width: '100%',
        paddingHorizontal: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginTop: 20
    },
    btnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        marginTop: 20,
    },
    inputRoot: {
        borderRadius: 8,
        padding: 5,
        width: '90%',
        marginTop: 25,
        backgroundColor: "#E3E3E3"
    },
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
    },
    inputStyle: {
        padding: 10,
        width: '85%',
        borderRadius: 15,
        backgroundColor: "#E3E3E3",
    },
})
