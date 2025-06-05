import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { clearSelectedWorkoutPlan, selectIndividualExercise } from '../redux/slices/exerciseSlice'; // Updated imports
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-paper'; // Import Button from react-native-paper
import { Image } from 'expo-image';

const WorkoutPlanOverviewScreen = ({ route, navigation }) => {
    // Access the selected plan from Redux state
    const selectedPlan = useSelector((state) => state.exercises.selectedWorkoutPlan);
    const dispatch = useDispatch();
    //   const navigation = useNavigation();

    // Clear selected plan when leaving the screen
    useEffect(() => {
        return () => {
            dispatch(clearSelectedWorkoutPlan());
        };
    }, [dispatch]);

    // If selectedPlan is not found (e.g., direct navigation without selecting)
    if (!selectedPlan) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Workout plan not found. Please go back and select a plan.</Text>
                <Button mode="contained" onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
                    Go Back
                </Button>
            </View>
        );
    }

    const handleStartWorkout = () => {
        // Navigate to the WorkoutPlayer screen, passing the plan ID
        navigation.navigate('WorkoutPlayer', { planId: selectedPlan.id });
    };

    const handleViewExerciseDetail = (exerciseId, exerciseName) => {
        dispatch(selectIndividualExercise(exerciseId));
        navigation.navigate('ExerciseDetail', { name: exerciseName });
    };


    return (
        <ScrollView style={styles.container}>
            <Text style={styles.planTitle}>{selectedPlan.name}</Text>
            <Text style={styles.planDescription}>{selectedPlan.description}</Text>

            {/* Overview Card (e.g., Total Exercises, Duration) */}
            <View style={styles.overviewCard}>
                <View style={styles.overviewItem}>
                    <Ionicons name="barbell-outline" size={24} color="#007bff" />
                    <Text style={styles.overviewText}>{selectedPlan.exercises.length} Exercises</Text>
                </View>
                {/* You could calculate total duration here if each exercise in your plan had a 'duration' property */}
                {/* <View style={styles.overviewItem}>
          <Ionicons name="timer-outline" size={24} color="#28a745" />
          <Text style={styles.overviewText}>~{calculateTotalDuration(selectedPlan.exercises)} Min</Text>
        </View> */}
            </View>

            <Text style={styles.sectionHeader}>Exercises in this plan:</Text>
            {selectedPlan.exercises.map((exercise, index) => (
                <TouchableOpacity
                    key={exercise.id}
                    style={styles.exerciseItem}
                    onPress={() => handleViewExerciseDetail(exercise.id, exercise.name)}
                >
                    {exercise.imageUrl && (
                        <Image source={exercise.imageUrl} style={styles.exerciseThumbnail} />
                    )}
                    <View style={styles.exerciseInfo}>
                        <Text style={styles.exerciseName}>
                            {index + 1}. {exercise.name ? String(exercise.name) : 'Unnamed'}
                        </Text>

                        {/* You can add duration here if you put it in exercise data */}
                        {/* <Text style={styles.exerciseDuration}>{exercise.duration}s</Text> */}
                        <Text style={styles.exerciseInstructionShort}>{exercise.instructions[0]}</Text> {/* First instruction as short description */}
                    </View>
                    <Ionicons name="chevron-forward-outline" size={24} color="#888" />
                </TouchableOpacity>
            ))}

            <Button
                mode="contained"
                icon="play"
                onPress={handleStartWorkout}
                style={styles.startButton}
                labelStyle={styles.startButtonLabel}
            >
                Start Workout
            </Button>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 15,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    planTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    planDescription: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    overviewCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    overviewItem: {
        alignItems: 'center',
    },
    overviewText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
        color: '#555',
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 5,
    },
    exerciseItem: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    exerciseThumbnail: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 15,
        contentFit: 'cover',
    },
    exerciseInfo: {
        flex: 1,
    },
    exerciseName: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#333',
    },
    exerciseDuration: {
        fontSize: 14,
        color: '#007bff',
        marginTop: 3,
    },
    exerciseInstructionShort: {
        fontSize: 13,
        color: '#777',
        marginTop: 2,
    },
    startButton: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 10, // Adjust padding
        borderRadius: 30, // Make it more rounded
        backgroundColor: '#28a745', // Green start button
    },
    startButtonLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default WorkoutPlanOverviewScreen;