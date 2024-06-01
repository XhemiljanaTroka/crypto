import { createStore, combineReducers } from 'redux';
import cryptoReducer from './reducers/cryptoReducer';

const rootReducer = combineReducers({
    crypto: cryptoReducer
});

const store = createStore(rootReducer);

export default store;
