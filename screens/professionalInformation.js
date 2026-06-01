import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image, ScrollView } from 'react-native'
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
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>List of Professionals</Text>
          <ScrollView>

          <TouchableOpacity style={styles.listContainer} onPress={() => navigation.navigate('professional0')}>
            <Image style={styles.professionalImage} resizeMode="contain" source={require("../assets/professional3.png")} />
              <Text style={styles.listText}>Mark T. Ortibano</Text>
              <Text style={styles.listText2}>Psychologist</Text>
              {/* <Text style={styles.listText3}>UNO-R</Text> */}
            </TouchableOpacity>

            <TouchableOpacity style={styles.listContainer1} onPress={() => navigation.navigate('professional1')}>
            <Image style={styles.professionalImage} resizeMode="contain" source={require("../assets/professional2.png")} />
              <Text style={styles.listText}>Chris Feli Joy P. Tajonera</Text>
              <Text style={styles.listText2}>Guidance Director</Text>
              {/* <Text style={styles.listText3}>UNO-R</Text> */}
            </TouchableOpacity>

            <TouchableOpacity style={styles.listContainer} onPress={() => navigation.navigate('professional2')}>
            <Image style={styles.professionalImage} resizeMode="contain" source={require("../assets/professional6.png")} />
              <Text style={styles.listText}>Mark Jasson F. Garcelan</Text>
              <Text style={styles.listText2}>Guidance Counselor</Text>
              {/* <Text style={styles.listText3}>UNO-R</Text> */}
            </TouchableOpacity>

            <TouchableOpacity style={styles.listContainer1} onPress={() => navigation.navigate('professional3')}>
            <Image style={styles.professionalImage} resizeMode="contain" source={require("../assets/professional2.png")} />
              <Text style={styles.listText}>Madeline Urpiana</Text>
              <Text style={styles.listText2}>Guidance Counselor</Text>
              {/* <Text style={styles.listText3}>UNO-R</Text> */}
            </TouchableOpacity>

            <TouchableOpacity style={styles.listContainer} onPress={() => navigation.navigate('professional4')}>
            <Image style={styles.professionalImage} resizeMode="contain" source={require("../assets/professional1.png")} />
              <Text style={styles.listText}>Rey Mark Maalihan</Text>
              <Text style={styles.listText2}>Guidance Staff/Associate</Text>
              {/* <Text style={styles.listText3}>UNO-R</Text> */}
            </TouchableOpacity>

            <TouchableOpacity style={styles.listContainer1} onPress={() => navigation.navigate('professional5')}>
            <Image style={styles.professionalImage} resizeMode="contain" source={require("../assets/professional2.png")} />
              <Text style={styles.listText}>Brendly Ann Mateo</Text>
              <Text style={styles.listText2}>Guidance Counselor</Text>
              {/* <Text style={styles.listText3}>UNO-R</Text> */}
            </TouchableOpacity>

            <TouchableOpacity style={styles.listContainer1} onPress={() => navigation.navigate('professional6')}>
            <Image style={styles.professionalImage} resizeMode="contain" source={require("../assets/professional2.png")} />
              <Text style={styles.listText}>Leni Rose Julag-ay</Text>
              <Text style={styles.listText2}>Guidance Counselor</Text>
              {/* <Text style={styles.listText3}>UNO-R</Text> */}
            </TouchableOpacity>

            <TouchableOpacity style={styles.listContainer1} onPress={() => navigation.navigate('professional7')}>
            <Image style={styles.professionalImage} resizeMode="contain" source={require("../assets/professional2.png")} />
              <Text style={styles.listText}>Trisha Marie Vergara</Text>
              <Text style={styles.listText2}>Guidance Counselor</Text>
              {/* <Text style={styles.listText3}>UNO-R</Text> */}
            </TouchableOpacity>

            <TouchableOpacity style={styles.listContainer} onPress={() => navigation.navigate('professional8')}>
            <Image style={styles.professionalImage} resizeMode="contain" source={require("../assets/professional6.png")} />
              <Text style={styles.listText}>Lino Sumbillo Jr.</Text>
              <Text style={styles.listText2}>Guidance Counselor</Text>
              {/* <Text style={styles.listText3}>UNO-R</Text> */}
            </TouchableOpacity>

            <TouchableOpacity style={styles.listContainer1} onPress={() => navigation.navigate('professional9')}>
            <Image style={styles.professionalImage} resizeMode="contain" source={require("../assets/professional4.png")} />
              <Text style={styles.listText}>Christina Marie Ferraris</Text>
              <Text style={styles.listText2}>Guidance Staff/Associate</Text>
              {/* <Text style={styles.listText3}>UNO-R</Text> */}
            </TouchableOpacity>

            <TouchableOpacity style={styles.listContainer} onPress={() => navigation.navigate('professional10')}>
            <Image style={styles.professionalImage} resizeMode="contain" source={require("../assets/professional7.png")} />
              <Text style={styles.listText}>Emmanuel Jaype</Text>
              <Text style={styles.listText2}>Guidance Staff/Associate</Text>
              {/* <Text style={styles.listText3}>UNO-R</Text> */}
            </TouchableOpacity>

            <TouchableOpacity style={styles.listContainer} onPress={() => navigation.navigate('professional11')}>
            <Image style={styles.professionalImage} resizeMode="contain" source={require("../assets/professional5.png")} />
              <Text style={styles.listText}>Lorence Macahilig</Text>
              <Text style={styles.listText2}>Guidance Staff/Associate</Text>
              {/* <Text style={styles.listText3}>UNO-R</Text> */}
            </TouchableOpacity>

            <TouchableOpacity style={styles.listContainer} onPress={() => navigation.navigate('professional12')}>
            <Image style={styles.professionalImage} resizeMode="contain" source={require("../assets/professional5.png")} />
              <Text style={styles.listText}>Jilean Mark Tan</Text>
              <Text style={styles.listText2}>Guidance Staff/Associate</Text>
              {/* <Text style={styles.listText3}>UNO-R</Text> */}
            </TouchableOpacity>

            <TouchableOpacity style={styles.listContainer1} onPress={() => navigation.navigate('professional13')}>
            <Image style={styles.professionalImage} resizeMode="contain" source={require("../assets/professional4.png")} />
              <Text style={styles.listText}>Krishaline Francisco</Text>
              <Text style={styles.listText2}>Guidance Staff/Associate</Text>
              {/* <Text style={styles.listText3}>UNO-R</Text> */}
            </TouchableOpacity>

            <TouchableOpacity style={styles.listContainer} onPress={() => navigation.navigate('professional14')}>
            <Image style={styles.professionalImage} resizeMode="contain" source={require("../assets/professional1.png")} />
              <Text style={styles.listText}>Carlos Gabriel Castro</Text>
              <Text style={styles.listText2}>Guidance Staff/Associate</Text>
              {/* <Text style={styles.listText3}>UNO-R</Text> */}
            </TouchableOpacity>

          </ScrollView>
        </ScrollView>
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
        flexGrow: 1,
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
      minHeight: 120,
      alignSelf: 'center',
      marginBottom: 20,
      backgroundColor: '#C7F6FF',
      borderRadius: 10,
      padding: 10,
      elevation: 5,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
  },
  listContainer1: {
      width: '100%',
      minHeight: 120,
      alignSelf: 'center',
      marginBottom: 20,
      backgroundColor: '#ffdbd6',
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
    fontSize: 23,
    marginBottom: 2,
  },
  listText2: {
    color: '#222831',
    fontSize: 17,
    fontWeight: '500',
  },
  listText3: {
    color: '#222831',
    fontSize: 18,
    fontWeight: '500',
  },
  professionalImage: {
    width: 96,
    height: 96,
    marginBottom: 10,
  },
})
