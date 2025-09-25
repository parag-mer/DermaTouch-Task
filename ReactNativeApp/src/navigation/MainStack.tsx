import { createStackNavigator } from '@react-navigation/stack';
import { AuthStack } from './AuthStack';
import { AppStack } from './AppStack';
import { SplashScreen } from '../screens/auth/SplashScreen';

export type MainStackParamList = {
  SplashScreen: undefined;
  AuthStack: undefined;
  AppStack: undefined;
};

export const MainStack = () => {
  const Stack = createStackNavigator<MainStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="SplashScreen"
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="AppStack" component={AppStack} />
      <Stack.Screen name="AuthStack" component={AuthStack} />
    </Stack.Navigator>
  );
};
