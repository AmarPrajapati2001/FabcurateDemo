import React from 'react';
import { Text, Image, Animated, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const screenWidth = Dimensions.get('window').width;

const UnstitchedItem = ({ item, index, scrollX }) => {
    // Create an input range for the animation based on the index
    const inputRange = [
        (index - 1) * (screenWidth * 0.7),
        index * (screenWidth * 0.7),
        (index + 1) * (screenWidth * 0.7)
    ];

    // Interpolating scale for the scaling animation
    const scale = scrollX.interpolate({
        inputRange,
        outputRange: [0.8, 1.1, 0.8],
        extrapolate: 'clamp',
    });

    return (
        <Animated.View style={[styles.unstitchedItem, { transform: [{ scale }] }]}>
            <Image
                source={{ uri: item.image }}
                style={[styles.image, { height: '100%' }]}
                resizeMode="cover"
            />
            <LinearGradient
                colors={['transparent', 'rgba(0, 0, 0, 0.8)', 'black']} // Gradient effect
                style={styles.gradientUnstitched}
            >
                <Text style={styles.titleUnstitched}>{item.name.toUpperCase()}</Text>
                <Text style={styles.descriptionUnstitched} numberOfLines={2}>{item.description.toUpperCase()}</Text>
            </LinearGradient>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    unstitchedItem: {
        width: screenWidth / 1.32,
        // marginHorizontal: 4,
        height: 350,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 4,
        marginHorizontal: -10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    image: {
        width: '100%', // Full width of the container
        height: '75%', // Image takes up 75% of the container height
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    gradientUnstitched: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        justifyContent: 'center',
        height: 100,
    },
    titleUnstitched: {
        fontSize: 22,
        color: '#fff',
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    descriptionUnstitched: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '500',
        alignSelf: 'center',
        width: '80%',
        textAlign: 'center',
    },
});

export default UnstitchedItem;
