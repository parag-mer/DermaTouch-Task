import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../utils/theme';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { bottomTabParamList } from '../../navigation/BottomTabNavigator';
import { StackNavigationProp } from '@react-navigation/stack';

type HomeScreenProps = BottomTabScreenProps<bottomTabParamList, 'Home'>;

const mockProducts = [
  {
    id: '1',
    title: 'Product 1',
    price: '$19.99',
    image: 'https://picsum.photos/seed/1/200/300',
    description:
      'Illuminate your workspace with this sleek LED desk lamp featuring adjustable brightness and a touch-control panel. Perfect for late-night reading or focused study sessions.',
  },
  {
    id: '2',
    title: 'Product 2',
    price: '$29.99',
    image: 'https://picsum.photos/seed/2/200/300',
    description:
      'Enjoy crystal-clear sound and deep bass with lightweight wireless earbuds. With long battery life and noise cancellation, they’re ideal for music and calls on the go.',
  },
  {
    id: '3',
    title: 'Product 3',
    price: '$39.99',
    image: 'https://picsum.photos/seed/3/200/300',
    description:
      'Track your steps, heart rate, and sleep patterns with this stylish fitness tracker. Stay motivated and monitor your health with real-time insights.',
  },
  {
    id: '4',
    title: 'Product 4',
    price: '$49.99',
    image: 'https://picsum.photos/seed/4/200/300',
    description:
      'Blend smoothies, shakes, or juices anytime with this compact portable blender. Rechargeable and travel-friendly, it’s perfect for busy lifestyles.',
  },
  {
    id: '5',
    title: 'Product 5',
    price: '$59.99',
    image: 'https://picsum.photos/seed/5/200/300',
    description:
      'Stay comfortable all day with this ergonomic chair designed for posture support. Adjustable height, lumbar support, and cushioned seating make it a must-have for home offices.',
  },
  {
    id: '6',
    title: 'Product 6',
    price: '$69.99',
    image: 'https://picsum.photos/seed/6/200/300',
    description:
      'Turn any wall into a big screen with this mini projector. Compact and easy to use, it’s perfect for movie nights, gaming, or presentations.',
  },
];

const { width } = Dimensions.get('window');
const itemWidth = (width - 60) / 2;

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const handleSearchPress = () => {
    navigation.navigate('Search');
  };

  const renderProductItem = ({ item }) => {
    const handleProductPress = () => {
      (navigation.getParent() as StackNavigationProp<ParamListBase>)?.navigate(
        'ProductDetail',
        { product: item },
      );
    };

    return (
      <TouchableOpacity onPress={handleProductPress}>
        <View style={styles.productItem}>
          <Image source={{ uri: item.image }} style={styles.productImage} />
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text style={styles.productPrice}>{item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.discoverText}>Discover</Text>
      <TouchableOpacity onPress={handleSearchPress} activeOpacity={1}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color={COLORS.subtitle}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search for products"
            style={styles.searchInput}
            editable={false}
          />
        </View>
      </TouchableOpacity>
      <FlatList
        data={mockProducts}
        renderItem={renderProductItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
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
  discoverText: {
    fontSize: 28,
    fontFamily: 'Glancyr-SemiBold',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontFamily: 'Albert Sans-Regular',
  },
  listContainer: {
    paddingBottom: 20,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productItem: {
    width: itemWidth,
    marginBottom: 20,
    backgroundColor: '#fff',

    overflow: 'hidden',
    // borderWidth: 1,
    borderColor: COLORS.border,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  productTitle: {
    fontFamily: 'Albert Sans-SemiBold',
    fontSize: 16,
    marginVertical: 5,
    // marginHorizontal: 10,
  },
  productPrice: {
    fontFamily: 'Albert Sans-Bold',
    fontSize: 14,
    color: COLORS.subtitle,
    marginBottom: 10,
    // marginHorizontal: 10,
  },
});
