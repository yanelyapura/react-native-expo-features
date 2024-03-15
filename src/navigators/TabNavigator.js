import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Cart from '../screens/Cart';
import MainNavigator from './MainNavigator';
import Orders from '../screens/Orders';
import MyProfileNavigator from './MyProfileNavigator';
import COLORS from '../../global/colors';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Shop') iconName = focused ? 'home' : 'home-outline';
                    else if (route.name === 'Cart') iconName = focused ? 'cart' : 'cart-outline';
                    else if (route.name === 'Orders') iconName = focused ? 'list' : 'list-outline';
                    else if (route.name === 'MyProfile') iconName = focused ? 'person' : 'person-outline'; 
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerStyle: { backgroundColor: COLORS.primary },
                headerTintColor: '#fff',
                headerTitleStyle: { fontFamily: 'Lobster' },
            })}
        >
            <Tab.Screen name="Shop" component={MainNavigator} options={{ title: 'Inicio', headerShown: false }} />
            <Tab.Screen name="Cart" component={Cart} />
            <Tab.Screen name="Orders" component={Orders} />
            <Tab.Screen name="MyProfile" component={MyProfileNavigator} options={{ title: 'Perfil', headerShown: false }} />
        </Tab.Navigator>
    );
};

export default TabNavigator;
