import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'; // npm install expo-linear-gradient
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({navigation}) => {
 
  const motivationalMessages = [
    "Every step counts. You've got this!",
    "Small changes, big impact. Keep going!",
    "Your health is your greatest wealth. Invest in it!",
    "Reversing pre-diabetes is empowering. Start now!",
    "Consistency is key. Celebrate your progress!",
  ];

  const dailyTip = "Aim for at least 30 minutes of brisk walking most days of the week. It significantly helps blood sugar control!";

  return (
    <LinearGradient
      colors={['#e0f7fa', '#ffffff']} // Light blue top to white bottom
      style={styles.gradientBackground}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome, Health Champion!</Text>
          <Text style={styles.tagline}>{motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]}</Text>
        </View>

        <View style={styles.cardContainer}>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Exercises')}>
            <Ionicons name="walk" size={40} color="#007bff" />
            <Text style={styles.cardTitle}>Start Your Workout</Text>
            <Text style={styles.cardSubtitle}>Browse exercises & get moving.</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Learn')}>
            <Ionicons name="book" size={40} color="#28a745" />
            <Text style={styles.cardTitle}>Learn & Understand</Text>
            <Text style={styles.cardSubtitle}>Knowledge is power in reversal.</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Meal Plan')}>
            <Ionicons name="nutrition" size={40} color="#fd7e14" />
            <Text style={styles.cardTitle}>Healthy Meal Ideas</Text>
            <Text style={styles.cardSubtitle}>Simple guidance for better eating.</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Progress')}>
            <Ionicons name="analytics" size={40} color="#6f42c1" />
            <Text style={styles.cardTitle}>Track Your Progress</Text>
            <Text style={styles.cardSubtitle}>See how far you've come!</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tipBox}>
          <Text style={styles.tipTitle}>Daily Health Tip</Text>
          <Text style={styles.tipText}>{dailyTip}</Text>
        </View>

        <TouchableOpacity style={styles.aboutButton} onPress={() => navigation.navigate('About')}>
          <Text style={styles.aboutButtonText}>About This App & My Story</Text>
        </TouchableOpacity>

      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingTop: 50, // Adjust for status bar
    alignItems: 'center',
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  cardContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  card: {
    width: '46%', // Approx half with some spacing
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
    marginTop: 4,
  },
  tipBox: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 10,
  },
  tipText: {
    fontSize: 16,
    color: '#555',
  },
  aboutButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  aboutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;