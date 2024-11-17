import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const goalsDepression = () => {

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
        <Text style={styles.title}>Depression Goals</Text>
        
        
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

        <View style={styles.listContainer}>
            <Text style={styles.listText}>Doing Yoga</Text>
            <Text style={styles.listText2}>Yoga combines physical postures, breathing exercises, and meditation to promote relaxation, flexibility, and mental clarity. It helps reduce stress and improve overall well-being.</Text>
        </View>

        <View style={styles.listContainer}>
            <Text style={styles.listText}>Meditating</Text>
            <Text style={styles.listText2}>Meditation involves focusing the mind and eliminating distractions to achieve a state of calm and heightened awareness. It can reduce anxiety, improve concentration, and enhance emotional health.</Text>
        </View>

        <View style={styles.listContainer}>
            <Text style={styles.listText}>Journaling</Text>
            <Text style={styles.listText2}>Writing down thoughts and feelings in a journal can help process emotions, identify patterns, and gain insights into personal experiences. It’s a therapeutic way to manage stress and reflect on one’s life.</Text>
        </View>

        <View style={styles.listContainer}>
            <Text style={styles.listText}>Resting</Text>
            <Text style={styles.listText2}>Taking time to rest and relax is crucial for physical and mental recovery. It helps restore energy, improve mood, and enhance cognitive function.</Text>
        </View>

        <View style={styles.listContainer}>
            <Text style={styles.listText}>Creating Art</Text>
            <Text style={styles.listText2}>Engaging in artistic activities like drawing, painting, or crafting allows for self-expression and creativity. It can be a powerful outlet for emotions and a way to reduce stress.</Text>
        </View>

        <View style={styles.listContainer}>
            <Text style={styles.listText}>Spending Time with Loved Ones</Text>
            <Text style={styles.listText2}>Social connections and spending quality time with family and friends provide emotional support, reduce feelings of loneliness, and enhance overall happiness.</Text>
        </View>

        <View style={styles.listContainer}>
            <Text style={styles.listText}>Spending Time in Nature</Text>
            <Text style={styles.listText2}>Being outdoors and connecting with nature can improve mood, reduce stress, and promote a sense of peace and well-being. It encourages physical activity and mindfulness.</Text>
        </View>



        </ScrollView>
        
        </View>
    </ImageBackground>
  )
}

export default goalsDepression

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
      height: 250,
      alignSelf: 'center',
      marginTop: 15,
      backgroundColor: '#B9EDDD',
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