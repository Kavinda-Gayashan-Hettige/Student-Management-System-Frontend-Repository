import axios from 'axios';


const API_BASE_URL = 'http://localhost:8080/api';


const api = axios.create({
  baseURL: API_BASE_URL,
});


api.interceptors.request.use(
  (config) => {
  
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const getStudents = async () => {
  const response = await api.get('/students');
  return response.data;
};

export const getCourses = async () => {
  const response = await api.get('/courses');
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};