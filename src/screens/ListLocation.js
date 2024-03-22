import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useGetUserAddressQuery } from '../services/shopService';

const ListLocation = () => {
    const navigation = useNavigation();
    const { localId } = useSelector((state) => state.auth);
    const { data: userAddress, isFetching, refetch } = useGetUserAddressQuery(localId);

    useFocusEffect(
        React.useCallback(() => {
            refetch();
        }, [localId, refetch])
    );

    if (isFetching) {
        return <Text>Cargando ubicación...</Text>;
    }

    return (
        <View style={styles.screen}>
            {userAddress ? (
                <Text>Dirección Actual: {userAddress.address}</Text>
            ) : (
                <Text>No has configurado una ubicación aún.</Text>
            )}
            <Button
                title={userAddress ? "Modificar Ubicación" : "Configurar Ubicación"}
                onPress={() => navigation.navigate('LocationSelector')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ListLocation;
