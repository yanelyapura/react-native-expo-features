import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Alert, Text } from 'react-native';
import * as Location from 'expo-location';
import MapPreview from '../components/MapPreview';
import { googleAPI } from '../firebase/googleAPI'; 
import { useDispatch, useSelector } from 'react-redux';
import { setUserLocation } from '../features/auth/authSlice';
import { usePostUserAddressMutation } from '../services/shopService';

const LocationSelector = () => {
    const [pickedLocation, setPickedLocation] = useState();
    const [address, setAddress] = useState('');
    const { localId } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [postUserAddress] = usePostUserAddressMutation();

    useEffect(() => {
        const verifyLocationPermissions = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permisos insuficientes', 'Necesitas dar permisos de ubicación para usar esta función', [{ text: 'Ok' }]);
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            });

            fetchAddress(location.coords.latitude, location.coords.longitude);
        };

        verifyLocationPermissions();
    }, []);

    const handleGetLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permisos insuficientes', 'Necesitas dar permisos de ubicación para usar esta función', [{ text: 'Ok' }]);
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            });

            fetchAddress(location.coords.latitude, location.coords.longitude);
        } catch (error) {
            Alert.alert('Ubicación no encontrada', 'Por favor, intenta nuevamente', [{ text: 'Ok' }]);
        }
    };

    const fetchAddress = async (lat, lng) => {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleAPI.mapStatic}`;
        console.log("URL de solicitud a Geocoding API: ", url);
        const response = await fetch(url);
    
        if (!response.ok) {
            Alert.alert('Error', 'No se pudo obtener la dirección', [{ text: 'Ok' }]);
            return;
        }
    
        const data = await response.json();
        console.log("Respuesta de Geocoding API: ", data);
    
        if (data.status !== 'OK' || !data.results || data.results.length === 0) {
            console.log("Data status: ", data.status, "Results length: ", data.results ? data.results.length : 'N/A');
            Alert.alert('Error', 'No se encontró la dirección', [{ text: 'Ok' }]);
            return;
        }
    
        setAddress(data.results[0].formatted_address);
    };

    const saveLocationHandler = async () => {
        if (!pickedLocation) return;
        try {
            await postUserAddress({
                localId: localId,
                address: address,
                lat: pickedLocation.lat,
                lng: pickedLocation.lng
            }).unwrap();
    
            dispatch(setUserLocation({
                address,
                lat: pickedLocation.lat,
                lng: pickedLocation.lng
            }));
    
            Alert.alert('Dirección Guardada', 'Tu dirección ha sido actualizada exitosamente.');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'No se pudo guardar la dirección');
        }
    };
    
    

    return (
        <View style={styles.locationPicker}>
            <MapPreview style={styles.mapPreview} location={pickedLocation} />
            <Text>{address}</Text>
            <Button title="Confirmar Dirección" onPress={saveLocationHandler} />
            <Button title="Obtener Ubicación" onPress={handleGetLocation} />
        </View>
    );
};

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15,
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        overflow: 'hidden',
        borderRadius: 10,
    },
});

export default LocationSelector;
