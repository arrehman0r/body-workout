import { createSlice } from '@reduxjs/toolkit';

const initialWorkoutPlans = [ // Renamed from initialExercises to reflect content
  {
    id: 'cat_001',
    category: 'Home Workout', // You can remove this 'category' key if 'name' is sufficient for the plan title
    name: 'Home Workout',
    description: 'Full body exercises you can do at home without any equipment.',
    imageUrl: require('../../../assets/excerciseBanners/homeWorkout.jpg'), // Ensure this path is correct

    exercises: [ // These are the specific exercises for this plan
      {
        id: 'hw_001',
        name: 'Bodyweight Squat',
        imageUrl: require('../../../assets/excerciseBanners/homeWorkout.jpg'), // Placeholder, ideally specific to exercise
        gifUrl: require('../../../assets/excerciseGifs/pushUps.gif'), 
        instructions: [
          'Stand with feet shoulder-width apart, toes slightly out.',
          'Lower hips as if sitting in a chair.',
          'Push through your heels to return to start.',
        ],
        benefits: ['Strengthens legs and glutes', 'Improves mobility'],
        tips: ['Keep core engaged.', 'Avoid letting knees cave in.'],
      },
      {
        id: 'hw_002',
        name: 'Push Ups',
        imageUrl: require('../../../assets/excerciseBanners/homeWorkout.jpg'),
        gifUrl: require('../../../assets/excerciseGifs/pushUps.gif'), // Use your local GIF
        instructions: [
          'Place hands slightly wider than shoulders.',
          'Lower chest close to floor.',
          'Push back to starting position.',
        ],
        benefits: ['Builds upper body strength', 'Engages core'],
        tips: ['Keep body in a straight line.', 'Don’t flare elbows.'],
      },
      {
        id: 'hw_003',
        name: 'Leg Raises',
        imageUrl: require('../../../assets/excerciseBanners/homeWorkout.jpg'),
        gifUrl: require('../../../assets/excerciseGifs/pushUps.gif'), instructions: [
          'Lie on your back, legs extended.',
          'Lift both legs up to 90 degrees.',
          'Lower slowly without touching the floor.',
        ],
        benefits: ['Targets lower abs', 'Improves control'],
        tips: ['Keep back flat on the ground.', 'Move slowly.'],
      },
      // You can add more exercises here for the Home Workout plan
      // E.g., a stretch like 'hw_004':
      // {
      //   id: 'hw_004',
      //   name: 'Overhead Arm Stretch',
      //   imageUrl: require('../../../assets/excerciseBanners/homeWorkout.jpg'),
      //   gifUrl: require('../../../assets/excerciseGifs/arm_stretch.gif'),
      //   instructions: [
      //     'Stand or sit tall.',
      //     'Interlace your fingers and raise arms overhead.',
      //     'Reach towards ceiling, feeling a stretch.',
      //   ],
      //   benefits: ['Improves shoulder flexibility'],
      //   tips: ['Breathe deeply.'],
      // },
    ],
  },
  {
    id: 'cat_002',
    category: 'Abs Workout', // Can be removed if 'name' is the main title
    name: 'Abs Workout',
    description: 'Focused exercises to strengthen and define abdominal muscles.',
    imageUrl: require('../../../assets/excerciseBanners/homeWorkout.jpg'),

    exercises: [
      {
        id: 'abs_001',
        name: 'Crunches',
        imageUrl: require('../../../assets/excerciseBanners/homeWorkout.jpg'),
        gifUrl: require('../../../assets/excerciseGifs/pushUps.gif'), instructions: [
          'Lie on your back with knees bent.',
          'Lift your shoulders off the ground using your abs.',
          'Lower back down slowly.',
        ],
        benefits: ['Strengthens core', 'Tones upper abs'],
        tips: ['Avoid pulling your neck.', 'Exhale while lifting.'],
      },
      {
        id: 'abs_002',
        name: 'Plank',
        imageUrl: require('../../../assets/excerciseBanners/homeWorkout.jpg'),
       gifUrl: require('../../../assets/excerciseGifs/pushUps.gif'),      instructions: [
          'Get into forearm plank position.',
          'Keep your body in a straight line.',
          'Hold the position for 30–60 seconds.',
        ],
        benefits: ['Improves core stability', 'Works full core'],
        tips: ['Don’t let hips drop.', 'Engage your glutes.'],
      },
    ],
  },
  {
    id: 'cat_003',
    category: '7 Minute Workout', // Can be removed if 'name' is the main title
    name: '7 Minute Workout',
    description: 'A scientifically designed circuit training workout done in 7 minutes.',
    imageUrl: require('../../../assets/excerciseBanners/homeWorkout.jpg'),

    exercises: [
      {
        id: '7m_001',
        name: 'Jumping Jacks',
        imageUrl: require('../../../assets/excerciseBanners/homeWorkout.jpg'),
        gifUrl: require('../../../assets/excerciseGifs/pushUps.gif'), instructions: [
          'Jump with legs spread and hands overhead.',
          'Return to starting position and repeat.',
        ],
        benefits: ['Cardio warm-up', 'Increases heart rate'],
        tips: ['Land softly.', 'Keep arms straight.'],
      },
      {
        id: '7m_002',
        name: 'Wall Sit',
        imageUrl: require('../../../assets/excerciseBanners/homeWorkout.jpg'),
        gifUrl: require('../../../assets/excerciseGifs/pushUps.gif'), instructions: [
          'Lean against a wall with knees at 90 degrees.',
          'Hold the position for 30 seconds.',
        ],
        benefits: ['Strengthens thighs', 'Improves endurance'],
        tips: ['Keep back flat on wall.', 'Don’t rest hands on thighs.'],
      },
      {
        id: '7m_003',
        name: 'High Knees Running in Place',
        imageUrl: require('../../../assets/excerciseBanners/homeWorkout.jpg'),
        gifUrl: require('../../../assets/excerciseGifs/pushUps.gif'), instructions: [
          'Run in place lifting knees high towards chest.',
          'Pump arms to maintain rhythm.',
        ],
        benefits: ['Improves cardio', 'Activates core'],
        tips: ['Keep a quick pace.', 'Land on balls of your feet.'],
      },
    ],
  },
];

