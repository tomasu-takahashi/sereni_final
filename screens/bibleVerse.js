import React from 'react';
import { View, Text, FlatList } from 'react-native';

const bibleVerse = ({ route }) => {
  const { results } = route.params;

  return (
    <View>
      <Text>Search Results:</Text>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.verse}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default bibleVerse;