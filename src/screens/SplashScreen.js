import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, Easing, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import { useTheme } from '../theme/Colors';

const { width } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const { theme, isDarkMode } = useTheme();
  const pulseAnim = React.useRef(new Animated.Value(1)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.1, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    ).start();

    Animated.timing(fadeAnim, { toValue: 1, duration: 1000, delay: 500, useNativeDriver: true }).start();

    setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />
      <LinearGradient
        colors={isDarkMode ? [theme.background, '#10131a', theme.background] : ['#F8FAFC', '#F1F5F9', '#F8FAFC']}
        style={StyleSheet.absoluteFill}
      />
      
      <View style={styles.centerContent}>
        <Animated.View style={[styles.logoContainer, { transform: [{ scale: pulseAnim }], shadowColor: theme.primary }]}>
          <Svg width="120" height="120" viewBox="0 0 100 100">
            <Defs>
              <SvgGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0" stopColor={theme.primary} stopOpacity="1" />
                <Stop offset="1" stopColor={theme.secondary} stopOpacity="1" />
              </SvgGradient>
            </Defs>
            <Path
              d="M20,50 Q35,20 50,50 T80,50"
              stroke="url(#grad)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            <Path
              d="M45,40 L55,40 L55,45 L60,45 L60,55 L55,55 L55,60 L45,60 L45,55 L40,55 L40,45 L45,45 Z"
              fill={theme.primary}
              fillOpacity="0.8"
            />
          </Svg>
        </Animated.View>

        <Animated.Text style={[styles.title, { color: theme.text, opacity: fadeAnim, transform: [{ translateY: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }] }]}>
          Fabul Health
        </Animated.Text>
        
        <Text style={[styles.subtitle, { color: theme.primary }]}>
          The Sentient Healthcare Solution
        </Text>
      </View>

      <View style={styles.bottomBar}>
        <View style={[styles.pulseLine, { backgroundColor: theme.primary, opacity: 0.3 }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContent: {
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: '800',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 12,
    marginTop: 10,
    letterSpacing: 4,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 50,
    width: '60%',
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  pulseLine: {
    width: '100%',
    height: 1,
  },
});

export default SplashScreen;
