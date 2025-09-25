import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../utils/theme';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { bottomTabParamList } from '../../navigation/BottomTabNavigator';
import { StackNavigationProp } from '@react-navigation/stack';

type CartScreenProps = BottomTabScreenProps<bottomTabParamList, 'Cart'>;

const mockCartItems = [
  {
    id: '1',
    name: 'Product 1',
    price: '$19.99',
    image: 'https://picsum.photos/seed/1/200/200',
    quantity: 1,
  },
  {
    id: '2',
    name: 'Product 2',
    price: '$29.99',
    image: 'https://picsum.photos/seed/2/200/200',
    quantity: 2,
  },
  {
    id: '3',
    name: 'Product 3',
    price: '$39.99',
    image: 'https://picsum.photos/seed/3/200/200',
    quantity: 1,
  },
];

export const CartScreen = ({ navigation }: CartScreenProps) => {
  const [cartItems, setCartItems] = useState(mockCartItems);

  const handleRemoveItem = itemId => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const handleQuantityChange = (itemId, amount) => {
    setCartItems(
      cartItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item,
      ),
    );
  };

  const calculateSubtotal = () => {
    return cartItems
      .reduce((sum, item) => {
        const price = parseFloat(item.price.replace('$', ''));
        return sum + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const shippingFee = 5.0;

  const handleCheckout = () => {
    (navigation.getParent() as StackNavigationProp<ParamListBase>)?.navigate(
      'Checkout',
      {
        subtotal: parseFloat(calculateSubtotal()),
        shippingFee: shippingFee,
      },
    );
  };

  const CartListItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleRemoveItem(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color="red" />
      </TouchableOpacity>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleQuantityChange(item.id, -1)}
        >
          <Ionicons
            name="remove-outline"
            size={15}
            color={COLORS.background1}
          />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleQuantityChange(item.id, 1)}
        >
          <Ionicons name="add-outline" size={15} color={COLORS.background1} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      {cartItems.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Ionicons name="cart-outline" size={100} color={COLORS.subtitle} />
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
          <Text style={styles.emptyCartSubText}>
            When you add products, they will appear here
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.listWrapper}>
            <FlatList
              data={cartItems}
              renderItem={({ item }) => <CartListItem item={item} />}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.listContainer}
            />
          </View>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Subtotal</Text>
              <Text style={styles.summaryText}>${calculateSubtotal()}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Shipping Fee</Text>
              <Text style={styles.summaryText}>${shippingFee.toFixed(2)}</Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutButtonText}>Go to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBackground,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Glancyr-SemiBold',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  listWrapper: {
    flex: 0.6,
  },
  listContainer: {
    paddingBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
    height: 80,
  },
  productName: {
    fontFamily: 'Albert Sans-SemiBold',
    fontSize: 16,
  },
  productPrice: {
    fontFamily: 'Albert Sans-Bold',
    fontSize: 14,
    color: COLORS.subtitle,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  quantityContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.background1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontFamily: 'Albert Sans-SemiBold',
    fontSize: 16,
    marginHorizontal: 10,
  },
  summaryContainer: {
    flex: 0.4,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryText: {
    fontFamily: 'Albert Sans-Regular',
    fontSize: 16,
  },
  checkoutButton: {
    backgroundColor: COLORS.background1,
    padding: 16,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  checkoutButtonText: {
    color: COLORS.font1,
    fontFamily: 'Albert Sans-SemiBold',
    fontSize: 16,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 20,
    fontFamily: 'Glancyr-SemiBold',
    color: COLORS.subtitle,
    marginTop: 20,
  },
  emptyCartSubText: {
    fontSize: 16,
    fontFamily: 'Albert Sans-Regular',
    color: COLORS.subtitle,
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});
