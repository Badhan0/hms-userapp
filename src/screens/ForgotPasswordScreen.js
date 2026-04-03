import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../theme/Colors';
import { hmsAuth } from '../utils/api';

const ForgotPasswordScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRequestOTP = async () => {
    if (!email) {
      Alert.alert('Incomplete Protocol', 'Enter your registered email to recover access.');
      return;
    }

    setLoading(true);
    try {
      await hmsAuth.requestOTP(email);
      Alert.alert('Transmission Successful', 'A recovery OTP has been sent to your medical email.');
      // Passing email to OTP screen so we know where to verify
      navigation.navigate('OTP', { email, isRecovery: true });
    } catch (error) {
      Alert.alert('Security Error', error.message);
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
          <Icon name="lock-reset" size={80} color={theme.primary} />
          <Text style={[styles.title, { color: theme.text }]}>Recover Access</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Enter your medical ID (email) to initiate the security recovery protocol.</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.primary }]}>MEDICAL ID / EMAIL</Text>
          <View style={[styles.inputBox, { backgroundColor: theme.surfaceVariant, borderColor: theme.border }]}>
            <Icon name="email-outline" size={20} color={theme.textSecondary} />
            <TextInput 
              placeholder="Ex. john@fabul.health"
              placeholderTextColor={theme.textSecondary}
              style={[styles.input, { color: theme.text }]}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.mainBtn} onPress={handleRequestOTP} disabled={loading}>
          <LinearGradient colors={[theme.primary, theme.secondary]} style={styles.btnGradient}>
            {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.mainBtnTxt}>INITIATE RECOVERY</Text>}
          </LinearGradient>
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
  title: { fontSize: 28, fontWeight: '800', marginTop: 20 },
  subtitle: { fontSize: 14, textAlign: 'center', marginTop: 10, lineHeight: 22 },
  inputGroup: { width: '100%', marginBottom: 30 },
  label: { fontSize: 10, fontWeight: '900', letterSpacing: 2, marginBottom: 8 },
  inputBox: { flexDirection: 'row', alignItems: 'center', height: 60, borderRadius: 16, paddingHorizontal: 15, borderWidth: 1.5 },
  input: { flex: 1, marginLeft: 12, fontSize: 16, fontWeight: '700' },
  mainBtn: { width: '100%', height: 60, borderRadius: 18, overflow: 'hidden' },
  btnGradient: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  mainBtnTxt: { color: '#FFF', fontSize: 15, fontWeight: '900', letterSpacing: 2 },
});

export default ForgotPasswordScreen;
