import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectArticle } from '../redux/slices/articleSlice';
import { useNavigation } from '@react-navigation/native';

const LearnScreen = () => {
  const articles = useSelector((state) => state.articles.list);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const renderArticleItem = ({ item }) => (
    <TouchableOpacity
      style={styles.articleCard}
      onPress={() => {
        dispatch(selectArticle(item.id));
        navigation.navigate('ArticleDetail', { title: item.title });
      }}
    >
      <ImageBackground source={{ uri: item.imageUrl }} style={styles.cardImage} imageStyle={styles.cardImageStyle}>
        <View style={styles.cardOverlay}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardCategory}>{item.category}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.id}
        renderItem={renderArticleItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 10,
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  articleCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 150,
    justifyContent: 'flex-end',
  },
  cardImageStyle: {
    borderRadius: 15,
  },
  cardOverlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardCategory: {
    fontSize: 13,
    color: '#eee',
    marginTop: 4,
  },
});

export default LearnScreen;