import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '../../services/redux';
import { useState } from 'react';
import { loginUser } from '../../services/redux/slices/auth/helper';

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { COLORS } from '../../utils/theme';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AuthStack';
import { ParamListBase } from '@react-navigation/native';

type LoginScreenProps = StackScreenProps<AuthStackParamList, 'LoginScreen'>;

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { loading, error } = useSelector((state: IStore) => state.authReducer);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = () => {
    let valid = true;
    // Email validation
    if (email.trim() === '') {
      setEmailError('Email is required.');
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    } else {
      setEmailError('');
    }

    // Password validation
    if (password.trim() === '') {
      setPasswordError('Password is required.');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      dispatch(loginUser({ email, password }));
      setTimeout(() => {
        (navigation.getParent() as StackNavigationProp<ParamListBase>)?.replace(
          'AppStack',
        );
      }, 3000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to your account</Text>
      <Text style={styles.subtitle}>It's great to see you again.</Text>

      <Text style={styles.TextInputLabel}>Email</Text>
      <TextInput
        placeholder="Enter your email address"
        style={styles.TextInputStyle}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <Text style={styles.TextInputLabel}>Password</Text>
      <TextInput
        placeholder="Enter your password"
        style={styles.TextInputStyle}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}

      {/* {error && <Text style={styles.serverErrorText}>{error}</Text>} */}

      <TouchableOpacity
        style={[
          styles.Button,
          (loading || email.trim() === '' || password.trim() === '') &&
            styles.disabledButton,
        ]}
        onPress={handleLogin}
        disabled={loading || email.trim() === '' || password.trim() === ''}
      >
        {loading ? (
          <ActivityIndicator color={COLORS.font1} />
        ) : (
          <Text style={styles.ButtonText}>Login</Text>
        )}
      </TouchableOpacity>
      <View style={styles.signupTextContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <Text
          style={styles.signupText2}
          onPress={() => navigation.navigate('SignupScreen')}
        >
          Join
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: COLORS.lightBackground, // light background
  },
  title: {
    fontSize: 24,
    fontFamily: 'Glancyr-SemiBold',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontFamily: 'Albert Sans-Regular',
    color: COLORS.subtitle,
    marginTop: 5,
  },
  TextInputLabel: {
    fontFamily: 'Albert Sans-SemiBold',
    marginTop: 24,
    marginBottom: 4,
  },
  TextInputStyle: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingLeft: 10,
  },
  Button: {
    width: '100%',
    backgroundColor: COLORS.background1,
    padding: 16,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  ButtonText: {
    color: COLORS.font1,
    fontFamily: 'Albert Sans-SemiBold',
  },
  signupTextContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    fontFamily: 'Albert Sans-Regular',
  },
  signupText2: {
    textDecorationLine: 'underline',
    fontFamily: 'Albert Sans-SemiBold',
  },
  serverErrorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'Albert Sans-Regular',
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    fontFamily: 'Albert Sans-Regular',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
    opacity: 1,
  },
});
