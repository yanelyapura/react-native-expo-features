import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useGetOrderByIdQuery } from '../services/shopService';
import ProductDetailCard from '../components/ProductDetailCard';

const OrderDetail = ({ route }) => {
    const { orderId } = route.params;
    
    const { data: orderQuery, isLoading } = useGetOrderByIdQuery(orderId);
    console.log(orderQuery);
    const orderArray = orderQuery ? Object.values(orderQuery) : [];
    const order = orderArray[0];
  
    const renderItem = ({ item }) => (
      <ProductDetailCard productId={item.productId} quantity={item.quantity} />
    );
  
    if (isLoading || !order) {
      return <View style={styles.container}><Text>Cargando...</Text></View>;
    }
  
    return (
      <View style={styles.container}>
        <Text style={styles.date}>Fecha de la Orden: {order.date}</Text>
        <FlatList
          data={order.items}
          keyExtractor={(item) => item.productId.toString()}
          renderItem={renderItem}
        />
        <Text style={styles.total}>Total: ${order.total.toFixed(2)}</Text>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    date: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    total: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 20,
      textAlign: 'right',
    },
  });
  
  export default OrderDetail;
