import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button, Dimensions } from 'react-native';
import { useGetProductByIdQuery, usePostOrderMutation } from '../services/shopService';
import { useDispatch } from 'react-redux';
import { addToCart, addToRecentlyVisited } from '../features/shop/shopSlice';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const ItemDetail = ({ route }) => {
    const { productId } = route.params;
    const dispatch = useDispatch();
    const { data: productQuery, isLoading } = useGetProductByIdQuery(productId);
    const [finalPrice, setFinalPrice] = useState(0);
    const [postOrder] = usePostOrderMutation(); // Importa usePostOrderMutation

    const productArray = productQuery ? Object.values(productQuery) : [];
    const product = productArray[0];

    useEffect(() => {
        if (!isLoading && product) {
            dispatch(addToRecentlyVisited(productId));
            calculateFinalPrice(product);
        }
    }, [productId, product, dispatch, isLoading]);

    const calculateFinalPrice = (product) => {
        const price = product.price !== undefined ? product.price : 0;
        const discountPercentage = product.discountPercentage !== undefined ? product.discountPercentage : 0;
        setFinalPrice(price - (price * discountPercentage / 100));
    };

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, quantity: 1 }));
    };

    const buyNowHandler = async () => {
        try {
            const orderId = uuidv4();
            const order = {
                id: orderId,
                date: new Date().toISOString().slice(0, 10), // Obtiene la fecha actual en formato YYYY-MM-DD
                total: finalPrice, // Precio final del producto
                items: [{ productId, quantity: 1 }] // Producto y cantidad
            };

            const response = await postOrder(order).unwrap(); // Realizar la compra inmediata

            // Manejar la respuesta según sea necesario (p. ej., mostrar mensaje de éxito)
            console.log('Orden confirmada con ID:', response);
        } catch (error) {
            console.error('Error al confirmar la orden:', error);
        }
    };

    if (isLoading || !product) {
        return <View style={styles.container}><Text>Cargando...</Text></View>;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: product.imageUrl }} style={styles.productImage} resizeMode="contain" />
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{product.title}</Text>
                {product.discountPercentage > 0 && (
                    <View style={styles.discountInfo}>
                        <Text style={styles.originalPrice}>${product.price.toFixed(2)}</Text>
                        <Text style={styles.discountText}>-{product.discountPercentage}%</Text>
                    </View>
                )}
                <Text style={styles.finalPrice}>${finalPrice.toFixed(2)}</Text>
                <Text style={styles.description}>{product.description}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Añadir al Carrito" onPress={addToCartHandler} />
                <Button title="Comprar Ahora" onPress={buyNowHandler} color="#FF6347" />
            </View>
        </ScrollView>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    imageContainer: {
        alignItems: 'center',
    },
    productImage: {
        width: width - 40,
        height: 300,
    },
    detailsContainer: {
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    discountInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    originalPrice: {
        fontSize: 18,
        color: 'grey',
        textDecorationLine: 'line-through',
    },
    discountText: {
        fontSize: 18,
        color: '#E47911',
        fontWeight: 'bold',
    },
    finalPrice: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#B12704',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
});

export default ItemDetail;
