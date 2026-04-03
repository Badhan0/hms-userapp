import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import Custom Screens
import SplashScreen from '../../screens/SplashScreen';
import LoginScreen from '../../screens/LoginScreen';
import SignupScreen from '../../screens/SignupScreen';
import OTPScreen from '../../screens/OTPScreen';
import ForgotPasswordScreen from '../../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../../screens/ResetPasswordScreen';
import HomeScreen from '../../screens/HomeScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Placeholder Screens
const RecordsScreen = () => <View style={styles.placeholder}><Text>Records</Text></View>;
const InboxScreen = () => <View style={styles.placeholder}><Text>Inbox</Text></View>;
const ProfileScreen = () => <View style={styles.placeholder}><Text>Profile</Text></View>;

const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: styles.tabBar,
      tabBarActiveTintColor: '#0D6EFD',
      tabBarIcon: ({ color, size, focused }) => {
        let iconName = route.name === 'Home' ? 'view-dashboard-outline' :
                       route.name === 'Records' ? 'folder-pulse-outline' :
                       route.name === 'Inbox' ? 'message-processing-outline' : 'account-circle-outline';
        return (
          <View style={focused ? styles.activeTab : null}>
            <Icon name={iconName} size={24} color={color} />
          </View>
        );
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Records" component={RecordsScreen} />
    <Tab.Screen name="Inbox" component={InboxScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const AppNavigation = () => (
  <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
    <Stack.Screen name="OTP" component={OTPScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    <Stack.Screen name="MainApp" component={BottomTabs} />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  placeholder: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  tabBar: { height: 70, paddingBottom: 10, elevation: 10 },
  activeTab: { padding: 10, backgroundColor: 'rgba(13, 110, 253, 0.05)', borderRadius: 15 },
});

export default AppNavigation;
