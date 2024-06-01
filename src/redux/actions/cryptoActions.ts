export const UPDATE_CRYPTO = 'UPDATE_CRYPTO';
export const REMOVE_CRYPTO = 'REMOVE_CRYPTO';
export const ADD_CRYPTO = 'ADD_CRYPTO';

export const updateCrypto = (data: any[]) => ({
  type: UPDATE_CRYPTO,
  payload: data,
});

export const removeCrypto = (id: number) => ({
  type: REMOVE_CRYPTO,
  payload: id,
});

export const addCrypto = (crypto: any) => ({
  type: ADD_CRYPTO,
  payload: crypto,
});

