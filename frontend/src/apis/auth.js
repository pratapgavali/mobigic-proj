import axios from 'axios';
export const BASE_URL = process.env.API_URL || 'http://localhost:8000/api';

const authService = {
    login: async (data) => {
        const response = await axios.post(`${BASE_URL}/signin`, data);
        return response;
    },
    signup: async (data) => {
        const response = await axios.post(`${BASE_URL}/signup`, data);
        return response;
    }
}

export default authService;