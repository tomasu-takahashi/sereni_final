import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const goalsAnxiety = () => {

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
        <Text style={styles.title}>Anxiety Goals</Text>
        
        
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

        <View style={styles.listContainer}>
            <Text style={styles.listText}>5-4-3-2-1 Technique</Text>
            <Text style={styles.listText2}>Name 5 things you can see. Name 4 things you can feel. Name 3 things you can hear. Name 2 things you can smell. Name 1 thing you can taste.</Text>
        </View>

        <View style={styles.listContainer}>
            <Text style={styles.listText}>3-3-3 Rule</Text>
            <Text style={styles.listText2}>Look around and name 3 things you can see. Listen to identify 3 sounds you can hear. Move 3 parts of your body.</Text>
        </View>

        <View style={styles.listContainer}>
            <Text style={styles.listText}>Journaling</Text>
            <Text style={styles.listText2}>Reduces anxiety and stress. Helps make anxious thoughts more manageable.</Text>
        </View>

        <View style={styles.listContainer}>
            <Text style={styles.listText}>Thought Exercises</Text>
            <Text style={styles.listText2}>Picture a relaxing scene. Use defusion techniques (e.g., repeating thoughts in a silly voice)</Text>
        </View>

        <View style={styles.listContainer}>
            <Text style={styles.listText}>Meditation</Text>
            <Text style={styles.listText2}>Practice mindfulness or meditation. Try guided sessions using online videos or apps.</Text>
        </View>

        <View style={styles.listContainer}>
            <Text style={styles.listText}>Distraction</Text>
            <Text style={styles.listText2}>Watch TV, read a book, or go out with a friend. Use humor to distract from anxious thoughts.</Text>
        </View>

        </ScrollView>
        
        </View>
    </ImageBackground>
  )
}

export default goalsAnxiety

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
      height: 180,
      alignSelf: 'center',
      marginTop: 15,
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