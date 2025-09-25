import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../utils/theme';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { bottomTabParamList } from '../../navigation/BottomTabNavigator';

type ProfileScreenProps = BottomTabScreenProps<bottomTabParamList, 'Cart'>;

const mockUserData = {
  name: 'John Doe',
};

const mockPastOrders = [
  {
    id: '1',
    orderId: 'ORD001',
    date: '2023-01-15',
    total: '$59.98',
    items: 2,
    image: 'https://picsum.photos/seed/order1/100/100',
  },
  {
    id: '2',
    orderId: 'ORD002',
    date: '2023-02-20',
    total: '$29.99',
    items: 1,
    image: 'https://picsum.photos/seed/order2/100/100',
  },
  {
    id: '3',
    orderId: 'ORD003',
    date: '2023-03-10',
    total: '$119.97',
    items: 3,
    image: 'https://picsum.photos/seed/order3/100/100',
  },
];

const PastOrderItem = ({ order }) => (
  <TouchableOpacity style={styles.orderCard}>
    <Image source={{ uri: order.image }} style={styles.orderImage} />
    <View style={styles.orderDetailsLeft}>
      <Text style={styles.orderId}>Order ID: {order.orderId}</Text>
      <Text style={styles.orderDate}>Date: {order.date}</Text>
    </View>
    <View style={styles.orderDetailsRight}>
      <Text style={styles.orderTotal}>{order.total}</Text>
      <Text style={styles.orderItems}>{order.items} items</Text>
    </View>
  </TouchableOpacity>
);

export const ProfileScreen = ({}: ProfileScreenProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.userInfoContainer}>
        <Ionicons
          name="person-circle-outline"
          size={100}
          color={COLORS.subtitle}
        />
        <Text style={styles.userName}>{mockUserData.name}</Text>
      </View>

      <View style={styles.separator} />

      <Text style={styles.pastOrdersTitle}>Past Orders</Text>

      <FlatList
        data={mockPastOrders}
        renderItem={({ item }) => <PastOrderItem order={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.pastOrdersList}
      />
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
  },
  userInfoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userName: {
    fontSize: 22,
    fontFamily: 'Albert Sans-SemiBold',
    marginTop: 10,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 20,
  },
  pastOrdersTitle: {
    fontSize: 20,
    fontFamily: 'Glancyr-SemiBold',
    textAlign: 'center',
    marginBottom: 15,
  },
  pastOrdersList: {
    paddingBottom: 20,
  },
  orderCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  orderImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 15,
  },
  orderDetailsLeft: {
    flex: 1,
  },
  orderDetailsRight: {
    alignItems: 'flex-end',
  },
  orderId: {
    fontFamily: 'Albert Sans-SemiBold',
    fontSize: 16,
  },
  orderDate: {
    fontFamily: 'Albert Sans-Regular',
    fontSize: 14,
    color: COLORS.subtitle,
  },
  orderTotal: {
    fontFamily: 'Albert Sans-Bold',
    fontSize: 16,
  },
  orderItems: {
    fontFamily: 'Albert Sans-Regular',
    fontSize: 14,
    color: COLORS.subtitle,
  },
});
