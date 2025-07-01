
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-api-url.com/api', 
});

export default api;
