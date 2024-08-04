import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions, SafeAreaView, ImageBackground, Linking, Alert, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import {  sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Fontisto } from '@expo/vector-icons';

const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');

const forgotPassword = () => {

    const [email, setEmail] = useState('');
    const navigation = useNavigation();

    const handleForgotPassword = () => {
        if (email === '') {
            Alert.alert('Please enter your email to reset your password');
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                Alert.alert('Password Reset', 'Password reset email sent. Please check your email.');
                navigation.navigate('Login');
            })
            .catch(error => {
                Alert.alert('Password Reset Error', 'User not registered');
                // navigation.navigate('Login');
            });
    }

    return (
        <ImageBackground
        style={styles.backgroundImage}
        resizeMode="cover"
        source={require("../assets/bg.jpg")}
        >
        <View style={styles.root}>
        
        <View style={styles.header}>
            <TouchableOpacity style={styles.backButtonStyle} onPress={() => navigation.navigate('Login')}>
                <AntDesign name="left" size={21} color="#222831" />
                <Text style={{ fontSize: 18, color: '#222831', fontWeight: '600', paddingRight: 5 }}>Back</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.titleHeader}>
            <Text style={styles.title}>Forgot Password?</Text>
            <Text style={styles.title1}>Confirm your Email to reset your password</Text>
        </View>

        <View style={styles.container}>
            <View style={styles.inputContainer}>
                    <View style={styles.inputRoot}>
                    <Fontisto name="email" size={24} color="black" />
                    <View style={styles.input}>
                        <TextInput
                            value={email}
                            placeholder="Email"
                            onChangeText={text => setEmail(text)}
                            keyboardType="email-address"
                            autoCorrect={false}
                            clearButtonMode='always'
                            style={styles.inputStyle}
                        />
                    </View>
                </View>
            </View>
        </View>

            <KeyboardAvoidingView behavior='position' style={styles.container2}>
                    <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.btnStyles} onPress={() => handleForgotPassword()}>
                        <Text style={{ fontSize: 18, color: '#00ADB5', fontWeight: '600', paddingRight: 5 }}>Confirm Email</Text>
                        <AntDesign name="right" size={21} color="#00ADB5" />
                    </TouchableOpacity>
                    </View>
            </KeyboardAvoidingView>
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
    header: {
        justifyContent: 'flex-start',
        paddingTop: '20%',
        paddingLeft: 10,
    },
    titleHeader: {
        justifyContent: 'flex-start',
        paddingLeft: 20,
        paddingTop: '10%',
    },
    title: {
        color: '#222831',
        fontSize: 30,
        fontWeight: '600',
        paddingBottom: 10,
    },
    title1: {
        color: '#222831',
        fontSize: 16,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '15%',
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
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3
    },
    input: {
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
    container2: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flex: 1
    },
    backButtonStyle: {
        position: 'relative',
        flexDirection: 'row',
    },
    btnStyles: {
        position: 'relative',
        top: 60,
        left: 100,
        flexDirection: 'row',
    },
    btnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        top: '450%'
    },
})
