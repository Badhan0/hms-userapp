import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../theme/Colors';
import { hmsAuth } from '../utils/api';

const ResetPasswordScreen = ({ navigation, route }) => {
  const { theme } = useTheme();
  const { email } = route.params;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Incomplete Protocol', 'Provide a new security access key.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Mismatch Detected', 'Access keys do not match.');
      return;
    }

    setLoading(true);
    try {
      await hmsAuth.resetPassword(email, newPassword);
      Alert.alert('Protocol Updated', 'Your security access key has been successfully updated.', [
        { text: 'Login', onPress: () => navigation.navigate('Login') }
      ]);
    } catch (error) {
      Alert.alert('Security Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Icon name="key-change" size={80} color={theme.primary} />
          <Text style={[styles.title, { color: theme.text }]}>New Access Key</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Establish a new high-encryption access key for your profile.</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.primary }]}>NEW ACCESS KEY</Text>
          <View style={[styles.inputBox, { backgroundColor: theme.surfaceVariant, borderColor: theme.border }]}>
            <Icon name="lock-outline" size={20} color={theme.textSecondary} />
            <TextInput 
              placeholder="••••••••"
              placeholderTextColor={theme.textSecondary}
              style={[styles.input, { color: theme.text }]}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.primary }]}>CONFIRM KEY</Text>
          <View style={[styles.inputBox, { backgroundColor: theme.surfaceVariant, borderColor: theme.border }]}>
            <Icon name="lock-check-outline" size={20} color={theme.textSecondary} />
            <TextInput 
              placeholder="••••••••"
              placeholderTextColor={theme.textSecondary}
              style={[styles.input, { color: theme.text }]}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.mainBtn} onPress={handleReset} disabled={loading}>
          <LinearGradient colors={[theme.primary, theme.secondary]} style={styles.btnGradient}>
            {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.mainBtnTxt}>RESET ACCESS KEY</Text>}
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: 30, paddingVertical: 100, alignItems: 'center' },
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

export default ResetPasswordScreen;
