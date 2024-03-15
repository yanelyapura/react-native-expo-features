import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useGetProductsQuery } from '../services/shopService';
import ProductCard from '../components/ProductCard';

const SearchResults = () => {
    const [results, setResults] = useState([]);
    const route = useRoute();
    const { query, categoryId } = route.params;
    const { data: products, isLoading } = useGetProductsQuery();

    useEffect(() => {
        let filteredResults = [];
        if (!isLoading) {
            if (query) {
                filteredResults = products.filter(product =>
                    product.title.toLowerCase().includes(query.toLowerCase()) ||
                    product.description.toLowerCase().includes(query.toLowerCase())
                );
            } else if (categoryId) {
                filteredResults = products.filter(product =>
                    product.categoryId === categoryId
                );
            }
            setResults(filteredResults);
        }
    }, [query, categoryId, products, isLoading]);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text>Cargando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {results.length > 0 ? (
                <FlatList
                    data={results}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <ProductCard product={item} cardStyle="searchResult" />
                    )}
                />
            ) : (
                <Text style={styles.noResultsText}>
                    {query ? `No se encontraron resultados para "${query}".` : "No se encontraron productos en esta categoría."}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    noResultsText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default SearchResults;
