import { ADD_CRYPTO, REMOVE_CRYPTO, UPDATE_CRYPTO } from '../actions/cryptoActions';

const initialState = {
  cryptos: [],
};

const cryptoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_CRYPTO:
      return {
        ...state,
        cryptos: state.cryptos.map((crypto: any) =>
          crypto.id === action.payload.id ? action.payload : crypto
        ),
      };
    case REMOVE_CRYPTO:
      return {
        ...state,
        cryptos: state.cryptos.filter((crypto: any) => crypto.id !== action.payload),
      };
    case ADD_CRYPTO:
      return {
        ...state,
        cryptos: [...state.cryptos, action.payload],
      };
    default:
      return state;
  }
};

export default cryptoReducer;
