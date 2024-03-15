import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import CartItem from '../components/CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, acceptCartTransaction } from '../features/shop/shopSlice'; // Importa la acción acceptCartTransaction
import { usePostOrderMutation } from '../services/shopService';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.shop.cart);
  const [postOrder] = usePostOrderMutation();

  const removeItemHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const confirmOrderHandler = () => {
    const orderId = uuidv4(); 
    const order = {
      id: orderId,
      date: new Date().toISOString().slice(0, 10), // Obtiene la fecha actual en formato YYYY-MM-DD
      total: calculateTotal(), // Calcula el total del carrito
      items: cartItems.map((item) => ({ // Formatea cada artículo del carrito en el formato esperado
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    postOrder(order)
      .unwrap()
      .then((orderId) => {
        console.log('Orden confirmada con ID:', orderId);
        dispatch(acceptCartTransaction()); // Limpia el carrito después de confirmar la orden
      })
      .catch((error) => {
        console.error('Error al confirmar la orden:', error);
      });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CartItem item={item} onRemove={() => removeItemHandler(item.id)} />
        )}
        ListFooterComponent={() => (
          <View style={styles.summary}>
            <Text style={styles.total}>Total: ${calculateTotal().toFixed(2)}</Text>
            <TouchableOpacity onPress={confirmOrderHandler} style={styles.button}>
              <Text style={styles.buttonText}>Confirmar Orden</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  summary: {
    padding: 20,
    alignItems: 'center',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Cart;
