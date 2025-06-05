import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { clearSelectedArticle } from '../redux/slices/articleSlice';

const ArticleDetailScreen = ({ navigation }) => {
  const selectedArticle = useSelector((state) => state.articles.selectedArticle);
  const dispatch = useDispatch();

  // Clean up selectedArticle when leaving the screen
  useEffect(() => {
    return () => {
      dispatch(clearSelectedArticle());
    };
  }, [dispatch]);

  if (!selectedArticle) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading article...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {selectedArticle.imageUrl && (
        <Image source={{ uri: selectedArticle.imageUrl }} style={styles.articleImage} />
      )}
      <View style={styles.contentContainer}>
        <Text style={styles.articleTitle}>{selectedArticle.title}</Text>
        <Text style={styles.articleCategory}>{selectedArticle.category}</Text>
        {selectedArticle.content.map((paragraph, index) => (
          <Text key={index} style={styles.articleParagraph}>
            {paragraph}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  articleImage: {
    width: '100%',
    height: 220,
    contentFit: 'cover',
  },
  contentContainer: {
    padding: 20,
  },
  articleTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  articleCategory: {
    fontSize: 14,
    color: '#888',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  articleParagraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    color: '#555',
  },
});

export default ArticleDetailScreen;