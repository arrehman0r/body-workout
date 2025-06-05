import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

// Hardcoded Meal Plan Data
const mealPlans = [
  {
    id: 'mp1',
    title: 'Principles of Healthy Eating for Pre-diabetes',
    imageUrl: 'https://images.unsplash.com/photo-1542842410-639a04a58957?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: [
      'Focus on whole, unprocessed foods like fruits, vegetables, whole grains, lean proteins, and healthy fats.',
      'Limit added sugars, sugary drinks, and refined carbohydrates (white bread, white rice, pastries).',
      'Choose low glycemic index (GI) foods to help manage blood sugar spikes.',
      'Practice portion control. Even healthy foods can impact blood sugar if consumed in large amounts.',
      'Stay hydrated with water. Avoid fruit juices, which are often high in sugar.',
      'Eat regular meals to help stabilize blood sugar levels throughout the day.',
    ],
  },
  {
    id: 'mp2',
    title: 'Sample Day Meal Plan',
    imageUrl: 'https://images.unsplash.com/photo-1627914807027-e4be1b351187?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: [
      '**Breakfast:** Oatmeal (steel-cut or rolled oats) with berries and a sprinkle of nuts. Avoid instant oats.',
      '**Mid-morning Snack:** A small apple with a tablespoon of almond butter.',
      '**Lunch:** Large salad with mixed greens, grilled chicken or chickpeas, and a vinaigrette dressing. Add plenty of non-starchy vegetables.',
      '**Afternoon Snack:** A handful of unsalted almonds or Greek yogurt.',
      '**Dinner:** Baked salmon with steamed broccoli and a small serving of quinoa or brown rice.',
      '**Evening Snack (if hungry):** A few baby carrots or cucumber slices.',
    ],
  },
  // Add more meal plan sections/ideas
];

const MealPlanScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Nourish Your Body</Text>
      <Text style={styles.headerSubtitle}>Simple eating guidance for pre-diabetes reversal.</Text>

      {mealPlans.map((plan) => (
        <View key={plan.id} style={styles.mealPlanCard}>
          {plan.imageUrl && (
            <Image source={{ uri: plan.imageUrl }} style={styles.planImage} />
          )}
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{plan.title}</Text>
            {plan.content.map((paragraph, index) => (
              <Text key={index} style={styles.planText}>
                {paragraph}
              </Text>
            ))}
          </View>
        </View>
      ))}
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
    fontSize: 26,
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
  mealPlanCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  planImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  planText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
    color: '#555',
  },
});

export default MealPlanScreen;