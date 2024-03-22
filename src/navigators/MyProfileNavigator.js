import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyProfile from '../screens/MyProfile';
import LocationSelector from '../screens/LocationSelector';
import ListLocation from '../screens/ListLocation';
import ImageSelector from '../screens/ImageSelector';
import COLORS from '../../global/colors';

const Stack = createStackNavigator();

const MyProfileNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: COLORS.primary },
                headerTintColor: '#fff',
                headerTitleStyle: { fontFamily: 'Lobster' },
            }}
        >
            <Stack.Screen name="Mi Perfil" component={MyProfile} options={{ title: 'Mi Perfil' }} />
            <Stack.Screen name="ImageSelector" component={ImageSelector} options={{ title: 'Seleccionar Imagen' }} />
            <Stack.Screen name="LocationSelector" component={LocationSelector} options={{ title: 'Seleccionar Dirección' }} />
            <Stack.Screen name="ListLocation" component={ListLocation} options={{ title: 'Mis Direcciones' }} />
        </Stack.Navigator>
    );
};

export default MyProfileNavigator;
