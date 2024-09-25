import React, { useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { COLORS } from '../constants/colors';
import { NAVIGATION } from '../constants/navigation';

const SplashScreen = ({ navigation }: any) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.replace(NAVIGATION.BOTTOMTABNAVIGATOR);
        }, 3000);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Splash Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.black
    },
    text: {
        fontSize: 26,
        fontWeight: '800',
        color: COLORS.white,
    },
});

export default SplashScreen;
