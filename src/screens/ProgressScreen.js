import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

const ProgressScreen = () => {
  const completedExercises = useSelector((state) => state.progress.completedExercises);
  const lastCompletedDate = useSelector((state) => state.progress.lastCompletedDate);
  const exercisesList = useSelector((state) => state.exercises.list); // To get exercise names

  const totalCompletions = Object.values(completedExercises).flat().length;

  const today = new Date().toISOString().slice(0, 10);
  const isExercisedToday = lastCompletedDate === today;

  const getExerciseNameById = (id) => {
    const exercise = exercisesList.find(ex => ex.id === id);
    return exercise ? exercise.name : `Unknown Exercise (ID: ${id})`;
  };

  // Function to get the most recent completion for each exercise
  const getMostRecentCompletions = () => {
    const recentCompletions = [];
    for (const exerciseId in completedExercises) {
      if (completedExercises[exerciseId].length > 0) {
        const timestamps = completedExercises[exerciseId];
        const mostRecentTimestamp = timestamps[timestamps.length - 1]; // Last element is most recent
        recentCompletions.push({
          exerciseId,
          timestamp: mostRecentTimestamp,
          name: getExerciseNameById(exerciseId),
        });
      }
    }
    // Sort by most recent timestamp, descending
    return recentCompletions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  };

  const recentExercises = getMostRecentCompletions().slice(0, 5); // Show top 5 recent

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Your Progress</Text>
      <Text style={styles.headerSubtitle}>Every step you take helps you reach your goals!</Text>

      <View style={styles.card}>
        <View style={styles.metricRow}>
          <Ionicons name="checkmark-done-circle-outline" size={30} color="#007bff" />
          <Text style={styles.metricLabel}>Total Exercises Completed:</Text>
          <Text style={styles.metricValue}>{totalCompletions}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.metricRow}>
          <Ionicons name="calendar-outline" size={30} color="#28a745" />
          <Text style={styles.metricLabel}>Exercised Today:</Text>
          <Text style={[styles.metricValue, isExercisedToday ? styles.greenText : styles.redText]}>
            {isExercisedToday ? 'Yes!' : 'Not yet'}
          </Text>
        </View>
        {lastCompletedDate && (
          <Text style={styles.lastDateText}>Last recorded: {new Date(lastCompletedDate).toLocaleDateString()}</Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Recent Completions</Text>
        {totalCompletions > 0 ? (
          recentExercises.map((completion, index) => (
            <View key={index} style={styles.recentItem}>
              <Ionicons name="fitness-outline" size={18} color="#6c757d" />
              <Text style={styles.recentText}>
                <Text style={styles.recentExerciseName}>{completion.name}</Text> on{' '}
                {new Date(completion.timestamp).toLocaleDateString()} at{' '}
                {new Date(completion.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noProgressText}>No exercises completed yet. Start your journey!</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
    paddingTop: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  metricLabel: {
    fontSize: 18,
    color: '#555',
    flex: 1, // Allows text to take available space
    marginLeft: 10,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  greenText: {
    color: '#28a745', // Green for 'Yes'
  },
  redText: {
    color: '#dc3545', // Red for 'Not yet'
  },
  lastDateText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'right',
    marginTop: 5,
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  recentText: {
    fontSize: 15,
    color: '#555',
    marginLeft: 10,
    flex: 1,
  },
  recentExerciseName: {
    fontWeight: 'bold',
    color: '#007bff',
  },
  noProgressText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    paddingVertical: 10,
  },
});

export default ProgressScreen;