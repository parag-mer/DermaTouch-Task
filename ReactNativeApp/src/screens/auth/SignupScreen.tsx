import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { IStore } from '../../services/redux';
import { useState } from 'react';
import apiClient, { ENDPOINTS } from '../../services/api/apiClient';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AuthStack';
import { COLORS } from '../../utils/theme';
import { ParamListBase } from '@react-navigation/native';

type SignupScreenProps = StackScreenProps<AuthStackParamList, 'SignupScreen'>;

export const SignupScreen = ({ navigation }: SignupScreenProps) => {
  const { loading } = useSelector((state: IStore) => state.authReducer);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    let valid = true;
    if (name.trim() === '') {
      setNameError('Full name is required.');
      valid = false;
    } else {
      setNameError('');
    }

    if (email.trim() === '') {
      setEmailError('Email is required.');
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (password.trim() === '') {
      setPasswordError('Password is required.');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      try {
        setIsLoading(true);
        setError(null);
        await apiClient.post(ENDPOINTS.signup, { name, email, password });
        setTimeout(() => {
          (
            navigation.getParent() as StackNavigationProp<ParamListBase>
          )?.replace('AppStack');
        }, 3000);
      } catch (err: any) {
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an account</Text>
      <Text style={styles.subtitle}>Let's create your account</Text>

      <Text style={styles.TextInputLabel}>Full Name</Text>
      <TextInput
        placeholder="Enter your full name"
        style={styles.TextInputStyle}
        value={name}
        onChangeText={setName}
      />
      {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

      <Text style={styles.TextInputLabel}>Email</Text>
      <TextInput
        placeholder="Enter your email address"
        style={styles.TextInputStyle}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <Text style={styles.TextInputLabel}>Password</Text>
      <TextInput
        placeholder="Enter your password"
        style={styles.TextInputStyle}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}

      {error && <Text style={styles.serverErrorText}>{error}</Text>}

      <TouchableOpacity
        style={[
          styles.Button,
          (isLoading ||
            name.trim() === '' ||
            email.trim() === '' ||
            password.trim() === '') &&
            styles.disabledButton,
        ]}
        onPress={handleSignup}
        disabled={
          isLoading ||
          name.trim() === '' ||
          email.trim() === '' ||
          password.trim() === ''
        }
      >
        {isLoading ? (
          <ActivityIndicator color={COLORS.font1} />
        ) : (
          <Text style={styles.ButtonText}>Create an Account</Text>
        )}
      </TouchableOpacity>
      <View style={styles.signupTextContainer}>
        <Text style={styles.signupText}>Already have an account? </Text>
        <Text style={styles.signupText2} onPress={() => navigation.goBack()}>
          Login
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
