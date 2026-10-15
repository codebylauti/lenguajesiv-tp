import axios from 'axios';

const opencveClient = axios.create({
  baseURL: '/api/v2', 
  headers: {
    'Accept': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_OPENCVE_TOKEN}`
  }
});

export default opencveClient;
