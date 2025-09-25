import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../utils/theme';
import { StackScreenProps } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { IStore } from '../../services/redux';
import { MainStackParamList } from '../../navigation/MainStack';

type SplashScreenProps = StackScreenProps<MainStackParamList, 'SplashScreen'>;

export const SplashScreen = ({ navigation }: SplashScreenProps) => {
  const { token } = useSelector((state: IStore) => state.authReducer);
  setTimeout(() => {
    if (token == null) {
      navigation.replace('AuthStack');
    } else {
      navigation.replace('AppStack');
    }
  }, 3000);

  return (
    <View style={styles.MainContainer}>
      <Text style={styles.TitleText}>Shopicart</Text>
      <ActivityIndicator size={'large'} />
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background1,
  },
  TitleText: {
    fontSize: 50,
    color: COLORS.font1,
    fontFamily: 'Glancyr-SemiBold',
    marginBottom: 10,
  },
});
