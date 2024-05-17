import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Pressable } from 'react-native';

const BottomSheet = ({ setStatus }) => {
    const slide = React.useRef(new Animated.Value(300)).current;
    const navigation = useNavigation();

    const slideUp = () => {
        Animated.timing(slide, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
        }).start();
    };

    const slideDown = () => {
        Animated.timing(slide, {
            toValue: 300,
            duration: 1500,
            useNativeDriver: true,
        }).start();
    };

    React.useEffect(() => {
        slideUp();
    }, []);

    const handleNavigateToTabAssessment = () => {
        navigation.navigate('Assessment');
    };

    const closeModal = () => {
        slideDown();

        setTimeout(() => {
            setStatus(false);
        }, 800);
    };

    return (
        <Pressable onPress={closeModal} style={styles.backdrop}>
            <Animated.View style={[styles.bottomSheet, { transform: [{ translateY: slide }]}]}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>assessment</Text>
                <Text style={{ fontSize: 20 }}>asessement is...</Text>
                <TouchableOpacity style={styles.TakeSurveyButton} onPress={handleNavigateToTabAssessment}>
                    <Text style={styles.buttonText}>Take Test</Text>
                </TouchableOpacity>
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        flex: 1,
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    },
    bottomSheet: {
        width: '100%',
        height: '80%',
        backgroundColor: 'white',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    TakeSurveyButton: {
        backgroundColor: '#90C8AC',
        padding: 15,
        width: '100%',
        paddingHorizontal: 120,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginTop: 10,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
});

export default BottomSheet;