const exerciseSlice = createSlice({
  name: 'exercises',
  initialState: {
    // This now holds the list of workout plans/categories
    list: initialWorkoutPlans,
    // This will hold the *currently selected plan object* (e.g., 'Home Workout' plan)
    selectedWorkoutPlan: null,
    // This will hold the *currently selected individual exercise object* when viewing details
    // (e.g., if you click into a 'Bodyweight Squat' from a list)
    selectedIndividualExercise: null,
  },
  reducers: {
    // Action to select a workout plan/category
    selectWorkoutPlan: (state, action) => {
      // Find the plan based on its ID (e.g., 'cat_001')
      state.selectedWorkoutPlan = state.list.find(plan => plan.id === action.payload);
      state.selectedIndividualExercise = null; // Clear individual exercise selection
    },
    clearSelectedWorkoutPlan: (state) => {
      state.selectedWorkoutPlan = null;
    },
    // Action to select an individual exercise (e.g., from 'Browse All Exercises' list)
    selectIndividualExercise: (state, action) => {
      // You'll need to flatten the list to find an individual exercise by its ID
      const allIndividualExercises = state.list.flatMap(plan => plan.exercises);
      state.selectedIndividualExercise = allIndividualExercises.find(ex => ex.id === action.payload);
      state.selectedWorkoutPlan = null; // Clear workout plan selection
    },
    clearSelectedIndividualExercise: (state) => {
      state.selectedIndividualExercise = null;
    },
  },
});

export const {
  selectWorkoutPlan,
  clearSelectedWorkoutPlan,
  selectIndividualExercise, // Export new action
  clearSelectedIndividualExercise, // Export new action
} = exerciseSlice.actions;

export default exerciseSlice.reducer;