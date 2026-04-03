import { useState, useEffect } from 'react';
import { Appearance } from 'react-native';

export const COLORS = {
  light: {
    primary: '#0D6EFD', // Clinical Royal Blue
    secondary: '#20C997', // Vitality Teal (Modern Medical)
    accent: '#FF7D54', // Coral Accent (for urgency/ctas)
    background: '#FFFFFF', // Pure White
    surface: '#F8F9FA', // Light Gray Surface
    surfaceVariant: '#E9ECEF',
    text: '#1A1D23', // Deep Charcoal
    textSecondary: '#6C757D', // Muted Slate
    border: '#DEE2E6',
    error: '#DC3545',
    success: '#198754',
    google: '#DB4437',
    activeTab: 'rgba(13, 110, 253, 0.1)',
  },
  dark: {
    primary: '#3D8BFF', 
    secondary: '#34D399',
    accent: '#FFA17A',
    background: '#0B0E14',
    surface: '#161B22',
    surfaceVariant: '#21262D',
    text: '#F8FAFC',
    textSecondary: '#B1BAC4',
    border: 'rgba(255, 255, 255, 0.1)',
    error: '#FF6B6B',
    success: '#4ADE80',
    google: '#EA4335',
    activeTab: 'rgba(61, 139, 255, 0.15)',
  }
};

export const useTheme = () => {
  // defaulting to light mode as requested, but keeping system listener for future flexibility
  const [isDarkMode, setIsDarkMode] = useState(false); 

  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return { theme, isDarkMode, toggleTheme };
};
