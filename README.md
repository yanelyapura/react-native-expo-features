# 🚀 Yapu App - React Native E-commerce

Una aplicación móvil completa de e-commerce desarrollada con **React Native** y **Expo**, que demuestra las mejores prácticas de desarrollo móvil moderno.

## ✨ Características Principales

### 🛍️ **Funcionalidades de E-commerce**
- **Catálogo de productos** con búsqueda avanzada
- **Carrito de compras** con gestión de cantidades
- **Sistema de pedidos** con seguimiento completo
- **Detalles de productos** con imágenes y descripciones
- **Historial de pedidos** con estados de entrega

### 🔐 **Sistema de Autenticación**
- **Registro de usuarios** con validación
- **Inicio de sesión** seguro
- **Perfil de usuario** personalizable
- **Gestión de sesiones** persistente

### 📍 **Funcionalidades de Ubicación**
- **Selector de ubicación** con mapas
- **Búsqueda de direcciones** en tiempo real
- **Geolocalización** para entregas
- **Lista de ubicaciones** guardadas

### 🎨 **Características Técnicas**
- **Arquitectura Redux** con Redux Toolkit
- **Navegación** con React Navigation
- **Validación de formularios** con Yup
- **Gestión de imágenes** con Expo Image Picker
- **Fuentes personalizadas** con Expo Font
- **Splash Screen** profesional

## 🛠️ Tecnologías Utilizadas

### **Frontend**
- **React Native** (0.73.4)
- **Expo SDK** (50.0.11)
- **React Navigation** (Stack, Drawer, Bottom Tabs)
- **Redux Toolkit** + **React Redux**
- **Reselect** para selectores optimizados

### **UI/UX**
- **Expo Vector Icons**
- **React Native Reanimated**
- **React Native Gesture Handler**
- **Safe Area Context**

### **Funcionalidades Nativas**
- **Expo Location** para geolocalización
- **Expo File System** para almacenamiento
- **Expo Image Picker** para selección de imágenes
- **Expo Splash Screen** para pantalla de carga

### **Validación y Utilidades**
- **Yup** para validación de esquemas
- **React Native Get Random Values**

## 📱 Capturas de Pantalla

*[Aquí se pueden agregar capturas de pantalla de la aplicación]*

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn
- Expo CLI (`npm install -g @expo/cli`)
- Expo Go app en tu dispositivo móvil

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/react-native-expo-features.git
cd react-native-expo-features
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar el proyecto**
```bash
npm start
```

4. **Ejecutar en dispositivo**
- Escanea el código QR con Expo Go
- O ejecuta `npm run android` / `npm run ios`

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
├── features/           # Funcionalidades principales
│   ├── auth/          # Sistema de autenticación
│   └── shop/          # Funcionalidades de e-commerce
├── firebase/          # Configuración de Firebase
├── navigators/        # Configuración de navegación
├── screens/           # Pantallas de la aplicación
├── selectors/         # Selectores de Redux
├── services/          # Servicios y APIs
├── store/            # Configuración de Redux
└── validations/      # Esquemas de validación
```

## 🔧 Configuración de Desarrollo

### Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto:
```env
EXPO_PUBLIC_API_URL=tu_url_api
EXPO_PUBLIC_FIREBASE_CONFIG=tu_config_firebase
```

### Scripts Disponibles
- `npm start` - Inicia el servidor de desarrollo
- `npm run android` - Ejecuta en Android
- `npm run ios` - Ejecuta en iOS
- `npm run web` - Ejecuta en web

## 🎯 Características Destacadas para Portfolio

### **Arquitectura Escalable**
- Separación clara de responsabilidades
- Patrón de features por dominio
- Gestión de estado centralizada con Redux

### **Experiencia de Usuario**
- Navegación fluida entre pantallas
- Animaciones suaves con Reanimated
- Interfaz intuitiva y responsive

### **Buenas Prácticas**
- Código limpio y bien documentado
- Validación robusta de formularios
- Manejo de errores consistente
- Optimización de rendimiento

### **Tecnologías Modernas**
- React Native con Expo (última versión)
- Redux Toolkit para gestión de estado
- React Navigation para navegación
- Integración con servicios nativos

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

## 👨‍💻 Autor

**Yanu** - [GitHub](https://github.com/tu-usuario)

---

⭐ **¡Dale una estrella al proyecto si te gustó!**
