import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setImageCamera } from '../features/auth/authSlice'; 
import { usePostProfileImageMutation } from '../services/shopService';

const ImageSelector = () => {
    const [image, setImage] = useState(null);
    const { localId } = useSelector(state => state.auth);
    const dispatch = useDispatch(); 
    const navigation = useNavigation(); 
    const [postProfileImage] = usePostProfileImageMutation();

    useEffect(() => {
        verifyCameraPermission();
    }, []);

    const verifyCameraPermission = async () => {
        const { status } = await ImagePicker.getCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                'Permisos de Cámara Requeridos',
                'La aplicación necesita acceso a la cámara para tomar fotos.',
                [{ text: 'OK' }]
            );
        }
    };

    const pickImage = async () => {
        try {
            console.log('Intentando lanzar la cámara...');
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.2,
                base64: true,
            });
            console.log('Resultado de la cámara:', result);
    
            if (result !== null) {
                if (!result.canceled) {
                    if (result.assets && result.assets.length > 0) {
                        console.log('Imagen seleccionada:', result.assets[0].uri);
                        setImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
                    } else {
                        console.log('No se pudo encontrar la imagen seleccionada en el resultado.');
                    }
                } else {
                    console.log('La selección de la imagen fue cancelada.');
                }
            } else {
                console.log('El resultado de la cámara es nulo.');
            }
        } catch (error) {
            console.error('Error al seleccionar la imagen:', error);
        }
    };

    const confirmImage = async () => {
        dispatch(setImageCamera(image));
        try {
            console.log(localId);
            console.log(image);
            const response = await postProfileImage({localId, imageBase64: image});
            console.log('Respuesta de guardar imagen:', response);
            navigation.goBack();
        } catch (error) {
            console.error('Error al guardar la imagen en la base de datos:', error);
            // Maneja el error según sea necesario
        }
    };
    

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                ) : (
                    <Text style={styles.noImageText}>No hay imagen seleccionada</Text>
                )}
            </View>
            <Button title="Tomar Foto" onPress={pickImage} />
            <Button title="Confirmar Imagen" onPress={confirmImage} disabled={!image} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        marginBottom: 20,
    },
    image: {
        width: 300,
        height: 200,
        borderRadius: 10,
    },
    noImageText: {
        fontSize: 18,
        color: 'gray',
    },
});

export default ImageSelector;
