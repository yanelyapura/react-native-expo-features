import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { InputForm, SubmitButton } from '../components/InputForm';
import { useLoginMutation } from '../services/AuthService';
import loginSchema from '../validations/loginSchema';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/auth/authSlice';

const Login = ({ navigation }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');
    const [triggerLogin] = useLoginMutation();

    const handleLogin = async () => {
        try {
            loginSchema.validateSync({ email, password }, { abortEarly: false });

            const { data } = await triggerLogin({ email, password });
            dispatch(setUser({ email: data.email, idToken: data.idToken, localId: data.localId }));

        } catch (error) {
            if (error.name === 'ValidationError') {
                error.inner.forEach((err) => {
                    if (err.path === 'email') {
                        setEmailError(err.message);
                    } else if (err.path === 'password') {
                        setPasswordError(err.message);
                        if (err.message === 'INVALID_LOGIN_CREDENTIALS') {
                            setPasswordError('Credenciales inválidas');
                        }
                    }
                });
            } else {
                setLoginError('Credenciales inválidas. Por favor, inténtalo de nuevo.');
            }
        }
    };

    const handleRegister = () => {
        navigation.navigate('Signup');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <InputForm
                label="Correo Electrónico"
                value={email}
                onChangeText={setEmail}
                isSecure={false}
                error={emailError}
            />
            <InputForm
                label="Contraseña"
                value={password}
                onChangeText={setPassword}
                isSecure={true}
                error={passwordError}
            />
            <Text style={styles.errorText}>{loginError}</Text>
            <SubmitButton title="Iniciar Sesión" onPress={handleLogin} />
            <TouchableOpacity onPress={handleRegister}>
                <Text style={styles.registerLink}>¿No tienes una cuenta? Regístrate aquí</Text>
            </TouchableOpacity>
            <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 40,
        color: '#333333',
    },
    forgotPassword: {
        marginTop: 20,
        color: '#7B2CBF',
    },
    registerLink: {
        marginTop: 20,
        color: '#7B2CBF',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 5,
    },
});

export default Login;
