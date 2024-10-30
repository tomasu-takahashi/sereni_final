import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const professionalInformation = () => {
    const navigation = useNavigation();
    return (
        <ImageBackground source={require('../assets/bgMain.jpg')} style={styles.backgroundImage}>
        <View style={styles.topHeader}>
                <TouchableOpacity style={styles.backButtonStyle} onPress={() => navigation.navigate('dashboard')}>
                    <AntDesign name="left" size={21} color="#222831" />
                    <Text style={{ fontSize: 18, color: '#222831', fontWeight: '600', paddingRight: 5 }}>Back</Text>
                </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>List of Professionals</Text>
          <ScrollView>

            <TouchableOpacity style={styles.listContainer}>
            <SafeAreaView>
            <ImageBackground
                style={{
                  height: "130%",
                  width: "58%",
                  left: '5%',
                  bottom: '45%',
                  elevation: 5,
                  shadowColor: 'black',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 3,
                }}
              resizeMode="contain"
              source={require("../assets/professional.png")}
            />
          </SafeAreaView>
              <Text style={styles.listText}>Sir Bob</Text>
              <Text style={styles.listText2}>Psychologist</Text>
              <Text style={styles.listText3}>UNO-R</Text>
            </TouchableOpacity>

          </ScrollView>
        </View>
        </ImageBackground>
      );
    };

export default professionalInformation

const styles = StyleSheet.create({
    backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    },
    topHeader: {
    justifyContent: 'flex-start',
    paddingTop: '20%',
    paddingLeft: 10,
    flexDirection: 'row',
    },
    backButtonStyle: {
    position: 'relative',
    flexDirection: 'row',
    },
    container: {
      flex: 1,
      padding: 10,
    },
    title: {
        color: '#222831',
        fontSize: 32,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 20,
        paddingLeft: 10
    },
    listContainer: {
      width: '100%',
      height: '500%',
      position: 'relative',
      alignSelf: 'center',
      marginTop: 10,
      backgroundColor: '#C7F6FF',
      borderRadius: 10,
      padding: 10,
      elevation: 5,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
  },
  listText: {
    color: '#222831',
    position: 'absolute',
    top: '25%',
    left: '57%',
    fontSize: 32,
    marginBottom: 2,
  },
  listText2: {
    color: '#222831',
    position: 'absolute',
    top: '60%',
    left: '57%',
    fontSize: 18,
    fontWeight: '500',
  },
  listText3: {
    color: '#222831',
    position: 'absolute',
    top: '95%',
    left: '57%',
    fontSize: 18,
    fontWeight: '500',
  },
})