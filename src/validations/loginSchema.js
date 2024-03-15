import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Ingresa un correo electrónico válido')
        .required('El correo electrónico es obligatorio'),
    password: Yup.string()
        .required('La contraseña es obligatoria'),
});

export default loginSchema;
