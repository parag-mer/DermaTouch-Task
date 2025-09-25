import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { COLORS } from '../../utils/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { AppStackParamList } from '../../navigation/AppStack';

type CheckOutScreenProps = StackScreenProps<AppStackParamList, 'Checkout'>

export const CheckoutScreen = ({ route, navigation }:CheckOutScreenProps) => {
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Card');
  const [promoCode, setPromoCode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // Mock data from route params
  const subtotal = route.params?.subtotal || 119.97;
  const shippingFee = route.params?.shippingFee || 5.0;
  const total = subtotal + shippingFee;

  const paymentMethods = ['Card', 'Cash', 'UPI'];

  const handlePlaceOrder = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    navigation.replace('Main', { screen: 'Home' });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.label}>Delivery address</Text>
        <TextInput
          style={styles.addressInput}
          multiline
          placeholder="Enter your delivery address"
          value={deliveryAddress}
          onChangeText={setDeliveryAddress}
        />

        <Text style={styles.label}>Payment method</Text>
        <View style={styles.paymentMethodContainer}>
          {paymentMethods.map(method => (
            <TouchableOpacity
              key={method}
              style={[
                styles.paymentMethodButton,
                paymentMethod === method && styles.selectedPaymentMethod,
              ]}
              onPress={() => setPaymentMethod(method)}
            >
              <Text
                style={[
                  styles.paymentMethodText,
                  paymentMethod === method && styles.selectedPaymentMethodText,
                ]}
              >
                {method}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.summaryContainer}>
          <Text style={styles.label}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Subtotal</Text>
            <Text style={styles.summaryText}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Shipping Fee</Text>
            <Text style={styles.summaryText}>${shippingFee.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Total</Text>
            <Text style={styles.summaryText}>${total.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.promoContainer}>
          <TextInput
            style={styles.promoInput}
            placeholder="Enter promo code"
            value={promoCode}
            onChangeText={setPromoCode}
          />
          <TouchableOpacity style={styles.applyPromoButton}>
            <Text style={styles.applyPromoButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={[
          styles.placeOrderButton,
          {
            backgroundColor:
              deliveryAddress === '' ? COLORS.border : COLORS.background1,
          },
        ]}
        disabled={deliveryAddress === ''}
        onPress={handlePlaceOrder}
      >
        <Text style={styles.placeOrderButtonText}>Place Order</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Ionicons name="checkmark-circle" size={100} color="green" />
            <Text style={styles.modalTitle}>Congratulations</Text>
            <Text style={styles.modalSubtitle}>Your order has been placed</Text>
            <TouchableOpacity
              style={styles.okButton}
              onPress={handleModalClose}
            >
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBackground,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  label: {
    fontSize: 18,
    fontFamily: 'Albert Sans-SemiBold',
    marginBottom: 10,
  },
  addressInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
    fontFamily: 'Albert Sans-Regular',
    marginBottom: 20,
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  paymentMethodButton: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  selectedPaymentMethod: {
    backgroundColor: COLORS.background1,
  },
  paymentMethodText: {
    fontFamily: 'Albert Sans-Regular',
  },
  selectedPaymentMethodText: {
    color: COLORS.font1,
    fontFamily: 'Albert Sans-SemiBold',
  },
  summaryContainer: {
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  summaryText: {
    fontFamily: 'Albert Sans-Regular',
    fontSize: 16,
  },
  promoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  promoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 10,
    height: 40,
    fontFamily: 'Albert Sans-Regular',
  },
  applyPromoButton: {
    backgroundColor: COLORS.border,
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
  applyPromoButtonText: {
    color: COLORS.font1,
    fontFamily: 'Albert Sans-SemiBold',
  },
  placeOrderButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeOrderButtonText: {
    color: COLORS.font1,
    fontFamily: 'Albert Sans-SemiBold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Glancyr-SemiBold',
    marginTop: 20,
  },
  modalSubtitle: {
    fontSize: 16,
    fontFamily: 'Albert Sans-Regular',
    color: COLORS.subtitle,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  okButton: {
    backgroundColor: COLORS.border,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  okButtonText: {
    color: COLORS.font1,
    fontFamily: 'Albert Sans-SemiBold',
    fontSize: 16,
  },
});
