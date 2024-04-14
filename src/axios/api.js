import axios from "axios";
import { useUserStore } from '@/store/user'
const userStore = useUserStore()
const api = axios.create({
    baseURL: 'https://freelancework.ir/',
    timeout: 10000,
    headers: {
        'Accept': 'application/json'
    }
});

api.interceptors.request.use(function(config) {
    let token = userStore.getUser.token;

    config.headers.Authorization = 'Bearer ' + token;

    return config;
}, err => new Promise.reject(err));

api.interceptors.response.use(res => res, err => Promise.reject(err))


export default api;