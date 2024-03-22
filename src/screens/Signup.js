import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { InputForm, SubmitButton } from '../components/InputForm';
import { useRegisterMutation } from '../services/AuthService'; 
import signupSchema from '../validations/signupSchema';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/auth/authSlice';

const Signup = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({}); 
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false); 
    const [triggerRegister] = useRegisterMutation(); 

    const handleSignup = async () => {
        try {
            setIsLoading(true);
            signupSchema.validateSync({ email, password, confirmPassword }, { abortEarly: false });

            const { data, error } = await triggerRegister({ email, password });
            if (error) {
                throw new Error(error.message || 'Error desconocido');
            }
            dispatch(setUser({ email: data.email, idToken: data.idToken }));

            setIsLoading(false);

        } catch (error) {
            setIsLoading(false); 
            setIsError(true); 
            console.error('Error signing up:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>
            <InputForm
                label="Correo Electrónico"
                value={email}
                onChangeText={setEmail}
                secureTextEntry={false}
                error={errors.email}
            />
            <InputForm
                label="Contraseña"
                value={password}
                onChangeText={setPassword}
                isSecure={true}
                error={errors.password}
            />
            <InputForm
                label="Confirmar Contraseña"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                isSecure={true}
                error={errors.confirmPassword}
            />
            <SubmitButton title="Registrarse" onPress={handleSignup} disabled={isLoading} />
            {isError && <Text style={styles.errorText}>Error: No se pudo completar el registro.</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});

export default Signup;
