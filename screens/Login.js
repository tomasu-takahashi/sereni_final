import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions, SafeAreaView, ImageBackground, Linking, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');

const Login = () => {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);

    const handleNavigation = () => {
        navigation.navigate('Register');
    }

    const handleLogin = () => {
        if (email === '' || password === '') {
            Alert.alert('Please enter your email and password');
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                navigation.navigate('dashboard');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                if (errorCode === 'auth/user-not-found') {
                    Alert.alert('Login Error', 'User not registered');
                } else if (errorCode === 'auth/wrong-password') {
                    Alert.alert('Login Error', 'Wrong password');
                }
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

                    <TouchableOpacity onPress={() => navigation.navigate('forgotPassword')}>
                        <Text style={{ marginTop: 20, color: '#ededed' }}>Forgot your Password?</Text>
                    </TouchableOpacity>

                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={{ ...styles.btnStyles, backgroundColor: '#444382' }} onPress={() => handleLogin()}>
                            <Text style={{ fontSize: 18, color: '#ededed' }}>Log in</Text>
                        </TouchableOpacity>

                        <Text style={{ marginTop: 30, color: '#ededed' }}>Don't have an Account?</Text>
                        <TouchableOpacity style={{ ...styles.btnStyles, borderColor: '#444382', borderWidth: 1.5, marginTop: 10 }} onPress={() => handleNavigation()}>
                        <Text style={{ fontSize: 18, color: '#ededed'}}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
        </ImageBackground>
    )
}

export default Login

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
        height: '50%',
        width: '100%',
        bottom: screenHeight/10
    },
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: screenWidth,
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
    inputStyle: {
        padding: 10,
        width: '90%',
        borderRadius: 15,
        marginTop: 10,
        backgroundColor: "#E3E3E3"
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
    hidePasswordButton: {
        // ... hide password button styles ...
        marginLeft: 40,
        },
    

    hidePasswordButtonText: {
        // ... hide password button text styles ...
        Color: "#E3E3E3",
        fontSize: 12,
    },
})
