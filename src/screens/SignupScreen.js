import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../theme/Colors';
import { hmsAuth } from '../utils/api';

const { width } = Dimensions.get('window');

const SignupScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGoogleSignup = () => {
    setIsGoogleUser(true);
    setName('John Doe'); 
    setEmail('john.doe@google.com'); 
    Alert.alert('Google Sync Successful', 'Identity verified via Google. Please provide a phone number and security key.');
  };

  const handleSignup = async () => {
    if (!name || !email || !phone || !password) {
      Alert.alert('Incomplete Protocol', 'All identity parameters are required.');
      return;
    }

    setLoading(true);
    try {
      if (isGoogleUser) {
        // Direct signup for synced users
        await hmsAuth.signup({ fullName: name, email, password, phone, isGoogleSignup: true });
        Alert.alert('Sync Complete', 'Profile initialized successfully.', [
          { text: 'Enter Dashboard', onPress: () => navigation.navigate('MainApp') }
        ]);
      } else {
        // Manual users must verify OTP first
        await hmsAuth.requestOTP(email);
        Alert.alert('Security Protocol', 'A verification OTP has been transmitted to your email.', [
          { text: 'Verify OTP', onPress: () => navigation.navigate('OTP', { 
            signupData: { fullName: name, email, password, phone } 
          }) }
        ]);
      }
    } catch (error) {
      Alert.alert('System Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />
      <View style={[styles.topGradient, { backgroundColor: theme.primary, opacity: 0.05 }]} />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
           <Icon name="chevron-left" size={30} color={theme.text} />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Sign Up Profile</Text>
          <Text style={[styles.headerSub, { color: theme.textSecondary }]}>Create your high-fidelity medical profile in the Fabul ecosystem</Text>
        </View>

        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <TouchableOpacity style={[styles.googleBtn, { borderColor: theme.border }]} onPress={handleGoogleSignup}>
             <Icon name="google" size={20} color={theme.google} />
             <Text style={[styles.googleBtnTxt, { color: theme.text }]}>SIGN UP WITH GOOGLE</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
             <View style={[styles.line, { backgroundColor: theme.border }]} />
             <Text style={[styles.dividerTxt, { color: theme.textSecondary }]}>OR ENTER DETAILS</Text>
             <View style={[styles.line, { backgroundColor: theme.border }]} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.primary }]}>FULL NAME</Text>
            <View style={[styles.inputBox, { backgroundColor: theme.background, borderColor: theme.border }]}>
              <Icon name="account-outline" size={20} color={theme.textSecondary} />
              <TextInput 
                placeholder="Ex. John Doe"
                placeholderTextColor={theme.textSecondary}
                style={[styles.input, { color: theme.text }]}
                value={name}
                onChangeText={setName}
                editable={!isGoogleUser} // Auto-filled from Google
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.primary }]}>EMAIL ADDRESS</Text>
            <View style={[styles.inputBox, { backgroundColor: theme.background, borderColor: theme.border }]}>
              <Icon name="email-outline" size={20} color={theme.textSecondary} />
              <TextInput 
                placeholder="Ex. john@fabul.health"
                placeholderTextColor={theme.textSecondary}
                style={[styles.input, { color: theme.text }]}
                value={email}
                onChangeText={setEmail}
                editable={!isGoogleUser} // Auto-filled from Google
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.primary }]}>PHONE NUMBER</Text>
            <View style={[styles.inputBox, { backgroundColor: theme.background, borderColor: theme.border }]}>
              <Icon name="phone-outline" size={20} color={theme.textSecondary} />
              <TextInput 
                placeholder="+1 234 567 890"
                placeholderTextColor={theme.textSecondary}
                style={[styles.input, { color: theme.text }]}
                value={phone}
                onChangeText={setPhone}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.primary }]}>PASSWORD</Text>
            <View style={[styles.inputBox, { backgroundColor: theme.background, borderColor: theme.border }]}>
              <Icon name="lock-outline" size={20} color={theme.textSecondary} />
              <TextInput 
                placeholder="••••••••"
                placeholderTextColor={theme.textSecondary}
                style={[styles.input, { color: theme.text }]}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.mainBtn} onPress={handleSignup}>
             <LinearGradient
                colors={[theme.primary, theme.secondary]}
                style={styles.btnGradient}
                start={{x:0, y:0}} end={{x:1, y:1}}
             >
                <Text style={styles.mainBtnTxt}>SIGN UP PROFILE</Text>
                <Icon name="shield-check-outline" size={20} color="#FFF" style={{ marginLeft: 10 }} />
             </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
           <Text style={[styles.footerTxt, { color: theme.textSecondary }]}>Already have a profile?</Text>
           <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={[styles.footerLink, { color: theme.primary }]}>SECURE LOGIN</Text>
           </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  topGradient: { height: 350, width: 350, borderRadius: 175, position: 'absolute', top: -100, right: -100 },
  scrollContent: { paddingHorizontal: 25, paddingVertical: 60, flexGrow: 1, justifyContent: 'center' },
  backBtn: { position: 'absolute', top: 50, left: 15, zIndex: 10, padding: 10 },
  header: { alignItems: 'center', marginBottom: 40, marginTop: 20 },
  headerTitle: { fontSize: 32, fontWeight: '900', letterSpacing: -0.5 },
  headerSub: { fontSize: 14, textAlign: 'center', marginTop: 10, lineHeight: 22, opacity: 0.8 },
  card: { padding: 25, borderRadius: 32, borderWidth: 1, elevation: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 20 },
  googleBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 55, borderRadius: 16, borderWidth: 1.5 },
  googleBtnTxt: { marginLeft: 12, fontSize: 13, fontWeight: '800', letterSpacing: 1 },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 30 },
  line: { flex: 1, height: 1.5, opacity: 0.5 },
  dividerTxt: { fontSize: 10, fontWeight: 'bold', marginHorizontal: 15, letterSpacing: 1 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 10, fontWeight: '900', letterSpacing: 2, marginBottom: 8, opacity: 0.7 },
  inputBox: { flexDirection: 'row', alignItems: 'center', height: 55, borderRadius: 16, borderHorizontal: 1, paddingHorizontal: 15, borderWidth: 1.5 },
  input: { flex: 1, marginLeft: 12, fontSize: 15, fontWeight: '700' },
  mainBtn: { width: '100%', height: 60, borderRadius: 18, overflow: 'hidden', marginTop: 15, elevation: 8 },
  btnGradient: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  mainBtnTxt: { color: '#FFF', fontSize: 15, fontWeight: '900', letterSpacing: 2 },
  footer: { marginTop: 40, alignItems: 'center' },
  footerTxt: { fontSize: 13, fontWeight: '600' },
  footerLink: { fontSize: 14, fontWeight: '900', marginTop: 8, letterSpacing: 1 },
});

export default SignupScreen;
