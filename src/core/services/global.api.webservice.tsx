import axios from 'axios';

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 100000,
});

let store: any;
export const GlobalApiInjectStore = (_store: any) => {
    if (!store) {
        store = _store;
    }
};

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = store?.getState().auth.session?.sessionToken;
        const language = store?.getState().preference.language;

        config.headers['app-domain'] = process.env.NEXT_PUBLIC_APP_DOMAIN!;

        if (language) {
            config.headers.app_culture = language;
        }

        if (token) {
            config.headers.Authorization = `${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle errors
        return Promise.reject(error);
    }
);

export const get = async (url: string, params?: any) => {
    try {
        const response = await axiosInstance.get(url, { params });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const post = async (url: string, data: any) => {
    try {
        const response = await axiosInstance.post(url, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};