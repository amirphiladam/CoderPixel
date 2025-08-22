import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [featuredData, setFeaturedData] = useState([]);
  const [recentData, setRecentData] = useState([]);

  // Simulate data fetching
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setFeaturedData([
        {
          id: '1',
          title: 'Welcome to Our App',
          description: 'Get started with our amazing features',
          image: 'https://via.placeholder.com/300x200',
          type: 'featured',
        },
        {
          id: '2',
          title: 'New Update Available',
          description: 'Check out the latest features',
          image: 'https://via.placeholder.com/300x200',
          type: 'featured',
        },
      ]);

      setRecentData([
        {
          id: '1',
          title: 'Recent Activity 1',
          time: '2 hours ago',
          icon: 'notifications',
        },
        {
          id: '2',
          title: 'Recent Activity 2',
          time: '5 hours ago',
          icon: 'calendar',
        },
        {
          id: '3',
          title: 'Recent Activity 3',
          time: '1 day ago',
          icon: 'mail',
        },
      ]);

      setLoading(false);
      setRefreshing(false);
    }, 1500);
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const renderFeaturedItem = ({ item }) => (
    <TouchableOpacity style={styles.featuredCard}>
      <Image source={{ uri: item.image }} style={styles.featuredImage} />
      <View style={styles.featuredContent}>
        <Text style={styles.featuredTitle}>{item.title}</Text>
        <Text style={styles.featuredDescription}>{item.description}</Text>
        <TouchableOpacity style={styles.featuredButton}>
          <Text style={styles.featuredButtonText}>Learn More</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderRecentItem = ({ item }) => (
    <TouchableOpacity style={styles.recentCard}>
      <Ionicons name={item.icon} size={24} color="#0ea5e9" style={styles.recentIcon} />
      <View style={styles.recentContent}>
        <Text style={styles.recentTitle}>{item.title}</Text>
        <Text style={styles.recentTime}>{item.time}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#6b7280" />
    </TouchableOpacity>
  );

  const quickActions = [
    { id: '1', title: 'Profile', icon: 'person', route: '/Account' },
    { id: '2', title: 'Settings', icon: 'settings', route: '/settings' },
    { id: '3', title: 'Support', icon: 'help-circle', route: '/support' },
    { id: '4', title: 'Notifications', icon: 'notifications', route: '/notifications' },
  ];

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0ea5e9" />
        <Text style={styles.loadingText}>Loading your dashboard...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Dashboard</Text>
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={() => router.push('/notifications')}
          >
            <Ionicons name="notifications-outline" size={24} color="#111827" />
          </TouchableOpacity>
        </View>

        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Hello there! 👋</Text>
          <Text style={styles.subtitle}>Welcome back to your dashboard</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.quickActionCard}
                onPress={() => router.push(action.route)}
              >
                <Ionicons name={action.icon} size={24} color="#0ea5e9" />
                <Text style={styles.quickActionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Content */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured</Text>
          <FlatList
            data={featuredData}
            renderItem={renderFeaturedItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredList}
          />
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity onPress={() => router.push('/activity')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={recentData}
            renderItem={renderRecentItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Ionicons name="stats-chart" size={24} color="#0ea5e9" />
            <Text style={styles.statNumber}>42</Text>
            <Text style={styles.statLabel}>Total Items</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="time" size={24} color="#0ea5e9" />
            <Text style={styles.statNumber}>7</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="checkmark-circle" size={24} color="#0ea5e9" />
            <Text style={styles.statNumber}>35</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6b7280',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  notificationButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
  },
  welcomeSection: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  seeAllText: {
    color: '#0ea5e9',
    fontWeight: '500',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    backgroundColor: '#f0f9ff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    textAlign: 'center',
  },
  featuredList: {
    paddingRight: 16,
  },
  featuredCard: {
    width: 280,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featuredImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  featuredContent: {
    padding: 16,
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  featuredDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  featuredButton: {
    backgroundColor: '#0ea5e9',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  featuredButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  recentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    marginBottom: 8,
  },
  recentIcon: {
    marginRight: 12,
  },
  recentContent: {
    flex: 1,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  recentTime: {
    fontSize: 12,
    color: '#6b7280',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
});