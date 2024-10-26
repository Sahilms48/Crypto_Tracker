import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const getMarketData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/market`);
    return response.data;
  } catch (error) {
    console.error('Error fetching market data:', error);
    throw error;
  }
};

export const getCoinData = async (coinId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/coin/${coinId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching coin data:', error);
    throw error;
  }
};

export const searchCoins = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/coins`);
    return response.data;
  } catch (error) {
    console.error('Error searching coins:', error);
    throw error;
  }
};