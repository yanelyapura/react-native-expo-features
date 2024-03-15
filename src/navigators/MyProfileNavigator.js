import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyProfile from '../screens/MyProfile';
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
            <Stack.Screen name="MyProfile" component={MyProfile} options={{ title: 'Mi Perfil' }} />
            <Stack.Screen name="ImageSelector" component={ImageSelector} options={{ title: 'Seleccionar Imagen' }} />
        </Stack.Navigator>
    );
};

export default MyProfileNavigator;
