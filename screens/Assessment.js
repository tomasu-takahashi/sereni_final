import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
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
      
        <View style={styles.container}>

                <View>
                    <ImageBackground
                        style={{
                            height: "86%",
                            width: "100%",
                            elevation: 5,
                            shadowColor: 'black',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.5,
                            shadowRadius: 10,
                        }}
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
            
              </View>
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
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  ButtonContainer: {
    position: 'absolute',
    bottom: 185,
    width: '90%',
    height: '70%',
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#C7F6FF',
    borderRadius: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  ButtonContainer2: {
    position: 'absolute',
    bottom: 100,
    width: '90%',
    height: '70%',
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#B9EDDD',
    borderRadius: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  ButtonContainer3: {
    position: 'absolute',
    bottom: 15,
    width: '90%',
    height: '70%',
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
    position: 'absolute',
    top: 390,
    justifyContent: 'center',
    margin: 20,
    color: '#222831',
    fontSize: 38,
    paddingTop: 10,
    fontWeight: '600'
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    flexDirection: 'row',
    alignSelf: "flex-end",
    position: 'absolute',
    bottom: 23,
    right: 5
  },
  buttonText: {
    color: '#222831',
    fontSize: 24,
    alignSelf: "flex-start",
    fontWeight: '600',
    paddingRight: 2
  },
  text1: {
    position: 'absolute',
    bottom: 10,
    left: 11, 
    color: '#222831',
    fontSize: 16, 
  },
  text2: {
    position: 'absolute',
    bottom: 10,
    left: 11, 
    color: '#222831',
    fontSize: 16,
  },
});

export default Assessment;