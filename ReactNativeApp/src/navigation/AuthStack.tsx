import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { SignupScreen } from '../screens/auth/SignupScreen';
import { SplashScreen } from '../screens/auth/SplashScreen';

export type AuthStackParamList = {
  LoginScreen: undefined;
  SignupScreen: undefined;
};

export const AuthStack = () => {
  const Stack = createStackNavigator<AuthStackParamList>();

  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
    </Stack.Navigator>
  );
};
