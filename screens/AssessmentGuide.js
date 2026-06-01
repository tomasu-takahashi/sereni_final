import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const AssessmentGuide = ({ setStatus }) => {
    const navigation = useNavigation();
    const [buttonPressed, setButtonPressed] = useState(false);
    const [secondButtonPressed, setSecondButtonPressed] = useState(false);

    const handleNavigation = () => {
      navigation.navigate('AssessmentGuideQuestions');
    }

    const handleSecondNavigation = () => {
      setButtonPressed(true);
      setSecondButtonPressed(true);
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
                        style={styles.guideImage}
                        resizeMode="contain"
                        source={require("../assets/AssessmentGuide.png")}
                    />
                </View>
          <Text style={styles.AssessmentText}>Assessment Guide</Text>

            {!buttonPressed && (
                <>
                  <Text style={styles.text1}>Sereni will redirect you to a guide questions to identify what are you experiencing. Is it ANXIETY, DEPRESSION, or STRESS.</Text>
                  <Text style={styles.text2}>After identifying your result, Sereni will redirect you to another assessment, A assessment to identify what level are you experiencing</Text>
                </>
            )}
            <View style={styles.wrapper}>
                {buttonPressed ? (
                    <TouchableOpacity
                        style={styles.startButton}
                        onPress={() => handleNavigation()}>
                        <Text style={styles.buttonText}>Get Started</Text>
                        <AntDesign name="right" size={23} color="#00ADB5" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={styles.nextButton}
                        onPress={() => handleSecondNavigation()}
                        disabled={buttonPressed}>
                        <Text style={styles.buttonText}>Next</Text>
                        <AntDesign name="right" size={23} color="#00ADB5" />
                    </TouchableOpacity>
                )}
            </View>
            {secondButtonPressed && (
              <>
                <Text style={styles.text3}>DISCLAIMER:</Text>
                <Text style={styles.text4}>Sereni is a self-assessment tool and is not a substitute for professional advice, diagnosis, or treatment. Always see
                    your healthcare provider for any health concerns.</Text>
              </>
            )}
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
  guideImage: {
    height: "86%",
    width: "100%",
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  AssessmentText: {
    position: 'absolute',
    top: 390,
    justifyContent: 'center',
    margin: 20,
    color: '#222831',
    fontSize: 34,
    paddingTop: 10,
    fontWeight: '700'
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    position: 'relative',
    bottom: 20,
    left: 130,
    borderRadius: 7,
    flexDirection: 'row',
  },
  startButton: {
    position: 'relative',
    bottom: 20,
    left: 100,
    borderRadius: 7,
    flexDirection: 'row',
  },
  buttonText: {
    color: '#00ADB5',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
    paddingRight: 2
  },
  text1: {
    position: 'absolute',
    bottom: 220,
    color: '#222831',
    fontSize: 18,
    margin: 20
  },
  text2: {
    position: 'absolute',
    bottom: 120,
    color: '#222831',
    fontSize: 18,
    margin: 20
  },
  text3: {
    position: 'absolute',
    bottom: 280,
    color: '#222831',
    fontSize: 20,
    margin: 20,
    fontWeight: '600'
  },
  text4: {
    position: 'absolute',
    bottom: 160,
    color: '#222831',
    fontSize: 18,
    margin: 20
  },
});

export default AssessmentGuide;
