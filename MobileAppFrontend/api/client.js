import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://shrimpmobileapp-backend-api.onrender.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // 5-second timeout
});

// Automatically add token to requests
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;