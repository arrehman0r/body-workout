import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { clearSelectedIndividualExercise } from '../redux/slices/exerciseSlice'; // Updated import
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper'; // Assuming you're using react-native-paper buttons

const ExerciseDetailScreen = ({ route }) => {
  // Use selectedIndividualExercise from Redux state
  const selectedExercise = useSelector((state) => state.exercises.selectedIndividualExercise);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Clear selected exercise when leaving the screen
  useEffect(() => {
    return () => {
      dispatch(clearSelectedIndividualExercise());
    };
  }, [dispatch]);

  if (!selectedExercise) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Exercise not found. Please select an exercise from the list.</Text>
        <Button mode="contained" onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
          Go Back
        </Button>
      </View>
    );
  }

  // Handle playing the GIF
  const gifSource = selectedExercise.gifUrl
    ? selectedExercise.gifUrl // Local require() path
    : (selectedExercise.imageUrl ? { uri: selectedExercise.imageUrl } : null); // Fallback to imageUrl as URI

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{selectedExercise.name}</Text>
      <Text style={styles.category}>{selectedExercise.category}</Text>

      {gifSource ? (
        <Image source={gifSource} style={styles.exerciseGif} resizeMode="contain" />
      ) : (
        <View style={styles.noGifPlaceholder}>
          <Ionicons name="image-outline" size={80} color="#ccc" />
          <Text style={styles.noGifText}>No GIF available for this exercise</Text>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Instructions</Text>
        {selectedExercise.instructions.map((instruction, index) => (
          <Text key={index} style={styles.listItem}>
            {`${index + 1}. ${instruction}`}
          </Text>
        ))}
      </View>

      {selectedExercise.benefits && selectedExercise.benefits.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Benefits</Text>
          {selectedExercise.benefits.map((benefit, index) => (
            <Text key={index} style={styles.listItem}>
              {`• ${benefit}`}
            </Text>
          ))}
        </View>
      )}

      {selectedExercise.tips && selectedExercise.tips.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tips</Text>
          {selectedExercise.tips.map((tip, index) => (
            <Text key={index} style={styles.listItem}>
              {`• ${tip}`}
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
    textAlign: 'center',
  },
  category: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  exerciseGif: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#f0f0f0', // Placeholder background
  },
  noGifPlaceholder: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 20,
  },
  noGifText: {
    color: '#999',
    marginTop: 10,
    fontSize: 16,
  },
  section: {
    marginBottom: 20,
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
  listItem: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
    lineHeight: 24,
  },
});

export default ExerciseDetailScreen;