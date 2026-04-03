import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, FlatList, Image, Animated, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../theme/Colors';

const { width } = Dimensions.get('window');

const DATA_SUMMARY = [
  { id: '1', label: 'PULSE', value: '72 BPM', icon: 'heart-pulse', color: '#EF4444' },
  { id: '2', label: 'OXYGEN', value: '98%', icon: 'molecule', color: '#10B981' },
  { id: '3', label: 'SLEEP', value: '7.2 H', icon: 'weather-night', color: '#8B5CF6' },
];

const QUICK_ACTIONS = [
  { id: '1', title: 'Book Doctor', icon: 'doctor', color: '#1070FF' },
  { id: '2', title: 'Bed Booking', icon: 'bed-outline', color: '#10B981' },
  { id: '3', title: 'Blood Test', icon: 'needle', color: '#F59E0B' },
  { id: '4', title: 'Pharmacy', icon: 'pill', color: '#EC4899' },
];

const TOP_SPECIALISTS = [
  { id: '1', name: 'Dr. Sarah J.', specialty: 'Cardiologist', rating: '4.9', image: 'https://images.unsplash.com/photo-1559839734-2b71ca197ec2?auto=format&fit=crop&q=80&w=200' },
  { id: '2', name: 'Dr. Mike R.', specialty: 'Neurologist', rating: '4.8', image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200' },
  { id: '3', name: 'Dr. Elena W.', specialty: 'Oncologist', rating: '5.0', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200' },
];

const HomeScreen = () => {
  const { theme, isDarkMode } = useTheme();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const renderSummaryCard = ({ item }) => (
    <View style={[styles.summaryCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      <View style={[styles.summaryIconContainer, { backgroundColor: `${item.color}15` }]}>
        <Icon name={item.icon} size={20} color={item.color} />
      </View>
      <Text style={[styles.summaryValue, { color: theme.text }]}>{item.value}</Text>
      <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>{item.label}</Text>
    </View>
  );

  const renderSpecialist = ({ item }) => (
    <TouchableOpacity style={[styles.specialistCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      <Image source={{ uri: item.image }} style={styles.specialistImage} />
      <View style={styles.specialistInfo}>
        <Text style={[styles.specialistName, { color: theme.text }]}>{item.name}</Text>
        <Text style={[styles.specialistSub, { color: theme.textSecondary }]}>{item.specialty}</Text>
        <View style={styles.ratingRow}>
           <Icon name="star" size={14} color="#FFB300" />
           <Text style={styles.ratingTxt}>{item.rating}</Text>
        </View>
      </View>
      <TouchableOpacity style={[styles.bookSmallBtn, { backgroundColor: `${theme.primary}15` }]}>
         <Icon name="chevron-right" size={20} color={theme.primary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim }}>
          {/* Header */}
          <View style={styles.header}>
             <View>
                <Text style={[styles.welcomeTxt, { color: theme.textSecondary }]}>Health Overview,</Text>
                <Text style={[styles.userTxt, { color: theme.text }]}>John Doe</Text>
             </View>
             <TouchableOpacity style={[styles.profileBtn, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                <View style={[styles.pulseDot, { backgroundColor: theme.primary, borderColor: theme.surface }]} />
                <Icon name="bell-outline" size={24} color={theme.text} />
             </TouchableOpacity>
          </View>

          {/* Biometric Summary */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.primary }]}>BIOMETRIC OVERVIEW</Text>
            <FlatList 
              data={DATA_SUMMARY}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={renderSummaryCard}
              keyExtractor={item => item.id}
            />
          </View>

          {/* Quick Actions Grid */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.primary }]}>QUICK OPERATIONS</Text>
            <View style={styles.gridContainer}>
              {QUICK_ACTIONS.map(action => (
                <TouchableOpacity key={action.id} style={[styles.actionCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                  <Icon name={action.icon} size={30} color={action.color} />
                  <Text style={[styles.actionTitle, { color: theme.text }]}>{action.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Top Specialists */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.primary }]}>TOP SPECIALISTS</Text>
              <TouchableOpacity>
                 <Text style={[styles.viewMore, { color: theme.textSecondary }]}>SEE ALL</Text>
              </TouchableOpacity>
            </View>
            <FlatList 
              data={TOP_SPECIALISTS}
              renderItem={renderSpecialist}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 35,
  },
  welcomeTxt: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
  },
  userTxt: {
    fontSize: 22,
    fontWeight: '800',
    marginTop: 5,
  },
  profileBtn: {
    width: 50,
    height: 50,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  pulseDot: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
  },
  section: {
    marginBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 3,
    marginBottom: 20,
  },
  viewMore: {
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 20,
  },
  summaryCard: {
    width: 120,
    borderRadius: 24,
    padding: 20,
    marginRight: 15,
    borderWidth: 1,
  },
  summaryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    height: 110,
    marginBottom: 15,
    borderRadius: 24,
    padding: 20,
    justifyContent: 'center',
    borderWidth: 1,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 12,
  },
  specialistCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
  },
  specialistImage: {
    width: 65,
    height: 65,
    borderRadius: 18,
  },
  specialistInfo: {
    flex: 1,
    marginLeft: 15,
  },
  specialistName: {
    fontSize: 16,
    fontWeight: '700',
  },
  specialistSub: {
    fontSize: 12,
    marginTop: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  ratingTxt: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
    color: '#FFB300'
  },
  bookSmallBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default HomeScreen;
