import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AboutScreen = () => {
  const yourEmail = 'your.email@example.com'; // Replace with your actual email

  const openEmail = () => {
    Linking.openURL(`mailto:${yourEmail}`);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>About This App</Text>
      <Text style={styles.headerSubtitle}>My Journey, Your Health</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Story</Text>
        <Text style={styles.paragraph}>
          Hi there! I'm the creator of this app, and my motivation comes from a very personal place.
          Like many, I was diagnosed with pre-diabetes. It was a wake-up call, but also an opportunity
          to take control of my health. Through dedicated lifestyle changes – focusing on diet and
          exercise – I've successfully reversed my pre-diabetes.
        </Text>
        <Text style={styles.paragraph}>
          I built this app to share what I've learned and to provide a simple, accessible tool for
          anyone else on a similar journey. You don't need fancy equipment or a gym membership to
          make a difference. Small, consistent steps can lead to big results.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.paragraph}>
          This app aims to empower individuals to prevent or reverse pre-diabetes by providing
          easy-to-understand information, practical exercise routines, and simple dietary guidance.
          We believe that with the right knowledge and motivation, you can take charge of your health.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Important Disclaimer</Text>
        <Text style={[styles.paragraph, styles.disclaimer]}>
          **This app is for informational purposes only and is not intended to be a substitute for
          professional medical advice, diagnosis, or treatment.** Always seek the advice of your
          physician or other qualified health provider with any questions you may have regarding
          a medical condition. Never disregard professional medical advice or delay in seeking it
          because of something you have read on this app.
        </Text>
        <Text style={[styles.paragraph, styles.disclaimer]}>
          Consult with your doctor before starting any new exercise program or making significant
          changes to your diet, especially if you have pre-existing health conditions.
        </Text>
      </View>

      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>Get in Touch</Text>
        <Text style={styles.paragraph}>
          Have questions or feedback? I'd love to hear from you.
        </Text>
        <TouchableOpacity style={styles.contactButton} onPress={openEmail}>
          <Ionicons name="mail-outline" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.contactButtonText}>Email Me</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.versionText}>Version 1.0.0</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
    paddingTop: 10,
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 10,
  },
  disclaimer: {
    color: '#d9534f', // A slightly redder color for warnings
    fontWeight: 'bold',
  },
  contactSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  contactButton: {
    backgroundColor: '#007bff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonIcon: {
    marginRight: 10,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  versionText: {
    fontSize: 12,
    color: '#aaa',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
});

export default AboutScreen;