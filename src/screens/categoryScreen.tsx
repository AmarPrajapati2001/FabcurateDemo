import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, SafeAreaView, ImageBackground } from 'react-native';
import axios from 'axios';
import Header from '../componenets/heder';
import DownArrowIcon from '../assets/svgs/downArrowIcon';

const CategoryScreen = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleBackPress = () => {
        navigation.goBack();
    };

    const fetchData = async () => {
        try {
            const response = await axios.get('https://app-interview.easyglue.in/category_repository.json');
            setData(response.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error.response ? error.response.data : error.message);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    console.log("*****data", data);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text>Error: {error.message}</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Categories" onBackPress={handleBackPress} />
            <FlatList
                data={data?.categories}
                keyExtractor={(item) => item?.category_id}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <ImageBackground source={{ uri: 'https://www.91-cdn.com/hub/wp-content/uploads/2022/07/Top-laptop-brands-in-India.jpg' }} style={styles.categoryImage}>
                            <View style={styles.blurOverlay}>
                                <Text style={styles.categoryName}>{item.category_name}</Text>
                            </View>
                            <View style={{ alignSelf: 'flex-end', height: '100%', justifyContent: 'center' }}>
                                <DownArrowIcon style={styles.arrowIcon} />
                            </View>
                        </ImageBackground>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    item: {
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemContainer: {
        height: 150,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 1,
    },
    categoryName: {
        fontSize: 18,
        color: '#000',
        marginLeft: 10,
    },
    imageContainer: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryImage: {
        width: '100%',
        height: '100%',
    },
    blurOverlay: {
        position: 'absolute',
        width: '60%',
        height: 250,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        justifyContent: 'center',
        top: -50,
        bottom: -50,
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderEndEndRadius: 140,
        borderTopEndRadius: 140,
    },
    arrowIcon: {
        marginRight: 10
    }
});

export default CategoryScreen;
