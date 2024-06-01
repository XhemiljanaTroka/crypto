import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { removeCrypto, updateCrypto } from '../redux/actions/cryptoActions';

const CryptoList: React.FC<{ navigateToAddCrypto: () => void }> = ({ navigateToAddCrypto }) => {
  const cryptos = useSelector((state: any) => state.crypto.cryptos);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchCryptoData = async (cryptoSymbol: string) => {
    try {
      const response = await fetch(`https://data.messari.io/api/v1/assets/${cryptoSymbol}/metrics`);
      const data = await response.json();
      console.log('API Response for', cryptoSymbol, data);

      const updatedCrypto = {
        id: data.data.id,
        name: data.data.name ? data.data.name.toUpperCase() : 'Unknown Name',
        symbol: data.data.symbol ? data.data.symbol.toUpperCase() : 'Unknown Symbol',
        market_data: {
          price_usd: data.data.market_data.price_usd,
          percent_change_usd_last_24_hours: data.data.market_data.percent_change_usd_last_24_hours,
        },
      };
      return updatedCrypto;
    } catch (error) {
      console.error('Error fetching crypto data:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchAllCryptos = async () => {
      const cryptoSymbols = ['btc', 'eth', 'xrp'];
      const promises = cryptoSymbols.map(symbol => fetchCryptoData(symbol));
      const results = await Promise.all(promises);
      const validResults = results.filter(result => result !== null);
      dispatch(updateCrypto(validResults));
      setLoading(false);
    };

    fetchAllCryptos();
    const interval = setInterval(fetchAllCryptos, 60000); 
    return () => clearInterval(interval); 
  }, [dispatch]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.headerText}>CryptoTracker Pro</Text>
      </View>
      <View style={styles.container}>
        {cryptos.map((crypto: any, index: number) => (
          <View key={index} style={styles.cryptoItem}>
            <View style={styles.cryptoDetails}>
              <Text style={styles.cryptoName}>{crypto.name.toUpperCase()}</Text>
              <Text style={styles.cryptoSymbol}>{crypto.symbol.toUpperCase()}</Text>
            </View>
            <View style={styles.cryptoData}>
              <Text style={styles.cryptoPrice}>${crypto.market_data.price_usd.toFixed(2)}</Text>
              <Text
                style={{
                  ...styles.cryptoChange,
                  color: crypto.market_data.percent_change_usd_last_24_hours > 0 ? 'green' : 'red',
                }}
              >
                {crypto.market_data.percent_change_usd_last_24_hours.toFixed(2)}%
              </Text>
            </View>
            <TouchableOpacity style={styles.removeButton} onPress={() => dispatch(removeCrypto(crypto.id))}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity
          style={styles.addButton}
          onPress={navigateToAddCrypto}
        >
          <Text style={styles.addButtonText}>+ Add a Cryptocurrency</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#000000',
    padding: 40,
    alignItems: 'center',
  },
  headerText: {
    color: '#FF8C00',
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    padding: 20,
  },
  cryptoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF8C00',
    marginBottom: 10,
  },
  cryptoDetails: {
    flex: 3,
    justifyContent: 'center',
  },
  cryptoName: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
  },
  cryptoSymbol: {
    fontSize: 18,
    color: '#000000',
  },
  cryptoData: {
    flex: 2,
    alignItems: 'flex-end',
  },
  cryptoPrice: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
  },
  cryptoChange: {
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: '#000000',
    padding: 5,
    borderRadius: 5,
    marginLeft: 15,
  },
  removeButtonText: {
    color: '#FF8C00',
    fontSize: 14,
  },
  addButton: {
    marginTop: 20,
    backgroundColor: '#000000',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  addButtonText: {
    color: '#FF8C00',
    fontSize: 18,
  },
});

export default CryptoList;
