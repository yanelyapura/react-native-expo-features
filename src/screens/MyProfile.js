import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../features/auth/authSlice';

const MyProfile = () => {
    const navigation = useNavigation();
    const user = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
    }, []);

    const [image, setImage] = useState(null);
    const [newImage, setNewImage] = useState(null);

    useEffect(() => {
        if (user && user.imageCamera) {
            setImage(user.imageCamera);
        }
    }, [user]);

    const pickImage = () => {
        console.log('Picking image');
        navigation.navigate('ImageSelector');
    };

    const takePhoto = () => {
        console.log('Taking photo');
        navigation.navigate('ImageSelector');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.emailText}>Correo Electrónico: {user ? user.email : ''}</Text>
            <View style={styles.imageContainer}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                ) : (
                    <Text style={styles.noImageText}>No hay imagen</Text>
                )}
            </View>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text style={styles.buttonText}>Seleccionar Imagen</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takePhoto}>
                <Text style={styles.buttonText}>Tomar Foto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListLocation')}>
                <Text style={styles.buttonText}>Mis Direcciones</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emailText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    imageContainer: {
        marginBottom: 20,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    noImageText: {
        fontSize: 18,
        color: 'gray',
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MyProfile;
