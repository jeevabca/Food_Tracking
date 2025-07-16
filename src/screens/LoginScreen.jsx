import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {login} from '../store/slices/authSlice';
import CheckBox from '@react-native-community/checkbox';
import Loader from '../components/Loader';

export default function LoginScreen({navigation}) {
  const dispatch = useDispatch();
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '352137701973-v6eni73a4lr781kecgrq30ve66tkn4tj.apps.googleusercontent.com',
    });
  }, []);

  const onGoogleButtonPress = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

      const signInResult = await GoogleSignin.signIn();
      const idToken = signInResult.data?.idToken || signInResult.idToken;
      if (!idToken) throw new Error('No ID token found');

      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(idToken);
      const userCredential = await signInWithCredential(auth, credential);

      const {uid, email, displayName, photoURL} = userCredential.user;

      dispatch(login({uid, email, displayName, photoURL}));

      navigation.replace('MainTabs');
    } catch (error) {
      console.error('Google Sign-In error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && <Loader />}
      <StatusBar barStyle="light-content" backgroundColor="#0F0F2D" />
      <View style={styles.header}>
        <Text style={styles.title}>Log In</Text>
        <Text style={styles.subtitle}>
          Please sign in to your existing account
        </Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>EMAIL</Text>
        <TextInput
          placeholder="example@gmail.com"
          placeholderTextColor="#ccc"
          style={styles.input}
        />

        <Text style={[styles.label, {marginTop: 20}]}>PASSWORD</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="**********"
            placeholderTextColor="#ccc"
            secureTextEntry
            style={[styles.input, {flex: 1}]}
          />
          <Text style={styles.eyeIcon}>👁️</Text>
        </View>

        <View style={styles.optionsRow}>
          <View style={styles.rememberRow}>
            <CheckBox value={remember} onValueChange={setRemember} />

            <Text style={styles.rememberText}>Remember me</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot Password</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>LOG IN</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text>Don’t have an account? </Text>
          <Text style={styles.signup}>SIGN UP</Text>
        </View>

        <Text style={styles.orText}>Or</Text>

        <TouchableOpacity onPress={onGoogleButtonPress} disabled={loading}>
          <Image
            source={require('../assets/google-logo.png')}
            style={styles.socialButton}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F2D',
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
  },
  subtitle: {
    color: '#aaa',
    marginTop: 8,
    fontSize: 14,
  },
  formContainer: {
    marginTop: 30,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: '#333',
    fontWeight: '700',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#999',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    alignItems: 'center',
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    fontSize: 13,
    marginLeft: 5,
  },
  forgot: {
    fontSize: 13,
    color: '#FF7A00',
    fontWeight: '600',
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: '#FF7A00',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  loginText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signup: {
    color: '#FF7A00',
    fontWeight: '700',
  },
  orText: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    color: '#888',
  },
  socialButton: {
    height: 50,
    width: 200,
    alignSelf: 'center',
  },
});
