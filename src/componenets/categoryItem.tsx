import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;

const CategoryItem = ({ imageUri, name }) => {
    return (
        <View style={styles.categoryItem}>
            <ImageBackground source={{ uri: imageUri }} style={styles.categoryImage}>
                {/* Overlay for white blur effect */}
                <View style={styles.blurOverlay}>
                    <Text style={styles.categoryText} numberOfLines={1}>{name.toUpperCase()}</Text>
                    <Text style={[styles.categoryText, { fontSize: 10 }]}>+EXPLORE</Text>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    categoryItem: {
        height: 150,
        width: screenWidth / 3.3, // Adjust as necessary
        margin: 6,
        overflow: 'hidden',
    },
    categoryImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        borderRadius: 10, // Ensure image has rounded corners
    },
    blurOverlay: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '35%', // Set height to 20% of the view
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // White with opacity for blur effect
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 8
        // alignItems: 'center',
    },
    categoryText: {
        color: 'gray',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default CategoryItem;
