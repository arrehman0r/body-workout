import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, BackHandler, Alert, Vibration } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { recordExerciseCompletion } from '../redux/slices/progressSlice';
import * as Speech from 'expo-speech'; // Ensure you have installed 'expo-speech'
import { Image } from 'expo-image';

const WorkoutPlayerScreen = ({ route, navigation }) => {
  const { planId } = route.params;
//   const navigation = useNavigation();
  const dispatch = useDispatch();

  // Get all workout plans/categories from exerciseSlice
  const allWorkoutPlans = useSelector((state) => state.exercises.list);
  const selectedPlan = allWorkoutPlans.find((plan) => plan.id === planId);

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRestTime, setIsRestTime] = useState(false);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);

  const timerRef = useRef(null); // For the main countdown timer
  const nextExerciseTimeoutRef = useRef(null); // For handling transition after countdown

  // Get current exercise data for display
  const currentPlanExercise = selectedPlan?.exercises[currentExerciseIndex];
  // Find the full exercise data (including GIF URL) from the plan's exercises array
  const currentFullExercise = currentPlanExercise; // Already directly accessible as it's nested

  // Get next exercise data for "Up Next" display
  const nextPlanExercise = selectedPlan?.exercises[currentExerciseIndex + 1];
  const nextFullExercise = nextPlanExercise; // Already directly accessible

  // --- TTS (Text-to-Speech) Functionality ---
  const speak = (text) => {
    if (Speech.isSpeakingAsync()) {
      Speech.stop(); // Stop previous speech if any
    }
    Speech.speak(text, {
      rate: 0.9,
      pitch: 1.0,
      language: 'en-US'
    });
  };

  const vibrate = () => {
    Vibration.vibrate(500); // Vibrate for 500ms
  };


  // --- Workout Control Functions ---
  const startWorkout = useCallback(() => {
    if (!selectedPlan || selectedPlan.exercises.length === 0) {
      Alert.alert('Error', 'No exercises found in this workout plan.');
      navigation.goBack();
      return;
    }
    setIsWorkoutActive(true);
    setWorkoutCompleted(false);
    setCurrentExerciseIndex(0);
    setIsRestTime(false);
    const firstExerciseDuration = currentPlanExercise?.durationSeconds || 30; // Default to 30s if not specified
    setTimeLeft(firstExerciseDuration);
    speak(`Starting workout. First exercise: ${currentFullExercise?.name || 'Unknown'}. ${firstExerciseDuration} seconds.`);
    vibrate();
  }, [selectedPlan, navigation, currentPlanExercise, currentFullExercise]);


  const pauseWorkout = () => {
    clearInterval(timerRef.current);
    clearTimeout(nextExerciseTimeoutRef.current);
    setIsWorkoutActive(false);
    speak('Workout paused.');
  };

  const resumeWorkout = () => {
    if (workoutCompleted) {
      startWorkout(); // Restart if finished
      return;
    }
    setIsWorkoutActive(true);
    speak('Workout resumed.');
  };

  const resetWorkout = () => {
    clearInterval(timerRef.current);
    clearTimeout(nextExerciseTimeoutRef.current);
    setIsWorkoutActive(false);
    setWorkoutCompleted(false);
    setCurrentExerciseIndex(0);
    const firstExerciseDuration = selectedPlan?.exercises[0]?.durationSeconds || 30;
    setTimeLeft(firstExerciseDuration);
    setIsRestTime(false);
    speak('Workout reset.');
  };

  // --- Main Workout Timer Logic ---
  useEffect(() => {
    if (!isWorkoutActive || workoutCompleted || !selectedPlan) {
      clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          return handleNextStep(); // Transition to next exercise or rest
        }
        if (prevTime <= 5 && prevTime > 0 && !isRestTime) { // Countdown for last few seconds of active exercise
            speak(prevTime.toString());
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current); // Cleanup on unmount or re-render
  }, [isWorkoutActive, selectedPlan, workoutCompleted, currentExerciseIndex, isRestTime]);


  // --- Handler for moving to next step (rest or next exercise) ---
  const handleNextStep = useCallback(() => {
    // If it was an exercise, transition to rest
    if (!isRestTime) {
      dispatch(recordExerciseCompletion(currentPlanExercise.id)); // Record completion of this exercise
      const restDuration = 30; // 30 seconds rest after each exercise as per request
      if (restDuration > 0 && currentExerciseIndex < selectedPlan.exercises.length - 1) {
        setIsRestTime(true);
        setTimeLeft(restDuration);
        speak(`Rest. ${restDuration} seconds.`);
        vibrate();
      } else {
        // No rest, or last exercise, proceed directly to next exercise or finish
        moveToNextExerciseOrFinish();
      }
    } else {
      // If it was rest time, transition to next exercise
      moveToNextExerciseOrFinish();
    }
  }, [isRestTime, selectedPlan, currentExerciseIndex, dispatch, currentPlanExercise]);


  const moveToNextExerciseOrFinish = useCallback(() => {
    setCurrentExerciseIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex < selectedPlan.exercises.length) {
        const nextEx = selectedPlan.exercises[nextIndex];
        setIsRestTime(false);
        const nextExerciseDuration = nextEx.durationSeconds || 30; // Default to 30s
        setTimeLeft(nextExerciseDuration);
        speak(`Next exercise: ${nextEx?.name || 'Unknown'}. ${nextExerciseDuration} seconds.`);
        vibrate();
        return nextIndex;
      } else {
        // Workout finished
        setWorkoutCompleted(true);
        setIsWorkoutActive(false);
        clearInterval(timerRef.current);
        speak('Workout complete! Great job!');
        vibrate();
        Alert.alert('Workout Complete!', 'You finished the plan! Keep up the great work!', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
        return prevIndex; // Stay on last index
      }
    });
  }, [selectedPlan, navigation]);


  // Handle hardware back button during workout
