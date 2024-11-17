import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const goalsStress = () => {

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
        <Text style={styles.title}>Stress Goals</Text>
        
        
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

        <View style={styles.listContainer}>
            <Text style={styles.listText}>Physical Activity</Text>
            <Text style={styles.listText2}>Engage in exercise, yoga, or any physical movement that you enjoy.</Text>
        </View>

        <View style={styles.listContainer}>
            <Text style={styles.listText}>Creative Pursuits</Text>
            <Text style={styles.listText2}>Spend time on hobbies like painting, writing, or playing an instrument.</Text>
        </View>

        <View style={styles.listContainer}>
            <Text style={styles.listText}>Human Connection</Text>
            <Text style={styles.listText2}>Spend quality time with friends and family, either in person or virtually.</Text>
        </View>

        <View style={styles.listContainer}>
            <Text style={styles.listText}>Nature Time</Text>
            <Text style={styles.listText2}>Spend at least 20 minutes in nature, such as hiking, sitting in a park, or enjoying your balcony.</Text>
        </View>

        <View style={styles.listContainer}>
            <Text style={styles.listText}>Basic Needs</Text>
            <Text style={styles.listText2}>Ensure you are eating well, sleeping enough, and maintaining personal hygiene.</Text>
        </View>

        <View style={styles.listContainer}>
            <Text style={styles.listText}>Stress Management</Text>
            <Text style={styles.listText2}>Tackle stressful tasks like organizing your space or managing finances.</Text>
        </View>

        <View style={styles.listContainer}>
            <Text style={styles.listText}>Digital Detox</Text>
            <Text style={styles.listText2}>Limit social media use to reduce stress and negativity.</Text>
        </View>



        </ScrollView>
        
        </View>
    </ImageBackground>
  )
}

export default goalsStress

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
      height: 150,
      alignSelf: 'center',
      marginTop: 15,
      backgroundColor: '#FFEEBB',
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
    top: '10%',
    left: '5%',
    fontSize: 32,
    marginBottom: 2,
  },
  listText2: {
    color: '#222831',
    position: 'absolute',
    top: '50%',
    left: '5%',
    fontSize: 18,
    fontWeight: '500',
  },
})