import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const professional7 = () => {
    const navigation = useNavigation();
    return (
        <ImageBackground source={require('../assets/bgMain.jpg')} style={styles.backgroundImage}>
        <View style={styles.topHeader}>
                <TouchableOpacity style={styles.backButtonStyle} onPress={() => navigation.navigate('professionalInformation')}>
                    <AntDesign name="left" size={21} color="#222831" />
                    <Text style={{ fontSize: 18, color: '#222831', fontWeight: '600', paddingRight: 5 }}>Back</Text>
                </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.container}>
        
            <ImageBackground
                style={{
                  aspectRatio: 1.4,
                  width: '100%',
                  elevation: 5,
                  shadowColor: 'black',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 3,
                }}
              resizeMode="contain"
              source={require("../assets/professional2.png")}
            />
            <Text style={styles.title}>Trisha Marie Vergara</Text>
          
              <Text style={styles.Text}>RPm, RGC, MA Guidance & Counseling</Text>
              <Text style={styles.Text2}>Guidance Counselor</Text>
              <Text style={styles.Text3}>Clinics:</Text>
              <Text style={styles.Text4}>UNO-R College SDPC</Text>
              <Text style={styles.Text5}>UNO-R, #51 Lizares Ave. Bacolod City, Negros Occidental, 6100</Text>
              {/* <Text style={styles.Text6}>0910-258-2297 or 0930-169-9331</Text>
              <Text style={styles.Text7}>CityMD Specialists Clinic</Text>
              <Text style={styles.Text8}>Central City Walk Robinsons-Mandalagan, Bacolod City, Negros Occidental</Text>
              <Text style={styles.Text9}>0906-489-3160</Text> */}
            
        </ScrollView>
        </ImageBackground>
      );
}

export default professional7

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
    Text: {
        color: '#222831',
        fontSize: 18,
        marginBottom: 2,
        fontWeight: '600'
    },
    Text2: {
        color: '#222831',
        fontSize: 18,
        fontWeight: '500',
    },
    Text3: {
        color: '#222831',
        fontSize: 26,
        marginBottom: 2,
        fontWeight: '600'
    },
    Text4: {
        color: '#222831',
        fontSize: 20,
        marginBottom: 2,
        fontWeight: '600'
    },
    Text5: {
        color: '#222831',
        fontSize: 14,
        marginBottom: 2,
        fontWeight: '400'
    },
    Text6: {
        color: '#222831',
        fontSize: 14,
        marginBottom: 2,
        fontWeight: '400'
    },
    Text7: {
        color: '#222831',
        fontSize: 20,
        marginBottom: 2,
        fontWeight: '600'
    },
    Text8: {
        color: '#222831',
        fontSize: 14,
        marginBottom: 2,
        fontWeight: '400'
    },
    Text9: {
        color: '#222831',
        fontSize: 14,
        marginBottom: 2,
        fontWeight: '400'
    },
})