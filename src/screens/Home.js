import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar'; 
import Promotions from '../components/Promotions'; 
import RecentlyVisited from '../components/RecentlyVisited'; 
import ProductRecommendations from '../components/ProductRecommendations'; 
import CategoryAccess from '../components/CategoryAccess'; 
import { useGetPromotionsQuery, useGetRecentlyVisitedQuery, useGetProductRecommendationsQuery } from '../services/shopService';

const Home = ({ navigation }) => {
  const { data: promotions } = useGetPromotionsQuery();
  const { data: recentlyVisited } = useGetRecentlyVisitedQuery();
  const { data: productRecommendations } = useGetProductRecommendationsQuery();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchBar navigation={navigation} />
        <Promotions data={promotions} />
        <RecentlyVisited data={recentlyVisited} />
        <ProductRecommendations data={productRecommendations} />
        <CategoryAccess navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F9FAFB",
      paddingHorizontal: 10, 
    },
});

export default Home;
