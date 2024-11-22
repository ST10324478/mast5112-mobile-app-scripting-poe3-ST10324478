import React, { useContext, useState } from 'react';
import { View, Text, Button, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Content } from '../Content';

//This is the home screen that will all the guest to filter through the menu items
const HomeScreen = () => {
  const { items, removeItem } = useContext(Content)!;
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const navigation = useNavigation();

  const toggleFilter = (course: string | null) => {
    setSelectedFilter(course === selectedFilter ? null : course);
  };

  const FilterButton = ({ course }: { course: string }) => (
    <TouchableOpacity
      onPress={() => toggleFilter(course)}
      style={[styles.filterButton, selectedFilter === course && styles.activeFilterButton]}>
      <Text style={{ color: selectedFilter === course ? 'red' : 'black' }}>{course}</Text>
    </TouchableOpacity>
  );

  const ItemCard = ({ item }: { item: any }) => (
    <View style={styles.item}>
      <Text>{item.name}</Text>
      <Text>{item.description}</Text>
      <Text>{item.price}</Text>
      <Text>Course: {item.course}</Text>
      <Button title="Remove" onPress={() => removeItem(item.id)} />
    </View>
  );

  const displayedItems = selectedFilter ? items.filter(item => item.course === selectedFilter) : items;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Menu</Text>
      <View style={styles.filterContainer}>
        <FilterButton course="Starter" />
        <FilterButton course="Main" />
        <FilterButton course="Dessert" />
      </View>
      <FlatList
        data={displayedItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemCard item={item} />}
      />
      <Button title="Change Menu" onPress={() => navigation.navigate({ name: 'ChangeMenu' })} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  filterSection: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 },
  filterButtonElement: { padding: 8, borderWidth: 1, borderRadius: 4 },
  activeFilterStyle: { borderColor: 'red', borderWidth: 2 },
  menuItemStyle: { padding: 12, marginVertical: 6, borderWidth: 1, borderRadius: 4 },
});

export default HomeScreen;