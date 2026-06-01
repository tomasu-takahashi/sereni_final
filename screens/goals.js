import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const goals = () => {

    const navigation = useNavigation();

    return (
    <ImageBackground
        style={styles.backgroundImage}
        resizeMode="cover"
        source={require("../assets/bgMain.jpg")}
    >
    <View style={styles.header}>
        <Text style={styles.title}>Assessment Goals</Text>
    </View>
    <View style={styles.container}>

    <TouchableOpacity style={styles.Container1} onPress={() => navigation.navigate('goalsAnxiety')}>
            <Image
                style={styles.anxietyImage}
                resizeMode="contain"
                source={require("../assets/anxiety.png")}
            />

            <Text style={styles.Text1}>Handle yourself against</Text>
            <Text style={styles.Text2}>Anxiety</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Container2} onPress={() => navigation.navigate('goalsDepression')}>
            <Image
                style={styles.goalImage}
                resizeMode="contain"
                source={require("../assets/depression.png")}
            />

            <Text style={styles.Text1}>How to deal with</Text>
            <Text style={styles.Text2}>Depression</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Container3} onPress={() => navigation.navigate('goalsStress')}>
            <Image
                style={styles.goalImage}
                resizeMode="contain"
                source={require("../assets/stress.png")}
            />

            <Text style={styles.Text1}>Relieve yourself from</Text>
            <Text style={styles.Text2}>Stress</Text>
        </TouchableOpacity>

    </View>
    </ImageBackground>
    )
}

export default goals

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    header: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    title: {
        color: '#222831',
        fontSize: 36,
        fontWeight: '600',
        paddingTop: 60,
        paddingBottom: 20,
        paddingLeft: 20,
    },
    anxietyImage: {
        position: 'absolute',
        top: '-6%',
        right: 0,
        width: '52%',
        height: '112%',
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    goalImage: {
        position: 'absolute',
        top: '-6%',
        right: 0,
        width: '52%',
        height: '112%',
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    Container1: {
        width: '95%',
        height: '28%',
        position: 'relative',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#C7F6FF',
        borderRadius: 10,
        padding: 10,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    Container2: {
        width: '95%',
        height: '28%',
        position: 'relative',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#B9EDDD',
        borderRadius: 10,
        padding: 10,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    Container3: {
        width: '95%',
        height: '28%',
        position: 'relative',
        alignSelf: 'center',
        marginTop: 10,
        backgroundColor: '#FFEEBB',
        borderRadius: 10,
        padding: 10,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    Text1: {
        position: 'absolute',
        top: '20%',
        left: '5%',
        color: '#222831',
        fontSize: 20,
        paddingTop: 12,
    },
    Text2: {
        position: 'absolute',
        top: '45%',
        left: '5%',
        color: '#222831',
        fontSize: 36,
        fontWeight: '500',
    },
})
