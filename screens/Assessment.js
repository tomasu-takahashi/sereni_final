import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


const Assessment = ({ setStatus }) => {
    const navigation = useNavigation();
    const [buttonPressed, setButtonPressed] = useState(false);

    const handleNavigation = () => {
      navigation.navigate('AssessmentGuide');
    }

    const handleSecondNavigation = () => {
      navigation.navigate('AssessmentHistory')
    }

    const handleThirdNavigation = () => {
      navigation.navigate('professionalInformation')
    }

    return (

      <ImageBackground
      style={styles.backgroundImage}
      resizeMode="cover"
      source={require("../assets/bgMain.jpg")}
      >
      
        <ScrollView contentContainerStyle={styles.container}>

                <View style={styles.imageWrap}>
                    <ImageBackground
                        style={styles.assessmentImage}
                        resizeMode="contain"
                        source={require("../assets/AssessmentGuide.png")}
                    />
                </View>
          <Text style={styles.AssessmentText}>Assessment</Text>

            <View style={styles.wrapper}> 
                    <TouchableOpacity
                        style={styles.ButtonContainer}
                        onPress={() => handleNavigation()}>
                        <Text style={styles.buttonText}>Take Assessment</Text>
                        <Text style={styles.text1}>Start your assessment</Text>
                        <View style={styles.arrow}>
                        <AntDesign name="right" size={23} color="#222831" />
                        </View>
                    </TouchableOpacity>
  
                    <TouchableOpacity
                        style={styles.ButtonContainer2}
                        onPress={() => handleSecondNavigation()}
                        disabled={buttonPressed}>
                        <Text style={styles.buttonText}>Assessment History</Text>
                        <Text style={styles.text2}>View history of your assessment</Text>
                        <View style={styles.arrow}>
                        <AntDesign name="right" size={23} color="#222831" />
                        </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        style={styles.ButtonContainer3}
                        onPress={() => handleThirdNavigation()}
                        disabled={buttonPressed}>
                        <Text style={styles.buttonText}>Seek Professional help</Text>
                        <Text style={styles.text2}>Information for Professionals</Text>
                        <View style={styles.arrow}>
                        <AntDesign name="right" size={23} color="#222831" />
                        </View>
                    </TouchableOpacity>
            </View>
            
              </ScrollView>
      </ImageBackground>
    );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flexGrow: 1,
    alignSelf: 'center',
    width: '100%',
    borderRadius: 10,
    paddingTop: 16,
    paddingBottom: 24,
  },
  imageWrap: {
    width: '100%',
    alignItems: 'center',
  },
  assessmentImage: {
    aspectRatio: 1.25,
    width: '100%',
    height: 'auto',
    elevation: 5,
  },
  ButtonContainer: {
    width: '90%',
    minHeight: 82,
    alignSelf: 'center',
    padding: 10,
    marginBottom: 12,
    backgroundColor: '#C7F6FF',
    borderRadius: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  ButtonContainer2: {
    width: '90%',
    minHeight: 82,
    alignSelf: 'center',
    padding: 10,
    marginBottom: 12,
    backgroundColor: '#B9EDDD',
    borderRadius: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  ButtonContainer3: {
    width: '90%',
    minHeight: 82,
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#FFEEBB',
    borderRadius: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  AssessmentText: { 
    margin: 20,
    color: '#222831',
    fontSize: 38,
    paddingTop: 10,
    fontWeight: '600'
  },
  wrapper: {
    alignItems: 'center',
    width: '100%',
  },
  arrow: {
    flexDirection: 'row',
    alignSelf: "flex-end",
    marginTop: 'auto',
  },
  buttonText: {
    color: '#222831',
    fontSize: 24,
    alignSelf: "flex-start",
    fontWeight: '600',
    paddingRight: 2
  },
  text1: {
    color: '#222831',
    fontSize: 16, 
    marginTop: 8,
  },
  text2: {
    color: '#222831',
    fontSize: 16,
    marginTop: 8,
  },
});

export default Assessment;
