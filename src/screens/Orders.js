import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useGetAllOrdersQuery } from '../services/shopService';
import OrderItem from '../components/OrderItem';

const Orders = () => {
  const { data: orders, isLoading } = useGetAllOrdersQuery({
    refetchOnMount: true, // Refrescar automáticamente al montar el componente
    refetchInterval: 5000,
  });


  if (isLoading) {
    return <View style={styles.screen}><Text>Cargando...</Text></View>;
  }

  // Convertir el objeto de pedidos en un array de objetos
  const ordersArray = Object.keys(orders).map((key) => orders[key]);

  return (
    <View style={styles.screen}>
      <FlatList
        data={ordersArray}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <OrderItem order={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  },
});

export default Orders;
