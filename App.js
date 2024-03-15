import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { useFonts } from 'expo-font';
import { FONTS } from './global/fonts';
import RootNavigator from './src/navigators/RootNavigator';
import LoadingScreen from './src/components/LoadingScreen';

// Define el componente App
export default function App() {
  // Carga las fuentes
  const [fontsLoaded] = useFonts(FONTS);

  // Renderiza LoadingScreen si las fuentes no están cargadas
  if (!fontsLoaded) return <LoadingScreen />;

  // Renderiza RootNavigator dentro del proveedor de redux
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}
