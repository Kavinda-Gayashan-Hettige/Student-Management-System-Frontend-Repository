import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Student APIs
export const getStudents = async () => {
    const response = await axios.get(`${API_BASE_URL}/students`);
    return response.data;
};

// Course APIs
export const getCourses = async () => {
    const response = await axios.get(`${API_BASE_URL}/courses`);
    return response.data;
};

// User APIs
export const getUsers = async () => {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
};