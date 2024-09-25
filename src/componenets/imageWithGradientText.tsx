import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const screenWidth = Dimensions.get('window').width;

const ImageWithGradientText = ({ imageUri, text }: { imageUri: string, text: string }) => {
    return (
        <View style={styles.fabricItem}>
            <ImageBackground source={{ uri: imageUri }} style={styles.fabricItem}>
                <LinearGradient
                    colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
                    style={styles.gradientOverlay}
                >
                    <Text style={styles.fabricName}>{text.toUpperCase()}</Text>
                </LinearGradient>
            </ImageBackground>
        </View>
    )

};

const styles = StyleSheet.create({
    fabricItem: {
        height: 120,
        width: screenWidth / 3.1,
        borderRadius: 60,
        margin: 2,
        overflow: 'hidden',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    categoryImage: {
        width: '100%',
        height: '100%',
        borderRadius: 60, // Ensure the image also has rounded corners
    },
    gradientOverlay: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '50%', // Adjust height for how much gradient you want
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    blurOverlay: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '35%', // Set height to 20% of the view
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // White with opacity for blur effect
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    fabricName: {
        color: '#FFF',
        marginBottom: 12,
        fontSize: 16,
        fontWeight: '700',
        maxWidth: '60%',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
});

export default ImageWithGradientText;
