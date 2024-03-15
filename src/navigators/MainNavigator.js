import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import ItemDetail from '../screens/ItemDetail';
import SearchResults from '../screens/SearchResults';
import OrderDetail from '../screens/OrderDetail';
import COLORS from '../../global/colors';

const Stack = createStackNavigator();

const MainNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: COLORS.primary },
                headerTintColor: '#fff',
                headerTitleStyle: { fontFamily: 'Lobster' },
            }}
        >
            <Stack.Screen name="Home" component={Home} options={{ title: 'MercadoYapu' }} />
            <Stack.Screen name="ItemDetail" component={ItemDetail} options={{ title: 'Detalle del Producto' }} />
            <Stack.Screen name="SearchResults" component={SearchResults} options={{ title: 'Resultados de Búsqueda' }} />
            <Stack.Screen name="OrderDetail" component={OrderDetail} options={{ title: 'Detalle de la orden' }} />
        </Stack.Navigator>
    );
};

export default MainNavigator;
