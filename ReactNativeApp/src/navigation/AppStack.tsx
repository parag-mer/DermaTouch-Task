import { createStackNavigator } from '@react-navigation/stack';
import { BottomTabNavigator } from './BottomTabNavigator';
import { ProductDetailScreen } from '../screens/product/ProductDetailScreen';
import { CheckoutScreen } from '../screens/checkout/CheckoutScreen';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export type AppStackParamList = {
  Main: undefined;
  ProductDetail: { product: any };
  Checkout: { subtotal: number; shippingFee: number };
};

const Stack = createStackNavigator<AppStackParamList>();

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({ navigation }) => ({
          headerTitle: 'Details',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
              <Ionicons name="arrow-back" size={24} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={({ navigation }) => ({
          headerTitle: 'Checkout',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
              <Ionicons name="arrow-back" size={24} />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};
