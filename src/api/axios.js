import axios from 'axios';

const URL = import.meta.env.VITE_API_URL;

console.log('URL:', URL);

const api = axios.create({
  baseURL: URL + 'api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Hata yönetimi
    if (error.response) {
      // Sunucu yanıtı ile gelen hatalar
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // İstek yapıldı ama yanıt alınamadı
      console.error('Network Error:', error.request);
    } else {
      // İstek oluşturulurken hata oluştu
      console.error('Request Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
