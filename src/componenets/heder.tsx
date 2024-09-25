// CustomHeader.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg'; // Import SVG components
import BegSvg from '../assets/svgs/begSvg';
import SearchSvg from '../assets/svgs/searchSvg';

const Header = ({ title, onBackPress, onSearchPress, onBellPress }: any) => {
    return (
        <View style={styles.headerContainer}>
            {onBackPress ? (
                <TouchableOpacity onPress={onBackPress} style={styles.iconButton}>
                    <Svg width="24" height="24" viewBox="0 0 24 24">
                        <Path d="M15.09 5.41L13.68 4l-9 9 9 9 1.41-1.41L7.83 12z" fill="black" />
                    </Svg>
                </TouchableOpacity>
            ) : (
                <Image
                    source={require('../assets/images/homepage.png')}
                    style={{ width: 200, height: '100%' }}
                    resizeMode="cover"
                />
            )}

            <Text style={styles.title}>{title}</Text>

            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={onSearchPress} style={styles.iconButton}>
                    <SearchSvg fill='gray' height={24} width={24} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onBellPress} style={styles.iconButton}>
                    <View style={styles.number}>
                        <Text style={styles.numberText}>1</Text>
                    </View>
                    <BegSvg height={24} width={24} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 4,
        height: 50,
    },
    title: {
        fontSize: 18,
        flex: 1,
        textAlign: 'center',
        color: 'gray'
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        padding: 10,
    },
    number: {
        height: 20,
        width: 20,
        borderRadius: 50,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 4,
    },
    numberText: {
        color: '#fff',
        fontSize: 12,
    }
});

export default Header;
