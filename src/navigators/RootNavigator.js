import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useFonts } from 'expo-font';
import { FONTS } from '../../global/fonts';
import LoadingScreen from '../components/LoadingScreen';
import TabNavigator from './TabNavigator';
import AuthNavigator from './AuthNavigator';


// Define el componente RootNavigator
const RootNavigator = () => {
    const [fontsLoaded] = useFonts(FONTS);
    const user = useSelector((state) => state.auth);
    console.log(user)

    // Renderiza LoadingScreen si las fuentes no están cargadas
    if (!fontsLoaded) return <LoadingScreen />;

    // Decide qué navigator mostrar según el estado del usuario
    return (
        <NavigationContainer>
            {!user.idToken ? <AuthNavigator /> : <TabNavigator />}
        </NavigationContainer>
    );
};

// Exporta el componente RootNavigator
export default RootNavigator;
