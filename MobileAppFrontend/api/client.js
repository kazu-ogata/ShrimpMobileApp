import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

//  API_BASE_URL = 'http://192.168.20.22:5000/api';

const API_BASE_URL = 'https://shrimp-backend-api.onrender.com';

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