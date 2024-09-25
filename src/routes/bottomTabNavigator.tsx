import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // For bottom tab navigator
import HomeScreen from '../screens/homeScreen';
import CategoryScreen from '../screens/categoryScreen';
import SaleScreen from '../screens/saleScreen';
import MoreScreen from '../screens/moreScreen';
import CurateScreen from '../screens/curateScreen';
import BegSvg from '../assets/svgs/begSvg';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#aec14d', // Color for the active (selected) tab
                tabBarInactiveTintColor: 'gray', // Color for inactive tabs
            }}>
            <Tab.Screen
                name="HOME"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <BegSvg fill={color} height={size} width={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="CATEGORY"
                component={CategoryScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <BegSvg fill={color} height={size} width={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="CURATE"
                component={CurateScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <BegSvg fill={color} height={size} width={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="SALE"
                component={SaleScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <BegSvg fill={color} height={size} width={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="MORE"
                component={MoreScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <BegSvg fill={color} height={size} width={size} /> // Use your SVG icon
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
