import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../utils/theme';
import { useIsFocused } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { bottomTabParamList } from '../../navigation/BottomTabNavigator';

type SearchScreenProps = BottomTabScreenProps<bottomTabParamList, 'Search'>;

export const SearchScreen = ({}: SearchScreenProps) => {
  const searchInputRef = useRef(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && searchInputRef.current) {
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 100);
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color={COLORS.subtitle}
          style={styles.searchIcon}
        />
        <TextInput
          ref={searchInputRef}
          placeholder="Search for products"
          style={styles.searchInput}
        />
      </View>
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
});
