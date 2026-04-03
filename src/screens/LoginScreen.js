import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../theme/Colors';
import { hmsAuth } from '../utils/api';

const { width } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const { theme, isDarkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Protocol Error', 'Please provide authentication keys.');
      return;
    }

    setLoading(true);
    try {
      const response = await hmsAuth.login({ email, password });
      // In a real app, store response.token in SecureStore
      Alert.alert('Authentication Success', 'System access granted.', [
        { text: 'Enter Dashboard', onPress: () => navigation.navigate('MainApp') }
      ]);
    } catch (error) {
      Alert.alert('Access Denied', error.message);
    } finally {
      setLoading(false);
    }
  };

  const themeStyle = {
    backgroundColor: theme.background,
    cardBackground: theme.surface,
    textColor: theme.text,
    subTextColor: theme.textSecondary,
    borderColor: theme.border,
  };

  return (
    <View style={[styles.container, { backgroundColor: themeStyle.backgroundColor }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />
      <View style={[styles.topShape, { backgroundColor: theme.primary, opacity: isDarkMode ? 0.1 : 0.05 }]} />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Icon name="pulse" size={60} color={theme.primary} />
          <Text style={[styles.welcomeTitle, { color: themeStyle.textColor }]}>Medical Access</Text>
          <Text style={[styles.welcomeSub, { color: themeStyle.subTextColor }]}>Secure authentication gateway for Clinical Radiance</Text>
        </View>

        <View style={[styles.loginCard, { backgroundColor: themeStyle.cardBackground, borderColor: themeStyle.borderColor }]}>
          <View style={styles.inputSection}>
            <Text style={[styles.label, { color: theme.primary }]}>USER ID / EMAIL</Text>
            <View style={[styles.inputWrapper, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.03)' : '#F1F5F9', borderColor: themeStyle.borderColor }]}>
              <Icon name="email-outline" size={20} color={themeStyle.subTextColor} />
              <TextInput 
                placeholder="Ex. john@fabul.health"
                placeholderTextColor={themeStyle.subTextColor}
                style={[styles.input, { color: themeStyle.textColor }]}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputSection}>
            <Text style={[styles.label, { color: theme.primary }]}>PASSWORD</Text>
            <View style={[styles.inputWrapper, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.03)' : '#F1F5F9', borderColor: themeStyle.borderColor }]}>
              <Icon name="lock-outline" size={20} color={themeStyle.subTextColor} />
              <TextInput 
                placeholder="••••••••"
                placeholderTextColor={themeStyle.subTextColor}
                style={[styles.input, { color: themeStyle.textColor }]}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Icon name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color={themeStyle.subTextColor} />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.forgotBtn} onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={[styles.forgotTxt, { color: theme.primary }]}>Recover Access Key?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} disabled={loading}>
             <LinearGradient colors={[theme.primary, theme.secondary]} style={styles.btnGradient}>
                {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.loginBtnTxt}>SECURE LOGIN</Text>}
             </LinearGradient>
          </TouchableOpacity>

          <View style={styles.divider}>
             <View style={[styles.line, { backgroundColor: themeStyle.borderColor }]} />
             <Text style={[styles.dividerTxt, { color: themeStyle.subTextColor }]}>OR CONTINUE WITH</Text>
             <View style={[styles.line, { backgroundColor: themeStyle.borderColor }]} />
          </View>

          <TouchableOpacity style={[styles.googleBtn, { borderColor: themeStyle.borderColor }]}>
             <Icon name="google" size={20} color={theme.google} />
             <Text style={[styles.googleBtnTxt, { color: themeStyle.textColor }]}>CONTINUE WITH GOOGLE</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
           <Text style={[styles.footerTxt, { color: themeStyle.subTextColor }]}>Don't have a profile?</Text>
           <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={[styles.signUpTxt, { color: theme.primary }]}>INITIALIZE PROFILE</Text>
           </TouchableOpacity>
        </View>

        {/* Biometric Secondary Option */}
        <TouchableOpacity style={styles.bioBtn}>
           <Icon name="fingerprint" size={24} color={theme.primary} />
           <Text style={[styles.bioTxt, { color: theme.primary }]}>Login via Biometrics</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topShape: {
    paddingBottom: 20,
    height: 300,
    width: 300,
    borderRadius: 150,
    position: 'absolute',
    top: -100,
    right: -100,
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingVertical: 60,
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '800',
    marginTop: 15,
    letterSpacing: 0.5,
  },
  welcomeSub: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  loginCard: {
    padding: 25,
    borderRadius: 30,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 10,
  },
  inputSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 15,
    height: 55,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '600',
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotTxt: {
    fontSize: 12,
    fontWeight: '700',
  },
  loginBtn: {
    width: '100%',
    height: 55,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#1070FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
  btnGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtnTxt: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
  },
  line: {
    flex: 1,
    height: 1,
  },
  dividerTxt: {
    fontSize: 10,
    fontWeight: 'bold',
    marginHorizontal: 15,
  },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
  },
  googleBtnTxt: {
    marginLeft: 10,
    fontSize: 13,
    fontWeight: '700',
  },
  footer: {
    marginTop: 35,
    alignItems: 'center',
  },
  footerTxt: {
    fontSize: 13,
    fontWeight: '600',
  },
  signUpTxt: {
    marginTop: 5,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1,
  },
  bioBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    opacity: 0.8,
  },
  bioTxt: {
    marginLeft: 10,
    fontSize: 13,
    fontWeight: '700',
  }
});

export default LoginScreen;
