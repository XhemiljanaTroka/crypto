import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import store from './redux/store';
import CryptoList from './components/CryptoList';
import AddCrypto from './components/AddCrypto';


const App: React.FC = () => {
  const [screen, setScreen] = useState('CryptoList');

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        {screen === 'CryptoList' ? (
          <ScrollView>
            <CryptoList navigateToAddCrypto={() => setScreen('AddCrypto')} />
          </ScrollView>
        ) : (
          <AddCrypto goBack={() => setScreen('CryptoList')} />
        )}
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#2C3539',
    padding: 40,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  }, 
});

export default App;
