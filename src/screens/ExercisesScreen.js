import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectWorkoutPlan, selectIndividualExercise } from '../redux/slices/exerciseSlice'; // Updated imports
import { useNavigation } from '@react-navigation/native';
import { Card, Button, Text, TextInput, IconButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons'; // Assuming you use Ionicons

const ExercisesScreen = () => {
  // Now 'exercises' are actually your workout plans/categories
  const workoutPlans = useSelector((state) => state.exercises.list);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');

  // Filter workout plans by name
  const filteredWorkoutPlans = workoutPlans.filter(plan =>
    plan.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderWorkoutPlanCard = ({ item }) => (
    <Card style={styles.card}>
      <Card.Cover source={item.imageUrl} />
      <View style={styles.overlay}>
        <Text style={styles.imageText}>{item.name}</Text>
      </View>
      <Card.Content>
        <Text variant="titleMedium">{item.name}</Text> 
        <Text>{item.description}</Text>
      </Card.Content>
      <Card.Actions>
        {/* Instruction Button: Navigates to a screen showing exercises within THIS plan */}
        <Button
          onPress={() => {
            dispatch(selectWorkoutPlan(item.id)); // Select the plan
            navigation.navigate('WorkoutPlanOverview', { name: item.name, planId: item.id });
          }}
        >
          View Exercises
        </Button>
        {/* Start Button: Navigates directly to the WorkoutPlayer for THIS plan */}
        <Button
          onPress={() => {
            dispatch(selectWorkoutPlan(item.id)); // Select the plan
            navigation.navigate('WorkoutPlayer', { planId: item.id });
          }}
        >
          Start Workout
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        placeholder="Search workouts..." // Changed placeholder
        value={searchText}
        onChangeText={setSearchText}
        left={<TextInput.Icon icon="magnify" />}
        style={styles.searchInput}
      />
      <FlatList
        data={filteredWorkoutPlans} // Now rendering workout plans
        keyExtractor={(item) => item.id}
        renderItem={renderWorkoutPlanCard}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5', // Consistent background
  },
  searchInput: {
    marginBottom: 15,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    marginBottom: 15,
    position: 'relative',
    borderRadius: 10, // Added border radius for cards
    overflow: 'hidden', // Ensures image corners are rounded
  },
  overlay: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    zIndex: 1, // Ensure text is above image
  },
  imageText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18, // Slightly larger text on image
  },
});

export default ExercisesScreen;