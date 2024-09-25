import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Title = ({ title }) => {
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    titleContainer: {
        padding: 16,
        // backgroundColor: '#468CB4', // Customize the background color
        justifyContent: 'center',
        // alignItems: 'center',
        // elevation: 4, // Shadow for Android
        // shadowColor: '#5b5d53', // Shadow for iOS
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.3,
        // shadowRadius: 4,
    },
    titleText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#5b5d53', // Customize the text color
    },
});

export default Title;
