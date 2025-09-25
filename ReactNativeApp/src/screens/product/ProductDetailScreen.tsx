import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { COLORS } from '../../utils/theme';

export const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;

  return (  
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <View style={styles.detailsContainer}>
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text style={styles.productPrice}>{product.price}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.addToCartButton}>
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBackground,
    paddingHorizontal: 28,
  },
  scrollContainer: {
    paddingBottom: 100, // To make space for the sticky button
  },
  productImage: {
    width: '100%',
    height: 300,
    marginTop: 20,
  },
  detailsContainer: {
    marginTop: 20,
  },
  productTitle: {
    fontSize: 24,
    fontFamily: 'Glancyr-SemiBold',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 18,
    fontFamily: 'Albert Sans-Bold',
    color: COLORS.subtitle,
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 14,
    fontFamily: 'Albert Sans-Regular',
    lineHeight: 24,
  },
  addToCartButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: COLORS.background1,
    padding: 16,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: COLORS.font1,
    fontFamily: 'Albert Sans-SemiBold',
    fontSize: 16,
  },
});
