import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../theme/Colors';
import { hmsAuth } from '../utils/api';

const { width } = Dimensions.get('window');

const OTPScreen = ({ navigation, route }) => {
  const { theme } = useTheme();
  const { email, isRecovery, signupData } = route.params || {};
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const inputs = useRef([]);

  const focusNext = (index, value) => {
    if (index < 3 && value !== '') {
      inputs.current[index + 1].focus();
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleVerify = async () => {
    const fullOtp = otp.join('');
    if (fullOtp.length < 4) {
      Alert.alert('Incomplete Key', 'Please enter the full security code.');
      return;
    }

    setLoading(true);
    try {
      // Step 1: Verify OTP
      await hmsAuth.verifyOTP(email || signupData.email, fullOtp);
      
      if (isRecovery) {
        // Recovery flow: Redirect to reset password
        navigation.navigate('ResetPassword', { email });
      } else {
        // Signup flow: Complete registration
        await hmsAuth.signup({ ...signupData, isGoogleSignup: false });
        Alert.alert('Protocol Success', 'Profile initialized and secured.', [
          { text: 'Enter Dashboard', onPress: () => navigation.navigate('MainApp') }
        ]);
      }
    } catch (error) {
      Alert.alert('Verification Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color={theme.text} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Icon name="email-check-outline" size={80} color={theme.primary} />
          <Text style={[styles.title, { color: theme.text }]}>Email Verification</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>We've sent a 4-digit code to your email. Enter it below to verify your identity.</Text>
        </View>

        <View style={styles.otpSection}>
          {otp.map((digit, i) => (
            <TextInput
              key={i}
              ref={(ref) => (inputs.current[i] = ref)}
              style={[styles.otpInput, { 
                backgroundColor: theme.surfaceVariant, 
                color: theme.text,
                borderColor: digit ? theme.primary : theme.border 
              }]}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={(val) => focusNext(i, val)}
              value={digit}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.verifyBtn} onPress={handleVerify} disabled={loading}>
          <LinearGradient
            colors={[theme.primary, theme.secondary]}
            style={styles.btnGradient}
          >
            {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.verifyTxt}>VERIFY & JOIN</Text>}
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resendBtn}>
          <Text style={[styles.resendTxt, { color: theme.primary }]}>Resend Verification Code</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: 30, paddingVertical: 100, alignItems: 'center' },
  backBtn: { position: 'absolute', top: 50, left: 20 },
  header: { alignItems: 'center', marginBottom: 50 },
  title: { fontSize: 26, fontWeight: '800', marginTop: 20 },
  subtitle: { fontSize: 14, textAlign: 'center', marginTop: 10, lineHeight: 22 },
  otpSection: { flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginBottom: 50 },
  otpInput: { width: 60, height: 65, borderRadius: 16, textAlign: 'center', fontSize: 24, fontWeight: 'bold', borderWidth: 2 },
  verifyBtn: { width: '100%', height: 55, borderRadius: 16, overflow: 'hidden' },
  btnGradient: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  verifyTxt: { color: '#FFF', fontWeight: 'bold', letterSpacing: 2 },
  resendBtn: { marginTop: 30 },
  resendTxt: { fontSize: 14, fontWeight: '800', letterSpacing: 1 },
});

export default OTPScreen;
