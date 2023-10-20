import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, ImageBackground } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const AssessmentStressRelationship = ({ navigation }) => {
    const [selectedButton, setSelectedButton] = useState({});

    useFocusEffect(
    React.useCallback(() => {
        setSelectedButton({});
        }, [])
    );

    const handleAnswerChange = (buttonValue, questionIndex) => {
        setSelectedButton({ ...selectedButton, [questionIndex]: buttonValue });
    };

    const handleSubmit = () => {
        // Calculate the total score
        let totalScore = 0;
        Object.values(selectedButton).forEach((answer) => {
        totalScore += answer;
        });

    let result = '';
    if (totalScore >= 0 && totalScore <= 35) {
        result = 'Low Stress';
    } else if (totalScore >= 36 && totalScore <= 55) {
        result = 'Moderate Stress';
    } else if (totalScore >= 56) {
        result = 'High Stress';
    }

    // Redirect to the AssessmentResult component and pass the result and totalScore as props
    navigation.navigate('AssessmentResultStressRelationship', { result, totalScore });
    };

    const questionText = [
        "I find it difficult to depend on others.",
        "I worry that I will be hurt if I allow myself to become too close to others.",
        "I am comfortable without close emotional relationships.",
        "I am not sure that I can always depend on others to be there when I need them.",
        "I worry about being alone.",
        "I often worry that romantic partners don’t really love me and won’t want to stay with me.",
        "I find it difficult to trust others completely.",
        "I worry about others getting too close to me.",
        "I worry that others don’t value me as much as I value them.",
        "People are never there when you need them.",
        "My desire to merge completely sometimes scares people away.",
        "I am nervous when anyone gets too close to me.",
        "I worry about being abandoned.",
    ];

    return (
        <ImageBackground source={require('../assets/bgMain.png')} style={styles.backgroundImage}>
        <Text style={styles.title}>Relationship Stress</Text>
        <ScrollView contentContainerStyle={styles.container}>
            {questionText.map((question, index) => (
            <View key={index} style={styles.questionContainer}>
                <Text style={styles.question}>
                {index + 1}. {question}
                </Text>
                <View style={styles.buttonContainer}>
                {[
                    { label: 'Not present', value: 1 },
                    { label: 'Mild', value: 2 },
                    { label: 'Moderate', value: 3 },
                    { label: 'Severe', value: 4 },
                    { label: 'Very Severe', value: 5 },
                ].map((answer, buttonIndex) => (
                    <TouchableOpacity
                    key={buttonIndex}
                    onPress={() => handleAnswerChange(answer.value, index + 1)}
                    style={[
                        styles.answerButton,
                        selectedButton[index + 1] === answer.value && styles.selectedAnswerButton,
                    ]}
                    >
                    <Text style={styles.answerText}>{answer.label}</Text>
                    </TouchableOpacity>
                ))}
                </View>
            </View>
            ))}
            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
        </ScrollView>
        </ImageBackground>
    );
}
;       
export default AssessmentStressRelationship;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 10,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 24,
        color: '#ededed',
        textAlign: 'center',
        backgroundColor: '#2C2B56',
        padding: 50,
        paddingBottom: 20,
    },
    questionContainer: {
        justifyContent: 'center',
        backgroundColor: 'rgba(21, 21, 21, 0.5)',
        padding: 20,
        borderRadius: 10,
        marginBottom: 15,
        elevation: 5,
        ...Platform.select({
            ios: {
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 3
            },
        }),
    },
    question: {
        fontSize: 18,
        marginBottom: 10,
        color: '#ededed',
    },
    buttonContainer: {
        justifyContent: 'center',
        flexDirection: 'column',
    },
    answerButton: {
        backgroundColor: '#444382',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        elevation: 5,
        ...Platform.select({
            ios: {
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 3
            },
        }),
    },
    selectedAnswerButton: {
        backgroundColor: '#655FF3', // Change the color of the selected button
    },
    answerText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#ededed',
    },
    submitButton: {
        backgroundColor: '#655FF3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 20,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        textAlign:'center'
    },
    });