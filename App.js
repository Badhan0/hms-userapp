import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/layouts/navigation/AppNavigation';
import { NotificationProvider } from './src/context/NotificationContext';

function App() {
  return (
    <SafeAreaProvider>
      <NotificationProvider>
        <NavigationContainer>
          <AppNavigation />
        </NavigationContainer>
      </NotificationProvider>
    </SafeAreaProvider>
  );
}

export default App;
