import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { useFonts } from 'expo-font';
import { FONTS } from '../../global/fonts';
import LoadingScreen from '../components/LoadingScreen';
import TabNavigator from './TabNavigator';
import AuthNavigator from './AuthNavigator';
import { useGetProfileImageQuery } from '../services/shopService';
import { setImageCamera } from '../features/auth/authSlice';

const RootNavigator = () => {
    const [fontsLoaded] = useFonts(FONTS);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth);
    const { data: profileImageData, error: profileImageError } = useGetProfileImageQuery(user.localId);

    useEffect(() => {
        if (profileImageData) {
            dispatch(setImageCamera(profileImageData.image));
        } 
    }, [profileImageData, dispatch]);

    if (!fontsLoaded) return <LoadingScreen />;

    return (
        <NavigationContainer>
            {!user.idToken ? <AuthNavigator /> : <TabNavigator />}
        </NavigationContainer>
    );
};

export default RootNavigator;
