import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import COLORS from '../../global/colors';

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: COLORS.primary },
                headerTintColor: '#fff',
                headerTitleStyle: { fontFamily: 'Lobster' },
            }}
        >
            <Stack.Screen name="Login" component={Login} options={{ title: 'Inicio de Sesión' }} />
            <Stack.Screen name="Signup" component={Signup} options={{ title: 'Registro' }} />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
