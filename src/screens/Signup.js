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
    const [triggerRegister] = useRegisterMutation();

    const handleSignup = async () => {
        try {
            signupSchema.validateSync({ email, password, confirmPassword }, { abortEarly: false });

            const {data} = await triggerRegister({ email, password });
            dispatch(setUser({email:data.email,idToken:data.idToken}))

        } catch (error) {
            if (error.name === 'ValidationError') {
                const newErrors = {};
                error.inner.forEach((err) => {
                    newErrors[err.path] = err.message;
                });
                setErrors(newErrors);
            } else {
                console.error('Error signing up:', error);
            }
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
                secureTextEntry={true}
                error={errors.password}
            />
            <InputForm
                label="Confirmar Contraseña"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={true}
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
