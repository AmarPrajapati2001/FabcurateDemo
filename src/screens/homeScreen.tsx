import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, SafeAreaView, Image, ImageBackground, Dimensions, Animated, ScrollView } from 'react-native';
import axios from 'axios';
import Header from '../componenets/heder';
import Title from '../componenets/title';
import LinearGradient from 'react-native-linear-gradient';
import ImageWithGradientText from '../componenets/imageWithGradientText';
import CategoryItem from '../componenets/categoryItem';
import SwiperFlatList from 'react-native-swiper-flatlist';
import UnstitchedItem from '../componenets/unstitchedItem';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = () => {
    const [data, setData] = useState({
        loading: true,
        top: [],
        middle: [],
        bottom: []
    });
    const [error, setError] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);
    const scrollX = useRef(new Animated.Value(0)).current;

    const onViewRef = useRef((viewableItems) => {
        const index = viewableItems.viewableItems[0]?.index;
        setCurrentIndex(index);
    });

    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

    const combinedData = [
        { title: 'Top Menu', data: data?.top },
        { title: 'Slider', data: data?.top[0]?.slider_images || [] },
        { title: 'Shop By Category', data: data?.middle?.shop_by_category || [] },
        { title: 'Shop By Fabric Material', data: data?.middle?.shop_by_fabric || [] },
        { title: 'Unstitched', data: data?.middle?.Unstitched || [] },
        { title: 'Boutique Collection', data: data?.middle?.boutique_collection || [] },
        { title: 'Range of Pattern', data: data?.bottom?.range_of_pattern.slice(0, 6) || [] },
        { title: 'Design As Per Occasion', data: data?.bottom?.design_occasion || [] },
    ];


    const fetchData = async () => {
        try {
            const [menuResponse, patternResponse, occasionResponse] = await Promise.all([
                axios.get('https://app-interview.easyglue.in/top_repository.json'),
                axios.get('https://app-interview.easyglue.in/middle_repository.json'),
                axios.get('https://app-interview.easyglue.in/bottom_repository.json'),
            ]);

            setData({
                loading: false,
                top: menuResponse.data.main_sticky_menu,
                middle: patternResponse.data,
                bottom: occasionResponse.data,
            });

        } catch (error) {
            setError(true);
            setData({ ...data, loading: false });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderSliderItem = ({ item, index }: { item: { image: string, title: string }, index: number }) => {
        const isCurrent = index === currentIndex;
        const scaleStyle = isCurrent ? { transform: [{ scale: 1.2 }] } : { transform: [{ scale: 1 }] };

        return (
            <Animated.View style={[styles.sliderItemContainer, scaleStyle]}>
                <ImageBackground
                    source={{ uri: item.image }}
                    style={styles.imageBackground}
                    imageStyle={styles.imageStyle}
                    resizeMode="stretch"
                >
                    <View style={styles.textContainer}>
                        <Text style={styles.sliderTitle}>{item.title.toUpperCase()}</Text>
                        <Text style={[styles.sliderTitle, { marginTop: 8 }]}>PLANTS STARTING AT JUST $79/-</Text>
                        <Text style={[styles.sliderTitle, { fontSize: 10, marginTop: 4 }]}>+EXPLORE</Text>
                    </View>
                </ImageBackground>
            </Animated.View>
        );
    };

    const renderMenuItem = ({ item }: { item: { image: string, title: string } }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        </View>
    );

    const renderShopByCategory = ({ item }: { item: { image: string, name: string } }) => (
        <CategoryItem
            imageUri={item.image}
            name={item.name} />
    );

    if (data.loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorMessage}>{error}</Text>
            </View>
        );
    }

    const renderShopByFabricMaterial = ({ item }: { item: { image: string, name: string } }) => (
        <ImageWithGradientText
            imageUri={item.image}
            text={item.name}
        />
    );

    const renderOccasion = ({ item }: { item: { image: string, name: string } }) => (
        <CategoryItem
            imageUri={item.image}
            name={item.name} />
    );

    return (
        <SafeAreaView style={styles.container} >
            <Header />
            <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                    data={data.top}
                    keyExtractor={(item) => item.title}
                    renderItem={renderMenuItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.flatList}
                />
                <Animated.FlatList
                    ref={flatListRef}
                    data={data.top[0]?.slider_images}
                    keyExtractor={(item) => item.title}
                    renderItem={renderSliderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    snapToAlignment="center"
                    snapToInterval={screenWidth / 1.2 + 14}
                    decelerationRate="fast"
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false }
                    )}
                    onViewableItemsChanged={onViewRef.current}
                    viewabilityConfig={viewConfigRef.current}
                    contentContainerStyle={styles.sliderList}
                />
                <Title title="Shop By Category" />
                <FlatList
                    data={data?.middle?.shop_by_category}
                    keyExtractor={(item) => item.category_id}
                    renderItem={renderShopByCategory}
                    numColumns={3}
                    showsHorizontalScrollIndicator={false}
                />
                <Title title="Shop By Fabric Material" />
                <FlatList
                    data={data?.middle?.shop_by_fabric}
                    keyExtractor={(item) => item.fabric_id}
                    renderItem={renderShopByFabricMaterial}
                    numColumns={3}
                    showsHorizontalScrollIndicator={false}
                />
                <Title title="Unstitched" />
                <Animated.FlatList
                    data={data?.middle?.Unstitched}
                    renderItem={({ item, index }) => <UnstitchedItem item={item} index={index} scrollX={scrollX} />}
                    keyExtractor={item => item.range_id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    snapToAlignment="center"
                    snapToInterval={screenWidth * 0.7}
                    decelerationRate="fast"
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
                    style={styles.flatList}
                />
                <View >
                    <Title title="Boutique Collection" />
                    <SwiperFlatList
                        autoplay
                        autoplayDelay={3}
                        autoplayLoop
                        showPagination
                        keyExtractor={item => item?.name}
                        paginationStyle={styles.paginationStyle}
                        paginationStyleItem={styles.paginationStyleItem}
                        style={{ height: 500 }}
                        paginationActiveColor="#000"
                        paginationDefaultColor="#ccc"
                        data={data?.middle?.boutique_collection}
                        renderItem={({ item }) => (
                            <ImageBackground
                                source={{ uri: item?.banner_image }}
                                style={styles.imageBackgroundCollection}
                            >
                                <LinearGradient
                                    colors={['transparent', 'black']}
                                    style={styles.gradient}
                                >
                                    <Text style={styles.itemText}>{item?.name.toUpperCase()}</Text>
                                    <Text style={styles.explore}>+EXPLORE</Text>
                                </LinearGradient>
                            </ImageBackground>
                        )}
                    />
                </View>
                <Title title="Range of Pattern" />
                <FlatList
                    data={data?.bottom?.range_of_pattern.slice(0, 6)}
                    keyExtractor={(item) => item.product_id}
                    renderItem={renderShopByFabricMaterial}
                    numColumns={3}
                    showsHorizontalScrollIndicator={false}
                />
                <Title title="Design As Per Occasion" />
                <FlatList
                    data={data?.bottom?.design_occasion}
                    keyExtractor={(item) => item.product_id}
                    renderItem={renderOccasion}
                    numColumns={3}
                    showsHorizontalScrollIndicator={false}
                />
            </ScrollView>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    sliderList: {
        marginLeft: 20,
        marginTop: 30,
        alignSelf: 'center',
        margin: 10,
        paddingLeft: 8
    },
    sliderItemContainer: {
        width: screenWidth / 1.2,
        height: 250,
        justifyContent: 'center',
        marginHorizontal: 4,
        borderRadius: 20,
        overflow: 'hidden',
    },
    imageBackground: {
        height: '96%',
        width: '96%',
        justifyContent: 'flex-end',
        borderRadius: 12,
        overflow: 'hidden',
    },
    imageStyle: {
        borderRadius: 12,
    },
    textContainer: {
        backgroundColor: '#fff',
        padding: 10,
        width: '75%',
        marginBottom: 20,
        marginLeft: -10,
        alignSelf: 'center'
    },
    sliderTitle: {
        fontSize: 12,
        color: 'gray',
    },
    flatList: {
        paddingVertical: 6,
        marginLeft: 6,
    },
    itemContainer: {
        width: screenWidth / 2.8,
        marginHorizontal: 4,
        height: 90,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 4,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    unstitchedItem: {
        width: screenWidth / 1.32,
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
        width: '100%',
        height: '75%',
        marginBottom: 4,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    title: {
        fontSize: 14,
        textAlign: 'center',
        color: 'gray',
        marginHorizontal: 4,
    },
    categoryItem: {
        height: 150,
        width: screenWidth / 2.8,
        backgroundColor: 'red',
        margin: 6,
    },
    categoryImage: {
        width: '100%',
        height: '100%',
        marginBottom: 4,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    blurOverlay: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '35%',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 8
    },
    categoryText: {
        color: 'gray',
        fontWeight: 'bold',
        fontSize: 14,
    },
    fabricItem: {
        height: 120,
        width: 120,
        borderRadius: 60,
        margin: 2,
        overflow: 'hidden',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    fabricName: {
        color: '#FFF',
        marginBottom: 12,
        fontSize: 16,
        fontWeight: '700',
        maxWidth: '60%',
        textAlign: 'center',
    },
    gradientOverlay: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '50%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    imageBackgroundCollection: {
        height: 470,
        width: screenWidth,
        justifyContent: 'flex-end',
    },
    gradient: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        justifyContent: 'flex-end',
        height: 200
    },
    itemText: {
        fontSize: 22,
        color: '#fff', // White text color
        fontWeight: '700'
    },
    explore: {
        fontSize: 14,
        color: '#fff',
        marginTop: 10,
        fontWeight: '600'
    },
    paginationStyle: {
        marginTop: 10,
        alignSelf: 'center',
    },
    paginationStyleItem: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 3,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
    },
    errorMessage: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        margin: 20,
    },
});

export default HomeScreen;
