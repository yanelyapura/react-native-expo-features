import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation
import { useSelector } from 'react-redux'; // Importa useSelector para acceder al estado global

const MyProfile = () => {
    const navigation = useNavigation(); // Obtiene el objeto de navegación
    const user = useSelector(state => state.user); // Obtiene los datos del usuario del estado global
    const [image, setImage] = useState(null); // Estado para almacenar la imagen del usuario
    const [newImage, setNewImage] = useState(null); // Estado para almacenar la nueva imagen seleccionada por el usuario

    console.log('User:', user); // Registra el estado de user en la consola

    // Función para seleccionar una nueva imagen del usuario desde la galería
    const pickImage = async () => {
        console.log('Picking image'); // Registra en la consola cuando se selecciona una imagen
        navigation.navigate('ImageSelector'); // Navega a ImageSelector cuando se selecciona una imagen
    };

    // Función para tomar una nueva foto con la cámara del dispositivo
    const takePhoto = async () => {
        console.log('Taking photo'); // Registra en la consola cuando se toma una foto
        navigation.navigate('ImageSelector'); // Navega a ImageSelector cuando se toma una foto
    };

    // Función para guardar la nueva imagen del usuario
    const saveImage = () => {
        if (newImage) {
            setImage(newImage); // Guarda la nueva imagen en el estado de la imagen del usuario
        }
    };

    return (
        <View style={styles.container}>
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
            <TextInput
                style={styles.input}
                placeholder="Nombre de Usuario"
                value={user ? user.displayName : ''} // Verifica si user está definido antes de acceder a sus propiedades
                // onChangeText para actualizar el nombre de usuario si es editable
            />
            <TextInput
                style={styles.input}
                placeholder="Correo Electrónico"
                value={user ? user.email : ''} // Verifica si user está definido antes de acceder a sus propiedades
                // onChangeText para actualizar el correo electrónico si es editable
            />
            <Button title="Guardar" onPress={saveImage} />
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
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        width: '80%',
    },
});

export default MyProfile;
