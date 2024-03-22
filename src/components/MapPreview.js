import React from 'react';
import { View, Image, Text, StyleSheet, Platform } from 'react-native';
import { googleAPI } from '../firebase/googleAPI';

const MapPreview = ({ location, style }) => {
    let mapImageUrl;

    if (location) {
        mapImageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7Clabel:C%7C${location.lat},${location.lng}&key=${googleAPI.mapStatic}`;
    }

    return (
        <View style={{ ...styles.mapPreview, ...style }}>
            {location ? (
                <Image style={styles.mapImage} source={{ uri: mapImageUrl }} />
            ) : (
                <View style={styles.placeholder}>
                    <Text style={styles.placeholderText}>No hay ubicación seleccionada</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    mapPreview: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden', // Asegúrate de que las esquinas redondeadas se apliquen a la imagen también
        borderWidth: 1,
        borderColor: '#ccc',
        elevation: 5, // Sombra para Android
        shadowColor: 'black', // Sombra para iOS
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
    },
    mapImage: {
        width: '100%',
        height: '100%',
    },
    placeholder: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200, // Ajusta según necesidades
        width: '100%',
        backgroundColor: '#f0f0f0', // Un color de fondo neutro
    },
    placeholderText: {
        color: '#a9a9a9', // Un color de texto que contraste con el fondo
        fontSize: 16, // Ajusta según necesidades
    },
});

export default MapPreview;
