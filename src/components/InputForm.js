import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const InputForm = ({ label, value, onChangeText, error, isSecure }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={isSecure}
                placeholderTextColor="#A9A9A9"
                selectionColor="#7B2CBF"
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
};


const SubmitButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 8,
        paddingVertical: 10, // Aumenta el padding vertical para mayor altura
        paddingHorizontal: 16,
        width: 300,
        fontSize: 16,
        color: '#333333',
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
    button: {
        backgroundColor: '#7B2CBF',
        paddingVertical: 14, // Aumenta el padding vertical para mayor altura
        paddingHorizontal: 16,
        borderRadius: 8,
        marginTop: 10,
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export { InputForm, SubmitButton };
