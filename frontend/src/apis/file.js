import axios from 'axios';
const BASE_URL = process.env.API_URL || 'http://localhost:8000/api';

const fileService = {
    getByUser: async (data) => {
        const response = await axios.post(`${BASE_URL}/getFilesByUserId`, data);
        return response;
    },
    downloadFileByCode: async (data) => {
        const response = await axios.post(`${BASE_URL}/getFileByCode`, data);
        return response;
    },
    deleteFileByCode: async (data) => {
        const response = await axios.post(`${BASE_URL}/deleteFileByCode`, data);
        return response;
    },
    uploadFile: async (data) => {
        const response = await axios.post(`${BASE_URL}/uploadFile`, data);
        return response;
    }
}

export default fileService;