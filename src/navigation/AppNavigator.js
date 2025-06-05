import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Screens
import HomeScreen from '../screens/HomeScreen';
import LearnScreen from '../screens/LearnScreen';
import ArticleDetailScreen from '../screens/ArticleDetailScreen';

// Exercise/Workout Screens
import ExercisesScreen from '../screens/ExercisesScreen'; // Main menu screen
import ExerciseDetailScreen from '../screens/ExerciseDetailScreen'; // For individual exercises
import WorkoutPlanOverviewScreen from '../screens/WorkoutPlanOverviewScreen'; // NEW: Shows exercises in a plan before starting
import WorkoutPlayerScreen from '../screens/WorkoutPlayerScreen'; // NEW: The actual workout player

import MealPlanScreen from '../screens/MealPlanScreen';
import ProgressScreen from '../screens/ProgressScreen';
import AboutScreen from '../screens/AboutScreen';

const Tab = createBottomTabNavigator();
const LearnStack = createStackNavigator();
const ExerciseStack = createStackNavigator();

function LearnStackScreen() {
  return (
    <LearnStack.Navigator>
      <LearnStack.Screen
        name="LearnOverview"
        component={LearnScreen}
        options={{ title: 'Learn & Grow' }}
      />
      <LearnStack.Screen
        name="ArticleDetail"
        component={ArticleDetailScreen}
        options={({ route }) => ({ title: route.params.title || 'Article' })}
      />
    </LearnStack.Navigator>
  );
}

function ExerciseStackScreen() {
  return (
    <ExerciseStack.Navigator>
      <ExerciseStack.Screen
        name="ExerciseMain" // This will be your 'Home Workout' & 'Browse All' menu
        component={ExercisesScreen}
        options={{ title: 'Workouts' }}
      />
      <ExerciseStack.Screen
        name="WorkoutPlanOverview" // NEW: To show details of a selected plan (e.g., Home Workout)
        component={WorkoutPlanOverviewScreen}
        options={({ route }) => ({ title: route.params.name || 'Workout Plan' })}
      />
      <ExerciseStack.Screen
        name="WorkoutPlayer" // NEW: The actual workout player screen
        component={WorkoutPlayerScreen}
        options={{ headerShown: false }} // Hide header for immersive workout
      />
      <ExerciseStack.Screen
        name="ExerciseDetail" // For individual exercise details (if you have a 'Browse All Exercises' path)
        component={ExerciseDetailScreen}
        options={({ route }) => ({ title: route.params.name || 'Exercise' })}
      />
    </ExerciseStack.Navigator>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Learn') {
              iconName = focused ? 'book' : 'book-outline';
            } else if (route.name === 'Exercises') {
              iconName = focused ? 'walk' : 'walk-outline'; // Or 'barbell-outline' etc.
            } else if (route.name === 'Meal Plan') {
              iconName = focused ? 'nutrition' : 'nutrition-outline';
            } else if (route.name === 'Progress') {
              iconName = focused ? 'analytics' : 'analytics-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown: false, // Hide header for all tabs to manage it per-stack
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Learn" component={LearnStackScreen} />
        <Tab.Screen name="Exercises" component={ExerciseStackScreen} />
        <Tab.Screen name="Meal Plan" component={MealPlanScreen} />
        <Tab.Screen name="Progress" component={ProgressScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;