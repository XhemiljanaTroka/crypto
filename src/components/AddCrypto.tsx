import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { addCrypto } from '../redux/actions/cryptoActions';

interface AddCryptoProps {
  goBack: () => void;
}

const AddCrypto: React.FC<AddCryptoProps> = ({ goBack }) => {
  const [crypto, setCrypto] = useState('');
  const dispatch = useDispatch();

  const handleAddCrypto = () => {
    const newCrypto = {
      id: crypto,
      name: crypto,
      symbol: crypto,
      market_data: {
        price_usd: Math.random() * 1000,
        percent_change_usd_last_24_hours: Math.random() * 100,
      },
    };
    dispatch(addCrypto(newCrypto));
    setCrypto('');
    goBack();
  };

  return (
    <View style={styles.container}>
      <Text onPress={goBack} style={styles.backButton}>Back to list</Text>
      <Text style={styles.title}>Add a Cryptocurrency</Text>
      <TextInput
        style={styles.input}
        placeholder="Use a name or ticker symbol..."
        value={crypto}
        onChangeText={setCrypto}
      />
      <Button title="Add" onPress={handleAddCrypto} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    color: '#2E86C1',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    marginBottom: 20,
  },
});

export default AddCrypto;
