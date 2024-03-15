import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImageSelector = () => {
    const [image, setImage] = useState(null);

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
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const confirmImage = () => {
        // Aquí puedes implementar la lógica para almacenar la imagen en la base de datos o hacer cualquier otro procesamiento necesario
        console.log('Imagen confirmada:', image);
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