useFocusEffect(
  useCallback(() => {
    const onBackPress = () => {
      if (isWorkoutActive && !workoutCompleted) {
        Alert.alert(
          'Exit Workout?',
          'Are you sure you want to stop this workout?',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Exit',
              onPress: () => {
                clearInterval(timerRef.current);
                clearTimeout(nextExerciseTimeoutRef.current);
                setIsWorkoutActive(false);
                navigation.goBack();
              },
            },
          ],
          { cancelable: false }
        );
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => backHandler.remove(); // ✅ Correct cleanup
  }, [isWorkoutActive, workoutCompleted, navigation])
);


  // Initial render when the component mounts or planId changes
  useEffect(() => {
    if (selectedPlan && selectedPlan.exercises.length > 0) {
      // Ensure the first exercise time is set correctly on initial load
      const firstExerciseDuration = selectedPlan.exercises[0].durationSeconds || 30;
      setTimeLeft(firstExerciseDuration);
      setCurrentExerciseIndex(0); // Reset index for fresh start
      setIsRestTime(false); // Start with exercise, not rest
      setWorkoutCompleted(false); // Reset completion status
    } else {
        // Handle case where plan is not found or has no exercises
        Alert.alert("Error", "Workout plan not found or is empty.", [{text: "OK", onPress: () => navigation.goBack()}]);
    }
    return () => {
        // Cleanup on unmount
        clearInterval(timerRef.current);
        clearTimeout(nextExerciseTimeoutRef.current);
    };
  }, [planId, selectedPlan, navigation]); // Depend on planId and selectedPlan to re-initialize

  if (!selectedPlan) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading workout plan...</Text>
      </View>
    );
  }

  if (workoutCompleted) {
    return (
      <View style={styles.completionContainer}>
        <Ionicons name="trophy-outline" size={80} color="#28a745" />
        <Text style={styles.completionTitle}>Workout Complete!</Text>
        <Text style={styles.completionMessage}>You crushed the "{selectedPlan.name}" plan!</Text>
        <TouchableOpacity style={styles.backToPlansButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backToPlansButtonText}>Back to Workouts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={startWorkout}>
          <Text style={styles.resetButtonText}>Do it again!</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="close-circle-outline" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.planName}>{selectedPlan.name}</Text>
        <View style={styles.placeholder}></View> {/* For alignment */}
      </View>

      <View style={styles.gifContainer}>
        {isRestTime ? (
            <View style={styles.restPlaceholder}>
                <Ionicons name="hourglass-outline" size={80} color="#eee" />
                <Text style={styles.restText}>REST</Text>
                {nextFullExercise && (
                    <View style={styles.nextUpDuringRest}>
                        <Text style={styles.nextUpLabel}>NEXT UP:</Text>
                        <Text style={styles.nextUpName}>{nextFullExercise.name}</Text>
                    </View>
                )}
            </View>
        ) : (
            currentFullExercise && (currentFullExercise.gifUrl || currentFullExercise.imageUrl) ? (
            <Image
                source={currentFullExercise.gifUrl ? currentFullExercise.gifUrl : { uri: currentFullExercise.imageUrl }}
                style={styles.exerciseGif}
                resizeMode="contain"
            />
            ) : (
            <View style={styles.noGifPlaceholder}>
                <Ionicons name="alert-circle-outline" size={50} color="#ccc" />
                <Text style={styles.noGifText}>No visual for this exercise</Text>
            </View>
            )
        )}
      </View>

      <Text style={styles.exerciseName}>
        {isRestTime ? 'RESTING' : currentFullExercise?.name || 'Unknown Exercise'}
      </Text>
      <Text style={styles.instructionText}>
        {isRestTime ? 'Prepare for the next exercise...' : currentFullExercise?.instructions[0] || 'Follow the visual instructions.'}
      </Text>

      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</Text>
      </View>

      <View style={styles.controls}>
        {!isWorkoutActive && !workoutCompleted ? (
          <TouchableOpacity style={styles.controlButton} onPress={startWorkout}>
            <Ionicons name="play-circle" size={50} color="#28a745" />
            <Text style={styles.controlButtonText}>START</Text>
          </TouchableOpacity>
        ) : isWorkoutActive ? (
          <TouchableOpacity style={styles.controlButton} onPress={pauseWorkout}>
            <Ionicons name="pause-circle" size={50} color="#ffc107" />
            <Text style={styles.controlButtonText}>PAUSE</Text>
          </TouchableOpacity>
        ) : ( // When paused
          <TouchableOpacity style={styles.controlButton} onPress={resumeWorkout}>
            <Ionicons name="play-circle" size={50} color="#28a745" />
            <Text style={styles.controlButtonText}>RESUME</Text>
          </TouchableOpacity>
        )}

        {/* Skip button */}
        <TouchableOpacity style={styles.skipButton} onPress={() => handleNextStep()}>
          <Ionicons name="play-skip-forward-outline" size={30} color="#6c757d" />
          <Text style={styles.skipButtonText}>SKIP</Text>
        </TouchableOpacity>
      </View>

      {nextFullExercise && !isRestTime && ( // Show "Up Next" only when not resting
        <View style={styles.upNextContainer}>
          <Text style={styles.upNextLabel}>Up Next:</Text>
          <Text style={styles.upNextName}>{nextFullExercise.name}</Text>
          {nextFullExercise.imageUrl && <Image source={nextFullExercise.imageUrl} style={styles.upNextImage} />}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333', // Dark background for workout feel
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50, // For status bar
    marginBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  planName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  placeholder: {
    width: 30, // To balance the back button space
  },
  gifContainer: {
    width: '90%',
    height: 250,
    backgroundColor: '#555',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 20,
  },
  exerciseGif: {
    width: '100%',
    height: '100%',
  },
  noGifPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noGifText: {
    color: '#ccc',
    marginTop: 10,
    fontSize: 16,
  },
  restPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  restText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#eee',
    marginTop: 10,
  },
  nextUpDuringRest: {
    marginTop: 20,
    alignItems: 'center',
  },
  nextUpLabel: {
    color: '#ccc',
    fontSize: 16,
  },
  nextUpName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  exerciseName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 18,
    color: '#eee',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  timerContainer: {
    backgroundColor: '#fff',
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  timerText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#333',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  controlButton: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  controlButtonText: {
    color: '#fff',
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },
  skipButton: {
    position: 'absolute',
    right: 20,
    alignItems: 'center',
    bottom: 0, // Align with controls row
  },
  skipButtonText: {
    color: '#6c757d',
    fontSize: 12,
    marginTop: 2,
  },
  upNextContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  upNextLabel: {
    color: '#fff',
    fontSize: 14,
    marginRight: 10,
  },
  upNextName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  upNextImage: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginLeft: 10,
    resizeMode: 'cover',
  },
  // Workout Completion Styles
  completionContainer: {
    flex: 1,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  completionTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
  completionMessage: {
    fontSize: 18,
    color: '#eee',
    textAlign: 'center',
    marginBottom: 40,
  },
  backToPlansButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  backToPlansButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WorkoutPlayerScreen;