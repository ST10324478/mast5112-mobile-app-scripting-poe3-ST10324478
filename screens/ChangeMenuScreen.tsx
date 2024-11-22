import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import { Content } from '../Content';

//This is the screen that allows the chef to add items to the menu
const ChangeMenuScreen = () => {
  const { addItem, items } = useContext(Content)!; //Getting items from content
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const navigation = useNavigation();

  const onAddItem = () => {
    if (itemName && itemDescription && itemPrice && selectedCourse) {
      addItem({ id: Math.random().toString(), name: itemName, description: itemDescription, price: itemPrice, course: selectedCourse });
      navigation.goBack();
    }
  };

  const calculateAveragePrice = () => {
    if (items.length === 0) return 0; //Not allowing dividing by zero
    const total = items.reduce((sum: number, item: MenuItem) => sum + parseFloat(item.price), 0);
    return (total / items.length).toFixed(2); //Rounds the price by 2 decimal places
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Menu Item</Text>
      <TextInput 
        placeholder="Name" 
        value={itemName} 
        onChangeText={setItemName} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Description" 
        value={itemDescription} 
        onChangeText={setItemDescription} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Price" 
        value={itemPrice} 
        onChangeText={setItemPrice} 
        style={styles.input} 
        keyboardType="numeric" 
      />
      <RNPickerSelect
        onValueChange={(value) => setSelectedCourse(value)}
        items={[
          { label: 'Starter', value: 'Starter' },
          { label: 'Main', value: 'Main' },
          { label: 'Dessert', value: 'Dessert' },
        ]}
        placeholder={{ label: 'Select Course', value: null }}
        style={pickerSelectStyles}
      />
      <Button title="Add Item" onPress={onAddItem} />
      <Text style={styles.averagePrice}>Average Price: ${calculateAveragePrice()}</Text> {/*Shows average price */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  input: { 
    borderWidth: 1, 
    borderColor: 'red', 
    padding: 8, 
    marginBottom: 12, 
    borderRadius: 4 
  },
  averagePrice: { 
    marginTop: 20, 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: { 
    fontSize: 16, 
    padding: 10, 
    borderWidth: 1, 
    borderColor: 'red', 
    borderRadius: 5, 
    color: 'black' 
  },
});

export default ChangeMenuScreen;