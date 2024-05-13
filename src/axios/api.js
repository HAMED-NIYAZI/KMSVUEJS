import axios from "axios";
import { LocalStorageService } from '@/services/LocalStorageService'
const localStorageService = LocalStorageService()
const api = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 650000,
    headers: {
        'Accept': 'application/json'
    }
});

api.interceptors.request.use(function (config) {
    let token = localStorageService.getToken;

    config.headers.Authorization = 'Bearer ' + token;

    return config;
}, err => new Promise.reject(err));

api.interceptors.response.use(res => res, err => Promise.reject(err))

export default api;