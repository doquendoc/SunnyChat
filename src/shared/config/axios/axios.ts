import axios from 'axios';

// @ts-ignore
const API_URL = process.env.REACT_APP_API_URL;
const token = localStorage.getItem('token')

const instance = axios.create({
    baseURL: `${API_URL}`,
});

instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
instance.defaults.headers.common['Accepts'] = 'application/text';

instance.interceptors.request.use(function (config) {
    const auth_token = token ? {Authorization: `Bearer ${token}`} : null;
    config.headers = {...config.headers, ...auth_token};
    return config;
}, function (error) {
    return Promise.reject(error);
});

export default instance;
