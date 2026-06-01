import React from 'react';
import { View, FlatList, Text, StyleSheet, ScrollView } from 'react-native';


const MesageItem = ({ message }) => (
  <ScrollView style={styles.itemContainer}>
    <Text style={styles.message}>{message}</Text>
  </ScrollView>
);

const RecommendedActivitiesItem = ({ recommendedActivities }) => (
  <ScrollView style={styles.itemContainer}>
    <Text style={styles.recommendedActivities}>{recommendedActivities}</Text>
  </ScrollView>
);

const BibleVerseItem = ({ bibleVerse }) => (
  <ScrollView style={styles.itemContainer}>
    <Text style={styles.bibleVerse}>{bibleVerse}</Text>
  </ScrollView>
);

const Carousel = ({ message, recommendedActivities, bibleVerse }) => {
  const renderItem = ({ item }) => {
    if (item.type === 'message') {
      return <MesageItem message={item.data} />;
    } else if (item.type === 'recommendedActivities') {
      return <RecommendedActivitiesItem recommendedActivities={item.data} />;
    } else if (item.type === 'bibleVerse') {
      return <BibleVerseItem bibleVerse={item.data} />;
    }
  };

  const data = [
    { type: 'message', data: message },
    { type: 'recommendedActivities', data: recommendedActivities },
    { type: 'bibleVerse', data: bibleVerse },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.type}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  itemContainer: {
    width: '100%',
    minHeight: '70%',
    backgroundColor: '#CDF0EA',
    marginRight: 20,
    marginLeft: 10,
    borderRadius: 10,
    padding: 20,
  },
  message: {
    fontSize: 17.5,
    color: 'black',
    paddingBottom: 40,
  },
  recommendedActivities: {
    fontSize: 17,
    color: 'black',
    paddingBottom: 40,
  },
  bibleVerse: {
    fontSize: 17,
    color: 'black',
    paddingBottom: 40,
  },
});

export default Carousel;
