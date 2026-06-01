import { StyleSheet, Text, View, TouchableOpacity, TextInput, SafeAreaView, ImageBackground, Image, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { AntDesign, Fontisto, Ionicons } from '@expo/vector-icons';

const Login = () => {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleNavigation = () => {
        navigation.navigate('Register');
    }

    const handleLogin = () => {
        if (email === '' || password === '') {
            Alert.alert('Please enter your email and password');
            return;
        }
    
        setLoading(true); // Set loading state to true
    
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
            })
            .finally(() => {
                setLoading(false); // Set loading state to false
            });
    }

    return (
        <ImageBackground
        style={styles.backgroundImage}
        resizeMode="cover"
        source={require("../assets/bg.jpg")}
        >
        <SafeAreaView style={styles.root}>
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo}
                    resizeMode="contain"
                    source={require("../assets/logo2.png")}
                />
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

                        <View style={styles.inputRoot}>
                        <AntDesign name="lock" size={24} color="black" />
                        <View style={styles.input}>
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

                    <TouchableOpacity style={styles.forgotPasswordLink} onPress={() => navigation.navigate('forgotPassword')}>
                        <Text style={{ color: '#222831', fontWeight: '600' }}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={ styles.btnStyles } onPress={() => handleLogin()}>
                            <Text style={{ fontSize: 18, fontWeight: '600', color: '#222831' }}>Sign in</Text>
                        </TouchableOpacity>
                        {/* {loading && <ActivityIndicator size="small" color="#fff" style={styles.loading}/>} */}

                        <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 30}}>
                        <Text style={{ color: '#222831', fontWeight: '500' }}>Don't have an Account?</Text>
                        <TouchableOpacity onPress={() => handleNavigation()}>
                        <Text style={{ paddingLeft: 5, fontSize: 16, fontWeight: '700', color: '#00ADB5'}}>Sign Up</Text>
                        </TouchableOpacity>
                        </View>
                        
                    </View>
                </View>
            </View>
        </SafeAreaView>
        </ImageBackground>
    )
}

export default Login

const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        paddingHorizontal: 28,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 28,
        width: '65%',
        aspectRatio: 1.55,
        alignSelf: 'center',
    },
    logo: {
        width: '100%',
        height: '100%',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    inputStyle: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
        paddingLeft: 10,
    },
    inputRoot: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#FAF9F6",
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
        width: '100%',
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
        flex: 1,
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
    btnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 30,
    },
    hidePasswordButton: {
        paddingHorizontal: 10,
    },
    forgotPasswordLink: {
        width: '100%',
        alignItems: 'flex-end',
    },
    loading: {
        justifyContent: 'center',
        opacity: "0.3",
        backgroundColor: "black",
        width: '100%',
        paddingVertical: 12,
    }
})
